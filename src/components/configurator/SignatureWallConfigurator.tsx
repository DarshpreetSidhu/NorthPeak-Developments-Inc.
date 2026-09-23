"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EASE_CINEMATIC } from "@/lib/motion";

type MaterialOption = {
  id: string;
  name: string;
  desc?: string;
  /**
   * Any valid CSS `background` value — solid color, linear-gradient,
   * conic-gradient, or repeating-linear-gradient. Material depth (brushed
   * metal's anisotropic reflection, fluted wood's grain) is CSS-simulated
   * rather than a photographic texture — no licensed texture assets exist
   * in this project (see docs/ASSET_INVENTORY.md).
   *
   * Applied via a plain `style` on a plain (non-motion) element, never
   * Framer Motion's `animate`/`initial` props: mixing a gradient string
   * into `animate` alongside a solid-color target caused Framer Motion to
   * silently stop applying updates altogether, and separately, an
   * `initial`/`animate` mount triggered by a click handler's state update
   * (rather than the page's own first render) got stuck permanently
   * invisible at its `initial` value — both confirmed by testing across
   * several approaches, in dev and an actual production build, not
   * hypotheticals. Material swaps are therefore an instant style change,
   * not a cross-fade.
   */
  background: string;
  /** Lighting options only — translucent color for the ambient box-shadow. */
  glow?: string;
};

type MaterialCategory = "backdrops" | "panels" | "cabinets" | "metals" | "lighting";

const CATEGORY_LABELS: Record<MaterialCategory, string> = {
  backdrops: "Backdrops",
  panels: "Panels",
  cabinets: "Cabinets",
  metals: "Metals",
  lighting: "Lighting",
};

