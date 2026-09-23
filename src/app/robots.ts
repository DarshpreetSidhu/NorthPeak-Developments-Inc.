import type { MetadataRoute } from "next";
import { isProductionSite, siteConfig } from "@/content/site.config";

/**
 * Search indexing is only allowed when NEXT_PUBLIC_SITE_ENV=production.
 * Any other value (the default) blocks crawling entirely, so staging and
 * preview deployments never get indexed by accident.
 * See docs/OWNER_INPUTS.md for the pre-launch indexing checklist.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
