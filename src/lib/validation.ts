import { z } from "zod";
import { siteConfig } from "@/content/site.config";

export const serviceInterestOptions = [
  { value: "legal-suite-basement", label: "Legal Suite Basement" },
  { value: "custom-basement", label: "Custom Basement" },
  { value: "home-renovation", label: "Home Renovation" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const budgetRangeOptions = [
  { value: "", label: "Prefer not to say" },
  { value: "under-50k", label: "Under $50,000" },
  { value: "50k-100k", label: "$50,000 – $100,000" },
  { value: "100k-200k", label: "$100,000 – $200,000" },
  { value: "200k-plus", label: "$200,000+" },
] as const;

export const cityOptions = [...siteConfig.serviceAreas, "Other"] as const;

const serviceInterestValues = serviceInterestOptions.map((option) => option.value) as [
  string,
  ...string[],
];

export const contactFormSchema = z.object({
  name: z
    .string({ error: "Enter your full name." })
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "That name is too long."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(30, "That phone number is too long.")
    .optional()
    .or(z.literal("")),
  serviceInterest: z.enum(serviceInterestValues, {
    error: "Select the service you're interested in.",
  }),
  city: z.string({ error: "Let us know your city." }).trim().min(2, "Let us know your city."),
  budgetRange: z.string().optional().default(""),
  projectDescription: z
    .string({ error: "Add a few sentences about your project." })
    .trim()
    .min(20, "Add a few sentences about your project (20 characters minimum).")
    .max(2000, "That description is a bit long — please keep it under 2000 characters."),
  consent: z.literal("on", {
    error: "Please confirm you've read the privacy notice to continue.",
  }),
  // Honeypot: real visitors never see or fill this field.
  companyWebsite: z.string().max(0).optional().default(""),
  // Anti-bot timing check: set by the client when the form mounts.
  formRenderedAt: z.string(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormFieldErrors = Partial<Record<keyof ContactFormValues, string>>;
