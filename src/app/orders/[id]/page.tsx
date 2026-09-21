"use client";
import { BackButton } from "@/components/ui/BackButton";
import { useParams } from "next/navigation";
import { orders } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { Check, Clock, Bike, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
  // map status to index
  const statusOrder: Record<string, number> = {
    placed: 0, payment_confirmed: 1, merchant_accepted: 2, preparing: 3, ready_for_pickup: 4, runner_assigned: 5, picked_up: 6, on_the_way: 7, delivered: 8,
  };
  const current = statusOrder[order.status] ?? 3;
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
        {order.pin && (
          <div className="bg-[#F9FAFB] border border-dashed border-[#E5E7EB] rounded-xl p-4 text-center space-y-1">
            <p className="text-xs text-[#6B7280]">Delivery PIN - show to runner</p>
            <p className="text-2xl font-bold tracking-[0.3em] text-[#0C231D]">{order.pin}</p>
          </div>
        )}
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-2">
        <h2 className="text-sm font-semibold text-[#0C231D]">Order summary</h2>
        {order.items.map((ci) => (
          <div key={ci.product.id} className="flex justify-between text-sm">
            <span>{ci.product.name} × {ci.quantity}</span>
            <span className="font-medium">{formatPrice(ci.product.price * ci.quantity)}</span>
          </div>
        ))}
        <div className="border-t border-[#E5E7EB] pt-2 flex justify-between font-bold"><span>Total</span><span>{formatPrice(order.total)}</span></div>
      </div>
    </div>
  );
}
