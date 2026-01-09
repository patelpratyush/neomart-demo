"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const modes = [
  { slug: "grocery", name: "Grocery", href: "/grocery", active: true, icon: "🥬" },
  { slug: "cafe", name: "Café", href: "/cafe", active: false, icon: "☕" },
  { slug: "restaurants", name: "Restaurants", href: "/restaurants", active: false, icon: "🍽️" },
  { slug: "pharmacy", name: "Pharmacy", href: "#", active: false, icon: "💊" },
  { slug: "services", name: "Services", href: "#", active: false, icon: "🔧" },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((state) => state.totalItems);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

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
    if (pathname?.startsWith("/restaurants")) return "restaurants";
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
          ? "bg-card/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-card border-b border-border/50"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Top Row: Logo + Search + Cart */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-sm">
              <span className="text-lg font-bold text-primary-foreground font-display">N</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-semibold text-foreground font-display tracking-tight">
                NeoMart
              </span>
              <span className="text-[10px] text-muted-foreground block -mt-1 font-medium">
                One cart, everywhere
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className={cn(
              "relative transition-all duration-200",
              searchFocused && "scale-[1.02]"
            )}>
              <Search className={cn(
                "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                searchFocused ? "text-primary" : "text-muted-foreground"
              )} />
              <Input
                type="search"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cn(
                  "w-full pl-10 pr-4 h-11 bg-secondary/50 border-border/50 rounded-xl",
                  "focus:bg-card focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                  "transition-all placeholder:text-muted-foreground/70"
                )}
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Icon */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative flex-shrink-0 hover:bg-secondary transition-colors h-10 w-10 rounded-xl"
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
                      <Badge className="h-5 min-w-[20px] px-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs">
                        {totalItems}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </Link>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-xl hover:bg-secondary"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mode Tabs Row */}
        <div className="hidden md:flex items-center gap-1 h-12 -mb-px overflow-x-auto scrollbar-hide">
          {modes.map((mode) => {
            const isActive = activeMode === mode.slug;
            const isClickable = mode.active;

            return (
              <Link
                key={mode.slug}
                href={isClickable ? mode.href : "#"}
                className={cn(
                  "relative px-4 h-full flex items-center gap-2 text-sm font-medium transition-all",
                  !isClickable && "cursor-not-allowed opacity-50"
                )}
                onClick={(e) => {
                  if (!isClickable) e.preventDefault();
                }}
              >
                <span className="text-base">{mode.icon}</span>
                <span
                  className={cn(
                    "transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode.name}
                </span>
                {!mode.active && (
                  <span className="text-[9px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
                    Soon
                  </span>
                )}

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeMode"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-primary to-primary/70"
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
