"use client";

import * as React from "react";
import { Product, ProductVariant, CartItemLocal, Cart } from "@/types";

interface CartContextType extends Cart {
  addItem: (product: Product, variant: ProductVariant | null, quantity?: number) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId: string | null) => boolean;
  getItemQuantity: (productId: string, variantId: string | null) => number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "raveplus_cart";

function getStoredCart(): CartItemLocal[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeCart(items: CartItemLocal[]) {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to store cart:", error);
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItemLocal[]>([]);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Hydrate cart from localStorage
  React.useEffect(() => {
    setItems(getStoredCart());
    setIsHydrated(true);
  }, []);

  // Persist cart changes
  React.useEffect(() => {
    if (isHydrated) {
      storeCart(items);
    }
  }, [items, isHydrated]);

  const getItemKey = (productId: string, variantId: string | null) => {
    return `${productId}-${variantId || "default"}`;
  };

  const addItem = React.useCallback(
    (product: Product, variant: ProductVariant | null, quantity = 1) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.productId === product.id &&
            item.variantId === (variant?.id || null)
        );

        if (existingIndex > -1) {
          // Update quantity if item exists
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }

        // Add new item
        return [
          ...prev,
          {
            productId: product.id,
            variantId: variant?.id || null,
            quantity,
            product,
            variant,
          },
        ];
      });
    },
    []
  );

  const removeItem = React.useCallback(
    (productId: string, variantId: string | null) => {
      setItems((prev) =>
        prev.filter(
          (item) =>
            !(item.productId === productId && item.variantId === variantId)
        )
      );
    },
    []
  );

  const updateQuantity = React.useCallback(
    (productId: string, variantId: string | null, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, variantId);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = React.useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = React.useCallback(
    (productId: string, variantId: string | null) => {
      return items.some(
        (item) =>
          item.productId === productId && item.variantId === variantId
      );
    },
    [items]
  );

  const getItemQuantity = React.useCallback(
    (productId: string, variantId: string | null) => {
      const item = items.find(
        (item) =>
          item.productId === productId && item.variantId === variantId
      );
      return item?.quantity || 0;
    },
    [items]
  );

  // Calculate derived values
  const subtotal = React.useMemo(() => {
    return items.reduce((total, item) => {
      const price = item.product.price + (item.variant?.price_modifier || 0);
      return total + price * item.quantity;
    }, 0);
  }, [items]);

  const itemCount = React.useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const value: CartContextType = {
    items: isHydrated ? items : [],
    subtotal,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