// Values reuse the same approximate tones already established in
// content/finishes.ts wherever a material matches one of the three existing
// finish concepts (including the "brushed bronze" naming, not "brass"), so
// this configurator never drifts into its own separate palette.
const MATERIALS: Record<MaterialCategory, MaterialOption[]> = {
  backdrops: [
    {
      id: "calacatta-marble",
      name: "Calacatta Marble",
      desc: "Crisp white with sharp gray veining",
      background: "linear-gradient(135deg, #FDFDFD 0%, #F4F4F4 45%, #DCDCDC 50%, #F4F4F4 55%, #FAFAFA 100%)",
    },
    {
      id: "calacatta-gold",
      name: "Calacatta Gold Marble",
      desc: "Warm white with striking golden veining",
      background:
        "linear-gradient(110deg, #FDFCFB 0%, #F4F1EB 38%, #D4AF37 40%, #C5A028 41%, #F4F1EB 44%, #FDFCFB 100%)",
    },
    {
      id: "azure-onyx",
      name: "Azure Ribbon Onyx",
      desc: "White stone with deep blue and gold fissures",
      background:
        "linear-gradient(130deg, #FDFBF7 0%, #FDFBF7 25%, #C5A028 27%, #0C4A6E 33%, #075985 40%, #D4AF37 44%, #FDFBF7 46%, #FDFBF7 100%)",
    },
    {
      id: "midnight-gold-quartzite",
      name: "Midnight Gold Quartzite",
      desc: "Dark charcoal with striking gold veins",
      background: "linear-gradient(115deg, #27272A 0%, #18181B 45%, #B45309 49%, #FBBF24 51%, #18181B 54%, #27272A 100%)",
    },
    {
      id: "storm-grey-swirl",
      name: "Storm Grey Swirl",
      desc: "Dynamic grey ribboning with gold accents",
      background:
        "linear-gradient(140deg, #F8F9FA 0%, #CBD5E1 20%, #D4AF37 23%, #475569 28%, #334155 35%, #CBD5E1 45%, #F8F9FA 100%)",
    },
    {
      id: "graphite-stone",
      name: "Graphite Stone",
      desc: "Ribbed dark stone surface",
      background: "linear-gradient(135deg, #2C2D30 0%, #17191B 100%)",
    },
    { id: "warm-white-paint", name: "Warm White Paint", background: "#F4F0E9" },
    {
      id: "deep-navy-paint",
      name: "Deep Navy Paint",
      background: "linear-gradient(160deg, #2B3441 0%, #1C2431 100%)",
    },
  ],
  panels: [
    {
      id: "fluted-walnut",
      name: "Fluted Walnut",
      desc: "Deep architectural texture, acoustic reveal",
      background: "repeating-linear-gradient(90deg, #4A3728 0px, #4A3728 12px, #111111 12px, #111111 18px)",
    },
    {
      id: "rift-oak",
      name: "Rift-Cut White Oak",
      desc: "Vertical slat reveal, acoustic gap",
      background: "repeating-linear-gradient(90deg, #8A6A47 0px, #8A6A47 12px, #111111 12px, #111111 18px)",
    },
    {
      id: "whitewashed-oak",
      name: "Whitewashed Oak",
      desc: "Narrow modern reveal",
      background: "repeating-linear-gradient(90deg, #D9CFBE 0px, #D9CFBE 12px, #1A1A1A 12px, #1A1A1A 15px)",
    },
    {
      id: "rustic-oak-fluted",
      name: "Rustic Oak, Fluted",
      desc: "Warm, tightly fluted texture",
      background: "repeating-linear-gradient(90deg, #8B5A2B 0px, #8B5A2B 8px, #6B4226 8px, #6B4226 12px)",
    },
  ],
  cabinets: [
    {
      id: "matte-graphite",
      name: "Matte Graphite Lacquer",
      background: "linear-gradient(180deg, #2A2C2E 0%, #17191B 100%)",
    },
    { id: "walnut-veneer", name: "Walnut Veneer", background: "linear-gradient(180deg, #4A3B2D 0%, #2B1F16 100%)" },
    {
      id: "warm-white-satin",
      name: "Warm White Satin",
      background: "linear-gradient(180deg, #F4F0E9 0%, #E0DDD4 100%)",
    },
  ],
  metals: [
    {
      id: "brushed-bronze",
      name: "Brushed Bronze",
      background:
        "conic-gradient(from 180deg at 50% 50%, #8A6A47 0%, #C9A07A 25%, #8A6A47 50%, #5C4830 75%, #8A6A47 100%)",
    },
    {
      id: "satin-nickel",
      name: "Satin Nickel",
      background:
        "conic-gradient(from 180deg at 50% 50%, #8B8F94 0%, #B8BCC0 25%, #8B8F94 50%, #535659 75%, #8B8F94 100%)",
    },
    { id: "matte-black", name: "Matte Black", background: "linear-gradient(135deg, #222222 0%, #000000 100%)" },
  ],
  lighting: [
    { id: "2700k", name: "2700K Warm White", background: "#FFB877", glow: "rgba(255, 167, 87, 0.45)" },
    { id: "3000k", name: "3000K Neutral", background: "#FFD6AA", glow: "rgba(255, 214, 170, 0.4)" },
    { id: "4000k", name: "4000K Crisp White", background: "#FFFFFF", glow: "rgba(255, 255, 255, 0.25)" },
  ],
};

type ConfigState = {
  backdrop: MaterialOption;
  panel: MaterialOption;
  cabinet: MaterialOption;
  metal: MaterialOption;
  lighting: MaterialOption;
};

// Explicit mapping instead of guessing a singular from the tab name (e.g. a
// naive `activeTab.slice(0, -1)` turns "lighting" into "lightin", which
// would silently write to a nonexistent config key instead of updating the
// actual selection — a real bug caught in an earlier version of this file).
const CATEGORY_TO_CONFIG_KEY: Record<MaterialCategory, keyof ConfigState> = {
  backdrops: "backdrop",
  panels: "panel",
  cabinets: "cabinet",
  metals: "metal",
  lighting: "lighting",
};

// Fade-in transitions below are written as inline `motion.div key={...}`
// elements rather than a shared helper component — extracting the identical
// JSX into its own function (even with "use no memo" on that function too)
// left the fade-in stuck at opacity: 0 in this project's React
// Compiler/framer-motion combination, confirmed by testing. Inlining
// matches the tabpanel crossfade lower in this file, which does work.

