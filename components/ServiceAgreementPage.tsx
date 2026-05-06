"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const KEY = "serviceAgreementPage";

type Section = {
  id: string;
  heading: string;
  body: string;
  easyRead: string;
};

type RelatedLink = {
  label: string;
  href: string;
};

type AdvocacyLink = {
  label: string;
  href: string;
  external: boolean;
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function BookIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

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

// ── Body renderer: splits on \n\n so JSON stays readable ─────────────────────

function BodyText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <p key={i} className="font-body text-base text-slate/75 leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ServiceAgreementPage() {
  const { t, tArray, lang } = useLanguage();
  const [isEasyRead, setIsEasyRead] = useState(false);

  const sections      = tArray<Section>(`${KEY}.sections`);
  const relatedLinks  = tArray<RelatedLink>(`${KEY}.relatedLinks.links`);
  const advocacyLinks = tArray<AdvocacyLink>(`${KEY}.advocacy.links`);

  const dateFormatter = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function formatDate(iso: string): string {
    return dateFormatter.format(new Date(`${iso}T00:00:00`));
  }

  const lastReviewed  = t(`${KEY}.lastReviewed`);
  const nextReviewDue = t(`${KEY}.nextReviewDue`);
  const introBody     = t(`${KEY}.intro.body`);
  const introEasyRead = t(`${KEY}.intro.easyRead`);
  const displayIntro  = isEasyRead ? introEasyRead : introBody;

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
              <li className="text-white/70" aria-current="page">
                {t(`${KEY}.heading`)}
              </li>
            </ol>
          </nav>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance mb-4">
            {t(`${KEY}.heading`)}
          </h1>

          {/* Subheading */}
          <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mb-6">
            {t(`${KEY}.subheading`)}
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

          {/* Easy Read toggle */}
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
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* Intro */}
          <div className="mb-12 pb-12 border-b border-slate/10">
            <BodyText text={displayIntro} />
          </div>

          {/* Sections — Easy Read is page-level: one toggle switches all */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={`section-${section.id}`}>
                <h2
                  id={`section-${section.id}`}
                  className="font-display text-xl sm:text-2xl text-navy mb-4 leading-snug"
                >
                  {section.heading}
                </h2>
                <BodyText text={isEasyRead ? section.easyRead : section.body} />
              </section>
            ))}
          </div>

          {/* ── Advocacy callout ─────────────────────────────────────────── */}
          <div className="mt-14 bg-teal/5 border border-teal/20 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl text-navy mb-2">
              {t(`${KEY}.advocacy.heading`)}
            </h2>
            <p className="font-body text-sm text-slate/70 leading-relaxed mb-5">
              {t(`${KEY}.advocacy.body`)}
            </p>
            <ul className="flex flex-col sm:flex-row gap-3">
              {advocacyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                  >
                    {link.label}
                    <ExternalLinkIcon />
                    <span className="sr-only">opens in new tab</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Related links — rendered only when data is present ────────── */}
          {relatedLinks.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl text-navy mb-4">
                {t(`${KEY}.relatedLinks.heading`)}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex items-center justify-between gap-3 bg-white border border-slate/10 rounded-xl px-4 py-3 font-body text-sm font-semibold text-navy hover:border-teal/40 hover:text-teal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal group"
                    >
                      {link.label}
                      <ArrowRightIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Legal basis callout ───────────────────────────────────────── */}
          <div className="mt-10 flex gap-3 items-start bg-slate/5 border border-slate/10 rounded-xl p-4">
            <span className="text-slate/40 flex-shrink-0 mt-0.5">
              <ScalesIcon />
            </span>
            <p className="font-body text-xs leading-relaxed text-slate/50">
              <span className="font-semibold text-slate/60">Legal basis: </span>
              {t(`${KEY}.legalBasis`)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
