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

// SWAD Logo Component
function SwadLogo() {
  return (
    <div className="relative bg-gradient-to-b from-orange-50 to-white rounded-2xl px-8 py-4 border-2 border-orange-400 shadow-lg">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
        Best Taste in Town
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-orange-400 text-lg">❧</span>
        <span className="text-4xl font-black tracking-tight" style={{ 
          color: '#c41e3a',
          textShadow: '1px 1px 0 #8b0000',
          fontFamily: 'Georgia, serif'
        }}>
          SWAD
        </span>
        <span className="text-orange-400 text-lg rotate-180">❧</span>
      </div>
      <div className="mt-1 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full" />
    </div>
  );
}

// Freezer product card
function FreezerProduct({ product, index }: { product: Product; index: number }) {
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
    if (name.includes("kulfi")) return { emoji: "🍨", bg: "from-amber-100 to-orange-100", border: "border-amber-300" };
    if (name.includes("gulab jamun")) return { emoji: "🟤", bg: "from-amber-100 to-orange-100", border: "border-amber-300" };
    if (name.includes("rasmalai")) return { emoji: "🥛", bg: "from-yellow-50 to-amber-100", border: "border-yellow-200" };
    if (name.includes("paratha") || name.includes("chapati")) return { emoji: "🫓", bg: "from-amber-100 to-yellow-100", border: "border-amber-200" };
    if (name.includes("samosa") || name.includes("kachori")) return { emoji: "🥟", bg: "from-amber-100 to-orange-100", border: "border-amber-200" };
    if (name.includes("bhaji") || name.includes("pakora")) return { emoji: "🧅", bg: "from-orange-100 to-amber-100", border: "border-orange-200" };
    if (name.includes("tikki")) return { emoji: "🥔", bg: "from-yellow-100 to-amber-100", border: "border-yellow-200" };
    if (name.includes("paneer")) return { emoji: "🧀", bg: "from-yellow-100 to-orange-100", border: "border-yellow-200" };
    if (name.includes("dal") || name.includes("chana")) return { emoji: "🫘", bg: "from-amber-100 to-yellow-100", border: "border-amber-200" };
    if (name.includes("palak") || name.includes("spinach")) return { emoji: "🥬", bg: "from-green-100 to-emerald-100", border: "border-green-200" };
    if (name.includes("biryani")) return { emoji: "🍚", bg: "from-yellow-100 to-orange-100", border: "border-yellow-200" };
    if (name.includes("peas") || name.includes("vegetable") || name.includes("methi")) return { emoji: "🥦", bg: "from-green-100 to-emerald-100", border: "border-green-200" };
    return { emoji: "❄️", bg: "from-cyan-100 to-blue-100", border: "border-cyan-200" };
  };

  const visual = getProductVisual();

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.03 }}
        whileHover={{ scale: 1.08, y: -6, zIndex: 20 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-[120px] sm:w-[140px] flex-shrink-0 cursor-pointer"
      >
        <div className={`relative rounded-lg overflow-hidden border-2 ${visual.border} bg-gradient-to-br ${visual.bg} shadow-lg`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30 pointer-events-none" />
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: "25px 25px",
          }} />
          <div className="relative p-2.5">
            <div className="flex items-center justify-center h-14 sm:h-16 mb-2">
              <motion.span className="text-4xl sm:text-5xl drop-shadow-md" animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}>
                {visual.emoji}
              </motion.span>
            </div>
            <h3 className="text-[10px] sm:text-xs font-semibold text-gray-800 line-clamp-2 mb-1 min-h-[28px] leading-tight">{product.name}</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-[8px] text-gray-500">/{product.unit}</span>
            </div>
            <Button onClick={handleAddToCart} size="sm" className="w-full h-7 text-[10px] bg-cyan-600 hover:bg-cyan-700 text-white">
              <Plus className="h-3 w-3 mr-1" />Add
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-1 left-3 right-3 h-3 rounded-full bg-black/15 blur-sm" />
      </motion.div>
    </Link>
  );
}

