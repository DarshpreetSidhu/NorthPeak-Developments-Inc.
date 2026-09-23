import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { footerCompanyLinks, footerServiceLinks } from "@/content/nav";
import { Container } from "@/components/shared/Container";

export function SiteFooter() {
  const { phone, phoneHref, email } = siteConfig.contact;
  const hasDirectContact = Boolean(phone || email);

  return (
    <footer className="border-t border-line-dark bg-graphite">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-2xl font-medium text-warm-white">{siteConfig.businessName}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">{siteConfig.tagline}</p>
          <p className="mt-6 text-sm leading-relaxed text-stone/80">{siteConfig.serviceRegionLabel}</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-stone uppercase">Services</h2>
          <ul className="mt-5 space-y-3">
            {footerServiceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-stone transition-colors hover:text-bronze-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-stone uppercase">Company</h2>
          <ul className="mt-5 space-y-3">
            {footerCompanyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-stone transition-colors hover:text-bronze-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-stone uppercase">Get in touch</h2>
          {hasDirectContact ? (
            <ul className="mt-5 space-y-3 text-sm text-stone">
              {phone ? (
                <li>
                  <a href={phoneHref || undefined} className="transition-colors hover:text-bronze-light">
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="transition-colors hover:text-bronze-light">
                    {email}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-stone">
              Use the{" "}
              <Link href="/contact" className="text-bronze-light underline underline-offset-4">
                consultation form
              </Link>{" "}
              and we&apos;ll follow up directly.
            </p>
          )}
        </div>
      </Container>

      <div className="border-t border-line-dark">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-stone/70 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Calgary, Alberta, Canada</p>
        </Container>
      </div>
    </footer>
  );
}
