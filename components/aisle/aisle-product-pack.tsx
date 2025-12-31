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

interface AisleProductPackProps {
  product: Product;
  variant?: "frozen" | "produce" | "pantry" | "fresh";
}

/**
 * 3D product pack that sits on shelves with proper depth and shadows
 */
export function AisleProductPack({ product, variant = "frozen" }: AisleProductPackProps) {
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
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{ duration: 0.2 }}
        className={`group relative flex-shrink-0 ${variant === "fresh" ? "w-32 sm:w-40 md:w-44" : "w-44"}`}
        style={{
          scrollSnapAlign: "start",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Product Pack Container with 3D transform */}
        <div
          className={`relative h-56 rounded-lg transition-shadow duration-200 overflow-hidden ${
            variant === "fresh"
              ? "bg-transparent shadow-none"
              : "border-2 border-neutral-200 bg-white shadow-lg group-hover:shadow-xl"
          }`}
          style={{
            transform: "translateZ(18px) rotateX(2deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3D Depth Edges - only for non-fresh variants */}
          {variant !== "fresh" && (
            <>
              <div
                className="absolute -top-1 left-0 right-2 h-3 bg-gradient-to-r from-neutral-200 to-neutral-300 opacity-60"
                style={{
                  transform: "translateZ(-1px) rotateX(-75deg)",
                  transformOrigin: "top",
                }}
              />
              <div
                className="absolute -right-1 top-0 bottom-2 w-3 bg-gradient-to-b from-neutral-300 to-neutral-400 opacity-50"
                style={{
                  transform: "translateZ(-1px) rotateY(75deg)",
                  transformOrigin: "right",
                }}
              />
            </>
          )}

          {/* Content */}
          <div className={`relative z-10 flex h-full flex-col ${variant === "fresh" ? "p-2" : "p-3"}`}>
            {/* Source Badge - smaller for fresh variant */}
            <div className="mb-2">
              <SourceBadge source={product.source} className={variant === "fresh" ? "text-xs scale-90" : "text-xs"} />
            </div>

            {/* Product Visual */}
            <div
              className={`mb-3 flex flex-1 items-center justify-center rounded-md ${
                variant === "frozen"
                  ? "bg-gradient-to-br from-blue-50 to-cyan-50"
                  : variant === "produce"
                  ? "bg-gradient-to-br from-green-50 to-emerald-50"
                  : variant === "fresh"
                  ? "bg-transparent"
                  : "bg-gradient-to-br from-amber-50 to-orange-50"
              }`}
            >
              <span className={variant === "fresh" ? "text-5xl sm:text-6xl md:text-7xl drop-shadow-lg" : "text-4xl"}>
                {variant === "frozen"
                  ? "❄️"
                  : variant === "produce"
                  ? "🥬"
                  : variant === "fresh"
                  ? "🍎"
                  : "📦"}
              </span>
            </div>

            {/* Product Info */}
            <div className={`rounded-lg p-2 ${variant === "fresh" ? "bg-white/80 backdrop-blur-sm shadow-md" : ""}`}>
              <h3 className={`mb-2 line-clamp-2 leading-tight ${variant === "fresh" ? "text-xs font-semibold" : "text-xs font-medium"}`}>
                {product.name}
              </h3>

              <div className="mb-3 flex items-baseline gap-1">
                <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
                <span className="text-xs text-muted-foreground">/{product.unit}</span>
              </div>

              {/* Add Button */}
              <Button
                onClick={handleAddToCart}
                size="sm"
                className={`h-8 w-full text-xs ${variant === "fresh" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
              >
                <Plus className="mr-1 h-3 w-3" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Cast Shadow on Shelf */}
        <div
          className={`absolute left-2 right-2 h-8 rounded-full blur-md transition-opacity duration-200 ${
            variant === "fresh"
              ? "-bottom-4 bg-black/10 opacity-40 group-hover:opacity-60"
              : "-bottom-6 bg-black/15 opacity-0 group-hover:opacity-100"
          }`}
          style={{
            transform: "translateZ(-10px)",
          }}
        />
      </motion.div>
    </Link>
  );
}
