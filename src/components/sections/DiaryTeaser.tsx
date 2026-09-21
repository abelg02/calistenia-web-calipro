import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { posts, readingMinutes } from "@/content/diary";
import { diaryPath, postPath } from "@/lib/routes";
import { Reveal } from "@/components/ui/Reveal";

// Home preview of the journal as a magazine index: one row per article (topic, big title,
// thumbnail). Different layout family from the skills row and the shop feature + list.
export function DiaryTeaser({ lang, t, id }: { lang: Locale; t: Dictionary["diary"]; id: string }) {
  const latest = [...posts].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 3);

  return (
    <section id={id} className="border-t border-granite">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-travertine">{t.homeTitle}</h2>
            <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-pumice sm:text-lg">{t.homeIntro}</p>
          </div>
          <Link
            href={diaryPath(lang)}
            className="inline-flex min-h-12 shrink-0 items-center gap-2.5 self-start border border-travertine/70 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-travertine transition-colors hover:border-gold hover:text-gold lg:self-auto"
          >
            {t.homeCta}
            <ArrowRight size={18} aria-hidden />
          </Link>
        </Reveal>

        <ul className="mt-12 border-t border-granite">
          {latest.map((p, i) => {
            const text = p.text[lang];
            return (
              <li key={p.slug}>
                <Reveal delay={i * 0.06}>
                  <Link
                    href={postPath(lang, p.slug)}
                    className="group grid grid-cols-[1fr_6.5rem] items-center gap-5 border-b border-granite py-6 sm:grid-cols-[10rem_1fr_9rem] sm:gap-8 lg:grid-cols-[12rem_1fr_12rem] lg:py-8"
                  >
                    <p className="col-span-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold sm:col-span-1 sm:flex-col sm:items-start sm:gap-1">
                      {t.categories[p.category]}
                      <span className="font-mono font-normal normal-case tracking-normal text-pumice">
                        {t.minutes.replace("{n}", String(readingMinutes(p, lang)))}
                      </span>
                    </p>
                    <div className="min-w-0">
                      <h3 className="font-display text-balance text-[clamp(1.8rem,3.6vw,2.8rem)] text-travertine transition-colors group-hover:text-gold">
                        {text.title}
                      </h3>
                      <p className="mt-2 hidden max-w-[60ch] text-pumice md:block">{text.excerpt}</p>
                    </div>
                    <div className="relative aspect-[3/2] overflow-hidden border border-granite">
                      <Image
                        src={p.cover}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 192px, 144px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-basalt/70 text-travertine opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowUpRight size={16} aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
