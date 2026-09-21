import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/config/site";
import { waHref } from "@/lib/contact";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "../globals.css";

// Archivo with its width axis: condensed cut for display, normal width for body.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono-geist", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#0e0e0c", colorScheme: "dark" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: d.meta.title,
    description: d.meta.description,
    alternates: { canonical: `/${lang}`, languages: { es: "/es", en: "/en" } },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      images: [{ url: "/images/hero-parque.jpg", width: 2048, height: 1152 }],
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  return (
    <html lang={lang} className={`${archivo.variable} ${mono.variable}`}>
      <body className="grain min-h-dvh bg-basalt">
        <MotionProvider>
          <SiteHeader lang={lang} nav={d.nav} ids={d.ids} cta={d.cta} waHref={waHref(d.hero.wa)} />
          {children}
          <SiteFooter lang={lang} d={d} />
        </MotionProvider>
      </body>
    </html>
  );
}
