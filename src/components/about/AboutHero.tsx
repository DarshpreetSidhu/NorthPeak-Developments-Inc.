"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { EASE_CINEMATIC } from "@/lib/motion";

export function AboutHero() {
  return (
    <section className="border-b border-line-dark bg-near-black py-24 sm:py-28 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_CINEMATIC }}
          className="max-w-3xl"
        >
          <p className="mb-5 font-sans text-xs font-semibold tracking-[0.3em] text-bronze-light uppercase">
            About NorthPeak
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight text-warm-white text-balance sm:text-6xl lg:text-7xl">
            Calgary&apos;s renovation partner for the work behind the walls.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone text-pretty">
            NorthPeak Developments specializes in legal suite basements, custom basements, and
            whole-home renovation — built on structural integrity and code-compliant execution
            first, finishes second.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
