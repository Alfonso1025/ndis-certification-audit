"use client";

import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/constants/site-config";

const KEY = "workerScreeningPage";

type SectionCta = {
  label: string;
  href: string;
};

type Section = {
  id: string;
  heading: string;
  body: string;
  cta?: SectionCta;
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function CheckBadgeIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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

// ── Body renderer: splits \n\n into separate <p> elements ────────────────────

function BodyText({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").filter(Boolean).map((para, i) => (
        <p key={i} className="font-body text-base text-slate/75 leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WorkerScreeningPage() {
  const { t, tArray, lang } = useLanguage();

  const sections = tArray<Section>(`${KEY}.sections`);

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

          {/* Date metadata — no Easy Read toggle: easyRead is false for this page */}
          <dl className="flex flex-wrap gap-x-8 gap-y-1.5 font-body text-sm">
            <div className="flex items-center gap-2">
              <dt className="text-white/40">{t("policies.lastUpdatedLabel")}</dt>
              <dd className="text-white/70">{formatDate(lastReviewed)}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-white/40">{t("policies.nextReviewLabel")}</dt>
              <dd className="text-white/70">{formatDate(nextReviewDue)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* ── Commitment block ─────────────────────────────────────────── */}
          {/*
            Teal left-border accent + badge: first thing a participant or
            auditor sees. Carries the unconditional commitment above all policy
            detail. Visual weight is intentional.
          */}
          <div className="border-l-4 border-teal pl-6 py-1 mb-14">
            <h2 className="font-display text-xl text-navy mb-3">
              {t(`${KEY}.commitment.heading`)}
            </h2>
            <p className="font-body text-base sm:text-lg text-slate/80 leading-relaxed mb-4">
              {t(`${KEY}.commitment.body`)}
            </p>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold text-teal bg-teal/8 border border-teal/20 px-3 py-1.5 rounded-full">
              <CheckBadgeIcon />
              {t(`${KEY}.commitment.badge`)}
            </span>
          </div>

          {/* ── Policy sections ──────────────────────────────────────────── */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={`section-${section.id}`}>
                <h2
                  id={`section-${section.id}`}
                  className="font-display text-xl sm:text-2xl text-navy mb-4 leading-snug"
                >
                  {section.heading}
                </h2>
                <BodyText text={section.body} />

                {/* Inline CTA — present only on your-right-to-verify */}
                {section.cta && (
                  <div className="mt-6">
                    <a
                      href={section.cta.href}
                      className="inline-flex items-center gap-2 font-body text-sm font-semibold text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                    >
                      {section.cta.label}
                      <ArrowRightIcon />
                    </a>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* ── Verify callout — navy action block, second conversion point ── */}
          <div className="mt-14 bg-navy rounded-2xl px-6 py-8 sm:px-10 sm:py-10 text-white">
            <h2 className="font-display text-xl sm:text-2xl mb-2">
              {t(`${KEY}.verifyCallout.heading`)}
            </h2>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-6 max-w-lg">
              {t(`${KEY}.verifyCallout.body`)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-body text-sm font-semibold px-5 py-3 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <PhoneIcon />
                <span>
                  <span className="block text-xs text-white/50 font-normal leading-none mb-0.5">
                    {t(`${KEY}.verifyCallout.phoneLabel`)}
                  </span>
                  {siteConfig.phone}
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-body text-sm font-semibold px-5 py-3 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <EmailIcon />
                <span>
                  <span className="block text-xs text-white/50 font-normal leading-none mb-0.5">
                    {t(`${KEY}.verifyCallout.emailLabel`)}
                  </span>
                  {siteConfig.email}
                </span>
              </a>
            </div>
          </div>

          {/* ── Legal basis ───────────────────────────────────────────────── */}
          <div className="mt-8 flex gap-3 items-start bg-slate/5 border border-slate/10 rounded-xl p-4">
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
