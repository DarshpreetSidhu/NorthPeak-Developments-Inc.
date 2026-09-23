# Asset inventory

The site currently mixes two image treatments as its art direction evolved
page by page. Both are placeholders for real NorthPeak project photography —
neither should ship at launch without the owner's sign-off.

## A. Licensed Unsplash photography (cinematic pages)

The homepage (`/`), all three service pages (`/services/custom-basement`,
`/services/legal-suite-basement`, `/services/home-renovation`), and
`/projects` use real
photography — sourced from Unsplash, verified as free-tier
(`images.unsplash.com`, never `plus.unsplash.com`/Unsplash+) and confirmed
loading (HTTP 200) at delivery time. The Unsplash License permits free
commercial use without attribution. Each of these pages' copy still tells
visitors this is **design reference, not photographs of completed NorthPeak
projects** — same honesty standard as the rest of the site, just delivered as
photography instead of illustration on these specific pages.

| Photo ID | Subject | Used in |
| --- | --- | --- |
| `1757924461488-ef9ad0670978` | Marble/walnut living room with media wall | Homepage hero (`components/home/Hero.tsx`) |
| `1773098587137-1a62971cfedb` | Compact modern kitchen | Homepage services grid — Legal Suite Basement (`components/home/ServicesIntro.tsx`); `/services/legal-suite-basement` sticky editorial (Independent Systems) |
| `1780913363809-c7dafc52d11c` | Moody bar, illuminated shelving | Homepage services grid — Custom Basement; `/services/custom-basement` sticky editorial (Wet Bar) |
| `1704383014623-a6630096ff8c` | Kitchen, marble accent wall | Homepage services grid — Home Renovation; `/projects`; `/services/home-renovation` sticky editorial (The Kitchen & Bath) |
| `1750994700200-3fc4682c5168` | Media room, projector | No longer referenced — replaced in `content/gallery.ts` by a local render, see section B below |
| `1634045924031-98026a4557c4` | Graphite media wall, floating cabinetry | `/services/custom-basement` sticky editorial (Media Room) |
| `1765547090903-348b711f0eee` | Bedroom with wood accents | `/projects`; `/services/custom-basement` sticky editorial (Guest Suite) |
| `1661107259637-4e1c55462428` | Bathroom, large mirror | `/projects` |
| `1778731660332-aa1b5be7a4a3` | Basement wet bar / lounge | `/services/custom-basement` hero |
| `1682184805271-11671b7ecf4c` | Bright open living/kitchen, floor-to-ceiling windows | `/services/legal-suite-basement` hero |
| `1721244654394-36a7bc2da288` | Architectural cross-section blueprint | `/services/legal-suite-basement` sticky editorial (Structural Feasibility); `/services/home-renovation` sticky editorial (Layout & Structure) |
| `1765766599489-fd53df7f8724` | Moody hallway, structural lighting, closed door | `/services/legal-suite-basement` sticky editorial (Safety & Separation) |
| `1704383014646-2123f9dc8137` | Staircase opening onto a chandeliered entry | `/services/home-renovation` hero |
| `1761971975684-9b900192df96` | Curved custom millwork wall, warm accent lighting | `/services/home-renovation` sticky editorial (Whole-Home Finishes) |

URLs are defined inline near each component (search each file above for
`images.unsplash.com`) or in `src/content/gallery.ts` (`imageUrl` field for
`/projects`), and are hot-linked directly to Unsplash's CDN, optimized on the
fly by `next/image` (remote pattern allow-listed in `next.config.ts`).
**Before launch, download and self-host these** (or replace them with real
project photography / Midjourney renders) rather than depending on a third
party's CDN indefinitely — hot-linking is fine for review, not for a
production launch.

## B. Original SVG illustration (remaining pages)

`/services` (index) and `/about` still use
`src/components/shared/ArchitecturalPlate.tsx` — an original,
parameterized inline-SVG illustration (gradient + radial glow + a simple
line-art scene), fully owned with no licensing restriction. Every place it
appears in a gallery-like context is labeled **"Design concept"**, and the
surrounding copy states these are conceptual illustrations, not
documentation of completed projects.

**When real photography is available for these pages:** replace the relevant
`<ArchitecturalPlate .../>` usage with `next/image`, sized to match the
existing aspect-ratio wrapper. Get the homeowner's written permission before
publishing photos of their home, and keep a record of it.

