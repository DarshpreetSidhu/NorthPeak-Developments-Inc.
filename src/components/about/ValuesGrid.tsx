"use client";

import { motion } from "framer-motion";
import { Droplets, HardHat, Layers, Volume2, type LucideIcon } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: HardHat,
    title: "Structural Load Handling",
    description:
      "Framing and load paths are planned before anything is built — not patched around after the drywall goes up.",
  },
  {
    icon: Layers,
    title: "Premium Insulation & Framing",
    description:
      "Wall and ceiling assemblies are built to hold their performance for decades, not just to pass a rough-in inspection.",
  },
  {
    icon: Volume2,
    title: "Acoustic Separation",
    description:
      "Sound isolation between levels and rooms is designed into the framing and insulation strategy, not bolted on afterward.",
  },
  {
    icon: Droplets,
    title: "Moisture & Envelope Control",
    description: "Weatherproofing and vapor management are treated as structural decisions, not finishing touches.",
  },
];

export function ValuesGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {values.map(({ icon: Icon, title, description }) => (
        <motion.div
          key={title}
          variants={fadeUpVariants}
          className="border border-line-dark bg-graphite p-7 sm:p-8"
        >
          <Icon size={28} strokeWidth={1.5} className="text-bronze-light" aria-hidden />
          <h3 className="mt-5 font-display text-lg font-medium text-warm-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-stone">{description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
