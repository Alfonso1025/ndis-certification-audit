"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/constants/site-config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AccessibilityPanel from "@/components/AccessibilityPanel";

const NAV_LINKS: { key: string; href: string }[] = [
  { key: "nav.services",  href: "#services"  },
  { key: "nav.about",     href: "#about"     },
  { key: "nav.contact",   href: "#contact"   },
  { key: "nav.complaint", href: "/complaints" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // On independent pages (/policies, /complaints, …) hash-only hrefs like
  // "#services" would resolve to "/policies#services" — a non-existent anchor.
  // Prefix with "/" when not on the home page so the browser navigates home first.
  function resolveHref(href: string): string {
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate/10 shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo + name ─────────────────────────────────────────────── */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white font-display text-sm font-bold select-none group-hover:bg-teal transition-colors duration-200">
              CF
            </span>
            <span className="hidden sm:block font-display text-navy text-lg leading-tight">
              {siteConfig.providerName}
            </span>
            <span className="sm:hidden font-display text-navy text-base leading-tight">
              {siteConfig.providerName.split(" ")[0]}
            </span>
          </a>

          {/* ── Desktop nav links ────────────────────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-7" role="list">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <a href={resolveHref(href)} className="text-sm font-medium text-slate hover:text-teal transition-colors duration-150">
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop controls ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <AccessibilityPanel />
          </div>

          {/* ── Mobile: hamburger ────────────────────────────────────────── */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate hover:text-navy hover:bg-slate/5 transition-colors duration-150"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer — nav links only ───────────────────────────────── */}
      {mobileOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-slate/10 bg-white">
          <ul className="px-4 py-3 space-y-0.5" role="list">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={resolveHref(href)}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate hover:text-teal hover:bg-teal-light transition-colors duration-150"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
