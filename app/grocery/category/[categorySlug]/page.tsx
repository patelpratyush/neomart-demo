"use client";

import { useState, use } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { CategoryStrip } from "@/components/grocery/CategoryStrip";
import { PageShell } from "@/components/layout/PageShell";
import { FilterDrawer } from "@/components/filters/filter-drawer";
import { ProductCard } from "@/components/product/ProductCard";
import { FreezerAisle3D } from "@/components/aisle/freezer-aisle-3d";
import { ProduceBins3D } from "@/components/aisle/produce-bins-3d";
import { FreshDailyAisle3D } from "@/components/aisle/fresh-daily-aisle-3d";
import { getCategoryBySlug, getProductsByCategory, getProductsBySection } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, LayoutList, Search } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const resolvedParams = use(params);
  const category = getCategoryBySlug(resolvedParams.categorySlug);
  const [viewMode, setViewMode] = useState<"grid" | "aisle">("grid");
  const [selectedSection, setSelectedSection] = useState<string | undefined>();

  if (!category) {
    return <div>Category not found</div>;
  }

  const products = selectedSection
    ? getProductsBySection(category.slug, selectedSection)
    : getProductsByCategory(category.slug);

  // Determine if we should show aisle view
  const showFrozenAisle =
    viewMode === "aisle" &&
    category.slug === "ready-to-cook" &&
    products.some((p) => p.isFrozen);

  const showProduceAisle =
    viewMode === "aisle" &&
    category.slug === "fresh-daily" &&
    selectedSection === "Produce" &&
    products.some((p) => p.isProduce);

  const showFreshDailyAisle =
    viewMode === "aisle" &&
    category.slug === "fresh-daily" &&
    !selectedSection;

  const frozenProducts = products.filter((p) => p.isFrozen);
  const produceProducts = products.filter((p) => p.isProduce);

  return (
    <>
      <TopNav />
      <CategoryStrip />

      <PageShell maxWidth="xl" className="min-h-screen bg-white py-8">
        {/* Minimal Header */}
        <div className="mb-12">
          <h1 className="mb-3 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {category.name}
          </h1>
          <p className="text-gray-600">
            {products.length} products available
          </p>
        </div>

        {/* Minimal Controls Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-9 border-gray-200 bg-white shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-9 px-3 md:px-4 rounded-lg"
              >
                <Grid className="h-4 w-4 md:mr-1.5" />
                <span className="hidden md:inline">Grid</span>
              </Button>
              <Button
                variant={viewMode === "aisle" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("aisle")}
                className="h-9 px-3 md:px-4 rounded-lg"
              >
                <LayoutList className="h-4 w-4 md:mr-1.5" />
                <span className="hidden md:inline">Aisle</span>
              </Button>
            </div>

            {/* Filters Drawer */}
            <FilterDrawer
              sections={category.sections}
              selectedSection={selectedSection}
              onSectionChange={setSelectedSection}
            />
          </div>
        </div>

        {/* Product Area */}
        <AnimatePresence mode="wait">
          {showFrozenAisle ? (
            <motion.div
              key="frozen-aisle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <FreezerAisle3D products={frozenProducts} />
            </motion.div>
          ) : showFreshDailyAisle ? (
            <motion.div
              key="fresh-daily-aisle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <FreshDailyAisle3D products={products} />
            </motion.div>
          ) : showProduceAisle ? (
            <motion.div
              key="produce-aisle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <ProduceBins3D products={produceProducts} />
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </PageShell>
    </>
  );
}
