"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TopNav } from "@/components/layout/TopNav";
import { CategoryStrip } from "@/components/grocery/CategoryStrip";
import { PageShell } from "@/components/layout/PageShell";
import { categories, corners, products } from "@/lib/data";
import { PromoBanner } from "@/components/promo/PromoBanner";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

export default function GroceryPage() {
  // Group products by category
  const productsByCategory = categories.map((category) => ({
    category,
    products: products.filter((p) => p.categorySlug === category.slug).slice(0, 8),
  }));

  return (
    <>
      <TopNav />
      <CategoryStrip />

      <PageShell maxWidth="xl" className="min-h-screen bg-white">
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
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </PageShell>
    </>
  );
}
