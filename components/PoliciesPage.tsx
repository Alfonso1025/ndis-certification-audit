"use client";

import { useLanguage } from "@/context/LanguageContext";

type Policy = {
  slug: string;
  name: string;
  description: string;
  version: string;
  lastReviewed: string;   // ISO 8601 — "2026-05-01"
  nextReviewDue: string;  // ISO 8601 — "2027-05-01"
  category: string;
  easyRead: boolean;
  href: string;
};

// Category → pill styling
const CATEGORY_STYLES: Record<string, string> = {
  "Participant Rights": "bg-teal/10 text-teal",
  "Governance":        "bg-navy/10 text-navy",
  "Workforce":         "bg-amber-light text-slate",
  "Service Delivery":  "bg-slate/10 text-slate",
};

function isOverdue(isoDate: string): boolean {
  return new Date(isoDate) < new Date();
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function PoliciesPage() {
  const { t, tArray, lang } = useLanguage();
  const policies = tArray<Policy>("policies.items");

  /*
    Intl.DateTimeFormat with the active language code formats dates automatically
    per locale — no extra code needed when the language switcher changes.
    "en" → "1 May 2026"   "ar" → "١ مايو ٢٠٢٦"
    "bn" → "১ মে ২০২৬"    "hi" → "१ मई २०२६"
  */
  const dateFormatter = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function formatDate(iso: string): string {
    // Append T00:00:00 to parse as local midnight, not UTC midnight, avoiding
    // off-by-one-day issues in AEST/AEDT (UTC+10/11).
    return dateFormatter.format(new Date(`${iso}T00:00:00`));
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-sm text-white/45">
              <li>
                <a href="/" className="hover:text-white transition-colors duration-150">Home</a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-white/70" aria-current="page">Policy Library</li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance mb-4">
            {t("policies.heading")}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            {t("policies.subheading")}
          </p>
        </div>
      </div>

      {/* ── Policy grid ──────────────────────────────────────────────────── */}
      <div className="bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            aria-label="Policy documents"
          >
            {policies.map((policy) => {
              const overdue = isOverdue(policy.nextReviewDue);
              const categoryStyle =
                CATEGORY_STYLES[policy.category] ?? "bg-slate/10 text-slate";

              return (
                <li key={policy.slug}>
                  <article
                    className={[
                      "h-full flex flex-col bg-white rounded-2xl border shadow-sm overflow-hidden",
                      "transition-shadow duration-200 hover:shadow-md",
                      overdue ? "border-amber-400/60" : "border-slate/10",
                    ].join(" ")}
                    aria-labelledby={`policy-${policy.slug}`}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
                      {/* Category pill */}
                      <span className={`inline-block font-body text-xs font-semibold px-2.5 py-1 rounded-full ${categoryStyle}`}>
                        {policy.category}
                      </span>

                      {/* Review overdue badge — shown when nextReviewDue is in the past */}
                      {overdue ? (
                        <span className="inline-flex items-center gap-1 font-body text-xs font-semibold text-amber-700 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full flex-shrink-0">
                          <svg aria-hidden="true" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                          </svg>
                          Review overdue
                        </span>
                      ) : (
                        /* Version — shown only when not overdue to avoid clutter */
                        <span className="font-body text-xs text-slate/40 flex-shrink-0">
                          {t("policies.versionLabel")} {policy.version}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 px-5 pb-5">
                      <h2
                        id={`policy-${policy.slug}`}
                        className="font-display text-lg text-navy leading-snug mb-2"
                      >
                        {policy.name}
                      </h2>
                      <p className="font-body text-sm text-slate/85 leading-relaxed flex-1 mb-4">
                        {policy.description}
                      </p>

                      {/* Dates */}
                      <dl className="space-y-1 mb-4">
                        <div className="flex items-center gap-1.5">
                          <dt className="font-body text-xs text-slate/40 w-28 flex-shrink-0">
                            {t("policies.lastUpdatedLabel")}
                          </dt>
                          <dd className="font-body text-xs text-slate/65">
                            {formatDate(policy.lastReviewed)}
                          </dd>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <dt className={`font-body text-xs w-28 flex-shrink-0 ${overdue ? "text-amber-600" : "text-slate/40"}`}>
                            {t("policies.nextReviewLabel")}
                          </dt>
                          <dd className={`font-body text-xs ${overdue ? "text-amber-700 font-semibold" : "text-slate/65"}`}>
                            {formatDate(policy.nextReviewDue)}
                          </dd>
                        </div>
                      </dl>

                      {/* Footer row: Easy Read badge + Read link */}
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          {/*
                            easyRead: false → badge absent entirely.
                            Showing "not available" is a disabled state on a
                            library card — unhelpful noise. Absence is cleaner.
                          */}
                          {policy.easyRead && (
                            <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-teal bg-teal/8 px-2.5 py-1 rounded-full border border-teal/20">
                              <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              {t("policies.easyReadBadge")}
                            </span>
                          )}
                        </div>
                        <a
                          href={policy.href}
                          className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded flex-shrink-0"
                        >
                          {t("policies.readPolicyLabel")}
                          <ArrowIcon />
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
