"use client";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MerchantPage() {
  const [tab, setTab] = useState("orders");
  return (
    <div className="space-y-5">
      <BackButton fallback="/profile" label="Profile" />
      <h1 className="text-xl font-bold text-[#0C231D]">Merchant</h1>
      <div className="flex gap-2">
        {["orders", "products", "sales"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-4 h-8 rounded-full text-xs font-semibold capitalize border", tab === t ? "bg-[#0C231D] text-white border-[#0C231D]" : "bg-white border-[#E5E7EB] text-[#6B7280]")}>{t}</button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
          <p className="text-xs font-bold tracking-wide text-[#1EB95E]">NEW ORDER #1024</p>
          <p className="text-sm text-[#0C231D]"><span className="text-[#6B7280]">Customer:</span> Tolu Bakare</p>
          <p className="text-sm text-[#0C231D]"><span className="text-[#6B7280]">Items:</span> Jollof Rice + Chicken</p>
          <p className="text-sm font-bold text-[#0C231D]">₦2,500 • Engineering</p>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">Accept</Button>
            <Button size="sm" variant="outline" className="flex-1">Reject</Button>
          </div>
          <p className="text-xs text-[#6B7280]">WhatsApp complements this dashboard - not the source of truth.</p>
        </div>
      )}
      {tab === "products" && <p className="text-sm text-[#6B7280] p-8 text-center bg-white border border-[#E5E7EB] rounded-2xl">Products • inventory controls</p>}
      {tab === "sales" && <p className="text-sm text-[#6B7280] p-8 text-center bg-white border border-[#E5E7EB] rounded-2xl">Sales overview • settlement after PICKED</p>}
    </div>
  );
}
