import { ServiceHero } from "@/components/services/ServiceHero";
import { StickyScrollEditorial, type EditorialPanel } from "@/components/services/StickyScrollEditorial";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import type { Service } from "@/content/services";

// Design-reference photography (Unsplash, free tier, verified) standing in
// for real project photography — see docs/ASSET_INVENTORY.md.
const HERO_IMAGE = "https://images.unsplash.com/photo-1704383014646-2123f9dc8137";

const panels: EditorialPanel[] = [
  {
    id: "kitchen-bath",
    eyebrow: "Section A",
    title: "The Kitchen & Bath",
    body: "The two rooms homeowners renovate most, planned together — layout, cabinetry, and countertops, with plumbing and electrical coordinated around the design rather than constraining it.",
    points: [
      "Layout, cabinetry, and countertop planning",
      "Plumbing and electrical coordinated around the design",
      "Fixture and finish selection that works across both rooms",
    ],
    image: "https://images.unsplash.com/photo-1704383014623-a6630096ff8c",
  },
  {
    id: "layout-structure",
    eyebrow: "Section B",
    title: "Layout & Structure",
    body: "Opening up or reconfiguring a room can transform how a home flows — any change affecting load-bearing structure is reviewed by a qualified professional before it becomes part of the plan.",
    points: [
      "Wall removal and layout reconfiguration, where structurally sound",
      "Professional structural review before work proceeds",
      "Flow and function assessed room to room, not in isolation",
    ],
    image: "https://images.unsplash.com/photo-1721244654394-36a7bc2da288",
  },
  {
    id: "whole-home-finishes",
    eyebrow: "Section C",
    title: "Whole-Home Finishes",
    body: "Flooring, millwork, feature walls, and lighting specified as one coordinated palette — so a renovated kitchen doesn't feel disconnected from the hallway beside it.",
    points: [
      "Flooring transitions, trim, and millwork across connected spaces",
      "Feature walls and updated lighting plans",
      "A single material and finish palette carried through the home",
    ],
    image: "https://images.unsplash.com/photo-1761971975684-9b900192df96",
  },
];

export function HomeRenovationExperience({ service }: { service: Service }) {
  return (
    <>
      <ServiceHero
        eyebrow="Home Renovation"
        headline={service.heroHeadline}
        subhead={service.heroSubhead}
        imageUrl={HERO_IMAGE}
        imageAlt="Design-reference photography of a renovated home's staircase opening onto a bright entry"
        scaleTo={1.05}
        durationSeconds={15}
      />
      <StickyScrollEditorial panels={panels} />
      <ProcessTimeline steps={service.process} />
    </>
  );
}
