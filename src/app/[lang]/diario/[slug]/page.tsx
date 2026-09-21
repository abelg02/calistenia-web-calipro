import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPost, posts, readingMinutes, type Block } from "@/content/diary";
import { getSkill } from "@/content/skills";
import { diaryPath, postPath, skillPath } from "@/lib/routes";
import { waHref } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/diary/PostCard";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/diario/[slug]">) {
  const { lang, slug } = await params;
  const p = getPost(slug);
  if (!hasLocale(lang) || !p) return {};
  const t = p.text[lang];
  return {
    title: `${t.title} | CaliPro`,
    description: t.excerpt,
    alternates: { canonical: postPath(lang, slug), languages: { es: postPath("es", slug), en: postPath("en", slug) } },
    openGraph: { type: "article", images: [{ url: p.cover }] },
  };
}

function ArticleBlock({ b }: { b: Block }) {
  switch (b.type) {
    case "h2":
      return <h2 className="font-display mt-12 text-[clamp(1.9rem,4vw,2.6rem)] text-travertine">{b.text}</h2>;
    case "quote":
      return (
        <blockquote className="font-display my-10 border-l-2 border-gold pl-6 text-[clamp(1.7rem,3.6vw,2.4rem)] italic leading-[1.1] text-gold">
          {b.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-5 space-y-3">
          {b.items.map((it) => (
            <li key={it} className="flex gap-4">
              <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-gold" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return <p className="mt-10 border border-dashed border-flint px-5 py-4 text-sm text-pumice">{b.text}</p>;
    default:
      return <p className="mt-5">{b.text}</p>;
  }
}

export default async function PostPage({ params }: PageProps<"/[lang]/diario/[slug]">) {
  const { lang, slug } = await params;
  const p = getPost(slug);
  if (!hasLocale(lang) || !p) notFound();
  const d = await getDictionary(lang);
  const t = d.diary;
  const text = p.text[lang];
  const skill = p.relatedSkill ? getSkill(p.relatedSkill) : undefined;
  const others = posts.filter((x) => x.slug !== p.slug);

  return (
    <main id="main">
      <article>
        <header className="mx-auto max-w-4xl px-4 pt-28 sm:px-6 lg:pt-36">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-pumice">
            <Link href={diaryPath(lang)} className="inline-flex min-h-11 items-center hover:text-gold">
              {t.breadcrumb}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-gold">{t.categories[p.category]}</span>
          </nav>
          <h1 className="font-display mt-5 text-balance text-[clamp(2.8rem,8vw,6rem)] text-travertine">{text.title}</h1>
          <p className="mt-4 font-mono text-xs tracking-[0.14em] text-pumice">
            {t.minutes.replace("{n}", String(readingMinutes(p, lang)))}
          </p>
          <p className="mt-8 max-w-[58ch] text-xl leading-relaxed text-travertine sm:text-2xl">{text.lead}</p>
        </header>

        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <div className="relative aspect-[3/2] overflow-hidden border border-granite">
            <Image src={p.cover} alt={p.coverAlt[lang]} fill priority sizes="(min-width: 1152px) 1100px, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="mx-auto max-w-[68ch] px-4 pb-16 pt-6 text-lg leading-relaxed text-travertine/85 sm:px-6">
          {text.body.map((b, i) => (
            <ArticleBlock key={i} b={b} />
          ))}
        </div>
      </article>

      {skill && (
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <Link href={skillPath(lang, skill.slug)} className="group flex items-center gap-5 border border-granite bg-slate p-4 transition-colors hover:border-gold sm:p-5">
            <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden sm:w-24">
              <Image src={skill.image} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{t.relatedSkill}</p>
              <p className="font-display mt-2 text-[clamp(1.8rem,4vw,2.6rem)] text-travertine group-hover:text-gold">
                {skill.text[lang].name}
              </p>
            </div>
            <ArrowRight size={22} aria-hidden className="ml-auto shrink-0 text-pumice group-hover:text-gold" />
          </Link>
        </section>
      )}

      <section className="border-y border-granite bg-slate">
        <Reveal className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-14 sm:px-6 lg:py-16">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] text-travertine">{t.ctaTitle}</h2>
          <p className="max-w-[52ch] text-pumice">{t.ctaBody}</p>
          <ButtonLink
            href={waHref(t.wa.replace("{title}", text.title))}
            className="self-start"
            icon={<WhatsappLogo size={20} weight="fill" aria-hidden />}
          >
            {d.cta.whatsapp}
          </ButtonLink>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] text-travertine">{t.more}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <PostCard
                p={{
                  slug: o.slug,
                  href: postPath(lang, o.slug),
                  title: o.text[lang].title,
                  excerpt: o.text[lang].excerpt,
                  categoryLabel: t.categories[o.category],
                  minutesLabel: t.minutes.replace("{n}", String(readingMinutes(o, lang))),
                  cover: o.cover,
                  coverAlt: o.coverAlt[lang],
                }}
                readLabel={t.read}
              />
            </li>
          ))}
        </ul>
        <Link
          href={diaryPath(lang)}
          className="mt-12 inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-pumice hover:text-gold"
        >
          <ArrowLeft size={16} aria-hidden /> {t.back}
        </Link>
      </section>
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} />
    </main>
  );
}
