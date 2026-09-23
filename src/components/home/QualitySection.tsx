import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { qualityPillars } from "@/content/homepage";
import { siteConfig } from "@/content/site.config";

export function QualitySection() {
  return (
    <section className="bg-warm-white py-24 text-near-black sm:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our Standard"
              title={siteConfig.tagline}
              tone="dark"
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-muted">
              Quality shows up in decisions most homeowners never see — how trades are sequenced,
              how a scope is written, whether a permit is chased down or left to chance. These are
              the standards we hold ourselves to on every project.
            </p>
          </div>

          <div className="lg:col-span-7">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              {qualityPillars.map((pillar) => (
                <div key={pillar.title} className="border-t border-near-black/15 pt-5">
                  <dt className="font-display text-lg font-medium text-near-black">{pillar.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-stone-muted">{pillar.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
