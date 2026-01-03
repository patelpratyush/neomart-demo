"use client";

import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { AisleShelfRow } from "./aisle-shelf-row";
import { AisleProductPack } from "./aisle-product-pack";

interface PantryShelf3DProps {
  products: Product[];
}

/**
 * Pantry Aisle: Store-style shelving with uprights, depth, and warm neutral lighting
 */
export function PantryShelf3D({ products }: PantryShelf3DProps) {
  // Group products by section
  const productsBySection: Record<string, Product[]> = {};
  products.forEach((product) => {
    const section = product.section || "Pantry";
    if (!productsBySection[section]) {
      productsBySection[section] = [];
    }
    productsBySection[section].push(product);
  });

  const sections = Object.keys(productsBySection);

  return (
    <div className="relative min-h-screen py-12 bg-gradient-to-b from-stone-50 to-neutral-50">
      {/* Perspective Container */}
      <div
        className="relative mx-auto max-w-7xl px-4"
        style={{
          perspective: "1300px",
          perspectiveOrigin: "50% 35%",
        }}
      >
        {sections.map((section, sectionIdx) => {
          const sectionProducts = productsBySection[section];

          return (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIdx * 0.12 }}
              className="mb-24"
            >
              {/* Section Label */}
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-stone-800 mb-2">{section}</h3>
                <div className="h-1 w-24 bg-stone-400 mx-auto rounded-full" />
              </div>

              {/* Shelving Unit */}
              <div
                className="relative"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(4deg) rotateY(-1deg)",
                }}
              >
                {/* Vertical Uprights (Left & Right) */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 shadow-xl rounded"
                  style={{
                    transform: "translateZ(-30px)",
                  }}
                />
                <div
                  className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-stone-700 via-stone-600 to-stone-700 shadow-xl rounded"
                  style={{
                    transform: "translateZ(-30px)",
                  }}
                />

                {/* Shelf Container */}
                <div className="relative bg-gradient-to-br from-neutral-100 to-stone-100 rounded-lg border-2 border-stone-200 shadow-2xl overflow-hidden">
                  {/* Back Wall */}
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-stone-200 to-neutral-200"
                    style={{
                      transform: "translateZ(-50px)",
                    }}
                  />

                  {/* Shelf Depth Planes */}
                  <div className="relative p-8" style={{ transformStyle: "preserve-3d" }}>
                    {/* Top Shelf */}
                    <div
                      className="relative mb-4"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Shelf surface */}
                      <div
                        className="absolute inset-x-0 -top-3 h-3 bg-gradient-to-b from-stone-600 via-stone-500 to-stone-600 rounded shadow-lg"
                        style={{
                          transform: "rotateX(-82deg) translateZ(12px)",
                          transformOrigin: "top",
                        }}
                      />

                      {/* Shelf front edge */}
                      <div className="absolute inset-x-0 -top-3 h-2 bg-stone-500 rounded-sm shadow-md" />

                      {/* Shadow below shelf */}
                      <div className="absolute inset-x-0 -top-1 h-6 bg-gradient-to-b from-black/10 to-transparent" />
                    </div>

                    {/* Products Row */}
                    <div
                      className="relative"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <AisleShelfRow>
                        {sectionProducts.map((product) => (
                          <div
                            key={product.id}
                            style={{
                              transform: "translateZ(20px) rotateX(3deg)",
                              transformStyle: "preserve-3d",
                            }}
                          >
                            <AisleProductPack product={product} variant="pantry" />
                          </div>
                        ))}
                      </AisleShelfRow>
                    </div>

                    {/* Bottom shadow gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded" />
                  </div>

                  {/* Warm lighting strip */}
                  <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-amber-100/30 to-transparent" />

                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 pointer-events-none rounded-lg" />
                </div>

                {/* Shelf support brackets */}
                <div
                  className="absolute top-1/4 left-8 w-6 h-6 bg-stone-600 rounded-sm shadow-md"
                  style={{
                    transform: "translateZ(-25px)",
                  }}
                />
                <div
                  className="absolute top-1/4 right-8 w-6 h-6 bg-stone-600 rounded-sm shadow-md"
                  style={{
                    transform: "translateZ(-25px)",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Warm neutral ambient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-stone-100/50 via-neutral-50/30 to-white pointer-events-none" />
    </div>
  );
}
