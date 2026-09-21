"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProductCategory } from "@/content/products";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { ProductCard, type ProductCardData } from "./ProductCard";

type Filter = "all" | ProductCategory;

export function ShopBrowser({
  cards,
  categories,
  labels,
}: {
  cards: (ProductCardData & { category: ProductCategory })[];
  categories: Record<Filter, string>;
  labels: { filter: string; empty: string; sample: string; badge3d: string };
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();
  const visible = filter === "all" ? cards : cards.filter((c) => c.category === filter);
  const options = (["all", "apparel", "equipment", "accessories"] as Filter[]).map((f) => ({
    value: f,
    label: categories[f],
    count: f === "all" ? cards.length : cards.filter((c) => c.category === f).length,
  }));

  return (
    <>
      <FilterTabs options={options} value={filter} onChange={setFilter} label={labels.filter} />
      {visible.length === 0 ? (
        <p className="mt-12 border border-dashed border-flint px-6 py-16 text-center text-pumice">{labels.empty}</p>
      ) : (
        <motion.ul layout={!reduce} className="mt-10 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
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
                <ProductCard p={c} labels={labels} priority={i < 2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </>
  );
}
