"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { List, WhatsappLogo, X } from "@phosphor-icons/react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import { aboutPath, alternatePath, diaryPath, homeAnchor, homePath, shopPath, skillsPath } from "@/lib/routes";

type Props = {
  lang: Locale;
  nav: Dictionary["nav"];
  ids: Dictionary["ids"];
  cta: Dictionary["cta"];
  waHref: string;
};

// z-index scale: header 40, mobile menu 50, grain 60 (globals.css), fab 30.
export function SiteHeader({ lang, nav, ids, cta, waHref }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  // Solid background fades in after the first ~120px so the hero photo stays clean on load.
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  const pathname = usePathname();
  // Anchors point at the home page so they also work from the skills and shop pages.
  const links = [
    { href: homeAnchor(lang, ids.services), label: nav.services },
    { href: skillsPath(lang), label: nav.skills },
    { href: shopPath(lang), label: nav.shop },
    { href: diaryPath(lang), label: nav.diary },
    { href: aboutPath(lang), label: nav.about },
    { href: homeAnchor(lang, ids.contact), label: nav.contact },
  ];
  const otherLang = lang === "es" ? "en" : "es";
  const isCurrent = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  // Open menu: lock page scroll, Escape closes, Tab cycles inside the dialog, focus returns
  // to the menu button on close.
  useEffect(() => {
    if (!open) return;
    const dialog = menuRef.current;
    const trigger = triggerRef.current;
    const focusables = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        aria-hidden
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 border-b border-granite bg-basalt/90 backdrop-blur-md"
      />
      <div className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <Link href={homePath(lang)} aria-label={nav.home} className="shrink-0">
          <Image
            src="/images/calipro-logo-letras.webp"
            alt="CaliPro"
            width={513}
            height={160}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className={`text-[13px] font-medium uppercase tracking-[0.12em] transition-colors hover:text-gold ${
                    isCurrent(l.href) ? "text-gold" : "text-travertine/80"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={alternatePath(pathname, otherLang)}
            hrefLang={otherLang}
            aria-label={nav.switchLabel}
            className="flex min-h-11 items-center px-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-travertine/80 transition-colors hover:text-gold"
          >
            {otherLang.toUpperCase()}
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 bg-gold px-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-basalt transition-colors hover:bg-gold-soft sm:inline-flex"
          >
            <WhatsappLogo size={18} weight="fill" aria-hidden />
            {cta.whatsappShort}
          </a>
          <button
            type="button"
            ref={triggerRef}
            onClick={() => setOpen(true)}
            aria-label={nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center text-travertine lg:hidden"
          >
            <List size={26} aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={nav.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-basalt px-4 pb-8 sm:px-6 lg:hidden"
          >
            <div className="flex h-16 items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={nav.close}
                className="flex h-11 w-11 items-center justify-center text-travertine"
              >
                <X size={26} aria-hidden />
              </button>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-5xl text-travertine transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-2.5 bg-gold text-sm font-semibold uppercase tracking-[0.08em] text-basalt"
            >
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              {cta.whatsapp}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
