import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Categories | Admin",
};

// Placeholder categories
const categories = [
  {
    id: "1",
    name: "Dresses",
    slug: "dresses",
    description: "Elegant dresses for every occasion",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop",
    productCount: 24,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "2",
    name: "Tops",
    slug: "tops",
    description: "Stylish tops and blouses",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=200&auto=format&fit=crop",
    productCount: 18,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "3",
    name: "Jackets & Coats",
    slug: "jackets-coats",
    description: "Outerwear for all seasons",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=200&auto=format&fit=crop",
    productCount: 12,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "4",
    name: "Skirts",
    slug: "skirts",
    description: "Beautiful skirts in various styles",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj9e?q=80&w=200&auto=format&fit=crop",
    productCount: 15,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "5",
    name: "Pants",
    slug: "pants",
    description: "Comfortable and chic pants",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200&auto=format&fit=crop",
    productCount: 10,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "6",
    name: "Accessories",
    slug: "accessories",
    description: "Complete your look",
    image: "https://images.unsplash.com/photo-1611923134239-b9be5b4d1b04?q=80&w=200&auto=format&fit=crop",
    productCount: 20,
    isActive: false,
    sortOrder: 6,
  },
];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-dark">Categories</h1>
          <p className="text-muted mt-1">Manage product categories</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Add Category</Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
        <Input placeholder="Search categories..." className="pl-10" />
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative h-40 bg-brand-cream">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <FolderTree className="h-12 w-12 text-muted" />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <Badge variant={category.isActive ? "success" : "default"}>
                  {category.isActive ? "Active" : "Draft"}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-brand-dark">{category.name}</h3>
                  <p className="text-sm text-muted mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="text-sm">
                  <span className="text-muted">Products:</span>{" "}
                  <span className="font-medium text-brand-dark">
                    {category.productCount}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 hover:bg-brand-cream rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4 text-muted" />
                  </button>
                  <button
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-error" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
