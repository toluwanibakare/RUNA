"use client";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { Minus, Plus, Trash2, Store as StoreIcon } from "lucide-react";

export default function CartPage() {
  const { packs, subtotal, deliveryFee, rundaFee, total, inc, dec, clearPack, clear, createPack, toggleRunda } = useCart();

  if (packs.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="w-16 h-16 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] grid place-items-center mx-auto text-xl">🛒</p>
        <h1 className="font-bold text-[#0C231D]">Your cart is empty</h1>
        <p className="text-sm text-[#6B7280]">Add some Jollof Rice + Chicken and come back</p>
        <Link href="/" className="inline-flex bg-[#1EB95E] text-white px-6 h-11 rounded-xl font-semibold items-center hover:bg-[#1B9A4D]">
          Browse stores
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <BackButton fallback="/" label="Continue shopping" />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0C231D]">Your Cart</h1>
        <button onClick={clear} className="text-xs font-semibold text-[#6B7280] hover:text-red-600 flex items-center gap-1 active:scale-95 transition">
          <Trash2 className="w-3.5 h-3.5" /> Clear all
        </button>
      </div>

      {/* Stores Cart Items */}
      <div className="space-y-4">
        {packs.map((pack) => {
          const packSubtotal = pack.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
          return (
            <div key={pack.id} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
              {/* Clickable pack header - update items */}
              <Link href={`/store/${pack.storeId}?packId=${pack.id}`} className="flex items-center justify-between px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] hover:bg-white transition">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-[#0C231D] text-white flex items-center justify-center shrink-0">
                    <StoreIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <p className="text-sm font-bold text-[#0C231D] truncate whitespace-nowrap">{pack.storeName}</p>
                    <span className="text-xs text-[#6B7280] whitespace-nowrap shrink-0">• Pack {pack.id.slice(-4)} • Delivery {formatPrice(pack.deliveryFee)}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1EB95E] shrink-0 ml-2">Edit</span>
              </Link>
              <div className="flex justify-end px-4 py-1 bg-[#F9FAFB]">
                <button
                  onClick={() => clearPack(pack.id)}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-full shrink-0 active:scale-95 transition"
                  aria-label="Remove pack"
                >
                  Remove pack
                </button>
              </div>

              {/* Items List - or empty -> Add item */}
              <div className="divide-y divide-[#E5E7EB]/60">
                {pack.items.length === 0 ? (
                  <div className="p-6 text-center space-y-3">
                    <p className="text-sm text-[#6B7280]">This pack is empty</p>
                    <Link href={`/store/${pack.storeId}?packId=${pack.id}`} className="inline-flex bg-[#0C231D] text-white px-5 h-9 rounded-xl text-xs font-bold items-center hover:bg-[#12372d]">+ Add item - {pack.storeName}</Link>
                  </div>
                ) : (
                  pack.items.map((ci) => (
                    <div key={ci.product.id} className="flex gap-3 p-3 items-center">
                      <img src={ci.product.image} alt={ci.product.name} className="w-16 h-16 rounded-xl object-cover bg-[#F9FAFB] border border-[#E5E7EB] shrink-0 max-w-full" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-[#0C231D] truncate">{ci.product.name}</h3>
                        <p className="text-[11px] text-[#6B7280]">{ci.product.storeName}</p>
                        <p className="text-xs font-bold text-[#0C231D] mt-1">{formatPrice(ci.product.price)}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => dec(ci.product.id)} className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center active:scale-95">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{ci.quantity}</span>
                        <button onClick={() => inc(ci.product.id)} className="w-8 h-8 rounded-full bg-[#0C231D] text-white flex items-center justify-center active:scale-95">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Store subtotal + add pack + Runda Pack + per-pack checkout */}
              {pack.items.length > 0 && (
                <div className="bg-[#F9FAFB] px-4 py-2.5 flex justify-between text-xs border-t border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Pack subtotal</span>
                  <span className="font-bold text-[#0C231D]">{formatPrice(packSubtotal)}</span>
                </div>
              )}
              {pack.items.length > 0 ? (
                <>
                  <div className="px-4 py-3 bg-white border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={pack.rundaPack} onChange={() => toggleRunda(pack.id)} className="w-4 h-4 rounded border-[#E5E7EB] accent-[#1EB95E]" />
                      <span className="text-xs font-bold text-[#0C231D]">Runda Pack - ₦200</span>
                      <span className="relative group">
                        <span className="w-4 h-4 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] grid place-items-center text-[10px]">?</span>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 bg-[#0C231D] text-white text-xs rounded-xl p-3 z-10">
                          Sealed pack - gives you assurance the order is good. If seal is broken you can report.
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0C231D]" />
                        </span>
                      </span>
                    </label>
                    <span className="text-xs text-[#6B7280]">optional</span>
                  </div>
                  <div className="px-4 pb-2 bg-[#F9FAFB] flex gap-2">
                    <button
                      onClick={() => createPack(pack.storeId, pack.storeName)}
                      className="flex-1 inline-flex justify-center items-center h-9 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#0C231D] hover:border-[#1EB95E] hover:text-[#1EB95E] transition"
                    >
                      + Add new pack - {pack.storeName}
                    </button>
                  </div>
                </>
              ) : null}
              {packs.length > 1 && packs.map((p) => p.storeId).filter((v, i, a) => a.indexOf(v) === i).length > 1 && (
                <Link href={`/checkout?packId=${pack.id}`} className="block px-4 pb-3 bg-[#F9FAFB]">
                  <span className="w-full inline-flex justify-center items-center h-9 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#0C231D] hover:bg-[#0C231D] hover:text-white hover:border-[#0C231D] transition">Proceed to checkout - {pack.storeName}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-2 text-xs">
        <div className="flex justify-between text-[#6B7280]">
          <span>Subtotal</span>
          <span className="text-[#0C231D] font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#6B7280]">
          <span>Delivery fee</span>
          <span className="text-[#0C231D] font-semibold">{formatPrice(deliveryFee)}</span>
        </div>
        {rundaFee > 0 && <div className="flex justify-between text-[#6B7280]"><span>Runda Pack</span><span className="text-[#0C231D] font-semibold">{formatPrice(rundaFee)}</span></div>}
        <div className="border-t border-[#E5E7EB] pt-2 flex justify-between text-sm font-bold text-[#0C231D]">
          <span>Total</span>
          <span className="text-[#1EB95E]">{formatPrice(total)}</span>
        </div>
      </div>

      <Link href="/checkout" className="block">
        <Button size="lg" className="w-full">
          Proceed to checkout • {formatPrice(total)}
        </Button>
      </Link>
    </div>
  );
}
