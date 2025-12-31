"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart, Package, Truck, Sparkles, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/nav/header";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-purple-100/20 blur-3xl"
              animate={{
                x: [-100, 100, -100],
                y: [-50, 50, -50],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Floating Icons */}
          <motion.div
            className="absolute top-1/4 left-12 text-emerald-200/40"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Package className="h-12 w-12" />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-20 text-blue-200/40"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <ShoppingCart className="h-10 w-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/3 text-purple-200/40"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>

          <div className="container mx-auto px-4 py-24 md:py-40">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-200 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                  AI-Powered Commerce OS
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-6xl md:text-8xl font-bold tracking-tight text-transparent"
              >
                NeoMart
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="mb-2 text-xl md:text-2xl text-gray-600 font-light">
                  One cart. Multiple sources.
                </p>
                <p className="mb-12 text-xl md:text-2xl text-gray-600 font-light">
                  Unified fulfillment.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link href="/grocery">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="gap-2 text-base px-8 py-6 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all group"
                    >
                      Enter Grocery
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              >
                {[
                  { number: "10+", label: "Categories" },
                  { number: "50+", label: "Products" },
                  { number: "5+", label: "Sources" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="mb-16 text-center"
              >
                <h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900">
                  Commerce, reimagined
                </h2>
                <p className="text-lg text-gray-600">
                  Shop smarter with AI-powered unified commerce
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Package,
                    title: "Category-First",
                    description: "Browse by what you need, not where to find it. Unified discovery across all sources.",
                    gradient: "from-emerald-400 to-emerald-600",
                    shadowColor: "shadow-emerald-500/30",
                    delay: 0,
                  },
                  {
                    icon: ShoppingCart,
                    title: "Unified Cart",
                    description: "One cart for all sources. Single checkout. No more juggling multiple stores.",
                    gradient: "from-blue-400 to-blue-600",
                    shadowColor: "shadow-blue-500/30",
                    delay: 0.1,
                  },
                  {
                    icon: Truck,
                    title: "Smart Routing",
                    description: "Intelligent order splitting for optimal delivery times and freshness.",
                    gradient: "from-purple-400 to-purple-600",
                    shadowColor: "shadow-purple-500/30",
                    delay: 0.2,
                  },
                  {
                    icon: Sparkles,
                    title: "AI Powered",
                    description: "Smart pairings, substitutions, and personalized recommendations.",
                    gradient: "from-orange-400 to-orange-600",
                    shadowColor: "shadow-orange-500/30",
                    delay: 0.3,
                  },
                ].map((feature) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-xl hover:border-gray-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 to-gray-100/0 group-hover:from-gray-50/50 group-hover:to-gray-100/30 transition-all duration-300" />

                    <motion.div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.shadowColor} relative z-10`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>

                    <h3 className="mb-2 text-lg font-semibold text-gray-900 relative z-10">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="mb-16 text-center"
              >
                <h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900">
                  How it works
                </h2>
                <p className="text-lg text-gray-600">
                  Simple, unified shopping in four steps
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: "Browse by Category",
                    description: "Explore Fresh & Daily, Ready to Cook, South Asian Essentials, and more—all in one place.",
                  },
                  {
                    step: "2",
                    title: "Add from Any Source",
                    description: "Items from NeoMart, Patel Brothers, ShopRite, and local vendors—unified in one cart.",
                  },
                  {
                    step: "3",
                    title: "Single Checkout",
                    description: "One payment, one delivery window. We handle the complexity behind the scenes.",
                  },
                  {
                    step: "4",
                    title: "Smart Delivery",
                    description: "Your order is intelligently routed for optimal freshness and delivery time.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex gap-6 items-start group cursor-pointer"
                  >
                    <motion.div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-xl font-bold text-emerald-700 shadow-md group-hover:shadow-lg group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.step}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <motion.div
              className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-emerald-200 blur-3xl"
              animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-blue-200 blur-3xl"
              animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          {/* Floating stars */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300/40"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Star className="h-6 w-6 fill-current" />
            </motion.div>
          ))}

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Ready to explore?
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Experience the future of grocery shopping with NeoMart.
              </p>

              <Link href="/grocery">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="gap-2 px-8 py-6 text-base shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Shopping
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 NeoMart.ai — Commerce OS Demo</p>
        </div>
      </footer>
    </div>
  );
}
