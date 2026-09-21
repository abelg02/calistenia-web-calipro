import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal } from "@/components/ui/Reveal";
import { SkillPicker } from "./SkillPicker";

export function FinalCta({ f, cta, id }: { f: Dictionary["final"]; cta: Dictionary["cta"]; id: string }) {
  return (
    <section id={id} className="relative isolate overflow-hidden">
      <Image src="/images/hero-parque.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover object-[70%_center]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-basalt/55" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-basalt via-basalt/75 to-basalt/10" />
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-balance text-[clamp(2.8rem,8vw,5.5rem)] text-travertine">{f.title}</h2>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-travertine/85 sm:text-lg">{f.body}</p>
          <div className="mt-10">
            <SkillPicker
              label={f.pickLabel}
              skills={f.skills}
              template={f.wa}
              waLabel={cta.whatsapp}
              callLabel={cta.call}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