**Service page architecture — now unified.** All three service detail pages
(`/services/custom-basement`, `/services/legal-suite-basement`,
`/services/home-renovation`) run on the same cinematic
photography + sticky-scroll architecture: shared components in
`src/components/services/ServiceHero.tsx`, `StickyScrollEditorial.tsx`,
`ProcessTimeline.tsx`, and `AnimatedFaqAccordion.tsx`, each fed by a small
per-service `*Experience.tsx` file that supplies content and image URLs. The
old generic `ServiceDetailTemplate.tsx` (illustration-based) has been deleted
— it was fully superseded once the third page migrated off it. The `/services`
index page and `/about` still use the illustration system described above;
migrating them to photography, if wanted, is a separate decision.

## C. Local AI-generated renders

Three of the six `/projects` gallery concepts (`content/gallery.ts`) and the
matching homepage teaser cards now use local files under `public/images/`
instead of Unsplash, generated and provided by the site owner. **Not stock
photography** — no licensing fee or attribution applies, per the owner's
confirmation that these were generated under their own account. As with every
other placeholder image on this site, they're labeled "Design concept" and the
surrounding copy states they are not documentation of completed NorthPeak
work.

| File | Concept | Used in |
| --- | --- | --- |
| `public/images/warm-architectural.jpg` | Entertainment wall, warm architectural | `/projects` (`media-wall-concept`); homepage teaser (`ProjectGallery`) |
| `public/images/soft-modern.jpg` | Suite kitchen, soft modern | `/projects` (`suite-kitchenette-concept`); homepage teaser |
| `public/images/contemporary-graphite.jpg` | Wet bar, contemporary graphite | `/projects` (`wet-bar-concept`); homepage teaser |

These were cropped from a single owner-provided composite image (three
vertical panels) — see `content/gallery.ts`'s `galleryImageSrc()` helper,
which skips the Unsplash resize query params for local paths like these.

## Generated (not stock) image assets

| Asset | How it's generated | Notes |
| --- | --- | --- |
| Favicon (`src/app/icon.tsx`) | `next/og` `ImageResponse`, a bronze "N" monogram on near-black | Placeholder wordmark — replace with a real logo mark if/when one is designed |
| Open Graph card (`src/app/opengraph-image.tsx`) | `next/og` `ImageResponse`, typographic brand card (name, tagline, service list) | No photography dependency; safe to ship as-is |

## Fonts

| Font | Source | License | Loading |
| --- | --- | --- | --- |
| Fraunces (display) | Google Fonts, via `next/font/google` | SIL Open Font License | Self-hosted automatically by Next.js — no runtime request to Google |
| Inter (body) | Google Fonts, via `next/font/google` | SIL Open Font License | Same |

## Video — built, but not currently linked from any page

`src/components/video/ShowcaseVideo.tsx` (poster fallback, play/pause
control, `prefers-reduced-motion`/data-saver handling) and its config
(`src/content/video.ts`) are fully built per `docs/VIDEO_BRIEF.md`, but no
page currently renders `<ShowcaseVideo />` — the homepage hero was rebuilt
around a static image with a Framer Motion zoom instead. The component is
untouched and still works; wire it back in (or delete it) as a deliberate
choice, not by accident.

## Icons

Most glyphs on the non-cinematic pages (hamburger, close, plus/minus) are
hand-drawn inline SVG in their respective components — no icon library. The
cinematic pages (homepage, `/projects`, all three service pages) use
`lucide-react` (`ArrowUpRight`, `ChevronDown`, `Plus` in
`AnimatedFaqAccordion`) — an MIT-licensed icon set, tree-shaken so
only imported icons ship.

## Animation

The cinematic pages use `framer-motion` for scroll reveals, hover states, the
hero's slow zoom, each service page's sticky-scroll crossfade
(`StickyScrollEditorial.tsx`, using `useScroll`/`useTransform` per panel), and
the process timeline's scroll-triggered reveal (`ProcessTimeline.tsx`).
Shared variants live in `src/lib/motion.ts`. All continuous/looping
animations (hero zoom, scroll indicator) respect `prefers-reduced-motion` via
`useReducedMotion()`.
