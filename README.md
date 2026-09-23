# NorthPeak Developments — Website

Production-quality marketing site for NorthPeak Developments, a Calgary-area
renovation company focused on three services: legal suite basements, custom
basements, and home renovation.

Built with Next.js 16 (App Router, Turbopack), TypeScript (strict), Tailwind
CSS v4, and Server Components by default.

## Creative direction (brief)

- **Brand promise:** "Quality is not an extra. It is our standard."
- **Palette:** near-black (`#0E1011`) and graphite (`#17191B`) foundations,
  warm white (`#F4F0E9`) text, stone (`#C8C0B5`) secondary text, bronze
  (`#A77951`, with a lighter `#C9A07A` variant for links/small text) as the
  single accent. All pairings were checked against WCAG 2.2 contrast minimums
  — see the comment block at the top of `src/app/globals.css`.
- **Type:** Fraunces (display/headings) + Inter (body), both self-hosted via
  `next/font/google`.
- **Imagery:** no real project photography exists yet, and the brief
  explicitly prohibits implying otherwise. Every "photo" on the site is an
  original, bespoke SVG line-art illustration (`ArchitecturalPlate`) in the
  brand palette — clearly labeled "Design concept" wherever it appears. See
  `docs/ASSET_INVENTORY.md`.
- **Motion:** subtle and purposeful only (hover states, a tab panel, a mobile
  menu). No scroll-jacking, no decorative animation. Respects
  `prefers-reduced-motion` globally.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Purpose                                   |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Local dev server (Turbopack)               |
| `npm run build` | Production build (also type-checks)        |
| `npm run start` | Serve the production build                 |
| `npm run lint`  | ESLint (flat config, Next.js core-web-vitals + TypeScript rules) |
| `npx tsc --noEmit` | Type-check only, no build              |

All four (`build`, `lint`, and an explicit `tsc --noEmit`) were run clean at
the time of delivery — see `docs/VALIDATION_REPORT.md` for the actual output.

## Project structure

