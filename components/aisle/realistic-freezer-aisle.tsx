"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { Plus, Snowflake, Thermometer, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface RealisticFreezerAisleProps {
  products: Product[];
}

// Individual frozen product package
function FrozenPackage({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Added to cart", description: product.name });
  };

  const getPackageStyle = () => {
    const name = product.name.toLowerCase();
    if (name.includes("kulfi") || name.includes("ice cream")) return { color: "from-pink-200 via-white to-pink-100", accent: "bg-pink-500" };
    if (name.includes("gulab") || name.includes("rasmalai")) return { color: "from-amber-200 via-orange-100 to-amber-200", accent: "bg-amber-600" };
    if (name.includes("paratha") || name.includes("chapati") || name.includes("naan")) return { color: "from-amber-100 via-yellow-50 to-amber-100", accent: "bg-amber-500" };
    if (name.includes("samosa") || name.includes("pakora")) return { color: "from-orange-200 via-amber-100 to-orange-200", accent: "bg-orange-500" };
    if (name.includes("paneer") || name.includes("tikka")) return { color: "from-red-200 via-orange-100 to-red-200", accent: "bg-red-500" };
    if (name.includes("biryani") || name.includes("rice")) return { color: "from-yellow-200 via-amber-100 to-yellow-200", accent: "bg-yellow-600" };
    if (name.includes("dal") || name.includes("chana")) return { color: "from-amber-200 via-yellow-100 to-amber-200", accent: "bg-amber-600" };
    if (name.includes("palak") || name.includes("vegetable") || name.includes("peas")) return { color: "from-green-200 via-emerald-100 to-green-200", accent: "bg-green-600" };
    return { color: "from-blue-200 via-cyan-100 to-blue-200", accent: "bg-cyan-600" };
  };

  const style = getPackageStyle();

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.02, type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ y: -12, scale: 1.05, zIndex: 30 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative flex-shrink-0 cursor-pointer group"
        style={{ 
          width: "110px",
          perspective: "500px",
        }}
      >
        {/* Package with 3D effect */}
        <div 
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered ? "rotateX(-5deg)" : "rotateX(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Main package front */}
          <div className={`relative rounded-lg overflow-hidden bg-gradient-to-b ${style.color} shadow-xl border border-white/50`}
            style={{
              boxShadow: isHovered 
                ? "0 20px 40px -10px rgba(0,0,0,0.4), 0 0 20px rgba(56, 189, 248, 0.3)"
                : "0 8px 20px -5px rgba(0,0,0,0.2)",
            }}
          >
            {/* Frost overlay on package */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/30 pointer-events-none" />
            
            {/* Ice crystals texture */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8) 1px, transparent 1px),
                               radial-gradient(circle at 70% 40%, rgba(255,255,255,0.6) 1px, transparent 1px),
                               radial-gradient(circle at 50% 80%, rgba(255,255,255,0.7) 1px, transparent 1px)`,
              backgroundSize: "30px 30px, 25px 25px, 35px 35px",
            }} />

            <div className="relative p-2">
              {/* Product image/visual area */}
              <div className="relative h-20 mb-2 rounded-md overflow-hidden bg-white/40 backdrop-blur-sm flex items-center justify-center">
                {product.image ? (
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-1 drop-shadow-lg"
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                ) : (
                  <motion.div 
                    className="text-4xl drop-shadow-md"
                    animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                  >
                    ❄️
                  </motion.div>
                )}
                
                {/* Condensation effect */}
                <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-cyan-200/40 to-transparent" />
              </div>

              {/* Product info */}
              <div className="space-y-1">
                <h3 className="text-[9px] font-bold text-gray-800 line-clamp-2 leading-tight min-h-[24px]">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-[8px] text-gray-600 bg-white/50 px-1 rounded">{product.unit}</span>
                </div>
              </div>
            </div>

            {/* Brand strip at bottom */}
            <div className={`h-1.5 ${style.accent}`} />
          </div>

          {/* 3D side edge */}
          <div 
            className="absolute top-0 -right-1 w-2 h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-r"
            style={{
              transform: "rotateY(80deg)",
              transformOrigin: "left",
            }}
          />

          {/* Package shadow on shelf */}
          <div 
            className="absolute -bottom-2 left-1 right-1 h-3 bg-black/30 blur-md rounded-full"
            style={{ transform: "translateZ(-10px)" }}
          />
        </div>

        {/* Quick add button on hover */}
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
                className="w-full h-7 text-[10px] bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg rounded-t-none"
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

// Wire shelf with products
function FreezerShelf({ products, shelfIndex }: { products: Product[]; shelfIndex: number }) {
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
      scrollRef.current.scrollBy({ left: direction === "left" ? -250 : 250, behavior: "smooth" });
    }
  };

  return (
    <div className="relative" style={{ perspective: "1000px" }}>
      {/* Wire shelf structure */}
      <div className="relative">
        {/* Shelf back support */}
        <div className="absolute inset-x-0 -top-1 h-2 bg-gradient-to-b from-slate-500 to-slate-400 rounded-t-sm" />
        
        {/* Wire grid shelf surface */}
        <div 
          className="relative bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 rounded-sm overflow-hidden"
          style={{
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px -2px rgba(0,0,0,0.15)",
          }}
        >
          {/* Wire grid pattern */}
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent 0px, transparent 14px, #64748b 14px, #64748b 16px),
              repeating-linear-gradient(0deg, transparent 0px, transparent 14px, #64748b 14px, #64748b 15px)
            `,
          }} />
          
          {/* Frost accumulation on shelf */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 via-transparent to-cyan-100/20 pointer-events-none" />

          {/* Products container */}
          <div className="relative py-3 px-2">
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  onClick={() => scroll("left")}
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-800/80 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-slate-700 border border-cyan-400/30"
                >
                  <ChevronLeft className="w-4 h-4 text-cyan-300" />
                </motion.button>
              )}
            </AnimatePresence>

            <div 
              ref={scrollRef} 
              onScroll={checkScroll} 
              className="flex gap-3 overflow-x-auto px-3 scrollbar-hide scroll-smooth py-2"
              style={{ scrollbarWidth: "none" }}
            >
              {products.map((product, idx) => (
                <FrozenPackage key={product.id} product={product} index={idx} />
              ))}
            </div>

            <AnimatePresence>
              {canScrollRight && products.length > 4 && (
                <motion.button 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  onClick={() => scroll("right")}
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-800/80 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-slate-700 border border-cyan-400/30"
                >
                  <ChevronRight className="w-4 h-4 text-cyan-300" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Front lip of shelf */}
        <div className="h-1.5 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-b-sm shadow-md" />
        
        {/* Price tag rail */}
        <div className="h-5 bg-gradient-to-b from-slate-600 to-slate-700 flex items-center px-3">
          <div className="flex-1 h-0.5 bg-slate-500/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Complete freezer cabinet with glass door
function FreezerCabinet({ section, products }: { section: string; products: Product[] }) {
  const [doorOpen, setDoorOpen] = useState(true);
  
  const productsPerShelf = 6;
  const shelves: Product[][] = [];
  for (let i = 0; i < products.length; i += productsPerShelf) {
    shelves.push(products.slice(i, i + productsPerShelf));
  }

  return (
    <div className="relative">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <motion.h3 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg font-bold text-slate-700 px-5 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full border border-cyan-300 shadow-lg flex items-center gap-2"
        >
          <Snowflake className="w-4 h-4 text-cyan-500" />
          {section}
        </motion.h3>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </div>

      {/* Freezer cabinet frame */}
      <div 
        className="relative rounded-xl overflow-hidden"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Top frame - stainless steel */}
        <div className="h-6 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 flex items-center justify-between px-4 border-b border-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-[10px] font-medium text-slate-600">COOLING</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500">-18°C</div>
        </div>

        {/* Cabinet interior */}
        <div 
          className="relative cursor-pointer"
          onClick={() => setDoorOpen(!doorOpen)}
        >
          {/* Back wall of freezer */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200" />
          
          {/* Interior LED lighting effect */}
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-cyan-100/60 via-white/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 top-2 h-1 bg-cyan-200/80 blur-sm z-10" />
          
          {/* Cold air mist effect */}
          <motion.div 
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              y: [0, 5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-cyan-200/50 via-cyan-100/30 to-transparent pointer-events-none z-10"
          />

          {/* Shelves */}
          <div className="relative py-4 space-y-2 z-20">
            {shelves.map((shelfProducts, idx) => (
              <FreezerShelf key={idx} products={shelfProducts} shelfIndex={idx} />
            ))}
          </div>

          {/* Glass door overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-30"
            animate={{ opacity: doorOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glass with frost */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/40 via-white/30 to-cyan-100/40 backdrop-blur-[2px]" />
            
            {/* Glass reflections */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent" 
              style={{ clipPath: "polygon(0 0, 60% 0, 30% 100%, 0 100%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-white/30 via-transparent to-transparent"
              style={{ clipPath: "polygon(70% 0, 100% 0, 100% 100%, 40% 100%)" }}
            />
            
            {/* Frost pattern */}
            <div className="absolute inset-0 opacity-60" style={{
              backgroundImage: `
                radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.8) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.6) 0%, transparent 40%),
                radial-gradient(ellipse at 50% 50%, rgba(200,230,255,0.4) 0%, transparent 60%)
              `,
            }} />

            {/* Click prompt */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-5 py-3 bg-white/90 rounded-xl shadow-xl text-sm font-medium text-slate-700 border border-cyan-200"
              >
                👆 Tap to open door
              </motion.div>
            </div>
          </motion.div>

          {/* Door handle */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-24 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 rounded-full shadow-lg z-40" />
        </div>

        {/* Bottom frame - stainless steel */}
        <div className="h-8 bg-gradient-to-t from-slate-400 via-slate-300 to-slate-400 border-t border-slate-500 flex items-center justify-center">
          <div className="w-20 h-3 bg-gradient-to-b from-slate-500 to-slate-600 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export function RealisticFreezerAisle({ products }: RealisticFreezerAisleProps) {
  const productsBySection: Record<string, Product[]> = {};
  products.forEach((product) => {
    const section = product.section || "Frozen Items";
    if (!productsBySection[section]) productsBySection[section] = [];
    productsBySection[section].push(product);
  });

  return (
    <div className="relative min-h-screen py-8">
      {/* Store ambient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Floor reflection */}
      <div className="fixed inset-x-0 bottom-0 h-40 -z-10 bg-gradient-to-t from-cyan-900/20 to-transparent" />

      {/* Temperature display */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        className="fixed top-24 right-4 z-50 bg-slate-900/95 backdrop-blur-md rounded-xl px-5 py-4 shadow-2xl border border-cyan-500/40"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Thermometer className="w-6 h-6 text-cyan-400" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-cyan-400/30 blur-md rounded-full"
            />
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-300 font-mono">-18°C</div>
            <div className="text-[10px] text-cyan-400/70 uppercase tracking-wider">Optimal temp</div>
          </div>
        </div>
      </motion.div>

      {/* Floating snowflakes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute text-cyan-300/20"
            initial={{ x: `${Math.random() * 100}%`, y: -20 }}
            animate={{ y: "100vh", rotate: 360 }}
            transition={{ 
              duration: 15 + Math.random() * 15, 
              repeat: Infinity, 
              delay: Math.random() * 8, 
              ease: "linear" 
            }}
          >
            <Snowflake className="w-3 h-3" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-full mb-6 border border-cyan-400/30 backdrop-blur-sm"
          >
            <Snowflake className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-200 tracking-wide">FROZEN SECTION</span>
            <Snowflake className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-display mb-3">
            Indian Frozen Foods
          </h2>
          <p className="text-slate-400 text-lg">Premium quality • Flash frozen • Authentic taste</p>
        </motion.div>

        {/* Freezer cabinets */}
        <div className="space-y-12">
          {Object.entries(productsBySection).map(([section, sectionProducts], idx) => (
            <motion.div 
              key={section} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <FreezerCabinet section={section} products={sectionProducts} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
