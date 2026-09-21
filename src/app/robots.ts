import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Draft: block every crawler. Launched: allow everything and point to the sitemap.
export default function robots(): MetadataRoute.Robots {
  if (!site.launched) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
