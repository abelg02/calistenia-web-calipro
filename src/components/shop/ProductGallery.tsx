"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, Cube } from "@phosphor-icons/react";
import type { GalleryItem } from "@/content/products";
import type { Locale } from "@/i18n/config";
import { ProductViewer3D, type ViewerLabels } from "./ProductViewer3D";

type Labels = ViewerLabels & { prev: string; next: string; showItem: string; view3d: string };

// Swipeable gallery (scroll-snap) with arrows and thumbnails. On a 3D slide, horizontal drags
// rotate the model, so arrows/thumbnails are the way to move on from it.
export function ProductGallery({
  items,
  lang,
  name,
  labels,
}: {
  items: GalleryItem[];
  lang: Locale;
  name: string;
  labels: Labels;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const many = items.length > 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !many) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setIndex(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root: track, threshold: 0.6 },
    );
    track.querySelectorAll("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [many]);

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const n = (i + items.length) % items.length;
    track.scrollTo({ left: n * track.clientWidth, behavior: "smooth" });
    setIndex(n);
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto border border-granite bg-slate [scrollbar-width:none] sm:aspect-square lg:aspect-[4/5]"
          aria-roledescription="carousel"
          aria-label={name}
        >
          {items.map((item, i) => (
            <div
              key={i}
              data-index={i}
              className="relative h-full w-full shrink-0 snap-center"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt[lang]}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <ProductViewer3D src={item.src} orbit={item.orbit} poster={item.poster} alt={name} labels={labels} />
              )}
            </div>
          ))}
        </div>
        {many && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={labels.prev}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-basalt/75 text-travertine transition-colors hover:bg-gold hover:text-basalt"
            >
              <CaretLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={labels.next}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-basalt/75 text-travertine transition-colors hover:bg-gold hover:text-basalt"
            >
              <CaretRight size={20} aria-hidden />
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="mt-3 flex gap-2">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={labels.showItem.replace("{n}", String(i + 1))}
              aria-current={i === index}
              className={`relative aspect-square w-16 overflow-hidden border-2 transition-colors sm:w-20 ${
                i === index ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {item.type === "image" ? (
                <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-slate text-gold">
                  <Cube size={24} aria-hidden />
                  <span className="sr-only">{labels.view3d}</span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
