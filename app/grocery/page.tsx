"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/nav/header";
import { categories, corners, products } from "@/lib/data";
import { PromoBanner } from "@/components/promo/PromoBanner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function GroceryPage() {
  const addItem = useCartStore((state) => state.addItem);

  // Get category icons mapping
  const categoryIconMap: Record<string, string> = {
    "fresh-daily": "🍎",
    "smart-deals": "✨",
    "south-asian": "🌶️",
    "ready-to-cook": "❄️",
    "global-grocers": "🌍",
    "pantry-staples": "📦",
    "beverages": "☕",
  };

  // Group products by category
  const productsByCategory = categories.map((category) => ({
    category,
    products: products.filter((p) => p.categorySlug === category.slug).slice(0, 8),
  }));

  // Format price
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-white to-blue-50/20">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Promo Banner */}
        <section className="mb-8">
          <PromoBanner
            title="SUPER SAVER DEALS"
            subtitle="Limited Time"
            description="Save up to 50% on fresh groceries. Delivered in minutes."
            gradient="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
            icon="🛒"
            ctaText="Shop Now"
          />
        </section>

        {/* Shop by Category */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <Link key={category.slug} href={`/grocery/category/${category.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 text-center cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-2 shadow-md hover:shadow-lg transition-all">
                    <span className="text-3xl">{categoryIconMap[category.slug] || "📦"}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700 max-w-[80px] line-clamp-2">
                    {category.name}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Corners */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Curated Corners</h2>
            <Link href="/grocery/category/south-asian">
              <span className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                See All <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {corners.map((corner, idx) => {
              const gradients = [
                "from-amber-400 to-orange-500",
                "from-red-400 to-rose-500",
                "from-orange-400 to-amber-500",
              ];
              return (
                <Link
                  key={corner.slug}
                  href={`/grocery/category/${corner.categorySlug}/corner/${corner.slug}`}
                >
                  <Card className="group relative overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div
                        className={`mb-4 flex h-16 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[idx]} shadow-lg transform transition-transform duration-300 group-hover:scale-105`}
                      >
                        <span className="text-2xl font-black text-white drop-shadow-lg">
                          {corner.badge}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900">{corner.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{corner.description}</p>
                      <div className="mt-3 flex items-center text-xs font-medium text-emerald-600 group-hover:text-emerald-700">
                        Explore
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Product Sections by Category */}
        {productsByCategory.map(({ category, products: categoryProducts }) => {
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.slug} className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <Link href={`/grocery/category/${category.slug}`}>
                  <span className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                    See All <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categoryProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all"
                  >
                    {/* Discount Badge */}
                    {product.rank <= 3 && (
                      <Badge className="mb-2 bg-emerald-500 text-white text-xs">
                        {10 + product.rank * 5}% OFF
                      </Badge>
                    )}

                    {/* Product Visual */}
                    <div className="w-full h-32 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-5xl">
                        {product.isProduce ? "🍎" : product.isFrozen ? "❄️" : "📦"}
                      </span>
                    </div>

                    {/* Product Info */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[40px]">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-base font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs text-gray-500">/{product.unit}</span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-400 text-xs">★★★★☆</span>
                      <span className="text-xs text-gray-500">(4.2k)</span>
                    </div>

                    {/* ADD Button */}
                    <Button
                      size="sm"
                      onClick={() => addItem(product, 1)}
                      className="w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-semibold transition-colors"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      ADD
                    </Button>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
