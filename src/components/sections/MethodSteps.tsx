"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

type Step = { title: string; body: string };

// The gold line fills as you scroll through the steps: the page literally shows "in order".
export function MethodSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={ref} className="relative ml-2 sm:ml-4">
      <span aria-hidden className="absolute bottom-3 left-0 top-3 w-px bg-granite" />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-3 left-0 top-3 w-px origin-top bg-gold"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
          {/* Text stays at full contrast; only the marker fills in gold as the step is reached. */}
          <motion.span
            aria-hidden
            initial={{ backgroundColor: "#0e0e0c" }}
            whileInView={{ backgroundColor: "#c8a04a" }}
            viewport={{ amount: 1, margin: "0px 0px -30% 0px" }}
            transition={{ duration: 0.4 }}
            className="absolute -left-[5px] top-3 h-[11px] w-[11px] rotate-45 border border-gold"
          />
          <h3 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-travertine">{step.title}</h3>
          <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-pumice sm:text-lg">{step.body}</p>
          <span className="sr-only">{`${i + 1}/${steps.length}`}</span>
        </li>
      ))}
    </ol>
  );
}
