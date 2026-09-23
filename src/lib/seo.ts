import type { Metadata } from "next";
import { siteConfig } from "@/content/site.config";
import { services } from "@/content/services";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalized}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.businessName,
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * JSON-LD for the site's local business entity. Only includes fields backed
 * by verified data in site.config.ts — address, phone, and email are
 * omitted entirely until the owner supplies them so we never publish
 * placeholder contact details as structured data (see docs/OWNER_INPUTS.md).
 *
 * `@type` carries both `HomeAndConstructionBusiness` (a more specific
 * schema.org subtype, preferred by Google's structured-data guidelines) and
 * `LocalBusiness` (the general type) — a valid multi-type JSON-LD value, so
 * this validates as both without losing the more specific classification.
 */
export function buildLocalBusinessJsonLd() {
  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.businessName,
    description: siteConfig.shortDescription,
    url: siteConfig.siteUrl,
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    slogan: siteConfig.tagline,
    // Sourced from the canonical service content in content/services.ts so
    // this never drifts out of sync with the actual service names/pages.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${siteConfig.businessName} Services`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.metaDescription,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };

  if (siteConfig.contact.phone) {
    business.telephone = siteConfig.contact.phone;
  }
  if (siteConfig.contact.email) {
    business.email = siteConfig.contact.email;
  }
  if (siteConfig.contact.streetAddress) {
    business.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.streetAddress,
      addressLocality: siteConfig.contact.addressLocality,
      addressRegion: siteConfig.contact.addressRegion,
      postalCode: siteConfig.contact.postalCode || undefined,
      addressCountry: "CA",
    };
  }

  const sameAs = Object.values(siteConfig.socialLinks).filter(Boolean);
  if (sameAs.length > 0) {
    business.sameAs = sameAs;
  }

  return business;
}

export function buildServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${siteConfig.siteUrl}/#organization` },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
