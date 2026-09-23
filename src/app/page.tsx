import type { Metadata } from "next";
import Script from "next/script";
import { Hero } from "@/components/home/Hero";
import { ServicesIntro } from "@/components/home/ServicesIntro";
import { SignatureWallConfigurator } from "@/components/configurator/SignatureWallConfigurator";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { QualitySection } from "@/components/home/QualitySection";
import { ConfiguratorSection } from "@/components/configurator/ConfiguratorSection";
import { FAQSection } from "@/components/home/FAQSection";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { buildPageMetadata } from "@/lib/seo";
import { homeFaqs } from "@/content/homepage";

export const metadata: Metadata = buildPageMetadata({
  title: "Calgary Renovation & Basement Development",
  description:
    "NorthPeak Developments builds legal suite basements, custom basements, and whole-home renovations across Calgary, Chestermere, Strathmore, Okotoks, Cochrane, and Airdrie.",
  path: "/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesIntro />
      <SignatureWallConfigurator />
      <ProjectGallery />
      <ProcessSteps />
      <QualitySection />
      <ConfiguratorSection />
      <FAQSection />
      <ConsultationCTA />
      <Script
        id="home-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
