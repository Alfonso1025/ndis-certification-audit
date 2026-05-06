"use client";

import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/constants/site-config";

type FooterLink = { label: string; href: string };

export default function Footer() {
  const { t, tArray } = useLanguage();

  const serviceLinks = tArray<FooterLink>("footer.columns.services.links");
  const rightsLinks = tArray<FooterLink>("footer.columns.rights.links");

  const year = new Date().getFullYear();
  const copyright = t("footer.bottom.copyright")
    .replace("{year}", String(year))
    .replace("{name}", siteConfig.providerName);

  return (
    <footer aria-label="Site footer" className="bg-navy text-white">

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div>
            <p className="font-display text-xl text-white mb-3">
              NDIS Provider
            </p>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-5">
              {t("footer.brand.tagline")}
            </p>
            <address className="not-italic font-body text-sm text-white/50 space-y-1 mb-5">
              <p>{t("footer.brand.address")}</p>
              <p>{t("footer.brand.serviceArea")}</p>
            </address>
            <div className="font-body text-xs text-white/35 space-y-1">
              <p>ABN: {siteConfig.abn}</p>
              <p>NDIS Registration: {siteConfig.ndisRegistrationNumber}</p>
              <p>{t("footer.brand.ndisGroup")}</p>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="font-body font-semibold text-sm text-white mb-5">
              {t("footer.columns.services.heading")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/55 hover:text-teal-light transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Your Rights column */}
          <div>
            <h3 className="font-body font-semibold text-sm text-white mb-5">
              {t("footer.columns.rights.heading")}
            </h3>
            <ul className="space-y-3">
              {rightsLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/55 hover:text-teal-light transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Help column */}
          <div>
            <h3 className="font-body font-semibold text-sm text-white mb-5">
              {t("footer.columns.contact.heading")}
            </h3>

            <div className="space-y-5">
              {/* Phone & hours */}
              <div>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="font-body font-semibold text-sm text-teal-light hover:text-white transition-colors duration-150"
                >
                  {siteConfig.phone}
                </a>
                <p className="font-body text-xs text-white/45 mt-0.5">
                  {t("footer.columns.contact.phoneHours")}
                </p>
                <p className="font-body text-xs text-white/40 mt-2 leading-relaxed">
                  {t("footer.columns.contact.afterHours")}
                </p>
              </div>

              {/* Email */}
              <div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-body text-sm text-teal-light hover:text-white transition-colors duration-150"
                >
                  {siteConfig.email}
                </a>
              </div>

              {/* Interpreter */}
              <div className="pt-4 border-t border-white/10">
                <p className="font-body font-semibold text-xs text-white/75 mb-1">
                  {t("footer.columns.contact.interpreter.heading")}
                </p>
                <p className="font-body text-xs text-white/45 leading-relaxed mb-2">
                  {t("footer.columns.contact.interpreter.body")}
                </p>
                <a
                  href={`tel:${t("footer.columns.contact.interpreter.phone").replace(/\s/g, "")}`}
                  className="font-body text-sm font-semibold text-teal-light hover:text-white transition-colors duration-150"
                >
                  {t("footer.columns.contact.interpreter.phoneLabel")}
                </a>
              </div>

              {/* NDIS Commission */}
              <div className="pt-4 border-t border-white/10">
                <p className="font-body font-semibold text-xs text-white/75 mb-1">
                  {t("footer.columns.contact.commission.heading")}
                </p>
                <p className="font-body text-xs text-white/45 leading-relaxed mb-2">
                  {t("footer.columns.contact.commission.body")}
                </p>
                <a
                  href={`tel:${t("footer.columns.contact.commission.phone").replace(/\s/g, "")}`}
                  className="block font-body text-sm font-semibold text-teal-light hover:text-white transition-colors duration-150"
                >
                  {t("footer.columns.contact.commission.phoneLabel")}
                </a>
                <a
                  href={t("footer.columns.contact.commission.href")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs text-white/40 hover:text-teal-light transition-colors duration-150 mt-1 inline-block"
                >
                  {t("footer.columns.contact.commission.linkLabel")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Country acknowledgement ──────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="font-body text-xs text-white/35 leading-relaxed">
            {t("footer.bottom.acknowledgement")}
          </p>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-body text-xs text-white/35">{copyright}</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-body text-xs text-white/30">
              {t("footer.bottom.wcag")}
            </span>
            <a
              href={t("footer.bottom.privacyHref")}
              className="font-body text-xs text-white/45 hover:text-white transition-colors duration-150"
            >
              {t("footer.bottom.privacy")}
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
