"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Ruler } from "lucide-react";
import type { Project } from "@/lib/projects";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function CaseStudyGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <motion.article
          key={project.slug}
          variants={fadeUpVariants}
          className="group relative flex flex-col justify-between border border-line-dark bg-graphite p-7 transition-colors duration-200 hover:border-bronze/50 sm:p-8"
        >
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-bronze-light uppercase">
              {project.projectType}
            </p>
            <h3 className="mt-4 font-display text-2xl leading-tight font-medium text-balance text-warm-white">
              {project.title}
            </h3>
            <div className="mt-5 flex flex-col gap-2 text-sm text-stone">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} strokeWidth={1.75} className="shrink-0 text-bronze-light" aria-hidden />
                {project.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Ruler size={16} strokeWidth={1.75} className="shrink-0 text-bronze-light" aria-hidden />
                {project.scopeSummary}
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-stone text-pretty">{project.summary}</p>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-bronze-light uppercase transition-colors duration-200 hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-light"
          >
            View Case Study
            <ArrowUpRight
              size={16}
              strokeWidth={1.75}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
