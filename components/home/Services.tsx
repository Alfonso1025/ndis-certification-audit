"use client";

import React from "react";
import {
  IconUserHeart,
  IconChefHat,
  IconHome2,
  IconPill,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

type Service = {
  id: string;
  title: string;
  category: string;
  icon: string;
  colour: "teal" | "navy" | "amber" | "coral";
  description: string;
  lineItem: string;
  link: string;
  linkLabel: string;
};

const ICON_MAP: Record<string, React.ElementType> = {
  IconUserHeart,
  IconChefHat,
  IconHome2,
  IconPill,
};

const COLOUR_CLASSES: Record<string, string> = {
  teal:  "bg-teal-light text-teal",
  navy:  "bg-navy/10 text-navy",
  amber: "bg-amber-light text-amber",
  coral: "bg-coral-light text-coral",
};

export default function Services() {
  const { t, tArray } = useLanguage();
  const services = tArray<Service>("services.cards");

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="min-h-screen flex flex-col justify-center bg-off-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2
            id="services-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-navy leading-[1.15] mb-4"
          >
            {t("services.heading")}
          </h2>
          <p className="font-body text-slate/75 text-base sm:text-lg leading-relaxed">
            {t("services.subheading")}
          </p>
        </div>

        {/* ── Services grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? IconUserHeart;
            const iconClass = COLOUR_CLASSES[service.colour] ?? COLOUR_CLASSES.teal;

            return (
              <article
                key={service.id}
                className="group bg-white rounded-2xl border border-slate/10 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col p-5 sm:p-6"
              >
                {/* Icon container */}
                <div
                  className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-4 flex-shrink-0 ${iconClass}`}
                >
                  <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
                </div>

                {/* Category tag */}
                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-slate/45 mb-2">
                  {service.category}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg sm:text-xl text-navy leading-snug mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-slate/70 leading-relaxed flex-1 mb-5">
                  {service.description}
                </p>

                {/* Footer — learn more left, line item right */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate/8">
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-teal hover:text-teal/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded shrink-0"
                  >
                    {t("services.learnMore")}
                    <svg
                      aria-hidden="true"
                      className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <span className="font-mono text-[10px] text-slate/35 text-right leading-tight">
                    {service.lineItem}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── NDIS compliance note ─────────────────────────────────────── */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="font-body text-xs text-slate/55">
            {t("services.ndisNote")}
          </p>
        </div>
      </div>
    </section>
  );
}
