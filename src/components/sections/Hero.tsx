import { Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { telHref, waHref } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroEntrance } from "./HeroEntrance";
import { HeroScroll } from "./HeroScroll";

// Hero = scroll-driven walk through the park (HeroScroll) with the headline on top.
// Footage: 3 real views of the same park (cal1, cal3, cal2 relit with APIMart) joined by two
// Seedance clips that share their seam frame. Sources live in Assets/generated/recorrido-*.
// A future full scroll-world build (fase 5, costs money, see CLAUDE.md) would replace the
// <HeroScroll> media layer only; keep the poster as the reduced-motion fallback.
export function Hero({ hero, cta }: { hero: Dictionary["hero"]; cta: Dictionary["cta"] }) {
  return (
    <HeroScroll
      poster="/images/recorrido-poster.jpg"
      video={{ desktop: "/video/recorrido-parque.mp4", mobile: "/video/recorrido-parque-movil.mp4" }}
    >
      <HeroEntrance>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{hero.brand}</p>
        <h1 className="font-display text-balance text-[clamp(3rem,10.5vw,6.25rem)] text-travertine">
          <span className="block">{hero.titleA}</span>
          <span className="block">
            {hero.titleB} <em className="inline-block pb-1 italic text-gold">{hero.titleEm}</em>
          </span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-travertine/85 sm:text-lg">{hero.sub}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={waHref(hero.wa)} icon={<WhatsappLogo size={20} weight="fill" aria-hidden />}>
            {cta.whatsapp}
          </ButtonLink>
          <ButtonLink href={telHref} variant="outline" icon={<Phone size={20} aria-hidden />}>
            {cta.call}
          </ButtonLink>
        </div>
      </HeroEntrance>
    </HeroScroll>
  );
}
