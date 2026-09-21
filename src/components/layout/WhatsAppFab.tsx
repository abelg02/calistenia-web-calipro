"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WhatsappLogo } from "@phosphor-icons/react";

// Floating WhatsApp shortcut: hidden over the hero and the contact section (they already show the CTA).
// Pages without them (skills, shop) show it right away.
export function WhatsAppFab({
  href,
  label,
  heroId,
  contactId,
}: {
  href: string;
  label: string;
  heroId?: string;
  contactId?: string;
}) {
  const [overHero, setOverHero] = useState(Boolean(heroId));
  const [overContact, setOverContact] = useState(false);

  useEffect(() => {
    const hero = heroId ? document.getElementById(heroId) : null;
    const contact = contactId ? document.getElementById(contactId) : null;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) setOverHero(e.isIntersecting);
          if (e.target === contact) setOverContact(e.isIntersecting);
        }
      },
      { threshold: 0.15 },
    );
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, [heroId, contactId]);

  const visible = !overHero && !overContact;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex h-14 w-14 items-center justify-center bg-gold text-basalt shadow-[0_10px_30px_-10px_rgba(200,160,74,0.55)] transition-colors hover:bg-gold-soft sm:right-6"
        >
          <WhatsappLogo size={28} weight="fill" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
