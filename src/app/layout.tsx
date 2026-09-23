import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/content/site.config";
import { buildLocalBusinessJsonLd } from "@/lib/seo";
import { ServiceAreaStrip } from "@/components/layout/ServiceAreaStrip";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Renovation & Basement Development in Calgary`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.shortDescription,
  keywords: [
    "Calgary renovation contractor",
    "legal basement suite Calgary",
    "custom basement development Calgary",
    "home renovation Calgary",
  ],
  authors: [{ name: siteConfig.businessName }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Renovation & Basement Development in Calgary`,
    description: siteConfig.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} | Renovation & Basement Development in Calgary`,
    description: siteConfig.shortDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessJsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="en-CA" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-near-black font-sans text-warm-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ServiceAreaStrip />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
