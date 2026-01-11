"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Product } from "@/lib/types";
import { Plus, Snowflake, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface RealisticFreezerAisleProps {
  products: Product[];
}

// Individual frozen product on shelf
function FrozenProduct({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Added to cart", description: product.name });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ y: -10, scale: 1.1, zIndex: 30 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative flex-shrink-0 cursor-pointer"
        style={{ width: "110px" }}
      >
        {/* Frozen package */}
        <div 
          className="relative rounded-lg overflow-hidden bg-gradient-to-b from-white via-cyan-50 to-white border border-cyan-200/50"
          style={{
            boxShadow: isHovered 
              ? "0 20px 40px -10px rgba(0,0,0,0.4), 0 0 20px rgba(34,211,238,0.4)"
              : "0 6px 15px -5px rgba(0,0,0,0.2)",
          }}
        >
          {/* Frost texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/50 via-transparent to-cyan-100/40 pointer-events-none" />
          
          <div className="relative p-2">
            {/* Product image */}
            <div className="relative h-20 mb-2 rounded-md bg-white/70 flex items-center justify-center overflow-hidden">
              {product.image ? (
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-1"
                  animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              ) : (
                <span className="text-4xl">❄️</span>
              )}
              {/* Condensation */}
              <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-cyan-200/50 to-transparent" />
            </div>

            {/* Product info */}
            <h3 className="text-[9px] font-bold text-gray-800 line-clamp-2 leading-tight min-h-[24px] mb-1">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-700">${product.price.toFixed(2)}</span>
              <span className="text-[8px] text-gray-500">/{product.unit}</span>
            </div>
          </div>
        </div>

        {/* Add button on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-1 left-0 right-0 z-40"
            >
              <Button 
                onClick={handleAddToCart} 
                size="sm" 
                className="w-full h-7 text-[10px] bg-cyan-600 hover:bg-cyan-700 text-white rounded-t-none font-semibold"
              >
                <Plus className="h-3 w-3 mr-1" />Add
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shadow */}
        <div className="absolute -bottom-2 left-1 right-1 h-3 bg-black/25 blur-md rounded-full" />
      </motion.div>
    </Link>
  );
}

// Single shelf that appears on scroll
function FreezerShelf({ products, shelfIndex, label }: { products: Product[]; shelfIndex: number; label?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      {/* Shelf label */}
      {label && (
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          <span className="text-xs font-semibold text-cyan-300 bg-slate-800/50 px-3 py-1 rounded-full border border-cyan-500/30">
            {label}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        </div>
      )}

      {/* Wire shelf structure */}
      <div className="relative mx-4">
        {/* Shelf back support bar */}
        <div className="absolute inset-x-0 -top-2 h-2 bg-gradient-to-b from-slate-400 to-slate-300 rounded-t" />
        
        {/* Wire grid surface */}
        <div 
          className="relative bg-gradient-to-b from-slate-200/90 via-slate-100/70 to-slate-200/90 rounded"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent 0px, transparent 12px, rgba(100,116,139,0.4) 12px, rgba(100,116,139,0.4) 13px),
              repeating-linear-gradient(0deg, transparent 0px, transparent 12px, rgba(100,116,139,0.3) 12px, rgba(100,116,139,0.3) 13px)
            `,
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Frost on shelf */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/30 via-transparent to-cyan-100/30 pointer-events-none rounded" />

          {/* Products row */}
          <div className="flex flex-wrap justify-center gap-3 p-4">
            {products.map((product, idx) => (
              <FrozenProduct key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>

        {/* Front lip of shelf */}
        <div className="h-2 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-b shadow-lg" />
        
        {/* Price tag rail */}
        <div className="h-6 bg-gradient-to-b from-slate-600 to-slate-700 rounded-b flex items-center justify-center">
          <div className="w-3/4 h-0.5 bg-slate-500/50 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

export function RealisticFreezerAisle({ products }: RealisticFreezerAisleProps) {
  const [doorOpen, setDoorOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Group products by section first, then create shelves
  const productsBySection: Record<string, Product[]> = {};
  products.forEach((product) => {
    const section = product.section || "Frozen Items";
    if (!productsBySection[section]) productsBySection[section] = [];
    productsBySection[section].push(product);
  });

  // Create shelves with 8 items each, keeping section labels
  const shelves: { products: Product[]; label?: string }[] = [];
  Object.entries(productsBySection).forEach(([section, sectionProducts]) => {
    for (let i = 0; i < sectionProducts.length; i += 8) {
      shelves.push({
        products: sectionProducts.slice(i, i + 8),
        label: i === 0 ? section : undefined, // Only label first shelf of each section
      });
    }
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax for frost effect
  const frostY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Dark store background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Ambient cold lighting */}
      <div className="fixed inset-0 -z-10 opacity-40" style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 40%),
          radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.1) 0%, transparent 40%)
        `,
      }} />

      {/* Floating snowflakes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 100 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute text-cyan-300/40"
            initial={{ x: `${Math.random() * 100}%`, y: -20 }}
            animate={{ y: "100vh", rotate: 360 }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
          >
            <Snowflake className="w-3 h-3" />
          </motion.div>
        ))}
      </div>

      {/* Fixed temperature display */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        className="fixed top-24 right-4 z-[200] bg-slate-900/95 backdrop-blur-md rounded-xl px-5 py-4 shadow-2xl border border-cyan-500/50"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Thermometer className="w-6 h-6 text-cyan-400" />
            <div className="absolute inset-0 bg-cyan-400/30 blur-lg rounded-full animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-300 font-mono">-18°C</div>
            <div className="text-[10px] text-cyan-400/70 uppercase tracking-wider">Optimal</div>
          </div>
        </div>
      </motion.div>

      {/* FREEZER CABINET - Fixed frame */}
      <div className="sticky top-0 min-h-screen flex flex-col py-4 px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-4 relative z-[150]"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full mb-2 border border-cyan-400/30 backdrop-blur-sm">
            <Snowflake className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-200">FROZEN SECTION</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Indian Frozen Foods</h2>
        </motion.div>

        {/* Freezer outer frame */}
        <div 
          className="flex-1 max-w-4xl w-full mx-auto rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(180deg, #64748b 0%, #475569 3%, #64748b 6%, #334155 100%)",
            boxShadow: "0 50px 100px -20px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.2)",
            padding: "10px",
          }}
        >
          {/* Brand header bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-700 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Snowflake className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-white tracking-wider">NeoMart FREEZER</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
                <span className="text-[10px] text-cyan-300 font-medium">COOLING</span>
              </div>
              <div className="text-xs font-mono text-cyan-300 bg-slate-800 px-2 py-1 rounded">-18°C</div>
            </div>
          </div>

          {/* Main freezer interior with door */}
          <div 
            className="relative rounded-b-xl overflow-hidden cursor-pointer"
            onClick={() => !doorOpen && setDoorOpen(true)}
            style={{ 
              minHeight: "calc(100vh - 200px)",
              perspective: "2000px",
            }}
          >
            {/* Freezer interior - scrollable shelves */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 overflow-y-auto">
              {/* LED lighting at top */}
              <div className="sticky top-0 z-30">
                <div className="h-10 bg-gradient-to-b from-cyan-200/70 via-white/50 to-transparent" />
                <div className="absolute inset-x-6 top-3 h-1 bg-cyan-300/80 blur-sm rounded-full" />
              </div>
              
              {/* Cold air effect lines */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 100px, rgba(100,116,139,0.5) 100px, rgba(100,116,139,0.5) 101px)`,
              }} />

              {/* Shelves container */}
              <div className="relative z-20 py-4 space-y-8">
                {shelves.map((shelf, idx) => (
                  <FreezerShelf 
                    key={idx} 
                    products={shelf.products} 
                    shelfIndex={idx}
                    label={shelf.label}
                  />
                ))}
                
                {/* Bottom spacing */}
                <div className="h-20" />
              </div>

              {/* Bottom cold mist - sticky */}
              <motion.div 
                className="sticky bottom-0 h-24 bg-gradient-to-t from-cyan-300/50 via-cyan-200/30 to-transparent pointer-events-none z-30"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            {/* GLASS DOOR */}
            <motion.div
              className="absolute inset-0 z-40"
              initial={{ rotateY: 0 }}
              animate={{ 
                rotateY: doorOpen ? -110 : 0,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                damping: 15,
                mass: 2,
              }}
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setDoorOpen(!doorOpen);
              }}
            >
              {/* Glass panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/50 via-slate-200/40 to-cyan-100/50 backdrop-blur-[4px]">
                {/* Heavy frost pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-80"
                  style={{ y: frostY }}
                >
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      radial-gradient(ellipse at 5% 95%, rgba(255,255,255,0.95) 0%, transparent 35%),
                      radial-gradient(ellipse at 95% 90%, rgba(255,255,255,0.85) 0%, transparent 30%),
                      radial-gradient(ellipse at 10% 10%, rgba(255,255,255,0.7) 0%, transparent 25%),
                      radial-gradient(ellipse at 90% 5%, rgba(255,255,255,0.6) 0%, transparent 20%),
                      radial-gradient(ellipse at 50% 50%, rgba(200,230,255,0.4) 0%, transparent 50%),
                      radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.5) 0%, transparent 25%),
                      radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 20%)
                    `,
                  }} />
                </motion.div>

                {/* Glass reflections */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent"
                  style={{ clipPath: "polygon(0 0, 65% 0, 35% 100%, 0 100%)" }}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-tl from-white/50 via-transparent to-transparent"
                  style={{ clipPath: "polygon(55% 0, 100% 0, 100% 100%, 25% 100%)" }}
                />

                {/* Ice crystals */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white/70 rounded-full"
                      style={{
                        width: `${2 + Math.random() * 4}px`,
                        height: `${2 + Math.random() * 4}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Open door prompt */}
                {!doorOpen && (
                  <motion.div 
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="px-8 py-6 bg-white/95 rounded-2xl shadow-2xl text-center backdrop-blur-sm">
                      <motion.div 
                        animate={{ rotateY: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-5xl mb-3"
                      >
                        🚪
                      </motion.div>
                      <div className="text-lg font-bold text-slate-700 mb-1">Open Freezer</div>
                      <div className="text-sm text-slate-500">Tap to browse frozen items</div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Door frame */}
              <div className="absolute inset-0 border-[6px] border-slate-500 rounded-lg pointer-events-none" />
              
              {/* Rubber seal */}
              <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-r from-slate-700 to-slate-600" />

              {/* Door handle */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-36 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 rounded-full shadow-xl border-2 border-slate-500">
                <div className="absolute inset-1 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 rounded-full" />
              </div>

              {/* Door edge visible when open */}
              <div 
                className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-slate-600 to-slate-500"
                style={{
                  transform: "rotateY(90deg)",
                  transformOrigin: "left",
                }}
              />
            </motion.div>

            {/* Close door hint */}
            <AnimatePresence>
              {doorOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200]"
                >
                  <button
                    onClick={() => setDoorOpen(false)}
                    className="px-5 py-3 bg-slate-800/95 rounded-full text-sm text-cyan-300 font-semibold shadow-2xl border border-cyan-500/40 hover:bg-slate-700 transition-colors backdrop-blur-sm"
                  >
                    🚪 Close Door
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom compressor vents */}
          <div className="h-6 bg-gradient-to-b from-slate-600 to-slate-700 rounded-b-lg flex items-center justify-center gap-0.5 px-4 mt-1">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="w-1.5 h-3 bg-slate-800 rounded-full" />
            ))}
          </div>
        </div>

        {/* Floor shadow */}
        <div className="h-8 bg-gradient-to-b from-slate-900/50 to-transparent rounded-b-3xl max-w-4xl mx-auto w-full blur-sm" />
      </div>
    </div>
  );
}
