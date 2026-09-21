"use client";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, deliveryFee, total, inc, dec, remove, clear } = useCart();
  if (items.length === 0) {
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
        <h1 className="text-xl font-bold text-[#0C231D]">Cart</h1>
        <button onClick={clear} className="text-sm text-[#6B7280] hover:text-red-600 flex items-center gap-1">
          <Trash2 className="w-4 h-4" /> Clear
        </button>
      </div>
      <div className="space-y-3">
        {items.map((ci) => (
          <div key={ci.product.id} className="flex gap-3 bg-white border border-[#E5E7EB] rounded-2xl p-3">
            <img src={ci.product.image} alt={ci.product.name} className="w-16 h-16 rounded-xl object-cover bg-[#F9FAFB] border border-[#E5E7EB]" />
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
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-2 text-sm">
        <div className="flex justify-between text-[#6B7280]"><span>Subtotal</span><span className="text-[#0C231D] font-medium">{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between text-[#6B7280]"><span>Delivery fee</span><span className="text-[#0C231D] font-medium">{formatPrice(deliveryFee)}</span></div>
        <div className="border-t border-[#E5E7EB] pt-2 flex justify-between font-bold text-[#0C231D]"><span>Total</span><span>{formatPrice(total)}</span></div>
      </div>
      <Link href="/checkout" className="block">
        <Button size="lg" className="w-full">Proceed to checkout</Button>
      </Link>
    </div>
  );
}
