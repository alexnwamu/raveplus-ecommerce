"use client";

import * as React from "react";
import { Star, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SizeSelector } from "@/components/products/size-selector";
import { ColorSelector } from "@/components/products/color-selector";
import { QuantityPicker } from "@/components/products/quantity-picker";
import { useCart } from "@/features/cart/cart-context";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { Product, ProductImage, ProductVariant, Category } from "@/types";

interface ProductInfoProps {
  product: Product & {
    images: ProductImage[];
    variants: ProductVariant[];
    category: Category;
  };
  averageRating: number;
  reviewCount: number;
}

export function ProductInfo({ product, averageRating, reviewCount }: ProductInfoProps) {
  const { addItem } = useCart();

  // Get unique colors and sizes from variants
  const colors = React.useMemo(() => {
    const colorMap = new Map<string, { name: string; hex: string; available: boolean }>();
    product.variants.forEach((v) => {
      if (!colorMap.has(v.color)) {
        colorMap.set(v.color, {
          name: v.color,
          hex: v.color_hex,
          available: v.stock_quantity > 0,
        });
      } else if (v.stock_quantity > 0) {
        const existing = colorMap.get(v.color)!;
        existing.available = true;
      }
    });
    return Array.from(colorMap.values());
  }, [product.variants]);

  const sizes = React.useMemo(() => {
    const uniqueSizes = [...new Set(product.variants.map((v) => v.size))];
    return uniqueSizes;
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = React.useState<string | null>(
    colors[0]?.name || null
  );
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);

  // Get available sizes for selected color
  const availableSizes = React.useMemo(() => {
    if (!selectedColor) return [];
    return product.variants
      .filter((v) => v.color === selectedColor && v.stock_quantity > 0)
      .map((v) => v.size);
  }, [product.variants, selectedColor]);

  // Get selected variant
  const selectedVariant = React.useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    return product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
  }, [product.variants, selectedColor, selectedSize]);

  // Calculate final price
  const finalPrice = product.price + (selectedVariant?.price_modifier || 0);
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercentage = hasDiscount
    ? calculateDiscountPercentage(product.compare_at_price!, product.price)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedVariant) {
      toast.error("Selected variant is not available");
      return;
    }
    if (selectedVariant.stock_quantity < quantity) {
      toast.error("Not enough stock available");
      return;
    }

    addItem(product, selectedVariant, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout
    window.location.href = "/checkout";
  };

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex gap-2">
        {product.is_new && <Badge>New Arrival</Badge>}
        {hasDiscount && (
          <Badge variant="error">-{discountPercentage}% OFF</Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl md:text-4xl text-brand-dark">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(averageRating)
                  ? "fill-warning text-warning"
                  : "fill-brand-cream text-brand-cream"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted">
          {averageRating} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-brand-dark">
          {formatPrice(finalPrice)}
        </span>
        {hasDiscount && (
          <span className="text-xl text-muted line-through">
            {formatPrice(product.compare_at_price!)}
          </span>
        )}
      </div>

      {/* Short Description */}
      <p className="text-muted leading-relaxed">
        {product.description?.split("\n")[0]}
      </p>

      {/* Color Selector */}
      {colors.length > 0 && (
        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onSelect={(color) => {
            setSelectedColor(color);
            setSelectedSize(null); // Reset size when color changes
          }}
        />
      )}

      {/* Size Selector */}
      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
        availableSizes={availableSizes}
      />

      {/* Quantity */}
      <QuantityPicker
        quantity={quantity}
        onQuantityChange={setQuantity}
        max={selectedVariant?.stock_quantity || 10}
      />

      {/* Stock Status */}
      {selectedVariant && (
        <p className="text-sm">
          {selectedVariant.stock_quantity > 5 ? (
            <span className="text-success">In Stock</span>
          ) : selectedVariant.stock_quantity > 0 ? (
            <span className="text-warning">
              Only {selectedVariant.stock_quantity} left!
            </span>
          ) : (
            <span className="text-error">Out of Stock</span>
          )}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={!selectedVariant || selectedVariant.stock_quantity === 0}
        >
          Add to Cart
        </Button>
        <Button
          size="lg"
          fullWidth
          onClick={handleBuyNow}
          disabled={!selectedVariant || selectedVariant.stock_quantity === 0}
        >
          Buy It Now
        </Button>
      </div>

      {/* Wishlist & Share */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <button className="flex items-center gap-2 text-sm text-muted hover:text-brand-dark transition-colors">
          <Heart className="h-5 w-5" />
          Add to Wishlist
        </button>
        <button className="flex items-center gap-2 text-sm text-muted hover:text-brand-dark transition-colors">
          <Share2 className="h-5 w-5" />
          Share
        </button>
      </div>

      {/* Category */}
      <div className="text-sm text-muted">
        Category:{" "}
        <a
          href={`/products?category=${product.category.slug}`}
          className="text-brand-primary hover:underline"
        >
          {product.category.name}
        </a>
      </div>
    </div>
  );
}
