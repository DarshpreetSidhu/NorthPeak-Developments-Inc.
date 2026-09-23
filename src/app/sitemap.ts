import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";
import { services } from "@/content/services";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.siteUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteConfig.siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteConfig.siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.siteUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.55,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
