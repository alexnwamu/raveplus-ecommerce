"use client";

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ChevronRight, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityPicker } from "@/components/products/quantity-picker";
import { useCart } from "@/features/cart/cart-context";
import { formatPrice, qualifiesForFreeShipping, calculateShippingCost } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default function CartPage() {
  const { items, subtotal, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  const shippingCost = calculateShippingCost(subtotal);
  const freeShippingRemaining = siteConfig.shipping.freeShippingThreshold - subtotal;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-muted" />
          </div>
          <h1 className="font-display text-2xl text-brand-dark mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-muted mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-brand-cream py-4">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-brand-dark font-medium">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <h1 className="font-display text-3xl text-brand-dark mb-8">
          Shopping Cart ({itemCount} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {freeShippingRemaining > 0 && (
              <div className="bg-brand-cream rounded-lg p-4 mb-6">
                <p className="text-sm text-brand-dark mb-2">
                  Add <span className="font-semibold">{formatPrice(freeShippingRemaining)}</span> more for free shipping!
                </p>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotal / siteConfig.shipping.freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex gap-4 p-4 bg-white border border-border rounded-lg"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative w-24 h-32 flex-shrink-0 rounded-md overflow-hidden bg-brand-cream"
                >
                  {item.product.images?.[0] ? (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-muted" />
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-medium text-brand-dark hover:text-brand-primary transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  
                  {item.variant && (
                    <p className="text-sm text-muted mt-1">
                      {item.variant.color} / {item.variant.size}
                    </p>
                  )}

                  <p className="font-semibold text-brand-dark mt-2">
                    {formatPrice(item.product.price + (item.variant?.price_modifier || 0))}
                  </p>

                  {/* Quantity & Remove */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-brand-cream transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-brand-cream transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="p-2 text-muted hover:text-error transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="hidden sm:block text-right">
                  <p className="font-semibold text-brand-dark">
                    {formatPrice((item.product.price + (item.variant?.price_modifier || 0)) * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="outline">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-brand-cream rounded-xl p-6">
              <h2 className="font-display text-xl text-brand-dark mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-brand-dark font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-brand-dark font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-brand-dark">Total</span>
                    <span className="text-xl font-semibold text-brand-dark">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                fullWidth
                className="mt-6"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-xs text-muted text-center mb-2">
                  Secure checkout powered by
                </p>
                <p className="text-sm font-semibold text-center text-brand-dark">
                  Paystack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
