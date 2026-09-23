/**
 * Curated finish concepts for the signature entertainment-wall feature.
 *
 * Approximate screen swatches only — NOT manufacturer color-matched values.
 * Real manufacturer paint names/codes are intentionally omitted until
 * verified against current manufacturer catalogs; see the "paintStatus"
 * field. Always test physical samples in the room's actual lighting before
 * committing to a finish.
 */

export type FinishConcept = {
  id: string;
  name: string;
  description: string;
  wallPanel: string;
  cabinetFinish: string;
  metalFinish: string;
  lightingTemperature: string;
  mainWallPaint: { label: string; status: "pending"; swatch: string };
  featureWallPaint: { label: string; status: "pending"; swatch: string };
  trimPaint: { label: string; status: "pending"; swatch: string };
  swatch: {
    panel: string;
    cabinet: string;
    metal: string;
    accent: string;
  };
};

export const finishConcepts: FinishConcept[] = [
  {
    id: "warm-architectural",
    name: "Warm Architectural",
    description:
      "Rift-cut white oak paneling, bronze hardware, and a plaster-textured accent wall for a grounded, tactile living space.",
    wallPanel: "Rift-cut white oak wood-slat panel, vertical reveal",
    cabinetFinish: "Matte walnut veneer, flush pulls",
    metalFinish: "Brushed bronze",
    lightingTemperature: "2700K warm white",
    mainWallPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#EDE7DC" },
    featureWallPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#3A3129" },
    trimPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#DCD3C4" },
    swatch: { panel: "#8A6A47", cabinet: "#4A3B2D", metal: "#A77951", accent: "#EDE7DC" },
  },
  {
    id: "contemporary-graphite",
    name: "Contemporary Graphite",
    description:
      "Fluted graphite panels and blackened steel accents against a large-format stone-look surface for a sharp, cinematic mood.",
    wallPanel: "Fluted MDF panel, graphite matte finish",
    cabinetFinish: "Matte graphite lacquer, integrated channel pull",
    metalFinish: "Blackened steel",
    lightingTemperature: "3000K soft white",
    mainWallPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#C8C0B5" },
    featureWallPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#17191B" },
    trimPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#B8AFA2" },
    swatch: { panel: "#2A2C2E", cabinet: "#1C1E20", metal: "#3F4245", accent: "#C8C0B5" },
  },
  {
    id: "soft-modern",
    name: "Soft Modern",
    description:
      "Whitewashed oak slats, warm white lacquer cabinetry, and satin nickel hardware for a light, calm entertainment space.",
    wallPanel: "Whitewashed oak wood-slat panel, narrow reveal",
    cabinetFinish: "Warm white satin lacquer, shadow-gap pull",
    metalFinish: "Satin nickel",
    lightingTemperature: "2700K warm white",
    mainWallPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#F4F0E9" },
    featureWallPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#D8CFC0" },
    trimPaint: { label: "Manufacturer paint name & code — pending verification", status: "pending", swatch: "#F4F0E9" },
    swatch: { panel: "#D9CFBE", cabinet: "#F4F0E9", metal: "#B8BCC0", accent: "#8A6A47" },
  },
];
