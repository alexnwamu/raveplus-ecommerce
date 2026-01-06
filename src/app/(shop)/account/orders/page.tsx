"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, User, Package, MapPin, Heart, LogOut, Eye, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice, formatDate } from "@/lib/utils";

const sidebarLinks = [
  { href: "/account", label: "My Account", icon: User },
  { href: "/account/orders", label: "Order History", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
];

// Placeholder orders
const orders = [
  {
    id: "RP-ABC123-XYZ",
    date: "2026-01-05",
    status: "delivered",
    items: 3,
    total: 285000,
  },
  {
    id: "RP-DEF456-UVW",
    date: "2025-12-28",
    status: "shipped",
    items: 2,
    total: 125000,
  },
  {
    id: "RP-GHI789-RST",
    date: "2025-12-15",
    status: "delivered",
    items: 1,
    total: 45000,
  },
  {
    id: "RP-JKL012-OPQ",
    date: "2025-11-20",
    status: "delivered",
    items: 4,
    total: 375000,
  },
];

const statusColors: Record<string, { label: string; variant: "default" | "success" | "warning" | "info" }> = {
  pending: { label: "Pending", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "info" },
  processing: { label: "Processing", variant: "info" },
  shipped: { label: "Shipped", variant: "info" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "default" },
};

export default function OrdersPage() {
  const pathname = usePathname();

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/account" className="hover:text-brand-primary transition-colors">
              My Account
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-brand-dark font-medium">Order History</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-border p-4 sticky top-24">
              <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
                <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-brand-dark">JD</span>
                </div>
                <div>
                  <p className="font-medium text-brand-dark">Jane Doe</p>
                  <p className="text-sm text-muted">jane@example.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-brand-cream text-brand-dark"
                          : "text-muted hover:bg-gray-50 hover:text-brand-dark"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-red-50 hover:text-error transition-colors">
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-border">
              <div className="p-6 border-b border-border">
                <h1 className="text-xl font-semibold text-brand-dark">
                  Order History
                </h1>
                <p className="text-sm text-muted mt-1">
                  View and track all your orders
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-muted" />
                  </div>
                  <h2 className="text-lg font-medium text-brand-dark mb-2">
                    No orders yet
                  </h2>
                  <p className="text-muted mb-6">
                    Start shopping to see your orders here
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-brand-primary hover:underline"
                  >
                    Browse Products
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {orders.map((order) => {
                    const status = statusColors[order.status];
                    return (
                      <div
                        key={order.id}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-medium text-brand-dark">
                                {order.id}
                              </p>
                              <Badge variant={status.variant}>{status.label}</Badge>
                            </div>
                            <p className="text-sm text-muted">
                              {formatDate(order.date)} • {order.items} items
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-semibold text-brand-dark">
                              {formatPrice(order.total)}
                            </p>
                            <Link
                              href={`/account/orders/${order.id}`}
                              className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                            >
                              <Eye className="h-5 w-5 text-muted" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
