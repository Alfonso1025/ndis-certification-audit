"use client";

import { useState, useId, FormEvent, ChangeEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/constants/site-config";

type SelectOption = { value: string; label: string };

type FormState = {
  name: string;
  relationship: string;
  contactMethod: string;
  email: string;
  phone: string;
  serviceType: string;
  incidentDate: string;
  description: string;
  outcome: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM: FormState = {
  name: "",
  relationship: "",
  contactMethod: "",
  email: "",
  phone: "",
  serviceType: "",
  incidentDate: "",
  description: "",
  outcome: "",
};

/*
  Reference number format: COMP-YYYYMMDD-XXXX
  In production this MUST be generated server-side and persisted to the database
  before the success state is shown. If the email delivery fails, the participant
  still has a reference number they can quote.
*/
function generateRef(): string {
  const now = new Date();
  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `COMP-${date}-${rand}`;
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white px-4 py-2.5 font-body text-sm text-navy placeholder:text-slate/35",
    "focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-colors duration-150",
    hasError
      ? "border-red-400 ring-1 ring-red-400"
      : "border-slate/20 hover:border-slate/35",
  ].join(" ");
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-sm font-medium text-navy mb-1.5">
        {label}
        {required && <span className="text-teal ml-1" aria-hidden="true">*</span>}
        {!required && <span className="ml-1.5 font-normal text-slate/40 text-xs">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 font-body text-xs text-red-600">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 font-body text-xs text-slate/45">
          {hint}
        </p>
      )}
    </div>
  );
}

