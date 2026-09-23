/**
 * Design inspiration gallery.
 *
 * IMPORTANT: These entries illustrate NorthPeak's design language — they are
 * explicitly labeled as inspiration/reference throughout the UI and must
 * never be presented as documentation of completed NorthPeak projects.
 *
 * `layout`/`palette` drove the original bespoke SVG illustration system
 * (`ArchitecturalPlate`). The homepage teaser (`ProjectGallery`) has since
 * moved to real photography like `/projects`, so these two fields are
 * currently unused — kept on the type in case a future illustrated
 * treatment needs them again, rather than deleted in the same pass as an
 * unrelated image swap.
 *
 * `imageUrl` drives the full-photography treatment on `/projects`
 * (`ImmersiveGallery`) and the homepage teaser (`ProjectGallery`). Two
 * sourcing types are mixed here, both used as placeholder "design
 * reference" imagery, never as documentation of completed NorthPeak
 * projects:
 *   - Remote Unsplash URLs (Unsplash License: free for commercial use, no
 *     attribution required).
 *   - Local files under `public/images/` — AI-generated renders the site
 *     owner confirmed they generated themselves and hold commercial rights
 *     to (see docs/ASSET_INVENTORY.md for the per-item note and date).
 * See docs/ASSET_INVENTORY.md for the full source list and replacement plan.
 */

export type GalleryLayout = "entertainment-wall" | "kitchen" | "bath" | "bedroom" | "suite-entry";
export type GalleryPalette = "warm" | "graphite" | "soft";

export type GalleryItem = {
  id: string;
  title: string;
  serviceSlug: "legal-suite-basement" | "custom-basement" | "home-renovation";
  description: string;
  layout: GalleryLayout;
  palette: GalleryPalette;
  imageUrl: string;
  imageAlt: string;
};

/**
 * Appends Unsplash's resize/crop query params only for remote Unsplash
 * URLs. Local files under `public/images/` are returned unchanged —
 * next/image already optimizes local images natively, and Unsplash-specific
 * params on a local path would be dead weight rather than a real directive.
 */
export function galleryImageSrc(imageUrl: string, width: number): string {
  return imageUrl.startsWith("http") ? `${imageUrl}?q=80&w=${width}&auto=format&fit=crop` : imageUrl;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "media-wall-concept",
    title: "Entertainment wall, warm architectural",
    serviceSlug: "custom-basement",
    description:
      "A floating cabinetry and wood-slat panel composition anchoring a media room, with layered accent lighting.",
    layout: "entertainment-wall",
    palette: "warm",
    imageUrl: "/images/warm-architectural.jpg",
    imageAlt:
      "Warm wood-slat entertainment wall with floating glass-front cabinetry and pendant lighting, styled as design reference",
  },
  {
    id: "suite-kitchenette-concept",
    title: "Suite kitchen, soft modern",
    serviceSlug: "legal-suite-basement",
    description:
      "A compact, efficient kitchen layout designed for a self-contained secondary suite.",
    layout: "kitchen",
    palette: "soft",
    imageUrl: "/images/soft-modern.jpg",
    imageAlt:
      "Soft modern kitchen with off-white cabinetry and a marble waterfall island, styled as design reference",
  },
  {
    id: "wet-bar-concept",
    title: "Wet bar, contemporary graphite",
    serviceSlug: "custom-basement",
    description:
      "A fluted-panel bar niche with integrated shelving, designed to sit beside a lower-level lounge.",
    layout: "entertainment-wall",
    palette: "graphite",
    imageUrl: "/images/contemporary-graphite.jpg",
    imageAlt:
      "Contemporary graphite wet bar with illuminated stone shelving and integrated bar sink, styled as design reference",
  },
  {
    id: "kitchen-reno-concept",
    title: "Kitchen renovation, warm architectural",
    serviceSlug: "home-renovation",
    description:
      "An open kitchen renovation concept pairing warm millwork with a stone-inspired island surface.",
    layout: "kitchen",
    palette: "warm",
    imageUrl: "https://images.unsplash.com/photo-1704383014623-a6630096ff8c",
    imageAlt: "Kitchen with marble accent wall and wood floors, styled as renovation design reference",
  },
  {
    id: "guest-suite-concept",
    title: "Guest suite, soft modern",
    serviceSlug: "custom-basement",
    description:
      "A calm guest bedroom and ensuite concept for a lower-level custom basement.",
    layout: "bedroom",
    palette: "soft",
    imageUrl: "https://images.unsplash.com/photo-1765547090903-348b711f0eee",
    imageAlt: "Calm modern bedroom with wooden accents, styled as guest-suite design reference",
  },
  {
    id: "bathroom-reno-concept",
    title: "Bathroom renovation, contemporary graphite",
    serviceSlug: "home-renovation",
    description:
      "A tiled, fixture-forward bathroom renovation concept with a graphite and warm-metal palette.",
    layout: "bath",
    palette: "graphite",
    imageUrl: "https://images.unsplash.com/photo-1661107259637-4e1c55462428",
    imageAlt: "Fixture-forward modern bathroom with large mirror, styled as renovation design reference",
  },
];
