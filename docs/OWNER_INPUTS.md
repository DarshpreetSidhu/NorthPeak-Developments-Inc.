# Owner inputs required before launch

Nothing on this site invents reviews, awards, certifications, project counts,
addresses, phone numbers, or completed projects. Everything below is a real
gap the owner needs to fill — not a design placeholder to leave as-is.

All of these are centralized in **`src/content/site.config.ts`** with inline
comments marking each one. Update the file directly; the rest of the site
reads from it.

## Required before launch

| Item | Where it's used | Why it's blocking |
| --- | --- | --- |
| Production domain (`NEXT_PUBLIC_SITE_URL`) | Canonical URLs, sitemap, OG tags, JSON-LD | Currently falls back to `https://www.northpeakdevelopments.example`, a deliberately non-real placeholder domain (RFC 2606) so nothing gets accidentally published under a real address |
| `NEXT_PUBLIC_SITE_ENV=production` on the live deployment only | `src/app/robots.ts` | Any other value blocks all search indexing — this must be set correctly per environment or the real site won't get crawled |
| Business phone number | Footer, contact page, JSON-LD (`site.config.ts` → `contact.phone` / `contact.phoneHref`) | Currently blank; the footer and contact page gracefully fall back to "use the form" copy, but a real number should be added |
| Business email | Same as above (`contact.email`) | Same fallback behavior |
| Contact form delivery (Resend API key + notification email, or a CRM webhook URL) | `.env.local`, `src/lib/notify.ts` | Without this, real submissions from **both** the main contact form and the homepage "Build Your Space" configurator are only logged to the server console — see the README's "Contact form behavior" section |

> **Do not use an `@northpeakdevelopments.ca` address for `CONTACT_NOTIFICATION_EMAIL`
> without first confirming you own that domain.** During this build, that
> domain was checked and found to be a live site for a real, unrelated
> Calgary business (a commercial-cleaning company), not this renovation
> contractor — see `src/lib/notify.ts` for the full note. Verify domain
> ownership before configuring lead delivery to any address on it.

> **Case study privacy — `src/lib/projects.ts`.** The `chestermere-exterior-remediation`
> case study was seeded with a generalized location ("Chestermere, Alberta") and a
> generic client label ("Private homeowner") instead of the exact street address and
> client's legal name. Publishing a specific home address next to a real person's name
> discloses exactly which house was recently renovated and who lives there — a physical
> safety risk regardless of consent — and the site's own `/projects` copy promises real
> projects are only published "with the homeowner's permission." Before tightening either
> field: get the client's written consent to be named publicly, and weigh whether an
> exact street address (vs. city-level location) is something you actually want published
> for any client, ever.

## Recommended before launch

| Item | Where it's used |
| --- | --- |
| Mailing/office address (only if you want one published) | `site.config.ts` → `contact.streetAddress` etc. — omitted entirely from the page and from JSON-LD until supplied |
| Instagram / Facebook / Houzz profile URLs | `site.config.ts` → `socialLinks` — only rendered/added to JSON-LD `sameAs` if present |
| WCB clearance number / business licence number, if you want them displayed | `site.config.ts` → `credentials` |
| Real project photography to replace the placeholder illustrations | See `docs/ASSET_INVENTORY.md` |
| Manufacturer paint names & product codes for the three finish concepts | `src/content/finishes.ts` — currently marked "pending verification"; do not guess these, confirm against current manufacturer catalogs |
| Legal review of `src/app/privacy/page.tsx` against PIPA (Alberta) / PIPEDA | The policy is accurate to what the code currently does, but is not a substitute for legal review |
| Hero showcase film (or a decision to launch with the illustrated poster) | `docs/VIDEO_BRIEF.md` |

## Optional / nice-to-have

- Google Analytics or another analytics platform (none is wired up; if added,
  the Privacy Policy must be updated to disclose it *before* it goes live).
- hCaptcha/Cloudflare Turnstile on the contact form, if spam becomes a real
  problem beyond what the honeypot + timing check catch.
- A richer "About" narrative (founding story, team bios/photos) — deliberately
  kept general in this build since no specific, verifiable details were
  provided.
- Individual project case-study pages, once enough completed,
  homeowner-approved projects exist to document (see `/projects` — it's
  intentionally an honest "design inspiration" gallery, not project
  documentation, until then).
