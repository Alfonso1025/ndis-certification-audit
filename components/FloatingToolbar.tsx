"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { LANGUAGES } from "@/components/LanguageSwitcher";
import { FontScalePicker, ToggleRow } from "@/components/AccessibilityPanel";

type ActivePanel = "lang" | "a11y" | null;

// Panel flies in to the left of the pill.
// Width is fluid: fills from left-3 up to max-w-72, so it never clips on
// narrow screens (iPhone SE is 320px — panel max is 320 - 80 - 12 = 228px).
const PANEL_BASE =
  "fixed z-50 lg:hidden top-[60%] -translate-y-1/2 " +
  "right-[76px] w-[min(288px,calc(100vw-92px))] " +
  "bg-white rounded-2xl shadow-xl border border-slate/10 p-4 " +
  "max-h-[70vh] overflow-y-auto";

export default function FloatingToolbar() {
  const { lang, setLanguage } = useLanguage();
  const {
    fontScale, highContrast, dyslexiaFont, reduceMotion,
    setFontScale, setHighContrast, setDyslexiaFont, setReduceMotion,
  } = useAccessibility();

  const [active, setActive] = useState<ActivePanel>(null);

  function toggle(panel: ActivePanel) {
    setActive((prev) => (prev === panel ? null : panel));
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* Transparent backdrop — intercepts taps outside the open panel */}
      {active !== null && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setActive(null)}
          aria-hidden="true"
        />
      )}

      {/* ── Language panel ──────────────────────────────────────────────── */}
      {active === "lang" && (
        <div role="dialog" aria-label="Choose language" className={PANEL_BASE}>
          <p className="text-xs font-semibold text-slate/50 uppercase tracking-widest mb-3">
            Language
          </p>
          <ul className="space-y-1" role="listbox" aria-label="Available languages">
            {LANGUAGES.map(({ code, flag, native }) => (
              <li key={code} role="option" aria-selected={lang === code}>
                <button
                  onClick={() => { setLanguage(code); setActive(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors duration-150 ${
                    lang === code
                      ? "bg-teal text-white font-semibold"
                      : "text-slate hover:bg-teal-light hover:text-teal"
                  }`}
                >
                  <span aria-hidden="true" className="text-xl leading-none">{flag}</span>
                  <span>{native}</span>
                  {lang === code && (
                    <svg className="ml-auto w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Accessibility panel ─────────────────────────────────────────── */}
      {active === "a11y" && (
        <div role="dialog" aria-label="Accessibility settings" className={PANEL_BASE}>
          <p className="text-xs font-semibold text-slate/50 uppercase tracking-widest mb-3">
            Accessibility
          </p>
          <div className="mb-4">
            <p className="text-xs font-medium text-slate mb-2">Text size</p>
            <FontScalePicker fontScale={fontScale} setFontScale={setFontScale} />
          </div>
          <div className="divide-y divide-slate/10">
            <ToggleRow label="High contrast"          checked={highContrast} onChange={setHighContrast} />
            <ToggleRow label="Dyslexia-friendly font" checked={dyslexiaFont} onChange={setDyslexiaFont} />
            <ToggleRow label="Reduce motion"          checked={reduceMotion} onChange={setReduceMotion} />
          </div>
        </div>
      )}

      {/* ── Floating pill ───────────────────────────────────────────────── */}
      {/* Sits at 60% screen height — below the visual midpoint, in the      */}
      {/* natural thumb zone for right-handed users.                          */}
      <div className="fixed right-4 top-[60%] -translate-y-1/2 z-50 lg:hidden flex flex-col gap-2.5">

        {/* Language button */}
        <button
          onClick={() => toggle("lang")}
          aria-label="Language"
          aria-expanded={active === "lang"}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 ${
            active === "lang"
              ? "bg-teal text-white border-teal shadow-lg shadow-teal/25"
              : "bg-white text-slate border-slate/15 shadow-md hover:border-teal hover:text-teal"
          }`}
        >
          <GlobeIcon />
        </button>

        {/* Divider pip — visually groups the two buttons into one pill */}
        <div className="w-6 h-px bg-slate/15 mx-auto" aria-hidden="true" />

        {/* Accessibility button */}
        <button
          onClick={() => toggle("a11y")}
          aria-label="Accessibility"
          aria-expanded={active === "a11y"}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 ${
            active === "a11y"
              ? "bg-teal text-white border-teal shadow-lg shadow-teal/25"
              : "bg-white text-slate border-slate/15 shadow-md hover:border-teal hover:text-teal"
          }`}
        >
          <AccessibilityIcon />
        </button>
      </div>
    </>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function GlobeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      {/* Meridian curves */}
      <path d="M12 2C9.5 5.5 8.5 8.5 8.5 12C8.5 15.5 9.5 18.5 12 22" />
      <path d="M12 2C14.5 5.5 15.5 8.5 15.5 12C15.5 15.5 14.5 18.5 12 22" />
      {/* Latitude lines */}
      <path d="M2 12H22" />
      <path strokeWidth={1.2} d="M4 7.5H20M4 16.5H20" />
    </svg>
  );
}

function AccessibilityIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Head */}
      <circle cx="12" cy="5" r="1.75" />
      {/* Arms */}
      <path d="M6.5 10.5L12 9L17.5 10.5" />
      {/* Torso */}
      <path d="M12 9V15" />
      {/* Legs */}
      <path d="M12 15L9.5 20" />
      <path d="M12 15L14.5 20" />
    </svg>
  );
}
