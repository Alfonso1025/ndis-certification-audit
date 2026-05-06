"use client";

import { Fragment } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, tArray } = useLanguage();
  const trustItems = tArray("hero.trustItems");

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="bg-navy text-white min-h-screen flex flex-col"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col py-16 md:py-24">

        {/* ── Layer 1: Main content grid ───────────────────────────────── */}
        <div className="flex-1 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left column */}
          <div className="flex flex-col gap-6">
            <h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] text-white leading-[1.15]"
            >
              {t("hero.heading")}
            </h1>

            <p className="font-body text-white/75 text-base sm:text-lg leading-relaxed max-w-lg">
              {t("hero.subheading")}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {/* Primary CTA */}
              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-teal text-white font-body font-semibold text-sm hover:bg-teal/90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t("hero.primaryCta")}
              </a>

              {/* Secondary CTA */}
              <a
                href="/your-rights"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/25 text-white font-body font-semibold text-sm hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t("hero.secondaryCta")}
              </a>
            </div>
          </div>

          {/* Right column — placeholder, replaced by illustration later */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full max-w-lg aspect-[4/3] rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <span className="text-white/15 text-sm font-body select-none" aria-hidden="true">
                Illustration
              </span>
            </div>
          </div>
        </div>

        {/* ── Layer 2: Trust bar ───────────────────────────────────────── */}
        <div className="border-t border-white/10 mt-12 pt-5 pb-3">
          <div
            className="flex flex-wrap items-center justify-center md:justify-start gap-y-2"
            aria-label="Provider credentials"
          >
            {trustItems.map((item, index) => (
              <Fragment key={index}>
                {index > 0 && (
                  <span aria-hidden="true" className="mx-3 text-white/20 select-none text-sm">
                    ·
                  </span>
                )}
                <span className="text-xs font-body text-white/55 tracking-wide">
                  {item}
                </span>
              </Fragment>
            ))}
          </div>
        </div>

        {/* ── Layer 3: TIS National interpreter notice ─────────────────── */}
        {/* Required for NDIS compliance — providers serving CALD communities  */}
        {/* must make TIS National contact visible alongside service information. */}
        <div className="text-center py-3">
          <p className="text-xs font-body text-white/45">
            {t("hero.interpreter")}{" "}
            <a
              href="tel:131450"
              className="text-teal-light hover:text-white underline underline-offset-2 transition-colors duration-150"
            >
              {t("hero.interpreterCta")}
            </a>
          </p>
        </div>

        {/* ── Layer 4: Scroll chevron ──────────────────────────────────── */}
        {/* motion-safe: applies the animation only when the OS/browser has  */}
        {/* no reduced-motion preference. Our .reduce-motion CSS class also  */}
        {/* collapses animation-duration to 0.001ms as a second line of      */}
        {/* defence when the user toggles the in-app setting.                */}
        <div className="flex justify-center pt-2 pb-1">
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white/30 motion-safe:animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

      </div>
    </section>
  );
}
