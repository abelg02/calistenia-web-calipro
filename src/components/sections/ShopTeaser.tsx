import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { allProductCards } from "@/content/shop-cards";
import { shopPath } from "@/lib/routes";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

// Home preview of the shop: one featured piece + the rest as a compact list (different layout
// family from the skills row on purpose).
export function ShopTeaser({
  lang,
  m,
  shop,
  id,
}: {
  lang: Locale;
  m: Dictionary["merch"];
  shop: Dictionary["shop"];
  id: string;
}) {
  const [featured, ...rest] = allProductCards(lang, shop);

  return (
    <section id={id} className="border-t border-granite">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-travertine">{m.title}</h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-pumice sm:text-lg">{m.intro}</p>
          <p className="mt-3 text-sm text-pumice">
            <Pending text={shop.sampleNote} />
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link href={featured.href} className="group relative block aspect-[4/5] overflow-hidden border border-granite bg-slate sm:aspect-[5/4]">
              <Image
                src={featured.cover}
                alt=""
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-basalt via-basalt/70 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{featured.categoryLabel}</p>
                <p className="font-display mt-2 text-[clamp(2.2rem,5vw,3.4rem)] text-travertine">{featured.name}</p>
                <p className="mt-2 max-w-[44ch] text-sm text-travertine/80">{featured.short}</p>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <ul className="flex flex-col gap-4">
              {rest.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={0.06 * (i + 1)}>
                    <Link href={p.href} className="group grid grid-cols-[6rem_1fr] items-center gap-5 border border-granite bg-slate p-3 transition-colors hover:border-gold sm:grid-cols-[7.5rem_1fr]">
                      <div className="relative aspect-square overflow-hidden bg-basalt">
                        <Image src={p.cover} alt="" fill sizes="120px" className={p.is3d ? "object-contain p-2" : "object-cover"} />
                        {p.is3d && (
                          <span className="absolute left-1 top-1 bg-gold px-1.5 py-0.5 font-mono text-[10px] font-semibold text-basalt">
                            {shop.badge3d}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pumice">{p.categoryLabel}</p>
                        <p className="font-display mt-1 text-[clamp(1.6rem,3vw,2rem)] text-travertine transition-colors group-hover:text-gold">
                          {p.name}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Link
              href={shopPath(lang)}
              className="mt-auto inline-flex min-h-14 items-center justify-center gap-2.5 bg-gold px-6 text-sm font-semibold uppercase tracking-[0.08em] text-basalt transition-colors hover:bg-gold-soft active:translate-y-px"
            >
              {m.cta}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
