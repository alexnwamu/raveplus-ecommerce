"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedCollection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
              alt="Pre-Spring Collection 2026"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/30 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-12"
          >
            <span className="inline-block px-4 py-2 bg-brand-terracotta/10 text-brand-terracotta text-sm font-medium rounded-full mb-6">
              Limited Edition
            </span>

            <h2 className="font-display text-4xl md:text-5xl text-brand-dark mb-4 leading-tight">
              Pre-Spring
              <br />
              <span className="italic">Collection</span> 2026
            </h2>

            <p className="text-muted text-lg mb-8 max-w-md">
              Effortlessly graceful yet wonderfully refined. Embrace bold 
              minimalism with our pre-spring collection designed for the 
              sophisticated woman.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                <Link href="/collections/pre-spring-2026">Explore Collection</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/lookbook">View Lookbook</Link>
              </Button>
            </div>

            {/* Mini stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-display font-semibold text-brand-terracotta">45</p>
                <p className="text-sm text-muted">New Pieces</p>
              </div>
              <div>
                <p className="text-3xl font-display font-semibold text-brand-terracotta">12</p>
                <p className="text-sm text-muted">Unique Styles</p>
              </div>
              <div>
                <p className="text-3xl font-display font-semibold text-brand-terracotta">100%</p>
                <p className="text-sm text-muted">Premium Quality</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
