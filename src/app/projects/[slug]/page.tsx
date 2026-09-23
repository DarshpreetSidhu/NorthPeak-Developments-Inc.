import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Ruler, User } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildPageMetadata({
      title: "Project not found",
      description: "This case study could not be found.",
      path: `/projects/${slug}`,
    });
  }

  return buildPageMetadata({
    title: project.title,
    description: project.metaDescription,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ]);

  return (
    <>
      <section className="border-b border-line-dark bg-near-black py-20 sm:py-24 lg:py-28">
        <Container className="max-w-3xl">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-bronze-light uppercase transition-colors duration-200 hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-light"
          >
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
            All Projects
          </Link>
          <p className="mb-5 font-sans text-xs font-semibold tracking-[0.28em] text-bronze-light uppercase">
            {project.projectType}
          </p>
          <h1 className="font-display text-4xl leading-[1.1] font-medium tracking-tight text-warm-white text-balance sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </Container>
      </section>

      <section className="bg-near-black py-16 sm:py-20 lg:py-24">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-medium text-warm-white">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-stone text-pretty">
                {project.description}
              </p>

              <h2 className="mt-12 font-display text-2xl font-medium text-warm-white">
                Scope of Work
              </h2>
              <ul className="mt-4 space-y-3">
                {project.scopeOfWork.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-stone">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-light"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="h-fit border border-line-dark bg-graphite p-7 sm:p-8">
              <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-bronze-light uppercase">
                Project Details
              </h2>
              <dl className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-bronze-light"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <dt className="text-xs tracking-wide text-stone-muted uppercase">Location</dt>
                    <dd className="mt-1 text-sm text-warm-white">{project.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler
                    size={18}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-bronze-light"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <dt className="text-xs tracking-wide text-stone-muted uppercase">Scope</dt>
                    <dd className="mt-1 text-sm text-warm-white">{project.scopeSummary}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User
                    size={18}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-bronze-light"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <dt className="text-xs tracking-wide text-stone-muted uppercase">Client</dt>
                    <dd className="mt-1 text-sm text-warm-white">{project.client}</dd>
                  </div>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <ConsultationCTA />
      <Script
        id="project-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
