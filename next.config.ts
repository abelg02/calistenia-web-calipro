import type { NextConfig } from "next";

// Translated URLs: /en/shop, /en/journal and /en/about serve /[lang]/tienda, /diario and /sobre-mi.
// Mismatched language/segment combos redirect to the right one.
const translated = [
  { en: "shop", es: "tienda" },
  { en: "journal", es: "diario" },
  { en: "about", es: "sobre-mi" },
];

// Security headers for every response. No full script CSP on purpose: Next inline scripts and
// model-viewer (workers, decoders) would need nonces; these directives are safe without them.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), xr-spatial-tracking=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return {
      beforeFiles: translated.flatMap(({ en, es }) => [
        { source: `/en/${en}`, destination: `/en/${es}` },
        { source: `/en/${en}/:slug`, destination: `/en/${es}/:slug` },
      ]),
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return translated.flatMap(({ en, es }) => [
      { source: `/en/${es}`, destination: `/en/${en}`, permanent: true },
      { source: `/en/${es}/:slug`, destination: `/en/${en}/:slug`, permanent: true },
      { source: `/es/${en}`, destination: `/es/${es}`, permanent: true },
      { source: `/es/${en}/:slug`, destination: `/es/${es}/:slug`, permanent: true },
    ]);
  },
};

export default nextConfig;
