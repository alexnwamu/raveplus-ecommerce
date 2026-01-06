"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const categoryImages: Record<string, string> = {
  dresses: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop",
  tops: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2010&auto=format&fit=crop",
  "jackets-coats": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop",
  skirts: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj9e?q=80&w=1964&auto=format&fit=crop",
  pants: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop",
  accessories: "https://images.unsplash.com/photo-1611923134239-b9be5b4d1b04?q=80&w=1974&auto=format&fit=crop",
};

export function CategoryGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-brand-terracotta uppercase tracking-wider">
            Browse Collections
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-brand-dark mt-2">
            Shop by Category
          </h2>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {siteConfig.categories.map((category, index) => (
            <motion.div
              key={category.slug}
              variants={itemVariants}
              className={index === 0 ? "md:row-span-2" : ""}
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="group relative block aspect-[3/4] rounded-xl overflow-hidden bg-brand-cream"
              >
                {/* Image */}
                <Image
                  src={categoryImages[category.slug] || categoryImages.dresses}
                  alt={category.name}
                  fill
                  sizes={index === 0 ? "(max-width: 768px) 50vw, 33vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  <h3 className="font-display text-xl md:text-2xl text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-3 line-clamp-2 hidden md:block">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
