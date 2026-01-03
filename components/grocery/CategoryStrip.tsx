"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { slug: "all", name: "All", icon: "🏪", href: "/grocery" },
  { slug: "fresh-daily", name: "Fresh & Daily", icon: "🍎", href: "/grocery/category/fresh-daily" },
  { slug: "smart-deals", name: "Smart Deals", icon: "✨", href: "/grocery/category/smart-deals" },
  { slug: "south-asian", name: "South Asian", icon: "🌶️", href: "/grocery/category/south-asian" },
  { slug: "ready-to-cook", name: "Ready to Cook", icon: "❄️", href: "/grocery/category/ready-to-cook" },
  { slug: "global-grocers", name: "Global Grocers", icon: "🌍", href: "/grocery/category/global-grocers" },
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
    <div className="sticky top-[112px] z-40 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Left fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          )}

          {/* Categories */}
          <div
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <Link key={category.slug} href={category.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all",
                      isActive
                        ? "bg-emerald-500 text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span className="text-base">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right fade */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          )}
        </div>
      </div>
    </div>
  );
}
