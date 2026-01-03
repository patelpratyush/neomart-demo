"use client";

import { use } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { CategoryStrip } from "@/components/grocery/CategoryStrip";
import { PageShell } from "@/components/layout/PageShell";
import { ProductCard } from "@/components/product/ProductCard";
import { getCornerBySlug, getProductsByCorner } from "@/lib/data";
import { Info } from "lucide-react";

export default function CornerPage({
  params,
}: {
  params: Promise<{ categorySlug: string; cornerSlug: string }>;
}) {
  const resolvedParams = use(params);
  const corner = getCornerBySlug(resolvedParams.cornerSlug);

  if (!corner) {
    return <div>Corner not found</div>;
  }

  const products = getProductsByCorner(corner.slug);

  // Group products by section
  const productsBySection: Record<string, typeof products> = {};
  products.forEach((product) => {
    if (!productsBySection[product.section]) {
      productsBySection[product.section] = [];
    }
    productsBySection[product.section].push(product);
  });

  return (
    <>
      <TopNav />
      <CategoryStrip />

      <PageShell maxWidth="xl" className="min-h-screen bg-white py-8">
        {/* Corner Header with Watermark */}
        <div className="relative mb-8 overflow-hidden rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-8">
          {/* Watermark */}
          <div
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-9xl font-bold opacity-5"
            style={{ color: "#d97706" }}
          >
            {corner.badge}
          </div>

          <div className="relative z-10">
            <h1 className="mb-2 text-4xl font-bold text-amber-900">{corner.name}</h1>
            <p className="mb-4 text-lg text-amber-700">{corner.description}</p>

            {/* Info Banner */}
            <div className="flex items-start gap-2 rounded-md bg-white/80 p-3 text-sm">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p className="text-amber-900">
                <strong>Note:</strong> Curated corner, not a separate store — NeoMart pricing &
                cart applies to all items.
              </p>
            </div>
          </div>
        </div>

        {/* Curated Sections */}
        <div className="space-y-12">
          {corner.sections.map((section) => {
            const sectionProducts = productsBySection[section] || [];
            if (sectionProducts.length === 0) return null;

            return (
              <section key={section}>
                <h2 className="mb-4 text-2xl font-bold">{section}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {sectionProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No products available in this corner.</p>
          </div>
        )}
      </PageShell>
    </>
  );
}
