import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Header, Footer } from "@/components/layout";

interface OrderConfirmationPageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { orderNumber } = await params;

  // In production, fetch order from database
  const order = {
    orderNumber,
    email: "jane@example.com",
    total: 285000,
    itemCount: 3,
    estimatedDelivery: "3-5 business days",
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream/30">
        <div className="container py-16">
          <div className="max-w-lg mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>

            {/* Heading */}
            <h1 className="font-display text-3xl text-brand-dark mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-muted mb-8">
              Your order has been placed successfully and is being processed.
            </p>

            {/* Order Details Card */}
            <div className="bg-white rounded-xl border border-border p-6 mb-8 text-left">
              <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
                <div className="p-2 bg-brand-cream rounded-lg">
                  <Package className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted">Order Number</p>
                  <p className="font-semibold text-brand-dark">{order.orderNumber}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Confirmation sent to</span>
                  <span className="text-brand-dark">{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Items</span>
                  <span className="text-brand-dark">{order.itemCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Estimated Delivery</span>
                  <span className="text-brand-dark">{order.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-medium text-brand-dark">Total</span>
                  <span className="font-semibold text-brand-dark">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button size="lg" fullWidth rightIcon={<ArrowRight className="h-5 w-5" />}>
                <Link href={`/account/orders/${order.orderNumber}`}>
                  Track Your Order
                </Link>
              </Button>
              <Button variant="outline" size="lg" fullWidth>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Help */}
            <p className="text-sm text-muted mt-8">
              Questions about your order?{" "}
              <Link href="/contact" className="text-brand-primary hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
