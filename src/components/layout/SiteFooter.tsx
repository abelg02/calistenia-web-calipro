import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, InstagramLogo, Phone, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import { phonePending, site } from "@/config/site";
import { mailHref, telHref, waHref } from "@/lib/contact";
import { diaryPath, homeAnchor, shopPath, skillsPath, testPath } from "@/lib/routes";
import { Pending } from "@/components/ui/Pending";

type Props = { lang: Locale; d: Dictionary };

export function SiteFooter({ lang, d }: Props) {
  const { footer, nav, ids } = d;
  const explore = [
    { href: homeAnchor(lang, ids.services), label: nav.services },
    { href: homeAnchor(lang, ids.method), label: nav.method },
    { href: skillsPath(lang), label: nav.skills },
    { href: shopPath(lang), label: nav.shop },
    { href: testPath(lang), label: nav.test },
    { href: diaryPath(lang), label: nav.diary },
    { href: homeAnchor(lang, ids.codes), label: nav.codes },
    { href: homeAnchor(lang, ids.contact), label: nav.contact },
  ];
  const linkClass = "inline-flex min-h-11 items-center gap-2.5 text-travertine/85 transition-colors hover:text-gold";

  return (
    <footer className="border-t border-granite bg-basalt">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-20">
        <div className="lg:col-span-4">
          <Image
            src="/images/calipro-logo.jpg"
            alt={footer.logoAlt}
            width={1000}
            height={446}
            sizes="(min-width: 1024px) 360px, 80vw"
            className="w-full max-w-[360px]"
          />
          <p className="mt-6 max-w-[34ch] text-pumice">{footer.tagline}</p>
        </div>

        <nav aria-label={footer.exploreTitle} className="lg:col-span-2 lg:col-start-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-pumice">{footer.exploreTitle}</h2>
          <ul className="mt-4">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-pumice">{footer.contactTitle}</h2>
          <ul className="mt-4">
            <li>
              <a href={waHref(d.hero.wa)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <WhatsappLogo size={20} aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a href={telHref} className={linkClass}>
                <Phone size={20} aria-hidden />
                {phonePending ? <Pending text={footer.phonePending} /> : site.phone}
              </a>
            </li>
            <li>
              {mailHref ? (
                <a href={mailHref} className={linkClass}>
                  <EnvelopeSimple size={20} aria-hidden /> {site.email}
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center gap-2.5 text-travertine/85">
                  <EnvelopeSimple size={20} aria-hidden /> <Pending text={footer.emailPending} />
                </span>
              )}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-pumice">{footer.followTitle}</h2>
          <ul className="mt-4">
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <InstagramLogo size={20} aria-hidden /> @{site.instagram.handle}
              </a>
            </li>
            <li>
              <a href={site.tiktok.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <TiktokLogo size={20} aria-hidden /> @{site.tiktok.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-granite">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-6 text-sm text-pumice sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>
            <Pending text={footer.rights} />
          </p>
          <ul className="flex flex-wrap gap-x-6">
            {footer.legal.map((l) => (
              <li key={l.slug}>
                <Link href={`/${lang}/legal/${l.slug}`} className="inline-flex min-h-11 items-center hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
