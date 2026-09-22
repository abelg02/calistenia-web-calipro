import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, Check, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { FEATURED_PLAN, PLAN_IDS, gallery, instagram, photos, type PlanId } from "@/content/about";
import { site } from "@/config/site";
import { aboutPath, testPath } from "@/lib/routes";
import { waHref } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

// Served at /es/sobre-mi and, through a rewrite, /en/about.
export async function generateMetadata({ params }: PageProps<"/[lang]/sobre-mi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang);
  return {
    title: d.about.metaTitle,
    description: d.about.metaDescription,
    alternates: { canonical: aboutPath(lang), languages: { es: aboutPath("es"), en: aboutPath("en") } },
    openGraph: { images: [{ url: photos.handstand.src, width: 640, height: 640 }] },
  };
}

function PlanCard({ id, a, featured, photo }: { id: PlanId; a: Dictionary["about"]; featured: boolean; photo?: { src: string; alt: string } }) {
  const p = a.plans[id];
  return (
    <article
      className={`flex h-full flex-col p-6 sm:p-8 ${
        featured ? "border-2 border-gold bg-[radial-gradient(120%_80%_at_0%_0%,#2a2923_0%,#161613_65%)]" : "border border-granite bg-slate"
      }`}
    >
      {featured && (
        <span className="mb-5 self-start bg-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-basalt">
          {a.featured}
        </span>
      )}
      <h3 className={`font-display text-travertine ${featured ? "text-[clamp(2.6rem,6vw,4rem)]" : "text-[clamp(2rem,4vw,2.8rem)]"}`}>
        {p.name}
      </h3>
      <p className="mt-3 max-w-[44ch] leading-relaxed text-pumice">{p.desc}</p>
      <p className="mt-6 flex flex-wrap items-baseline gap-x-2 text-travertine">
        <span className="sr-only">{a.price}: </span>
        <span className="font-display text-3xl">
          <Pending text={a.pricePending} />
        </span>
        <span className="text-sm text-pumice">{p.period}</span>
      </p>
      <ul className="mt-6 space-y-3 text-sm text-travertine/90">
        {p.features.map((f) => (
          <li key={f} className="flex gap-3">
            <Check size={18} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-gold" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {/* Featured card is as tall as the other two stacked: fill it with a real photo on desktop. */}
      {photo && (
        <div className="relative mt-8 hidden min-h-56 flex-1 overflow-hidden border border-granite lg:block">
          <Image src={photo.src} alt={photo.alt} fill sizes="40vw" className="object-cover object-[50%_30%]" />
        </div>
      )}
      <div className="mt-auto pt-8">
        <ButtonLink
          href={waHref(p.wa)}
          variant={featured ? "gold" : "outline"}
          className="w-full sm:w-auto"
          icon={<WhatsappLogo size={20} weight="fill" aria-hidden />}
        >
          {p.cta}
        </ButtonLink>
      </div>
    </article>
  );
}

export default async function AboutPage({ params }: PageProps<"/[lang]/sobre-mi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const a = d.about;
  const followers = lang === "es" ? instagram.followers : instagram.followersEn;
  const [first, ...others] = PLAN_IDS.filter((id) => id === FEATURED_PLAN).concat(PLAN_IDS.filter((id) => id !== FEATURED_PLAN));

  return (
    <main id="main">
      {/* Hero: who he is + real photos */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs tracking-[0.18em] text-gold">{a.handle}</p>
          <h1 className="font-display mt-4 text-balance text-[clamp(3.2rem,9vw,6.5rem)] text-travertine">{a.title}</h1>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-travertine/85 sm:text-lg">{a.intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#planes" icon={<ArrowDown size={18} aria-hidden />}>
              {a.seePlans}
            </ButtonLink>
            <ButtonLink href={site.instagram.url} variant="outline" icon={<InstagramLogo size={20} aria-hidden />}>
              @{site.instagram.handle}
            </ButtonLink>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative ml-auto aspect-[549/640] w-[82%] overflow-hidden border border-granite">
            <Image src={photos.physique.src} alt={photos.physique.alt[lang]} fill priority sizes="(min-width: 1024px) 38vw, 80vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 left-0 aspect-square w-[46%] overflow-hidden border-2 border-gold shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
            <Image src={photos.handstand.src} alt={photos.handstand.alt[lang]} fill priority sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Facts */}
      <section aria-label={a.handle} className="mt-8 border-y border-granite bg-slate">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
          {a.stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-8 sm:px-6 lg:px-10 lg:py-10 ${i % 2 === 1 ? "border-l border-granite" : ""} ${
                i > 1 ? "border-t border-granite lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              {/* dt first for screen readers; shown value-first */}
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-pumice">{s.label}</dt>
                <dd className="font-display text-[clamp(2rem,5vw,3rem)] text-gold">{s.value.replace("{followers}", followers)}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-travertine">{a.bioTitle}</h2>
          <div className="mt-8 border-l-2 border-gold pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pumice">{a.mottoLabel}</p>
            <p className="font-display mt-2 text-[clamp(1.8rem,4vw,2.6rem)] italic text-gold" translate="no" lang="la">
              {a.motto}
            </p>
            <p className="mt-1 text-sm text-pumice">{a.mottoMeaning}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
          {a.bio.map((p) => (
            <p key={p} className="mb-5 text-lg leading-relaxed text-travertine/85">
              {p}
            </p>
          ))}
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-pumice">{a.specialtiesTitle}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {a.specialties.map((s) => (
              <li key={s} className="border border-flint px-3 py-2 text-sm text-travertine">
                {s}
              </li>
            ))}
          </ul>
          <figure className="mt-12">
            <blockquote className="font-display text-[clamp(2.2rem,5.5vw,3.6rem)] italic leading-[1.05] text-travertine">
              «{a.quote}»
            </blockquote>
            <figcaption className="mt-3 font-mono text-xs tracking-[0.18em] text-gold">{a.quoteBy}</figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Instagram gallery */}
      <section className="border-t border-granite">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-travertine">{a.galleryTitle}</h2>
              <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-pumice sm:text-lg">{a.galleryIntro}</p>
            </div>
            <ButtonLink href={site.instagram.url} variant="outline" icon={<InstagramLogo size={20} aria-hidden />} className="self-start lg:self-auto">
              {a.galleryCta}
            </ButtonLink>
          </Reveal>
          <ul className="mt-12 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
            {gallery.map((ph, i) => (
              <li key={ph.src} className="mb-3 break-inside-avoid sm:mb-4">
                <Reveal delay={(i % 4) * 0.05}>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative overflow-hidden border border-granite" style={{ aspectRatio: `${ph.width} / ${ph.height}` }}>
                      <Image
                        src={ph.src}
                        alt={ph.alt[lang]}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-pumice group-hover:text-gold">
                      {ph.caption[lang]}
                    </p>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plans */}
      <section id="planes" className="border-t border-granite bg-slate">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-balance text-[clamp(2.6rem,7vw,5rem)] text-travertine">{a.plansTitle}</h2>
            <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-pumice sm:text-lg">{a.plansIntro}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
            <Reveal className="lg:col-span-7 lg:row-span-2">
              <PlanCard id={first} a={a} featured photo={{ src: photos.physiquePark.src, alt: photos.physiquePark.alt[lang] }} />
            </Reveal>
            {others.map((id, i) => (
              <Reveal key={id} delay={0.08 * (i + 1)} className="lg:col-span-5">
                <PlanCard id={id} a={a} featured={false} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-travertine">
            {a.notSure}
            <Link href={testPath(lang)} className="inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline-offset-4 hover:underline">
              {d.test.cta} <ArrowRight size={16} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="relative isolate overflow-hidden">
        <Image src={photos.planche.src} alt="" fill sizes="100vw" className="-z-10 object-cover object-[50%_60%] blur-[2px]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-basalt/85" />
        <Reveal className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
          <h2 className="font-display text-[clamp(3rem,9vw,6rem)] text-travertine">{a.ctaTitle}</h2>
          <p className="max-w-[48ch] text-lg text-travertine/85">{a.ctaBody}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={waHref(d.hero.wa)} icon={<WhatsappLogo size={20} weight="fill" aria-hidden />}>
              {d.cta.whatsapp}
            </ButtonLink>
            <ButtonLink href={testPath(lang)} variant="outline" icon={<ArrowRight size={18} aria-hidden />}>
              {d.test.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </section>
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} />
    </main>
  );
}
