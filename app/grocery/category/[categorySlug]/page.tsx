"use client";

import { useState, use } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { CategoryStrip } from "@/components/grocery/CategoryStrip";
import { PageShell } from "@/components/layout/PageShell";
import { FilterDrawer } from "@/components/filters/filter-drawer";
import { ProductCard } from "@/components/product/ProductCard";
import { RealisticFreezerAisle } from "@/components/aisle/realistic-freezer-aisle";
import { RealisticProduceAisle } from "@/components/aisle/realistic-produce-aisle";
import { RealisticPantryAisle } from "@/components/aisle/realistic-pantry-aisle";
import { getCategoryBySlug, getProductsByCategory, getProductsBySection } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, Snowflake, Leaf, Package, Store } from "lucide-react";

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

  // Determine aisle view type based on category
  const getAisleConfig = () => {
    switch (category.slug) {
      case "ready-to-cook":
        return {
          icon: <Snowflake className="h-4 w-4" />,
          label: "Freezer",
          color: "bg-cyan-600 hover:bg-cyan-700",
          component: "freezer"
        };
      case "fresh-daily":
        return {
          icon: <Leaf className="h-4 w-4" />,
          label: "Market",
          color: "bg-green-600 hover:bg-green-700",
          component: "produce"
        };
      case "south-asian":
        return {
          icon: <Package className="h-4 w-4" />,
          label: "Pantry",
          color: "bg-orange-600 hover:bg-orange-700",
          component: "pantry"
        };
      default:
        return {
          icon: <Store className="h-4 w-4" />,
          label: "Aisle",
          color: "bg-primary hover:bg-primary/90",
          component: "default"
        };
    }
  };

  const aisleConfig = getAisleConfig();
  const showAisleView = viewMode === "aisle" && products.length > 0;

  // Filter products for specific aisle types
  const frozenProducts = products.filter((p) => p.isFrozen);
  const produceProducts = products.filter((p) => p.isProduce);

  return (
    <>
      <TopNav />
      <CategoryStrip />

      <PageShell maxWidth="xl" className="min-h-screen bg-white py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent font-display">
            {category.name}
          </h1>
          <p className="text-gray-600">
            {products.length} products available
          </p>
        </div>

        {/* Controls Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search products..."
              className="pl-4 border-gray-200 bg-white shadow-sm"
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
                className={`h-9 px-3 md:px-4 rounded-lg ${viewMode === "aisle" ? aisleConfig.color : ""}`}
              >
                {aisleConfig.icon}
                <span className="hidden md:inline ml-1.5">{aisleConfig.label}</span>
              </Button>
            </div>

            {/* Filters */}
            <FilterDrawer
              sections={category.sections}
              selectedSection={selectedSection}
              onSectionChange={setSelectedSection}
            />
          </div>
        </div>

        {/* Product Area */}
        <AnimatePresence mode="wait">
          {showAisleView && aisleConfig.component === "freezer" && frozenProducts.length > 0 ? (
            <motion.div
              key="freezer-aisle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <RealisticFreezerAisle products={frozenProducts} />
            </motion.div>
          ) : showAisleView && aisleConfig.component === "produce" ? (
            <motion.div
              key="produce-aisle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <RealisticProduceAisle products={produceProducts.length > 0 ? produceProducts : products} />
            </motion.div>
          ) : showAisleView && aisleConfig.component === "pantry" ? (
            <motion.div
              key="pantry-aisle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <RealisticPantryAisle products={products} />
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
