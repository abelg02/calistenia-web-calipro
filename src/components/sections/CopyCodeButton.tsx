"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export function CopyCodeButton({ code, label, copiedLabel }: { code: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Older browsers / insecure contexts: fall back to a hidden textarea.
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors active:translate-y-px ${
        copied ? "bg-travertine text-basalt" : "bg-gold text-basalt hover:bg-gold-soft"
      }`}
    >
      {copied ? <Check size={18} weight="bold" aria-hidden /> : <Copy size={18} aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