export function SignatureWallConfigurator() {
  "use no memo";
  const [activeTab, setActiveTab] = useState<MaterialCategory>("backdrops");
  const [config, setConfig] = useState<ConfigState>({
    backdrop: MATERIALS.backdrops[0],
    panel: MATERIALS.panels[0],
    cabinet: MATERIALS.cabinets[0],
    metal: MATERIALS.metals[0],
    lighting: MATERIALS.lighting[0],
  });

  const activeConfigKey = CATEGORY_TO_CONFIG_KEY[activeTab];

  return (
    <section className="bg-graphite py-24 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Signature Feature"
          title="Architect your entertainment space."
          description="Backdrop, panelling, cabinetry, metal finish, and lighting temperature — mix and match to design the bespoke wall that anchors your room."
        />
      </Container>

      <Container className="mt-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Live visualizer */}
          <div className="lg:col-span-7">
            <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border border-line-dark bg-near-black p-8 shadow-2xl ring-1 ring-warm-white/10 sm:aspect-[16/10] lg:aspect-auto lg:h-[560px]">
              {/*
                Plain (non-motion) divs below, not Framer Motion `animate`/
                `initial`: this project's installed framer-motion@13.4.0 +
                React 19 combination was confirmed — by testing, across
                several different approaches, in both dev and an actual
                production build — to leave `initial`→`animate` transitions
                permanently stuck at their `initial` value (fully invisible,
                not just unanimated) whenever the mount is triggered by a
                click-handler state update rather than the page's own first
                render. A plain style swap has no such failure mode; the
                trade-off is an instant swap instead of a cross-fade.
              */}
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center"
                style={{ background: config.backdrop.background }}
              />

              {/* Ambient lighting glow — safe to animate: this is a single
                  stable element whose `animate` target just gets re-pointed
                  on re-render, never a click-triggered mount. */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                animate={{ boxShadow: `inset 0 0 180px ${config.lighting.glow}` }}
                transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
              />

              <div className="relative z-10 w-full max-w-md drop-shadow-2xl">
                <div className="relative h-56 overflow-hidden border border-black/20 shadow-[0_30px_60px_rgba(0,0,0,0.55)] sm:h-64">
                  <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ background: config.panel.background }} />

                  <div className="absolute top-1/2 left-1/2 z-10 h-28 w-48 -translate-x-1/2 -translate-y-1/2 border-b border-warm-white/10 bg-near-black shadow-xl">
                    <div className="h-full w-full bg-gradient-to-tr from-transparent via-warm-white/5 to-transparent opacity-40" />
                  </div>
                </div>

                <div className="relative mx-auto flex h-16 w-11/12 items-center justify-around px-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                  <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ background: config.cabinet.background }} />
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="relative z-10 h-1 w-8 overflow-hidden rounded-full shadow-md">
                      <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ background: config.metal.background }} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-stone/60">
              Illustrative composition, not a photograph of a completed NorthPeak project —
              materials are CSS-simulated approximations, not manufacturer color matches or
              photographic textures.
            </p>
          </div>

          {/* Selector */}
          <div className="lg:col-span-5">
            <div role="tablist" aria-label="Entertainment wall materials" className="flex flex-wrap gap-1 border-b border-warm-white/15">
              {(Object.keys(CATEGORY_LABELS) as MaterialCategory[]).map((category) => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={activeTab === category}
                  onClick={() => setActiveTab(category)}
                  className={`min-h-11 border-b-2 px-3 pb-4 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase transition-colors ${
                    activeTab === category
                      ? "border-bronze-light text-warm-white"
                      : "border-transparent text-stone/60 hover:text-stone"
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              ))}
            </div>

            {/* Plain div, not motion — see the note above the visualizer's
                material fills for why a click-triggered mount's
                initial→animate transition is unreliable here. */}
            <div className="mt-8 space-y-3">
              {MATERIALS[activeTab].map((item) => {
                const isSelected = config[activeConfigKey].id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setConfig((prev) => ({ ...prev, [activeConfigKey]: item }))}
                    className={`flex w-full items-center gap-4 border p-4 text-left backdrop-blur-md transition-colors ${
                      isSelected
                        ? "border-bronze/50 bg-bronze/10 shadow-[0_0_24px_rgba(167,121,81,0.15)]"
                        : "border-warm-white/10 bg-warm-white/5 hover:border-warm-white/25 hover:bg-warm-white/10"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-10 w-10 shrink-0 border border-warm-white/20 bg-cover bg-center"
                      style={{ background: item.background }}
                    />
                    <span>
                      <span className="block font-display text-base text-warm-white">{item.name}</span>
                      {item.desc ? <span className="mt-0.5 block text-xs text-stone/70">{item.desc}</span> : null}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-8 text-xs leading-relaxed text-stone/60">
              Swatches shown are CSS-simulated approximations, not manufacturer color matches or
              photographic textures. Always test physical samples in your room&apos;s actual
              lighting before committing to a finish.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
