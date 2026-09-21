"use client";

import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { waHref } from "@/lib/contact";

// Size picker (apparel only) + WhatsApp order with the product and size already written.
export function ProductOrder({
  sizes,
  message,
  sizeTemplate,
  labels,
}: {
  sizes?: string[];
  message: string;
  sizeTemplate: string;
  labels: { size: string; pickSize: string; order: string; note: string };
}) {
  const [size, setSize] = useState<string | null>(null);
  const needsSize = Boolean(sizes?.length);
  const ready = !needsSize || size !== null;
  const text = size ? message + sizeTemplate.replace("{size}", size) : message;

  return (
    <div>
      {needsSize && (
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-pumice">{labels.size}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes!.map((s) => {
              const on = s === size;
              return (
                <label
                  key={s}
                  className={`flex h-12 min-w-12 cursor-pointer items-center justify-center border px-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                    on ? "border-gold bg-gold text-basalt" : "border-flint text-travertine hover:border-pumice"
                  }`}
                >
                  <input type="radio" name="size" value={s} checked={on} onChange={() => setSize(s)} className="sr-only" />
                  {s}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {ready ? (
        <a
          href={waHref(text)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex min-h-14 items-center justify-center gap-2.5 bg-gold px-6 text-sm font-semibold uppercase tracking-[0.08em] text-basalt transition-colors hover:bg-gold-soft active:translate-y-px"
        >
          <WhatsappLogo size={20} weight="fill" aria-hidden />
          {labels.order}
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-6 flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-2.5 border border-flint px-6 text-sm font-semibold uppercase tracking-[0.08em] text-pumice"
        >
          {labels.pickSize}
        </button>
      )}
      <p className="mt-3 text-sm leading-relaxed text-pumice">{labels.note}</p>
    </div>
  );
}
