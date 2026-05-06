"use client";

import { useLanguage } from "@/context/LanguageContext";


interface CommitmentItem {
  id: string;
  icon: string;
  heading: string;
  body: string;
  linkLabel: string;
  link: string;
}

interface StatItem {
  value: string;
  label: string;
}

// Icon components for commitments
function FeedbackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
}

function ComplaintIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function PrivacyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function AgreementIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}

function getIcon(iconName: string, className?: string) {
  switch (iconName) {
    case "feedback":
      return <FeedbackIcon className={className} />;
    case "complaint":
      return <ComplaintIcon className={className} />;
    case "privacy":
      return <PrivacyIcon className={className} />;
    case "agreement":
      return <AgreementIcon className={className} />;
    default:
      return <FeedbackIcon className={className} />;
  }
}

export default function About() {
  const { t, tArray } = useLanguage();
  const commitmentItems = tArray<CommitmentItem>("about.commitments.items");
  const stats = tArray<StatItem>("about.stats");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-off-white"
    >
      {/* Hero Section */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance"
            >
              {t("about.heading")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              {t("about.subheading")}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Story Content */}
          <div>
            <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wide uppercase mb-4">
              <span className="w-8 h-px bg-teal" aria-hidden="true" />
              About Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy leading-tight">
              {t("about.story.heading")}
            </h2>
            <p className="mt-6 text-slate leading-relaxed text-base sm:text-lg">
              {t("about.story.body")}
            </p>
          </div>

          {/* Right: Visual Element */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-teal-light to-amber-light p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="bg-white rounded-xl p-4 shadow-lg shadow-teal/10">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-teal"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-navy">
                    Campbelltown
                  </p>
                  <p className="text-xs text-slate/70">Based locally</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg shadow-teal/10">
                  <div className="w-10 h-10 rounded-full bg-amber-light flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-navy"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-navy">4 Languages</p>
                  <p className="text-xs text-slate/70">We speak yours</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg shadow-teal/10 col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-navy"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        Community First
                      </p>
                      <p className="text-xs text-slate/70">
                        Same streets, same schools
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 bg-teal/10 rounded-full blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-light/50 rounded-full blur-2xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Commitments Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wide uppercase mb-4">
              <span className="w-8 h-px bg-teal" aria-hidden="true" />
              Our Promise
              <span className="w-8 h-px bg-teal" aria-hidden="true" />
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">
              {t("about.commitments.heading")}
            </h2>
            <p className="mt-4 text-slate text-base sm:text-lg">
              {t("about.commitments.subheading")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {commitmentItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-off-white rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-teal/5 transition-all duration-300 border border-transparent hover:border-teal/20"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-6 group-hover:bg-teal group-hover:scale-110 transition-all duration-300">
                  {getIcon(
                    item.icon,
                    "w-7 h-7 text-teal group-hover:text-white transition-colors duration-300"
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-navy mb-3">
                  {item.heading}
                </h3>
                <p className="text-slate text-sm sm:text-base leading-relaxed mb-6">
                  {item.body}
                </p>

                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 text-teal font-semibold text-m hover:gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded"
                >
                  {item.linkLabel}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>

                {/* Card number indicator */}
                <div
                  className="absolute top-6 right-6 text-4xl font-bold text-navy/5 select-none"
                  aria-hidden="true"
                >
                  0{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Standards Section */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-flex items-center gap-2 text-teal-light text-sm font-semibold tracking-wide uppercase mb-4">
                <span className="w-8 h-px bg-teal-light" aria-hidden="true" />
                Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {t("about.standards.heading")}
              </h2>
              <p className="mt-6 text-white/75 leading-relaxed">
                {t("about.standards.body")}
              </p>

              {/* Worker Screening Badge */}
              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {t("about.standards.workerScreening")}
                    </p>
                    <a
                      href={t("about.standards.workerScreeningHref")}
                      className="inline-flex items-center gap-2 text-teal-light text-sm mt-2 hover:text-white transition-colors"
                    >
                      {t("about.standards.workerScreeningLink")}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Policy Library Badge */}
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {t("about.standards.policyLibrary")}
                    </p>
                    <a
                      href={t("about.standards.policyLibraryHref")}
                      className="inline-flex items-center gap-2 text-teal-light text-sm mt-2 hover:text-white transition-colors"
                    >
                      {t("about.standards.policyLibraryLink")}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual / Badge */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-bold text-white">
                        NDIS Registered
                      </p>
                      <p className="text-sm text-white/60 mt-1">
                        Quality Certified
                      </p>
                    </div>
                  </div>
                </div>
                {/* Decorative dots */}
                <div
                  className="absolute top-0 right-0 w-3 h-3 rounded-full bg-teal"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-8 left-0 w-2 h-2 rounded-full bg-teal-light"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-amber-light"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NDIS Commission Contact */}
      <div className="bg-teal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg shadow-teal/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold mb-4">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Independent Body
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy">
                  {t("about.commission.heading")}
                </h2>
                <p className="mt-4 text-slate leading-relaxed">
                  {t("about.commission.body")}
                </p>
              </div>

              {/* Right: Contact Options */}
              <div className="flex flex-col gap-4">
                <a
                  href={`tel:${t("about.commission.phone").replace(/\s/g, "")}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-navy text-white hover:bg-navy/90 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-teal transition-colors">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                  <div>
                    <p className="font-semibold">
                      {t("about.commission.phone")}
                    </p>
                    <p className="text-sm text-white/70">
                      {t("about.commission.phonelabel")}
                    </p>
                  </div>
                </a>

                <a
                  href={t("about.commission.website")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-off-white border border-slate/10 text-navy hover:border-teal/30 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors">
                    <svg
                      className="w-6 h-6 text-teal group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {t("about.commission.websiteLabel")}
                    </p>
                    <p className="text-sm text-slate/70">
                      {t("about.commission.tty")}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
