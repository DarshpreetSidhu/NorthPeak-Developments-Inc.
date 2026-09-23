"use client";

import { useEffect, useRef, useState } from "react";
import { heroVideoConfig } from "@/content/video";
import { ArchitecturalPlate } from "@/components/shared/ArchitecturalPlate";

type ConnectionLike = { saveData?: boolean; effectiveType?: string };

export function ShowcaseVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!heroVideoConfig.enabled) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: ConnectionLike }).connection;
    const isDataSaver = Boolean(connection?.saveData) || connection?.effectiveType === "2g";

    if (!prefersReducedMotion && !isDataSaver && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was blocked (or the user prefers reduced motion) — the
        // video stays paused on its poster frame until the visitor presses play.
      });
    }
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  if (!heroVideoConfig.enabled) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[21/9]">
        <ArchitecturalPlate
          layout="entertainment-wall"
          palette="warm"
          className="h-full w-full"
          title={heroVideoConfig.posterAlt}
        />
        <p className="absolute top-4 left-4 bg-near-black/70 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.1em] text-stone uppercase backdrop-blur sm:top-6 sm:left-6">
          Showcase film in production — design concept shown
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-near-black sm:aspect-[16/9] lg:aspect-[21/9]">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster="/video/hero-showcase-poster.jpg"
        className="h-full w-full object-cover"
        aria-label={heroVideoConfig.posterAlt}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={heroVideoConfig.webmSrc} type="video/webm" />
        <source src={heroVideoConfig.mp4Src} type="video/mp4" />
        <track kind="captions" src={heroVideoConfig.captionsSrc} srcLang="en" label="English" />
      </video>

      <button
        type="button"
        onClick={togglePlayback}
        aria-pressed={isPlaying}
        className="absolute right-4 bottom-4 flex h-12 w-12 items-center justify-center border border-warm-white/40 bg-near-black/60 text-warm-white backdrop-blur transition-colors hover:border-bronze-light sm:right-6 sm:bottom-6"
      >
        <span className="sr-only">{isPlaying ? "Pause showcase film" : "Play showcase film"}</span>
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
