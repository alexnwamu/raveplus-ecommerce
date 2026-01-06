"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { Product, ProductImage } from "@/types";

// Placeholder products for demonstration
const placeholderProducts: (Product & { images: ProductImage[] })[] = [
  {
    id: "1",
    category_id: "1",
    name: "Elegant Beige Coat",
    slug: "elegant-beige-coat",
    description: "A stunning beige coat perfect for any occasion",
    price: 85000,
    compare_at_price: 120000,
    stock_quantity: 15,
    is_active: true,
    is_featured: true,
    is_new: true,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "1",
        product_id: "1",
        url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop",
        alt_text: "Beige coat front view",
        sort_order: 0,
        is_primary: true,
      },
      {
        id: "2",
        product_id: "1",
        url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
        alt_text: "Beige coat side view",
        sort_order: 1,
        is_primary: false,
      },
    ],
  },
  {
    id: "2",
    category_id: "2",
    name: "Silk Blouse White",
    slug: "silk-blouse-white",
    description: "Luxurious silk blouse in classic white",
    price: 45000,
    compare_at_price: null,
    stock_quantity: 25,
    is_active: true,
    is_featured: true,
    is_new: true,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "3",
        product_id: "2",
        url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2010&auto=format&fit=crop",
        alt_text: "White silk blouse",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "3",
    category_id: "1",
    name: "Floral Summer Dress",
    slug: "floral-summer-dress",
    description: "Beautiful floral print dress for summer",
    price: 55000,
    compare_at_price: 75000,
    stock_quantity: 8,
    is_active: true,
    is_featured: false,
    is_new: true,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "4",
        product_id: "3",
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop",
        alt_text: "Floral summer dress",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "4",
    category_id: "3",
    name: "High-Waist Trousers",
    slug: "high-waist-trousers",
    description: "Classic high-waist trousers in neutral tone",
    price: 38000,
    compare_at_price: null,
    stock_quantity: 20,
    is_active: true,
    is_featured: true,
    is_new: false,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "5",
        product_id: "4",
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop",
        alt_text: "High-waist trousers",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
];

interface NewArrivalsProps {
  products?: (Product & { images: ProductImage[] })[];
}

export function NewArrivals({ products = placeholderProducts }: NewArrivalsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-sm font-medium text-brand-terracotta uppercase tracking-wider">
              Fresh Arrivals
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-brand-dark mt-2">
              New Arrivals
            </h2>
            <p className="text-muted mt-2 max-w-md">
              Discover our latest collection of carefully curated pieces designed for the modern woman.
            </p>
          </div>
          <Link
            href="/products?filter=new"
            className="inline-flex items-center gap-2 text-brand-dark font-medium hover:text-brand-primary transition-colors group"
          >
            View All New Arrivals
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
