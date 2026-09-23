import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";

export function ConsultationCTA() {
  return (
    <section className="border-t border-line-dark bg-graphite py-24 sm:py-28 lg:py-32">
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-bronze-light uppercase">
          Ready When You Are
        </p>
        <h2 className="mt-5 font-display text-4xl leading-tight font-medium text-warm-white text-balance sm:text-5xl">
          Let&apos;s talk about what your space could become.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-stone">
          Book a consultation and we&apos;ll walk through your space, your goals, and what&apos;s
          realistic — with no pressure to commit on the spot.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            Book a Renovation Consultation
          </Button>
          <Button href="/services" variant="secondary">
            Explore Our Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
