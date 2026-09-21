import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { skills } from "@/content/skills";
import { products } from "@/content/products";
import { posts } from "@/content/diary";
import { diaryPath, homePath, postPath, productPath, shopPath, skillPath, skillsPath, testPath } from "@/lib/routes";

// Every page in Spanish, with its English alternate (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: ((lang: Locale) => string)[] = [
    homePath,
    skillsPath,
    testPath,
    shopPath,
    diaryPath,
    ...skills.map((s) => (lang: Locale) => skillPath(lang, s.slug)),
    ...products.map((p) => (lang: Locale) => productPath(lang, p.slug)),
    ...posts.map((p) => (lang: Locale) => postPath(lang, p.slug)),
  ];
  return pages.map((path) => ({
    url: site.url + path("es"),
    alternates: { languages: { es: site.url + path("es"), en: site.url + path("en") } },
  }));
}
