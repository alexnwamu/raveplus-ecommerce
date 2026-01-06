import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products | Admin",
};

// Placeholder products
const products = [
  {
    id: "1",
    name: "Nadetta Coat Beige",
    slug: "nadetta-coat-beige",
    category: "Jackets & Coats",
    price: 175000,
    stock: 15,
    status: "active",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Silk Blouse White",
    slug: "silk-blouse-white",
    category: "Tops",
    price: 45000,
    stock: 25,
    status: "active",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    slug: "floral-summer-dress",
    category: "Dresses",
    price: 55000,
    stock: 0,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "High-Waist Trousers",
    slug: "high-waist-trousers",
    category: "Pants",
    price: 38000,
    stock: 20,
    status: "active",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Casual Linen Dress",
    slug: "casual-linen-dress",
    category: "Dresses",
    price: 42000,
    stock: 5,
    status: "low_stock",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=200&auto=format&fit=crop",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "error" }> = {
  active: { label: "Active", variant: "success" },
  draft: { label: "Draft", variant: "default" },
  out_of_stock: { label: "Out of Stock", variant: "error" },
  low_stock: { label: "Low Stock", variant: "warning" },
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-dark">Products</h1>
          <p className="text-muted mt-1">Manage your product catalog</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <select className="h-11 px-4 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20">
          <option value="">All Categories</option>
          <option value="dresses">Dresses</option>
          <option value="tops">Tops</option>
          <option value="jackets-coats">Jackets & Coats</option>
          <option value="pants">Pants</option>
        </select>
        <select className="h-11 px-4 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Stock
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-xs font-medium text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => {
                const status = statusConfig[product.status];
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-16 rounded-md overflow-hidden bg-brand-cream">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="font-medium text-brand-dark hover:text-brand-primary transition-colors"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs text-muted">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted">{product.category}</td>
                    <td className="py-4 px-6 font-medium">{formatPrice(product.price)}</td>
                    <td className="py-4 px-6">
                      <span
                        className={
                          product.stock === 0
                            ? "text-error"
                            : product.stock <= 5
                            ? "text-warning"
                            : "text-brand-dark"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4 text-muted" />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-muted" />
                        </Link>
                        <button
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted">
            Showing <span className="font-medium">1-5</span> of{" "}
            <span className="font-medium">5</span> products
          </p>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 py-1.5 text-sm border border-border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled
              className="px-3 py-1.5 text-sm border border-border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
