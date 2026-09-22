import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { instagram, photos } from "@/content/about";
import { aboutPath } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

// Home: the person behind CaliPro, with his real photos (the site had none before).
export function AboutTeaser({ lang, a, id }: { lang: Locale; a: Dictionary["about"]; id: string }) {
  const followers = lang === "es" ? instagram.followers : instagram.followersEn;
  const facts = a.stats.slice(0, 3);

  return (
    <section id={id} className="border-t border-granite">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10 lg:py-28">
        <Reveal className="relative lg:col-span-6">
          <div className="grid grid-cols-[1.15fr_1fr] items-end gap-3 sm:gap-4">
            <div className="relative aspect-[360/640] overflow-hidden border border-granite">
              <Image src={photos.weighted.src} alt={photos.weighted.alt[lang]} fill sizes="(min-width: 1024px) 26vw, 50vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative aspect-square overflow-hidden border-2 border-gold">
                <Image src={photos.handstand.src} alt={photos.handstand.alt[lang]} fill sizes="(min-width: 1024px) 22vw, 42vw" className="object-cover" />
              </div>
              <div className="relative aspect-[360/640] max-h-72 overflow-hidden border border-granite">
                <Image src={photos.planche.src} alt={photos.planche.alt[lang]} fill sizes="(min-width: 1024px) 22vw, 42vw" className="object-cover object-[50%_65%]" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
          <p className="font-mono text-xs tracking-[0.18em] text-gold">{a.handle}</p>
          <h2 className="font-display mt-4 text-[clamp(3rem,8vw,5.5rem)] text-travertine">{a.homeTitle}</h2>
          <p className="font-display mt-2 text-balance text-[clamp(1.8rem,4vw,2.6rem)] italic leading-[1.1] text-gold">{a.title}</p>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-travertine/85 sm:text-lg">{a.homeBody}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-granite py-5">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-snug text-pumice">{f.label}</dt>
                <dd className="font-display text-[clamp(1.5rem,3.4vw,2.2rem)] text-travertine">{f.value.replace("{followers}", followers)}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={aboutPath(lang)} className="mt-8" icon={<ArrowRight size={18} aria-hidden />}>
            {a.homeCta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
