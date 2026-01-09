"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { Plus, ChevronLeft, ChevronRight, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface RealisticPantryAisleProps {
  products: Product[];
}


// Pantry product on metal shelf
function PantryProduct({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Added to cart", description: product.name });
  };

  const getProductVisual = () => {
    const name = product.name.toLowerCase();
    const section = (product.section || "").toLowerCase();
    
    // Lentils & Pulses
    if (name.includes("dal") || name.includes("toor") || name.includes("chana") || name.includes("moong") || name.includes("masoor") || name.includes("urad")) {
      return { emoji: "🫘", bg: "from-amber-200 to-yellow-100", package: "bag" };
    }
    // Rice & Grains
    if (name.includes("rice") || name.includes("basmati") || name.includes("poha") || name.includes("rava") || name.includes("sooji")) {
      return { emoji: "🍚", bg: "from-white to-gray-100", package: "bag" };
    }
    // Spices
    if (name.includes("turmeric") || name.includes("haldi")) return { emoji: "🌕", bg: "from-yellow-300 to-yellow-200", package: "jar" };
    if (name.includes("cumin") || name.includes("jeera")) return { emoji: "🌰", bg: "from-amber-300 to-amber-200", package: "jar" };
    if (name.includes("masala") || name.includes("garam")) return { emoji: "🌶️", bg: "from-red-200 to-orange-100", package: "box" };
    if (name.includes("coriander") || name.includes("dhania")) return { emoji: "🌿", bg: "from-green-200 to-green-100", package: "jar" };
    if (name.includes("chili") || name.includes("mirch")) return { emoji: "🌶️", bg: "from-red-300 to-red-200", package: "jar" };
    if (section.includes("spice")) return { emoji: "✨", bg: "from-orange-200 to-yellow-100", package: "jar" };
    
    // Flours
    if (name.includes("atta") || name.includes("flour") || name.includes("besan") || name.includes("maida")) {
      return { emoji: "🌾", bg: "from-amber-100 to-yellow-50", package: "bag" };
    }
    // Snacks
    if (name.includes("biscuit") || name.includes("parle")) return { emoji: "🍪", bg: "from-amber-200 to-yellow-100", package: "pack" };
    if (name.includes("bhujia") || name.includes("namkeen") || name.includes("mixture")) return { emoji: "🥨", bg: "from-orange-200 to-yellow-100", package: "pack" };
    if (name.includes("chips") || name.includes("papad")) return { emoji: "🥔", bg: "from-yellow-200 to-yellow-100", package: "pack" };
    // Oils & Ghee
    if (name.includes("ghee")) return { emoji: "🧈", bg: "from-yellow-200 to-amber-100", package: "jar" };
    if (name.includes("oil") || name.includes("mustard")) return { emoji: "🫒", bg: "from-yellow-300 to-amber-200", package: "bottle" };
    // Pickles & Chutneys
    if (name.includes("pickle") || name.includes("achar")) return { emoji: "🥒", bg: "from-green-200 to-yellow-100", package: "jar" };
    if (name.includes("chutney")) return { emoji: "🫙", bg: "from-green-200 to-green-100", package: "jar" };
    
    return { emoji: "📦", bg: "from-amber-100 to-orange-50", package: "box" };
  };

  const visual = getProductVisual();

  // Package shape based on type
  const getPackageStyle = () => {
    switch (visual.package) {
      case "jar":
        return "rounded-lg";
      case "bottle":
        return "rounded-t-full rounded-b-lg";
      case "bag":
        return "rounded-t-2xl rounded-b-lg";
      case "pack":
        return "rounded-lg";
      default:
        return "rounded-lg";
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.03 }}
        whileHover={{ scale: 1.08, y: -8, zIndex: 20 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-[130px] sm:w-[145px] flex-shrink-0 cursor-pointer"
      >
        {/* Product package */}
        <div className={`relative ${getPackageStyle()} overflow-hidden border-2 border-amber-300 bg-gradient-to-br ${visual.bg} shadow-lg`}>
          {/* Package shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

          <div className="relative p-2.5">
            {/* Product emoji */}
            <div className="flex items-center justify-center h-14 sm:h-16 mb-2">
              <motion.span 
                className="text-4xl sm:text-5xl drop-shadow-md"
                animate={isHovered ? { rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {visual.emoji}
              </motion.span>
            </div>

            {/* Product name */}
            <h3 className="text-[10px] sm:text-xs font-semibold text-gray-800 line-clamp-2 mb-1 min-h-[28px] leading-tight text-center">
              {product.name}
            </h3>

            {/* Weight/Size badge */}
            <div className="flex justify-center mb-2">
              <span className="text-[9px] px-2 py-0.5 bg-amber-200 rounded text-amber-800 font-medium">
                {product.unit}
              </span>
            </div>

            {/* Price and Add button */}
            <div className="bg-white/80 rounded-lg p-2">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-sm font-bold text-green-700">${product.price.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="w-full h-7 text-[10px] bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Plus className="h-3 w-3 mr-1" />Add
              </Button>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div className="absolute -bottom-1 left-3 right-3 h-3 rounded-full bg-black/15 blur-sm" />
      </motion.div>
    </Link>
  );
}

// Metal shelf row
function PantryShelf({ products, label }: { products: Product[]; label: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 px-4 py-1.5 bg-orange-100 rounded-full border border-orange-300 flex items-center gap-2">
          <Package className="w-4 h-4 text-orange-600" />
          {label}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-orange-300 to-transparent" />
      </div>

      {/* Metal shelving unit */}
      <div className="relative">
        {/* Back panel */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-gray-200 to-gray-300" style={{ transform: "translateZ(-20px)" }} />

        {/* Metal shelf */}
        <div className="relative rounded-lg overflow-hidden shadow-xl border border-gray-300">
          {/* Top metal bar */}
          <div className="h-3 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-400 border-b border-gray-500" />
          
          {/* Shelf surface */}
          <div className="relative bg-gradient-to-b from-gray-100 to-white p-4">
            {/* Pegboard pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }} />

            {/* Price rail */}
            <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-b from-transparent to-orange-100 border-t border-orange-200" />

            <div className="relative">
              <AnimatePresence>
                {canScrollLeft && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-orange-300 flex items-center justify-center hover:bg-orange-50">
                    <ChevronLeft className="w-5 h-5 text-orange-600" />
                  </motion.button>
                )}
              </AnimatePresence>

              <div ref={scrollRef} onScroll={checkScroll} className="flex gap-4 overflow-x-auto px-2 py-2 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: "none" }}>
                {products.map((product, idx) => <PantryProduct key={product.id} product={product} index={idx} />)}
              </div>

              <AnimatePresence>
                {canScrollRight && products.length > 4 && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-orange-300 flex items-center justify-center hover:bg-orange-50">
                    <ChevronRight className="w-5 h-5 text-orange-600" />
                  </motion.button>
                )}
              </AnimatePresence>

              {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />}
              {canScrollRight && products.length > 4 && <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />}
            </div>
          </div>

          {/* Bottom metal bar */}
          <div className="h-3 bg-gradient-to-t from-gray-400 via-gray-300 to-gray-400 border-t border-gray-200" />
        </div>

        {/* Shelf supports */}
        <div className="flex justify-between px-4 -mt-1">
          <div className="w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b" />
          <div className="w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b" />
          <div className="w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b" />
          <div className="w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b" />
        </div>
      </div>
    </div>
  );
}

export function RealisticPantryAisle({ products }: RealisticPantryAisleProps) {
  const productsBySection: Record<string, Product[]> = {};
  products.forEach((product) => {
    const section = product.section || "General Items";
    if (!productsBySection[section]) productsBySection[section] = [];
    productsBySection[section].push(product);
  });

  return (
    <div className="relative min-h-screen py-8">
      {/* Warm store background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-orange-50 via-amber-50/50 to-yellow-50" />

      {/* Subtle pattern */}
      <div className="fixed inset-0 -z-10 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Floating sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-orange-300/30"
            initial={{ x: `${Math.random() * 100}%`, y: -20 }}
            animate={{ y: "100vh", rotate: 360 }}
            transition={{ duration: 25 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4 border border-orange-300">
            <Package className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">South Asian Essentials • NeoMart</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 font-display">
            Pantry Staples
          </h2>
          <p className="text-gray-600 mt-2">Authentic ingredients • Scroll shelves to browse</p>
        </motion.div>

        {/* Pantry sections */}
        <div className="space-y-10">
          {Object.entries(productsBySection).map(([section, sectionProducts], idx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <PantryShelf products={sectionProducts} label={section} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-orange-600 text-sm"
        >
          <p>🌶️ Authentic Indian groceries • Quality guaranteed</p>
        </motion.div>
      </div>
    </div>
  );
}
