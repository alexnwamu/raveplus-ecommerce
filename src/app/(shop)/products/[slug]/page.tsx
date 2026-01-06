import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Star, Heart, Truck, RefreshCw, Shield } from "lucide-react";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfo } from "./product-info";
import { Product, ProductImage, ProductVariant, Category } from "@/types";
import { formatPrice } from "@/lib/utils";

// Placeholder product data
const placeholderProduct: Product & {
  images: ProductImage[];
  variants: ProductVariant[];
  category: Category;
} = {
  id: "1",
  category_id: "1",
  name: "Nadetta Coat Beige",
  slug: "nadetta-coat-beige",
  description: `Premium quality women's coat crafted from the finest materials. This timeless piece features a classic silhouette that flatters every body type.

Key Features:
• Double-breasted design with gold-tone buttons
• Fully lined interior for comfort
• Two front pockets
• Notched lapel collar
• Belt included for versatile styling

Care Instructions:
Dry clean only. Store on a padded hanger to maintain shape.`,
  price: 175000,
  compare_at_price: 300000,
  stock_quantity: 15,
  is_active: true,
  is_featured: true,
  is_new: true,
  metadata: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  category: {
    id: "1",
    name: "Jackets & Coats",
    slug: "jackets-coats",
    description: "Outerwear for all seasons",
    image_url: null,
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  images: [
    {
      id: "1",
      product_id: "1",
      url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop",
      alt_text: "Nadetta Coat Beige - Front View",
      sort_order: 0,
      is_primary: true,
    },
    {
      id: "2",
      product_id: "1",
      url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      alt_text: "Nadetta Coat Beige - Side View",
      sort_order: 1,
      is_primary: false,
    },
    {
      id: "3",
      product_id: "1",
      url: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1974&auto=format&fit=crop",
      alt_text: "Nadetta Coat Beige - Back View",
      sort_order: 2,
      is_primary: false,
    },
    {
      id: "4",
      product_id: "1",
      url: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974&auto=format&fit=crop",
      alt_text: "Nadetta Coat Beige - Detail",
      sort_order: 3,
      is_primary: false,
    },
  ],
  variants: [
    { id: "v1", product_id: "1", size: "XS", color: "Beige", color_hex: "#d4c4b0", stock_quantity: 3, price_modifier: 0 },
    { id: "v2", product_id: "1", size: "S", color: "Beige", color_hex: "#d4c4b0", stock_quantity: 5, price_modifier: 0 },
    { id: "v3", product_id: "1", size: "M", color: "Beige", color_hex: "#d4c4b0", stock_quantity: 4, price_modifier: 0 },
    { id: "v4", product_id: "1", size: "L", color: "Beige", color_hex: "#d4c4b0", stock_quantity: 2, price_modifier: 0 },
    { id: "v5", product_id: "1", size: "XL", color: "Beige", color_hex: "#d4c4b0", stock_quantity: 1, price_modifier: 0 },
    { id: "v6", product_id: "1", size: "XS", color: "Black", color_hex: "#1a1a1a", stock_quantity: 2, price_modifier: 0 },
    { id: "v7", product_id: "1", size: "S", color: "Black", color_hex: "#1a1a1a", stock_quantity: 4, price_modifier: 0 },
    { id: "v8", product_id: "1", size: "M", color: "Black", color_hex: "#1a1a1a", stock_quantity: 3, price_modifier: 0 },
    { id: "v9", product_id: "1", size: "L", color: "Black", color_hex: "#1a1a1a", stock_quantity: 0, price_modifier: 0 },
    { id: "v10", product_id: "1", size: "XL", color: "Black", color_hex: "#1a1a1a", stock_quantity: 2, price_modifier: 0 },
  ],
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  // In production, fetch product from database
  const product = placeholderProduct;

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  // In production, fetch from Supabase
  const product = placeholderProduct;

  if (!product) {
    notFound();
  }

  const averageRating = 4.8;
  const reviewCount = 328;

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
            <Link href="/products" className="hover:text-brand-primary transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hover:text-brand-primary transition-colors"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-brand-dark font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductInfo
              product={product}
              averageRating={averageRating}
              reviewCount={reviewCount}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Description */}
            <div className="md:col-span-2">
              <h2 className="font-display text-2xl text-brand-dark mb-4">
                Product Details
              </h2>
              <div className="prose prose-sm max-w-none text-muted">
                {product.description?.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-cream rounded-lg flex items-center justify-center">
                  <Truck className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-brand-dark text-sm">Free Shipping</h4>
                  <p className="text-xs text-muted">On orders over ₦50,000</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-cream rounded-lg flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-brand-dark text-sm">Easy Returns</h4>
                  <p className="text-xs text-muted">14-day return policy</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-cream rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-brand-dark text-sm">Secure Payment</h4>
                  <p className="text-xs text-muted">Via Paystack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
