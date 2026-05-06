"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const REGISTRATION_GROUP = "0107";

type Section = {
  id: string;
  heading: string;
  body: string;
  easyRead: string;
};

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  link: string;
};

type Props = {
  jsonKey: string;
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

// ── Body renderer ─────────────────────────────────────────────────────────────
// Splits on \n\n so JSON stays readable without nested arrays.
// Easy Read mode applies larger spacing between short paragraphs to create
// the visual breathing room that makes bullet-style lists legible.

function BodyText({ text, isEasyRead }: { text: string; isEasyRead: boolean }) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return (
    <div className={isEasyRead ? "space-y-5" : "space-y-4"}>
      {paragraphs.map((para, i) => (
        <p
          key={i}
          className={[
            "font-body text-base leading-relaxed",
            isEasyRead ? "text-slate/80" : "text-slate/75",
          ].join(" ")}
        >
          {para}
        </p>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ServicePage({ jsonKey }: Props) {
  const { t, tArray } = useLanguage();
  const [isEasyRead, setIsEasyRead] = useState(false);

  const sections      = tArray<Section>(`${jsonKey}.sections`);
  const relatedSlugs  = tArray<string>(`${jsonKey}.relatedServices`);
  const allCards      = tArray<ServiceCard>("services.cards");

  // Resolve related service slugs against services.cards — single source of truth
  // for service names so individual pages never duplicate that data.
  const relatedCards = relatedSlugs
    .map((slug) => allCards.find((c) => c.id === slug))
    .filter((c): c is ServiceCard => c !== undefined);

  const name              = t(`${jsonKey}.name`);
  const tagline           = t(`${jsonKey}.tagline`);
  const lineItem          = t(`${jsonKey}.lineItem`);
  const registrationGroup = t(`${jsonKey}.registrationGroup`);
  const introBody         = t(`${jsonKey}.intro.body`);
  const introEasyRead     = t(`${jsonKey}.intro.easyRead`);

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
                <a href="/#services" className="hover:text-white transition-colors duration-150">Services</a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-white/70" aria-current="page">{name}</li>
            </ol>
          </nav>

          {/* Tagline */}
          <p className="font-body text-sm font-semibold text-teal-light uppercase tracking-wide mb-3">
            {tagline}
          </p>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance mb-5">
            {name}
          </h1>

          {/* Line item + registration group — visible to coordinators, unobtrusive for participants */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="font-body text-xs text-white/50 bg-white/8 border border-white/15 px-2.5 py-1 rounded-full">
              Line item: {lineItem}
            </span>
            <span className="font-body text-xs text-white/50 bg-white/8 border border-white/15 px-2.5 py-1 rounded-full">
              Reg. group {REGISTRATION_GROUP}
            </span>
          </div>

          {/* Easy Read toggle — page-level: one click switches all sections */}
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
            <BodyText
              text={isEasyRead ? introEasyRead : introBody}
              isEasyRead={isEasyRead}
            />
          </div>

          {/* Sections — isEasyRead is page-level, passed to every section */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={`section-${section.id}`}>
                <h2
                  id={`section-${section.id}`}
                  className="font-display text-xl sm:text-2xl text-navy mb-4 leading-snug"
                >
                  {section.heading}
                </h2>
                <BodyText
                  text={isEasyRead ? section.easyRead : section.body}
                  isEasyRead={isEasyRead}
                />
              </section>
            ))}
          </div>

          {/* ── Related services ─────────────────────────────────────────── */}
          {relatedCards.length > 0 && (
            <div className="mt-14 pt-10 border-t border-slate/10">
              <h2 className="font-display text-xl text-navy mb-5">Related services</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedCards.map((card) => (
                  <li key={card.id}>
                    <a
                      href={card.link}
                      className="flex flex-col h-full bg-white border border-slate/10 rounded-xl p-4 hover:border-teal/40 hover:shadow-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal group"
                    >
                      <h3 className="font-body text-sm font-semibold text-navy mb-2 group-hover:text-teal transition-colors duration-150">
                        {card.title}
                      </h3>
                      <p className="font-body text-xs text-slate/60 leading-relaxed flex-1 mb-3">
                        {card.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-teal">
                        Learn more <ArrowRightIcon />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
