import type { Locale } from "@/i18n/config";

// Translated segments: the folders are /[lang]/tienda and /[lang]/diario; English visitors see
// /en/shop and /en/journal (rewrites in next.config.ts).
const SHOP_SEGMENT: Record<Locale, string> = { es: "tienda", en: "shop" };
const DIARY_SEGMENT: Record<Locale, string> = { es: "diario", en: "journal" };

export const homePath = (lang: Locale) => `/${lang}`;
export const homeAnchor = (lang: Locale, id: string) => `/${lang}#${id}`;
export const skillsPath = (lang: Locale) => `/${lang}/skills`;
export const skillPath = (lang: Locale, slug: string) => `/${lang}/skills/${slug}`;
export const shopPath = (lang: Locale) => `/${lang}/${SHOP_SEGMENT[lang]}`;
export const productPath = (lang: Locale, slug: string) => `${shopPath(lang)}/${slug}`;
export const diaryPath = (lang: Locale) => `/${lang}/${DIARY_SEGMENT[lang]}`;
export const postPath = (lang: Locale, slug: string) => `${diaryPath(lang)}/${slug}`;
export const testPath = (lang: Locale) => `/${lang}/test`;

/** Same page in the other language (keeps slugs, swaps translated segments). */
export function alternatePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${to}`;
  parts[0] = to;
  if (parts[1] === "tienda" || parts[1] === "shop") parts[1] = SHOP_SEGMENT[to];
  if (parts[1] === "diario" || parts[1] === "journal") parts[1] = DIARY_SEGMENT[to];
  return `/${parts.join("/")}`;
}
