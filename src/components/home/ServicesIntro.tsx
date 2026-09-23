"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { services } from "@/content/services";
import {
  arrowRevealVariants,
  detailRevealVariants,
  fadeUpVariants,
  glassPanelVariants,
  imageScaleVariants,
  staggerContainer,
  washVariants,
} from "@/lib/motion";

// Design-reference photography (Unsplash, free tier, verified) standing in
// for real project photography — see docs/ASSET_INVENTORY.md.
const imageByService: Record<string, string> = {
  "legal-suite-basement": "https://images.unsplash.com/photo-1773098587137-1a62971cfedb",
  "custom-basement": "https://images.unsplash.com/photo-1780913363809-c7dafc52d11c",
  "home-renovation": "https://images.unsplash.com/photo-1704383014623-a6630096ff8c",
};

export function ServicesIntro() {
  return (
    <section className="bg-near-black py-24 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="What We Build"
          title="Three ways to add the space your home is missing."
          description="Each service starts from a different goal — rental income, a lower level built for living, or a home that finally works the way you need it to."
        />
      </Container>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3"
      >
        {services.map((service, index) => (
          <motion.div key={service.slug} variants={fadeUpVariants} className="aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-[640px]">
            <Link
              href={`/services/${service.slug}`}
              className="group relative block h-full w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-bronze-light"
            >
              <motion.div initial="rest" whileHover="hover" whileFocus="hover" animate="rest" className="h-full w-full">
                <motion.div variants={imageScaleVariants} className="absolute inset-0">
                  <Image
                    src={`${imageByService[service.slug]}?q=80&w=1400&auto=format&fit=crop`}
                    alt={`${service.name} — design reference`}
                    fill
                    sizes="(max-width: 767px) 100vw, 34vw"
                    className="object-cover"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/20 to-transparent" />
                <motion.div variants={washVariants} className="pointer-events-none absolute inset-0 bg-near-black" />

                <span className="absolute top-7 left-7 font-display text-sm text-bronze-light sm:top-8 sm:left-8">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <motion.div variants={glassPanelVariants} className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-sans text-xl font-medium tracking-wide text-warm-white">
                      {service.name}
                    </h3>
                    <motion.span variants={arrowRevealVariants} className="mt-1 shrink-0 text-bronze-light">
                      <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden />
                    </motion.span>
                  </div>
                  <motion.p variants={detailRevealVariants} className="overflow-hidden text-sm leading-relaxed text-stone">
                    {service.homeIntro}
                  </motion.p>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
