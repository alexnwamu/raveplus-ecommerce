"use client";

import { motion } from "framer-motion";
import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";
import { siteConfig } from "@/config/site";

const iconMap: Record<string, React.ElementType> = {
  Truck,
  RefreshCw,
  Shield,
  Headphones,
};

export function TrustBadges() {
  return (
    <section className="py-16 bg-brand-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {siteConfig.trustBadges.map((badge, index) => {
            const Icon = iconMap[badge.icon];
            
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl shadow-sm mb-4">
                  <Icon className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="font-medium text-brand-dark text-sm mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-muted">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
