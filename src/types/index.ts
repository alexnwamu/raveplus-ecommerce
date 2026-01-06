// =============================================================================
// Database Types
// =============================================================================

export type UserRole = "customer" | "staff" | "admin";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  color: string;
  color_hex: string;
  stock_quantity: number;
  price_modifier: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  
  // Relations
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
  reviews?: Review[];
}

export interface ProductWithDetails extends Product {
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  average_rating: number;
  review_count: number;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string | null;
  is_verified: boolean;
  created_at: string;
  
  // Relations
  user?: Pick<User, "id" | "full_name" | "avatar_url">;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  is_default: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string | null;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  session_id: string | null;
  created_at: string;
  
  // Relations
  product?: Product;
  variant?: ProductVariant;
}

export type OrderStatus = 
  | "pending" 
  | "confirmed" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled";

export type PaymentStatus = 
  | "pending" 
  | "paid" 
  | "failed" 
  | "refunded";

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: OrderStatus;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  shipping_address: Address;
  billing_address: Address | null;
  payment_reference: string | null;
  payment_status: PaymentStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  
  // Relations
  items?: OrderItem[];
  user?: User;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  
  // Relations
  product?: Product;
  variant?: ProductVariant;
}

// =============================================================================
// Cart Types
// =============================================================================

export interface CartItemLocal {
  productId: string;
  variantId: string | null;
  quantity: number;
  product: Product;
  variant: ProductVariant | null;
}

export interface Cart {
  items: CartItemLocal[];
  subtotal: number;
  itemCount: number;
}

// =============================================================================
// Form Types
// =============================================================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
}

export interface AddressFormData {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  is_default?: boolean;
}

export interface CheckoutFormData {
  shipping_address: AddressFormData;
  billing_same_as_shipping: boolean;
  billing_address?: AddressFormData;
  notes?: string;
}

// =============================================================================
// API Response Types
// =============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =============================================================================
// Filter Types
// =============================================================================

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  sortBy?: "price_asc" | "price_desc" | "newest" | "popular";
  search?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

// =============================================================================
// Paystack Types
// =============================================================================

export interface PaystackInitializeData {
  email: string;
  amount: number; // in kobo
  reference: string;
  callback_url: string;
  metadata: {
    order_id: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: "success" | "failed" | "abandoned";
    reference: string;
    amount: number;
    paid_at: string;
    channel: string;
    currency: string;
    customer: {
      email: string;
      customer_code: string;
    };
  };
}

// =============================================================================
// Admin Types
// =============================================================================

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: Order[];
  topProducts: Array<{
    product: Product;
    totalSold: number;
    revenue: number;
  }>;
  salesByDay: Array<{
    date: string;
    orders: number;
    revenue: number;
  }>;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  category_id: string;
  price: number;
  compare_at_price?: number;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  variants: Omit<ProductVariant, "id" | "product_id">[];
  images: Omit<ProductImage, "id" | "product_id">[];
}
