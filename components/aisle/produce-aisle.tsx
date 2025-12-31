"use client";

import { Product } from "@/lib/types";
import { ProduceProductCard } from "./produce-product-card";

interface ProduceAisleProps {
  products: Product[];
}

export function ProduceAisle({ products }: ProduceAisleProps) {
  // Split products into bins (3 per row)
  const bins: Product[][] = [];
  for (let i = 0; i < products.length; i += 3) {
    bins.push(products.slice(i, i + 3));
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 p-8">
      {/* Market Container */}
      <div className="relative mx-auto max-w-7xl">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-amber-900">Produce Market</h2>
          <p className="text-amber-700">Farm-fresh selections</p>
        </div>

        {/* Produce Bins */}
        <div className="space-y-8">
          {bins.map((bin, binIndex) => (
            <div key={binIndex} className="grid grid-cols-3 gap-6">
              {bin.map((product) => (
                <ProduceProductCard key={product.id} product={product} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Wooden Floor Pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #8b4513 0px,
            #8b4513 2px,
            transparent 2px,
            transparent 50px
          )`
        }}
      />
    </div>
  );
}
