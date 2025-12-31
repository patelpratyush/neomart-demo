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

interface FrozenProductCardProps {
  product: Product;
}

export function FrozenProductCard({ product }: FrozenProductCardProps) {
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
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        className="group relative"
      >
        {/* Frozen Box Package - 3D effect */}
        <div className="relative overflow-hidden rounded-md border-2 border-slate-300 bg-gradient-to-br from-white to-slate-100 p-3 shadow-lg transition-shadow group-hover:shadow-xl">
          {/* 3D Box Top Face */}
          <div className="absolute -top-1 left-0 right-2 h-3 bg-gradient-to-r from-slate-200 to-slate-300 transform -skew-y-3 opacity-60" />

          {/* 3D Box Right Face */}
          <div className="absolute -right-1 top-0 bottom-2 w-3 bg-gradient-to-b from-slate-300 to-slate-400 transform skew-x-3 opacity-40" />

          {/* Source Badge */}
          <div className="mb-2">
            <SourceBadge source={product.source} className="text-xs" />
          </div>

          {/* Product Icon */}
          <div className="mb-2 flex h-16 items-center justify-center">
            <span className="text-3xl">❄️</span>
          </div>

          {/* Product Name */}
          <h3 className="mb-1 text-xs font-semibold line-clamp-2">{product.name}</h3>

          {/* Price */}
          <div className="mb-2 flex items-baseline gap-1">
            <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
            <span className="text-xs text-muted-foreground">/{product.unit}</span>
          </div>

          {/* Add Button */}
          <Button onClick={handleAddToCart} size="sm" className="w-full text-xs h-7">
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
