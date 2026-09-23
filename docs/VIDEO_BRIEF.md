# Hero showcase film — storyboard & production brief

**Status: no video asset exists.** This document is the brief for producing
one (by shoot or by AI generation) — it is not a description of a video that
has been made. The site currently ships with an honest static poster
(`ArchitecturalPlate`) and a visible "Showcase film in production" label
instead of a broken or faked video.

## Spec

- **Length:** ~11 seconds (10–12s acceptable), muted, seamless loop
- **Aspect ratio:** must work cropped to 16:10 (mobile), 16:9 (tablet), and
  21:9 (desktop) — shoot/frame with generous headroom so all three crops stay
  well-composed. See `ShowcaseVideo`'s wrapper classes for the exact ratios.
- **Formats needed:** `.webm` (primary) and `.mp4` (fallback), plus a static
  JPEG/PNG poster frame at the same crop
- **Grading:** warm, restrained — near-black shadows, warm-white highlights,
  bronze accents in practical lighting fixtures. No teal-and-orange, no heavy
  vignette.
- **Audio:** none required (the player is muted by default); if a soundtrack
  is added later, it must default to muted with a visible unmute control.

## Storyboard

| Time | Shot | Notes |
| --- | --- | --- |
| 0:00–0:03 | Slow entrance reveal into the finished basement | Camera pushes in slowly from the doorway/stairs; let the space reveal itself, no whip pans |
| 0:03–0:06 | Controlled move toward the entertainment wall | Reveal panel texture (wood-slat or fluted panel), floating cabinetry, and the hanging pendant lights beside it |
| 0:06–0:09 | Detail inserts | Close-ups on craftsmanship: panel joinery, cabinet hardware, a lit shelf niche, fabric texture on seating |
| 0:09–0:11 | Wide composition | Pull back to a full, static-ish wide shot of the complete room — this is the frame the poster image should be pulled from |

## Production notes

- Use realistic camera movement (slider/gimbal, not handheld shake) and
  physically plausible materials and lighting — no CGI-looking surfaces.
- If a linear fireplace is included in the set, show it with a visible,
  proportionate clearance from the TV/mantel consistent with a real
  manufacturer's install spec (do not fabricate a specific clearance number
  in marketing copy — that lives in the manufacturer's installation manual).
- Keep all essential messaging (headline, CTAs, service area) as real HTML
  text layered outside the video, per the homepage hero — never burn text
  into the footage. This keeps it readable, indexable, and independent of
  whether the video loads.

## Integration checklist (once a file exists)

1. Add `hero-showcase.webm`, `hero-showcase.mp4`, an optional
   `hero-showcase.vtt` captions track, and `hero-showcase-poster.jpg` to
   `/public/video/`.
2. In `src/content/video.ts`, set `enabled: true`.
3. `ShowcaseVideo` (`src/components/video/ShowcaseVideo.tsx`) already handles
   the rest: muted/inline/loop playback, a visible play/pause control,
   `prefers-reduced-motion` and `navigator.connection.saveData` checks before
   attempting autoplay, a fixed-aspect-ratio wrapper (no layout shift), and
   `preload="none"` so the file isn't fetched until the browser actually
   renders the `<video>` element.
4. Re-run Lighthouse on the homepage after adding the real file — video
   weight directly affects LCP if not encoded efficiently (target well under
   2–3MB for an 11-second clip at delivery resolution).
