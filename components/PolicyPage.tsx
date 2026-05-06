"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Section = {
  heading: string;
  body: string;
  easyRead?: string;
};

type Props = {
  jsonKey: string;
  easyRead: boolean;
};


function ScalesIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v2" />
      <path d="M5 5h14" />
      <path d="M5 5l-2 7" />
      <path d="M19 5l2 7" />
      <path d="M1 12h6" />
      <path d="M17 12h6" />
      <path d="M12 5v14" />
      <path d="M9 19h6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

export default function PolicyPage({ jsonKey, easyRead }: Props) {
  const { t, tArray, lang } = useLanguage();
  const [isEasyRead, setIsEasyRead] = useState(false);

  const sections = tArray<Section>(`${jsonKey}.sections`);

  const dateFormatter = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function formatDate(iso: string): string {
    return dateFormatter.format(new Date(`${iso}T00:00:00`));
  }

  const policyName     = t(`${jsonKey}.name`);
  const version        = t(`${jsonKey}.version`);
  const lastReviewed   = t(`${jsonKey}.lastReviewed`);
  const nextReviewDue  = t(`${jsonKey}.nextReviewDue`);
  const category       = t(`${jsonKey}.category`);
  const heading        = t(`${jsonKey}.heading`);
  const subheading     = t(`${jsonKey}.subheading`);
  const introBody      = t(`${jsonKey}.intro.body`);
  const introEasyRead  = easyRead ? t(`${jsonKey}.intro.easyRead`) : "";
  const legalBasis     = t(`${jsonKey}.legalBasis`);

  const displayIntro   = easyRead && isEasyRead && introEasyRead ? introEasyRead : introBody;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-sm text-white/45">
              <li>
                <a href="/" className="hover:text-white transition-colors duration-150">Home</a>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <a href="/policies" className="hover:text-white transition-colors duration-150">
                  {t("policies.heading")}
                </a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-white/70" aria-current="page">{policyName}</li>
            </ol>
          </nav>

          {/* Category pill + version */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block font-body text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
              {category}
            </span>
            <span className="font-body text-xs text-white/35">
              {t("policies.versionLabel")} {version}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance mb-4">
            {heading}
          </h1>

          {/* Subheading */}
          <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mb-6">
            {subheading}
          </p>

          {/* Date metadata */}
          <dl className="flex flex-wrap gap-x-8 gap-y-1.5 font-body text-sm mb-6">
            <div className="flex items-center gap-2">
              <dt className="text-white/40">{t("policies.lastUpdatedLabel")}</dt>
              <dd className="text-white/70">{formatDate(lastReviewed)}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-white/40">{t("policies.nextReviewLabel")}</dt>
              <dd className="text-white/70">{formatDate(nextReviewDue)}</dd>
            </div>
          </dl>

          {/* Easy Read toggle — absent entirely when easyRead is false */}
          {easyRead && (
            <button
              type="button"
              aria-pressed={isEasyRead}
              onClick={() => setIsEasyRead((prev) => !prev)}
              className={[
                "inline-flex items-center gap-2 font-body text-sm font-semibold px-4 py-2 rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                isEasyRead
                  ? "bg-teal text-white border-teal"
                  : "bg-white/10 text-white/80 border-white/25 hover:bg-white/20",
              ].join(" ")}
            >
              <BookIcon />
              {t("policies.easyReadBadge")}
            </button>
          )}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* Intro paragraph */}
          <div className="mb-12">
            <p className="font-body text-base sm:text-lg text-slate/80 leading-relaxed">
              {displayIntro}
            </p>
          </div>

          {/* Policy sections */}
          <div className="space-y-10">
            {sections.map((section, i) => {
              const sectionId = `section-${i}`;
              const displayBody =
                easyRead && isEasyRead && section.easyRead
                  ? section.easyRead
                  : section.body;

              return (
                <section key={sectionId} aria-labelledby={sectionId}>
                  <h2
                    id={sectionId}
                    className="font-display text-xl sm:text-2xl text-navy mb-3 leading-snug"
                  >
                    {section.heading}
                  </h2>
                  <p className="font-body text-base text-slate/75 leading-relaxed">
                    {displayBody}
                  </p>
                </section>
              );
            })}
          </div>

          {/* Legal basis callout */}
          <div className="mt-14 flex gap-3 items-start bg-slate/5 border border-slate/10 rounded-xl p-4">
            <span className="text-slate/40 flex-shrink-0 mt-0.5">
              <ScalesIcon />
            </span>
            <p className="font-body text-xs leading-relaxed text-slate/50">
              <span className="font-semibold text-slate/60">Legal basis: </span>
              {legalBasis}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
