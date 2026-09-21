import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { posts, readingMinutes } from "@/content/diary";
import { diaryPath, postPath } from "@/lib/routes";
import { waHref } from "@/lib/contact";
import { DiaryBrowser } from "@/components/diary/DiaryBrowser";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

// Served at /es/diario and, through a rewrite, /en/journal.
export async function generateMetadata({ params }: PageProps<"/[lang]/diario">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang);
  return {
    title: d.diary.metaTitle,
    description: d.diary.intro,
    alternates: { canonical: diaryPath(lang), languages: { es: diaryPath("es"), en: diaryPath("en") } },
  };
}

export default async function DiaryPage({ params }: PageProps<"/[lang]/diario">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const t = d.diary;

  const cards = posts.map((p) => ({
    slug: p.slug,
    href: postPath(lang, p.slug),
    title: p.text[lang].title,
    excerpt: p.text[lang].excerpt,
    category: p.category,
    categoryLabel: t.categories[p.category],
    minutesLabel: t.minutes.replace("{n}", String(readingMinutes(p, lang))),
    cover: p.cover,
    coverAlt: p.coverAlt[lang],
    featured: Boolean(p.featured),
  }));

  return (
    <main id="main" className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 sm:px-6 lg:px-10 lg:pb-32 lg:pt-36">
      <div className="max-w-4xl">
        <h1 className="font-display text-balance text-[clamp(3rem,9vw,7rem)] text-travertine">{t.title}</h1>
        <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-pumice sm:text-lg">{t.intro}</p>
      </div>
      <div className="mt-12 lg:mt-16">
        <DiaryBrowser
          cards={cards}
          categories={t.categories}
          labels={{ filter: t.filterLabel, featured: t.featured, read: t.read }}
        />
      </div>
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} />
    </main>
  );
}
