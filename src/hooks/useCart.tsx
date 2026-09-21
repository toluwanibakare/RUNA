"use client";
import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import type { CartItem, Product } from "@/types";

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  add: (product: Product) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Product) =>
    setItems((prev) => {
      const ex = prev.find((i) => i.product.id === product.id);
      if (ex) return prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { product, quantity: 1 }];
    });
  const remove = (id: string) => setItems((p) => p.filter((i) => i.product.id !== id));
  const inc = (id: string) => setItems((p) => p.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const dec = (id: string) =>
    setItems((p) => p.flatMap((i) => (i.product.id === id ? (i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : []) : [i])));
  const clear = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.product.price * i.quantity, 0), [items]);
  const deliveryFee = items.length ? 300 : 0;
  const total = subtotal + deliveryFee;
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return <CartContext.Provider value={{ items, count, subtotal, deliveryFee, total, add, remove, inc, dec, clear }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside provider");
  return ctx;
}
