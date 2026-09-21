import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal } from "@/components/ui/Reveal";

export function TrustBar({ items }: { items: Dictionary["trust"] }) {
  return (
    <section aria-label="CaliPro" className="border-y border-granite bg-slate">
      <ul className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={item.value}
            className={`px-4 py-8 sm:px-6 lg:px-10 lg:py-10 ${i % 2 === 1 ? "border-l border-granite" : ""} ${
              i > 1 ? "border-t border-granite lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <Reveal delay={i * 0.06}>
              <p className="font-display text-[clamp(1.7rem,5vw,2.6rem)] text-travertine">
                {i === 0 ? <span className="text-gold">{item.value}</span> : item.value}
              </p>
              <p className="mt-2 max-w-[22ch] text-sm leading-snug text-pumice">{item.label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
