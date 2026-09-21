import Image from "next/image";
import Link from "next/link";

export type PostCardData = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
  minutesLabel: string;
  cover: string;
  coverAlt: string;
};

// `wide`: horizontal layout for the featured article (image left, text right on desktop).
export function PostCard({ p, wide = false, featuredLabel, readLabel }: { p: PostCardData; wide?: boolean; featuredLabel?: string; readLabel: string }) {
  return (
    <Link href={p.href} className={`group grid gap-6 ${wide ? "lg:grid-cols-12 lg:items-center lg:gap-10" : ""}`}>
      <div className={`relative aspect-[3/2] overflow-hidden border border-granite bg-slate ${wide ? "lg:col-span-7" : ""}`}>
        <Image
          src={p.cover}
          alt={p.coverAlt}
          fill
          priority={wide}
          sizes={wide ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={wide ? "lg:col-span-5" : ""}>
        <p className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
          {featuredLabel && <span className="bg-gold px-2 py-1 text-basalt">{featuredLabel}</span>}
          <span className="text-gold">{p.categoryLabel}</span>
          <span className="font-mono font-normal normal-case tracking-normal text-pumice">{p.minutesLabel}</span>
        </p>
        <h3
          className={`font-display mt-3 text-balance text-travertine transition-colors group-hover:text-gold ${
            wide ? "text-[clamp(2.4rem,5vw,4rem)]" : "text-[clamp(1.9rem,3.2vw,2.4rem)]"
          }`}
        >
          {p.title}
        </h3>
        <p className="mt-3 max-w-[52ch] leading-relaxed text-pumice">{p.excerpt}</p>
        {wide && <p className="mt-6 text-sm font-semibold uppercase tracking-[0.1em] text-travertine group-hover:text-gold">{readLabel}</p>}
      </div>
    </Link>
  );
}