// Scrollable shelf
function FreezerShelf({ products }: { products: Product[] }) {
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
      {/* Wire shelf */}
      <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-slate-400 to-slate-300 rounded-t" />
      <div className="absolute inset-x-0 top-3 h-2 bg-slate-300" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 8px, rgba(100,116,139,0.5) 8px, rgba(100,116,139,0.5) 10px)`,
      }} />

      <div className="relative pt-6 pb-4">
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-lg border flex items-center justify-center hover:bg-white">
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </motion.button>
          )}
        </AnimatePresence>

        <div ref={scrollRef} onScroll={checkScroll} className="flex gap-3 overflow-x-auto px-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: "none" }}>
          {products.map((product, idx) => <FreezerProduct key={product.id} product={product} index={idx} />)}
        </div>

        <AnimatePresence>
          {canScrollRight && products.length > 3 && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-lg border flex items-center justify-center hover:bg-white">
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </motion.button>
          )}
        </AnimatePresence>

        {canScrollLeft && <div className="absolute left-0 top-6 bottom-4 w-12 bg-gradient-to-r from-slate-100 to-transparent pointer-events-none z-10" />}
        {canScrollRight && products.length > 3 && <div className="absolute right-0 top-6 bottom-4 w-12 bg-gradient-to-l from-slate-100 to-transparent pointer-events-none z-10" />}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-b from-slate-400 to-slate-500 rounded-b shadow-md" />
    </div>
  );
}

// Freezer unit
function FreezerUnit({ section, products, isOpen, onToggle }: { section: string; products: Product[]; isOpen: boolean; onToggle: () => void }) {
  const productsPerShelf = 8;
  const shelves: Product[][] = [];
  for (let i = 0; i < products.length; i += productsPerShelf) {
    shelves.push(products.slice(i, i + productsPerShelf));
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        <h3 className="text-lg font-semibold text-slate-700 px-3 py-1 bg-cyan-50 rounded-full border border-cyan-200">{section}</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      </div>

      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        <div className="h-4 bg-gradient-to-b from-slate-500 via-slate-400 to-slate-500 border-b border-slate-600">
          <div className="h-1 mt-1.5 mx-4 bg-gradient-to-r from-slate-600 via-slate-300 to-slate-600 rounded-full" />
        </div>

        <div className="relative bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 cursor-pointer" onClick={onToggle}>
          <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-cyan-200/50 via-cyan-100/30 to-transparent z-10" />
          <div className="absolute top-1 inset-x-6 h-1 bg-cyan-300/60 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] z-10" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 60px, rgba(100,116,139,0.3) 60px, rgba(100,116,139,0.3) 61px)` }} />

          <div className="relative py-6 space-y-6">
            {shelves.map((shelfProducts, idx) => <FreezerShelf key={idx} products={shelfProducts} />)}
          </div>

          <motion.div animate={{ opacity: [0.3, 0.5, 0.3], y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-cyan-100/40 via-cyan-50/20 to-transparent pointer-events-none" />

          <motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity: isOpen ? 0 : 1 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-slate-100/20 to-cyan-50/30" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-4 py-2 bg-white/80 rounded-full text-sm text-slate-600 shadow-lg">👆 Tap to see clearly</span>
            </div>
          </motion.div>
        </div>

        <div className="h-4 bg-gradient-to-t from-slate-500 via-slate-400 to-slate-500 border-t border-slate-600" />
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

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const toggleSection = (section: string) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  return (
    <div className="relative min-h-screen py-8">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-100 via-cyan-50/20 to-slate-100" />

      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="fixed top-24 right-4 z-50 bg-slate-900/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-lg font-bold text-cyan-300">-18°C</div>
            <div className="text-[10px] text-cyan-400/70">Optimal temp</div>
          </div>
        </div>
      </motion.div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute text-cyan-200/20" initial={{ x: `${Math.random() * 100}%`, y: -20 }} animate={{ y: "100vh", rotate: 360 }} transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}>
            <Snowflake className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="flex justify-center mb-4"><SwadLogo /></div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full mb-4">
            <Snowflake className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-medium text-cyan-800">Frozen Section • Patel Brothers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 font-display">Indian Frozen Foods</h2>
          <p className="text-slate-600 mt-2">Scroll shelves to browse • Tap to clear frost</p>
        </motion.div>

        <div className="space-y-10">
          {Object.entries(productsBySection).map(([section, sectionProducts], idx) => (
            <motion.div key={section} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
              <FreezerUnit section={section} products={sectionProducts} isOpen={openSections[section] || false} onToggle={() => toggleSection(section)} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
