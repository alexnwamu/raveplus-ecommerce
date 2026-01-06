"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { Order, OrderItem } from "@/types";
import { revalidatePath } from "next/cache";
import { generateOrderNumber } from "@/lib/utils";

// ============================================================================
// Order Actions
// ============================================================================

export async function getOrders(options?: {
  userId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: Order[] | null; error: string | null; count: number }> {
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select("*, order_items(*)", { count: "exact" });

  if (options?.userId) {
    query = query.eq("user_id", options.userId);
  }

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  query = query.order("created_at", { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    return { data: null, error: error.message, count: 0 };
  }

  return { data, error: null, count: count || 0 };
}

export async function getOrderById(
  orderId: string
): Promise<{ data: Order | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        *,
        product:products(*),
        variant:product_variants(*)
      )
    `)
    .eq("id", orderId)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getOrderByNumber(
  orderNumber: string
): Promise<{ data: Order | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        *,
        product:products(*),
        variant:product_variants(*)
      )
    `)
    .eq("order_number", orderNumber)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

interface CreateOrderInput {
  userId: string;
  items: {
    productId: string;
    variantId: string | null;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
  };
}

export async function createOrder(
  input: CreateOrderInput
): Promise<{ data: Order | null; error: string | null }> {
  const supabase = await createServiceClient();

  // Generate order number
  const orderNumber = generateOrderNumber();

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: input.userId,
      order_number: orderNumber,
      status: "pending",
      subtotal: input.subtotal,
      shipping_cost: input.shippingCost,
      discount: input.discount,
      total: input.total,
      shipping_address: input.shippingAddress,
      payment_status: "pending",
    })
    .select()
    .single();

  if (orderError) {
    return { data: null, error: orderError.message };
  }

  // Create order items
  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    variant_id: item.variantId,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    total_price: item.unitPrice * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    // Rollback order
    await supabase.from("orders").delete().eq("id", order.id);
    return { data: null, error: itemsError.message };
  }

  // Update product stock
  for (const item of input.items) {
    if (item.variantId) {
      await supabase.rpc("decrement_variant_stock", {
        variant_id: item.variantId,
        amount: item.quantity,
      });
    } else {
      await supabase.rpc("decrement_product_stock", {
        product_id: item.productId,
        amount: item.quantity,
      });
    }
  }

  return { data: order, error: null };
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<{ data: Order | null; error: string | null }> {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/admin/orders");

  return { data, error: null };
}

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: Order["payment_status"],
  paymentReference?: string
): Promise<{ data: Order | null; error: string | null }> {
  const supabase = await createServiceClient();

  const updates: Partial<Order> = {
    payment_status: paymentStatus,
  };

  if (paymentReference) {
    updates.payment_reference = paymentReference;
  }

  if (paymentStatus === "paid") {
    updates.status = "confirmed";
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/admin/orders");

  return { data, error: null };
}

// ============================================================================
// Admin Analytics
// ============================================================================

export async function getAdminStats(): Promise<{
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}> {
  const supabase = await createServiceClient();

  // Total revenue (from paid orders)
  const { data: revenueData } = await supabase
    .from("orders")
    .select("total")
    .eq("payment_status", "paid");

  const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total, 0) || 0;

  // Total orders
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // Total products
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  // Total customers
  const { count: totalCustomers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "customer");

  return {
    totalRevenue,
    totalOrders: totalOrders || 0,
    totalProducts: totalProducts || 0,
    totalCustomers: totalCustomers || 0,
  };
}
