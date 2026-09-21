import Image from "next/image";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { waHref } from "@/lib/contact";
import { shopPath } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

// Asymmetric trio: coaching is the main offer (large photo tile), app + merch stack beside it.
export function Services({ s, id, lang }: { s: Dictionary["services"]; id: string; lang: Locale }) {
  return (
    <section id={id} className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <Reveal className="max-w-3xl">
        <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-travertine">{s.title}</h2>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-pumice sm:text-lg">{s.intro}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:grid-rows-2">
        {/* 1:1 coaching */}
        <Reveal className="relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden p-6 sm:p-10 lg:col-span-7 lg:row-span-2 lg:min-h-[720px]">
          <Image
            src="/images/parque-barras.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="-z-10 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-basalt via-basalt/80 to-basalt/20" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{s.coaching.tag}</p>
          <h3 className="font-display mt-3 text-[clamp(2.4rem,6vw,4rem)] text-travertine">{s.coaching.title}</h3>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-travertine/85">{s.coaching.body}</p>
          <ul className="mt-6 grid gap-2.5 text-sm text-travertine/90 sm:grid-cols-2">
            {s.coaching.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gold" />
                <span>
                  <Pending text={b} />
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={waHref(s.coaching.wa)}
            className="mt-8 self-start"
            icon={<WhatsappLogo size={20} weight="fill" aria-hidden />}
          >
            {s.coaching.cta}
          </ButtonLink>
        </Reveal>

        {/* App (coming soon) */}
        <Reveal
          delay={0.08}
          className="flex flex-col border border-granite bg-[radial-gradient(120%_90%_at_100%_0%,#2a2923_0%,#161613_60%)] p-6 sm:p-10 lg:col-span-5"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pumice">{s.app.tag}</p>
            <span className="border border-gold/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
              {s.app.badge}
            </span>
          </div>
          <h3 className="font-display mt-4 text-[clamp(2rem,4.5vw,3rem)] text-travertine">{s.app.title}</h3>
          <p className="mt-4 leading-relaxed text-pumice">{s.app.body}</p>
          <ul className="mt-5 space-y-2 text-sm text-travertine/90">
            {s.app.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gold" />
                <span>
                  <Pending text={b} />
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink href={waHref(s.app.wa)} variant="outline" className="mt-8 self-start">
            {s.app.cta}
          </ButtonLink>
        </Reveal>

        {/* Merch + codes */}
        <Reveal delay={0.16} className="flex flex-col bg-gold p-6 text-basalt sm:p-10 lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-basalt/70">{s.merch.tag}</p>
          <h3 className="font-display mt-4 text-[clamp(2rem,4.5vw,3rem)]">{s.merch.title}</h3>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-basalt/80">{s.merch.body}</p>
          <div className="mt-auto pt-8">
            <ButtonLink href={shopPath(lang)} variant="ink" icon={<ArrowUpRight size={18} aria-hidden />}>
              {s.merch.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
