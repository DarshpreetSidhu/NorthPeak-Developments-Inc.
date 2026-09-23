/**
 * Central business configuration for NorthPeak Developments.
 *
 * This is the single place unverified or owner-supplied business details
 * live. Anything marked OWNER INPUT below is a placeholder and must be
 * confirmed or supplied before launch — see docs/OWNER_INPUTS.md for the
 * full checklist. Nothing here invents reviews, awards, certifications,
 * project counts, addresses, or contact details.
 */

export const siteConfig = {
  businessName: "NorthPeak Developments",
  legalName: "NorthPeak Developments", // OWNER INPUT: confirm legal entity name if different
  tagline: "Quality is not an extra. It is our standard.",
  shortDescription:
    "NorthPeak Developments is a Calgary-based renovation partner focused on legal suite basements, custom basements, and whole-home renovation — built on clear communication and careful execution.",

  // Canonical production URL. Falls back to a documentation placeholder
  // (RFC 2606 .example domain) until NEXT_PUBLIC_SITE_URL is set.
  // OWNER INPUT (required before launch): real production domain.
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.northpeakdevelopments.example").replace(/\/$/, ""),

  // Only "production" enables search indexing. See src/app/robots.ts.
  siteEnv: process.env.NEXT_PUBLIC_SITE_ENV ?? "development",

  serviceAreas: [
    "Calgary",
    "Chestermere",
    "Strathmore",
    "Okotoks",
    "Cochrane",
    "Airdrie",
  ] as const,

  serviceRegionLabel: "Calgary, Alberta & surrounding communities",

  // OWNER INPUT (required before launch): none of these are published until supplied.
  contact: {
    phone: "", // e.g. "(403) 555-0123"
    phoneHref: "", // e.g. "tel:+14035550123"
    email: "", // e.g. "hello@northpeakdevelopments.ca"
    // Street address is intentionally omitted. Many renovation contractors
    // work from a home office or shop and don't publish a storefront address.
    // OWNER INPUT (optional): supply a mailing/office address only if you
    // want one published, and it will be added to the footer and JSON-LD.
    streetAddress: "",
    addressLocality: "Calgary",
    addressRegion: "AB",
    postalCode: "",
  },

  // OWNER INPUT (optional): real, active profiles only. Leave blank to hide.
  socialLinks: {
    instagram: "",
    facebook: "",
    houzz: "",
  },

  // OWNER INPUT (optional, verify before publishing): licensing/registration
  // numbers Alberta consumers commonly look for (e.g. WCB clearance, business
  // licence). Left blank until the owner supplies and confirms these.
  credentials: {
    wcbClearanceNumber: "",
    businessLicenceNumber: "",
  },

  // Contact form delivery — see src/lib/notify.ts and .env.example.
  // These read from environment variables only; nothing is hardcoded here.
  notifications: {
    hasEmailTransport: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL),
    hasWebhookTransport: Boolean(process.env.CONTACT_WEBHOOK_URL),
  },
} as const;

export type ServiceAreaName = (typeof siteConfig.serviceAreas)[number];

export const isProductionSite = siteConfig.siteEnv === "production";
