"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/shared/Button";

// Design-reference photography (Unsplash, free tier, verified) — a mood-board
// stand-in for real project photography. See docs/ASSET_INVENTORY.md.
const HERO_IMAGE = "https://images.unsplash.com/photo-1757924461488-ef9ad0670978";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex h-svh min-h-[640px] w-full items-end overflow-hidden bg-near-black">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: prefersReducedMotion ? 1 : 1.05 }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <Image
          src={`${HERO_IMAGE}?q=80&w=2400&auto=format&fit=crop`}
          alt="Design-reference photography of a warm, marble-and-walnut living room built around a media wall"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic scrim: bottom-heavy for the copy block, a light top wash for the header */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 pb-24 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-bronze-light uppercase">
            Calgary Renovation &amp; Basement Development
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.05] font-medium tracking-tight text-warm-white text-balance sm:text-6xl lg:text-7xl">
            Exceptional spaces. Built around your life.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm-white/80 text-pretty">
            NorthPeak Developments plans and builds legal suite basements, custom basements, and
            whole-home renovations across Calgary and area — with the craftsmanship, communication,
            and follow-through that quality construction requires.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="primary">
              Book a Renovation Consultation
            </Button>
            <Button href="/services" variant="secondary">
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-warm-white/70"
        animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.625rem] font-semibold tracking-[0.3em] uppercase">
          Scroll to Explore
        </span>
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden />
      </motion.div>
    </section>
  );
}
