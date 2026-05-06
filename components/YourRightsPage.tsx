"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// basis field exists in JSON for audit/developer reference — never rendered
type Right = {
  id: string;
  heading: string;
  body: string;
  easyRead: string;
  basis: string;
  linkLabel?: string;
  link?: string;
  linkExternal?: boolean;
};

type AdvocacyLink = {
  label: string;
  href: string;
  external: boolean;
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-3.5 h-3.5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ExternalIcon />
      <span className="sr-only">opens in new tab</span>
    </a>
  );
}

export default function YourRightsPage() {
  const { t, tArray } = useLanguage();
  const [easyReadMode, setEasyReadMode] = useState(false);

  const rights = tArray<Right>("rightsPage.rights");
  const advocacyLinks = tArray<AdvocacyLink>("rightsPage.advocacy.links");

  return (
    <>
      {/* ── Hero / heading strip ─────────────────────────────────────────── */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-body text-sm text-white/45">
              <li>
                <a href="/" className="hover:text-white transition-colors duration-150">
                  Home
                </a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-white/70" aria-current="page">
                Your Rights
              </li>
            </ol>
          </nav>

          {/* H1 */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance mb-4">
            {t("rightsPage.heading")}
          </h1>

          {/*
            Metadata bar — NDIS Outcome 2.1 audit requirement.
            Review dates must be visible near the heading, not buried in the footer.
          */}
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-white/45 mb-5"
            aria-label="Document review dates"
          >
            <span>{t("rightsPage.lastReviewed")}</span>
            <span aria-hidden="true">·</span>
            <span>{t("rightsPage.nextReview")}</span>
          </div>

          {/* Standards reference */}
          <p className="font-body text-sm text-teal-light/75 mb-7 max-w-2xl">
            {t("rightsPage.standard")}
          </p>

          {/* Subheading */}
          <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            {t("rightsPage.subheading")}
          </p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* Easy Read toggle + intro */}
          <div className="mb-10">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/40">
                {easyReadMode ? "Easy Read" : "Standard"}
              </p>
              <button
                type="button"
                onClick={() => setEasyReadMode((v) => !v)}
                title={t("rightsPage.easyReadToggle.tooltip")}
                aria-pressed={easyReadMode}
                className="inline-flex items-center gap-2 rounded-xl border border-teal px-4 py-2 font-body text-sm font-semibold text-teal hover:bg-teal hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {easyReadMode
                  ? t("rightsPage.easyReadToggle.deactivate")
                  : t("rightsPage.easyReadToggle.activate")}
              </button>
            </div>
            <p className="font-body text-slate/70 text-base leading-relaxed">
              {easyReadMode
                ? t("rightsPage.intro.easyRead")
                : t("rightsPage.intro.body")}
            </p>
          </div>

          {/* ── Rights list ───────────────────────────────────────────────── */}
          <ol className="space-y-4" aria-label="Your rights as an NDIS participant">
            {rights.map((right, index) => (
              <li key={right.id}>
                <article
                  className="bg-white rounded-2xl border border-slate/10 shadow-sm p-6 sm:p-8"
                  aria-labelledby={`right-${right.id}`}
                >
                  <div className="flex items-start gap-5">
                    {/* Number badge */}
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-9 h-9 rounded-full bg-teal/10 text-teal font-body font-bold text-sm flex items-center justify-center mt-0.5"
                    >
                      {index + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h2
                        id={`right-${right.id}`}
                        className="font-display text-xl sm:text-2xl text-navy mb-3"
                      >
                        {right.heading}
                      </h2>
                      <p className="font-body text-slate/70 text-sm sm:text-base leading-relaxed">
                        {easyReadMode ? right.easyRead : right.body}
                      </p>

                      {/* Optional link — internal or external */}
                      {right.linkLabel && right.link && (
                        <div className="mt-4">
                          {right.linkExternal ? (
                            <ExternalLink
                              href={right.link}
                              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                            >
                              {right.linkLabel}
                            </ExternalLink>
                          ) : (
                            <a
                              href={right.link}
                              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                            >
                              {right.linkLabel}
                              <ArrowIcon />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          {/* ── If rights not respected ───────────────────────────────────── */}
          <section
            aria-labelledby="not-respected-heading"
            className="mt-14 md:mt-20"
          >
            <h2
              id="not-respected-heading"
              className="font-display text-2xl sm:text-3xl text-navy mb-4"
            >
              {t("rightsPage.ifNotRespected.heading")}
            </h2>
            <p className="font-body text-slate/70 leading-relaxed mb-6">
              {t("rightsPage.ifNotRespected.body")}
            </p>
            <a
              href={t("rightsPage.ifNotRespected.complaintsHref")}
              className="inline-flex items-center gap-2 bg-teal text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-teal/90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 mb-8"
            >
              {t("rightsPage.ifNotRespected.complaintsLinkLabel")}
              <ArrowIcon />
            </a>

            {/* NDIS Commission callout */}
            <div className="bg-navy text-white rounded-2xl p-6 sm:p-8">
              <p className="font-body text-sm text-white/65 leading-relaxed mb-5">
                {t("rightsPage.ifNotRespected.commission.body")}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <a
                  href={`tel:${t("rightsPage.ifNotRespected.commission.phone").replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm text-teal-light hover:text-white transition-colors duration-150"
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {t("rightsPage.ifNotRespected.commission.phoneLabel")} —{" "}
                  {t("rightsPage.ifNotRespected.commission.phone")}
                </a>
                <span aria-hidden="true" className="hidden sm:inline text-white/25">·</span>
                <ExternalLink
                  href={t("rightsPage.ifNotRespected.commission.href")}
                  className="inline-flex items-center gap-1.5 font-body text-sm text-white/55 hover:text-teal-light transition-colors duration-150"
                >
                  {t("rightsPage.ifNotRespected.commission.linkLabel")}
                </ExternalLink>
              </div>
              <p className="font-body text-xs text-white/35 mt-4">
                {t("rightsPage.ifNotRespected.commission.tty")}
              </p>
            </div>
          </section>

          {/* ── Advocacy section ─────────────────────────────────────────── */}
          <section
            aria-labelledby="advocacy-heading"
            className="mt-14 md:mt-20"
          >
            <h2
              id="advocacy-heading"
              className="font-display text-2xl sm:text-3xl text-navy mb-4"
            >
              {t("rightsPage.advocacy.heading")}
            </h2>
            <p className="font-body text-slate/70 leading-relaxed mb-6">
              {t("rightsPage.advocacy.body")}
            </p>
            <ul className="flex flex-col gap-3">
              {advocacyLinks.map((link) => (
                <li key={link.href}>
                  <ExternalLink
                    href={link.href}
                    className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </>
  );
}
