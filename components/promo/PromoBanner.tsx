"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PromoBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  gradient: string;
  icon?: string;
  ctaText?: string;
  ctaAction?: () => void;
  image?: string;
}

export function PromoBanner({
  title,
  subtitle,
  description,
  gradient,
  icon,
  ctaText = "Shop Now",
  ctaAction,
  image,
}: PromoBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl ${gradient} p-8 md:p-12 shadow-lg`}
    >
      <div className="relative z-10 max-w-2xl">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-2"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3"
        >
          {icon && <span className="text-4xl md:text-6xl">{icon}</span>}
          {title}
        </motion.h2>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/90 mb-6"
          >
            {description}
          </motion.p>
        )}

        {ctaText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={ctaAction}
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-xl"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
        <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-white rounded-full blur-3xl" />
      </div>

      {image && (
        <div className="absolute right-8 bottom-0 hidden md:block">
          <span className="text-9xl">{image}</span>
        </div>
      )}
    </motion.div>
  );
}
