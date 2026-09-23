import type { Metadata } from "next";
import { Building2, MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArchitecturalPlate } from "@/components/shared/ArchitecturalPlate";
import { Button } from "@/components/shared/Button";
import { AboutHero } from "@/components/about/AboutHero";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { qualityPillars } from "@/content/homepage";
import { siteConfig } from "@/content/site.config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "NorthPeak Developments is a Calgary-based renovation partner focused on legal suite basements, custom basements, and home renovation — built on structural integrity first.",
  path: "/about",
});

export default function AboutPage() {
  const { streetAddress, addressLocality, addressRegion, postalCode } = siteConfig.contact;
  const hasHeadquartersAddress = Boolean(streetAddress);
  const fullAddress = [streetAddress, addressLocality, addressRegion, postalCode]
    .filter(Boolean)
    .join(", ");
  const mapsHref = hasHeadquartersAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
    : undefined;

  return (
    <>
      <AboutHero />

      <section className="bg-near-black py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Why We Stay Focused"
              title="Three services, done properly, beat ten services done adequately."
            />
            <p className="mt-6 text-base leading-relaxed text-stone">
              NorthPeak Developments works on legal suite basements, custom basements, and home
              renovation — and nothing outside that list. Staying focused means every project gets
              our full attention, and every homeowner works with people who genuinely specialize in
              the work being done, rather than a general contractor spread across every trade and
              project type.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone">
              That focus also means being straightforward when something is outside our scope — a
              new addition, for instance — so you can find the right partner instead of a mismatched
              one.
            </p>
          </div>
          <div className="aspect-[4/3] overflow-hidden">
            <ArchitecturalPlate
              layout="texture"
              palette="neutral"
              title="Architectural detail — design concept"
              className="h-full w-full"
            />
          </div>
        </Container>
      </section>

      {/*
        Corporate Anchor. This reads from siteConfig.contact rather than a
        hardcoded address — `streetAddress` is intentionally blank right now.
        See docs/OWNER_INPUTS.md: a specific street address for this section
        was requested, but it matches a real, unrelated Calgary business's
        registered address found earlier in this project, so it isn't
        published here until ownership is confirmed.
      */}
      <section className="border-y border-line-dark bg-graphite py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="border border-warm-white/10 bg-near-black p-8 sm:p-10">
            <div className="flex items-start gap-4">
              <Building2 size={28} strokeWidth={1.5} className="mt-1 shrink-0 text-bronze-light" aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.2em] text-bronze-light uppercase">
                  Headquarters
                </p>
                {hasHeadquartersAddress ? (
                  <>
                    <p className="mt-3 text-lg leading-relaxed text-warm-white text-pretty">{fullAddress}</p>
                    {mapsHref ? (
                      <a
                        href={mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-bronze-light uppercase transition-colors duration-200 hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-light"
                      >
                        <MapPin size={16} strokeWidth={1.75} aria-hidden />
                        Get Directions
                      </a>
                    ) : null}
                  </>
                ) : (
                  <p className="mt-3 text-lg leading-relaxed text-warm-white text-pretty">
                    {siteConfig.serviceRegionLabel}
                  </p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-stone">
                  {hasHeadquartersAddress
                    ? "Consultations by appointment."
                    : "We work on-site across the Calgary area rather than from a public storefront. Book a consultation and we'll coordinate a visit directly."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-near-black py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Behind The Walls"
            title="What we get right before the finishes ever go in."
            description="The work nobody photographs for a portfolio is the work that determines whether a renovation lasts. This is what we hold ourselves to on every project."
          />
          <div className="mt-14">
            <ValuesGrid />
          </div>
        </Container>
      </section>

      <section className="border-y border-line-dark bg-graphite py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How We Work"
            title="The standards behind every project we take on."
            description="Quality is a set of decisions repeated consistently, not a marketing word. These are the ones we hold ourselves to."
          />
          <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {qualityPillars.map((pillar) => (
              <div key={pillar.title} className="border-t border-bronze/50 pt-5">
                <dt className="font-display text-lg font-medium text-warm-white">{pillar.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-stone">{pillar.description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-near-black py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Where We Work"
            title={siteConfig.serviceRegionLabel}
            description={`We serve ${siteConfig.serviceAreas.join(", ")}. If your project is just outside this list, get in touch — we may still be able to help.`}
          />
        </Container>
      </section>

      <section className="border-t border-line-dark bg-graphite py-24 sm:py-28 lg:py-32">
        <Container className="max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-bronze-light uppercase">
            Start Your Project
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight font-medium text-balance text-warm-white sm:text-5xl">
            Tell us what you&apos;re picturing — it takes about four minutes.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone">
            Use the Build Your Space configurator to outline your project type, size, and finish
            direction, and we&apos;ll follow up directly.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/#build-your-space" variant="primary">
              Start the Configurator
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us Directly
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
