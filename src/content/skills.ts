// Skill data. Source: Abel's previous app (VERT/ui_kits/website/skills/*.html), adapted to
// CaliPro copy rules (no en/em dashes, EN written alongside ES). Times are ranges he wrote.
import type { Locale } from "@/i18n/config";

export type SkillLevel = "elite" | "advanced" | "intermediate";

type Localized = {
  name: string;
  /** Used inside WhatsApp messages: "Quiero trabajar {inMessage}" */
  inMessage: string;
  summary: string;
  time: string;
  prereq: string;
  frequency: string;
  steps: { name: string; detail: string; time: string }[];
};

export type Skill = {
  slug: string;
  code: string;
  level: SkillLevel;
  difficulty: 1 | 2 | 3 | 4 | 5;
  image: string;
  imageAlt: Record<Locale, string>;
  text: Record<Locale, Localized>;
};

export const skills: Skill[] = [
  {
    slug: "pino-una-mano",
    code: "OAH-01",
    level: "elite",
    difficulty: 5,
    image: "/images/skills/pino-una-mano.jpg",
    imageAlt: {
      en: "Gold figure holding a one-arm handstand",
      es: "Figura dorada haciendo el pino a una mano",
    },
    text: {
      en: {
        name: "One-arm handstand",
        inMessage: "the one-arm handstand",
        summary:
          "The hold that separates people who practise from people who own it. Balance, strength and patience. The full route takes 18 to 36 months depending on your base and consistency.",
        time: "18-36 months",
        prereq: "Two-arm handstand 60 s",
        frequency: "5 sessions/week",
        steps: [
          { name: "Two-arm handstand · 60 s", detail: "Freestanding, no wall, held for a minute. The base for everything that follows.", time: "Prerequisite" },
          { name: "Controlled wall walks", detail: "Walk up and down the wall without losing the line. Builds scapular control.", time: "2-4 wks" },
          { name: "Tuck OAH", detail: "One hand down, legs tucked. The first real one-arm position.", time: "3-6 months" },
          { name: "Straddle OAH", detail: "Legs apart. More leverage, same balance.", time: "4-8 months" },
          { name: "Half OAH", detail: "One leg tucked. The last stop before the full skill.", time: "3-6 months" },
          { name: "Full OAH · 5 s", detail: "Full one-arm handstand, five clean seconds.", time: "The skill" },
        ],
      },
      es: {
        name: "Pino a una mano",
        inMessage: "el pino a una mano",
        summary:
          "La posición que separa a quien practica de quien domina. Equilibrio, fuerza y paciencia. La ruta completa lleva entre 18 y 36 meses según tu base y tu constancia.",
        time: "18-36 meses",
        prereq: "Pino a dos manos 60 s",
        frequency: "5 sesiones/semana",
        steps: [
          { name: "Pino a dos manos · 60 s", detail: "Pino libre, sin pared, mantenido un minuto. La base de todo lo que viene.", time: "Requisito" },
          { name: "Wall walks controlados", detail: "Subir y bajar por la pared sin perder la línea. Construye control escapular.", time: "2-4 sem" },
          { name: "Tuck OAH", detail: "Apoyo a una mano con las piernas recogidas. La primera posición real a una mano.", time: "3-6 meses" },
          { name: "Straddle OAH", detail: "Piernas abiertas. Más palanca, el mismo equilibrio.", time: "4-8 meses" },
          { name: "Half OAH", detail: "Una pierna recogida. La última parada antes de la skill completa.", time: "3-6 meses" },
          { name: "Full OAH · 5 s", detail: "Pino completo a una mano, cinco segundos limpios.", time: "La skill" },
        ],
      },
    },
  },
  {
    slug: "planche",
    code: "PLN-02",
    level: "advanced",
    difficulty: 4,
    image: "/images/skills/planche.jpg",
    imageAlt: { en: "Gold figure holding a full planche on parallettes", es: "Figura dorada haciendo la planche sobre paralelas" },
    text: {
      en: {
        name: "Planche",
        inMessage: "the planche",
        summary:
          "Body parallel to the ground, held up by your hands alone. The purest pushing strength in calisthenics. 12 to 30 months for the full version.",
        time: "12-30 months",
        prereq: "Pseudo planche push-up 8 reps",
        frequency: "4 sessions/week",
        steps: [
          { name: "Pseudo planche push-up", detail: "Push-up with the shoulders leaning forward. Builds isometric shoulder strength.", time: "4-8 wks" },
          { name: "Tuck planche", detail: "Legs tucked, back rounded. The first real position.", time: "3-5 months" },
          { name: "Advanced tuck planche", detail: "Flat back, legs closer to the torso.", time: "3-6 months" },
          { name: "Straddle planche", detail: "Legs apart, body parallel.", time: "4-8 months" },
          { name: "Full planche · 3 s", detail: "Straight body, parallel to the ground. Three clean seconds.", time: "The skill" },
        ],
      },
      es: {
        name: "Planche",
        inMessage: "la planche",
        summary:
          "El cuerpo paralelo al suelo, sostenido solo por las manos. La fuerza de empuje más pura de la calistenia. Entre 12 y 30 meses para la versión completa.",
        time: "12-30 meses",
        prereq: "Pseudo planche push-up 8 reps",
        frequency: "4 sesiones/semana",
        steps: [
          { name: "Pseudo planche push-up", detail: "Flexión con los hombros adelantados. Construye la fuerza isométrica del hombro.", time: "4-8 sem" },
          { name: "Tuck planche", detail: "Piernas recogidas, espalda redondeada. La primera posición real.", time: "3-5 meses" },
          { name: "Advanced tuck planche", detail: "Espalda plana, piernas más cerca del torso.", time: "3-6 meses" },
          { name: "Straddle planche", detail: "Piernas abiertas, cuerpo paralelo.", time: "4-8 meses" },
          { name: "Full planche · 3 s", detail: "Cuerpo recto y paralelo al suelo. Tres segundos limpios.", time: "La skill" },
        ],
      },
    },
  },
  {
    slug: "front-lever",
    code: "FLV-03",
    level: "advanced",
    difficulty: 4,
    image: "/images/skills/front-lever.jpg",
    imageAlt: { en: "Gold figure holding a front lever on a pull-up bar", es: "Figura dorada haciendo el front lever en la barra" },
    text: {
      en: {
        name: "Front lever",
        inMessage: "the front lever",
        summary:
          "Hanging from the bar, body straight and horizontal, facing the sky. Your lats hold everything. 9 to 18 months with a solid base.",
        time: "9-18 months",
        prereq: "10 clean pull-ups",
        frequency: "3 sessions/week",
        steps: [
          { name: "Tuck front lever", detail: "Legs tucked, lats engaged. You learn to pull horizontally.", time: "3-6 wks" },
          { name: "Advanced tuck front lever", detail: "Flat back. The hips start to open.", time: "2-4 months" },
          { name: "Straddle front lever", detail: "Legs apart. More leverage.", time: "3-6 months" },
          { name: "Half lay front lever", detail: "One leg straight, the other tucked.", time: "2-4 months" },
          { name: "Full front lever · 5 s", detail: "Straight, horizontal body, five seconds.", time: "The skill" },
        ],
      },
      es: {
        name: "Front lever",
        inMessage: "el front lever",
        summary:
          "Colgado de la barra, con el cuerpo recto y horizontal mirando al cielo. El dorsal lo sostiene todo. De 9 a 18 meses con una buena base.",
        time: "9-18 meses",
        prereq: "10 dominadas limpias",
        frequency: "3 sesiones/semana",
        steps: [
          { name: "Tuck front lever", detail: "Piernas recogidas, dorsal activado. Aprendes a tirar en horizontal.", time: "3-6 sem" },
          { name: "Advanced tuck front lever", detail: "Espalda plana. La cadera empieza a abrirse.", time: "2-4 meses" },
          { name: "Straddle front lever", detail: "Piernas abiertas. Más palanca.", time: "3-6 meses" },
          { name: "Half lay front lever", detail: "Una pierna recta y la otra recogida.", time: "2-4 meses" },
          { name: "Full front lever · 5 s", detail: "Cuerpo recto y horizontal, cinco segundos.", time: "La skill" },
        ],
      },
    },
  },
  {
    slug: "bandera-humana",
    code: "HFL-04",
    level: "intermediate",
    difficulty: 3,
    image: "/images/skills/bandera.jpg",
    imageAlt: { en: "Gold figure holding a human flag on a pole", es: "Figura dorada haciendo la bandera humana en un poste" },
    text: {
      en: {
        name: "Human flag",
        inMessage: "the human flag",
        summary:
          "Your body sideways off the pole, held up by your arms alone. The most photogenic skill in calisthenics. 6 to 14 months.",
        time: "6-14 months",
        prereq: "Side plank 60 s",
        frequency: "3 sessions/week",
        steps: [
          { name: "Vertical flag", detail: "Body vertical, braced sideways. Builds oblique strength.", time: "3-6 wks" },
          { name: "Tuck flag", detail: "Legs tucked, hips raised to horizontal.", time: "2-3 months" },
          { name: "Straddle flag", detail: "Legs apart, body almost horizontal.", time: "3-5 months" },
          { name: "Full human flag · 3 s", detail: "Straight, horizontal body, three clean seconds.", time: "The skill" },
        ],
      },
      es: {
        name: "Bandera humana",
        inMessage: "la bandera humana",
        summary:
          "El cuerpo en lateral al poste, sostenido solo por los brazos. La skill más fotogénica de la calistenia. De 6 a 14 meses.",
        time: "6-14 meses",
        prereq: "Plancha lateral 60 s",
        frequency: "3 sesiones/semana",
        steps: [
          { name: "Vertical flag", detail: "Cuerpo vertical apoyado en lateral. Base de fuerza oblicua.", time: "3-6 sem" },
          { name: "Tuck flag", detail: "Piernas recogidas, cadera elevada hasta la horizontal.", time: "2-3 meses" },
          { name: "Straddle flag", detail: "Piernas abiertas, cuerpo casi horizontal.", time: "3-5 meses" },
          { name: "Full human flag · 3 s", detail: "Cuerpo recto y horizontal, tres segundos limpios.", time: "La skill" },
        ],
      },
    },
  },
  {
    slug: "maltese",
    code: "MLT-05",
    level: "elite",
    difficulty: 5,
    image: "/images/skills/maltese.jpg",
    imageAlt: { en: "Gold figure holding a maltese on the floor", es: "Figura dorada haciendo la maltese en el suelo" },
    text: {
      en: {
        name: "Maltese",
        inMessage: "the maltese",
        summary:
          "Body parallel to the ground, arms out in a cross, hands at hip level. The most demanding hold in the repertoire. 24 to 60 months, only once you own the planche.",
        time: "24-60 months",
        prereq: "Full planche 5 s",
        frequency: "5 sessions/week",
        steps: [
          { name: "Full planche, mastered", detail: "The real prerequisite. No planche, no maltese.", time: "Prerequisite" },
          { name: "Incline maltese press", detail: "Pressing with the arms wide on an incline.", time: "4-8 months" },
          { name: "Tuck maltese", detail: "Legs tucked, arms in a cross.", time: "6-12 months" },
          { name: "Straddle maltese", detail: "Legs apart. The final approach.", time: "12-18 months" },
          { name: "Full maltese · 2 s", detail: "Body parallel, arms in a cross. Two seconds.", time: "The skill" },
        ],
      },
      es: {
        name: "Maltese",
        inMessage: "la maltese",
        summary:
          "El cuerpo paralelo al suelo, los brazos en cruz y las manos a la altura de la cadera. La posición más exigente del repertorio. De 24 a 60 meses, solo cuando ya dominas la planche.",
        time: "24-60 meses",
        prereq: "Full planche 5 s",
        frequency: "5 sesiones/semana",
        steps: [
          { name: "Full planche dominada", detail: "El requisito real. Sin planche no hay maltese.", time: "Requisito" },
          { name: "Maltese press inclinado", detail: "Empuje con los brazos abiertos en plano inclinado.", time: "4-8 meses" },
          { name: "Tuck maltese", detail: "Piernas recogidas, brazos en cruz.", time: "6-12 meses" },
          { name: "Straddle maltese", detail: "Piernas abiertas. La aproximación final.", time: "12-18 meses" },
          { name: "Full maltese · 2 s", detail: "Cuerpo paralelo y brazos en cruz. Dos segundos.", time: "La skill" },
        ],
      },
    },
  },
];

export const getSkill = (slug: string) => skills.find((s) => s.slug === slug);

/** Wraps around: after the last skill comes the first one. */
export function neighbours(slug: string) {
  const i = skills.findIndex((s) => s.slug === slug);
  const n = skills.length;
  return { prev: skills[(i - 1 + n) % n], next: skills[(i + 1) % n] };
}
