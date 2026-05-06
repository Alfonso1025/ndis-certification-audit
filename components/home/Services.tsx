"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  type Service = {
    id: string;
    title: string;
    imageAlt: string;
    description: string;
    image: string;
    link: string;
    linkLabel: string;
  };
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
          {services.map((service) => (
            <article
              key={service.id}
              className="group bg-white rounded-2xl border border-slate/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Card image */}
              <div className="aspect-[4/3] bg-teal-light/50 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card content */}
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <h3 className="font-display text-lg sm:text-xl text-navy leading-snug mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-slate/70 leading-relaxed flex-1 mb-4">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm text-teal hover:text-teal/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded"
                >
                  {service.linkLabel}
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
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
