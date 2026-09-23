import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Baseline Content-Security-Policy.
 *
 * `script-src`/`style-src` include 'unsafe-inline' because:
 *   - Next.js's App Router injects its own inline <script> tags (the RSC
 *     hydration payload, `self.__next_f.push(...)`) with no nonce available
 *     from a static, header-only config like this one.
 *   - Framer Motion animates by writing directly to each element's `style`
 *     property, which browsers treat the same as an inline `style`
 *     attribute for CSP purposes.
 * Removing 'unsafe-inline' is possible but requires a per-request nonce
 * generated in middleware and threaded through the root layout — a real
 * upgrade, out of scope for a static next.config header. See
 * docs/OWNER_INPUTS.md.
 *
 * `'unsafe-eval'` is added to `script-src` in development only — Next's
 * dev-mode HMR relies on it; production never receives it.
 */
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
];

const nextConfig: NextConfig = {
  // Required for the PM2/Hostinger deployment in docs/DEPLOYMENT.md — without
  // this, `next build` never produces `.next/standalone/`, and the whole
  // deploy pipeline fails at the sync step.
  output: "standalone",
  images: {
    // Unsplash is used for the /projects design-inspiration gallery only,
    // as licensed placeholder photography pending real project photos or
    // Midjourney renders — see docs/ASSET_INVENTORY.md.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    // AVIF is checked first — the Next.js Image component negotiates
    // against the request's Accept header and serves the first supported
    // format in this list, so AVIF (better compression) wins whenever a
    // browser supports it, falling back to WebP otherwise.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // HSTS is only honored by browsers over HTTPS; harmless to send
          // in dev/HTTP. 2-year max-age + preload matches the hstspreload.org
          // submission baseline.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
        ],
      },
    ];
  },
};

export default nextConfig;
