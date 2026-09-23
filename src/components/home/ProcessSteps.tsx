import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { consultationProcess } from "@/content/homepage";

export function ProcessSteps() {
  return (
    <section className="border-y border-line-dark bg-graphite py-24 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From first conversation to final walkthrough."
          description="A clear, coordinated path — not a black box between your consultation and your completed project."
        />

        <ol className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {consultationProcess.map((item) => (
            <li key={item.step} className="border-t border-bronze/50 pt-6">
              <span className="font-display text-3xl text-bronze-light">{item.step}</span>
              <h3 className="mt-3 font-display text-xl font-medium text-warm-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{item.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
