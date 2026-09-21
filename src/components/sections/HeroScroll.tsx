"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type Props = {
  poster: string;
  video: { desktop: string; mobile: string };
  children: ReactNode;
};

const noopSubscribe = () => () => {};
const isSaveData = () =>
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

// Scroll-driven walk through the park: the section is ~3 screens tall, the media stays pinned,
// and scroll progress drives the video's currentTime (scroll down = walk forward, up = back).
// Videos are encoded with short GOPs (keyframe every 12 / 6 frames) so seeking stays smooth.
// Reduced motion or Data Saver: static photo, normal-height hero, no video download.
export function HeroScroll({ poster, video, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const reduce = useReducedMotion();
  const saveData = useSyncExternalStore(noopSubscribe, isSaveData, () => false);
  const isMobile = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
  // Not decided until hydration (server snapshot: saveData false, reduce null).
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const isStatic = hydrated && (reduce === true || saveData);
  const withVideo = hydrated && !isStatic;
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Light smoothing so wheel steps glide instead of jumping frame to frame.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // Function transforms on purpose: Motion hands range-mapped opacity to a native ScrollTimeline,
  // which drifted here (copy came back at 70%). Functions always run on the main thread.
  const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
  const copyOpacity = useTransform(scrollYProgress, (p) => 1 - clamp01(p / 0.16));
  const copyY = useTransform(scrollYProgress, (p) => -60 * clamp01(p / 0.16));
  const scrimOpacity = useTransform(scrollYProgress, (p) => 1 - 0.65 * clamp01(p / 0.2));

  useMotionValueEvent(progress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    targetTime.current = Math.min(Math.max(p, 0), 1) * (v.duration - 0.05);
    // Only issue a new seek when the previous one finished: avoids a queue of stale seeks.
    if (!v.seeking) v.currentTime = targetTime.current;
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!withVideo || !v) return;
    const onSeeked = () => {
      if (Math.abs(v.currentTime - targetTime.current) > 0.04) v.currentTime = targetTime.current;
    };
    const onLoaded = () => {
      // iOS only decodes frames for seeking after a play() call; muted autoplay is allowed.
      v.play()
        .then(() => v.pause())
        .catch(() => {})
        .finally(() => {
          v.currentTime = targetTime.current;
          setVideoReady(true);
        });
    };
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("loadeddata", onLoaded);
    if (v.readyState >= 2) onLoaded();
    return () => {
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("loadeddata", onLoaded);
    };
  }, [withVideo, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className={`relative isolate ${isStatic ? "" : "h-[300svh]"} motion-reduce:h-auto`}
    >
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover object-[35%_center] md:object-center" />
          {withVideo && (
            <video
              ref={videoRef}
              key={isMobile ? "m" : "d"}
              src={isMobile ? video.mobile : video.desktop}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className={`absolute inset-0 h-full w-full object-cover object-[35%_center] transition-opacity duration-700 md:object-center ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {/* Scrims: strong while the headline is on screen, lighter once the walk starts. */}
          <motion.div style={{ opacity: isStatic ? 1 : scrimOpacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-basalt via-basalt/40 to-basalt/0" />
            <div className="absolute inset-0 bg-gradient-to-r from-basalt/70 via-basalt/15 to-transparent" />
          </motion.div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-basalt/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-basalt to-transparent" />
        </div>

        <motion.div
          style={isStatic ? undefined : { opacity: copyOpacity, y: copyY }}
          className="mx-auto w-full max-w-[1400px] px-4 pb-14 pt-28 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24"
        >
          {children}
        </motion.div>

        {!isStatic && (
          <motion.span
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold"
          />
        )}
      </div>
    </section>
  );
}
