import type { Variants } from "framer-motion";

/** Shared cinematic easing curve — slow, deliberate, no bounce. */
export const EASE_CINEMATIC = [0.25, 1, 0.5, 1] as const;

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_CINEMATIC } },
};

/** Image wrapper — slow, smooth zoom on hover. */
export const imageScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.12, transition: { duration: 1.2, ease: EASE_CINEMATIC } },
};

/** Moody default wash that dissolves on hover to reveal the full image. */
export const washVariants: Variants = {
  rest: { opacity: 0.32 },
  hover: { opacity: 0.04, transition: { duration: 1.2, ease: EASE_CINEMATIC } },
};

/** Glassmorphism caption panel — inert by default, frosts in on hover. */
export const glassPanelVariants: Variants = {
  rest: { backdropFilter: "blur(0px)", backgroundColor: "rgba(14,16,17,0)" },
  hover: {
    backdropFilter: "blur(20px)",
    backgroundColor: "rgba(14,16,17,0.4)",
    transition: { duration: 0.9, ease: EASE_CINEMATIC },
  },
};

/** Description copy that expands in beneath a caption title on hover. */
export const detailRevealVariants: Variants = {
  rest: { opacity: 0, height: 0, marginTop: 0 },
  hover: {
    opacity: 1,
    height: "auto",
    marginTop: 10,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};

export const arrowRevealVariants: Variants = {
  rest: { opacity: 0, x: -6, rotate: -35 },
  hover: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: EASE_CINEMATIC } },
};
