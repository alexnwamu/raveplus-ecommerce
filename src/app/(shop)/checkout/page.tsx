"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Lock, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCart } from "@/features/cart/cart-context";
import { formatPrice, calculateShippingCost, nigerianStates } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clearCart } = useCart();
  const [isLoading, setIsLoading] = React.useState(false);

  // Form state
  const [formData, setFormData] = React.useState({
    email: "",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const shippingCost = calculateShippingCost(subtotal);
  const total = subtotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      // In production, this would:
      // 1. Create order in database
      // 2. Initialize Paystack payment
      // 3. Redirect to Paystack checkout
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Redirecting to payment...");
      
      // For demo purposes, just show success
      clearCart();
      window.location.href = "/order-confirmation/demo";
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            Add some items to your cart before checking out.
          </p>
          <Button size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream/30">
      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/cart" className="hover:text-brand-primary transition-colors">
              Cart
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-brand-dark font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl p-6">
                <h2 className="font-display text-xl text-brand-dark mb-6">
                  Contact Information
                </h2>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-6">
                <h2 className="font-display text-xl text-brand-dark mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    placeholder="John Doe"
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="+234 800 000 0000"
                    required
                  />

                  <Input
                    label="Address"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    error={errors.addressLine1}
                    placeholder="Street address"
                    required
                  />

                  <Input
                    label="Apartment, suite, etc. (optional)"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, etc."
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      placeholder="City"
                      required
                    />

                    <Select
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={errors.state}
                      placeholder="Select state"
                      options={nigerianStates.map((state) => ({
                        value: state,
                        label: state,
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-white rounded-xl p-6">
                <h2 className="font-display text-xl text-brand-dark mb-4">
                  Delivery Information
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-brand-cream rounded-lg">
                    <div className="w-4 h-4 rounded-full border-2 border-brand-primary bg-brand-primary" />
                    <div>
                      <p className="font-medium text-brand-dark">Standard Delivery</p>
                      <p className="text-muted">
                        {formData.state === "Lagos" ? "1-2 business days" : "3-5 business days"}
                      </p>
                    </div>
                    <span className="ml-auto font-medium text-brand-dark">
                      {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-white rounded-xl p-6">
                <h2 className="font-display text-xl text-brand-dark mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="flex gap-3"
                    >
                      <div className="relative w-16 h-20 flex-shrink-0 rounded-md overflow-hidden bg-brand-cream">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-muted" />
                          </div>
                        )}
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-dark text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-brand-dark line-clamp-1">
                          {item.product.name}
                        </p>
                        {item.variant && (
                          <p className="text-xs text-muted">
                            {item.variant.color} / {item.variant.size}
                          </p>
                        )}
                        <p className="text-sm font-medium mt-1">
                          {formatPrice(
                            (item.product.price + (item.variant?.price_modifier || 0)) *
                              item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-brand-dark">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className="text-brand-dark">
                      {shippingCost === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-medium text-brand-dark">Total</span>
                    <span className="text-xl font-semibold text-brand-dark">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  className="mt-6"
                  isLoading={isLoading}
                  leftIcon={<Lock className="h-4 w-4" />}
                >
                  Pay {formatPrice(total)}
                </Button>

                <p className="text-xs text-muted text-center mt-4">
                  Your payment is secured with Paystack
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
