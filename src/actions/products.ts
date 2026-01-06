"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { Product, Category, ProductImage, ProductVariant } from "@/types";
import { revalidatePath } from "next/cache";

// ============================================================================
// Product Actions
// ============================================================================

export async function getProducts(options?: {
  categorySlug?: string;
  search?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: Product[] | null; error: string | null }> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*)
    `)
    .eq("is_active", true);

  // Filter by category
  if (options?.categorySlug) {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", options.categorySlug)
      .single();

    if (category) {
      query = query.eq("category_id", category.id);
    }
  }

  // Search
  if (options?.search) {
    query = query.ilike("name", `%${options.search}%`);
  }

  // Sort
  switch (options?.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "popular":
      query = query.order("is_featured", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  // Pagination
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getProductBySlug(
  slug: string
): Promise<{ data: Product | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*)
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getFeaturedProducts(
  limit = 8
): Promise<{ data: Product[] | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      images:product_images(*)
    `)
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getNewProducts(
  limit = 8
): Promise<{ data: Product[] | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      images:product_images(*)
    `)
    .eq("is_active", true)
    .eq("is_new", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

// ============================================================================
// Category Actions
// ============================================================================

export async function getCategories(): Promise<{
  data: Category[] | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

// ============================================================================
// Admin Product Actions
// ============================================================================

export async function createProduct(
  product: Omit<Product, "id" | "created_at" | "updated_at">,
  images: Omit<ProductImage, "id" | "product_id">[],
  variants: Omit<ProductVariant, "id" | "product_id">[]
): Promise<{ data: Product | null; error: string | null }> {
  const supabase = await createServiceClient();

  // Create product
  const { data: newProduct, error: productError } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (productError) {
    return { data: null, error: productError.message };
  }

  // Create images
  if (images.length > 0) {
    const { error: imagesError } = await supabase
      .from("product_images")
      .insert(
        images.map((img) => ({
          ...img,
          product_id: newProduct.id,
        }))
      );

    if (imagesError) {
      console.error("Error creating images:", imagesError);
    }
  }

  // Create variants
  if (variants.length > 0) {
    const { error: variantsError } = await supabase
      .from("product_variants")
      .insert(
        variants.map((variant) => ({
          ...variant,
          product_id: newProduct.id,
        }))
      );

    if (variantsError) {
      console.error("Error creating variants:", variantsError);
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");

  return { data: newProduct, error: null };
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<{ data: Product | null; error: string | null }> {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);

  return { data, error: null };
}

export async function deleteProduct(
  id: string
): Promise<{ error: string | null }> {
  const supabase = await createServiceClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");

  return { error: null };
}

// ============================================================================
// Admin Category Actions
// ============================================================================

export async function createCategory(
  category: Omit<Category, "id" | "created_at">
): Promise<{ data: Category | null; error: string | null }> {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/admin/categories");

  return { data, error: null };
}

export async function updateCategory(
  id: string,
  updates: Partial<Category>
): Promise<{ data: Category | null; error: string | null }> {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/admin/categories");

  return { data, error: null };
}

export async function deleteCategory(
  id: string
): Promise<{ error: string | null }> {
  const supabase = await createServiceClient();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");

  return { error: null };
}
