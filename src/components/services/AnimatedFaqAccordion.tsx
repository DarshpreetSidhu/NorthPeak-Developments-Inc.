"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE_CINEMATIC } from "@/lib/motion";

type Faq = { question: string; answer: string };

/** Refined, independently-toggling accordion with AnimatePresence height/opacity reveal. */
export function AnimatedFaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-line-dark">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={faq.question} className="py-5">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-11 w-full items-center justify-between gap-6 text-left font-display text-lg font-medium text-warm-white"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
                  className="shrink-0 text-bronze-light"
                  aria-hidden
                >
                  <Plus size={20} strokeWidth={1.75} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
