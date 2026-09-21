import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getSkill, neighbours, skills, type Skill } from "@/content/skills";
import { skillPath, skillsPath } from "@/lib/routes";
import { waHref } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DifficultyMeter } from "@/components/ui/DifficultyMeter";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => skills.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/skills/[slug]">) {
  const { lang, slug } = await params;
  const skill = getSkill(slug);
  if (!hasLocale(lang) || !skill) return {};
  const t = skill.text[lang];
  return {
    title: `${t.name} | CaliPro`,
    description: t.summary,
    alternates: { languages: { es: skillPath("es", slug), en: skillPath("en", slug) } },
    openGraph: { images: [{ url: skill.image }] },
  };
}

function NeighbourLink({ skill, lang, label, dir }: { skill: Skill; lang: Locale; label: string; dir: "prev" | "next" }) {
  const next = dir === "next";
  return (
    <Link
      href={skillPath(lang, skill.slug)}
      className={`group flex items-center gap-5 border border-granite p-4 transition-colors hover:border-gold sm:p-5 ${
        next ? "bg-slate sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden sm:w-24">
        <Image src={skill.image} alt="" fill sizes="96px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold ${next ? "sm:justify-end" : ""}`}>
          {!next && <ArrowLeft size={14} aria-hidden />}
          {label}
          {next && <ArrowRight size={14} aria-hidden />}
        </p>
        <p className="font-display mt-2 text-[clamp(1.8rem,4vw,2.6rem)] text-travertine transition-colors group-hover:text-gold">
          {skill.text[lang].name}
        </p>
      </div>
    </Link>
  );
}

export default async function SkillPage({ params }: PageProps<"/[lang]/skills/[slug]">) {
  const { lang, slug } = await params;
  const skill = getSkill(slug);
  if (!hasLocale(lang) || !skill) notFound();
  const d = await getDictionary(lang);
  const s = d.skills;
  const t = skill.text[lang];
  const { prev, next } = neighbours(slug);
  const levelLabel = s.levels[skill.level];
  const lastStep = t.steps.length - 1;

  const specs = [
    { label: s.avgTime, value: t.time },
    { label: s.prereq, value: t.prereq },
    { label: s.frequency, value: t.frequency },
  ];

  return (
    <main>
      {/* Hero: huge name + figure */}
      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-14 pt-24 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pb-20 lg:pt-32">
        <div className="flex flex-col justify-end lg:col-span-7">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-pumice">
              <Link href={skillsPath(lang)} className="inline-flex min-h-11 items-center hover:text-gold">
                {s.breadcrumb}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-travertine">{t.name}</span>
            </nav>
            <p className="mt-6 font-mono text-xs tracking-[0.2em] text-pumice">
              {skill.code} · {levelLabel.toUpperCase()}
            </p>
            <h1 className="font-display mt-3 text-balance text-[clamp(3.6rem,11vw,8.5rem)] text-travertine">
              {t.name}
              <span className="text-gold">.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-travertine/85 sm:text-lg">{t.summary}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={waHref(s.startWa.replace("{skill}", t.inMessage))}
                icon={<WhatsappLogo size={20} weight="fill" aria-hidden />}
              >
                {s.start}
              </ButtonLink>
              <ButtonLink href={skillPath(lang, next.slug)} variant="outline" icon={<ArrowRight size={18} aria-hidden />}>
                {s.next}
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border border-granite bg-slate">
            <Image src={skill.image} alt={skill.imageAlt[lang]} fill priority sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section aria-label={s.difficulty} className="border-y border-granite bg-slate">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
          <div className="px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-pumice">{s.difficulty}</dt>
            <dd className="mt-3 flex flex-wrap items-center gap-3">
              <span className="font-display text-[clamp(1.6rem,3.5vw,2.3rem)] text-gold">{levelLabel}</span>
              <DifficultyMeter value={skill.difficulty} label={s.difficulty} size="lg" />
            </dd>
          </div>
          {specs.map((sp, i) => (
            <div
              key={sp.label}
              className={`border-l border-granite px-4 py-7 sm:px-6 lg:px-10 lg:py-9 ${i === 1 ? "border-l-0 border-t lg:border-l lg:border-t-0" : ""} ${
                i === 2 ? "border-t lg:border-t-0" : ""
              }`}
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-pumice">{sp.label}</dt>
              <dd className="font-display mt-3 text-[clamp(1.6rem,3.5vw,2.3rem)] text-travertine">{sp.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Progression */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-travertine">{s.progression}</h2>
            <p className="mt-4 text-base text-pumice sm:text-lg">{s.progressionIntro}</p>
          </div>
          <p className="font-mono text-sm tracking-[0.14em] text-gold">{s.stepsCount.replace("{n}", String(t.steps.length))}</p>
        </Reveal>
        <ol className="mt-12 border-t border-granite">
          {t.steps.map((step, i) => {
            const final = i === lastStep;
            return (
              <li key={step.name}>
                <Reveal
                  delay={i * 0.05}
                  className={`grid grid-cols-[3.25rem_1fr] gap-x-4 gap-y-3 border-b py-7 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-x-8 ${
                    final ? "border-gold" : "border-granite"
                  }`}
                >
                  <span className={`font-display text-[clamp(2.2rem,5vw,3.4rem)] ${final ? "text-gold" : "text-flint"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={`font-display text-[clamp(1.6rem,3.6vw,2.4rem)] ${final ? "text-gold" : "text-travertine"}`}>
                      {step.name}
                    </h3>
                    <p className="mt-2 max-w-[60ch] leading-relaxed text-pumice">{step.detail}</p>
                  </div>
                  <span
                    className={`col-start-2 justify-self-start border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] sm:col-start-3 sm:justify-self-end ${
                      final ? "border-gold bg-gold text-basalt" : "border-flint text-travertine"
                    }`}
                  >
                    {step.time}
                  </span>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      {/* App band */}
      <section className="border-y border-granite bg-[radial-gradient(90%_140%_at_100%_0%,#2a2923_0%,#161613_60%)]">
        <Reveal className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-16">
          <div>
            <span className="border border-gold/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
              {d.services.app.badge}
            </span>
            <h2 className="font-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)] text-travertine">{s.appTitle}</h2>
            <p className="mt-3 max-w-[56ch] text-pumice">{s.appBody}</p>
          </div>
          <ButtonLink href={waHref(d.services.app.wa)} variant="outline" className="self-start lg:self-auto">
            {d.services.app.cta}
          </ButtonLink>
        </Reveal>
      </section>

      {/* Prev / next */}
      <nav aria-label={s.all} className="mx-auto grid max-w-[1400px] gap-4 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-10 lg:py-20">
        <NeighbourLink skill={prev} lang={lang} label={s.prev} dir="prev" />
        <NeighbourLink skill={next} lang={lang} label={s.next} dir="next" />
        <Link
          href={skillsPath(lang)}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-pumice hover:text-gold md:col-span-2"
        >
          <ArrowLeft size={16} aria-hidden /> {s.all}
        </Link>
      </nav>
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} />
    </main>
  );
}
