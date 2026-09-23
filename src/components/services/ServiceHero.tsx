"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { EASE_CINEMATIC } from "@/lib/motion";

export function ServiceHero({
  eyebrow,
  headline,
  subhead,
  imageUrl,
  imageAlt,
  scaleFrom = 1,
  scaleTo = 1.05,
  durationSeconds = 15,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
  imageUrl: string;
  imageAlt: string;
  scaleFrom?: number;
  scaleTo?: number;
  durationSeconds?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex h-[80vh] min-h-[520px] w-full items-end overflow-hidden bg-near-black">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: scaleFrom }}
        animate={{ scale: prefersReducedMotion ? scaleFrom : scaleTo }}
        transition={{ duration: durationSeconds, ease: "linear" }}
      >
        <Image
          src={`${imageUrl}?q=80&w=2400&auto=format&fit=crop`}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_CINEMATIC }}
        >
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-bronze-light uppercase">{eyebrow}</p>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.05] font-medium tracking-tight text-warm-white text-balance sm:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm-white/80 text-pretty">{subhead}</p>
          <div className="mt-9">
            <Button href="/contact" variant="primary">
              Book a Renovation Consultation
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-warm-white/70"
        animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.625rem] font-semibold tracking-[0.3em] uppercase">Scroll to Explore</span>
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden />
      </motion.div>
    </section>
  );
}
