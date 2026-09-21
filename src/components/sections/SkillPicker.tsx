"use client";

import { useState } from "react";
import { Phone, WhatsappLogo } from "@phosphor-icons/react";
import { telHref, waHref } from "@/lib/contact";

// Picking a skill rewrites the WhatsApp message, so the first message already says what they want.
export function SkillPicker({
  label,
  skills,
  template,
  waLabel,
  callLabel,
}: {
  label: string;
  skills: string[];
  template: string;
  waLabel: string;
  callLabel: string;
}) {
  const [skill, setSkill] = useState(skills[0]);

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold text-travertine">{label}</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => {
            const selected = s === skill;
            return (
              <label
                key={s}
                className={`flex min-h-11 cursor-pointer items-center border px-4 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                  selected ? "border-gold bg-gold/15 text-gold" : "border-flint text-travertine hover:border-pumice"
                }`}
              >
                <input
                  type="radio"
                  name="skill"
                  value={s}
                  checked={selected}
                  onChange={() => setSkill(s)}
                  className="sr-only"
                />
                {s}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={waHref(template.replace("{skill}", skill))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap bg-gold px-6 text-sm font-semibold uppercase tracking-[0.08em] text-basalt transition-colors hover:bg-gold-soft active:translate-y-px"
        >
          <WhatsappLogo size={20} weight="fill" aria-hidden />
          {waLabel}
        </a>
        <a
          href={telHref}
          className="inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap border border-travertine/70 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-travertine transition-colors hover:border-gold hover:text-gold active:translate-y-px"
        >
          <Phone size={20} aria-hidden />
          {callLabel}
        </a>
      </div>
    </div>
  );
}
