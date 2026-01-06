import { Metadata } from "next";
import Link from "next/link";
import { Search, Eye, Mail, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customers | Admin",
};

// Placeholder customers
const customers = [
  {
    id: "1",
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "+234 801 234 5678",
    totalOrders: 5,
    totalSpent: 425000,
    lastOrderDate: "2026-01-05",
    createdAt: "2025-10-15",
  },
  {
    id: "2",
    fullName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+234 802 345 6789",
    totalOrders: 3,
    totalSpent: 285000,
    lastOrderDate: "2026-01-03",
    createdAt: "2025-11-20",
  },
  {
    id: "3",
    fullName: "Mary Williams",
    email: "mary@example.com",
    phone: "+234 803 456 7890",
    totalOrders: 8,
    totalSpent: 680000,
    lastOrderDate: "2026-01-06",
    createdAt: "2025-08-10",
  },
  {
    id: "4",
    fullName: "Grace Obi",
    email: "grace@example.com",
    phone: "+234 804 567 8901",
    totalOrders: 2,
    totalSpent: 175000,
    lastOrderDate: "2025-12-28",
    createdAt: "2025-12-01",
  },
  {
    id: "5",
    fullName: "Amaka Eze",
    email: "amaka@example.com",
    phone: "+234 805 678 9012",
    totalOrders: 12,
    totalSpent: 1250000,
    lastOrderDate: "2026-01-04",
    createdAt: "2025-06-15",
  },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-brand-dark">Customers</h1>
        <p className="text-muted mt-1">View and manage customer accounts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: "1,234" },
          { label: "New This Month", value: "156" },
          { label: "Repeat Customers", value: "68%" },
          { label: "Avg. Order Value", value: formatPrice(85000) },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="text-2xl font-semibold text-brand-dark mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <Input placeholder="Search customers..." className="pl-10" />
        </div>
        <select className="h-11 px-4 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20">
          <option value="">All Customers</option>
          <option value="new">New Customers</option>
          <option value="repeat">Repeat Customers</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Orders
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Last Order
                </th>
                <th className="text-right py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-brand-dark">
                          {customer.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-brand-dark">{customer.fullName}</p>
                        <p className="text-xs text-muted">
                          Member since {formatDate(customer.createdAt)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-brand-dark">{customer.email}</p>
                    <p className="text-xs text-muted">{customer.phone}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-muted" />
                      <span className="font-medium">{customer.totalOrders}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="py-4 px-6 text-sm text-muted">
                    {formatDate(customer.lastOrderDate)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-muted" />
                      </Link>
                      <a
                        href={`mailto:${customer.email}`}
                        className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                        title="Send Email"
                      >
                        <Mail className="h-4 w-4 text-muted" />
                      </a>
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
            <span className="font-medium">1,234</span> customers
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
