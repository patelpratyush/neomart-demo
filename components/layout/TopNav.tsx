"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const modes = [
  { slug: "grocery", name: "Grocery", href: "/grocery", active: true },
  { slug: "cafe", name: "Café", href: "/cafe", active: false },
  { slug: "pharmacy", name: "Pharmacy", href: "#", active: false },
  { slug: "services", name: "Services", href: "#", active: false },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((state) => state.totalItems);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Detect scroll for blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine active mode
  const getActiveMode = () => {
    if (pathname?.startsWith("/grocery")) return "grocery";
    if (pathname?.startsWith("/cafe")) return "cafe";
    if (pathname?.startsWith("/pharmacy")) return "pharmacy";
    if (pathname?.startsWith("/services")) return "services";
    return "grocery";
  };

  const activeMode = getActiveMode();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/grocery?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm"
          : "bg-white border-b border-gray-100"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Top Row: Logo + Search + Cart */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 hidden sm:inline">
              NeoMart
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-emerald-500 transition-all"
              />
            </div>
          </form>

          {/* Cart Icon */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative flex-shrink-0 hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge className="h-5 min-w-[20px] px-1 bg-emerald-500 hover:bg-emerald-600">
                      {totalItems}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </Link>
        </div>

        {/* Mode Tabs Row */}
        <div className="flex items-center gap-1 h-12 -mb-px">
          {modes.map((mode) => {
            const isActive = activeMode === mode.slug;
            const isClickable = mode.active;

            return (
              <Link
                key={mode.slug}
                href={isClickable ? mode.href : "#"}
                className={cn(
                  "relative px-4 h-full flex items-center text-sm font-medium transition-colors",
                  !isClickable && "cursor-not-allowed opacity-50"
                )}
                onClick={(e) => {
                  if (!isClickable) e.preventDefault();
                }}
              >
                <span
                  className={cn(
                    "transition-colors",
                    isActive ? "text-emerald-600" : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {mode.name}
                </span>
                {!mode.active && (
                  <span className="ml-1.5 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                    Soon
                  </span>
                )}

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeMode"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
