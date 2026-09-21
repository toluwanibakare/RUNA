"use client";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Wallet, ShieldCheck, Star, Share2 } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { runners } from "@/data/mock";
import { useSearchParams } from "next/navigation";

function ShareToRunner() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      {runners.filter((r) => r.isFavorite).map((r) => (
        <button
          key={r.id}
          onClick={() => setSelected(selected === r.id ? null : r.id)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left ${selected === r.id ? "border-[#1EB95E] bg-[#1EB95E]/5" : "border-[#E5E7EB] bg-[#F9FAFB] hover:bg-white"}`}
        >
          <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB]" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0C231D] flex items-center gap-1">{r.name} {r.isOnline && <span className="w-2 h-2 bg-[#1EB95E] rounded-full" />} </p>
            <p className="text-xs text-[#6B7280] flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 stroke-amber-400" /> {r.rating} • {r.deliveries} deliveries</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${selected === r.id ? "bg-[#1EB95E] text-white" : "bg-white border border-[#E5E7EB] text-[#0C231D]"}`}>{selected === r.id ? "Shared" : "Share"}</span>
        </button>
      ))}
      {runners.filter((r) => r.isFavorite).length === 0 && <p className="text-xs text-[#6B7280]">No favorites yet - order once to add favorites.</p>}
      {selected && <p className="text-xs text-[#1EB95E] flex items-center gap-1"><Share2 className="w-3 h-3" /> Shared to runner - they will be notified first.</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { packs: allPacks } = useCart();
  const searchParams = useSearchParams();
  const packId = searchParams.get("packId");
  const packs = packId ? allPacks.filter((p) => p.id === packId) : allPacks;
  // same-store packs checkout together - if packId given, show that pack; if same store multiple packs, they would have same storeId but we filter by id
  const distinctStores = new Set(packs.filter((p) => p.items.length > 0).map((p) => p.storeId));
  const subtotal = packs.reduce((s, p) => s + p.items.reduce((a, i) => a + i.product.price * i.quantity, 0), 0);
  const deliveryFee = distinctStores.size * 300;
  const rundaFee = packs.filter((p) => p.rundaPack && p.items.length > 0).length * 200;
  const total = subtotal + deliveryFee + rundaFee;
  const [address, setAddress] = useState("Engineering, Block A, Room 12");
  const [pay, setPay] = useState<"wallet" | "paystack" | "kora">("wallet");
  const walletBal = 5000;
  const canPay = walletBal >= total || pay !== "wallet";
  const count = packs.reduce((s, p) => s + p.items.reduce((a, i) => a + i.quantity, 0), 0);
  const isSinglePack = !!packId && packs.length === 1;
  return (
    <div className="space-y-5">
      <BackButton fallback="/cart" label="Cart" />
      <h1 className="text-xl font-bold text-[#0C231D]">
        {isSinglePack ? `Checkout - ${packs[0]?.storeName}` : `Checkout - ${packs.length} pack${packs.length !== 1 ? "s" : ""}`}
      </h1>
      {isSinglePack && <p className="text-xs text-[#1EB95E] font-semibold -mt-3">Single pack checkout - same store packs checkout together</p>}

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#0C231D]">
          <MapPin className="w-4 h-4 text-[#1EB95E]" /> Delivery location
        </div>
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 flex items-start justify-between gap-3">
          <p className="text-sm text-[#0C231D] flex-1">{address}</p>
          <button onClick={() => setAddress(prompt("Enter delivery location", address) || address)} className="text-xs font-semibold text-[#1EB95E] shrink-0">Change</button>
        </div>
        <p className="text-xs text-[#6B7280]">ETA • Delivery on Apr 4 • 10-15 min per pack</p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-4">
        <h2 className="text-sm font-semibold text-[#0C231D]">Order summary • {count} items in {packs.length} packs</h2>
        {packs.length === 0 ? <p className="text-sm text-[#6B7280]">No items - add from home</p> : packs.map((pack) => (
          <div key={pack.id} className="border border-[#E5E7EB] rounded-xl p-3 space-y-2 bg-[#F9FAFB]/50">
            <p className="text-xs font-bold text-[#0C231D]">Pack - {pack.storeName}</p>
            {pack.items.map((ci) => (
              <div key={ci.product.id} className="flex justify-between text-sm">
                <span className="text-[#0C231D]">{ci.product.name} x {ci.quantity}</span>
                <span className="font-medium">{formatPrice(ci.product.price * ci.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs text-[#6B7280] pt-1 border-t border-[#E5E7EB]/50"><span>Pack delivery</span><span>{formatPrice(pack.deliveryFee)}</span></div>
            {pack.rundaPack && <div className="flex justify-between text-xs text-[#6B7280]"><span>Runda Pack (sealed)</span><span>{formatPrice(200)}</span></div>}
          </div>
        ))}
        <div className="border-t border-[#E5E7EB] pt-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-[#6B7280]"><span>Subtotal ({packs.length} packs)</span><span className="text-[#0C231D]">{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between text-[#6B7280]"><span>Delivery ({distinctStores.size} x {formatPrice(300)})</span><span className="text-[#0C231D]">{formatPrice(deliveryFee)}</span></div>
          {rundaFee > 0 && <div className="flex justify-between text-[#6B7280]"><span>Runda Pack</span><span className="text-[#0C231D]">{formatPrice(rundaFee)}</span></div>}
          <div className="flex justify-between text-[#6B7280]"><span>Service fee</span><span className="text-[#0C231D]">₦100</span></div>
          <div className="flex justify-between font-bold text-[#0C231D] pt-1"><span>Total</span><span>{formatPrice(total + 100)}</span></div>
          <p className="text-xs text-[#6B7280]">Adding from another store creates a new pack and increases delivery fee. Runda Pack is optional ₦200 seal per pack.</p>
        </div>
      </div>

      {/* Share to Runner */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-[#0C231D] flex items-center gap-1.5">Share to runner <span className="text-xs font-normal text-[#6B7280]">- optional</span></h2>
        <p className="text-xs text-[#6B7280]">Favorite runners you have worked with before - share directly, they have stars, tip after.</p>
        <ShareToRunner />
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-[#0C231D] flex items-center gap-2"><Wallet className="w-4 h-4 text-[#1EB95E]" /> Payment method</h2>
        <div className="grid gap-2">
          {[
            { id: "wallet" as const, label: `Wallet - ${formatPrice(walletBal)}`, sub: walletBal < total + 100 ? "Insufficient balance" : "Pay with wallet balance" },
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
        disabled={packs.length === 0}
        onClick={() => {
          if (!canPay) return toast.error("Wallet balance insufficient - fund wallet or choose Paystack/Kora");
          toast.success("Order placed - payment held (ledger reserved)");
        }}
      >
        {packs.length ? `Pay ${formatPrice(total + 100)} & Place ${packs.length} pack${packs.length > 1 ? "s" : ""}` : "Add items first"}
      </Button>
      {!canPay && <p className="text-xs text-red-600 text-center">Wallet balance below total. Fund wallet in Wallet tab.</p>}
    </div>
  );
}
