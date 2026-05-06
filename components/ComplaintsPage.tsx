"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Step = {
  number: number;
  heading: string;
  body: string;
  detail?: string;
  timeframe?: string;
  linkLabel?: string;
  href?: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type WayItem = {
  method: string;
  detail: string;
  linkLabel?: string;
  href?: string;
};

type AdvocacyLink = {
  label: string;
  href: string;
  external: boolean;
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function ComplaintsPage() {
  const { t, tArray } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = tArray<Step>("complaintsPage.process.steps");
  const faqItems = tArray<FaqItem>("complaintsPage.faq.items");
  const wayItems = tArray<WayItem>("complaintsPage.waysToComplain.items");
  const advocacyLinks = tArray<AdvocacyLink>("complaintsPage.advocacy.links");

  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-sm text-white/45">
              <li><a href="/" className="hover:text-white transition-colors duration-150">Home</a></li>
              <li aria-hidden="true">›</li>
              <li className="text-white/70" aria-current="page">How to Make a Complaint</li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance mb-4">
            {t("complaintsPage.heading")}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            {t("complaintsPage.subheading")}
          </p>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

          {/*
            NDIS Act s.73W / Audit Point 16:
            commissionFirst MUST appear above the fold on desktop and mobile (375px).
            Do not move this block below the process steps or the form CTA.
          */}
          <div className="bg-amber-light border border-amber-200 rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg aria-hidden="true" className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl sm:text-2xl text-navy mb-2">
                  {t("complaintsPage.commissionFirst.heading")}
                </h2>
                <p className="font-body text-sm sm:text-base text-slate/75 leading-relaxed mb-5">
                  {t("complaintsPage.commissionFirst.body")}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <a
                    href={`tel:${t("complaintsPage.commissionFirst.phone").replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 font-body font-semibold text-sm text-navy hover:text-teal transition-colors duration-150"
                  >
                    <PhoneIcon />
                    {t("complaintsPage.commissionFirst.phoneLabel")} — {t("complaintsPage.commissionFirst.phone")}
                  </a>
                  <span aria-hidden="true" className="hidden sm:inline text-slate/30">·</span>
                  <a
                    href={t("complaintsPage.commissionFirst.href")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm text-navy/60 hover:text-teal transition-colors duration-150"
                  >
                    <GlobeIcon />
                    {t("complaintsPage.commissionFirst.linkLabel")}
                    <ExternalIcon />
                    <span className="sr-only">opens in new tab</span>
                  </a>
                </div>
                <p className="font-body text-xs text-slate/45 mt-3">
                  {t("complaintsPage.commissionFirst.tty")} · {t("complaintsPage.commissionFirst.hours")}
                </p>
              </div>
            </div>
          </div>

          {/* Safety statement */}
          <div className="bg-teal-light rounded-2xl p-6 mb-6">
            <h2 className="font-display text-xl text-navy mb-2">
              {t("complaintsPage.safetyStatement.heading")}
            </h2>
            <p className="font-body text-sm sm:text-base text-slate/70 leading-relaxed">
              {t("complaintsPage.safetyStatement.body")}
            </p>
          </div>

          {/* Form CTA — prominent button version (appears near top of page) */}
          <div className="bg-white border border-slate/10 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-xl text-navy mb-1">
                {t("complaintsPage.formCta.heading")}
              </h2>
              <p className="font-body text-sm text-slate/60">
                {t("complaintsPage.formCta.body")}
              </p>
            </div>
            <a
              href={t("complaintsPage.formCta.href")}
              className="inline-flex items-center gap-2 flex-shrink-0 bg-teal text-white font-body font-semibold text-sm px-6 py-3 rounded-xl hover:bg-teal/90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              {t("complaintsPage.formCta.linkLabel")}
              <ArrowIcon />
            </a>
          </div>

          {/* ── Step-by-step process ───────────────────────────────────── */}
          <section aria-labelledby="process-heading" className="mb-14 md:mb-20">
            <h2 id="process-heading" className="font-display text-2xl sm:text-3xl text-navy mb-2">
              {t("complaintsPage.process.heading")}
            </h2>
            <p className="font-body text-sm text-slate/60 mb-8">
              {t("complaintsPage.process.subheading")}
            </p>

            <ol className="relative space-y-0" aria-label="Complaint process steps">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                return (
                  <li key={step.number} className="relative flex gap-6">
                    {/* Connector line */}
                    {!isLast && (
                      <div aria-hidden="true" className="absolute left-5 top-10 bottom-0 w-px bg-slate/15" />
                    )}
                    {/* Step number */}
                    <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-navy text-white font-body font-bold text-sm flex items-center justify-center z-10">
                      {step.number}
                    </div>
                    {/* Step content */}
                    <div className={`flex-1 pb-8 ${isLast ? "" : ""}`}>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-display text-lg sm:text-xl text-navy">
                          {step.heading}
                        </h3>
                        {step.timeframe && (
                          <span className="font-body text-xs font-semibold text-teal bg-teal/10 px-3 py-1 rounded-full">
                            {step.timeframe}
                          </span>
                        )}
                      </div>
                      <p className="font-body text-sm sm:text-base text-slate/70 leading-relaxed">
                        {step.body}
                      </p>
                      {step.detail && (
                        <p className="font-body text-xs text-slate/50 mt-2 italic">
                          {step.detail}
                        </p>
                      )}
                      {step.linkLabel && step.href && (
                        <a
                          href={step.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-3 font-body text-sm font-semibold text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                        >
                          {step.linkLabel}
                          <ExternalIcon />
                          <span className="sr-only">opens in new tab</span>
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* ── FAQ accordion ─────────────────────────────────────────── */}
          <section aria-labelledby="faq-heading" className="mb-14 md:mb-20">
            <h2 id="faq-heading" className="font-display text-2xl sm:text-3xl text-navy mb-6">
              {t("complaintsPage.faq.heading")}
            </h2>
            <div className="space-y-2">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                const btnId = `faq-btn-${index}`;
                const panelId = `faq-panel-${index}`;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-slate/10 overflow-hidden"
                  >
                    <h3>
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-body font-semibold text-sm sm:text-base text-navy hover:bg-off-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal"
                      >
                        <span>{item.question}</span>
                        <ChevronIcon open={isOpen} />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      hidden={!isOpen}
                    >
                      <p className="px-6 pb-5 pt-1 font-body text-sm text-slate/70 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Ways to complain ──────────────────────────────────────── */}
          <section aria-labelledby="ways-heading" className="mb-14 md:mb-20">
            <h2 id="ways-heading" className="font-display text-2xl sm:text-3xl text-navy mb-6">
              {t("complaintsPage.waysToComplain.heading")}
            </h2>

            {/*
              ⚠️  PRE-LAUNCH: Phone, Email, and postal address items below contain
              placeholder text from the JSON ("[YOUR PHONE]", "[YOUR EMAIL]",
              "[YOUR ADDRESS]"). These must be replaced before the page goes live —
              they are legally required contact details under the NDIS Complaints
              Management and Resolution Rules 2018.
            */}
            <ul className="space-y-3">
              {wayItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-white rounded-xl border border-slate/10 px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-3"
                >
                  <span className="font-body font-semibold text-sm text-navy min-w-[120px] flex-shrink-0">
                    {item.method}
                  </span>
                  <div className="flex-1">
                    <p className="font-body text-sm text-slate/65 leading-relaxed">
                      {item.detail}
                    </p>
                    {/* Form link — simpler link-weight version of the formCta */}
                    {item.linkLabel && item.href && (
                      <a
                        href={item.href}
                        className="inline-flex items-center gap-1.5 mt-2 font-body text-sm font-semibold text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                      >
                        {item.linkLabel}
                        <ArrowIcon />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Commission bottom callout ─────────────────────────────── */}
          <section aria-labelledby="commission-bottom-heading" className="mb-14 md:mb-20">
            <div className="bg-navy text-white rounded-2xl p-6 sm:p-8">
              <h2
                id="commission-bottom-heading"
                className="font-display text-xl sm:text-2xl mb-3"
              >
                {t("complaintsPage.commissionBottom.heading")}
              </h2>
              <p className="font-body text-sm text-white/65 leading-relaxed mb-6">
                {t("complaintsPage.commissionBottom.body")}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${t("complaintsPage.commissionBottom.phone").replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm text-teal-light hover:text-white transition-colors duration-150"
                >
                  <PhoneIcon />
                  {t("complaintsPage.commissionBottom.phoneLabel")} — {t("complaintsPage.commissionBottom.phone")}
                </a>
                <a
                  href={t("complaintsPage.commissionBottom.href")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm text-white/55 hover:text-teal-light transition-colors duration-150"
                >
                  <GlobeIcon />
                  {t("complaintsPage.commissionBottom.linkLabel")}
                  <ExternalIcon />
                  <span className="sr-only">opens in new tab</span>
                </a>
                <a
                  href={t("complaintsPage.commissionBottom.makeComplaintLink")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-teal-light hover:text-white transition-colors duration-150"
                >
                  {t("complaintsPage.commissionBottom.makeComplaintLabel")}
                  <ExternalIcon />
                  <span className="sr-only">opens in new tab</span>
                </a>
              </div>
              <p className="font-body text-xs text-white/35 mt-5">
                {t("complaintsPage.commissionBottom.tty")}
              </p>
            </div>
          </section>

          {/* ── Advocacy ─────────────────────────────────────────────── */}
          <section aria-labelledby="advocacy-heading">
            <h2
              id="advocacy-heading"
              className="font-display text-2xl sm:text-3xl text-navy mb-4"
            >
              {t("complaintsPage.advocacy.heading")}
            </h2>
            <p className="font-body text-slate/70 leading-relaxed mb-6">
              {t("complaintsPage.advocacy.body")}
            </p>
            <ul className="flex flex-col gap-3">
              {advocacyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-teal hover:text-teal/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                  >
                    {link.label}
                    <ExternalIcon />
                    <span className="sr-only">opens in new tab</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </>
  );
}
