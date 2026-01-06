import { Metadata } from "next";
import Link from "next/link";
import { Search, Eye, Truck, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatPrice, formatDateTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders | Admin",
};

// Placeholder orders
const orders = [
  {
    id: "RP-ABC123-XYZ",
    customer: {
      name: "Jane Doe",
      email: "jane@example.com",
    },
    date: "2026-01-06T10:30:00",
    status: "confirmed",
    paymentStatus: "paid",
    items: 3,
    total: 285000,
  },
  {
    id: "RP-DEF456-UVW",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    date: "2026-01-06T09:15:00",
    status: "processing",
    paymentStatus: "paid",
    items: 2,
    total: 125000,
  },
  {
    id: "RP-GHI789-RST",
    customer: {
      name: "Mary Williams",
      email: "mary@example.com",
    },
    date: "2026-01-05T16:45:00",
    status: "shipped",
    paymentStatus: "paid",
    items: 1,
    total: 45000,
  },
  {
    id: "RP-JKL012-OPQ",
    customer: {
      name: "Grace Obi",
      email: "grace@example.com",
    },
    date: "2026-01-05T11:20:00",
    status: "delivered",
    paymentStatus: "paid",
    items: 4,
    total: 375000,
  },
  {
    id: "RP-MNO345-LMN",
    customer: {
      name: "Amaka Eze",
      email: "amaka@example.com",
    },
    date: "2026-01-04T14:00:00",
    status: "pending",
    paymentStatus: "pending",
    items: 2,
    total: 95000,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-brand-dark">Orders</h1>
        <p className="text-muted mt-1">Manage and track customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: 5, color: "text-yellow-600" },
          { label: "Processing", value: 8, color: "text-purple-600" },
          { label: "Shipped", value: 12, color: "text-indigo-600" },
          { label: "Delivered", value: 156, color: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <Input placeholder="Search orders..." className="pl-10" />
        </div>
        <select className="h-11 px-4 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select className="h-11 px-4 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20">
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Payment
                </th>
                <th className="text-right py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Total
                </th>
                <th className="text-right py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-brand-dark hover:text-brand-primary transition-colors"
                    >
                      {order.id}
                    </Link>
                    <p className="text-xs text-muted">{order.items} items</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-brand-dark">{order.customer.name}</p>
                    <p className="text-xs text-muted">{order.customer.email}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted">
                    {formatDateTime(order.date)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        paymentStatusColors[order.paymentStatus]
                      }`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-medium">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-muted" />
                      </Link>
                      {order.status === "confirmed" && (
                        <button
                          className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Mark as Processing"
                        >
                          <Truck className="h-4 w-4 text-purple-600" />
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Delivered"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted">
            Showing <span className="font-medium">1-5</span> of{" "}
            <span className="font-medium">181</span> orders
          </p>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 py-1.5 text-sm border border-border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
