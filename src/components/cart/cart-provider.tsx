"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import {
  addCartItem,
  clearCartLines,
  getCartServerSnapshot,
  getCartSnapshot,
  removeCartLine,
  subscribeCart,
  updateCartQuantity,
} from "@/components/cart/cart-store";
import type { CartItem, ProductSnapshot } from "@/lib/types";
import { lineKey } from "@/lib/utils";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  isReady: boolean;
  addItem: (product: ProductSnapshot, quantity?: number, variant?: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);


function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);
  return hydrated;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );
  const isReady = useHydrated();
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: ProductSnapshot, quantity = 1, variant?: string) => {
    addCartItem(product, quantity, variant);
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    updateCartQuantity(key, quantity);
  }, []);

  const removeItem = useCallback((key: string) => {
    removeCartLine(key);
  }, []);

  const clearCart = useCallback(() => {
    clearCartLines();
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { items, count, subtotal } = useMemo(() => {
    const resolved = lines.map((line) => ({
      key: lineKey(line.productId, line.variant),
      line,
      product: line.product,
      lineTotal: line.product.price * line.quantity,
    }));

    return {
      items: resolved,
      count: resolved.reduce((total, item) => total + item.line.quantity, 0),
      subtotal: resolved.reduce((total, item) => total + item.lineTotal, 0),
    };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      isReady,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      count,
      subtotal,
      isOpen,
      isReady,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
