// Journal ("Diario") articles. Source: Abel's previous site (VERT/ui_kits/website/diario/*.html).
// Adapted for CaliPro: no invented authors, dates or first-person anecdotes (those were VÉRTEX
// placeholders and would read as the coach's own claims). No en/em dashes.
import type { Locale } from "@/i18n/config";

export type DiaryCategory = "technique" | "nutrition";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

type Localized = { title: string; excerpt: string; lead: string; body: Block[] };

export type Post = {
  slug: string;
  category: DiaryCategory;
  featured?: boolean;
  cover: string;
  coverAlt: Record<Locale, string>;
  /** Skill page to suggest at the end of the article. */
  relatedSkill?: string;
  text: Record<Locale, Localized>;
};

export const posts: Post[] = [
  {
    slug: "pino-una-mano-escapula",
    category: "technique",
    featured: true,
    cover: "/images/diario/pino-escapula.jpg",
    coverAlt: {
      es: "Figura dorada en pino a una mano, detalle del hombro y la escápula",
      en: "Gold figure in a one-arm handstand, shoulder and shoulder blade detail",
    },
    relatedSkill: "pino-una-mano",
    text: {
      es: {
        title: "El pino a una mano no empieza por el hombro",
        excerpt:
          "Por qué tantas progresiones de pino a una mano se estancan en la cintura escapular, y cómo construir una base que aguante años de práctica.",
        lead: "Cuando alguien lleva mucho tiempo intentando el pino a una mano sin avanzar, casi nunca falla la fuerza del hombro ni el equilibrio. Falla la cintura escapular.",
        body: [
          { type: "p", text: "Es habitual quedarse meses en el tuck OAH probando soluciones que no van al fondo del problema: más fuerza, más volumen, más tiempo en el suelo. Y nada cambia." },
          { type: "p", text: "El motivo suele ser el mismo: la escápula no aguanta. Mientras la escápula no aguante, el hombro no puede transmitir fuerza al brazo de apoyo de forma estable. Da igual cuánta fuerza tengas en el deltoides." },
          { type: "h2", text: "Qué entendemos por base escapular" },
          { type: "p", text: "En un pino a dos manos bien hecho, las escápulas están en rotación superior completa, protraídas y estabilizadas por el serrato anterior y el trapecio inferior trabajando juntos. Es una posición que cuesta meses construir." },
          { type: "p", text: "Al pasar a una mano, esa estabilidad se exige el doble: una sola escápula sostiene todo el peso del cuerpo y además controla el equilibrio lateral. Si no hay base, hay temblor. Y si hay temblor, no hay hold." },
          { type: "quote", text: "El hombro es el último en fallar. Pero también es el último en el que hay que mirar." },
          { type: "h2", text: "Tres ejercicios accesorios" },
          { type: "list", items: ["Scapular pull-ups invertidos.", "Wall handstand shrugs con pausa larga.", "Press a una mano contra la pared con bandas."] },
          { type: "p", text: "No son glamurosos, pero atacan justo lo que falla. Un planteamiento sencillo: cuatro semanas trabajando solo escápula antes de volver al OAH. Cuando vuelves, la base ya está donde tiene que estar." },
          { type: "h2", text: "Conclusión" },
          { type: "p", text: "Si llevas tiempo estancado, aparca el OAH durante un mes. Trabaja la escápula. Vuelve y compara." },
        ],
      },
      en: {
        title: "The one-arm handstand doesn't start at the shoulder",
        excerpt:
          "Why so many one-arm handstand progressions stall at the shoulder blades, and how to build a base that holds up for years of practice.",
        lead: "When someone has been chasing the one-arm handstand for a long time without progress, it is rarely shoulder strength or balance. It is the shoulder girdle.",
        body: [
          { type: "p", text: "It is common to spend months in the tuck OAH trying fixes that never reach the real problem: more strength, more volume, more time on the floor. Nothing changes." },
          { type: "p", text: "The reason is usually the same: the shoulder blade can't hold. Until it does, the shoulder can't pass force to the supporting arm in a stable way. It doesn't matter how strong your delts are." },
          { type: "h2", text: "What we mean by a scapular base" },
          { type: "p", text: "In a clean two-arm handstand, the shoulder blades are in full upward rotation, protracted and stabilised by the serratus anterior and the lower traps working together. That position takes months to build." },
          { type: "p", text: "On one arm, that stability is asked for twice over: a single shoulder blade carries your whole body weight while also controlling side-to-side balance. No base means shaking. Shaking means no hold." },
          { type: "quote", text: "The shoulder is the last thing to fail. It is also the last place you should look." },
          { type: "h2", text: "Three accessory exercises" },
          { type: "list", items: ["Inverted scapular pull-ups.", "Wall handstand shrugs with a long pause.", "Banded one-arm wall press."] },
          { type: "p", text: "They are not glamorous, but they target exactly what fails. A simple approach: four weeks of shoulder blade work only before going back to the OAH. When you return, the base is where it needs to be." },
          { type: "h2", text: "Takeaway" },
          { type: "p", text: "If you have been stuck for a while, park the OAH for a month. Train the shoulder blades. Come back and compare." },
        ],
      },
    },
  },
  {
    slug: "front-lever-codos",
    category: "technique",
    cover: "/images/diario/front-lever-codos.jpg",
    coverAlt: {
      es: "Figura dorada en front lever con los brazos completamente rectos",
      en: "Gold figure in a front lever with fully straight arms",
    },
    relatedSkill: "front-lever",
    text: {
      es: {
        title: "Front lever: el error invisible de los codos",
        excerpt: "El detalle que frena años de progresión y casi nadie corrige a tiempo.",
        lead: "El front lever se construye con la espalda, pero se rompe en los codos. En concreto, en una rotación interna sutil que casi nadie corrige a tiempo.",
        body: [
          { type: "p", text: "El error es minúsculo. Al colgarte de la barra y tirar para llevar el cuerpo a la horizontal, los codos rotan ligeramente hacia dentro. Es invisible si no sabes mirarlo, y frena la progresión durante años." },
          { type: "h2", text: "Cómo se manifiesta" },
          { type: "p", text: "Consigues el tuck lever sin problema, pasas al advanced tuck con esfuerzo y al intentar el straddle te quedas corto. Siempre por lo mismo: en cuanto la palanca aumenta, los codos buscan un atajo y rotan hacia dentro para descargar tensión del dorsal." },
          { type: "p", text: "La consecuencia es que el dorsal nunca llega a trabajar al máximo, así que no se adapta. Haces volumen sin progresar." },
          { type: "quote", text: "El dorsal solo aprende cuando los codos están bloqueados." },
          { type: "h2", text: "La corrección" },
          { type: "p", text: "En cada hold, piensa activamente en “romper la barra”: aplica fuerza de rotación externa sobre el agarre, como si quisieras separar las manos. Los codos se bloquean, el dorsal trabaja y la progresión se desbloquea." },
          { type: "p", text: "Una semana de holds cortos con este detalle en la cabeza suele bastar para notar la diferencia." },
        ],
      },
      en: {
        title: "Front lever: the invisible elbow mistake",
        excerpt: "The detail that stalls years of progress and almost nobody fixes in time.",
        lead: "The front lever is built with your back, but it breaks at the elbows. Specifically, in a subtle internal rotation that almost nobody fixes in time.",
        body: [
          { type: "p", text: "The mistake is tiny. As you hang from the bar and pull your body to horizontal, the elbows rotate slightly inwards. It is invisible unless you know where to look, and it can stall progress for years." },
          { type: "h2", text: "How it shows up" },
          { type: "p", text: "You get the tuck lever easily, reach the advanced tuck with effort, and fall short when you try the straddle. Always for the same reason: as soon as the lever gets longer, the elbows look for a shortcut and rotate inwards to take tension off the lats." },
          { type: "p", text: "The result is that the lats never work at their limit, so they never adapt. You add volume without progressing." },
          { type: "quote", text: "The lats only learn when the elbows are locked." },
          { type: "h2", text: "The fix" },
          { type: "p", text: "On every hold, actively think about “breaking the bar”: apply external rotation through your grip, as if you wanted to pull your hands apart. The elbows lock, the lats work and the progression moves again." },
          { type: "p", text: "A week of short holds with this detail in mind is usually enough to feel the difference." },
        ],
      },
    },
  },
  {
    slug: "comer-para-sostener",
    category: "nutrition",
    cover: "/images/diario/nutricion.jpg",
    coverAlt: {
      es: "Plato con arroz, pollo, huevos y fruta sobre piedra oscura",
      en: "Plate with rice, chicken, eggs and fruit on dark stone",
    },
    text: {
      es: {
        title: "Comer para sostener, no para inflar",
        excerpt: "Por qué en calistenia se come distinto que en powerlifting: fuerza relativa, macros orientativos y timing.",
        lead: "En calistenia la fuerza relativa pesa más que la fuerza absoluta. Comer para crecer de más, en este deporte, es lastrarse.",
        body: [
          { type: "p", text: "Hay un mito difícil de matar: que para entrenar fuerte hay que comer mucho. En halterofilia o powerlifting, donde la masa es una ventaja directa, tiene sentido. En calistenia, donde mueves tu propio peso contra la gravedad, comer de más te frena." },
          { type: "h2", text: "El ratio que importa" },
          { type: "p", text: "Lo que interesa es la fuerza por kilo. Un front lever con 70 kg no exige la misma fuerza absoluta que con 80 kg. Si subes cinco kilos para “ganar fuerza”, estás añadiendo cinco kilos de palanca en contra." },
          { type: "p", text: "El objetivo es mantener una composición corporal estable mientras sostienes la intensidad del entrenamiento. Ni superávit agresivo ni déficit: mantenimiento, con proteína suficiente para reparar." },
          { type: "quote", text: "El plato del calistenista se parece más al de un escalador que al de quien levanta hierro." },
          { type: "h2", text: "Macros orientativos" },
          { type: "p", text: "Para una persona de 70 kg en mantenimiento, una referencia habitual:" },
          { type: "list", items: ["Proteína: 1,8 a 2,0 g por kilo de peso.", "Carbohidrato: 4 a 5 g por kilo en días de entrenamiento intenso.", "Grasa: 0,8 a 1,0 g por kilo."] },
          { type: "p", text: "Sin obsesionarse con los números exactos, pero sin ignorarlos." },
          { type: "h2", text: "Timing" },
          { type: "p", text: "La mayor parte del carbohidrato cerca del entrenamiento. La proteína repartida a lo largo del día. Hidratación constante. Y nada de suplementos rebuscados." },
          { type: "note", text: "Cifras orientativas para personas sanas. Si tienes alguna condición médica o un objetivo concreto, consulta con un profesional de la nutrición." },
        ],
      },
      en: {
        title: "Eat to sustain, not to bulk",
        excerpt: "Why calisthenics eating differs from powerlifting: relative strength, ballpark macros and timing.",
        lead: "In calisthenics, relative strength matters more than absolute strength. Eating to grow bigger than you need, in this sport, is carrying dead weight.",
        body: [
          { type: "p", text: "There is a myth that refuses to die: to train hard you have to eat a lot. In weightlifting or powerlifting, where mass is a direct advantage, it makes sense. In calisthenics, where you move your own body against gravity, overeating slows you down." },
          { type: "h2", text: "The ratio that matters" },
          { type: "p", text: "What counts is strength per kilo. A front lever at 70 kg does not ask for the same absolute strength as at 80 kg. Put on five kilos to “get stronger” and you have added five kilos of lever working against you." },
          { type: "p", text: "The goal is a stable body composition while you keep training intensity up. No aggressive surplus, no deficit: maintenance, with enough protein to repair." },
          { type: "quote", text: "A calisthenics plate looks more like a climber's than a lifter's." },
          { type: "h2", text: "Ballpark macros" },
          { type: "p", text: "For a 70 kg person at maintenance, a common reference:" },
          { type: "list", items: ["Protein: 1.8 to 2.0 g per kilo of body weight.", "Carbohydrate: 4 to 5 g per kilo on hard training days.", "Fat: 0.8 to 1.0 g per kilo."] },
          { type: "p", text: "Don't obsess over exact numbers, but don't ignore them either." },
          { type: "h2", text: "Timing" },
          { type: "p", text: "Most of the carbs close to training. Protein spread across the day. Steady hydration. And no exotic supplements." },
          { type: "note", text: "Ballpark figures for healthy adults. If you have a medical condition or a specific goal, check with a nutrition professional." },
        ],
      },
    },
  },
];

export const diaryCategories: DiaryCategory[] = ["technique", "nutrition"];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** ~200 words per minute, at least 1. */
export function readingMinutes(post: Post, lang: Locale): number {
  const t = post.text[lang];
  const text = [t.lead, ...t.body.map((b) => ("items" in b ? b.items.join(" ") : b.text))].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
