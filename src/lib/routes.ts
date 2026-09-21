import type { Locale } from "@/i18n/config";

// The shop folder is /[lang]/tienda; English visitors see /en/shop (rewrite in next.config.ts).
const SHOP_SEGMENT: Record<Locale, string> = { es: "tienda", en: "shop" };

export const homePath = (lang: Locale) => `/${lang}`;
export const homeAnchor = (lang: Locale, id: string) => `/${lang}#${id}`;
export const skillsPath = (lang: Locale) => `/${lang}/skills`;
export const skillPath = (lang: Locale, slug: string) => `/${lang}/skills/${slug}`;
export const shopPath = (lang: Locale) => `/${lang}/${SHOP_SEGMENT[lang]}`;
export const productPath = (lang: Locale, slug: string) => `${shopPath(lang)}/${slug}`;

/** Same page in the other language (keeps skill/product slugs, swaps tienda/shop). */
export function alternatePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${to}`;
  parts[0] = to;
  if (parts[1] === "tienda" || parts[1] === "shop") parts[1] = SHOP_SEGMENT[to];
  return `/${parts.join("/")}`;
}
