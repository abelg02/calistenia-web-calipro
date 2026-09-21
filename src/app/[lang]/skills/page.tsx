import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { skills } from "@/content/skills";
import { skillPath, skillsPath } from "@/lib/routes";
import { waHref } from "@/lib/contact";
import { SkillsBrowser } from "@/components/skills/SkillsBrowser";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export async function generateMetadata({ params }: PageProps<"/[lang]/skills">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang);
  return {
    title: d.skills.metaTitle,
    description: d.skills.intro,
    alternates: { languages: { es: skillsPath("es"), en: skillsPath("en") } },
  };
}

export default async function SkillsPage({ params }: PageProps<"/[lang]/skills">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const s = d.skills;

  const cards = skills.map((k) => ({
    slug: k.slug,
    href: skillPath(lang, k.slug),
    code: k.code,
    name: k.text[lang].name,
    level: k.level,
    levelLabel: s.levels[k.level],
    difficulty: k.difficulty,
    image: k.image,
    imageAlt: k.imageAlt[lang],
  }));

  return (
    <main className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 sm:px-6 lg:px-10 lg:pb-32 lg:pt-36">
      <div className="max-w-4xl">
        <h1 className="font-display text-balance text-[clamp(3rem,9vw,7rem)] text-travertine">{s.title}</h1>
        <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-pumice sm:text-lg">{s.intro}</p>
      </div>
      <div className="mt-12 lg:mt-16">
        <SkillsBrowser cards={cards} levels={s.levels} filterLabel={s.filterLabel} difficultyLabel={s.difficulty} />
      </div>
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} />
    </main>
  );
}
