"use client";

import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-white">N</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">NeoMart</span>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link href="/grocery">
            <Button variant="ghost" className="text-sm font-medium">
              Grocery
            </Button>
          </Link>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground" disabled>
            Café
            <Badge variant="secondary" className="ml-2 text-xs">Soon</Badge>
          </Button>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground" disabled>
            Pharmacy
            <Badge variant="secondary" className="ml-2 text-xs">Soon</Badge>
          </Button>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-8 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="w-full pl-9 border-border/50"
          />
        </div>

        {/* Cart Icon */}
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative transition-transform hover:scale-105 active:scale-95">
            <ShoppingCart className="h-5 w-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute -right-1 -top-1"
                >
                  <Badge className="h-5 min-w-[20px] rounded-full px-1 flex items-center justify-center text-xs bg-primary">
                    {totalItems}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </Link>
      </div>
    </header>
  );
}
