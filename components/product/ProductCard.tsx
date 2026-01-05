"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  showBestChoice?: boolean;
}

export function ProductCard({ product, showBestChoice = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const getProductEmoji = () => {
    if (product.isProduce) return "🍎";
    if (product.isFrozen) return "❄️";
    if (product.section === "Dairy") return "🥛";
    if (product.section === "Bakery") return "🥖";
    return "📦";
  };

  const getSourceColor = () => {
    switch (product.source) {
      case "neomart":
        return "bg-emerald-100 text-emerald-700";
      case "patel":
        return "bg-orange-100 text-orange-700";
      case "shoprite":
        return "bg-red-100 text-red-700";
      case "hmart":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSourceLabel = () => {
    switch (product.source) {
      case "neomart":
        return "NeoMart";
      case "patel":
        return "Patel Brothers";
      case "shoprite":
        return "ShopRite";
      case "hmart":
        return "H-Mart";
      case "local":
        return "Local";
      default:
        return product.source;
    }
  };

  const discount = product.rank <= 3 ? 10 + product.rank * 5 : 0;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all"
    >
      {/* Badges */}
      <div className="flex items-start justify-between mb-2">
        {discount > 0 && (
          <Badge className="bg-emerald-500 text-white text-xs font-semibold">
            {discount}% OFF
          </Badge>
        )}
        {showBestChoice && (
          <Badge variant="secondary" className="text-xs">
            Best choice
          </Badge>
        )}
      </div>

      {/* Product Image */}
      <div className="w-full aspect-square bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-center justify-center mb-3">
        <span className="text-6xl">{getProductEmoji()}</span>
      </div>

      {/* Source Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getSourceColor()}`}>
          {getSourceLabel()}
        </span>
      </div>

      {/* Product Info */}
      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[40px]">
        {product.name}
      </h3>

      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        <span className="text-xs text-gray-500">/{product.unit}</span>
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-3">
        <span className="text-yellow-400 text-xs">★★★★☆</span>
        <span className="text-xs text-gray-500">(4.{product.rank}k)</span>
      </div>

      {/* ADD Button */}
      <Button
        size="sm"
        onClick={() => addItem(product, 1)}
        className="w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-semibold transition-all rounded-full"
      >
        <Plus className="h-3 w-3 mr-1" />
        ADD
      </Button>
    </motion.div>
  );
}
