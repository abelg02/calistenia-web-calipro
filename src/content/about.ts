// "Sobre mí" data. Photos: Pedro's real Instagram posts (kit-instagram-web/assets/instagram,
// @pedrohr_2). Confirmed by Abel on 2026-09-22: full name, Seville, both quotes, and the three
// plans with their contents. Plan prices are still pending (see dictionaries: about.plans).
import type { Locale } from "@/i18n/config";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
};

const photo = (file: string, width: number, height: number, es: string, en: string, capEs: string, capEn: string): Photo => ({
  src: `/images/pedro/${file}.jpg`,
  width,
  height,
  alt: { es, en },
  caption: { es: capEs, en: capEn },
});

export const photos = {
  handstand: photo("pino-atardecer", 640, 640, "Pedro haciendo el pino al atardecer", "Pedro holding a handstand at sunset", "Pino al atardecer", "Handstand at sunset"),
  weighted: photo("dominadas-lastradas-50kg", 360, 640, "Pedro en la barra con 50 kg de lastre", "Pedro on the bar with 50 kg of extra weight", "+50 kg lastrado", "+50 kg weighted"),
  muscleUp: photo("muscle-up", 361, 640, "Pedro en una barra de dominadas preparando un muscle up", "Pedro on a pull-up bar setting up a muscle up", "Muscle up", "Muscle up"),
  physiquePark: photo("fisico-parque", 480, 640, "Pedro en un parque de calistenia", "Pedro at a calisthenics park", "En el parque", "At the park"),
  quoteBar: photo("frase-barra", 361, 640, "Pedro colgado de la barra, foto en blanco y negro con una frase", "Pedro hanging from the bar, black and white photo with a quote", "Mentalidad", "Mindset"),
  bw: photo("barra-blanco-negro", 360, 640, "Pedro en las barras, foto en blanco y negro", "Pedro on the bars, black and white photo", "Barra a barra", "Bar by bar"),
  planche: photo("planche-paralelas", 360, 640, "Pedro haciendo tuck planche sobre paralelas", "Pedro holding a tuck planche on parallettes", "Planche", "Planche"),
  physique: photo("fisico", 549, 640, "Retrato de Pedro en un parque de calistenia", "Portrait of Pedro at a calisthenics park", "Progreso", "Progress"),
  parallettes: photo("paralelas-madera", 480, 640, "Pedro con unas paralelas de madera", "Pedro with wooden parallettes", "Paralelas", "Parallettes"),
};

/** Gallery order (mixed crops read better than a uniform grid). */
export const gallery: Photo[] = [
  photos.handstand,
  photos.weighted,
  photos.planche,
  photos.muscleUp,
  photos.physique,
  photos.quoteBar,
  photos.parallettes,
  photos.bw,
];

export const PLAN_IDS = ["online", "coaching", "skills"] as const;
export type PlanId = (typeof PLAN_IDS)[number];
/** Plan shown as the most complete one (it includes everything in the online plan). */
export const FEATURED_PLAN: PlanId = "coaching";

export const instagram = { followers: "1.700", followersEn: "1,700" };
