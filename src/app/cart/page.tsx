"use client";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { Minus, Plus, Trash2, Package, Store as StoreIcon } from "lucide-react";

export default function CartPage() {
  const { packs, subtotal, deliveryFee, total, inc, dec, clearPack, clear } = useCart();
  if (packs.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="w-16 h-16 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] grid place-items-center mx-auto text-xl">🛒</p>
        <h1 className="font-bold text-[#0C231D]">Your cart is empty</h1>
        <p className="text-sm text-[#6B7280]">Add some Jollof Rice + Chicken and come back</p>
        <Link href="/" className="inline-flex bg-[#1EB95E] text-white px-6 h-11 rounded-xl font-semibold items-center hover:bg-[#1B9A4D]">Browse stores</Link>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <BackButton fallback="/" label="Continue shopping" />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0C231D]">Cart - {packs.length} pack{packs.length > 1 ? "s" : ""}</h1>
        <button onClick={clear} className="text-sm text-[#6B7280] hover:text-red-600 flex items-center gap-1">
          <Trash2 className="w-4 h-4" /> Clear all
        </button>
      </div>

      {/* Packs — like Chowdeck per-store packs */}
      <div className="space-y-4">
        {packs.map((pack, idx) => {
          const packSubtotal = pack.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
          return (
            <div key={pack.id} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#0C231D] text-white grid place-items-center">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0C231D] flex items-center gap-1.5">
                      <StoreIcon className="w-3 h-3" /> Pack {idx + 1} - {pack.storeName}
                    </p>
                    <p className="text-xs text-[#6B7280]">{pack.items.length} items • Delivery {formatPrice(pack.deliveryFee)}</p>
                  </div>
                </div>
                <button onClick={() => clearPack(pack.id)} className="text-xs font-semibold text-red-600 hover:bg-red-50 px-2 py-1 rounded-full">Remove pack</button>
              </div>

              <div className="divide-y divide-[#E5E7EB]/60">
                {pack.items.map((ci) => (
                  <div key={ci.product.id} className="flex gap-3 p-3">
                    <img src={ci.product.image} alt={ci.product.name} className="w-16 h-16 rounded-xl object-cover bg-[#F9FAFB] border border-[#E5E7EB] max-w-full" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#0C231D] truncate">{ci.product.name}</h3>
                      <p className="text-xs text-[#6B7280]">{ci.product.storeName}</p>
                      <p className="text-sm font-semibold text-[#0C231D] mt-1">{formatPrice(ci.product.price)}</p>
                    </div>
                    <div className="flex items-center gap-2 self-center shrink-0">
                      <button onClick={() => dec(ci.product.id)} className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white grid place-items-center active:scale-95">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{ci.quantity}</span>
                      <button onClick={() => inc(ci.product.id)} className="w-8 h-8 rounded-full bg-[#0C231D] text-white grid place-items-center active:scale-95">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F9FAFB] px-4 py-3 flex justify-between text-sm border-t border-[#E5E7EB]">
                <span className="text-[#6B7280]">Pack subtotal</span>
                <span className="font-semibold text-[#0C231D]">{formatPrice(packSubtotal)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add another pack hint */}
      <div className="bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0C231D]">Add another pack?</p>
          <p className="text-xs text-[#6B7280]">From same or another store - delivery fee adds per pack</p>
        </div>
        <Link href="/explore" className="text-sm font-semibold bg-[#0C231D] text-white px-4 py-2 rounded-full hover:bg-[#12372d]">Browse stores</Link>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-2 text-sm">
        <div className="flex justify-between text-[#6B7280]"><span>Subtotal ({packs.length} packs)</span><span className="text-[#0C231D] font-medium">{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between text-[#6B7280]"><span>Delivery fee ({packs.length} × {formatPrice(300)})</span><span className="text-[#0C231D] font-medium">{formatPrice(deliveryFee)}</span></div>
        <div className="border-t border-[#E5E7EB] pt-2 flex justify-between font-bold text-[#0C231D]"><span>Total</span><span>{formatPrice(total)}</span></div>
        <p className="text-xs text-[#6B7280]">Adding from another store creates a new pack and increases delivery fee - like Chowdeck.</p>
      </div>
      <Link href="/checkout" className="block">
        <Button size="lg" className="w-full">Proceed to checkout - {packs.length} pack{packs.length > 1 ? "s" : ""}</Button>
      </Link>
    </div>
  );
}
