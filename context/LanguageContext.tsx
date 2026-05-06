"use client";


import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import bn from "@/messages/bn.json";
import hi from "@/messages/hi.json";

export type LanguageCode = "en" | "ar" | "bn" | "hi";
export type Direction = "ltr" | "rtl";

// en.json is the source of truth — all other files must match its shape.
type Messages = typeof en;

const translations: Record<LanguageCode, Messages> = { en, ar, bn, hi };

const RTL_LANGUAGES: LanguageCode[] = ["ar"];

// ─────────────────────────────────────────────────────────
// Helpers (pure functions)
// ─────────────────────────────────────────────────────────

function resolveNode(obj: unknown, path: string[]): unknown {
  let node = obj;
  for (const segment of path) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[segment];
  }
  return node;
}

function resolveKey(obj: unknown, path: string[]): string {
  const node = resolveNode(obj, path);
  return typeof node === "string" ? node : path.join(".");
}

function resolveArray<T = unknown>(obj: unknown, path: string[]): T[] {
  const node = resolveNode(obj, path);
  return Array.isArray(node) ? (node as T[]) : [];
}

// ─────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────

interface LanguageContextValue {
  lang: LanguageCode;
  dir: Direction;
  t: (key: string) => string;
  tArray: <T = unknown>(key: string) => T[];
  setLanguage: (code: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "ndis-lang";

// ─────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored && stored in translations) setLang(stored);
  }, []);

  const dir: Direction = RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  function t(key: string): string {
    return resolveKey(translations[lang], key.split("."));
  }

  // ✅ FIXED: generic + inside provider
  function tArray<T = unknown>(key: string): T[] {
    return resolveArray<T>(translations[lang], key.split("."));
  }

  function setLanguage(code: LanguageCode) {
    localStorage.setItem(STORAGE_KEY, code);
    setLang(code);
  }

  return (
    <LanguageContext.Provider value={{ lang, dir, t, tArray, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}