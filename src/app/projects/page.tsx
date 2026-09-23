import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { ImmersiveGallery } from "@/components/projects/ImmersiveGallery";
import { CaseStudyGrid } from "@/components/projects/CaseStudyGrid";
import { getAllProjects } from "@/lib/projects";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects & Case Studies",
  description:
    "Completed project case studies and a curated design-inspiration gallery from NorthPeak Developments — Calgary-area renovation, basement development, and exterior remediation.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <section className="border-b border-line-dark bg-near-black py-20 sm:py-24 lg:py-28">
        <Container className="max-w-3xl">
          <p className="mb-5 font-sans text-xs font-semibold tracking-[0.28em] text-bronze-light uppercase">
            Our Work
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight text-warm-white text-balance sm:text-6xl">
            Case studies from real projects.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone text-pretty">
            Below are documented case studies from completed NorthPeak work — shown at the
            level of detail our clients have approved for publication. Beneath the case
            studies is a separate, clearly labeled design-inspiration gallery: reference
            imagery for the direction we build in, not documentation of completed projects.
          </p>
        </Container>
      </section>

      {projects.length > 0 ? (
        <section className="border-b border-line-dark bg-near-black py-16 sm:py-20 lg:py-24">
          <Container>
            <SectionHeading eyebrow="Case Studies" title="Completed project case studies" />
            <div className="mt-12">
              <CaseStudyGrid projects={projects} />
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-near-black py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Design Inspiration"
            title="The design language we build from"
            description="Curated design reference — a mood board for the direction we build in, not photographs of completed NorthPeak projects."
          />
          <div className="mt-12">
            <ImmersiveGallery />
          </div>
        </Container>
      </section>

      <ConsultationCTA />
    </>
  );
}
