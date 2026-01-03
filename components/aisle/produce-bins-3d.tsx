"use client";

import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { AisleProductPack } from "./aisle-product-pack";

interface ProduceBins3DProps {
  products: Product[];
}

/**
 * Enhanced Produce Aisle: Grid of individual wicker/wooden crates with depth
 */
export function ProduceBins3D({ products }: ProduceBins3DProps) {
  // Group products into individual crates (3-4 products per crate)
  const cratesPerRow = 3;
  const productsPerCrate = 4;
  const crates: Product[][] = [];

  for (let i = 0; i < products.length; i += productsPerCrate) {
    crates.push(products.slice(i, i + productsPerCrate));
  }

  return (
    <div className="relative min-h-screen py-12 bg-gradient-to-b from-amber-50/40 to-orange-50/30">
      {/* Perspective Container */}
      <div
        className="relative mx-auto max-w-7xl px-4"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 30%",
        }}
      >
        {/* Crates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {crates.map((crateProducts, crateIdx) => (
            <motion.div
              key={crateIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: crateIdx * 0.08 }}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Individual Crate/Basket */}
              <div
                className="relative"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(8deg) rotateY(-2deg)",
                }}
              >
                {/* Chalkboard Label */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1 rounded text-sm font-handwriting italic shadow-lg z-20">
                  Fresh Produce
                </div>

                {/* Crate Container with Wicker Texture */}
                <div
                  className="relative rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Back Wall */}
                  <div
                    className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-lg"
                    style={{
                      transform: "translateZ(-60px)",
                    }}
                  />

                  {/* Bottom Plane */}
                  <div
                    className="absolute inset-x-0 bottom-0 w-full h-full bg-gradient-to-b from-amber-600 to-amber-700 rounded-b-lg"
                    style={{
                      transform: "translateZ(-60px) rotateX(-85deg)",
                      transformOrigin: "bottom",
                    }}
                  />

                  {/* Front Container with Wicker Pattern */}
                  <div className="relative bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-200 rounded-lg border-4 border-amber-800 p-6 min-h-[300px]">
                    {/* Wicker/Basket Weave Texture */}
                    <div
                      className="absolute inset-0 opacity-15 rounded-lg"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            45deg,
                            #92400e 0px,
                            #92400e 2px,
                            transparent 2px,
                            transparent 10px
                          ),
                          repeating-linear-gradient(
                            -45deg,
                            #92400e 0px,
                            #92400e 2px,
                            transparent 2px,
                            transparent 10px
                          )
                        `,
                      }}
                    />

                    {/* Wooden Rim/Edge */}
                    <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-amber-900 to-amber-800 rounded-t-lg" />
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-amber-900 to-amber-800 rounded-b-lg" />
                    <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-amber-900 to-amber-800 rounded-l-lg" />
                    <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-amber-900 to-amber-800 rounded-r-lg" />

                    {/* Products in Crate */}
                    <div className="relative z-10 grid grid-cols-2 gap-3 mt-2">
                      {crateProducts.map((product) => (
                        <div
                          key={product.id}
                          style={{
                            transform: "translateZ(10px)",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <AisleProductPack product={product} variant="produce" />
                        </div>
                      ))}
                    </div>

                    {/* Shadow under crate lip */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-lg" />
                  </div>

                  {/* Crate shadow on ground */}
                  <div
                    className="absolute -bottom-4 inset-x-0 h-4 bg-black/20 blur-md rounded-full"
                    style={{
                      transform: "translateZ(-70px) rotateX(-90deg)",
                      transformOrigin: "bottom",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Warm ambient lighting */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-100/50 via-orange-50/30 to-white pointer-events-none" />
    </div>
  );
}
