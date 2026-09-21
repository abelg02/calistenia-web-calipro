import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { skills } from "@/content/skills";
import { skillPath, skillsPath, testPath } from "@/lib/routes";
import { waHref } from "@/lib/contact";
import { LevelTest, type SkillInfo } from "@/components/test/LevelTest";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export async function generateMetadata({ params }: PageProps<"/[lang]/test">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang);
  return {
    title: d.test.metaTitle,
    description: d.test.intro,
    alternates: { languages: { es: testPath("es"), en: testPath("en") } },
  };
}

export default async function TestPage({ params }: PageProps<"/[lang]/test">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const t = d.test;

  const info: Record<string, SkillInfo> = Object.fromEntries(
    skills.map((s) => [
      s.slug,
      {
        name: s.text[lang].name,
        levelLabel: d.skills.levels[s.level],
        time: s.text[lang].time,
        image: s.image,
        imageAlt: s.imageAlt[lang],
        href: skillPath(lang, s.slug),
      },
    ]),
  );

  return (
    <main id="main" className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 lg:pb-32 lg:pt-36">
      <h1 className="font-display text-balance text-[clamp(3rem,9vw,6.5rem)] text-travertine">{t.title}</h1>
      <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-pumice sm:text-lg">{t.intro}</p>
      <p className="mt-3 font-mono text-xs tracking-[0.16em] text-gold">{t.duration}</p>
      <div className="mt-10 lg:mt-12">
        <LevelTest t={t} skills={info} skillsHref={skillsPath(lang)} />
      </div>
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} />
    </main>
  );
}
