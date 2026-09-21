import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Pending } from "@/components/ui/Pending";

export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await Promise.all(
    locales.map(async (lang) => (await getDictionary(lang)).footer.legal.map((l) => ({ lang, doc: l.slug }))),
  );
  return all.flat();
}

export async function generateMetadata({ params }: PageProps<"/[lang]/legal/[doc]">) {
  const { lang, doc } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang);
  const page = d.footer.legal.find((l) => l.slug === doc);
  return { title: page ? `${page.label} | CaliPro` : "CaliPro", robots: { index: false } };
}

// Placeholder legal pages: the real texts need the owner's data (see CLAUDE.md, rule 6).
export default async function LegalPage({ params }: PageProps<"/[lang]/legal/[doc]">) {
  const { lang, doc } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const page = d.footer.legal.find((l) => l.slug === doc);
  if (!page) notFound();

  return (
    <main id="main" className="mx-auto min-h-dvh max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <Link
        href={`/${lang}`}
        className="inline-flex min-h-11 items-center gap-2 text-sm text-pumice transition-colors hover:text-gold"
      >
        <ArrowLeft size={16} aria-hidden /> {d.legalPage.back}
      </Link>
      <h1 className="font-display mt-8 text-[clamp(2.6rem,8vw,4.5rem)] text-travertine">{page.label}</h1>
      <p className="mt-8 leading-relaxed text-pumice">
        <Pending text={d.legalPage.body} />
      </p>
    </main>
  );
}
