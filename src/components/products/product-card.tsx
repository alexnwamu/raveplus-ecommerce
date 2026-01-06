"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn, formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { Product, ProductImage as ProductImageType } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product & { images?: ProductImageType[] };
  priority?: boolean;
  showQuickAdd?: boolean;
  onQuickAdd?: () => void;
}

export function ProductCard({
  product,
  priority = false,
  showQuickAdd = true,
  onQuickAdd,
}: ProductCardProps) {
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  const secondaryImage = product.images?.[1];
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercentage = hasDiscount
    ? calculateDiscountPercentage(product.compare_at_price!, product.price)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      {/* Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-product overflow-hidden rounded-lg bg-brand-cream"
      >
        {/* Primary Image */}
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={cn(
              "object-cover transition-all duration-500",
              secondaryImage && "group-hover:opacity-0"
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            <ShoppingBag className="h-12 w-12" />
          </div>
        )}

        {/* Secondary Image (on hover) */}
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_new && (
            <Badge className="bg-brand-dark text-white text-[10px]">NEW</Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-error text-white text-[10px]">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-brand-cream transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Add Button */}
        {showQuickAdd && (
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickAdd?.();
              }}
              className="w-full py-2.5 bg-white/95 backdrop-blur-sm rounded-lg font-medium text-sm hover:bg-brand-dark hover:text-white transition-colors"
            >
              Quick Add
            </button>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        {/* Category */}
        {product.category && (
          <p className="text-xs text-muted uppercase tracking-wider">
            {product.category.name}
          </p>
        )}

        {/* Name */}
        <h3 className="font-medium text-brand-dark line-clamp-2">
          <Link href={`/products/${product.slug}`} className="hover:text-brand-primary transition-colors">
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        {/* Placeholder for reviews */}
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-xs text-muted">4.8</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-brand-dark">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <p className="text-xs text-error">
            Only {product.stock_quantity} left!
          </p>
        )}
        {product.stock_quantity === 0 && (
          <p className="text-xs text-error font-medium">Out of Stock</p>
        )}
      </div>
    </motion.article>
  );
}
