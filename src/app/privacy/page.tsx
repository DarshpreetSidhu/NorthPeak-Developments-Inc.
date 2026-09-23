import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/content/site.config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.businessName} collects, uses, and protects information submitted through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="bg-near-black py-20 sm:py-24 lg:py-28">
      <Container className="max-w-3xl">
        <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-bronze-light uppercase">Privacy</p>
        <h1 className="font-display text-4xl leading-[1.1] font-medium tracking-tight text-warm-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-stone/70">Last updated: draft — pending owner and legal review.</p>

        <div className="mt-10 border border-bronze/40 bg-graphite p-5 text-sm leading-relaxed text-stone">
          <p>
            <span className="font-semibold text-bronze-light">Before launch:</span> this policy
            describes exactly what this website&apos;s code currently collects and does. It is written
            to be accurate to the implementation, not to be a complete legal document. Have it
            reviewed by a lawyer familiar with Alberta&apos;s Personal Information Protection Act
            (PIPA) and the federal PIPEDA before publishing, and update it immediately if any
            analytics, advertising, or CRM integration is added.
          </p>
        </div>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-stone">
          <div>
            <h2 className="font-display text-2xl font-medium text-warm-white">Who this policy covers</h2>
            <p className="mt-3">
              This policy applies to {siteConfig.businessName} (&quot;we,&quot; &quot;us&quot;) and
              this website. It explains what information we collect from visitors and how it is
              used.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-warm-white">Information we collect</h2>
            <p className="mt-3">
              The only personal information this website actively collects is what you choose to
              submit through the{" "}
              <a href="/contact" className="text-bronze-light underline underline-offset-4">
                consultation form
              </a>
              : your name, email address, phone number (if provided), city, service interest,
              budget range (if provided), and a description of your project.
            </p>
            <p className="mt-3">
              We do not use cookies for advertising or tracking, and no analytics platform is
              connected to this site by default. If that changes — for example, if Google Analytics
              or an advertising pixel is added later — this section will be updated to disclose it
              before it goes live.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-warm-white">How we use your information</h2>
            <p className="mt-3">
              Information submitted through the consultation form is used solely to respond to your
              inquiry, schedule a consultation, and communicate with you about your project. We do
              not sell personal information, and we do not share it with third parties except a
              service provider we use to deliver or manage the form submission itself (such as an
              email delivery service), once one is configured.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-warm-white">Where your submission goes</h2>
            <p className="mt-3">
              Depending on how this site is configured at the time you submit the form, your
              message is either delivered to our email inbox via a transactional email provider, or
              forwarded to a CRM or automation tool we use to manage leads. See{" "}
              <code className="rounded bg-near-black px-1.5 py-0.5 text-sm text-stone">
                src/lib/notify.ts
              </code>{" "}
              in this project&apos;s source for the exact delivery logic in use.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-warm-white">Data retention</h2>
            <p className="mt-3">
              We retain consultation request details for as long as reasonably necessary to respond
              to your inquiry and, if we proceed with a project together, for the duration of our
              business relationship and any period required by law afterward.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-warm-white">Server and hosting logs</h2>
            <p className="mt-3">
              Like most websites, our hosting provider automatically logs standard technical
              information (such as IP address, browser type, and pages visited) for security and
              operational purposes. We do not use this information to identify individual visitors.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-warm-white">Your choices</h2>
            <p className="mt-3">
              You can ask us to access, correct, or delete the information you&apos;ve submitted to
              us by contacting us directly using the details on our{" "}
              <a href="/contact" className="text-bronze-light underline underline-offset-4">
                Contact
              </a>{" "}
              page.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-warm-white">Changes to this policy</h2>
            <p className="mt-3">
              If how we collect or use information changes, we&apos;ll update this page and revise
              the date at the top.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
