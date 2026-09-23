"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { budgetRangeOptions, cityOptions, serviceInterestOptions } from "@/lib/validation";

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "w-full min-h-11 border border-warm-white/25 bg-transparent px-4 py-3 text-sm text-warm-white placeholder:text-stone/50 focus-visible:border-bronze-light";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold tracking-[0.08em] text-stone uppercase">
      {children}
      {optional ? <span className="ml-1 font-normal normal-case text-stone/60">(optional)</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-error">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center bg-bronze px-8 py-4 text-sm font-semibold tracking-wide text-near-black uppercase transition-colors hover:bg-bronze-light disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending…" : "Send Consultation Request"}
    </button>
  );
}

export function ContactForm({
  contactPhone,
  contactEmail,
}: {
  contactPhone: string;
  contactEmail: string;
}) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const [renderedAt] = useState(() => Date.now().toString());
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
    if (state.status !== "idle") {
      statusRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [state.status]);

  const hasDirectContact = Boolean(contactPhone || contactEmail);

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-7">
      {/* Honeypot — hidden from sighted and screen-reader users, left empty by real visitors. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="formRenderedAt" value={renderedAt} />

      <div ref={statusRef} aria-live="polite">
        {state.status === "success" ? (
          <div className="border border-bronze/50 bg-graphite p-5 text-sm leading-relaxed text-warm-white">
            <p className="font-semibold text-bronze-light">Thank you — your request has been sent.</p>
            <p className="mt-1 text-stone">We&apos;ll be in touch to schedule your consultation.</p>
          </div>
        ) : null}

        {state.status === "not_configured" ? (
          <div className="border border-bronze/50 bg-graphite p-5 text-sm leading-relaxed text-warm-white">
            <p className="font-semibold text-bronze-light">Your request was received.</p>
            <p className="mt-1 text-stone">
              Automatic email delivery isn&apos;t connected yet on this site, so please reach us
              directly to make sure your request doesn&apos;t sit unseen:{" "}
              {hasDirectContact ? (
                <>
                  {contactPhone ? <a className="underline decoration-bronze underline-offset-4" href={`tel:${contactPhone}`}>{contactPhone}</a> : null}
                  {contactPhone && contactEmail ? " or " : null}
                  {contactEmail ? <a className="underline decoration-bronze underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a> : null}
                  .
                </>
              ) : (
                "a direct phone number or email will be published here once configured — for now, please check back shortly or look for our current contact details."
              )}
            </p>
          </div>
        ) : null}

        {state.status === "error" && state.message ? (
          <div className="border border-error/50 bg-graphite p-5 text-sm leading-relaxed text-warm-white">
            <p className="font-semibold text-error">{state.message}</p>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClasses}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClasses}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <Label htmlFor="phone" optional>
            Phone
          </Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClasses}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <select
            id="city"
            name="city"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "city-error" : undefined}
            className={inputClasses}
          >
            <option value="">Select your city</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <FieldError id="city-error" message={errors.city} />
        </div>

        <div>
          <Label htmlFor="serviceInterest">Service interest</Label>
          <select
            id="serviceInterest"
            name="serviceInterest"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.serviceInterest)}
            aria-describedby={errors.serviceInterest ? "serviceInterest-error" : undefined}
            className={inputClasses}
          >
            <option value="">Select a service</option>
            {serviceInterestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="serviceInterest-error" message={errors.serviceInterest} />
        </div>

        <div>
          <Label htmlFor="budgetRange" optional>
            Budget range
          </Label>
          <select id="budgetRange" name="budgetRange" defaultValue="" className={inputClasses}>
            {budgetRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="projectDescription">Tell us about your project</Label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          required
          rows={5}
          minLength={20}
          aria-invalid={Boolean(errors.projectDescription)}
          aria-describedby={errors.projectDescription ? "projectDescription-error" : undefined}
          className={inputClasses}
        />
        <FieldError id="projectDescription-error" message={errors.projectDescription} />
      </div>

      <div className="border-t border-line-dark pt-6">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm text-stone">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 border border-warm-white/40 bg-transparent accent-bronze"
          />
          <span>
            I agree to be contacted about my project and have read the{" "}
            <Link href="/privacy" className="text-bronze-light underline underline-offset-4">
              privacy notice
            </Link>
            .
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <SubmitButton />
    </form>
  );
}
