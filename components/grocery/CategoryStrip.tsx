"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { slug: "all", name: "All", icon: "🏪", href: "/grocery" },
  { slug: "fresh-daily", name: "Fresh & Daily", icon: "🥗", href: "/grocery/category/fresh-daily" },
  { slug: "smart-deals", name: "Smart Deals", icon: "✨", href: "/grocery/category/smart-deals" },
  { slug: "south-asian", name: "South Asian", icon: "🌶️", href: "/grocery/category/south-asian" },
  { slug: "ready-to-cook", name: "Ready to Cook", icon: "❄️", href: "/grocery/category/ready-to-cook" },
  { slug: "global-grocers", name: "Global", icon: "🌍", href: "/grocery/category/global-grocers" },
  { slug: "pantry-staples", name: "Pantry", icon: "📦", href: "/grocery/category/pantry-staples" },
  { slug: "beverages", name: "Beverages", icon: "☕", href: "/grocery/category/beverages" },
];

export function CategoryStrip() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Determine active category
  const getActiveCategory = () => {
    if (pathname === "/grocery") return "all";
    const match = pathname?.match(/\/grocery\/category\/([^/]+)/);
    return match ? match[1] : "all";
  };

  const activeCategory = getActiveCategory();

  // Check scroll position
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  return (
    <div className="sticky top-[112px] z-40 bg-card/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="relative py-3">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-card shadow-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Left fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent pointer-events-none z-10" />
          )}

          {/* Categories */}
          <div
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-1"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <Link key={category.slug} href={category.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary/60 text-foreground hover:bg-secondary"
                    )}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                    
                    {/* Active glow effect */}
                    {isActive && (
                      <motion.div
                        layoutId="categoryGlow"
                        className="absolute inset-0 rounded-xl bg-primary/20 blur-lg -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right fade */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent pointer-events-none z-10" />
          )}

          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-card shadow-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
