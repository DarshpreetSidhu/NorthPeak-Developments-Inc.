import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { homeFaqs } from "@/content/homepage";

export function FAQSection() {
  return (
    <section className="bg-near-black py-24 sm:py-28 lg:py-32">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="Questions" title="Common questions about working with us." align="left" />
        <div className="mt-12">
          <FaqAccordion faqs={homeFaqs} />
        </div>
      </Container>
    </section>
  );
}
