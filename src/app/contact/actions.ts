"use server";

import { contactFormSchema } from "@/lib/validation";
import { deliverContactSubmission } from "@/lib/notify";

export type ContactFormState = {
  status: "idle" | "success" | "not_configured" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

const MIN_FILL_TIME_MS = 2500;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const values = parsed.data;

  // Honeypot: bots fill every field, including this hidden one. Pretend
  // success without sending anything.
  if (values.companyWebsite) {
    return { status: "success" };
  }

  // Timing check: reject submissions faster than a human could plausibly
  // complete this form, a common signature of automated submissions.
  const renderedAt = Number(values.formRenderedAt);
  if (!Number.isNaN(renderedAt) && Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return {
      status: "error",
      message: "That submitted a little too quickly — please try again.",
    };
  }

  const result = await deliverContactSubmission(values);

  if (result.status === "sent") {
    return { status: "success" };
  }
  if (result.status === "not_configured") {
    return { status: "not_configured" };
  }
  return { status: "error", message: result.message };
}
