"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, LanguageCode } from "@/context/LanguageContext";

// Exported so Navbar can reuse this array in the mobile inline layout
// without duplicating the data.
export const LANGUAGES: { code: LanguageCode; flag: string; native: string }[] = [
  { code: "en", flag: "🇦🇺", native: "English"  },
  { code: "ar", flag: "🇸🇦", native: "العربية"  },
  { code: "bn", flag: "🇧🇩", native: "বাংলা"    },
  { code: "hi", flag: "🇮🇳", native: "हिन्दी"   },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when pointer lands outside this component.
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const active = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Change language"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors duration-150 ${
          open
            ? "border-teal text-teal bg-teal-light"
            : "border-slate/20 text-slate hover:border-teal hover:text-teal"
        }`}
      >
        <span aria-hidden="true" className="text-base">{active.flag}</span>
        <span>{active.native}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Available languages"
          className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate/10 py-1.5 z-50"
        >
          {LANGUAGES.map(({ code, flag, native }) => (
            <li key={code} role="option" aria-selected={lang === code}>
              <button
                onClick={() => { setLanguage(code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-100 hover:bg-teal-light ${
                  lang === code ? "text-teal font-semibold" : "text-slate"
                }`}
              >
                <span aria-hidden="true" className="text-base w-5 shrink-0">{flag}</span>
                <span>{native}</span>
                {lang === code && (
                  <svg className="ml-auto w-4 h-4 text-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
