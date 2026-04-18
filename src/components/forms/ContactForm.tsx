"use client";

import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import {
  hasContactFormErrors,
  normalizeContactFormValues,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/validation";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  organization: "",
  inquiryType: "",
  message: "",
};

type ContactFormProps = {
  inquiryTypes: string[];
};

export function ContactForm({ inquiryTypes }: ContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{ status: "idle" | "success" | "error"; message: string }>({
    status: "idle",
    message: "",
  });
  const [started, setStarted] = useState(false);
  const [submissionStartedAt, setSubmissionStartedAt] = useState(() => Date.now());

  function updateValue(field: keyof ContactFormValues, value: string) {
    if (!started) {
      setStarted(true);
      trackEvent(analyticsEvents.contactFormStarted, { location: "/contact" });
    }
    setValues((current) => ({ ...current, [field]: value }));
    setSubmitState({ status: "idle", message: "" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (hasContactFormErrors(nextErrors)) {
      return;
    }

    const normalized = normalizeContactFormValues(values);
    setIsSubmitting(true);
    setSubmitState({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...normalized,
          companyWebsite,
          startedAt: submissionStartedAt,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        fieldErrors?: ContactFormErrors;
      };

      if (!response.ok || !payload.ok) {
        if (payload.fieldErrors) {
          setErrors(payload.fieldErrors);
        }
        setSubmitState({
          status: "error",
          message: payload.message ?? "We could not submit your inquiry. Please try again.",
        });
        return;
      }

      trackEvent(analyticsEvents.contactFormSubmittedBackend, {
        location: "/contact",
        inquiryType: normalized.inquiryType,
      });
      setSubmitState({
        status: "success",
        message: payload.message ?? "Thanks. Your inquiry has been sent.",
      });
      setValues(initialValues);
      setCompanyWebsite("");
      setErrors({});
      setStarted(false);
      setSubmissionStartedAt(Date.now());
    } catch {
      setSubmitState({
        status: "error",
        message: "We could not reach the contact service right now. Please try again shortly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="space-y-5 rounded-[8px] border border-ink/10 bg-chalk p-5 shadow-soft sm:p-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        name="companyWebsite"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={companyWebsite}
        onChange={(event) => setCompanyWebsite(event.target.value)}
        style={{ position: "absolute", left: "-9999px" }}
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="form-field"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="form-field"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            autoComplete="email"
            inputMode="email"
            required
          />
        </Field>
      </div>
      <Field label="Organization" error={errors.organization}>
        <input
          aria-invalid={Boolean(errors.organization)}
          aria-describedby={errors.organization ? "contact-organization-error" : undefined}
          className="form-field"
          value={values.organization}
          onChange={(event) => updateValue("organization", event.target.value)}
          autoComplete="organization"
          required
        />
      </Field>
      <Field label="Inquiry type" error={errors.inquiryType}>
        <select
          aria-invalid={Boolean(errors.inquiryType)}
          aria-describedby={errors.inquiryType ? "contact-inquiry-type-error" : undefined}
          className="form-field"
          value={values.inquiryType}
          onChange={(event) => updateValue("inquiryType", event.target.value)}
          required
        >
          <option value="">Choose one</option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="form-field min-h-36 resize-y"
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          required
        />
      </Field>
      <button
        className="inline-flex w-full min-h-11 items-center justify-center rounded-[8px] bg-ink px-5 py-3 text-sm font-medium text-chalk transition hover:bg-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send inquiry"}
      </button>
      {submitState.status === "success" ? (
        <p className="rounded-[8px] border border-cypress/20 bg-cypress/10 px-4 py-3 text-sm text-cypress" role="status">
          {submitState.message}
        </p>
      ) : null}
      {submitState.status === "error" ? (
        <p className="rounded-[8px] border border-red-700/20 bg-red-700/10 px-4 py-3 text-sm text-red-700" role="alert">
          {submitState.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({ children, error, label }: { children: ReactNode; error?: string; label: string }) {
  const errorId = `contact-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-error`;

  return (
    <label className="block space-y-2 text-sm font-medium text-ink">
      <span>{label}</span>
      {children}
      {error ? (
        <span className="block text-sm font-normal text-red-700" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
