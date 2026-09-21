"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Cube, HandGrabbing } from "@phosphor-icons/react";

type Status = "idle" | "loading" | "ready" | "error";
export type ViewerLabels = { hint: string; ar: string; loading: string; error: string };

// model-viewer (~250KB) is only fetched when the stage scrolls near the viewport.
// The poster stays visible until the model has loaded, so the slot is never empty.
export function ProductViewer3D({
  src,
  orbit,
  poster,
  alt,
  labels,
}: {
  src: string;
  orbit: string;
  poster: string;
  alt: string;
  labels: ViewerLabels;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement>(null);
  const [libReady, setLibReady] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStatus("loading");
        import("@google/model-viewer")
          .then(() => setLibReady(true))
          .catch(() => setStatus("error"));
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!libReady || !viewer) return;
    const onLoad = () => setStatus("ready");
    const onError = () => setStatus("error");
    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("error", onError);
    // A cached model can finish before the listener is attached.
    if ((viewer as HTMLElement & { loaded?: boolean }).loaded) setStatus("ready");
    return () => {
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("error", onError);
    };
  }, [libReady, src]);

  return (
    <div ref={stageRef} className="relative h-full w-full bg-[radial-gradient(80%_70%_at_50%_40%,#2b2a24_0%,#141411_70%)]">
      {status !== "ready" && (
        <Image src={poster} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" />
      )}
      {libReady && (
        <model-viewer
          ref={viewerRef}
          key={src}
          src={src}
          alt={alt}
          camera-controls
          auto-rotate
          auto-rotate-delay="1500"
          rotation-per-second="18deg"
          camera-orbit={orbit}
          touch-action="pan-y"
          interaction-prompt="none"
          shadow-intensity="1.1"
          shadow-softness="0.8"
          exposure="1.05"
          environment-image="neutral"
          ar
          ar-modes="webxr scene-viewer quick-look"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", outline: "none" }}
        >
          <button
            slot="ar-button"
            type="button"
            className="absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 bg-travertine px-4 text-xs font-semibold uppercase tracking-[0.1em] text-basalt"
          >
            <Cube size={18} aria-hidden />
            {labels.ar}
          </button>
        </model-viewer>
      )}
      {status === "loading" && (
        <p role="status" className="absolute left-4 top-4 bg-basalt/70 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-pumice">
          {labels.loading}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="absolute inset-x-4 top-4 bg-basalt/80 px-3 py-2 text-sm text-pumice">
          {labels.error}
        </p>
      )}
      <p className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 text-xs text-pumice">
        <HandGrabbing size={16} aria-hidden />
        {labels.hint}
      </p>
    </div>
  );
}
