"use client";

import { motion } from "framer-motion";
import { AisleShelfRow } from "./aisle-shelf-row";
import { AisleProductPack } from "./aisle-product-pack";
import type { Product } from "@/lib/types";
import { useState, useEffect } from "react";

interface FreshDailyAisle3DProps {
  products: Product[];
}

export function FreshDailyAisle3D({ products }: FreshDailyAisle3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Group products by section
  const productsBySection: Record<string, Product[]> = {};

  products.forEach((product) => {
    const section = product.section || "Fresh Items";
    if (!productsBySection[section]) {
      productsBySection[section] = [];
    }
    productsBySection[section].push(product);
  });

  const sections = Object.entries(productsBySection);

  return (
    <div className="relative py-4 md:py-8">
      {/* Warm background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-50/60 via-orange-50/40 to-yellow-50/30" />

      <div
        className="relative mx-auto max-w-6xl px-2 md:px-4"
        style={{
          perspective: isMobile ? "1000px" : "2000px",
          perspectiveOrigin: "50% 35%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            transformStyle: "preserve-3d",
            transform: isMobile ? "rotateX(8deg) rotateY(-2deg)" : "rotateX(12deg) rotateY(-4deg)",
          }}
        >
          {/* Multi-layer market stand structure */}
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-b from-orange-100/20 to-amber-100/20 p-4 md:p-8 shadow-2xl">
            {/* Wooden crate layers */}
            <div className="space-y-12">
              {sections.map(([section, sectionProducts], sectionIndex) => {
                // Split products into multiple rows for layering
                const productsPerRow = isMobile ? 2 : 4;
                const rows: Product[][] = [];
                for (let i = 0; i < sectionProducts.length; i += productsPerRow) {
                  rows.push(sectionProducts.slice(i, i + productsPerRow));
                }

                return (
                  <div key={section} className="relative">
                    {/* Section label */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sectionIndex * 0.15 }}
                      className="mb-4 md:mb-6"
                    >
                      <div className="inline-block">
                        <h3 className="text-lg md:text-2xl font-bold text-amber-900 mb-1">
                          {section}
                        </h3>
                        <div className="h-0.5 md:h-1 bg-gradient-to-r from-amber-600 to-transparent rounded-full" />
                      </div>
                    </motion.div>

                    {/* Stacked crate rows */}
                    <div className="space-y-8">
                      {rows.map((rowProducts, rowIndex) => {
                        const zDepth = -60 - (rowIndex * 80);
                        const yOffset = rowIndex * -40;

                        return (
                          <motion.div
                            key={rowIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.2 + rowIndex * 0.15 }}
                            className="relative"
                            style={{
                              transformStyle: "preserve-3d",
                              transform: `translateY(${yOffset}px)`,
                            }}
                          >
                            {/* Wooden crate */}
                            <div
                              className="relative"
                              style={{
                                transformStyle: "preserve-3d",
                              }}
                            >
                              {/* Back panel */}
                              <div
                                className="absolute inset-x-0 h-48 rounded-lg"
                                style={{
                                  transform: `translateZ(${zDepth}px)`,
                                  background: `linear-gradient(135deg,
                                    ${rowIndex % 2 === 0 ? '#8B7355' : '#9B8365'} 0%,
                                    ${rowIndex % 2 === 0 ? '#6D5C47' : '#7D6C57'} 100%)`,
                                  boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
                                }}
                              >
                                {/* Wood planks */}
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute inset-x-0 border-t border-amber-950/20"
                                    style={{ top: `${i * 25}%` }}
                                  />
                                ))}
                              </div>

                              {/* Bottom surface */}
                              <div
                                className="absolute inset-x-0 h-64 rounded-lg"
                                style={{
                                  transform: `translateZ(${zDepth}px) rotateX(-88deg)`,
                                  transformOrigin: "top center",
                                  background: `linear-gradient(180deg,
                                    ${rowIndex % 2 === 0 ? '#A0826D' : '#B0927D'} 0%,
                                    ${rowIndex % 2 === 0 ? '#8B6F47' : '#9B7F57'} 100%)`,
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                }}
                              >
                                {/* Slat pattern */}
                                <div
                                  className="absolute inset-0 opacity-30"
                                  style={{
                                    backgroundImage: `repeating-linear-gradient(
                                      90deg,
                                      transparent,
                                      transparent 30px,
                                      rgba(0,0,0,0.15) 30px,
                                      rgba(0,0,0,0.15) 32px
                                    )`,
                                  }}
                                />
                              </div>

                              {/* Side panels */}
                              <div
                                className="absolute left-0 top-0 w-3 h-48 rounded-l-lg"
                                style={{
                                  transform: `translateZ(${zDepth}px) rotateY(90deg)`,
                                  transformOrigin: "left center",
                                  background: "linear-gradient(90deg, #6D5C47 0%, #5A4A37 100%)",
                                  boxShadow: "inset -2px 0 6px rgba(0,0,0,0.2)",
                                }}
                              />
                              <div
                                className="absolute right-0 top-0 w-3 h-48 rounded-r-lg"
                                style={{
                                  transform: `translateZ(${zDepth}px) rotateY(-90deg)`,
                                  transformOrigin: "right center",
                                  background: "linear-gradient(90deg, #5A4A37 0%, #6D5C47 100%)",
                                  boxShadow: "inset 2px 0 6px rgba(0,0,0,0.2)",
                                }}
                              />

                              {/* Front edge */}
                              <div
                                className="absolute inset-x-0 h-3 rounded-sm"
                                style={{
                                  transform: `translateZ(${zDepth + 3}px)`,
                                  background: "linear-gradient(180deg, #B8936F 0%, #8B6F47 100%)",
                                  boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                                }}
                              />

                              {/* Support corners */}
                              <div
                                className="absolute left-8 w-2 h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm"
                                style={{
                                  transform: `translateZ(${zDepth + 5}px) translateY(-12px)`,
                                  boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                                }}
                              />
                              <div
                                className="absolute right-8 w-2 h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm"
                                style={{
                                  transform: `translateZ(${zDepth + 5}px) translateY(-12px)`,
                                  boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                                }}
                              />

                              {/* Soft shadow beneath crate */}
                              <div
                                className="absolute inset-x-8 -top-2 h-8 rounded-full"
                                style={{
                                  transform: `translateZ(${zDepth - 5}px)`,
                                  background: `radial-gradient(ellipse at center, rgba(0,0,0,${0.15 + rowIndex * 0.05}) 0%, transparent 70%)`,
                                  filter: "blur(8px)",
                                }}
                              />

                              {/* Products on this layer */}
                              <div className="relative pt-2 pb-8">
                                <AisleShelfRow label="">
                                  {rowProducts.map((product, productIndex) => (
                                    <motion.div
                                      key={product.id}
                                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      transition={{
                                        delay: sectionIndex * 0.2 + rowIndex * 0.15 + productIndex * 0.05,
                                        type: "spring",
                                        stiffness: 200
                                      }}
                                    >
                                      <AisleProductPack product={product} variant="fresh" />
                                    </motion.div>
                                  ))}
                                </AisleShelfRow>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Natural lighting effect */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,248,220,0.2) 0%, transparent 40%, rgba(255,248,220,0.15) 100%)",
              }}
            />

            {/* Soft vignette */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: "radial-gradient(ellipse at center, transparent 30%, rgba(139,115,85,0.1) 100%)",
              }}
            />
          </div>

          {/* Ground shadow */}
          <div
            className="absolute inset-x-0 -bottom-12 h-32 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(139,115,85,0.3) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />
        </motion.div>

        {/* Decorative ambient glows */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
