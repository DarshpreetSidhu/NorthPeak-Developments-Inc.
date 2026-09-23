"use client";

import { motion } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/motion";
import type { ServiceProcessStep } from "@/content/services";

/** Sleek vertical timeline with glowing, amber-toned nodes that light up on scroll. */
export function ProcessTimeline({ steps }: { steps: ServiceProcessStep[] }) {
  return (
    <section className="bg-near-black py-24 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 lg:px-12">
        <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-bronze-light uppercase">Process</p>
        <h2 className="font-display text-4xl leading-[1.1] font-medium tracking-tight text-warm-white text-balance sm:text-5xl">
          How this project comes together.
        </h2>

        <div className="mt-16">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
                className="relative flex gap-8"
              >
                <div className="flex flex-col items-center">
                  <motion.span
                    initial={{ scale: 0.5, boxShadow: "0 0 0px 0px rgba(167,121,81,0)" }}
                    whileInView={{ scale: 1, boxShadow: "0 0 22px 4px rgba(167,121,81,0.55)" }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.2 }}
                    className="z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-bronze-light"
                    aria-hidden
                  />
                  {!isLast ? <span className="mt-1 w-px flex-1 bg-warm-white/15" /> : null}
                </div>
                <div className={isLast ? "pb-0" : "pb-16"}>
                  <span className="font-display text-2xl text-bronze-light">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-sans text-xl font-medium tracking-wide text-warm-white">{step.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
