"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { DiaryCategory } from "@/content/diary";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PostCard, type PostCardData } from "./PostCard";

type Filter = "all" | DiaryCategory;
type Card = PostCardData & { category: DiaryCategory; featured: boolean };

// With "All", the featured article leads as a wide card; filtered views show a plain grid.
export function DiaryBrowser({
  cards,
  categories,
  labels,
}: {
  cards: Card[];
  categories: Record<Filter, string>;
  labels: { filter: string; featured: string; read: string };
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const featured = filter === "all" ? cards.find((c) => c.featured) : undefined;
  const rest = (filter === "all" ? cards : cards.filter((c) => c.category === filter)).filter((c) => c !== featured);
  const options = (Object.keys(categories) as Filter[]).map((f) => ({
    value: f,
    label: categories[f],
    count: f === "all" ? cards.length : cards.filter((c) => c.category === f).length,
  }));

  return (
    <>
      <FilterTabs options={options} value={filter} onChange={setFilter} label={labels.filter} />
      <h2 className="sr-only">{categories[filter]}</h2>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {featured && (
            <div className="mt-10 border-b border-granite pb-14">
              <PostCard p={featured} wide featuredLabel={labels.featured} readLabel={labels.read} />
            </div>
          )}
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c) => (
              <li key={c.slug}>
                <PostCard p={c} readLabel={labels.read} />
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
