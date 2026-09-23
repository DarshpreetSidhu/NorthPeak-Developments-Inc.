"use server";

import { configuratorSchema, type ConfiguratorValues } from "@/lib/configuratorSchema";
import { deliverConfiguratorLead } from "@/lib/notify";

export type ConfiguratorSubmitState =
  | { status: "success" }
  | { status: "not_configured" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<string, string>> };

const MIN_FILL_TIME_MS = 2500;

/**
 * Re-validates the full configurator payload server-side — the client-side
 * React Hook Form + Zod validation is a UX convenience only, never a
 * security boundary, since this function is reachable directly.
 */
export async function submitConfiguratorLead(raw: unknown): Promise<ConfiguratorSubmitState> {
  const parsed = configuratorSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", message: "Please fix the highlighted fields and try again.", fieldErrors };
  }

  const values: ConfiguratorValues = parsed.data;

  // Honeypot: bots fill every field, including this hidden one. Pretend
  // success without sending anything.
  if (values.companyWebsite) {
    return { status: "success" };
  }

  // Timing check: reject submissions faster than a human could plausibly
  // complete a four-step wizard.
  const renderedAt = Number(values.formRenderedAt);
  if (!Number.isNaN(renderedAt) && Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return { status: "error", message: "That submitted a little too quickly — please try again." };
  }

  const result = await deliverConfiguratorLead(values);

  if (result.status === "sent") {
    return { status: "success" };
  }
  if (result.status === "not_configured") {
    return { status: "not_configured" };
  }
  return { status: "error", message: result.message };
}
