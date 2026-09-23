import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/content/site.config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Book a renovation consultation with NorthPeak Developments — serving Calgary, Chestermere, Strathmore, Okotoks, Cochrane, and Airdrie.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="bg-near-black py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-bronze-light uppercase">Contact</p>
            <h1 className="font-display text-4xl leading-[1.1] font-medium tracking-tight text-warm-white text-balance sm:text-5xl">
              Book a renovation consultation.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Tell us about your space and what you&apos;re hoping to achieve. We&apos;ll follow up
              to schedule a consultation — no pressure, no obligation.
            </p>

            <div className="mt-10 space-y-6 border-t border-line-dark pt-8">
              <div>
                <h2 className="text-xs font-semibold tracking-[0.16em] text-stone uppercase">Service areas</h2>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {siteConfig.serviceAreas.join(", ")}
                </p>
              </div>
              <div>
                <h2 className="text-xs font-semibold tracking-[0.16em] text-stone uppercase">What happens next</h2>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  We review every request personally and follow up to schedule an in-person or
                  virtual consultation, depending on your project.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-line-dark bg-graphite p-6 sm:p-10">
              <ContactForm contactPhone={siteConfig.contact.phone} contactEmail={siteConfig.contact.email} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
