/**
 * Hero showcase film configuration.
 *
 * No video asset exists yet — see docs/VIDEO_BRIEF.md for the full
 * storyboard and generation/shoot brief. Flip `enabled` to true and add the
 * referenced files under /public/video/ once real footage (or a generated
 * cut matching the brief) is ready. Until then, ShowcaseVideo renders an
 * intentional poster illustration with no video element and no network
 * request — never a broken video icon.
 */
export const heroVideoConfig = {
  enabled: false,
  mp4Src: "/video/hero-showcase.mp4",
  webmSrc: "/video/hero-showcase.webm",
  captionsSrc: "/video/hero-showcase.vtt",
  durationSeconds: 11,
  posterAlt:
    "Design concept illustration of a finished basement entertainment wall — floating cabinetry, wood-slat paneling, and layered accent lighting.",
};
