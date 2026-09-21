"use client";
import { BackButton } from "@/components/ui/BackButton";
import { useParams } from "next/navigation";
import { orders, runners } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { Check, Clock, Star, DollarSign, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { toast } from "sonner";

const steps = [
  { id: "placed", label: "Order placed" },
  { id: "payment_confirmed", label: "Payment confirmed" },
  { id: "merchant_accepted", label: "Merchant accepted" },
  { id: "preparing", label: "Preparing" },
  { id: "ready_for_pickup", label: "Ready for pickup" },
  { id: "runner_assigned", label: "Runner assigned" },
  { id: "picked_up", label: "Picked up" },
  { id: "on_the_way", label: "On the way" },
  { id: "delivered", label: "Delivered" },
];

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((o) => o.id === id) ?? orders[0];
  const statusOrder: Record<string, number> = {
    placed: 0, payment_confirmed: 1, merchant_accepted: 2, preparing: 3, ready_for_pickup: 4, runner_assigned: 5, picked_up: 6, on_the_way: 7, delivered: 8,
  };
  const current = statusOrder[order.status] ?? 3;
  const runner = runners[0];
  const [codeInput, setCodeInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [rating, setRating] = useState(0);
  const [tip, setTip] = useState<number | null>(null);

  const handleVerify = () => {
    if (codeInput === order.pin) {
      setVerified(true);
      toast.success("Code verified - delivery confirmed");
    } else {
      toast.error("Wrong code - ask customer for correct PIN");
    }
  };

  return (
    <div className="space-y-5">
      <BackButton fallback="/orders" label="Orders" />
      <h1 className="text-xl font-bold text-[#0C231D]">Order #{order.id}</h1>
      <p className="text-sm text-[#6B7280]">{order.storeName} • {order.deliveryAddress}</p>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-4">
        <div className="space-y-3">
          {steps.map((s, i) => {
            const done = i <= current;
            const active = i === current;
            return (
              <div key={s.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full grid place-items-center border-2 ${done ? "bg-[#1EB95E] border-[#1EB95E] text-white" : "bg-white border-[#E5E7EB] text-[#6B7280]"}`}>
                    {done ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  {i < steps.length - 1 && <div className={`w-0.5 flex-1 my-1 ${done ? "bg-[#1EB95E]" : "bg-[#E5E7EB]"}`} />}
                </div>
                <div className={`pb-4 ${active ? "text-[#0C231D] font-semibold" : done ? "text-[#0C231D]" : "text-[#6B7280]"}`}>
                  <p className="text-sm">{s.label}</p>
                  {active && <p className="text-xs text-[#6B7280] font-normal">Current status</p>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Code verification - Chowdeck style */}
        {order.pin && (
          <div className="space-y-3 border-t border-[#E5E7EB] pt-4">
            <h3 className="text-sm font-bold text-[#0C231D] flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#1EB95E]" /> Delivery code</h3>
            <p className="text-xs text-[#6B7280]">Customer shows this code, runner enters it to verify handoff. Both must verify.</p>
            <div className="bg-[#F9FAFB] border border-dashed border-[#E5E7EB] rounded-xl p-4 text-center space-y-2">
              <p className="text-xs text-[#6B7280]">Customer code - show to runner</p>
              <p className="text-2xl font-bold tracking-[0.3em] text-[#0C231D]">{order.pin}</p>
              <p className="text-xs text-[#6B7280]">Runner enters code to confirm delivery</p>
            </div>
            <div className="flex gap-2">
              <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="Enter code" maxLength={4} className="flex-1 border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm text-center tracking-widest font-bold outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
              <Button onClick={handleVerify} disabled={verified} className="px-6">{verified ? "Verified" : "Verify"}</Button>
            </div>
            {verified && <p className="text-xs text-[#1EB95E] font-semibold text-center">Verified - order marked delivered</p>}
          </div>
        )}
      </div>

      {/* Runner card with stars */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-bold text-[#0C231D]">Runner</h3>
        <div className="flex items-center gap-3">
          <img src={runner.avatar} alt={runner.name} className="w-12 h-12 rounded-full object-cover border border-[#E5E7EB]" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#0C231D]">{runner.name}</p>
            <p className="text-xs text-[#6B7280] flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 stroke-amber-400" /> {runner.rating} • {runner.deliveries} deliveries</p>
          </div>
          <span className="text-xs bg-[#1EB95E]/10 text-[#1B9A4D] border border-[#1EB95E]/20 px-2.5 py-1 rounded-full font-semibold">{runner.isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>

      {/* Rating + Tip after order */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-[#0C231D]">Rate your runner</h3>
        <p className="text-xs text-[#6B7280]">Rate after every order - runners have stars</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRating(s)} className={`w-10 h-10 rounded-full border grid place-items-center ${rating >= s ? "bg-amber-400 border-amber-400 text-white" : "bg-white border-[#E5E7EB] text-[#6B7280]"}`}>
              <Star className={`w-5 h-5 ${rating >= s ? "fill-white" : ""}`} />
            </button>
          ))}
        </div>
        {rating > 0 && <p className="text-xs text-[#1EB95E]">Thanks for rating {rating} stars</p>}

        <h4 className="text-sm font-semibold text-[#0C231D] flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-[#1EB95E]" /> Tip runner <span className="text-xs font-normal text-[#6B7280]">- optional</span></h4>
        <div className="flex gap-2 flex-wrap">
          {[200, 500, 1000].map((a) => (
            <button key={a} onClick={() => setTip(a)} className={`px-4 h-9 rounded-full border text-sm font-semibold ${tip === a ? "bg-[#0C231D] text-white border-[#0C231D]" : "bg-white border-[#E5E7EB] text-[#0C231D]"}`}>₦{a}</button>
          ))}
          <button onClick={() => setTip(0)} className={`px-4 h-9 rounded-full border text-sm font-semibold ${tip === 0 ? "bg-[#0C231D] text-white" : "bg-white border-[#E5E7EB]"}`}>No tip</button>
        </div>
        {tip !== null && tip > 0 && <Button size="sm" onClick={() => toast.success(`Tipped ₦${tip} to ${runner.name}`)}>Send tip ₦{tip}</Button>}
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-2">
        <h2 className="text-sm font-semibold text-[#0C231D]">Order summary</h2>
        {order.items.map((ci) => (
          <div key={ci.product.id} className="flex justify-between text-sm">
            <span>{ci.product.name} x {ci.quantity}</span>
            <span className="font-medium">{formatPrice(ci.product.price * ci.quantity)}</span>
          </div>
        ))}
        <div className="border-t border-[#E5E7EB] pt-2 flex justify-between font-bold"><span>Total</span><span>{formatPrice(order.total)}</span></div>
      </div>
    </div>
  );
}
