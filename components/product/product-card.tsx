"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SourceBadge } from "./source-badge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
        className="h-full"
      >
        <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
          <CardContent className="p-4">
            {/* Product Image Placeholder */}
            <div className="mb-3 flex h-40 items-center justify-center rounded-md bg-gradient-to-br from-muted to-muted/50">
              <span className="text-4xl opacity-30">📦</span>
            </div>

            {/* Source Badge */}
            <div className="mb-2">
              <SourceBadge source={product.source} />
            </div>

            {/* Product Name */}
            <h3 className="mb-1 text-sm font-semibold line-clamp-2">
              {product.name}
            </h3>

            {/* Price and Unit */}
            <div className="mb-3 flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-muted-foreground">/{product.unit}</span>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="sm"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
