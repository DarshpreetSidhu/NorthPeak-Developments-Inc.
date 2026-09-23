import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { galleryImageSrc, galleryItems } from "@/content/gallery";

export function ProjectGallery() {
  const featured = galleryItems.slice(0, 3);

  return (
    <section className="bg-near-black py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Design Inspiration"
            title="A look at the design language we build from."
            description="Curated architectural photography — the design standard we build toward, not a photograph of a completed project."
          />
          <Button href="/projects" variant="secondary" className="shrink-0">
            View the full gallery
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <figure key={item.id} className="group flex flex-col">
              <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-stone/60 uppercase">
                Design concept
              </p>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-graphite">
                <Image
                  src={galleryImageSrc(item.imageUrl, 1200)}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-6">
                <p className="font-display text-lg text-warm-white">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
