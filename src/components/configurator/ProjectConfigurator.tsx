"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import {
  configuratorSchema,
  finishOptions,
  projectScopeOptions,
  projectTypeOptions,
  stepFields,
  totalSteps,
  type ConfiguratorFormInput,
  type ConfiguratorValues,
} from "@/lib/configuratorSchema";
import { EASE_CINEMATIC } from "@/lib/motion";
import { submitConfiguratorLead, type ConfiguratorSubmitState } from "@/components/configurator/actions";

const STEP_LABELS = ["Project Type", "Project Size", "Finish Direction", "Your Details"];

/**
 * Entry-only slide variant. There is deliberately no `exit` variant and no
 * `AnimatePresence` wrapper around the stepped content below — the
 * installed framer-motion@13.4.0 + React 19 combination in this project
 * never fires AnimatePresence's exit-complete callback for this keyed
 * `motion.div` pattern, which left the *previous* step's fieldset
 * permanently in the DOM (confirmed in an actual production build, not
 * just dev). Correctness of which step is showing must not depend on an
 * animation library's unmount timing, so step switching is handled by
 * plain React keyed reconciliation (changing `key={currentStep}` unmounts
 * the old div synchronously, no animation involved) and only the
 * newly-mounted step gets an enter transition.
 */
const slideVariants = {
  enter: (direction: number) => ({ x: direction >= 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
};

function RadioCard({
  id,
  registration,
  value,
  checked,
  title,
  subtitle,
  swatch,
}: {
  id: string;
  registration: UseFormRegisterReturn;
  value: string;
  checked: boolean;
  title: string;
  subtitle?: string;
  swatch?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={`relative flex min-h-11 cursor-pointer flex-col gap-2 border p-5 transition-colors sm:p-6 ${
        checked ? "border-bronze bg-bronze/[0.07]" : "border-line-dark hover:border-warm-white/30"
      }`}
    >
      <input type="radio" id={id} value={value} className="sr-only" {...registration} />
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            checked ? "border-bronze" : "border-warm-white/30"
          }`}
        >
          {checked ? <span className="h-2.5 w-2.5 rounded-full bg-bronze" /> : null}
        </span>
        <span className="font-display text-lg text-warm-white sm:text-xl">{title}</span>
        {swatch ? (
          <span aria-hidden className="ml-auto h-6 w-6 shrink-0 border border-warm-white/20" style={{ backgroundColor: swatch }} />
        ) : null}
      </div>
      {subtitle ? <p className="pl-8 text-sm leading-relaxed text-stone">{subtitle}</p> : null}
    </label>
  );
}

const inputClasses =
  "w-full min-h-11 border border-warm-white/25 bg-transparent px-4 py-3 text-sm text-warm-white placeholder:text-stone/50 focus-visible:border-bronze-light";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-error">
      {message}
    </p>
  );
}

export function ProjectConfigurator() {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConfiguratorFormInput, unknown, ConfiguratorValues>({
    resolver: zodResolver(configuratorSchema),
    mode: "onTouched",
    defaultValues: {
      projectType: undefined,
      projectScope: undefined,
      finish: undefined,
      name: "",
      phone: "",
      email: "",
      propertyAddress: "",
      consent: undefined,
      companyWebsite: "",
      formRenderedAt: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitState, setSubmitState] = useState<ConfiguratorSubmitState | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const projectType = watch("projectType");
  const projectScope = watch("projectScope");
  const finish = watch("finish");

  useEffect(() => {
    setValue("formRenderedAt", Date.now().toString());
  }, [setValue]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  const goNext = async () => {
    const valid = await trigger(stepFields[currentStep]);
    if (!valid) return;
    setDirection(1);
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const startOver = () => {
    reset();
    setSubmitState(null);
    setCurrentStep(0);
    setValue("formRenderedAt", Date.now().toString());
  };

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitConfiguratorLead(values);
    setSubmitState(result);
    if (result.status === "error" && result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as keyof ConfiguratorFormInput, { message });
      }
    }
  });

  if (submitState && submitState.status !== "error") {
    return (
      <div className="border border-bronze/40 bg-graphite p-8 text-center sm:p-12">
        <p className="text-xs font-semibold tracking-[0.3em] text-bronze-light uppercase">
          {submitState.status === "success" ? "Request received" : "Request received"}
        </p>
        <h3 className="mt-4 font-display text-3xl font-medium text-warm-white">
          Thank you — we&apos;ll be in touch.
        </h3>
        {submitState.status === "not_configured" ? (
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">
            Automatic delivery isn&apos;t connected yet on this site, so please also reach us
            directly through the{" "}
            <a href="/contact" className="text-bronze-light underline underline-offset-4">
              contact page
            </a>{" "}
            to make sure your project details don&apos;t sit unseen.
          </p>
        ) : (
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">
            We&apos;ve received your project details and will follow up to schedule your
            consultation.
          </p>
        )}
        <button
          type="button"
          onClick={startOver}
          className="mt-8 inline-flex min-h-11 items-center justify-center border border-warm-white/30 px-6 py-3 text-xs font-semibold tracking-[0.16em] text-warm-white uppercase transition-colors hover:border-warm-white"
        >
          Configure another space
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative border border-line-dark bg-graphite p-6 sm:p-10">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cfg-company">Company website</label>
        <input id="cfg-company" type="text" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-stone uppercase">
          Step {currentStep + 1} of {totalSteps} — {STEP_LABELS[currentStep]}
        </p>
        <p className="text-xs text-stone/70" aria-hidden>
          {Math.round(((currentStep + 1) / totalSteps) * 100)}%
        </p>
      </div>
      <div className="mt-3 h-px w-full bg-warm-white/10">
        <motion.div
          className="h-px bg-bronze"
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
        />
      </div>

      <div className="mt-8 overflow-hidden">
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
        >
            {currentStep === 0 ? (
              <fieldset>
                <legend className="sr-only">Project type</legend>
                <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-medium text-warm-white outline-none sm:text-3xl">
                  What are you looking to build?
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {projectTypeOptions.map((option) => (
                    <RadioCard
                      key={option.value}
                      id={`cfg-project-type-${option.value}`}
                      value={option.value}
                      checked={projectType === option.value}
                      title={option.label}
                      registration={register("projectType")}
                    />
                  ))}
                </div>
                <FieldError id="projectType-error" message={errors.projectType?.message} />
              </fieldset>
            ) : null}

            {currentStep === 1 ? (
              <fieldset>
                <legend className="sr-only">Project size</legend>
                <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-medium text-warm-white outline-none sm:text-3xl">
                  Roughly how much space?
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {projectScopeOptions.map((option) => (
                    <RadioCard
                      key={option.value}
                      id={`cfg-project-scope-${option.value}`}
                      value={option.value}
                      checked={projectScope === option.value}
                      title={option.label}
                      registration={register("projectScope")}
                    />
                  ))}
                </div>
                <FieldError id="projectScope-error" message={errors.projectScope?.message} />
              </fieldset>
            ) : null}

            {currentStep === 2 ? (
              <fieldset>
                <legend className="sr-only">Entertainment wall finish</legend>
                <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-medium text-warm-white outline-none sm:text-3xl">
                  Which finish direction speaks to you?
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {finishOptions.map((option) => (
                    <RadioCard
                      key={option.value}
                      id={`cfg-finish-${option.value}`}
                      value={option.value}
                      checked={finish === option.value}
                      title={option.label}
                      subtitle={option.detail}
                      registration={register("finish")}
                    />
                  ))}
                </div>
                <FieldError id="finish-error" message={errors.finish?.message} />
              </fieldset>
            ) : null}

            {currentStep === 3 ? (
              <fieldset>
                <legend className="sr-only">Your contact details</legend>
                <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-medium text-warm-white outline-none sm:text-3xl">
                  Where should we send your consultation details?
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cfg-name" className="mb-2 block text-xs font-semibold tracking-[0.08em] text-stone uppercase">
                      Full name
                    </label>
                    <input id="cfg-name" type="text" autoComplete="name" className={inputClasses} {...register("name")} />
                    <FieldError id="name-error" message={errors.name?.message} />
                  </div>
                  <div>
                    <label htmlFor="cfg-phone" className="mb-2 block text-xs font-semibold tracking-[0.08em] text-stone uppercase">
                      Phone
                    </label>
                    <input id="cfg-phone" type="tel" autoComplete="tel" className={inputClasses} {...register("phone")} />
                    <FieldError id="phone-error" message={errors.phone?.message} />
                  </div>
                  <div>
                    <label htmlFor="cfg-email" className="mb-2 block text-xs font-semibold tracking-[0.08em] text-stone uppercase">
                      Email
                    </label>
                    <input id="cfg-email" type="email" autoComplete="email" className={inputClasses} {...register("email")} />
                    <FieldError id="email-error" message={errors.email?.message} />
                  </div>
                  <div>
                    <label htmlFor="cfg-address" className="mb-2 block text-xs font-semibold tracking-[0.08em] text-stone uppercase">
                      Property address
                    </label>
                    <input id="cfg-address" type="text" autoComplete="street-address" className={inputClasses} {...register("propertyAddress")} />
                    <FieldError id="propertyAddress-error" message={errors.propertyAddress?.message} />
                  </div>
                </div>

                <div className="mt-6 border-t border-line-dark pt-6">
                  <label htmlFor="cfg-consent" className="flex cursor-pointer items-start gap-3 text-sm text-stone">
                    <input
                      id="cfg-consent"
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 border border-warm-white/40 bg-transparent accent-bronze"
                      {...register("consent")}
                    />
                    <span>
                      I agree to be contacted about my project and have read the{" "}
                      <a href="/privacy" className="text-bronze-light underline underline-offset-4">
                        privacy notice
                      </a>
                      .
                    </span>
                  </label>
                  <FieldError id="consent-error" message={errors.consent?.message} />
                </div>
              </fieldset>
            ) : null}
        </motion.div>
      </div>

      {submitState?.status === "error" ? (
        <div className="mt-6 border border-error/50 bg-near-black p-4">
          <p role="alert" className="text-sm text-error">
            {submitState.message}
          </p>
        </div>
      ) : null}

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line-dark pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStep === 0}
          className="min-h-11 px-4 text-xs font-semibold tracking-[0.16em] text-stone uppercase transition-colors hover:text-warm-white disabled:pointer-events-none disabled:opacity-0"
        >
          Back
        </button>

        {currentStep < totalSteps - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-11 items-center justify-center bg-bronze px-8 py-3.5 text-xs font-semibold tracking-[0.16em] text-near-black uppercase transition-colors hover:bg-bronze-light"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-bronze px-8 py-3.5 text-xs font-semibold tracking-[0.16em] text-near-black uppercase transition-colors hover:bg-bronze-light disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                <Check size={16} strokeWidth={2.5} aria-hidden />
                Submit Project Details
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