```
src/
  app/                    Routes (App Router). Each route has its own
                          metadata export; service detail pages share
                          components/services/ServiceDetailTemplate.tsx.
  components/
    layout/               Header, mobile nav, footer, service-area strip
    home/                 Homepage sections
    services/             Shared service-detail page template
    contact/              Contact form (client component)
    video/                Showcase video player + poster fallback
    shared/               Container, SectionHeading, Button, FaqAccordion,
                          ArchitecturalPlate (the placeholder-art system)
  content/                Typed content + the central business config
    site.config.ts        ← business details, service areas, feature flags
    services.ts           Full copy for all 3 services (scope, FAQs, etc.)
    finishes.ts           Entertainment-wall finish-concept data
    gallery.ts            Design-inspiration gallery items
    video.ts              Hero video config (currently disabled — no asset)
  lib/
    validation.ts         Zod schema for the contact form
    notify.ts             Pluggable contact-form delivery (email/webhook)
    seo.ts                Metadata + JSON-LD helpers
docs/
  OWNER_INPUTS.md          Everything the owner must supply before launch
  ASSET_INVENTORY.md       Every visual asset, its source, and its status
  VIDEO_BRIEF.md           Storyboard + generation/shoot brief for the hero film
  VALIDATION_REPORT.md     What was actually tested, and the results
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values before deploying.
Nothing in the codebase requires secrets to run locally — the site works
fully without any of these set, it just tells visitors the contact form isn't
wired up yet (see below).

| Variable | Required before launch? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Canonical URL, sitemap, OG tags, JSON-LD |
| `NEXT_PUBLIC_SITE_ENV` | **Yes** | Must be exactly `production` to allow search indexing (see `src/app/robots.ts`) |
| `RESEND_API_KEY` + `CONTACT_NOTIFICATION_EMAIL` | Recommended | Contact form email delivery |
| `CONTACT_WEBHOOK_URL` | Optional alternative | Forward leads to a CRM/Zapier/etc. |

## Contact form behavior (important)

The brief requires that we **never show a false "message sent" confirmation**.
The form (`src/components/contact/ContactForm.tsx` +
`src/app/contact/actions.ts`) handles this with three distinct outcomes:

1. **`sent`** — a transport (Resend or a webhook) is configured and the
   submission was delivered. Shows a normal success message.
2. **`not_configured`** — validation passed, the submission is logged
   server-side, but no transport is configured. The visitor is told plainly
   that automatic delivery isn't connected yet and is pointed to a direct
   phone/email if one is configured in `site.config.ts`, or told to check
   back if not.
3. **`error`** — validation failed (inline field errors) or delivery threw.

Spam protection is dependency-free: a honeypot field (`companyWebsite`, kept
off-screen for sighted users and out of the tab order) plus a minimum-fill-time
check (rejects submissions completed in under 2.5s). If spam becomes a real
problem, add hCaptcha/Turnstile — there's a natural seam in
`submitContactForm` in `src/app/contact/actions.ts` for it.

## "Build Your Space" configurator

A four-step lead-qualification wizard on the homepage
(`src/components/configurator/ProjectConfigurator.tsx`), built with React
Hook Form + Zod (`src/lib/configuratorSchema.ts`) for client-side step
validation and Framer Motion for the slide transitions. Project type → size →
entertainment-wall finish direction (pulled from the same
`src/content/finishes.ts` the homepage selector uses) → contact details.

On submit it calls a real Server Action
(`src/components/configurator/actions.ts`), which **re-validates everything
server-side** (client validation is a UX convenience only) and follows the
exact same honest `sent` / `not_configured` / `error` pattern as the main
contact form, via a sibling `deliverConfiguratorLead()` in `src/lib/notify.ts`
that reuses the same `CONTACT_WEBHOOK_URL` / `RESEND_API_KEY` +
`CONTACT_NOTIFICATION_EMAIL` transport — so leads from both forms land in one
place. See the callout in `docs/OWNER_INPUTS.md` before setting
`CONTACT_NOTIFICATION_EMAIL`.

## SEO

- Per-page `<title>`/`<meta description>`, canonical URLs, and Open Graph tags
  via `buildPageMetadata()` in `src/lib/seo.ts`.
- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from
  `site.config.ts`. **`robots.ts` blocks all crawling unless
  `NEXT_PUBLIC_SITE_ENV=production`** — this is the guard against staging
  getting indexed. Confirm the env var is set correctly on every deployment
  target before going live.
- JSON-LD: `HomeAndConstructionBusiness` sitewide (only populated with fields
  that exist in `site.config.ts` — no placeholder phone/address is ever
  emitted), plus `Service` + `BreadcrumbList` on each service page and
  `FAQPage` on the homepage.
- `src/app/opengraph-image.tsx` and `src/app/icon.tsx` generate a branded,
  typographic OG card and favicon at request time via `next/og` — no image
  asset required.

## Deployment

This is a standard Next.js App Router project (`output: "standalone"`) —
deploy it anywhere that runs Node.js 20+ (Vercel, a Node server, a
container, etc.). No database, no external services are required to build
or run it.

1. Set the environment variables above on the hosting platform. Note that
   `NEXT_PUBLIC_*` values are compiled in at *build* time, not read at
   runtime — set them wherever `npm run build` actually runs (your CI, not
   just the server).
2. `npm run build && npm run start` (or the platform's Next.js adapter) for
   a quick check; for the standalone build specifically, run
   `node .next/standalone/server.js` after copying `.next/static` and
   `public/` into `.next/standalone/`.
3. Confirm `/robots.txt` returns `Allow: /` in production and `Disallow: /`
   on any preview/staging URL — this depends entirely on
   `NEXT_PUBLIC_SITE_ENV`.
4. Submit the sitemap (`/sitemap.xml`) in Google Search Console once the real
   domain is live.

For the full PM2 + GitHub Actions + Nginx + Hostinger VPS pipeline (with
zero-downtime reloads), see **`docs/DEPLOYMENT.md`**.

## What's next

- `docs/OWNER_INPUTS.md` — the concrete list of business details still
  needed.
- `docs/ASSET_INVENTORY.md` — what's a placeholder vs. what's launch-ready.
- `docs/DEPLOYMENT.md` — the Hostinger VPS / PM2 / GitHub Actions deployment
  pipeline.
- `docs/VALIDATION_REPORT.md` — measured results vs. targets, and what
  couldn't be verified in this environment (e.g., field Core Web Vitals,
  which require real traffic).
