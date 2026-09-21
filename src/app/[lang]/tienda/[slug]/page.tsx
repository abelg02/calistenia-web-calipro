import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getProduct, products } from "@/content/products";
import { toProductCard } from "@/content/shop-cards";
import { productPath, shopPath } from "@/lib/routes";
import { waHref } from "@/lib/contact";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductOrder } from "@/components/shop/ProductOrder";
import { ProductCard } from "@/components/shop/ProductCard";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/tienda/[slug]">) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!hasLocale(lang) || !p) return {};
  const t = p.text[lang];
  return {
    title: `${t.name} | CaliPro`,
    description: t.short,
    alternates: { canonical: productPath(lang, slug), languages: { es: productPath("es", slug), en: productPath("en", slug) } },
    openGraph: { images: [{ url: p.cover }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/[lang]/tienda/[slug]">) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!hasLocale(lang) || !p) notFound();
  const d = await getDictionary(lang);
  const s = d.shop;
  const t = p.text[lang];
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 3);

  const specs = [
    { label: s.category, value: s.categories[p.category] },
    { label: s.material, value: s.materialPending },
    ...(p.sizes ? [{ label: s.sizes, value: `${p.sizes.join(", ")} (${s.sample.toLowerCase()})` }] : []),
  ];

  return (
    <main id="main">
      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-20 pt-24 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pt-32">
        <div className="lg:col-span-7">
          <ProductGallery
            items={p.gallery}
            lang={lang}
            name={t.name}
            labels={{
              hint: d.merch.hint,
              ar: d.merch.ar,
              loading: d.merch.loading,
              error: d.merch.error,
              prev: s.prevImage,
              next: s.nextImage,
              showItem: s.showItem,
              view3d: s.view3d,
            }}
          />
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-pumice">
              <Link href={shopPath(lang)} className="inline-flex min-h-11 items-center hover:text-gold">
                {s.breadcrumb}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-travertine">{t.name}</span>
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-pumice">{s.categories[p.category]}</span>
              {p.sample && (
                <span className="border border-flint px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] text-pumice">{s.sample}</span>
              )}
            </div>
            <h1 className="font-display mt-3 text-balance text-[clamp(2.8rem,7vw,5rem)] text-travertine">
              {t.name}
              <span className="text-gold">.</span>
            </h1>
            <p className="mt-4 text-lg text-travertine">
              {s.price}: <Pending text={p.price === null ? s.pending : `${p.price} €`} />
            </p>
            <p className="mt-5 max-w-[48ch] leading-relaxed text-pumice">{t.short}</p>

            <div className="mt-8">
              <ProductOrder
                sizes={p.sizes}
                message={s.orderWa.replace("{product}", t.inMessage)}
                sizeTemplate={s.orderSize}
                labels={{ size: s.size, pickSize: s.pickSize, order: s.order, note: s.orderNote }}
              />
            </div>

            <div className="mt-10 border-t border-granite pt-6">
              <h2 className="text-sm font-semibold text-travertine">{s.details}</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                {specs.map((sp) => (
                  <div key={sp.label} className="grid grid-cols-[8rem_1fr] gap-4">
                    <dt className="text-pumice">{sp.label}</dt>
                    <dd className="text-travertine">
                      <Pending text={sp.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <Link
              href={shopPath(lang)}
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-pumice hover:text-gold"
            >
              <ArrowLeft size={16} aria-hidden /> {s.back}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-granite">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] text-travertine">{s.related}</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ProductCard p={toProductCard(r, lang, s)} labels={{ sample: s.sample, badge3d: s.badge3d }} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} />
    </main>
  );
}
