"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { Plus, ChevronLeft, ChevronRight, Package, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface RealisticPantryAisleProps {
  products: Product[];
}

// Individual pantry product package
function PantryPackage({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Added to cart", description: product.name });
  };

  const getPackageDesign = () => {
    const name = product.name.toLowerCase();
    const section = (product.section || "").toLowerCase();
    
    // Different package styles based on product type
    if (name.includes("dal") || name.includes("toor") || name.includes("chana") || name.includes("lentil")) {
      return { gradient: "from-amber-400 via-yellow-300 to-amber-400", shape: "bag", accent: "#D97706" };
    }
    if (name.includes("rice") || name.includes("basmati") || name.includes("poha")) {
      return { gradient: "from-white via-gray-100 to-white", shape: "bag", accent: "#059669" };
    }
    if (name.includes("atta") || name.includes("flour") || name.includes("besan")) {
      return { gradient: "from-amber-200 via-yellow-100 to-amber-200", shape: "bag", accent: "#B45309" };
    }
    if (name.includes("turmeric") || name.includes("haldi")) {
      return { gradient: "from-yellow-400 via-yellow-300 to-yellow-400", shape: "jar", accent: "#CA8A04" };
    }
    if (name.includes("cumin") || name.includes("masala") || name.includes("spice")) {
      return { gradient: "from-red-400 via-orange-300 to-red-400", shape: "box", accent: "#DC2626" };
    }
    if (name.includes("chili") || name.includes("mirch")) {
      return { gradient: "from-red-500 via-red-400 to-red-500", shape: "jar", accent: "#B91C1C" };
    }
    if (name.includes("oil") || name.includes("ghee")) {
      return { gradient: "from-yellow-300 via-amber-200 to-yellow-300", shape: "bottle", accent: "#D97706" };
    }
    if (name.includes("pickle") || name.includes("chutney")) {
      return { gradient: "from-green-400 via-lime-300 to-green-400", shape: "jar", accent: "#15803D" };
    }
    if (name.includes("biscuit") || name.includes("cookie")) {
      return { gradient: "from-amber-300 via-yellow-200 to-amber-300", shape: "pack", accent: "#92400E" };
    }
    if (name.includes("namkeen") || name.includes("bhujia") || name.includes("chips")) {
      return { gradient: "from-orange-400 via-yellow-300 to-orange-400", shape: "pack", accent: "#EA580C" };
    }
    return { gradient: "from-orange-300 via-amber-200 to-orange-300", shape: "box", accent: "#C2410C" };
  };

  const design = getPackageDesign();

  const getShapeStyles = () => {
    switch (design.shape) {
      case "jar":
        return "rounded-t-2xl rounded-b-lg";
      case "bottle":
        return "rounded-t-full rounded-b-xl";
      case "bag":
        return "rounded-t-3xl rounded-b-lg";
      case "pack":
        return "rounded-xl";
      default:
        return "rounded-lg";
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.03, type: "spring", stiffness: 250, damping: 20 }}
        whileHover={{ y: -10, scale: 1.05, zIndex: 30 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-[115px] sm:w-[130px] flex-shrink-0 cursor-pointer group"
        style={{ perspective: "600px" }}
      >
        {/* Product package with 3D effect */}
        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered ? "rotateY(-5deg) rotateX(-3deg)" : "rotateY(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Main package */}
          <div 
            className={`relative ${getShapeStyles()} overflow-hidden bg-gradient-to-b ${design.gradient}`}
            style={{
              boxShadow: isHovered 
                ? `0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 2px ${design.accent}40`
                : "0 10px 25px -8px rgba(0,0,0,0.25)",
            }}
          >
            {/* Package shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 12px)`,
            }} />

            <div className="relative p-2.5">
              {/* Brand accent stripe */}
              <div 
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: design.accent }}
              />

              {/* Product image area */}
              <div className="relative h-16 sm:h-20 mt-2 mb-2 rounded-lg overflow-hidden bg-white/60 backdrop-blur-sm flex items-center justify-center">
                {product.image ? (
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-1.5 drop-shadow-md"
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                ) : (
                  <motion.div
                    className="text-4xl drop-shadow-md"
                    animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                  >
                    📦
                  </motion.div>
                )}
              </div>

              {/* Product info */}
              <div className="bg-white/90 rounded-lg p-2 shadow-sm">
                <h3 className="text-[9px] sm:text-[10px] font-bold text-gray-800 line-clamp-2 leading-tight min-h-[24px] mb-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold" style={{ color: design.accent }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[8px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                    {product.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom brand bar */}
            <div 
              className="h-2"
              style={{ backgroundColor: design.accent, opacity: 0.8 }}
            />
          </div>

          {/* 3D side effect */}
          <div 
            className="absolute top-0 -right-1.5 w-3 h-full rounded-r"
            style={{
              background: `linear-gradient(90deg, ${design.accent}60 0%, ${design.accent}30 100%)`,
              transform: "rotateY(75deg)",
              transformOrigin: "left",
            }}
          />

          {/* Shadow on shelf */}
          <div className="absolute -bottom-2 left-1 right-1 h-4 bg-black/25 blur-md rounded-full" />
        </div>

        {/* Add to cart button on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute -bottom-1 left-0 right-0 z-40"
            >
              <Button 
                onClick={handleAddToCart} 
                size="sm" 
                className="w-full h-7 text-[10px] text-white shadow-lg rounded-t-none font-semibold"
                style={{ backgroundColor: design.accent }}
              >
                <Plus className="h-3 w-3 mr-1" />Add
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

// Metal retail shelf
function RetailShelf({ products, label }: { products: Product[]; label: string }) {
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
      scrollRef.current.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-100 to-amber-50 rounded-full border-2 border-orange-300 shadow-lg"
        >
          <Package className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-bold text-orange-900">{label}</h3>
        </motion.div>
        <div className="h-1 flex-1 bg-gradient-to-r from-orange-400/40 to-transparent rounded-full" />
      </div>

      {/* Metal shelving unit */}
      <div className="relative">
        {/* Back panel (pegboard style) */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(180deg, #F3F4F6 0%, #E5E7EB 100%)",
            transform: "translateZ(-20px)",
          }}
        />

        {/* Shelf structure */}
        <div 
          className="relative rounded-xl overflow-hidden"
          style={{
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Top metal rail */}
          <div className="h-4 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-400 flex items-center px-4 border-b border-slate-500">
            <div className="flex-1 h-1 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 rounded-full" />
          </div>

          {/* Main shelf area */}
          <div 
            className="relative bg-gradient-to-b from-gray-100 via-white to-gray-100"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, #d1d5db 1px, transparent 0)
              `,
              backgroundSize: "24px 24px",
            }}
          >
            {/* Price tag strip */}
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-b from-transparent via-orange-50/50 to-orange-100/80 border-t border-orange-200/50 z-10" />

            {/* Products container */}
            <div className="relative py-5 px-2">
              <AnimatePresence>
                {canScrollLeft && (
                  <motion.button 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-orange-400 flex items-center justify-center hover:bg-orange-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-orange-600" />
                  </motion.button>
                )}
              </AnimatePresence>

              <div 
                ref={scrollRef} 
                onScroll={checkScroll} 
                className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {products.map((product, idx) => (
                  <PantryPackage key={product.id} product={product} index={idx} />
                ))}
              </div>

              <AnimatePresence>
                {canScrollRight && products.length > 5 && (
                  <motion.button 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={() => scroll("right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-orange-400 flex items-center justify-center hover:bg-orange-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-orange-600" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Scroll fade */}
              {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none z-10" />
              )}
              {canScrollRight && products.length > 5 && (
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10" />
              )}
            </div>
          </div>

          {/* Bottom metal rail */}
          <div className="h-4 bg-gradient-to-t from-slate-500 via-slate-400 to-slate-300 border-t border-slate-300" />
        </div>

        {/* Shelf brackets/supports */}
        <div className="flex justify-between px-8 mt-1">
          <div className="w-4 h-6 bg-gradient-to-b from-slate-400 to-slate-600 rounded-b" />
          <div className="w-4 h-6 bg-gradient-to-b from-slate-400 to-slate-600 rounded-b" />
          <div className="w-4 h-6 bg-gradient-to-b from-slate-400 to-slate-600 rounded-b" />
          <div className="w-4 h-6 bg-gradient-to-b from-slate-400 to-slate-600 rounded-b" />
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
      {/* Store interior background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-orange-50 via-amber-50/50 to-white" />
      
      {/* Store lighting effect */}
      <div className="fixed inset-0 -z-10" style={{
        backgroundImage: `
          radial-gradient(ellipse at 25% 0%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 75% 0%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)
        `,
      }} />

      {/* Floor tile pattern */}
      <div className="fixed inset-0 -z-10 opacity-5" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent 0px, transparent 40px, #374151 40px, #374151 41px),
          repeating-linear-gradient(90deg, transparent 0px, transparent 40px, #374151 40px, #374151 41px)
        `,
      }} />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 rounded-full mb-6 border-2 border-orange-300 shadow-xl"
          >
            <Store className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-bold text-orange-800 tracking-wide">SOUTH ASIAN ESSENTIALS</span>
            <Package className="w-5 h-5 text-orange-600" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 font-display mb-3">
            Pantry Staples
          </h2>
          <p className="text-gray-600 text-lg">Authentic ingredients • Premium quality • Scroll shelves to browse</p>
        </motion.div>

        {/* Retail shelves */}
        <div className="space-y-12">
          {Object.entries(productsBySection).map(([section, sectionProducts], idx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <RetailShelf products={sectionProducts} label={section} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-14"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-100 rounded-full border border-orange-300 shadow-md">
            <span className="text-2xl">🌶️</span>
            <span className="text-sm font-medium text-orange-800">Authentic Indian groceries • Quality guaranteed</span>
            <span className="text-2xl">🍚</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
