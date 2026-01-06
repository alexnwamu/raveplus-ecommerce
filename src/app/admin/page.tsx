import { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

// Placeholder stats
const stats = [
  {
    title: "Total Revenue",
    value: formatPrice(2450000),
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "89",
    change: "+3",
    trend: "up",
    icon: Package,
  },
  {
    title: "Customers",
    value: "1,234",
    change: "+18.7%",
    trend: "up",
    icon: Users,
  },
];

// Placeholder recent orders
const recentOrders = [
  {
    id: "RP-ABC123",
    customer: "Jane Doe",
    date: "2026-01-06",
    status: "confirmed",
    total: 85000,
  },
  {
    id: "RP-DEF456",
    customer: "Sarah Johnson",
    date: "2026-01-06",
    status: "processing",
    total: 125000,
  },
  {
    id: "RP-GHI789",
    customer: "Mary Williams",
    date: "2026-01-05",
    status: "shipped",
    total: 45000,
  },
  {
    id: "RP-JKL012",
    customer: "Grace Obi",
    date: "2026-01-05",
    status: "delivered",
    total: 175000,
  },
  {
    id: "RP-MNO345",
    customer: "Amaka Eze",
    date: "2026-01-04",
    status: "pending",
    total: 95000,
  },
];

// Placeholder top products
const topProducts = [
  { name: "Nadetta Coat Beige", sold: 45, revenue: 3937500 },
  { name: "Silk Blouse White", sold: 38, revenue: 1710000 },
  { name: "Floral Summer Dress", sold: 32, revenue: 1760000 },
  { name: "High-Waist Trousers", sold: 28, revenue: 1064000 },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-brand-dark">Dashboard</h1>
        <p className="text-muted mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl p-6 border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-brand-cream rounded-lg">
                <stat.icon className="h-5 w-5 text-brand-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-semibold text-brand-dark">{stat.value}</p>
            <p className="text-sm text-muted mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-semibold text-brand-dark">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-brand-primary hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                    Order
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-brand-dark hover:text-brand-primary transition-colors"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-muted">{order.customer}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-medium">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-border">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-semibold text-brand-dark">Top Products</h2>
            <Link
              href="/admin/products"
              className="text-sm text-brand-primary hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-brand-cream rounded-full flex items-center justify-center text-sm font-medium text-brand-dark">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-dark truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted">{product.sold} sold</p>
                </div>
                <p className="text-sm font-medium text-brand-dark">
                  {formatPrice(product.revenue)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
