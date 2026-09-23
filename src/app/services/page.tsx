import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArchitecturalPlate } from "@/components/shared/ArchitecturalPlate";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { services } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description:
    "Legal suite basements, custom basements, and home renovation — the three services NorthPeak Developments builds across Calgary and area.",
  path: "/services",
});

const artByService: Record<string, { layout: "suite-entry" | "entertainment-wall" | "kitchen"; palette: "soft" | "warm" | "graphite" }> = {
  "legal-suite-basement": { layout: "suite-entry", palette: "soft" },
  "custom-basement": { layout: "entertainment-wall", palette: "warm" },
  "home-renovation": { layout: "kitchen", palette: "graphite" },
};

const bestFor: Record<string, string> = {
  "legal-suite-basement": "Homeowners planning a self-contained rental or extended-family suite.",
  "custom-basement": "Homeowners who want a lower level built for entertaining, guests, or a home office — without a secondary suite.",
  "home-renovation": "Homeowners updating a kitchen, bathroom, or multiple spaces throughout the home.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <section className="border-b border-line-dark bg-near-black py-20 sm:py-24 lg:py-28">
        <Container className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-bronze-light uppercase">Services</p>
          <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight text-warm-white text-balance sm:text-6xl">
            Three services. One standard of work.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone text-pretty">
            We keep our service list focused so every project gets the attention a renovation
            deserves. If you&apos;re not sure which service fits your goals, tell us what you&apos;re
            trying to achieve and we&apos;ll point you the right way.
          </p>
        </Container>
      </section>

      <section className="bg-near-black py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 divide-y divide-line-dark border border-line-dark lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {services.map((service, index) => {
              const art = artByService[service.slug];
              return (
                <article key={service.slug} className="flex flex-col bg-graphite">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ArchitecturalPlate
                      layout={art.layout}
                      palette={art.palette}
                      title={`${service.name} — design concept`}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <p className="text-xs font-semibold tracking-[0.16em] text-bronze-light uppercase">
                      {String(index + 1).padStart(2, "0")} &mdash; {service.name}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-stone">{service.homeIntro}</p>
                    <p className="mt-6 border-t border-line-dark pt-4 text-xs leading-relaxed text-stone/70">
                      <span className="font-semibold text-stone">Best for: </span>
                      {bestFor[service.slug]}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bronze-light hover:text-bronze"
                    >
                      View {service.shortName}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-line-dark bg-near-black py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Service Areas"
            title="Built for Calgary homes, and the communities around it."
            description="We work throughout Calgary, Chestermere, Strathmore, Okotoks, Cochrane, and Airdrie. If your project falls just outside this list, reach out — we may still be able to help."
          />
        </Container>
      </section>

      <ConsultationCTA />
    </>
  );
}
