"use client";

import { Product } from "@/lib/types";
import { AisleShelfRow } from "./aisle-shelf-row";
import { AisleProductPack } from "./aisle-product-pack";

interface ProduceBins3DProps {
  products: Product[];
}

/**
 * Produce Aisle: Angled market bins/baskets with depth
 * Features: Basket weave texture, wooden rails, warm tones
 */
export function ProduceBins3D({ products }: ProduceBins3DProps) {
  // Group products by type or just show all in bins
  const productGroups: Product[][] = [];
  for (let i = 0; i < products.length; i += 6) {
    productGroups.push(products.slice(i, i + 6));
  }

  return (
    <div className="relative min-h-screen py-12">
      {/* Perspective Container */}
      <div
        className="relative mx-auto max-w-7xl space-y-16"
        style={{
          perspective: "1100px",
          perspectiveOrigin: "50% 35%",
        }}
      >
        {productGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Produce Bin Container */}
            <div
              className="relative overflow-visible"
              style={{
                transform: "rotateX(6deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Bin Back Wall */}
              <div
                className="absolute inset-x-0 top-0 h-64 rounded-t-xl border-4 border-amber-900 bg-gradient-to-b from-amber-100 to-yellow-100"
                style={{
                  transform: "translateZ(-50px)",
                }}
              />

              {/* Bin Bottom Plane */}
              <div
                className="absolute inset-x-0 bottom-0 h-64 rounded-b-xl border-x-4 border-b-4 border-amber-900 bg-gradient-to-b from-yellow-200 to-amber-200"
                style={{
                  transform: "translateZ(-50px) rotateX(-88deg)",
                  transformOrigin: "bottom",
                }}
              />

              {/* Bin Front Container */}
              <div className="relative z-10 rounded-xl border-4 border-amber-900 bg-gradient-to-br from-amber-100 to-yellow-100 p-8 shadow-xl">
                {/* Basket Weave Pattern */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-25"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        45deg,
                        #78350f 0px,
                        #78350f 3px,
                        transparent 3px,
                        transparent 12px
                      ),
                      repeating-linear-gradient(
                        -45deg,
                        #78350f 0px,
                        #78350f 3px,
                        transparent 3px,
                        transparent 12px
                      )
                    `,
                  }}
                />

                {/* Wooden Rail Top */}
                <div
                  className="absolute -top-4 left-0 right-0 h-8 rounded-t-xl bg-gradient-to-b from-amber-900 to-amber-800 shadow-md"
                  style={{
                    transform: "translateZ(4px)",
                  }}
                />

                {/* Inner Cavity Shadow */}
                <div className="pointer-events-none absolute inset-0 rounded-lg shadow-inner opacity-60" />

                {/* Products in Bin - Horizontal Scroll */}
                <div
                  className="relative z-10"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <AisleShelfRow label={`Fresh Produce ${groupIndex + 1}`}>
                    {group.map((product) => (
                      <AisleProductPack
                        key={product.id}
                        product={product}
                        variant="produce"
                      />
                    ))}
                  </AisleShelfRow>
                </div>
              </div>

              {/* Bin Front Lip (darker edge) */}
              <div
                className="absolute inset-x-0 bottom-0 h-4 rounded-b-xl bg-gradient-to-b from-amber-950 to-amber-900"
                style={{
                  transform: "translateZ(2px)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Warm Market Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-amber-50/50 via-yellow-50/30 to-white" />
    </div>
  );
}
