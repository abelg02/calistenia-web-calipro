import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Translated shop URL: /en/shop serves the /[lang]/tienda route. Mismatched combos redirect.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/en/shop", destination: "/en/tienda" },
        { source: "/en/shop/:slug", destination: "/en/tienda/:slug" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      { source: "/en/tienda", destination: "/en/shop", permanent: true },
      { source: "/en/tienda/:slug", destination: "/en/shop/:slug", permanent: true },
      { source: "/es/shop", destination: "/es/tienda", permanent: true },
      { source: "/es/shop/:slug", destination: "/es/tienda/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
