import { ServiceHero } from "@/components/services/ServiceHero";
import { StickyScrollEditorial, type EditorialPanel } from "@/components/services/StickyScrollEditorial";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import type { Service } from "@/content/services";

// Design-reference photography (Unsplash, free tier, verified) standing in
// for real project photography — see docs/ASSET_INVENTORY.md.
const HERO_IMAGE = "https://images.unsplash.com/photo-1682184805271-11671b7ecf4c";

const panels: EditorialPanel[] = [
  {
    id: "structural-feasibility",
    eyebrow: "Section A",
    title: "Structural Feasibility",
    body: "Not every basement can become a legal suite — ceiling height, existing window openings, and lot layout decide what's actually possible before any design work begins.",
    points: [
      "Ceiling height and structural layout assessment",
      "Egress window evaluation, including enlarging openings where needed",
      "Separate or shared entry planning based on your lot",
    ],
    image: "https://images.unsplash.com/photo-1721244654394-36a7bc2da288",
  },
  {
    id: "independent-systems",
    eyebrow: "Section B",
    title: "Independent Systems",
    body: "A secondary suite typically needs its own kitchen, bathroom, and comfort systems — planned with the plumbing, ventilation, and clearances a self-contained unit requires.",
    points: [
      "Dedicated or extended heating and ventilation",
      "Independent kitchen, bathroom, and laundry plumbing",
      "Clearances and mechanical planning specific to suite use",
    ],
    image: "https://images.unsplash.com/photo-1773098587137-1a62971cfedb",
  },
  {
    id: "safety-separation",
    eyebrow: "Section C",
    title: "Safety & Separation",
    body: "Legal suites are held to fire-separation and life-safety expectations distinct from a single-family basement — addressed in the assembly, not applied as an afterthought.",
    points: [
      "Acoustic separation between suite and main home",
      "Fire-rated wall and floor assemblies where required",
      "Permit submission and inspection coordination with your municipality",
    ],
    image: "https://images.unsplash.com/photo-1765766599489-fd53df7f8724",
  },
];

export function LegalSuiteExperience({ service }: { service: Service }) {
  return (
    <>
      <ServiceHero
        eyebrow="Legal Suite Basement"
        headline={service.heroHeadline}
        subhead={service.heroSubhead}
        imageUrl={HERO_IMAGE}
        imageAlt="Design-reference photography of a bright, self-contained basement suite"
        scaleTo={1.05}
        durationSeconds={15}
      />
      <StickyScrollEditorial panels={panels} />
      <ProcessTimeline steps={service.process} />
    </>
  );
}
