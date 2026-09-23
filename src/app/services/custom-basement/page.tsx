import type { Metadata } from "next";
import Script from "next/script";
import { getServiceBySlug } from "@/content/services";
import { CustomBasementExperience } from "@/components/services/custom-basement/CustomBasementExperience";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedFaqAccordion } from "@/components/services/AnimatedFaqAccordion";
import { ServiceAreasSection } from "@/components/services/ServiceAreasSection";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildServiceJsonLd } from "@/lib/seo";

const service = getServiceBySlug("custom-basement")!;
const path = `/services/${service.slug}`;

export const metadata: Metadata = buildPageMetadata({
  title: service.name,
  description: service.metaDescription,
  path,
});

export default function CustomBasementPage() {
  const serviceJsonLd = buildServiceJsonLd({ name: service.name, description: service.metaDescription, path });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ]);

  return (
    <>
      <CustomBasementExperience service={service} />

      <section className="border-t border-line-dark bg-near-black py-20 sm:py-24">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Questions" title={`${service.shortName} FAQs`} />
          <div className="mt-12">
            <AnimatedFaqAccordion faqs={service.faqs} />
          </div>
          <div className="mt-10 border border-bronze/40 bg-graphite p-6">
            <p className="text-sm leading-relaxed text-stone">
              <span className="font-semibold text-bronze-light">A note on requirements: </span>
              {service.disclaimer}
            </p>
          </div>
        </Container>
      </section>

      <ServiceAreasSection note={service.serviceAreaNote} />

      <ConsultationCTA />

      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
