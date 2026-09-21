import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { hasModel, products, type Product } from "@/content/products";
import { productPath } from "@/lib/routes";

// Serializable card data for server pages and the client filter grid.
export function toProductCard(p: Product, lang: Locale, shop: Dictionary["shop"]) {
  const t = p.text[lang];
  return {
    slug: p.slug,
    href: productPath(lang, p.slug),
    name: t.name,
    short: t.short,
    category: p.category,
    categoryLabel: shop.categories[p.category],
    cover: p.cover,
    is3d: hasModel(p),
    sample: p.sample,
    price: p.price === null ? shop.pending : `${p.price} €`,
  };
}

export const allProductCards = (lang: Locale, shop: Dictionary["shop"]) =>
  products.map((p) => toProductCard(p, lang, shop));
