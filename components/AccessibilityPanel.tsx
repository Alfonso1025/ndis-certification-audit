"use client";

import { useState, useRef, useEffect } from "react";
import { useAccessibility, FontScale } from "@/context/AccessibilityContext";

// Exported so Navbar can reuse these in the mobile inline section
// without duplicating the markup or logic.
export const FONT_SCALE_OPTIONS: { value: FontScale; tw: string; label: string }[] = [
  { value: 0.9,  tw: "text-xs",   label: "90%"  },
  { value: 1,    tw: "text-sm",   label: "100%" },
  { value: 1.15, tw: "text-base", label: "115%" },
  { value: 1.3,  tw: "text-lg",   label: "130%" },
  { value: 1.5,  tw: "text-xl",   label: "150%" },
];

export function FontScalePicker({
  fontScale,
  setFontScale,
}: {
  fontScale: FontScale;
  setFontScale: (s: FontScale) => void;
}) {
  return (
    <div className="flex items-end gap-1">
      {FONT_SCALE_OPTIONS.map(({ value, tw, label }) => (
        <button
          key={value}
          onClick={() => setFontScale(value)}
          aria-label={`Text size ${label}`}
          aria-pressed={fontScale === value}
          className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors duration-150 ${
            fontScale === value
              ? "bg-teal text-white"
              : "bg-slate/5 text-slate hover:bg-teal-light hover:text-teal"
          }`}
        >
          <span className={`font-bold leading-none ${tw}`} aria-hidden="true">A</span>
        </button>
      ))}
    </div>
  );
}

export function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-slate">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-1 ${
          checked ? "bg-teal" : "bg-slate/25"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

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

export default function AccessibilityPanel() {
  const {
    fontScale, highContrast, dyslexiaFont, reduceMotion,
    setFontScale, setHighContrast, setDyslexiaFont, setReduceMotion,
  } = useAccessibility();

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

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Accessibility settings"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors duration-150 ${
          open
            ? "border-teal text-teal bg-teal-light"
            : "border-slate/20 text-slate hover:border-teal hover:text-teal"
        }`}
      >
        <span aria-hidden="true" className="text-base font-bold leading-none">A</span>
        <span>Accessibility</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl shadow-lg border border-slate/10 p-4 z-50"
        >
          <p className="text-xs font-semibold text-slate/50 uppercase tracking-widest mb-3">
            Accessibility
          </p>

          <div className="mb-4">
            <p className="text-xs font-medium text-slate mb-1.5">Text size</p>
            <FontScalePicker fontScale={fontScale} setFontScale={setFontScale} />
          </div>

          <div className="divide-y divide-slate/10">
            <ToggleRow label="High contrast"          checked={highContrast} onChange={setHighContrast} />
            <ToggleRow label="Dyslexia-friendly font" checked={dyslexiaFont} onChange={setDyslexiaFont} />
            <ToggleRow label="Reduce motion"          checked={reduceMotion} onChange={setReduceMotion} />
          </div>
        </div>
      )}
    </div>
  );
}
