import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import { Product, ProductImage } from "@/types";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our complete collection of premium women's fashion.",
};

// Placeholder products for demonstration
const placeholderProducts: (Product & { images: ProductImage[] })[] = [
  {
    id: "1",
    category_id: "1",
    name: "Elegant Beige Coat",
    slug: "elegant-beige-coat",
    description: "A stunning beige coat perfect for any occasion",
    price: 85000,
    compare_at_price: 120000,
    stock_quantity: 15,
    is_active: true,
    is_featured: true,
    is_new: true,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "1",
        product_id: "1",
        url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop",
        alt_text: "Beige coat front view",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "2",
    category_id: "2",
    name: "Silk Blouse White",
    slug: "silk-blouse-white",
    description: "Luxurious silk blouse in classic white",
    price: 45000,
    compare_at_price: null,
    stock_quantity: 25,
    is_active: true,
    is_featured: true,
    is_new: true,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "3",
        product_id: "2",
        url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2010&auto=format&fit=crop",
        alt_text: "White silk blouse",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "3",
    category_id: "1",
    name: "Floral Summer Dress",
    slug: "floral-summer-dress",
    description: "Beautiful floral print dress for summer",
    price: 55000,
    compare_at_price: 75000,
    stock_quantity: 8,
    is_active: true,
    is_featured: false,
    is_new: true,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "4",
        product_id: "3",
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop",
        alt_text: "Floral summer dress",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "4",
    category_id: "3",
    name: "High-Waist Trousers",
    slug: "high-waist-trousers",
    description: "Classic high-waist trousers in neutral tone",
    price: 38000,
    compare_at_price: null,
    stock_quantity: 20,
    is_active: true,
    is_featured: true,
    is_new: false,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "5",
        product_id: "4",
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop",
        alt_text: "High-waist trousers",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "5",
    category_id: "1",
    name: "Casual Linen Dress",
    slug: "casual-linen-dress",
    description: "Comfortable and stylish linen dress",
    price: 42000,
    compare_at_price: null,
    stock_quantity: 18,
    is_active: true,
    is_featured: false,
    is_new: false,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "6",
        product_id: "5",
        url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
        alt_text: "Casual linen dress",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "6",
    category_id: "2",
    name: "Oversized Knit Sweater",
    slug: "oversized-knit-sweater",
    description: "Cozy oversized sweater for cool evenings",
    price: 35000,
    compare_at_price: 48000,
    stock_quantity: 30,
    is_active: true,
    is_featured: true,
    is_new: true,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "7",
        product_id: "6",
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
        alt_text: "Oversized knit sweater",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "7",
    category_id: "4",
    name: "Pleated Midi Skirt",
    slug: "pleated-midi-skirt",
    description: "Elegant pleated skirt in soft fabric",
    price: 32000,
    compare_at_price: null,
    stock_quantity: 22,
    is_active: true,
    is_featured: false,
    is_new: false,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "8",
        product_id: "7",
        url: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj9e?q=80&w=1964&auto=format&fit=crop",
        alt_text: "Pleated midi skirt",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
  {
    id: "8",
    category_id: "1",
    name: "Trench Coat Classic",
    slug: "trench-coat-classic",
    description: "Timeless trench coat in premium fabric",
    price: 95000,
    compare_at_price: null,
    stock_quantity: 12,
    is_active: true,
    is_featured: true,
    is_new: false,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "9",
        product_id: "8",
        url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
        alt_text: "Trench coat classic",
        sort_order: 0,
        is_primary: true,
      },
    ],
  },
];

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    filter?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;
  const searchQuery = params.search;
  const sortBy = params.sort || "newest";

  // In production, this would fetch from Supabase
  const products = placeholderProducts;
  const category = categorySlug
    ? siteConfig.categories.find((c) => c.slug === categorySlug)
    : null;

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
            <span className="text-brand-dark font-medium">
              {category ? category.name : "All Products"}
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-brand-dark mb-2">
            {category ? category.name : "All Products"}
          </h1>
          <p className="text-muted">
            {category
              ? category.description
              : "Browse our complete collection of premium women's fashion"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium text-brand-dark mb-3">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/products"
                      className={`text-sm transition-colors ${
                        !categorySlug
                          ? "text-brand-primary font-medium"
                          : "text-muted hover:text-brand-dark"
                      }`}
                    >
                      All Products
                    </Link>
                  </li>
                  {siteConfig.categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/products?category=${cat.slug}`}
                        className={`text-sm transition-colors ${
                          categorySlug === cat.slug
                            ? "text-brand-primary font-medium"
                            : "text-muted hover:text-brand-dark"
                        }`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-brand-dark mb-3">Price Range</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>
                    <button className="hover:text-brand-dark transition-colors">
                      Under ₦30,000
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-brand-dark transition-colors">
                      ₦30,000 - ₦50,000
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-brand-dark transition-colors">
                      ₦50,000 - ₦100,000
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-brand-dark transition-colors">
                      Above ₦100,000
                    </button>
                  </li>
                </ul>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-medium text-brand-dark mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.sizes.map((size) => (
                    <button
                      key={size}
                      className="w-10 h-10 border border-border rounded-lg text-sm font-medium hover:border-brand-dark hover:bg-brand-cream transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <p className="text-sm text-muted">
                Showing <span className="text-brand-dark font-medium">{products.length}</span> products
              </p>
              <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 hover:bg-brand-cream rounded-lg transition-colors">
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
                <select
                  className="text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  defaultValue={sortBy}
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 4}
                  />
                ))}
              </div>
            </Suspense>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted mb-4">No products found</p>
                <Link
                  href="/products"
                  className="text-brand-primary hover:underline"
                >
                  View all products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
