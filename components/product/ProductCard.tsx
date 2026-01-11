"use client";

import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    if (product.isProduce) {
      const produceEmojis: Record<string, string> = {
        "Bananas": "🍌",
        "Plantains": "🍌",
        "Avocados": "🥑",
        "Onions": "🧅",
        "Tomatoes": "🍅",
        "Cilantro": "🌿",
        "Cucumbers": "🥒",
      };
      const match = Object.keys(produceEmojis).find(key => 
        product.name.toLowerCase().includes(key.toLowerCase())
      );
      return match ? produceEmojis[match] : "🥬";
    }
    if (product.isFrozen) {
      if (product.section === "Ice Cream") return "🍨";
      if (product.name.includes("Pizza")) return "🍕";
      if (product.name.includes("Samosa")) return "🥟";
      if (product.name.includes("Paratha")) return "🫓";
      return "❄️";
    }
    if (product.section === "Dairy") return "🥛";
    if (product.section === "Bakery") return "🥖";
    if (product.section?.includes("Spices")) return "🌶️";
    if (product.section?.includes("Lentils")) return "🫘";
    if (product.section?.includes("Rice")) return "🍚";
    if (product.section?.includes("Snacks")) return "🍿";
    if (product.section?.includes("Oils")) return "🫒";
    return "📦";
  };

  const getSourceConfig = () => {
    switch (product.source) {
      case "neomart":
        return {
          label: "NeoMart",
          bg: "bg-primary/10",
          text: "text-primary",
          dot: "bg-primary"
        };
      case "patel-brothers":
        return {
          label: "Patel Brothers",
          bg: "bg-primary/10",
          text: "text-primary",
          dot: "bg-primary"
        };
      case "local":
        return {
          label: "Local",
          bg: "bg-muted",
          text: "text-muted-foreground",
          dot: "bg-muted-foreground"
        };
      default:
        return {
          label: "NeoMart",
          bg: "bg-primary/10",
          text: "text-primary",
          dot: "bg-primary"
        };
    }
  };

  const sourceConfig = getSourceConfig();
  const discount = product.rank <= 3 ? 10 + product.rank * 5 : 0;

  return (
    <div className="group relative bg-card rounded-xl border border-border/60 overflow-hidden product-lift">
      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500 text-white text-xs font-bold shadow-sm">
            <Sparkles className="w-3 h-3" />
            {discount}% OFF
          </span>
        </div>
      )}

      {/* Best choice badge */}
      {showBestChoice && (
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-block px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold">
            Best choice
          </span>
        </div>
      )}

      {/* Product Image Area */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary/50 to-muted/30 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
            whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
          />
        ) : (
          <motion.span
            className="text-6xl transition-transform duration-300 group-hover:scale-110"
            whileHover={{ rotate: [-5, 5, 0], transition: { duration: 0.3 } }}
          >
            {getProductEmoji()}
          </motion.span>
        )}

        {/* Hover overlay with quick add */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>

      {/* Product Details */}
      <div className="p-3">
        {/* Source badge */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`w-1.5 h-1.5 rounded-full ${sourceConfig.dot}`} />
          <span className={`text-[10px] font-medium ${sourceConfig.text}`}>
            {sourceConfig.label}
          </span>
        </div>

        {/* Product name */}
        <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2 min-h-[40px] leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">/{product.unit}</span>
        </div>

        {/* AI pairing hint - shows on hover */}
        {product.aiPairingText && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            💡 {product.aiPairingText}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((star) => (
              <svg key={star} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg className="w-3 h-3 text-muted fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-[10px] text-muted-foreground">(4.{product.rank}k)</span>
        </div>

        {/* ADD Button */}
        <Button
          size="sm"
          onClick={() => addItem(product, 1)}
          className="w-full h-9 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all rounded-lg group/btn"
        >
          <Plus className="h-3.5 w-3.5 mr-1 transition-transform group-hover/btn:rotate-90" />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
