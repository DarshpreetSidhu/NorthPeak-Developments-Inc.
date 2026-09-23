"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { galleryImageSrc, galleryItems } from "@/content/gallery";
import { getServiceBySlug } from "@/content/services";
import {
  arrowRevealVariants as arrowVariants,
  detailRevealVariants as detailVariants,
  fadeUpVariants as revealVariants,
  glassPanelVariants as glassVariants,
  imageScaleVariants,
  staggerContainer as containerVariants,
  washVariants,
} from "@/lib/motion";

/**
 * Hand-placed editorial spans on a 12-col / 5-row desktop grid:
 * a hero pair, a three-up portrait band, then a full-bleed cinematic closer.
 * Below `md`, every card drops these spans and stacks full-width with its
 * own aspect ratio (set per item below) for a seamless mobile scroll.
 */
const desktopSpans = [
  "md:col-start-1 md:col-end-8 md:row-start-1 md:row-end-3",
  "md:col-start-8 md:col-end-13 md:row-start-1 md:row-end-3",
  "md:col-start-1 md:col-end-5 md:row-start-3 md:row-end-5",
  "md:col-start-5 md:col-end-9 md:row-start-3 md:row-end-5",
  "md:col-start-9 md:col-end-13 md:row-start-3 md:row-end-5",
  "md:col-start-1 md:col-end-13 md:row-start-5 md:row-end-6",
];

const mobileAspect = [
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-video",
];

export function ImmersiveGallery() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-12 md:gap-6 md:[grid-auto-rows:clamp(170px,14vw,230px)]"
    >
      {galleryItems.map((item, index) => {
        const service = getServiceBySlug(item.serviceSlug);

        return (
          <motion.div
            key={item.id}
            variants={revealVariants}
            className={`${desktopSpans[index] ?? ""} ${mobileAspect[index] ?? "aspect-[4/5]"} md:aspect-auto`}
          >
            <Link
              href={service ? `/services/${service.slug}` : "/services"}
              className="group relative block h-full w-full overflow-hidden bg-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-light"
            >
              <motion.div initial="rest" whileHover="hover" whileFocus="hover" animate="rest" className="h-full w-full">
                <motion.div variants={imageScaleVariants} className="absolute inset-0">
                  <Image
                    src={galleryImageSrc(item.imageUrl, 1600)}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 60vw, 45vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                </motion.div>

                {/* Permanent legibility gradient — never fully dissolves */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-near-black/85 via-near-black/10 to-transparent" />

                {/* Moody wash — dissolves on hover per spec */}
                <motion.div variants={washVariants} className="pointer-events-none absolute inset-0 bg-near-black" />

                {/* Category badge */}
                {service ? (
                  <span className="absolute top-5 left-5 border border-warm-white/15 bg-near-black/40 px-3 py-1.5 text-[0.625rem] font-semibold tracking-[0.18em] text-stone uppercase backdrop-blur-sm sm:top-6 sm:left-6">
                    {service.shortName}
                  </span>
                ) : null}

                {/* Editorial caption — glass panel slides/expands in on hover */}
                <motion.div
                  variants={glassVariants}
                  className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-sans text-lg font-medium tracking-wide text-warm-white sm:text-xl">
                      {item.title}
                    </h3>
                    <motion.span variants={arrowVariants} className="mt-1 shrink-0 text-bronze-light">
                      <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden />
                    </motion.span>
                  </div>
                  <motion.p
                    variants={detailVariants}
                    className="overflow-hidden text-sm leading-relaxed text-stone"
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
