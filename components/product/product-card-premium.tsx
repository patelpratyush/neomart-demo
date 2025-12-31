"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { SourceBadge } from "./source-badge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";

interface ProductCardPremiumProps {
  product: Product;
}

export function ProductCardPremium({ product }: ProductCardPremiumProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name}`,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        className="group h-full"
      >
        <div className="h-full overflow-hidden rounded-lg border border-border/50 bg-white transition-all duration-200 hover:border-border hover:shadow-md">
          {/* Image Placeholder */}
          <div className="relative aspect-square w-full overflow-hidden bg-neutral-50">
            <div className="flex h-full items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-neutral-100" />
            </div>
            {/* Source Badge - Top Right */}
            <div className="absolute right-2 top-2">
              <SourceBadge source={product.source} className="text-xs shadow-sm" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Product Name */}
            <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-foreground">
              {product.name}
            </h3>

            {/* Price & Add Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold text-foreground">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-muted-foreground">/{product.unit}</span>
              </div>

              <Button
                onClick={handleAddToCart}
                size="sm"
                className="h-8 w-8 rounded-full p-0 shadow-sm transition-transform duration-150 active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
