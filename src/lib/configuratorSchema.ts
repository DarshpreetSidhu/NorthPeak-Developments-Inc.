import { z } from "zod";
import { finishConcepts } from "@/content/finishes";

export const projectTypeOptions = [
  { value: "legal-suite-basement", label: "Legal Suite Basement" },
  { value: "custom-basement", label: "Custom Basement" },
  { value: "whole-home-renovation", label: "Whole Home Renovation" },
] as const;

export const projectScopeOptions = [
  { value: "under-1000", label: "Under 1,000 sq ft" },
  { value: "1000-2000", label: "1,000 – 2,000 sq ft" },
  { value: "2000-plus", label: "2,000+ sq ft" },
] as const;

/**
 * Finish options are derived from the canonical `finishConcepts` used by the
 * homepage entertainment-wall selector, so the configurator never drifts
 * out of sync with that content (and "Rift-cut oak" etc. stays accurate to
 * whatever `src/content/finishes.ts` currently says).
 */
export const finishOptions = finishConcepts.map((concept) => ({
  value: concept.id,
  label: concept.name,
  detail: concept.wallPanel,
}));

export type ProjectTypeValue = (typeof projectTypeOptions)[number]["value"];
export type ProjectScopeValue = (typeof projectScopeOptions)[number]["value"];

const projectTypeValues = projectTypeOptions.map((option) => option.value) as [string, ...string[]];
const projectScopeValues = projectScopeOptions.map((option) => option.value) as [string, ...string[]];
const finishValues = finishOptions.map((option) => option.value) as [string, ...string[]];

export const configuratorSchema = z.object({
  // Step 1
  projectType: z.enum(projectTypeValues, { error: "Select a project type." }),
  // Step 2
  projectScope: z.enum(projectScopeValues, { error: "Select a project size." }),
  // Step 3
  finish: z.enum(finishValues, { error: "Select a finish direction." }),
  // Step 4
  name: z.string({ error: "Enter your full name." }).trim().min(2, "Enter your full name.").max(120),
  phone: z
    .string({ error: "Enter a phone number." })
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30, "That phone number is too long."),
  email: z.email("Enter a valid email address."),
  propertyAddress: z
    .string({ error: "Enter the property address." })
    .trim()
    .min(5, "Enter the property address.")
    .max(200, "That address is too long."),
  // React Hook Form represents a lone checkbox as a boolean (the DOM
  // `checked` property), not the "on"/absent string pair native FormData
  // submissions use — unlike the main contact form's schema in
  // `src/lib/validation.ts`, which is submitted as raw FormData and
  // correctly expects the literal string "on".
  consent: z.literal(true, {
    error: "Please confirm you've read the privacy notice to continue.",
  }),
  // Honeypot: real visitors never see or fill this field.
  companyWebsite: z.string().max(0).optional().default(""),
  // Anti-bot timing check: set by the client shortly after the form mounts.
  formRenderedAt: z.string().min(1, "Please try again."),
});

/** Parsed/output shape — what the server action receives after Zod applies defaults. */
export type ConfiguratorValues = z.infer<typeof configuratorSchema>;

/** Pre-parse shape — what React Hook Form actually holds while the user is editing. */
export type ConfiguratorFormInput = z.input<typeof configuratorSchema>;

export type ConfiguratorFieldErrors = Partial<Record<keyof ConfiguratorValues, string>>;

/** Field groups validated per wizard step (used with RHF's `trigger()`). */
export const stepFields = [
  ["projectType"],
  ["projectScope"],
  ["finish"],
  ["name", "phone", "email", "propertyAddress", "consent"],
] as const satisfies readonly (keyof ConfiguratorFormInput)[][];

export const totalSteps = stepFields.length;
