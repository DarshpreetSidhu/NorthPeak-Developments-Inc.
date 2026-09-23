import { ServiceHero } from "@/components/services/ServiceHero";
import { StickyScrollEditorial, type EditorialPanel } from "@/components/services/StickyScrollEditorial";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import type { Service } from "@/content/services";

// Design-reference photography (Unsplash, free tier, verified) standing in
// for real project photography — see docs/ASSET_INVENTORY.md.
const HERO_IMAGE = "https://images.unsplash.com/photo-1778731660332-aa1b5be7a4a3";

const panels: EditorialPanel[] = [
  {
    id: "media-room",
    eyebrow: "Section A",
    title: "The Media Room",
    body: "Acoustic planning, hidden AV, and layered lighting turn a lower-level room into a real home theatre — not a TV bolted to a wall.",
    points: ["Acoustic planning for sound-dampened walls and floors", "Concealed AV wiring and equipment racks", "Layered ambient, task, and accent lighting"],
    image: "https://images.unsplash.com/photo-1634045924031-98026a4557c4",
  },
  {
    id: "wet-bar",
    eyebrow: "Section B",
    title: "The Wet Bar",
    body: "Fluted paneling, integrated refrigeration, and a stone-inspired island surface, planned into the layout from day one — not added as an afterthought.",
    points: ["Fluted-panel or wood-slat bar niche", "Integrated refrigeration and plumbing", "Stone-inspired counter and island surfaces"],
    image: "https://images.unsplash.com/photo-1780913363809-c7dafc52d11c",
  },
  {
    id: "guest-suite",
    eyebrow: "Section C",
    title: "The Guest Suite",
    body: "Sound isolation, a dedicated ensuite, and soft modern finishes make a lower-level guest suite feel like its own private wing.",
    points: ["Sound isolation from the rest of the level", "Dedicated ensuite bathroom", "Soft modern finishes and natural light where possible"],
    image: "https://images.unsplash.com/photo-1765547090903-348b711f0eee",
  },
];

const supplementalCapabilities = [
  "Home offices & fitness spaces",
  "Custom storage & cabinetry",
  "Acoustic comfort",
  "Layered lighting & finish selection",
];

function SupplementalCapabilities() {
  return (
    <section className="border-y border-line-dark bg-graphite py-10">
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-center justify-center gap-x-3 gap-y-3 px-6 text-center sm:px-8 lg:px-12">
        <span className="text-xs font-semibold tracking-[0.2em] text-stone/60 uppercase">Also part of every custom basement</span>
        {supplementalCapabilities.map((item) => (
          <span key={item} className="border border-warm-white/15 px-3 py-1.5 text-xs text-stone">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export function CustomBasementExperience({ service }: { service: Service }) {
  return (
    <>
      <ServiceHero
        eyebrow="Custom Basement"
        headline="Custom Basements. Engineered for Living."
        subhead="Media room, wet bar, guest suite, or all three — planned as one coherent lower level, not a collection of disconnected rooms."
        imageUrl={HERO_IMAGE}
        imageAlt="Design-reference photography of a custom basement wet bar and lounge"
        scaleTo={1.1}
        durationSeconds={15}
      />
      <StickyScrollEditorial panels={panels} />
      <SupplementalCapabilities />
      <ProcessTimeline steps={service.process} />
    </>
  );
}
