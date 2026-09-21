"use client";
import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import type { CartItem, Product } from "@/types";

export type Pack = {
  id: string;
  storeId: string;
  storeName: string;
  items: CartItem[];
  deliveryFee: number;
  rundaPack: boolean; // optional ₦200 seal per pack
};

type CartContextType = {
  packs: Pack[];
  // flat legacy
  items: CartItem[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  rundaFee: number;
  total: number;
  add: (product: Product) => void;
  addToPack: (product: Product, packId: string) => void;
  createPack: (storeId: string, storeName: string) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  clearPack: (packId: string) => void;
  toggleRunda: (packId: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

function feeForStore(storeId: string) {
  // could map from stores mock, default 300
  return 300;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [packs, setPacks] = useState<Pack[]>([]);

  const add = (product: Product) =>
    setPacks((prev) => {
      // find most recent pack for this store, else create new
      const idx = [...prev].reverse().findIndex((p) => p.storeId === product.storeId);
      if (idx !== -1) {
        const realIdx = prev.length - 1 - idx;
        const pack = prev[realIdx];
        const ex = pack.items.find((i) => i.product.id === product.id);
        const newItems = ex ? pack.items.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)) : [...pack.items, { product, quantity: 1 }];
        const newPack = { ...pack, items: newItems };
        return prev.map((p, i) => (i === realIdx ? newPack : p));
      }
      // new pack for this store
      return [
        ...prev,
        {
          id: `pack-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          storeId: product.storeId,
          storeName: product.storeName,
          items: [{ product, quantity: 1 }],
          deliveryFee: feeForStore(product.storeId),
          rundaPack: false,
        },
      ];
    });

  const addToPack = (product: Product, packId: string) =>
    setPacks((prev) =>
      prev.map((p) => {
        if (p.id !== packId) return p;
        const ex = p.items.find((i) => i.product.id === product.id);
        const newItems = ex ? p.items.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)) : [...p.items, { product, quantity: 1 }];
        return { ...p, items: newItems };
      })
    );

  const createPack = (storeId: string, storeName: string) =>
    setPacks((prev) => [
      ...prev,
      { id: `pack-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, storeId, storeName, items: [], deliveryFee: feeForStore(storeId), rundaPack: false },
    ]);

  const remove = (id: string) => setPacks((prev) => prev.map((p) => ({ ...p, items: p.items.filter((i) => i.product.id !== id) })).filter((p) => p.items.length > 0));
  const inc = (id: string) => setPacks((prev) => prev.map((p) => ({ ...p, items: p.items.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)) })));
  const dec = (id: string) =>
    setPacks((prev) =>
      prev
        .map((p) => ({ ...p, items: p.items.flatMap((i) => (i.product.id === id ? (i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : []) : [i])) }))
        .filter((p) => p.items.length > 0)
    );
  const clear = () => setPacks([]);
  const clearPack = (packId: string) => setPacks((prev) => prev.filter((p) => p.id !== packId));
  const toggleRunda = (packId: string) => setPacks((prev) => prev.map((p) => (p.id === packId ? { ...p, rundaPack: !p.rundaPack } : p)));

  const items = useMemo(() => packs.flatMap((p) => p.items), [packs]);
  const subtotal = useMemo(() => packs.reduce((s, p) => s + p.items.reduce((a, i) => a + i.product.price * i.quantity, 0), 0), [packs]);
  // delivery fee per distinct store - same store packs checkout together
  const deliveryFee = useMemo(() => {
    const distinctStores = new Set(packs.filter((p) => p.items.length > 0).map((p) => p.storeId));
    return distinctStores.size * 300;
  }, [packs]);
  const rundaFee = useMemo(() => packs.filter((p) => p.rundaPack && p.items.length > 0).length * 200, [packs]);
  const total = subtotal + deliveryFee + rundaFee;
  const count = useMemo(() => packs.reduce((s, p) => s + p.items.reduce((a, i) => a + i.quantity, 0), 0), [packs]);

  return <CartContext.Provider value={{ packs, items, count, subtotal, deliveryFee, rundaFee, total, add, addToPack, createPack, remove, inc, dec, clear, clearPack, toggleRunda }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside provider");
  return ctx;
}
