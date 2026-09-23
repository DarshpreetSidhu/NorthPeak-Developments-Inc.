import type { ContactFormValues } from "@/lib/validation";
import type { ConfiguratorValues } from "@/lib/configuratorSchema";

export type NotifyResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "error"; message: string };

/**
 * Delivers a validated contact form submission to the configured transport.
 *
 * No email or CRM provider is wired up out of the box — this project ships
 * without real credentials, per the brief. Configure ONE of:
 *
 *   1. Resend — set RESEND_API_KEY and CONTACT_NOTIFICATION_EMAIL, then
 *      uncomment the Resend block below and `npm install resend`.
 *   2. A webhook (Zapier, HubSpot, Make, a custom endpoint) — set
 *      CONTACT_WEBHOOK_URL and the fetch() block below will POST to it.
 *
 * Until one is configured, this returns "not_configured" and the submission
 * is only logged server-side. The UI must never claim the message was sent
 * when this happens — see src/app/contact/actions.ts.
 */
export async function deliverContactSubmission(
  values: ContactFormValues,
): Promise<NotifyResult> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL);

  if (!webhookUrl && !hasResend) {
    console.info("[contact] No delivery transport configured — submission logged only.", {
      name: values.name,
      email: values.email,
      serviceInterest: values.serviceInterest,
      city: values.city,
      receivedAt: new Date().toISOString(),
    });
    return { status: "not_configured" };
  }

  try {
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "northpeak-developments.com/contact" }),
      });
      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }
      return { status: "sent" };
    }

    // Example Resend integration (uncomment once `resend` is installed):
    //
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "NorthPeak Developments <leads@yourdomain.com>",
    //   to: process.env.CONTACT_NOTIFICATION_EMAIL!,
    //   replyTo: values.email,
    //   subject: `New consultation request — ${values.name}`,
    //   text: JSON.stringify(values, null, 2),
    // });
    // return { status: "sent" };

    return { status: "not_configured" };
  } catch (error) {
    console.error("[contact] Failed to deliver submission:", error);
    return {
      status: "error",
      message: "We couldn't send your message just now.",
    };
  }
}

/**
 * Delivers a validated "Build Your Space" configurator lead.
 *
 * IMPORTANT — destination address: an earlier brief for this project asked
 * for leads to route to `build@northpeakdevelopments.ca`. That domain was
 * checked in this project and found to be a live site for a real, unrelated
 * business (a Calgary commercial-cleaning company, not this renovation
 * contractor) — see the conversation history / docs/OWNER_INPUTS.md. This
 * function therefore does NOT hardcode that (or any) address. It reuses the
 * same owner-configured transport as the main contact form
 * (`CONTACT_WEBHOOK_URL`, or `RESEND_API_KEY` + `CONTACT_NOTIFICATION_EMAIL`)
 * so configurator leads and contact-form leads land in one place the owner
 * actually controls. Do not reintroduce that domain here without the owner
 * first confirming they own a mailbox on a domain they control.
 */
export async function deliverConfiguratorLead(values: ConfiguratorValues): Promise<NotifyResult> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL);

  if (!webhookUrl && !hasResend) {
    console.info("[configurator] No delivery transport configured — lead logged only.", {
      name: values.name,
      email: values.email,
      projectType: values.projectType,
      projectScope: values.projectScope,
      finish: values.finish,
      receivedAt: new Date().toISOString(),
    });
    return { status: "not_configured" };
  }

  try {
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "northpeak-developments.com/configurator" }),
      });
      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }
      return { status: "sent" };
    }

    // Example Resend integration (uncomment once `resend` is installed and
    // CONTACT_NOTIFICATION_EMAIL is set to a real, owner-verified address):
    //
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "NorthPeak Developments <leads@yourdomain.com>",
    //   to: process.env.CONTACT_NOTIFICATION_EMAIL!,
    //   replyTo: values.email,
    //   subject: `New "Build Your Space" lead — ${values.name}`,
    //   text: JSON.stringify(values, null, 2),
    // });
    // return { status: "sent" };

    return { status: "not_configured" };
  } catch (error) {
    console.error("[configurator] Failed to deliver lead:", error);
    return {
      status: "error",
      message: "We couldn't send your project details just now.",
    };
  }
}
