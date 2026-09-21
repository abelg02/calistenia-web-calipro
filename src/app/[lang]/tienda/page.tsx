import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { allProductCards } from "@/content/shop-cards";
import { shopPath } from "@/lib/routes";
import { waHref } from "@/lib/contact";
import { Pending } from "@/components/ui/Pending";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { PromoCodes } from "@/components/sections/PromoCodes";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

// Served at /es/tienda and, through a rewrite, /en/shop.
export async function generateMetadata({ params }: PageProps<"/[lang]/tienda">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang);
  return {
    title: d.shop.metaTitle,
    description: d.shop.intro,
    alternates: { canonical: shopPath(lang), languages: { es: shopPath("es"), en: shopPath("en") } },
  };
}

export default async function ShopPage({ params }: PageProps<"/[lang]/tienda">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const s = d.shop;

  return (
    <main id="main">
      <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pb-28 lg:pt-36">
        <div className="max-w-4xl">
          <h1 className="font-display text-balance text-[clamp(3rem,9vw,7rem)] text-travertine">{s.title}</h1>
          <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-pumice sm:text-lg">{s.intro}</p>
          <p className="mt-3 text-sm text-pumice">
            <Pending text={s.sampleNote} />
          </p>
        </div>
        <div className="mt-12 lg:mt-16">
          <ShopBrowser
            cards={allProductCards(lang, s)}
            categories={s.categories}
            labels={{ filter: s.filterLabel, empty: s.empty, sample: s.sample, badge3d: s.badge3d }}
          />
        </div>
      </section>
      <PromoCodes c={d.codes} id={d.ids.codes} />
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} />
    </main>
  );
}
