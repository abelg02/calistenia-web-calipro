import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { skills } from "@/content/skills";
import { skillPath, skillsPath } from "@/lib/routes";
import { Reveal } from "@/components/ui/Reveal";
import { SkillCard } from "@/components/skills/SkillCard";

// Home preview: the five skills as a swipeable row on mobile, a five-column row on desktop.
export function SkillsTeaser({ lang, s, id }: { lang: Locale; s: Dictionary["skills"]; id: string }) {
  return (
    <section id={id} className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-display text-balance text-[clamp(2.6rem,7vw,5rem)] text-travertine">{s.homeTitle}</h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-pumice sm:text-lg">{s.homeIntro}</p>
        </div>
        <Link
          href={skillsPath(lang)}
          className="inline-flex min-h-12 shrink-0 items-center gap-2.5 self-start border border-travertine/70 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-travertine transition-colors hover:border-gold hover:text-gold lg:self-auto"
        >
          {s.homeCta}
          <ArrowRight size={18} aria-hidden />
        </Link>
      </Reveal>
      <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {skills.map((k, i) => (
          <li key={k.slug} className="w-[72vw] max-w-[320px] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <Reveal delay={i * 0.06}>
              <SkillCard
                s={{
                  slug: k.slug,
                  href: skillPath(lang, k.slug),
                  code: k.code,
                  name: k.text[lang].name,
                  levelLabel: s.levels[k.level],
                  difficulty: k.difficulty,
                  image: k.image,
                  imageAlt: k.imageAlt[lang],
                }}
                difficultyLabel={s.difficulty}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
