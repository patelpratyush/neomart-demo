"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Product } from "@/lib/types";
import { AisleShelfRow } from "./aisle-shelf-row";
import { AisleProductPack } from "./aisle-product-pack";
import { useRef } from "react";

interface FreezerAisle3DProps {
  products: Product[];
}

/**
 * Enhanced Freezer Aisle: 3-4 panel freezer doors with glass, handles, and depth
 */
export function FreezerAisle3D({ products }: FreezerAisle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax for glass reflections
  const glassY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const reflectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  // Group products by section
  const productsBySection: Record<string, Product[]> = {};
  products.forEach((product) => {
    if (!productsBySection[product.section]) {
      productsBySection[product.section] = [];
    }
    productsBySection[product.section].push(product);
  });

  const numPanels = 4;

  return (
    <div ref={containerRef} className="relative min-h-screen py-12 bg-gradient-to-b from-slate-50 to-white">
      {/* Perspective Container */}
      <div
        className="relative mx-auto max-w-7xl px-4"
        style={{
          perspective: "1400px",
          perspectiveOrigin: "50% 35%",
        }}
      >
        {Object.entries(productsBySection).map(([section, sectionProducts], sectionIdx) => (
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: sectionIdx * 0.1 }}
            className="mb-20"
          >
            {/* Section Label */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{section}</h3>
              <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
            </div>

            {/* Multi-Panel Freezer Doors */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(3deg) rotateY(-2deg)",
              }}
            >
              {/* Top Metal Frame */}
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-400 border-b-2 border-slate-500 shadow-lg z-30" />

              {/* Bottom Metal Frame */}
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-400 via-slate-300 to-slate-400 border-t-2 border-slate-500 shadow-lg z-30" />

              {/* Freezer Panels Grid */}
              <div className="relative grid grid-cols-4 gap-1 bg-slate-300 p-1">
                {Array.from({ length: numPanels }).map((_, panelIdx) => (
                  <div
                    key={panelIdx}
                    className="relative bg-gradient-to-br from-cyan-50/90 to-blue-50/80 border-2 border-slate-300 min-h-[500px]"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Glass Effect */}
                    <motion.div
                      style={{
                        y: glassY,
                        opacity: reflectionOpacity,
                      }}
                      className="absolute inset-0 pointer-events-none z-20"
                    >
                      {/* Glass tint */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 via-blue-50/10 to-cyan-50/15" />

                      {/* Reflection highlight */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20" />

                      {/* Condensation vignette */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                    </motion.div>

                    {/* Vertical Handle */}
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-28 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 rounded-full shadow-xl z-30"
                      style={{
                        transform: "translateX(-50%) translateY(-50%) translateZ(35px)",
                      }}
                    />

                    {/* Interior Light Strip */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-cyan-200/40 to-transparent" />

                    {/* Panel Divider Line (right edge) */}
                    {panelIdx < numPanels - 1 && (
                      <div className="absolute top-0 bottom-0 right-0 w-1 bg-slate-400 shadow-md" />
                    )}
                  </div>
                ))}
              </div>

              {/* Shelves behind glass */}
              <div
                className="absolute inset-x-0 top-16 bottom-16 px-8"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(-40px)",
                }}
              >
                {/* Shelf structure */}
                <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                  {/* Shelf surface */}
                  <div
                    className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600 rounded shadow-lg"
                    style={{
                      transform: "rotateX(-80deg) translateZ(15px)",
                      transformOrigin: "top",
                    }}
                  />

                  {/* Shelf front lip */}
                  <div className="absolute inset-x-0 top-0 h-2 bg-slate-500 rounded-sm shadow-md" />

                  {/* Products on shelf */}
                  <div className="relative mt-6" style={{ transformStyle: "preserve-3d" }}>
                    <AisleShelfRow>
                      {sectionProducts.map((product) => (
                        <div
                          key={product.id}
                          style={{
                            transform: "translateZ(25px) rotateX(3deg)",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <AisleProductPack product={product} variant="frozen" />
                        </div>
                      ))}
                    </AisleShelfRow>
                  </div>

                  {/* Shadow falloff */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Frost effect at bottom */}
              <div className="absolute inset-x-0 bottom-8 h-24 bg-gradient-to-t from-cyan-100/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Temperature indicator */}
      <div className="fixed top-20 right-8 bg-cyan-900/90 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg px-4 py-2 shadow-xl z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-sm text-cyan-100 font-bold">-18°C</span>
        </div>
      </div>

      {/* Cool ambient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-cyan-50/30 via-blue-50/20 to-white pointer-events-none" />
    </div>
  );
}
