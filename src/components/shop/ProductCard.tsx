import Image from "next/image";
import Link from "next/link";
import { Pending } from "@/components/ui/Pending";

export type ProductCardData = {
  slug: string;
  href: string;
  name: string;
  short: string;
  categoryLabel: string;
  cover: string;
  is3d: boolean;
  sample: boolean;
  price: string;
};

export function ProductCard({ p, labels, priority = false }: { p: ProductCardData; labels: { sample: string; badge3d: string }; priority?: boolean }) {
  return (
    <Link href={p.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden border border-granite bg-slate">
        <Image
          src={p.cover}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${p.is3d ? "object-contain p-6" : "object-cover"}`}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {p.is3d && <span className="bg-gold px-2 py-1 font-mono text-[11px] font-semibold text-basalt">{labels.badge3d}</span>}
          {p.sample && (
            <span className="border border-flint bg-basalt/70 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-pumice">
              {labels.sample}
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pumice">{p.categoryLabel}</p>
          <h3 className="font-display mt-1 text-[clamp(1.7rem,3vw,2.2rem)] text-travertine transition-colors group-hover:text-gold">
            {p.name}
          </h3>
        </div>
        <p className="mt-5 shrink-0 text-sm text-travertine">
          <Pending text={p.price} />
        </p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-pumice">{p.short}</p>
    </Link>
  );
}
