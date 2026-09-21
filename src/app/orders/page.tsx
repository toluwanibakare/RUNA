"use client";
import Link from "next/link";
import { orders } from "@/data/mock";
import { StatusBadge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
  const [tab, setTab] = useState<"active" | "completed">("active");
  const active = orders.filter((o) => o.status !== "delivered" && o.status !== "completed");
  const completed = orders.filter((o) => o.status === "delivered" || o.status === "completed");
  const list = tab === "active" ? active : completed;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-[#0C231D]">Orders</h1>
      <div className="flex gap-2 bg-[#F9FAFB] p-1 rounded-full border border-[#E5E7EB] w-fit">
        {(["active", "completed"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-5 h-8 rounded-full text-sm font-semibold capitalize", tab === t ? "bg-[#0C231D] text-white" : "text-[#6B7280]")}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {list.length ? list.map((o) => (
          <Link key={o.id} href={`/orders/${o.id}`} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-2 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#0C231D]">Order #{o.id} • {o.storeName}</p>
              <StatusBadge tone={o.status === "delivered" ? "green" : "gray"}>{o.status.replaceAll("_", " ")}</StatusBadge>
            </div>
            <p className="text-sm text-[#6B7280] truncate">{o.items.map((i) => `${i.product.name} ×${i.quantity}`).join(" • ")}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-[#0C231D]">{formatPrice(o.total)}</span>
              <span className="text-xs text-[#6B7280]">{o.createdAt}</span>
            </div>
          </Link>
        )) : <p className="text-sm text-[#6B7280] text-center py-12">No {tab} orders</p>}
      </div>
    </div>
  );
}
