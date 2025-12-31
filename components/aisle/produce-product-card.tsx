"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { SourceBadge } from "@/components/product/source-badge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";

interface ProduceProductCardProps {
  product: Product;
}

export function ProduceProductCard({ product }: ProduceProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative"
      >
        {/* Produce Bin/Basket */}
        <div className="relative overflow-hidden rounded-lg border-4 border-amber-700 bg-gradient-to-br from-amber-100 to-yellow-100 p-4 shadow-lg transition-shadow group-hover:shadow-xl">
          {/* Basket Weave Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  #d97706 0px,
                  #d97706 2px,
                  transparent 2px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  -45deg,
                  #d97706 0px,
                  #d97706 2px,
                  transparent 2px,
                  transparent 8px
                )
              `
            }}
          />

          {/* Wooden Rail Top */}
          <div className="absolute -top-2 left-0 right-0 h-4 rounded-t-lg bg-gradient-to-b from-amber-800 to-amber-700 shadow-md" />

          {/* Price Tag Tab */}
          <div className="absolute -right-2 top-6 rounded-l-md bg-white px-3 py-1 shadow-md">
            <div className="text-xs font-bold text-primary">{formatPrice(product.price)}</div>
            <div className="text-xs text-muted-foreground">/{product.unit}</div>
          </div>

          <div className="relative z-10">
            {/* Source Badge */}
            <div className="mb-2">
              <SourceBadge source={product.source} />
            </div>

            {/* Product Display */}
            <div className="mb-3 flex h-24 items-center justify-center rounded-md bg-white/50">
              <span className="text-5xl">🥬</span>
            </div>

            {/* Product Name */}
            <h3 className="mb-3 text-sm font-semibold line-clamp-2">{product.name}</h3>

            {/* Add Button */}
            <Button onClick={handleAddToCart} size="sm" className="w-full">
              <Plus className="mr-1 h-4 w-4" />
              Add to Basket
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
