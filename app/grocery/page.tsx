"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TopNav } from "@/components/layout/TopNav";
import { CategoryStrip } from "@/components/grocery/CategoryStrip";
import { PageShell } from "@/components/layout/PageShell";
import { categories, corners, products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight, Sparkles, Leaf, Clock, TrendingUp } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Corner visual configurations
const cornerConfig: Record<string, { 
  gradient: string; 
  accent: string;
  icon: string;
  pattern: string;
}> = {
  "patel-brothers": {
    gradient: "from-amber-500 via-orange-500 to-red-500",
    accent: "text-orange-600 bg-orange-50",
    icon: "🌶️",
    pattern: "radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)",
  },
  "shoprite": {
    gradient: "from-red-500 via-rose-500 to-pink-500",
    accent: "text-red-600 bg-red-50",
    icon: "🛒",
    pattern: "radial-gradient(circle at 20% 80%, rgba(244, 63, 94, 0.12) 0%, transparent 50%)",
  },
  "hmart": {
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    accent: "text-indigo-600 bg-indigo-50",
    icon: "🥢",
    pattern: "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%)",
  },
};

export default function GroceryPage() {
  // Group products by category
  const productsByCategory = categories.map((category) => ({
    category,
    products: products.filter((p) => p.categorySlug === category.slug).slice(0, 8),
  }));

  return (
    <div className="min-h-screen bg-background texture-organic">
      <TopNav />
      <CategoryStrip />

      <div className="gradient-mesh-grocery">
        <PageShell maxWidth="xl" className="py-8">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(158,64%,25%)] via-[hsl(158,60%,30%)] to-[hsl(170,50%,28%)] p-8 md:p-12">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.5" fill="currentColor" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI-Powered Savings</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight"
                >
                  Fresh groceries,
                  <br />
                  <span className="text-amber-300">smarter prices</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80 text-lg max-w-md mb-6"
                >
                  One cart. Multiple sources. Smarter prices, handled for you.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Fresh Daily</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Best Prices</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating produce illustration */}
              <div className="absolute right-8 bottom-0 hidden lg:flex items-end gap-2 opacity-90">
                <motion.span 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-7xl"
                >
                  🥬
                </motion.span>
                <motion.span 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="text-8xl -mb-2"
                >
                  🍎
                </motion.span>
                <motion.span 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-6xl"
                >
                  🥕
                </motion.span>
              </div>
            </div>
          </motion.section>

          {/* Curated Corners Section */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-14"
          >
            <motion.div variants={itemVariants} className="flex items-end justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight section-header-line">
                  Curated Corners
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Specialty-sourced items
                </p>
              </div>
              <Link href="/grocery/category/south-asian">
                <span className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors animated-underline">
                  View all corners
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-1">
              {corners.map((corner, idx) => {
                const config = cornerConfig[corner.slug];

                if (!config) return null;

                return (
                  <motion.div key={corner.slug} variants={itemVariants}>
                    <Link href={`/grocery/category/${corner.categorySlug}/corner/${corner.slug}`}>
                      <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-border hover:shadow-xl hover:-translate-y-1 corner-card-glow">
                        {/* Background pattern */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: config.pattern }}
                        />
                        
                        <div className="relative p-6">
                          {/* Corner badge icon */}
                          <div className={`mb-5 w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                            <span className="text-2xl">{config.icon}</span>
                          </div>
                          
                          {/* Corner name */}
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground/90 transition-colors">
                            {corner.name}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {corner.description}
                          </p>
                          
                          {/* Sections preview */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {corner.sections.slice(0, 3).map((section) => (
                              <span 
                                key={section} 
                                className={`text-xs px-2 py-1 rounded-md ${config.accent} font-medium`}
                              >
                                {section}
                              </span>
                            ))}
                            {corner.sections.length > 3 && (
                              <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground font-medium">
                                +{corner.sections.length - 3} more
                              </span>
                            )}
                          </div>
                          
                          {/* CTA */}
                          <div className="flex items-center text-sm font-medium text-primary opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            <span>Explore corner</span>
                            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                        
                        {/* Corner badge */}
                        <div className={`absolute top-4 right-4 text-[10px] px-2 py-1 rounded-full ${config.accent} font-semibold uppercase tracking-wide`}>
                          Partner
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Product Sections by Category */}
          {productsByCategory.map(({ category, products: categoryProducts }, sectionIdx) => {
            if (categoryProducts.length === 0) return null;

            const sectionIcons: Record<string, string> = {
              "fresh-daily": "🥗",
              "smart-deals": "✨",
              "south-asian": "🌶️",
              "ready-to-cook": "❄️",
              "global-grocers": "🌍",
              "pantry-staples": "📦",
              "beverages": "☕",
            };

            return (
              <motion.section 
                key={category.slug}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="mb-14"
              >
                <motion.div variants={itemVariants} className="flex items-end justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <span className="text-xl">{sectionIcons[category.slug] || "📦"}</span>
                    </div>
                    <div>
                      <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                        {category.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {categoryProducts.length} items available
                      </p>
                    </div>
                  </div>
                  <Link href={`/grocery/category/${category.slug}`}>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      See all
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </motion.div>

                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  {categoryProducts.map((product, idx) => (
                    <motion.div 
                      key={product.id} 
                      variants={itemVariants}
                      custom={idx}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            );
          })}

          {/* Bottom CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 mb-4"
          >
            <div className="rounded-2xl bg-gradient-to-r from-secondary via-secondary to-muted p-8 text-center">
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Can&apos;t find what you&apos;re looking for?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our AI assistant can help you discover products and suggest alternatives.
              </p>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors">
                <Sparkles className="w-4 h-4" />
                Ask NeoMart AI
              </button>
            </div>
          </motion.section>
        </PageShell>
      </div>
    </div>
  );
}
