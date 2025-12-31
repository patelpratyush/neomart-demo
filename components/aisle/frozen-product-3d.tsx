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

interface FrozenProduct3DProps {
  product: Product;
  delay?: number;
}

export function FrozenProduct3D({ product, delay = 0 }: FrozenProduct3DProps) {
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
        transition={{ delay, duration: 0.3 }}
        whileHover={{
          y: -6,
          transition: { duration: 0.2 }
        }}
        className="group relative h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Frozen Package Box */}
        <div
          className="relative overflow-hidden rounded-lg border-2 border-neutral-200 bg-white p-3 shadow-md transition-all duration-200 h-full flex flex-col"
          style={{
            transform: "translateZ(10px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3D Box Edges */}
          <div
            className="absolute -top-1 left-0 right-2 h-3 bg-gradient-to-r from-neutral-200 to-neutral-300 opacity-50"
            style={{
              transform: "translateZ(1px) rotateX(-70deg)",
              transformOrigin: "top",
            }}
          />
          <div
            className="absolute -right-1 top-0 bottom-2 w-3 bg-gradient-to-b from-neutral-300 to-neutral-400 opacity-40"
            style={{
              transform: "translateZ(1px) rotateY(70deg)",
              transformOrigin: "right",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1">
            {/* Source Badge */}
            <div className="mb-2">
              <SourceBadge source={product.source} className="text-xs" />
            </div>

            {/* Product Icon */}
            <div className="mb-3 flex flex-1 items-center justify-center rounded-md bg-gradient-to-br from-blue-50 to-cyan-50">
              <span className="text-4xl">❄️</span>
            </div>

            {/* Product Name */}
            <h3 className="mb-2 line-clamp-2 text-xs font-medium leading-tight">
              {product.name}
            </h3>

            {/* Price */}
            <div className="mb-3 flex items-baseline gap-1">
              <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
              <span className="text-xs text-muted-foreground">/{product.unit}</span>
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="h-8 w-full text-xs transition-transform duration-150 active:scale-95"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add
            </Button>
          </div>

          {/* Cast Shadow on Shelf */}
          <div
            className="absolute -bottom-3 left-0 right-0 h-3 bg-gradient-to-b from-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              transform: "translateZ(-5px)",
            }}
          />
        </div>
      </motion.div>
    </Link>
  );
}
