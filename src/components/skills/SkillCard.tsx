import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { DifficultyMeter } from "@/components/ui/DifficultyMeter";

export type SkillCardData = {
  slug: string;
  href: string;
  code: string;
  name: string;
  levelLabel: string;
  difficulty: number;
  image: string;
  imageAlt: string;
};

// Plain (non-hook) component so it renders from both server pages and the client filter grid.
export function SkillCard({ s, difficultyLabel, priority = false }: { s: SkillCardData; difficultyLabel: string; priority?: boolean }) {
  return (
    <Link href={s.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden border border-granite bg-slate">
        <Image
          src={s.image}
          alt={s.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-basalt/70 text-travertine opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowUpRight size={18} aria-hidden />
        </span>
      </div>
      <p className="mt-4 font-mono text-xs tracking-[0.18em] text-pumice">{s.code}</p>
      <h3 className="font-display mt-1 text-[clamp(1.9rem,3.2vw,2.4rem)] text-travertine transition-colors group-hover:text-gold">
        {s.name}
      </h3>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-granite pt-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-pumice">{s.levelLabel}</span>
        <DifficultyMeter value={s.difficulty} label={difficultyLabel} />
      </div>
    </Link>
  );
}
