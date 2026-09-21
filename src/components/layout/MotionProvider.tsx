"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Honours "reduce motion" for every Motion component: transforms are skipped, opacity still fades.
// Components must NOT switch `initial` on useReducedMotion(): the server can't know the setting,
// so that pattern causes hydration mismatches.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
