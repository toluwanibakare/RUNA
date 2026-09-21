"use client";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Wallet, ShieldCheck, ChevronDown } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, total } = useCart();
  const [address, setAddress] = useState("Engineering, Block A, Room 12");
  const [pay, setPay] = useState<"wallet" | "paystack" | "kora">("wallet");
  const walletBal = 5000;
  const canPay = walletBal >= total || pay !== "wallet";
  return (
    <div className="space-y-5">
      <BackButton fallback="/cart" label="Cart" />
      <h1 className="text-xl font-bold text-[#0C231D]">Checkout</h1>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#0C231D]">
          <MapPin className="w-4 h-4 text-[#1EB95E]" /> Delivery location
        </div>
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 flex items-start justify-between gap-3">
          <p className="text-sm text-[#0C231D] flex-1">{address}</p>
          <button onClick={() => setAddress(prompt("Enter delivery location", address) || address)} className="text-xs font-semibold text-[#1EB95E] shrink-0">Change</button>
        </div>
        <p className="text-xs text-[#6B7280]">ETA • Delivery on Apr 4 • 10-15 min</p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-[#0C231D]">Order summary • {items.length} items</h2>
        {items.length === 0 ? <p className="text-sm text-[#6B7280]">No items - add from home</p> : items.map((ci) => (
          <div key={ci.product.id} className="flex justify-between text-sm">
            <span className="text-[#0C231D]">{ci.product.name} × {ci.quantity}</span>
            <span className="font-medium">{formatPrice(ci.product.price * ci.quantity)}</span>
          </div>
        ))}
        <div className="border-t border-[#E5E7EB] pt-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-[#6B7280]"><span>Subtotal</span><span className="text-[#0C231D]">{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between text-[#6B7280]"><span>Delivery</span><span className="text-[#0C231D]">{formatPrice(deliveryFee)}</span></div>
          <div className="flex justify-between text-[#6B7280]"><span>Service fee</span><span className="text-[#0C231D]">₦100</span></div>
          <div className="flex justify-between font-bold text-[#0C231D] pt-1"><span>Total</span><span>{formatPrice(total + 100)}</span></div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-[#0C231D] flex items-center gap-2"><Wallet className="w-4 h-4 text-[#1EB95E]" /> Payment method</h2>
        <div className="grid gap-2">
          {[
            { id: "wallet" as const, label: `Wallet • ${formatPrice(walletBal)}`, sub: walletBal < total + 100 ? "Insufficient balance" : "Pay with wallet balance" },
            { id: "paystack" as const, label: "Paystack", sub: "Card, bank, USSD" },
            { id: "kora" as const, label: "Korapay", sub: "Card & transfer" },
          ].map((m) => (
            <button key={m.id} onClick={() => setPay(m.id)} className={`text-left border rounded-xl p-3 flex items-center justify-between ${pay === m.id ? "border-[#1EB95E] bg-[#1EB95E]/5" : "border-[#E5E7EB] bg-white"}`}>
              <div>
                <p className="text-sm font-semibold text-[#0C231D]">{m.label}</p>
                <p className="text-xs text-[#6B7280]">{m.sub}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 grid place-items-center ${pay === m.id ? "border-[#1EB95E] bg-[#1EB95E]" : "border-[#E5E7EB]"}`}>
                {pay === m.id && <span className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </button>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-xs text-[#6B7280]"><ShieldCheck className="w-3.5 h-3.5" /> Secure checkout • Visa/Mastercard • Encrypted</p>
      </div>

      <Button
        size="lg"
        className="w-full"
        disabled={items.length === 0}
        onClick={() => {
          if (!canPay) return toast.error("Wallet balance insufficient - fund wallet or choose Paystack/Kora");
          toast.success("Order placed - payment held (ledger reserved)");
        }}
      >
        {items.length ? `Pay ${formatPrice(total + 100)} & Place order` : "Add items first"}
      </Button>
      {!canPay && <p className="text-xs text-red-600 text-center">Wallet balance below total. Fund wallet in Wallet tab.</p>}
    </div>
  );
}
