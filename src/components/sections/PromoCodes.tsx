import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { promoCodes } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { CopyCodeButton } from "./CopyCodeButton";

// Ticket-style coupons: big discount stub on the left, code + actions on the right.
export function PromoCodes({ c, id }: { c: Dictionary["codes"]; id: string }) {
  return (
    <section id={id} className="border-y border-granite bg-slate">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <Reveal>
          <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-travertine">{c.title}</h2>
          <p className="mt-4 text-base text-pumice sm:text-lg">{c.intro}</p>
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {promoCodes.map((p, i) => (
            <li key={p.code}>
              <Reveal delay={i * 0.08} className="grid h-full grid-cols-[auto_1fr] border border-flint bg-basalt">
                <div className="relative flex flex-col justify-center border-r border-dashed border-flint px-5 py-6 sm:px-8">
                  <p className="font-display text-[clamp(3.5rem,10vw,5.5rem)] text-gold">{p.discount}%</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-pumice">{c.off}</p>
                  {/* ticket notches: the only round shapes on the page, on purpose (punched holes) */}
                  <span aria-hidden className="absolute -right-[9px] -top-[9px] h-4 w-4 rounded-full border border-flint bg-slate" />
                  <span aria-hidden className="absolute -bottom-[9px] -right-[9px] h-4 w-4 rounded-full border border-flint bg-slate" />
                </div>
                <div className="flex min-w-0 flex-col gap-4 p-5 sm:p-8">
                  <p className="font-display text-3xl text-travertine">{p.store}</p>
                  <p className="text-sm text-pumice">
                    {c.code}{" "}
                    <span className="ml-1 border border-flint px-2 py-1 font-mono text-base tracking-wider text-travertine">
                      {p.code}
                    </span>
                  </p>
                  <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                    <CopyCodeButton code={p.code} label={c.copy} copiedLabel={c.copied} />
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 border border-flint px-5 text-sm font-semibold uppercase tracking-[0.08em] text-travertine transition-colors hover:border-gold hover:text-gold"
                    >
                      {c.store}
                      <ArrowUpRight size={16} aria-hidden />
                    </a>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
