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
 * Freezer Aisle: Standing in front of freezer doors
 * Features: Glass doors, metal frames, shelves with depth, cold ambiance
 */
export function FreezerAisle3D({ products }: FreezerAisle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Subtle parallax for glass reflection
  const glassY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const reflectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.4]);

  // Group products by section
  const productsBySection: Record<string, Product[]> = {};
  products.forEach((product) => {
    if (!productsBySection[product.section]) {
      productsBySection[product.section] = [];
    }
    productsBySection[product.section].push(product);
  });

  return (
    <div ref={containerRef} className="relative min-h-screen py-12">
      {/* Perspective Container */}
      <div
        className="relative mx-auto max-w-7xl"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 40%",
        }}
      >
        {/* Freezer Wall Container */}
        <div
          className="relative rounded-2xl"
          style={{
            transform: "rotateY(-1deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Freezer Door Frame - Full Height */}
          <div className="relative overflow-hidden rounded-2xl border-8 border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-200 shadow-2xl">
            {/* Metal Frame Top */}
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-neutral-400 to-neutral-300 border-b-2 border-neutral-500" />

            {/* Metal Frame Bottom */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-neutral-400 to-neutral-300 border-t-2 border-neutral-500" />

            {/* Vertical Handle - Right Side */}
            <div
              className="absolute right-8 top-20 bottom-20 z-30 w-6 rounded-full bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-500 shadow-lg"
              style={{
                transform: "translateZ(30px)",
              }}
            />

            {/* Glass Overlay - Full Height */}
            <motion.div
              style={{ y: glassY, opacity: reflectionOpacity }}
              className="pointer-events-none absolute inset-0 z-20"
            >
              {/* Glass tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-cyan-50/20 to-blue-50/30" />

              {/* Reflection streaks */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.5) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)",
                }}
              />
            </motion.div>

            {/* Interior Back Wall Shadow */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/15"
              style={{
                transform: "translateZ(-30px)",
              }}
            />

            {/* Shelves Container with Padding */}
            <div className="relative px-12 py-20 space-y-16">
              {Object.entries(productsBySection).map(([section, sectionProducts]) => (
                <div key={section} className="relative">
                  {/* Shelf Structure with 3D Depth */}
                  <div
                    className="relative"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Shelf Top Surface */}
                    <div
                      className="absolute inset-x-0 -top-6 h-4 rounded-sm bg-gradient-to-b from-neutral-300 to-neutral-400 shadow-md"
                      style={{
                        transform: "translateZ(12px) rotateX(-78deg)",
                        transformOrigin: "top",
                      }}
                    />

                    {/* Shelf Front Lip */}
                    <div className="absolute inset-x-0 -top-6 h-2 bg-neutral-400 rounded-sm shadow-sm" />

                    {/* Shelf Shadow Below */}
                    <div className="absolute inset-x-0 -top-4 h-8 bg-gradient-to-b from-black/20 to-transparent" />

                    {/* Horizontal Scrolling Products */}
                    <div
                      className="relative z-10"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <AisleShelfRow label={section}>
                        {sectionProducts.map((product) => (
                          <AisleProductPack
                            key={product.id}
                            product={product}
                            variant="frozen"
                          />
                        ))}
                      </AisleShelfRow>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Frost Effect at Bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-12 h-32 bg-gradient-to-t from-blue-200/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Cold Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-blue-50/40 via-cyan-50/20 to-white" />
    </div>
  );
}
