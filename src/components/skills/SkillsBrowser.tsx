"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SkillLevel } from "@/content/skills";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SkillCard, type SkillCardData } from "./SkillCard";

type Filter = "all" | SkillLevel;

export function SkillsBrowser({
  cards,
  levels,
  filterLabel,
  difficultyLabel,
}: {
  cards: (SkillCardData & { level: SkillLevel })[];
  levels: Record<Filter, string>;
  filterLabel: string;
  difficultyLabel: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();
  const visible = filter === "all" ? cards : cards.filter((c) => c.level === filter);
  const count = (f: Filter) => (f === "all" ? cards.length : cards.filter((c) => c.level === f).length);
  const options = (["all", "elite", "advanced", "intermediate"] as Filter[]).map((f) => ({
    value: f,
    label: levels[f],
    count: count(f),
  }));

  return (
    <>
      <FilterTabs options={options} value={filter} onChange={setFilter} label={filterLabel} />
      <motion.ul layout={!reduce} className="mt-10 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {visible.map((c, i) => (
            <motion.li
              key={c.slug}
              layout={!reduce}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <SkillCard s={c} difficultyLabel={difficultyLabel} priority={i < 2} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
