import { MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/content/site.config";

export function ServiceAreasSection({ note }: { note: string }) {
  return (
    <section className="border-t border-line-dark bg-graphite py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="Service Areas" title={siteConfig.serviceRegionLabel} />
        <p className="mt-6 text-base leading-relaxed text-stone">{note}</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {siteConfig.serviceAreas.map((area) => (
            <li
              key={area}
              className="inline-flex items-center gap-2 border border-line-dark bg-near-black px-4 py-2 text-sm text-warm-white"
            >
              <MapPin size={14} strokeWidth={1.75} className="shrink-0 text-bronze-light" aria-hidden />
              {area}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-stone/70">
          Just outside this list? Reach out — we may still be able to help.
        </p>
      </Container>
    </section>
  );
}
