"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { NavLink } from "@/content/nav";

export function MobileNav({ links }: { links: NavLink[] }) {
  // `open` starts false and can only become true from this component's own
  // click handler, which only exists client-side post-hydration — so by the
  // time it's true, `document` is always available. No separate "mounted"
  // state (and its hydration-mismatch risk) is needed to portal safely.
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const panel = (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 flex flex-col bg-near-black"
    >
      <div className="flex items-center justify-between border-b border-line-dark px-6 py-4">
        <span className="font-display text-xl font-medium text-warm-white">Menu</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex h-11 w-11 items-center justify-center text-warm-white"
        >
          <span className="sr-only">Close menu</span>
          <span aria-hidden className="relative block h-6 w-6">
            <span className="absolute top-1/2 left-0 h-px w-6 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute top-1/2 left-0 h-px w-6 -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </button>
      </div>
      <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="border-b border-line-dark py-4 font-display text-2xl text-warm-white"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-bronze px-6 py-4 text-sm font-semibold tracking-wide text-near-black uppercase"
        >
          Book a Consultation
        </Link>
      </nav>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 text-warm-white"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span
          aria-hidden
          className={`h-px w-6 bg-current transition-transform duration-200 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          aria-hidden
          className={`h-px w-6 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
        />
        <span
          aria-hidden
          className={`h-px w-6 bg-current transition-transform duration-200 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
        />
      </button>

      {/*
        Portalled to document.body: the sticky header uses backdrop-blur,
        which (like transform/filter/will-change) creates a new containing
        block for any `position: fixed` descendant. Without the portal, this
        overlay would be trapped inside the header's own box instead of
        covering the viewport.
      */}
      {open ? createPortal(panel, document.body) : null}
    </div>
  );
}
