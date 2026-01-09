"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { Plus, Leaf, ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface RealisticProduceAisleProps {
  products: Product[];
}

// Produce item in wooden crate
function ProduceItem({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Added to cart", description: product.name });
  };

  const getProduceVisual = () => {
    const name = product.name.toLowerCase();
    if (name.includes("banana")) return { emoji: "🍌", color: "from-yellow-200 to-yellow-100" };
    if (name.includes("plantain")) return { emoji: "🍌", color: "from-green-200 to-yellow-100" };
    if (name.includes("avocado")) return { emoji: "🥑", color: "from-green-300 to-green-200" };
    if (name.includes("onion")) return { emoji: "🧅", color: "from-purple-200 to-red-100" };
    if (name.includes("tomato")) return { emoji: "🍅", color: "from-red-200 to-red-100" };
    if (name.includes("cilantro") || name.includes("coriander")) return { emoji: "🌿", color: "from-green-300 to-green-200" };
    if (name.includes("cucumber")) return { emoji: "🥒", color: "from-green-300 to-green-200" };
    if (name.includes("potato")) return { emoji: "🥔", color: "from-amber-200 to-yellow-100" };
    if (name.includes("carrot")) return { emoji: "🥕", color: "from-orange-200 to-orange-100" };
    if (name.includes("ginger")) return { emoji: "🫚", color: "from-amber-200 to-yellow-100" };
    if (name.includes("garlic")) return { emoji: "🧄", color: "from-gray-100 to-white" };
    if (name.includes("chili") || name.includes("pepper")) return { emoji: "🌶️", color: "from-red-300 to-green-200" };
    if (name.includes("lemon") || name.includes("lime")) return { emoji: "🍋", color: "from-yellow-300 to-green-200" };
    if (name.includes("mango")) return { emoji: "🥭", color: "from-yellow-200 to-orange-200" };
    if (name.includes("spinach") || name.includes("palak")) return { emoji: "🥬", color: "from-green-400 to-green-300" };
    if (name.includes("cabbage")) return { emoji: "🥬", color: "from-green-200 to-green-100" };
    if (name.includes("cauliflower")) return { emoji: "🥦", color: "from-gray-100 to-white" };
    if (name.includes("broccoli")) return { emoji: "🥦", color: "from-green-400 to-green-300" };
    if (name.includes("eggplant") || name.includes("brinjal")) return { emoji: "🍆", color: "from-purple-300 to-purple-200" };
    if (name.includes("okra") || name.includes("bhindi")) return { emoji: "🫛", color: "from-green-300 to-green-200" };
    return { emoji: "🥬", color: "from-green-200 to-green-100" };
  };

  const visual = getProduceVisual();

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05, y: -8, zIndex: 20 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-[130px] sm:w-[150px] flex-shrink-0 cursor-pointer"
      >
        {/* Wooden crate */}
        <div className="relative">
          {/* Crate back */}
          <div className="absolute inset-x-1 top-0 h-full rounded-lg bg-gradient-to-b from-amber-700 to-amber-800" style={{ transform: "translateZ(-10px)" }} />
          
          {/* Crate body */}
          <div className="relative rounded-lg overflow-hidden shadow-xl" style={{
            background: "linear-gradient(180deg, #b8860b 0%, #8b6914 50%, #6b4423 100%)",
          }}>
            {/* Wood grain texture */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 22px)`,
            }} />
            
            {/* Horizontal slats */}
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-amber-600 to-amber-700 border-b border-amber-900/30" />
            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-amber-900 to-amber-800 border-t border-amber-600/30" />

            {/* Produce pile area */}
            <div className={`relative p-3 pt-4 bg-gradient-to-br ${visual.color}`}>
              {/* Fresh mist effect */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"
              />
              
              {/* Water droplets */}
              <div className="absolute top-2 right-2 text-blue-400/60">
                <Droplets className="w-3 h-3" />
              </div>

              {/* Produce emoji */}
              <div className="flex items-center justify-center h-16 sm:h-20 mb-2">
                <motion.span 
                  className="text-5xl sm:text-6xl drop-shadow-lg"
                  animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {visual.emoji}
                </motion.span>
              </div>

              {/* Product info card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md">
                <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1 min-h-[32px] leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-bold text-green-700">${product.price.toFixed(2)}</span>
                  <span className="text-[9px] text-gray-500">/{product.unit}</span>
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="w-full h-7 text-[10px] bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="h-3 w-3 mr-1" />Add
                </Button>
              </div>
            </div>

            {/* Crate corner nails */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-gray-400 shadow-inner" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-gray-400 shadow-inner" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-gray-400 shadow-inner" />
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-gray-400 shadow-inner" />
          </div>
        </div>

        {/* Shadow */}
        <div className="absolute -bottom-2 left-2 right-2 h-4 rounded-full bg-black/20 blur-md" />
      </motion.div>
    </Link>
  );
}

// Produce shelf row
function ProduceRow({ products, label }: { products: Product[]; label: string }) {
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
        <h3 className="text-lg font-semibold text-amber-900 px-4 py-1.5 bg-amber-100 rounded-full border border-amber-300">
          {label}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-300 to-transparent" />
      </div>

      {/* Wooden display table */}
      <div className="relative">
        {/* Table top */}
        <div className="absolute inset-x-0 -top-2 h-4 rounded-t-lg" style={{
          background: "linear-gradient(180deg, #8b6914 0%, #6b4423 100%)",
        }} />

        {/* Table surface with burlap texture */}
        <div className="relative bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg p-4 shadow-lg border-2 border-amber-300">
          {/* Burlap texture overlay */}
          <div className="absolute inset-0 opacity-10 rounded-lg" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.3'%3E%3Cpath d='M0 0h1v1H0zM4 0h1v1H4zM8 0h1v1H8zM12 0h1v1h-1zM16 0h1v1h-1zM2 2h1v1H2zM6 2h1v1H6zM10 2h1v1h-1zM14 2h1v1h-1zM18 2h1v1h-1z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="relative">
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-amber-300 flex items-center justify-center hover:bg-amber-50">
                  <ChevronLeft className="w-5 h-5 text-amber-700" />
                </motion.button>
              )}
            </AnimatePresence>

            <div ref={scrollRef} onScroll={checkScroll} className="flex gap-4 overflow-x-auto px-2 py-2 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: "none" }}>
              {products.map((product, idx) => <ProduceItem key={product.id} product={product} index={idx} />)}
            </div>

            <AnimatePresence>
              {canScrollRight && products.length > 3 && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-amber-300 flex items-center justify-center hover:bg-amber-50">
                  <ChevronRight className="w-5 h-5 text-amber-700" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Table legs */}
        <div className="flex justify-between px-8 -mt-1">
          <div className="w-4 h-6 rounded-b" style={{ background: "linear-gradient(180deg, #6b4423 0%, #4a2c17 100%)" }} />
          <div className="w-4 h-6 rounded-b" style={{ background: "linear-gradient(180deg, #6b4423 0%, #4a2c17 100%)" }} />
        </div>
      </div>
    </div>
  );
}

export function RealisticProduceAisle({ products }: RealisticProduceAisleProps) {
  // Group products by section
  const productsBySection: Record<string, Product[]> = {};
  products.forEach((product) => {
    const section = product.section || "Fresh Produce";
    if (!productsBySection[section]) productsBySection[section] = [];
    productsBySection[section].push(product);
  });

  return (
    <div className="relative min-h-screen py-8">
      {/* Warm market background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-50 via-orange-50/30 to-yellow-50" />
      
      {/* Wooden floor pattern */}
      <div className="fixed inset-0 -z-10 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(90deg, #8b4513 0px, #8b4513 2px, transparent 2px, transparent 60px)`,
      }} />

      {/* Floating leaves decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-300/30"
            initial={{ x: `${Math.random() * 100}%`, y: -20, rotate: 0 }}
            animate={{ y: "100vh", rotate: 360 }}
            transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
          >
            <Leaf className="w-6 h-6" />
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
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 rounded-full mb-4 border border-green-300">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Fresh Market</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 font-display">
            Farm Fresh Produce
          </h2>
          <p className="text-amber-700 mt-2">Hand-picked daily • Scroll to browse</p>
        </motion.div>

        {/* Produce sections */}
        <div className="space-y-12">
          {Object.entries(productsBySection).map(([section, sectionProducts], idx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProduceRow products={sectionProducts} label={section} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-amber-600 text-sm"
        >
          <p>🌿 Fresh produce delivered daily from local farms</p>
        </motion.div>
      </div>
    </div>
  );
}