export default function ComplaintsFormPage() {
  const { t, tArray } = useLanguage();
  const uid = useId();
  const fid = (field: string) => `${uid}-${field}`;

  const relationshipOptions = tArray<SelectOption>("complaintsForm.fields.relationship.options");
  const contactMethodOptions = tArray<SelectOption>("complaintsForm.fields.contactMethod.options");
  const serviceTypeOptions = tArray<SelectOption>("complaintsForm.fields.serviceType.options");

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [refNumber, setRefNumber] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // When contact method changes, clear the now-hidden fields entirely
      // so stale values don't persist in state or submit payload.
      if (name === "contactMethod") {
        next.email = "";
        next.phone = "";
      }
      return next;
    });

    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): FormErrors {
    const e: FormErrors = {};

    // description is the only required field — the error message says so
    // explicitly to reduce intimidation. All other fields are optional.
    if (!form.description.trim()) {
      e.description = t("complaintsForm.fields.description.error");
    }

    // Validate email format only when the field is mounted (contactMethod === "email")
    // and the user has actually typed something. We do not require it.
    if (
      form.contactMethod === "email" &&
      form.email.trim() &&
      !EMAIL_RE.test(form.email)
    ) {
      e.email = t("complaintsForm.fields.email.error");
    }

    return e;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0] as keyof FormState;
      document.getElementById(fid(firstKey))?.focus();
      return;
    }

    setStatus("submitting");
    const ref = generateRef();

    // Simulated 200 OK — replace with real API call in production.
    // Production must: generate ref server-side → write to DB → send ack email → return ref.
    setTimeout(() => {
      setRefNumber(ref);
      setStatus("success");
    }, 1500);
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="bg-off-white min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 mb-6">
            <svg className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl text-navy mb-4">
            {t("complaintsForm.success.heading")}
          </h1>

          <p className="font-body text-sm text-slate/55 mb-2">
            {t("complaintsForm.success.reference")}
          </p>
          <p
            className="font-body font-bold text-xl text-navy tracking-wider mb-6 select-all"
            aria-label={`Reference number: ${refNumber}`}
          >
            {refNumber}
          </p>

          <p className="font-body text-sm sm:text-base text-slate/70 leading-relaxed mb-6">
            {t("complaintsForm.success.body")}
          </p>

          <div className="bg-amber-light border border-amber-200 rounded-xl p-4 text-left">
            <p className="font-body text-sm text-slate/65 leading-relaxed mb-2">
              {t("complaintsForm.success.commissionNote")}
            </p>
            <a
              href={`tel:${t("complaintsForm.success.commissionPhone").replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 font-body font-semibold text-sm text-navy hover:text-teal transition-colors duration-150"
            >
              <PhoneIcon />
              {t("complaintsForm.success.commissionPhone")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-sm text-white/45">
              <li><a href="/" className="hover:text-white transition-colors duration-150">Home</a></li>
              <li aria-hidden="true">›</li>
              <li><a href="/complaints" className="hover:text-white transition-colors duration-150">How to Make a Complaint</a></li>
              <li aria-hidden="true">›</li>
              <li className="text-white/70" aria-current="page">Complaints Form</li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-3">
            {t("complaintsForm.heading")}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            {t("complaintsForm.subheading")}
          </p>
        </div>
      </div>

      <div className="bg-off-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">

          {/* Commission redirect — visible above the fold, before the form */}
          <div className="bg-amber-light border border-amber-200 rounded-2xl p-5 mb-6">
            <h2 className="font-display text-lg text-navy mb-1.5">
              {t("complaintsForm.commissionRedirect.heading")}
            </h2>
            <p className="font-body text-sm text-slate/65 leading-relaxed mb-4">
              {t("complaintsForm.commissionRedirect.body")}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <a
                href={`tel:${t("complaintsForm.commissionRedirect.phone").replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 font-body font-semibold text-sm text-navy hover:text-teal transition-colors duration-150"
              >
                <PhoneIcon />
                {t("complaintsForm.commissionRedirect.phoneLabel")} — {t("complaintsForm.commissionRedirect.phone")}
              </a>
              <a
                href={t("complaintsForm.commissionRedirect.href")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-sm text-slate/55 hover:text-teal transition-colors duration-150"
              >
                {t("complaintsForm.commissionRedirect.linkLabel")}
                <ExternalIcon />
                <span className="sr-only">opens in new tab</span>
              </a>
            </div>
            <p className="font-body text-xs text-slate/40 mt-3">
              {t("complaintsForm.commissionRedirect.tty")}
            </p>
          </div>

          {/* Anonymous note */}
          <div className="bg-teal-light rounded-2xl p-5 mb-8">
            <h2 className="font-display text-lg text-navy mb-1.5">
              {t("complaintsForm.anonymousNote.heading")}
            </h2>
            <p className="font-body text-sm text-slate/65 leading-relaxed">
              {t("complaintsForm.anonymousNote.body")}
            </p>
          </div>

          {/* Error banner */}
          {status === "error" && (
            <div role="alert" className="mb-6 bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="font-body font-semibold text-sm text-red-700 mb-1">
                {t("complaintsForm.error.heading")}
              </p>
              <p className="font-body text-sm text-red-600 mb-3">
                {t("complaintsForm.error.body")}
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-body font-semibold text-red-700">
                <button type="button" onClick={() => setStatus("idle")} className="underline hover:no-underline">
                  {t("complaintsForm.error.retry")}
                </button>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:underline">{siteConfig.phone}</a>
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
              </div>
            </div>
          )}

          {/* ── Form ─────────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Name */}
            <Field id={fid("name")} label={t("complaintsForm.fields.name.label")} hint={t("complaintsForm.fields.name.hint")}>
              <input
                id={fid("name")}
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t("complaintsForm.fields.name.placeholder")}
                value={form.name}
                onChange={handleChange}
                className={inputClass(false)}
              />
            </Field>

            {/* Relationship */}
            <Field id={fid("relationship")} label={t("complaintsForm.fields.relationship.label")} hint={t("complaintsForm.fields.relationship.hint")}>
              <select
                id={fid("relationship")}
                name="relationship"
                value={form.relationship}
                onChange={handleChange}
                className={inputClass(false)}
              >
                {relationshipOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            {/* Contact method */}
            <Field
              id={fid("contactMethod")}
              label={t("complaintsForm.fields.contactMethod.label")}
              hint={t("complaintsForm.fields.contactMethod.hint")}
            >
              <select
                id={fid("contactMethod")}
                name="contactMethod"
                value={form.contactMethod}
                onChange={handleChange}
                className={inputClass(false)}
              >
                {contactMethodOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            {/*
              Conditional fields — unmounted entirely when not needed.
              A hidden input still in the DOM can confuse screen readers and
              submit empty values. Controlled state drives unmounting, not CSS.
            */}
            {form.contactMethod === "email" && (
              <Field
                id={fid("email")}
                label={t("complaintsForm.fields.email.label")}
                error={errors.email}
              >
                <input
                  id={fid("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("complaintsForm.fields.email.placeholder")}
                  value={form.email}
                  onChange={handleChange}
                  aria-describedby={errors.email ? `${fid("email")}-err` : undefined}
                  aria-invalid={!!errors.email}
                  className={inputClass(!!errors.email)}
                />
              </Field>
            )}

            {form.contactMethod === "phone" && (
              <Field id={fid("phone")} label={t("complaintsForm.fields.phone.label")}>
                <input
                  id={fid("phone")}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={t("complaintsForm.fields.phone.placeholder")}
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass(false)}
                />
              </Field>
            )}

            {/* Service type */}
            <Field id={fid("serviceType")} label={t("complaintsForm.fields.serviceType.label")} hint={t("complaintsForm.fields.serviceType.hint")}>
              <select
                id={fid("serviceType")}
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className={inputClass(false)}
              >
                {serviceTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            {/* Incident date */}
            <Field
              id={fid("incidentDate")}
              label={t("complaintsForm.fields.incidentDate.label")}
              hint={t("complaintsForm.fields.incidentDate.hint")}
            >
              <input
                id={fid("incidentDate")}
                name="incidentDate"
                type="date"
                value={form.incidentDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className={inputClass(false)}
              />
            </Field>

            {/*
              Description — the only required field.
              Error message explicitly acknowledges all other fields are optional
              to reduce intimidation and form abandonment.
            */}
            <Field
              id={fid("description")}
              label={t("complaintsForm.fields.description.label")}
              required
              error={errors.description}
              hint={!errors.description ? `${form.description.length} / 2000 — ${t("complaintsForm.fields.description.hint")}` : undefined}
            >
              <textarea
                id={fid("description")}
                name="description"
                rows={7}
                maxLength={2000}
                placeholder={t("complaintsForm.fields.description.placeholder")}
                value={form.description}
                onChange={handleChange}
                aria-describedby={errors.description ? `${fid("description")}-err` : `${fid("description")}-hint`}
                aria-invalid={!!errors.description}
                className={`${inputClass(!!errors.description)} resize-y min-h-[140px]`}
              />
            </Field>

            {/*
              Outcome — optional, comes last.
              For auditors: documents the participant's stated desired outcome,
              confirming the provider addressed what the participant actually wanted.
              Maps to NDIS Incidents Rules 2020, r.12 investigation obligations.
            */}
            <Field
              id={fid("outcome")}
              label={t("complaintsForm.fields.outcome.label")}
              hint={`${form.outcome.length} / 500 — ${t("complaintsForm.fields.outcome.hint")}`}
            >
              <textarea
                id={fid("outcome")}
                name="outcome"
                rows={3}
                maxLength={500}
                placeholder={t("complaintsForm.fields.outcome.placeholder")}
                value={form.outcome}
                onChange={handleChange}
                aria-describedby={`${fid("outcome")}-hint`}
                className={`${inputClass(false)} resize-y min-h-[80px]`}
              />
            </Field>

            {/* Privacy notice */}
            <p className="font-body text-xs text-slate/50 leading-relaxed">
              {t("complaintsForm.privacyNotice")}{" "}
              <a
                href={t("complaintsForm.privacyHref")}
                className="underline hover:text-teal transition-colors"
              >
                {t("complaintsForm.privacyLink")}
              </a>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 bg-teal text-white font-body font-semibold text-sm px-6 py-3 rounded-xl hover:bg-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {status === "submitting" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {t("complaintsForm.submitting")}
                </>
              ) : (
                t("complaintsForm.submit")
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
