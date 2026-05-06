"use client";

import { useState, useId, FormEvent, ChangeEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

type FormState = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  contactMethod: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 1000;

export default function Contact() {
  const { t, tArray } = useLanguage();
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const serviceOptions = tArray<{ value: string; label: string }>(
    "contact.fields.serviceType.options"
  );
  const contactMethods = tArray<{ value: string; label: string }>(
    "contact.fields.contactMethod.options"
  );

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    contactMethod: "either",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t("contact.fields.name.error");
    if (!form.email.trim() || !EMAIL_RE.test(form.email))
      e.email = t("contact.fields.email.error");
    if (!form.serviceType) e.serviceType = t("contact.fields.serviceType.error");
    if (!form.message.trim()) e.message = t("contact.fields.message.error");
    return e;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0] as keyof FormState;
      document.getElementById(id(firstKey))?.focus();
      return;
    }
    setStatus("submitting");
    // Simulated 200 OK — replace with real API call in production
    setTimeout(() => setStatus("success"), 1500);
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-off-white py-16 md:py-24"
      >
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 mb-6">
            <svg
              className="w-8 h-8 text-teal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-3">
            {t("contact.success.heading")}
          </h2>
          <p className="font-body text-slate/75 leading-relaxed mb-2">
            {t("contact.success.body")}
          </p>
          <p className="font-body text-sm text-slate/55">
            {t("contact.success.note")}
          </p>
        </div>
      </section>
    );
  }

  // ── Main form ─────────────────────────────────────────────────────────────
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-off-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <h2
            id="contact-heading"
            className="font-display text-3xl sm:text-4xl text-navy leading-tight mb-3"
          >
            {t("contact.heading")}
          </h2>
          <p className="font-body text-slate/75 text-base sm:text-lg leading-relaxed">
            {t("contact.subheading")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">

          {/* ── Form (2/3 width on desktop) ─────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-2 space-y-6"
          >
            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                id={id("name")}
                label={t("contact.fields.name.label")}
                required
                error={errors.name}
              >
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t("contact.fields.name.placeholder")}
                  value={form.name}
                  onChange={handleChange}
                  aria-describedby={errors.name ? `${id("name")}-err` : undefined}
                  aria-invalid={!!errors.name}
                  className={inputClass(!!errors.name)}
                />
              </Field>

              <Field
                id={id("email")}
                label={t("contact.fields.email.label")}
                required
                error={errors.email}
              >
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("contact.fields.email.placeholder")}
                  value={form.email}
                  onChange={handleChange}
                  aria-describedby={errors.email ? `${id("email")}-err` : undefined}
                  aria-invalid={!!errors.email}
                  className={inputClass(!!errors.email)}
                />
              </Field>
            </div>

            {/* Phone */}
            <Field
              id={id("phone")}
              label={t("contact.fields.phone.label")}
              hint={t("contact.fields.phone.note")}
            >
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder={t("contact.fields.phone.placeholder")}
                value={form.phone}
                onChange={handleChange}
                className={inputClass(false)}
              />
            </Field>

            {/* Service type */}
            <Field
              id={id("serviceType")}
              label={t("contact.fields.serviceType.label")}
              required
              error={errors.serviceType}
            >
              <select
                id={id("serviceType")}
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                aria-describedby={
                  errors.serviceType ? `${id("serviceType")}-err` : undefined
                }
                aria-invalid={!!errors.serviceType}
                className={inputClass(!!errors.serviceType)}
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            {/* Contact method — radio group */}
            <fieldset>
              <legend className="block font-body text-sm font-medium text-navy mb-2">
                {t("contact.fields.contactMethod.label")}
                <span className="text-teal ml-1" aria-hidden="true">*</span>
              </legend>
              <div className="flex flex-wrap gap-3">
                {contactMethods.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 cursor-pointer rounded-lg border px-4 py-2.5 font-body text-sm transition-colors duration-150
                      ${
                        form.contactMethod === opt.value
                          ? "border-teal bg-teal/5 text-teal font-semibold"
                          : "border-slate/20 bg-white text-slate hover:border-teal/40"
                      }`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={opt.value}
                      checked={form.contactMethod === opt.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Message */}
            <Field
              id={id("message")}
              label={t("contact.fields.message.label")}
              required
              error={errors.message}
              hint={`${form.message.length} / ${MAX_MESSAGE}`}
            >
              <textarea
                id={id("message")}
                name="message"
                rows={5}
                maxLength={MAX_MESSAGE}
                placeholder={t("contact.fields.message.placeholder")}
                value={form.message}
                onChange={handleChange}
                aria-describedby={
                  errors.message ? `${id("message")}-err` : `${id("message")}-hint`
                }
                aria-invalid={!!errors.message}
                className={`${inputClass(!!errors.message)} resize-y min-h-[120px]`}
              />
            </Field>

            {/* Privacy notice */}
            <p className="font-body text-xs text-slate/55 leading-relaxed">
              {t("contact.privacyNotice")}{" "}
              <a
                href={t("contact.privacyHref")}
                className="underline hover:text-teal transition-colors"
              >
                {t("contact.privacyLink")}
              </a>
            </p>

            {/* Complaint redirect — subtle inline nudge */}
            <p className="font-body text-sm text-slate/60">
              {t("contact.complaintsNote")}{" "}
              <a
                href={t("contact.complaintsHref")}
                className="font-semibold text-teal underline underline-offset-2 hover:text-teal/80 transition-colors"
              >
                {t("contact.complaintsLink")}
              </a>
            </p>

            {/* Submit */}
            <div className="pt-1">
              {status === "error" && (
                <div
                  role="alert"
                  className="mb-4 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4"
                >
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-body font-semibold text-sm text-red-700">
                      {t("contact.error.heading")}
                    </p>
                    <p className="font-body text-sm text-red-600 mt-0.5">
                      {t("contact.error.body")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-2 font-body text-sm font-semibold text-red-700 underline hover:no-underline"
                    >
                      {t("contact.error.retry")}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 bg-teal text-white font-body font-semibold text-sm px-6 py-3 rounded-xl hover:bg-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
              >
                {status === "submitting" ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    {t("contact.submitting")}
                  </>
                ) : (
                  t("contact.submit")
                )}
              </button>
            </div>
          </form>

          {/* ── Sidebar (1/3 width on desktop) ──────────────────────────── */}
          <aside className="space-y-5">

            {/* Call us card */}
            <div className="bg-navy rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5"
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
                <p className="font-body font-semibold">{t("contact.phone")}</p>
              </div>
              <p className="font-body text-sm text-white/70 leading-relaxed">
                {t("contact.phoneNote")}
              </p>
            </div>

            {/* Complaint redirect card */}
            <div className="bg-amber-light border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-navy mb-1">
                    {t("contact.complaintsNote")}
                  </p>
                  <a
                    href={t("contact.complaintsHref")}
                    className="font-body text-sm font-semibold text-teal underline underline-offset-2 hover:text-teal/80 transition-colors"
                  >
                    {t("contact.complaintsLink")} →
                  </a>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </section>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-sm font-medium text-navy mb-1.5">
        {label}
        {required && (
          <span className="text-teal ml-1" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 font-body text-xs text-red-600">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 font-body text-xs text-slate/50">
          {hint}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white px-4 py-2.5 font-body text-sm text-navy placeholder:text-slate/40",
    "focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent",
    "transition-colors duration-150",
    hasError ? "border-red-400 ring-1 ring-red-400" : "border-slate/20 hover:border-slate/40",
  ].join(" ");
}
