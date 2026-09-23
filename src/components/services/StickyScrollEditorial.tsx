"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/motion";

export type EditorialPanel = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  image: string;
};

function PanelText({ index, panel, onActive }: { index: number; panel: EditorialPanel; onActive: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-screen flex-col justify-center py-16">
      <motion.div style={{ opacity, y }} className="max-w-md">
        <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-bronze-light uppercase">{panel.eyebrow}</p>
        <h3 className="font-display text-4xl leading-[1.1] font-medium tracking-tight text-warm-white text-balance sm:text-5xl">
          {panel.title}
        </h3>
        <p className="mt-6 text-base leading-relaxed text-stone">{panel.body}</p>
        <ul className="mt-8 space-y-3 border-t border-warm-white/10 pt-6">
          {panel.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-stone">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-bronze-light" />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/**
 * The shared 50/50 sticky-scroll editorial: a pinned, crossfading image on
 * one side and scroll-linked fading typography on the other. Collapses to a
 * stacked, non-pinned flow below `lg`.
 */
export function StickyScrollEditorial({ panels }: { panels: EditorialPanel[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-near-black">
      {/* Desktop: 50/50 sticky crossfade */}
      <div className="hidden lg:grid lg:grid-cols-2">
        <div className="px-12 xl:px-16">
          {panels.map((panel, index) => (
            <PanelText key={panel.id} index={index} panel={panel} onActive={setActiveIndex} />
          ))}
        </div>
        <div className="sticky top-0 h-screen overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={panels[activeIndex].id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: EASE_CINEMATIC }}
              className="absolute inset-0"
            >
              <Image
                src={`${panels[activeIndex].image}?q=80&w=1600&auto=format&fit=crop`}
                alt={`${panels[activeIndex].title} — design reference`}
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-near-black/10 via-transparent to-near-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile / tablet: stacked editorial flow, no pinning */}
      <div className="flex flex-col lg:hidden">
        {panels.map((panel) => (
          <div key={panel.id} className="border-t border-line-dark first:border-t-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={`${panel.image}?q=80&w=1200&auto=format&fit=crop`}
                alt={`${panel.title} — design reference`}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
              className="px-6 py-12 sm:px-8"
            >
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-bronze-light uppercase">{panel.eyebrow}</p>
              <h3 className="font-display text-3xl font-medium tracking-tight text-warm-white sm:text-4xl">{panel.title}</h3>
              <p className="mt-5 text-base leading-relaxed text-stone">{panel.body}</p>
              <ul className="mt-6 space-y-3 border-t border-line-dark pt-5">
                {panel.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-stone">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-bronze-light" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
