"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { Plus, Leaf, ChevronLeft, ChevronRight, Droplets, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface RealisticProduceAisleProps {
  products: Product[];
}

// Individual produce item in wooden crate
function ProduceItem({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Added to cart", description: product.name });
  };

  const getProduceColor = () => {
    const name = product.name.toLowerCase();
    if (name.includes("banana") || name.includes("plantain")) return "from-yellow-300 via-yellow-200 to-yellow-100";
    if (name.includes("avocado")) return "from-green-600 via-green-500 to-green-400";
    if (name.includes("tomato")) return "from-red-400 via-red-300 to-red-200";
    if (name.includes("onion")) return "from-purple-300 via-red-200 to-amber-100";
    if (name.includes("cilantro") || name.includes("coriander") || name.includes("mint")) return "from-green-400 via-green-300 to-green-200";
    if (name.includes("cucumber") || name.includes("zucchini")) return "from-green-500 via-green-400 to-green-300";
    if (name.includes("potato")) return "from-amber-300 via-amber-200 to-amber-100";
    if (name.includes("carrot")) return "from-orange-400 via-orange-300 to-orange-200";
    if (name.includes("ginger")) return "from-amber-400 via-amber-300 to-amber-200";
    if (name.includes("garlic")) return "from-gray-100 via-white to-gray-50";
    if (name.includes("chili") || name.includes("pepper")) return "from-red-500 via-red-400 to-green-400";
    if (name.includes("lemon") || name.includes("lime")) return "from-yellow-400 via-yellow-300 to-green-300";
    if (name.includes("mango")) return "from-yellow-400 via-orange-300 to-red-300";
    if (name.includes("spinach") || name.includes("palak")) return "from-green-600 via-green-500 to-green-400";
    if (name.includes("cabbage")) return "from-green-300 via-green-200 to-green-100";
    if (name.includes("cauliflower")) return "from-gray-100 via-white to-gray-50";
    if (name.includes("broccoli")) return "from-green-600 via-green-500 to-green-400";
    if (name.includes("eggplant") || name.includes("brinjal")) return "from-purple-600 via-purple-500 to-purple-400";
    if (name.includes("okra") || name.includes("bhindi")) return "from-green-500 via-green-400 to-green-300";
    return "from-green-400 via-green-300 to-green-200";
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.04, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ y: -10, scale: 1.03, zIndex: 20 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-[140px] sm:w-[160px] flex-shrink-0 cursor-pointer group"
      >
        {/* Wooden crate */}
        <div 
          className="relative rounded-lg overflow-hidden"
          style={{
            perspective: "800px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Crate back panel */}
          <div 
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(180deg, #8B5E3C 0%, #6B4423 50%, #5D3A1A 100%)",
              transform: "translateZ(-15px)",
            }}
          />

          {/* Main crate body */}
          <div 
            className="relative rounded-lg overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #D4A574 0%, #B8956B 30%, #9E7B54 70%, #7D5D3B 100%)",
              boxShadow: isHovered 
                ? "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3)"
                : "0 15px 30px -8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
            }}
          >
            {/* Wood grain texture */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `
                repeating-linear-gradient(90deg, transparent 0px, transparent 25px, rgba(0,0,0,0.1) 25px, rgba(0,0,0,0.1) 27px),
                repeating-linear-gradient(0deg, transparent 0px, transparent 8px, rgba(139,94,60,0.2) 8px, rgba(139,94,60,0.2) 9px)
              `,
            }} />

            {/* Top wooden slats */}
            <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-amber-600/80 to-amber-700/60 border-b border-amber-900/30" style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
            }} />

            {/* Produce pile area */}
            <div className={`relative p-3 pt-5 bg-gradient-to-br ${getProduceColor()}`}>
              {/* Fresh mist effect */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/50 to-transparent pointer-events-none"
              />

              {/* Water droplets */}
              <div className="absolute top-3 right-2 flex gap-1">
                <motion.div 
                  animate={{ y: [0, 2, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-300/70 shadow-sm"
                />
                <motion.div 
                  animate={{ y: [0, 2, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                  className="w-1 h-1 rounded-full bg-cyan-300/60"
                />
              </div>

              {/* Product image/visual */}
              <div className="relative h-24 sm:h-28 mb-3 flex items-center justify-center">
                {product.image ? (
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain drop-shadow-xl"
                    animate={isHovered ? { scale: 1.1, rotate: [-2, 2, 0] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.div
                    className="text-6xl sm:text-7xl drop-shadow-lg"
                    animate={isHovered ? { rotate: [-10, 10, 0], scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    🥬
                  </motion.div>
                )}
              </div>

              {/* Product info card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight flex-1">
                    {product.name}
                  </h3>
                  <span className="flex-shrink-0 text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                    Fresh
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-green-700">${product.price.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">/{product.unit}</span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="w-full h-8 text-xs bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Bottom wooden slat */}
            <div className="h-3 bg-gradient-to-t from-amber-800 to-amber-700 border-t border-amber-600/50" />
          </div>

          {/* Crate corner nails */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner" />
        </div>

        {/* Crate shadow */}
        <div className="absolute -bottom-3 left-3 right-3 h-6 bg-black/25 blur-lg rounded-full" />
      </motion.div>
    </Link>
  );
}

// Market display table with wooden crates
function MarketTable({ products, label }: { products: Product[]; label: string }) {
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
      {/* Section label with rustic style */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full border-2 border-amber-300 shadow-lg"
        >
          <Leaf className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-amber-900">{label}</h3>
        </motion.div>
        <div className="h-1 flex-1 bg-gradient-to-r from-amber-400/50 via-amber-300/30 to-transparent rounded-full" />
      </div>

      {/* Display table structure */}
      <div className="relative">
        {/* Table top edge */}
        <div 
          className="absolute inset-x-0 -top-3 h-4 rounded-t-xl"
          style={{
            background: "linear-gradient(180deg, #8B5E3C 0%, #6B4423 100%)",
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2)",
          }}
        />

        {/* Table surface with burlap/canvas texture */}
        <div 
          className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-amber-700/80"
          style={{
            background: "linear-gradient(180deg, #F5E6D3 0%, #E8D4BE 50%, #DBC4A8 100%)",
          }}
        >
          {/* Canvas/burlap texture overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.15'%3E%3Cpath d='M0 0h2v2H0zM4 4h2v2H4zM8 0h2v2H8zM12 4h2v2h-2zM16 0h2v2h-2zM0 8h2v2H0zM4 12h2v2H4zM8 8h2v2H8zM12 12h2v2h-2zM16 8h2v2h-2zM0 16h2v2H0zM8 16h2v2H8zM16 16h2v2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          {/* Straw/hay scatter decoration */}
          <div className="absolute top-2 left-4 w-12 h-1 bg-amber-400/40 rounded-full rotate-12" />
          <div className="absolute top-4 right-8 w-8 h-0.5 bg-amber-400/30 rounded-full -rotate-6" />
          <div className="absolute bottom-3 left-1/4 w-10 h-0.5 bg-amber-400/30 rounded-full rotate-3" />

          {/* Products container */}
          <div className="relative py-6 px-2">
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  onClick={() => scroll("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 shadow-xl border-2 border-amber-400 flex items-center justify-center hover:bg-amber-50 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-amber-700" />
                </motion.button>
              )}
            </AnimatePresence>

            <div 
              ref={scrollRef} 
              onScroll={checkScroll} 
              className="flex gap-5 overflow-x-auto px-4 py-3 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {products.map((product, idx) => (
                <ProduceItem key={product.id} product={product} index={idx} />
              ))}
            </div>

            <AnimatePresence>
              {canScrollRight && products.length > 3 && (
                <motion.button 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  onClick={() => scroll("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 shadow-xl border-2 border-amber-400 flex items-center justify-center hover:bg-amber-50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-amber-700" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Scroll fade indicators */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F5E6D3] to-transparent pointer-events-none z-10" />
            )}
            {canScrollRight && products.length > 3 && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F5E6D3] to-transparent pointer-events-none z-10" />
            )}
          </div>
        </div>

        {/* Table legs */}
        <div className="flex justify-between px-12 mt-1">
          <div className="w-6 h-8 rounded-b-lg" style={{ background: "linear-gradient(180deg, #6B4423 0%, #4A2C17 100%)" }} />
          <div className="w-6 h-8 rounded-b-lg" style={{ background: "linear-gradient(180deg, #6B4423 0%, #4A2C17 100%)" }} />
        </div>
      </div>
    </div>
  );
}

export function RealisticProduceAisle({ products }: RealisticProduceAisleProps) {
  const productsBySection: Record<string, Product[]> = {};
  products.forEach((product) => {
    const section = product.section || "Fresh Produce";
    if (!productsBySection[section]) productsBySection[section] = [];
    productsBySection[section].push(product);
  });

  return (
    <div className="relative min-h-screen py-8">
      {/* Warm market ambiance background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-50 via-orange-50/60 to-yellow-50" />
      
      {/* Sunlight rays effect */}
      <div className="fixed inset-0 -z-10 opacity-30" style={{
        backgroundImage: `
          linear-gradient(135deg, transparent 40%, rgba(251, 191, 36, 0.1) 50%, transparent 60%),
          linear-gradient(45deg, transparent 40%, rgba(251, 191, 36, 0.08) 50%, transparent 60%)
        `,
      }} />

      {/* Wooden floor pattern */}
      <div className="fixed inset-0 -z-10 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 3px, transparent 3px, transparent 80px)`,
      }} />

      {/* Floating leaves decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/25"
            initial={{ x: `${Math.random() * 100}%`, y: -30, rotate: 0 }}
            animate={{ y: "100vh", rotate: 360, x: `${Math.random() * 100}%` }}
            transition={{ 
              duration: 20 + Math.random() * 15, 
              repeat: Infinity, 
              delay: Math.random() * 8, 
              ease: "linear" 
            }}
          >
            <Leaf className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with market feel */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-100 via-emerald-50 to-green-100 rounded-full mb-6 border-2 border-green-300 shadow-xl"
          >
            <Sun className="w-6 h-6 text-amber-500" />
            <span className="text-base font-bold text-green-800 tracking-wide">FARMER'S MARKET</span>
            <Droplets className="w-5 h-5 text-cyan-500" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-amber-900 font-display mb-4">
            Farm Fresh Produce
          </h2>
          <p className="text-amber-700 text-lg">Handpicked daily • Local & organic • Scroll to explore</p>
        </motion.div>

        {/* Market tables with produce */}
        <div className="space-y-14">
          {Object.entries(productsBySection).map(([section, sectionProducts], idx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <MarketTable products={sectionProducts} label={section} />
            </motion.div>
          ))}
        </div>

        {/* Footer badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 rounded-full border border-green-300 shadow-md">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Fresh produce delivered daily from local farms</span>
            <Leaf className="w-5 h-5 text-green-600" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
