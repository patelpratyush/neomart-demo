"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  icon: string;
  gradient: string;
  message?: string;
  availableTime?: string;
  features?: string[];
}

export function ComingSoon({
  title,
  icon,
  gradient,
  message,
  availableTime,
  features = [],
}: ComingSoonProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl w-full text-center"
      >
        {/* Hero Section */}
        <div
          className={`relative overflow-hidden rounded-3xl ${gradient} p-12 md:p-16 shadow-2xl mb-8`}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl mb-6"
            >
              {icon}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
            >
              <Clock className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">Coming Soon</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {message || `${title} is on the way!`}
            </motion.h1>

            {availableTime && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/90 mb-6"
              >
                We'll be back at <span className="font-bold">{availableTime}</span>
              </motion.p>
            )}
          </div>
        </div>

        {/* Features or How it Works */}
        {features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              What to Expect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <Sparkles className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="text-sm text-gray-700">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notify Me
          </Button>
          <Link href="/grocery">
            <Button size="lg" variant="outline">
              Explore Grocery
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
