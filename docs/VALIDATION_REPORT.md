# Validation report

Honest account of what was actually run and observed versus what the brief
sets as a *target*. Dates/results below are from this build session; re-run
before every real launch.

## Automated checks (actually run, output captured)

| Check | Command | Result |
| --- | --- | --- |
| Type checking | `npx tsc --noEmit` | **Pass** — zero errors |
| Lint | `npm run lint` | **Pass** — zero errors, zero warnings (two real issues were found and fixed during development: an unescaped apostrophe in `/privacy`, and a `react-hooks/set-state-in-effect` violation in the video player and mobile nav — both fixed by restructuring rather than suppressing) |
| Production build | `npm run build` | **Pass** — compiles and prerenders all 13 routes as fully static content (`○ (Static)`), including `/sitemap.xml`, `/robots.txt`, the generated `/icon`, and `/opengraph-image` |

### Prerendered HTML size per route (from the actual build output)

| Route | Size |
| --- | --- |
| `/` | 129.8 KB |
| `/services` | 57.1 KB |
| `/services/legal-suite-basement` | 68.3 KB |
| `/services/custom-basement` | 70.3 KB |
| `/services/home-renovation` | 66.8 KB |
| `/projects` | 77.7 KB |
| `/about` | 44.1 KB |
| `/contact` | 32.0 KB |
| `/privacy` | 33.3 KB |

The homepage and `/projects` are the heaviest pages because they inline the
most `ArchitecturalPlate` SVG illustrations directly in the HTML. This is a
deliberate trade-off: it means zero additional image requests and zero
layout shift while loading, at the cost of larger initial HTML — reasonable
given there is no real photography yet. Total client JS across all shared
chunks is ~1.0 MB uncompressed (standard Next.js/React runtime baseline for
this router version); per-route JS is minimal since almost every component is
a Server Component — the only client-side interactivity is the mobile menu,
the finish-concept tabs, the FAQ disclosure (native `<details>`, no JS at
all), and the contact form.

## Manually tested in this session (Claude's built-in browser)

- **Navigation:** every primary nav link, every footer link, all 3 service
  cards, the "View the full gallery" link, and every service page's
  breadcrumb were clicked and confirmed to land on the correct route with
  correct `<title>`.
- **Mobile menu:** open, close (via the X button), and navigate-then-auto-close
  were all tested. **A real bug was found and fixed here**: the sticky
  header's `backdrop-blur` was creating a CSS containing block that trapped
  the `position: fixed` mobile menu inside the header's own box instead of
  the viewport (the menu rendered but only covered ~76px at the top of the
  screen with the rest of the page visible through/around it). Fixed by
  portaling the menu to `document.body` via `createPortal` — see the comment
  in `src/components/layout/MobileNav.tsx`.
- **Finish-concept tabs:** verified all three tabs (Warm Architectural,
  Contemporary Graphite, Soft Modern) switch the preview illustration and the
  full spec table (panel, cabinet, metal, lighting, three paint rows with
  their "pending verification" notes).
- **FAQ accordions:** verified open/close on the homepage and on the Legal
  Suite Basement service page.
- **Contact form — full pass:**
  - Submitting empty shows every field's specific, human-readable error
    (e.g. "Enter your full name.", "Let us know your city."). **A real bug
    was found and fixed here**: the City and Service Interest `<select>`
    elements had a `disabled` placeholder option, which meant an unselected
    dropdown submitted no value at all, producing Zod's raw internal message
    ("Invalid input: expected string, received undefined") instead of the
    friendly copy. Fixed by making the placeholder option selectable and
    adding explicit base-type error messages in `src/lib/validation.ts`.
  - Filling every field correctly, waiting past the 2.5s anti-bot timing
    gate, and submitting was verified to hit the server action, pass
    validation, and correctly return the **`not_configured`** state (since
    no email/webhook transport is set in this environment) — the user sees
    "Your request was received" plus an honest note that automatic delivery
    isn't connected yet, exactly as specified in the brief (never claim a
    false delivery).
  - The honeypot field was confirmed present, off-screen, and outside the
    tab order (`tabIndex={-1}`, absolutely positioned off-canvas, not
    `display:none` so it can't be trivially detected by simple bots that skip
    hidden fields).
- **Responsive layout:** checked at 375×812 (mobile), ~768×1024 (tablet-ish,
  the browser pane's native size), and 1440×900 (desktop). No horizontal
  overflow at any width (`document.documentElement.scrollWidth` ===
  `clientWidth` checked programmatically on the homepage). The service-area
  strip wraps to two centered lines on narrow screens instead of scrolling —
  no ticker, as required.
- **Server errors:** dev server console monitored throughout; no runtime
  errors were logged during any of the above.

## Targets from the brief that were **not** independently measured here

Be direct with the client about these — they require tools and real traffic
this environment doesn't have:

- **Lighthouse scores (95+ target).** Not run. This environment doesn't have
  a Lighthouse/Chrome DevTools audit pipeline wired in. Before launch, run
  `npx lighthouse <url> --view` (or PageSpeed Insights) against the deployed
  site on all of `/`, a service page, and `/contact`.
- **Field Core Web Vitals (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75).** These
  require real user traffic (e.g., via Vercel Analytics, Chrome UX Report, or
  a RUM tool) and cannot be measured before launch. The structural choices
  that support hitting them are in place — static prerendering on every
  route, `next/font` self-hosting, no client JS beyond the few interactive
  islands, a fixed-aspect-ratio video wrapper to avoid CLS — but the numbers
  themselves need real measurement post-launch.
- **WCAG 2.2 AA — full audit.** Not run through an automated tool (e.g. axe
  DevTools) in this session. What *was* verified: semantic landmarks
  (`header`, `nav`, `main`, `footer`), a skip-to-content link, visible
  `:focus-visible` styling sitewide, labeled form fields with
  `aria-invalid`/`aria-describedby` wired to real error text, accessible tab
  and disclosure patterns, and color pairings checked against contrast
  minimums by calculation (documented in `src/app/globals.css`). Run a real
  axe/WAVE pass before launch, especially on the contact form's screen-reader
  announcements.
- **Cross-browser testing** (Safari/iOS, Firefox) — only tested in one
  Chromium-based automated browser in this session. Test Safari specifically
  given its stricter autoplay policies (relevant to `ShowcaseVideo` once a
  real file is added).

## Known limitations to flag to the client

- No real project photography — see `docs/ASSET_INVENTORY.md`.
- No hero video file — see `docs/VIDEO_BRIEF.md`.
- Contact form has no delivery transport configured — see
  `docs/OWNER_INPUTS.md`.
- Paint names/codes in the finish selector are placeholders pending
  manufacturer verification, clearly labeled as such in the UI.
