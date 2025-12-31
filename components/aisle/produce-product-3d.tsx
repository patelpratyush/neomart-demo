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

interface ProduceProduct3DProps {
  product: Product;
  delay?: number;
}

export function ProduceProduct3D({ product, delay = 0 }: ProduceProduct3DProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Added to cart",
      description: product.name,
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.15 }
        }}
        className="group relative"
      >
        {/* Price Tag on Side */}
        <div
          className="absolute -right-3 top-6 z-20 rounded-l-lg bg-white px-4 py-2 shadow-md"
          style={{
            transform: "translateZ(5px)",
          }}
        >
          <div className="text-xs font-bold text-primary">{formatPrice(product.price)}</div>
          <div className="text-xs text-muted-foreground">/{product.unit}</div>
        </div>

        {/* Product Card */}
        <div className="overflow-hidden rounded-lg bg-white/90 p-4 backdrop-blur-sm shadow-md transition-shadow duration-200 group-hover:shadow-lg">
          {/* Source Badge */}
          <div className="mb-3">
            <SourceBadge source={product.source} className="text-xs" />
          </div>

          {/* Product Display Area */}
          <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4">
            <span className="text-6xl">🥬</span>
          </div>

          {/* Product Name */}
          <h3 className="mb-4 line-clamp-2 text-sm font-medium leading-tight">
            {product.name}
          </h3>

          {/* Add Button */}
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="w-full transition-transform duration-150 active:scale-95"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add to Basket
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
