import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { waHref } from "@/lib/contact";
import { testPath } from "@/lib/routes";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Method } from "@/components/sections/Method";
import { SkillsTeaser } from "@/components/sections/SkillsTeaser";
import { ShopTeaser } from "@/components/sections/ShopTeaser";
import { DiaryTeaser } from "@/components/sections/DiaryTeaser";
import { PromoCodes } from "@/components/sections/PromoCodes";
import { FinalCta } from "@/components/sections/FinalCta";

// Header and footer come from [lang]/layout.tsx.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);

  return (
    <>
      <main id="main">
        <Hero hero={d.hero} cta={d.cta} />
        <TrustBar items={d.trust} />
        <Services s={d.services} id={d.ids.services} lang={lang} />
        <Method m={d.method} id={d.ids.method} testHref={testPath(lang)} testCta={d.test.cta} />
        <SkillsTeaser lang={lang} s={d.skills} test={d.test} id={d.ids.skills} />
        <ShopTeaser lang={lang} m={d.merch} shop={d.shop} id={d.ids.merch} />
        <DiaryTeaser lang={lang} t={d.diary} id={d.ids.diary} />
        <PromoCodes c={d.codes} id={d.ids.codes} />
        <FinalCta f={d.final} cta={d.cta} id={d.ids.contact} />
      </main>
      <WhatsAppFab href={waHref(d.hero.wa)} label={d.fab} heroId="top" contactId={d.ids.contact} />
    </>
  );
}
