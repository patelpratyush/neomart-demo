"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Product } from "@/lib/types";
import { FrozenProductCard } from "./frozen-product-card";
import { useRef } from "react";

interface FrozenAisleProps {
  products: Product[];
}

export function FrozenAisle({ products }: FrozenAisleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Subtle parallax for glass reflection
  const reflectionY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  // Split products into rows of 4 (shelf capacity)
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += 4) {
    rows.push(products.slice(i, i + 4));
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-8">
      {/* Freezer Wall Container */}
      <div className="relative mx-auto max-w-7xl">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800">Frozen Aisle</h2>
          <p className="text-slate-600">Premium frozen selections</p>
        </div>

        {/* Freezer Doors */}
        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative">
              {/* Freezer Door Frame */}
              <div className="relative rounded-lg border-4 border-slate-300 bg-gradient-to-b from-slate-50 to-slate-100 p-6 shadow-2xl">
                {/* Glass Overlay with Reflection */}
                <motion.div
                  style={{ y: reflectionY }}
                  className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/40 via-transparent to-blue-100/20"
                >
                  {/* Reflection Streak */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-30" />
                </motion.div>

                {/* Door Handle */}
                <div className="absolute right-4 top-1/2 h-24 w-3 -translate-y-1/2 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 shadow-lg" />

                {/* Shelves */}
                <div className="relative space-y-8">
                  {/* Shelf Lines */}
                  {[0, 1, 2, 3].map((shelfIndex) => (
                    <div
                      key={shelfIndex}
                      className="absolute left-0 right-12 border-t-2 border-slate-300/50"
                      style={{ top: `${shelfIndex * 25}%` }}
                    >
                      {/* Shelf Depth Shadow */}
                      <div className="h-2 bg-gradient-to-b from-slate-400/20 to-transparent" />
                    </div>
                  ))}

                  {/* Products on Shelves */}
                  <div className="relative z-10 grid grid-cols-4 gap-4 pt-4">
                    {row.map((product) => (
                      <FrozenProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>

                {/* Frost Effect */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-100/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambient Cold Effect */}
      <div className="pointer-events-none fixed inset-0 bg-blue-500/5" />
    </div>
  );
}
