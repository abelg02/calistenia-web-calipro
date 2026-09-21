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
    cover: "/images/tienda/camiseta-frente.jpg",
    gallery: [
      { type: "image", src: "/images/tienda/camiseta-frente.jpg", alt: { en: "CaliPro T-shirt, front", es: "Camiseta CaliPro, delante" } },
      { type: "image", src: "/images/tienda/camiseta-espalda.jpg", alt: { en: "CaliPro T-shirt, back", es: "Camiseta CaliPro, espalda" } },
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
    cover: "/images/tienda/sudadera-frente.jpg",
    gallery: [
      { type: "image", src: "/images/tienda/sudadera-frente.jpg", alt: { en: "CaliPro hoodie, front", es: "Sudadera CaliPro, delante" } },
      { type: "image", src: "/images/tienda/sudadera-espalda.jpg", alt: { en: "CaliPro hoodie, back", es: "Sudadera CaliPro, espalda" } },
    ],
    sizes: APPAREL_SIZES,
    price: null,
    text: {
      en: { name: "CaliPro hoodie", inMessage: "the CaliPro hoodie", short: "Black, with hood and kangaroo pocket. Logo on the chest and across the back." },
      es: { name: "Sudadera CaliPro", inMessage: "la sudadera CaliPro", short: "Negra, con capucha y bolsillo canguro. Logo en el pecho y en la espalda." },
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
