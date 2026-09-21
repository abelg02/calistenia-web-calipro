import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MethodSteps } from "./MethodSteps";

// Sticky intro column + scroll-drawn step line. Collapses to a single column under lg.
export function Method({ m, id, testHref, testCta }: { m: Dictionary["method"]; id: string; testHref: string; testCta: string }) {
  return (
    <section id={id} className="border-t border-granite bg-slate">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-32">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-travertine">{m.title}</h2>
              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-pumice sm:text-lg">{m.intro}</p>
              <ButtonLink href={testHref} variant="outline" className="mt-7">
                {testCta}
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.1} className="relative mt-10 aspect-[4/3] overflow-hidden">
              <Image
                src="/images/parque-atardecer.jpg"
                alt={m.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <MethodSteps steps={m.steps} />
        </div>
      </div>
    </section>
  );
}
