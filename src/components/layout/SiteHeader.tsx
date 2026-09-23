import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { primaryNav } from "@/content/nav";
import { Button } from "@/components/shared/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-dark bg-near-black/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-warm-white"
        >
          {siteConfig.businessName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-stone transition-colors hover:text-warm-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" className="px-6 py-3 text-xs">
            Book a Consultation
          </Button>
        </div>

        <MobileNav links={primaryNav} />
      </div>
    </header>
  );
}
