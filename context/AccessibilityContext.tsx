"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type FontScale = 0.9 | 1 | 1.15 | 1.3 | 1.5;

interface A11yPrefs {
  fontScale: FontScale;
  highContrast: boolean;
  dyslexiaFont: boolean;
  reduceMotion: boolean;
}

const DEFAULTS: A11yPrefs = {
  fontScale: 1,
  highContrast: false,
  dyslexiaFont: false,
  reduceMotion: false,
};

const STORAGE_KEY = "a11y-prefs";

interface AccessibilityContextValue extends A11yPrefs {
  setFontScale: (scale: FontScale) => void;
  setHighContrast: (value: boolean) => void;
  setDyslexiaFont: (value: boolean) => void;
  setReduceMotion: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULTS);
  // Guards the DOM-mutation effect: we must not apply defaults to the HTML
  // element before we have read localStorage, or we would overwrite the classes
  // and --font-scale that the inline <script> applied synchronously on load.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Partial<A11yPrefs>;
        setPrefs((prev) => ({ ...prev, ...stored }));
      }
    } catch {
      // Malformed JSON or storage blocked — stay on defaults.
    }
    setHydrated(true);
  }, []);

  // Apply every setting to the <html> element as a single synchronised write.
  // Skipped until hydration is complete so the inline script's classes are
  // never torn down by the default-state render.
  useEffect(() => {
    if (!hydrated) return;
    const el = document.documentElement;
    el.style.setProperty("--font-scale", String(prefs.fontScale));
    el.classList.toggle("high-contrast", prefs.highContrast);
    el.classList.toggle("dyslexia-font", prefs.dyslexiaFont);
    el.classList.toggle("reduce-motion", prefs.reduceMotion);
  }, [prefs, hydrated]);

  // Persist to localStorage after each change (also gated on hydration to
  // avoid writing defaults over a valid stored object).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Storage full or blocked — silently continue.
    }
  }, [prefs, hydrated]);

  function setFontScale(scale: FontScale) {
    setPrefs((prev) => ({ ...prev, fontScale: scale }));
  }
  function setHighContrast(value: boolean) {
    setPrefs((prev) => ({ ...prev, highContrast: value }));
  }
  function setDyslexiaFont(value: boolean) {
    setPrefs((prev) => ({ ...prev, dyslexiaFont: value }));
  }
  function setReduceMotion(value: boolean) {
    setPrefs((prev) => ({ ...prev, reduceMotion: value }));
  }

  return (
    <AccessibilityContext.Provider
      value={{ ...prefs, setFontScale, setHighContrast, setDyslexiaFont, setReduceMotion }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used inside <AccessibilityProvider>");
  return ctx;
}
