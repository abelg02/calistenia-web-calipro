// Merch catalogue. Apparel and cap use the -sin-marco photos: same mockups with the logo
// printed without its gold frame (the version Abel chose on 2026-09-23).
// Merch catalogue. Every product is a SAMPLE until the real collection exists:
// apparel photos are AI mockups with the real logo, 3D models come from scripts/build-models.mjs.
// Price and material stay pending (rendered as [PENDING] by the UI). Do not invent them.
import type { Locale } from "@/i18n/config";

export type ProductCategory = "apparel" | "equipment" | "accessories";

export type GalleryItem =
  | { type: "image"; src: string; alt: Record<Locale, string> }
  | { type: "model"; src: string; orbit: string; poster: string };

export type Product = {
  slug: string;
  category: ProductCategory;
  sample: boolean;
  /** Card / thumbnail image (for 3D products: a render of the model). */
  cover: string;
  gallery: GalleryItem[];
  /** Only for apparel. Sample sizes until confirmed. */
  sizes?: string[];
  price: number | null;
  text: Record<Locale, { name: string; inMessage: string; short: string }>;
};

const APPAREL_SIZES = ["S", "M", "L", "XL"];

export const products: Product[] = [
  {
    slug: "camiseta-calipro",
    category: "apparel",
    sample: true,
    cover: "/images/tienda/camiseta-frente-sin-marco.jpg",
    gallery: [
      { type: "image", src: "/images/tienda/camiseta-frente-sin-marco.jpg", alt: { en: "CaliPro T-shirt, front", es: "Camiseta CaliPro, delante" } },
      { type: "image", src: "/images/tienda/camiseta-espalda-sin-marco.jpg", alt: { en: "CaliPro T-shirt, back", es: "Camiseta CaliPro, espalda" } },
    ],
    sizes: APPAREL_SIZES,
    price: null,
    text: {
      en: { name: "CaliPro T-shirt", inMessage: "the CaliPro T-shirt", short: "Black oversized fit. Logo on the chest and across the back." },
      es: { name: "Camiseta CaliPro", inMessage: "la camiseta CaliPro", short: "Negra, corte oversize. Logo en el pecho y en la espalda." },
    },
  },
  {
    slug: "sudadera-calipro",
    category: "apparel",
    sample: true,
    cover: "/images/tienda/sudadera-frente-sin-marco.jpg",
    gallery: [
      { type: "image", src: "/images/tienda/sudadera-frente-sin-marco.jpg", alt: { en: "CaliPro hoodie, front", es: "Sudadera CaliPro, delante" } },
      { type: "image", src: "/images/tienda/sudadera-espalda-sin-marco.jpg", alt: { en: "CaliPro hoodie, back", es: "Sudadera CaliPro, espalda" } },
    ],
    sizes: APPAREL_SIZES,
    price: null,
    text: {
      en: { name: "CaliPro hoodie", inMessage: "the CaliPro hoodie", short: "Black, with hood and kangaroo pocket. Logo on the chest and across the back." },
      es: { name: "Sudadera CaliPro", inMessage: "la sudadera CaliPro", short: "Negra, con capucha y bolsillo canguro. Logo en el pecho y en la espalda." },
    },
  },
  {
    slug: "pantalon-calipro",
    category: "apparel",
    sample: true,
    cover: "/images/tienda/pantalon-frente.jpg",
    gallery: [
      { type: "image", src: "/images/tienda/pantalon-frente.jpg", alt: { en: "CaliPro training shorts, front", es: "Pantalón corto CaliPro, delante" } },
      { type: "image", src: "/images/tienda/pantalon-espalda.jpg", alt: { en: "CaliPro training shorts, back", es: "Pantalón corto CaliPro, espalda" } },
    ],
    sizes: APPAREL_SIZES,
    price: null,
    text: {
      en: { name: "CaliPro shorts", inMessage: "the CaliPro shorts", short: "Black, above the knee, cut so nothing gets in the way on the bar." },
      es: { name: "Pantalón corto CaliPro", inMessage: "el pantalón corto CaliPro", short: "Negro, por encima de la rodilla, con corte que no estorba en la barra." },
    },
  },
  {
    slug: "gorra-calipro",
    category: "accessories",
    sample: true,
    cover: "/images/tienda/gorra-delante-sin-marco.jpg",
    gallery: [
      { type: "image", src: "/images/tienda/gorra-delante-sin-marco.jpg", alt: { en: "CaliPro cap, front", es: "Gorra CaliPro, delante" } },
      { type: "image", src: "/images/tienda/gorra-espalda-sin-marco.jpg", alt: { en: "CaliPro cap, back", es: "Gorra CaliPro, espalda" } },
    ],
    price: null,
    text: {
      en: { name: "CaliPro cap", inMessage: "the CaliPro cap", short: "Black, curved brim, logo embroidered on the front and the figure on the back." },
      es: { name: "Gorra CaliPro", inMessage: "la gorra CaliPro", short: "Negra, visera curva, logo bordado delante y la figura detrás." },
    },
  },
  {
    slug: "grips-calipro",
    category: "accessories",
    sample: true,
    cover: "/images/tienda/grips-frente.jpg",
    gallery: [
      { type: "image", src: "/images/tienda/grips-frente.jpg", alt: { en: "CaliPro grips, pair", es: "Grips CaliPro, el par" } },
      { type: "image", src: "/images/tienda/grips-detalle.jpg", alt: { en: "CaliPro grips, strap detail", es: "Grips CaliPro, detalle de la muñequera" } },
    ],
    price: null,
    text: {
      en: { name: "CaliPro grips", inMessage: "the CaliPro grips", short: "Two-hole grips with a wrist strap. Your hands last longer on the bar." },
      es: { name: "Grips CaliPro", inMessage: "los grips CaliPro", short: "Grips de dos agujeros con muñequera. Aguantas más tiempo en la barra." },
    },
  },
  {
    slug: "paralelas-calipro",
    category: "equipment",
    sample: true,
    cover: "/images/tienda/paralelas-3d.jpg",
    gallery: [{ type: "model", src: "/models/paralelas-muestra.glb", orbit: "35deg 72deg 1.6m", poster: "/images/tienda/paralelas-3d.jpg" }],
    price: null,
    text: {
      en: { name: "CaliPro parallettes", inMessage: "the CaliPro parallettes", short: "Black steel frame, grips with gold details. Rotate it in 3D." },
      es: { name: "Paralelas CaliPro", inMessage: "las paralelas CaliPro", short: "Estructura de acero negro, agarres con detalles dorados. Gíralas en 3D." },
    },
  },
  {
    slug: "bidon-calipro",
    category: "accessories",
    sample: true,
    cover: "/images/tienda/bidon-3d.jpg",
    gallery: [{ type: "model", src: "/models/bidon-muestra.glb", orbit: "30deg 80deg 0.9m", poster: "/images/tienda/bidon-3d.jpg" }],
    price: null,
    text: {
      en: { name: "CaliPro bottle", inMessage: "the CaliPro bottle", short: "Matte black with a gold cap. Rotate it in 3D." },
      es: { name: "Bidón CaliPro", inMessage: "el bidón CaliPro", short: "Negro mate con tapón dorado. Gíralo en 3D." },
    },
  },
];

export const categories: ProductCategory[] = ["apparel", "equipment", "accessories"];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const hasModel = (p: Product) => p.gallery.some((g) => g.type === "model");
