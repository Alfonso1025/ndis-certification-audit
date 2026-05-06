"use client";

import { useState, useId, FormEvent, ChangeEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/constants/site-config";

type RatingOption = { value: number; label: string; description: string };
type SelectOption = { value: string; label: string };
type FollowUpOption = { value: string; label: string };
type ProcessStep = { id: string; heading: string; body: string };
type PathStep = { heading: string; body: string };

type FormState = {
  rating: string;
  category: string;
  service: string;
  feedback: string;
  highlight: string;
  followUp: string;
  name: string;
  contact: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormState = {
  rating: "",
  category: "",
  service: "",
  feedback: "",
  highlight: "",
  followUp: "no",
  name: "",
  contact: "",
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

// ── Process flow helpers ──────────────────────────────────────────────────

function DownArrow() {
  return (
    <div aria-hidden="true" className="flex justify-center my-1">
      <svg className="w-5 h-5 text-slate/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

function StepCard({
  icon,
  heading,
  body,
  variant = "default",
}: {
  icon: React.ReactNode;
  heading: string;
  body: string;
  variant?: "default" | "primary" | "alternative";
}) {
  const border =
    variant === "primary"
      ? "border-teal/30 bg-teal/5"
      : variant === "alternative"
      ? "border-slate/20 bg-slate/5"
      : "border-slate/15 bg-white";
  return (
    <div className={`rounded-xl border p-4 flex items-start gap-3 ${border}`}>
      <div className="w-8 h-8 rounded-full bg-white border border-slate/15 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="font-body font-semibold text-sm text-navy leading-snug mb-0.5">{heading}</p>
        <p className="font-body text-xs text-slate/60 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ── Star display — aria-hidden, purely decorative.
// Accessible meaning is carried by the label + description text.
function Stars({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5 flex-shrink-0">
      {Array.from({ length: total }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-slate/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function FeedbackPage() {
  const { t, tArray } = useLanguage();
  const uid = useId();
  const fid = (field: string) => `${uid}-${field}`;

  const ratingOptions = tArray<RatingOption>("feedbackPage.fields.rating.options");
  const categoryOptions = tArray<SelectOption>("feedbackPage.fields.category.options");
  const serviceOptions = tArray<SelectOption>("feedbackPage.fields.service.options");
  const followUpOptions = tArray<FollowUpOption>("feedbackPage.fields.followUp.options");

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const processSteps = tArray<ProcessStep>("feedbackPage.commitment.process.steps");
  const forkLabel = t("feedbackPage.commitment.process.forkLabel");
  const primaryPath: PathStep = {
    heading: t("feedbackPage.commitment.process.primaryPath.heading"),
    body: t("feedbackPage.commitment.process.primaryPath.body"),
  };
  const alternativePath: PathStep = {
    heading: t("feedbackPage.commitment.process.alternativePath.heading"),
    body: t("feedbackPage.commitment.process.alternativePath.body"),
  };
  const conclusion: PathStep = {
    heading: t("feedbackPage.commitment.process.conclusion.heading"),
    body: t("feedbackPage.commitment.process.conclusion.body"),
  };

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // When follow-up changes to "no", clear the now-unmounted contact fields
      if (name === "followUp" && value !== "yes") {
        next.name = "";
        next.contact = "";
      }
      return next;
    });
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.rating) e.rating = t("feedbackPage.fields.rating.error");
    if (!form.category) e.category = t("feedbackPage.fields.category.error");
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
    // Simulated 200 OK — replace with real API call in production
    setTimeout(() => setStatus("success"), 1500);
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
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
            {t("feedbackPage.success.heading")}
          </h1>
          <p className="font-body text-sm sm:text-base text-slate/70 leading-relaxed mb-8">
            {t("feedbackPage.success.body")}
          </p>
          <p className="font-body text-xs text-slate/50 leading-relaxed mb-8 italic">
            {t("feedbackPage.success.improvementNote")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-teal text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-teal/90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              {t("feedbackPage.success.anotherLabel")}
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 border border-slate/20 text-navy font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:border-teal/40 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              {t("feedbackPage.success.homeLabel")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Main page ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-sm text-white/45">
              <li><a href="/" className="hover:text-white transition-colors duration-150">Home</a></li>
              <li aria-hidden="true">›</li>
              <li className="text-white/70" aria-current="page">Share Your Feedback</li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-3">
            {t("feedbackPage.heading")}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            {t("feedbackPage.subheading")}
          </p>
        </div>
      </div>

      <div className="bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-10">

          {/* ── Commitment statement ─────────────────────────────────────── */}
          <section aria-labelledby="commitment-heading" className="bg-white rounded-2xl border border-slate/10 shadow-sm p-6 sm:p-8">
            <h2 id="commitment-heading" className="font-display text-xl sm:text-2xl text-navy mb-2">
              {t("feedbackPage.commitment.heading")}
            </h2>
            <p className="font-body text-sm text-slate/60 leading-relaxed mb-6">
              {t("feedbackPage.commitment.intro")}
            </p>

            {/* Visual process flow */}
            <div aria-label="How your feedback is processed">

              {/* Linear steps before the fork */}
              {processSteps.map((step, i) => (
                <div key={step.id}>
                  <StepCard
                    icon={
                      i === 0
                        ? /* clipboard */
                          <svg aria-hidden="true" className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        : /* users */
                          <svg aria-hidden="true" className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                    }
                    heading={step.heading}
                    body={step.body}
                  />
                  <DownArrow />
                </div>
              ))}

              {/* Fork */}
              <p className="text-center font-body text-xs font-semibold text-slate/40 uppercase tracking-wide mb-2">
                {forkLabel}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-1">
                <StepCard
                  variant="primary"
                  icon={
                    <svg aria-hidden="true" className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  heading={primaryPath.heading}
                  body={primaryPath.body}
                />
                <StepCard
                  variant="alternative"
                  icon={
                    <svg aria-hidden="true" className="w-4 h-4 text-slate/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                  heading={alternativePath.heading}
                  body={alternativePath.body}
                />
              </div>

              <DownArrow />

              {/* Conclusion */}
              <StepCard
                icon={
                  <svg aria-hidden="true" className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
                heading={conclusion.heading}
                body={conclusion.body}
              />
            </div>

            {/* Note: /policies/continuous-improvement not yet in sitemap — active once policies library is built */}
            <p className="font-body text-sm text-slate/50 mt-5">
              {t("feedbackPage.commitment.policyNote")}{" "}
              <a
                href={t("feedbackPage.commitment.policyHref")}
                className="font-semibold text-teal underline underline-offset-2 hover:text-teal/70 transition-colors duration-150"
              >
                {t("feedbackPage.commitment.policyLink")}
              </a>
              .
            </p>
          </section>

          {/* ── Form ─────────────────────────────────────────────────────── */}
          <div>
            <h2 className="font-display text-xl sm:text-2xl text-navy mb-6">
              {t("feedbackPage.formHeading")}
            </h2>

            {/* Error banner */}
            {status === "error" && (
              <div role="alert" className="mb-6 bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-body font-semibold text-sm text-red-700 mb-1">
                  {t("feedbackPage.error.heading")}
                </p>
                <p className="font-body text-sm text-red-600 mb-2">
                  {t("feedbackPage.error.body")}
                </p>
                <div className="flex flex-wrap gap-4 font-body text-sm font-semibold text-red-700">
                  <button type="button" onClick={() => setStatus("idle")} className="underline hover:no-underline">
                    {t("feedbackPage.error.retry")}
                  </button>
                  <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-7">

              {/*
                Rating — styled radio group with star display + descriptive label.
                NOT a JavaScript star widget. Screen readers read the label and
                description text directly; star icons are aria-hidden.
                Rendered as a <fieldset> with a <legend> for proper grouping.
              */}
              <fieldset>
                <legend className="block font-body text-sm font-medium text-navy mb-1.5">
                  {t("feedbackPage.fields.rating.label")}
                  <span className="text-teal ml-1" aria-hidden="true">*</span>
                </legend>
                <div className="space-y-2">
                  {ratingOptions.map((opt) => {
                    const isSelected = form.rating === String(opt.value);
                    return (
                      <label
                        key={opt.value}
                        className={[
                          "flex items-center gap-4 rounded-xl border px-5 py-3.5 cursor-pointer transition-colors duration-150",
                          isSelected
                            ? "border-teal bg-teal/5 ring-1 ring-teal"
                            : "border-slate/20 bg-white hover:border-teal/40",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={String(opt.value)}
                          checked={isSelected}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Stars count={opt.value} />
                        <div className="flex-1 min-w-0">
                          <span className={`font-body font-semibold text-sm ${isSelected ? "text-teal" : "text-navy"}`}>
                            {opt.label}
                          </span>
                          <span className="font-body text-xs text-slate/55 ml-2">
                            — {opt.description}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.rating && (
                  <p id={`${fid("rating")}-err`} role="alert" className="mt-2 font-body text-xs text-red-600">
                    {errors.rating}
                  </p>
                )}
              </fieldset>

              {/* Category */}
              <Field
                id={fid("category")}
                label={t("feedbackPage.fields.category.label")}
                required
                hint={t("feedbackPage.fields.category.hint")}
                error={errors.category}
              >
                <select
                  id={fid("category")}
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  aria-describedby={errors.category ? `${fid("category")}-err` : `${fid("category")}-hint`}
                  aria-invalid={!!errors.category}
                  className={inputClass(!!errors.category)}
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Service */}
              <Field
                id={fid("service")}
                label={t("feedbackPage.fields.service.label")}
                hint={t("feedbackPage.fields.service.hint")}
              >
                <select
                  id={fid("service")}
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={inputClass(false)}
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Free-text feedback */}
              <Field
                id={fid("feedback")}
                label={t("feedbackPage.fields.feedback.label")}
                hint={`${form.feedback.length} / 1500 — ${t("feedbackPage.fields.feedback.hint")}`}
              >
                <textarea
                  id={fid("feedback")}
                  name="feedback"
                  rows={5}
                  maxLength={1500}
                  placeholder={t("feedbackPage.fields.feedback.placeholder")}
                  value={form.feedback}
                  onChange={handleChange}
                  aria-describedby={`${fid("feedback")}-hint`}
                  className={`${inputClass(false)} resize-y min-h-[100px]`}
                />
              </Field>

              {/*
                Highlight field — captures what is working well.
                Feeds the continuous improvement register with positive signals,
                documents what NOT to change, and enables specific worker recognition.
              */}
              <Field
                id={fid("highlight")}
                label={t("feedbackPage.fields.highlight.label")}
                hint={`${form.highlight.length} / 500 — ${t("feedbackPage.fields.highlight.hint")}`}
              >
                <textarea
                  id={fid("highlight")}
                  name="highlight"
                  rows={3}
                  maxLength={500}
                  placeholder={t("feedbackPage.fields.highlight.placeholder")}
                  value={form.highlight}
                  onChange={handleChange}
                  aria-describedby={`${fid("highlight")}-hint`}
                  className={`${inputClass(false)} resize-y min-h-[72px]`}
                />
              </Field>

              {/* Follow-up preference — radio group */}
              <fieldset>
                <legend className="block font-body text-sm font-medium text-navy mb-2">
                  {t("feedbackPage.fields.followUp.label")}
                  <span className="ml-1.5 font-normal text-slate/40 text-xs">(optional)</span>
                </legend>
                <div className="flex flex-col gap-2">
                  {followUpOptions.map((opt) => {
                    const isSelected = form.followUp === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={[
                          "flex items-center gap-3 rounded-xl border px-5 py-3 cursor-pointer transition-colors duration-150",
                          isSelected
                            ? "border-teal bg-teal/5 ring-1 ring-teal"
                            : "border-slate/20 bg-white hover:border-teal/40",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="followUp"
                          value={opt.value}
                          checked={isSelected}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className={`font-body text-sm ${isSelected ? "font-semibold text-teal" : "text-slate/70"}`}>
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/*
                Conditional contact fields — unmounted entirely when followUp !== "yes".
                Same pattern as complaints form: stale values cleared on state change,
                fields removed from DOM so screen readers never encounter them.
              */}
              {form.followUp === "yes" && (
                <div className="space-y-5 pl-4 border-l-2 border-teal/30">
                  <Field
                    id={fid("name")}
                    label={t("feedbackPage.fields.name.label")}
                    hint={t("feedbackPage.fields.name.hint")}
                  >
                    <input
                      id={fid("name")}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t("feedbackPage.fields.name.placeholder")}
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass(false)}
                    />
                  </Field>
                  <Field
                    id={fid("contact")}
                    label={t("feedbackPage.fields.contact.label")}
                    hint={t("feedbackPage.fields.contact.hint")}
                  >
                    <input
                      id={fid("contact")}
                      name="contact"
                      type="text"
                      autoComplete="email tel"
                      placeholder={t("feedbackPage.fields.contact.placeholder")}
                      value={form.contact}
                      onChange={handleChange}
                      className={inputClass(false)}
                    />
                  </Field>
                </div>
              )}

              {/* Privacy notice */}
              <p className="font-body text-xs text-slate/50 leading-relaxed">
                {t("feedbackPage.privacyNotice")}{" "}
                <a href={t("feedbackPage.privacyHref")} className="underline hover:text-teal transition-colors duration-150">
                  {t("feedbackPage.privacyLink")}
                </a>
              </p>

              {/*
                Complaint redirect note — compliance boundary marker.
                Ensures serious incidents are not accidentally absorbed as general
                feedback. Triggers the correct NDIS Incidents Rules 2020 r.12
                investigation obligations by directing the participant to the
                formal complaints process where the event will be logged as a
                complaint, not just feedback.
              */}
              <div className="bg-amber-light border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="font-body text-sm text-slate/65 leading-relaxed">
                  {t("feedbackPage.complaintNote.body")}
                </p>
                <a
                  href={t("feedbackPage.complaintNote.href")}
                  className="inline-flex items-center gap-1.5 flex-shrink-0 font-body font-semibold text-sm text-navy hover:text-teal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
                >
                  {t("feedbackPage.complaintNote.linkLabel")}
                  <ArrowIcon />
                </a>
              </div>

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
                    {t("feedbackPage.submitting")}
                  </>
                ) : (
                  t("feedbackPage.submit")
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
