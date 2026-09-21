"use client";
import { BackButton } from "@/components/ui/BackButton";
import { useParams } from "next/navigation";
import { stores, products } from "@/data/mock";
import { ProductCard } from "@/components/ui/Cards";
import { Button } from "@/components/ui/Button";
import { Star, Clock, ShieldCheck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function StorePage() {
  const { id } = useParams<{ id: string }>();
  const store = stores.find((s) => s.id === id) ?? stores[0];
  const menu = products.filter((p) => p.storeId === store.id || true).slice(0, 6);
  const { add, count } = useCart();
  const [tab, setTab] = useState("Popular");
  return (
    <div className="space-y-4 -mx-4">
      <div className="relative h-36 sm:h-40 md:h-44 bg-[#F9FAFB] overflow-hidden">
        <img src={store.cover} alt={store.name} loading="lazy" className="w-full h-full object-cover max-w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end gap-3">
          <img src={store.logo} alt={store.name} loading="lazy" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-white object-cover bg-white shrink-0 max-w-full" />
          <div className="text-white flex-1 min-w-0">
            <h1 className="font-bold leading-tight truncate">{store.name}</h1>
            <p className="text-xs text-white/80 flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" /> {store.rating} • {store.category} • <Clock className="w-3 h-3" /> {store.deliveryTime}
            </p>
          </div>
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", store.isOpen ? "bg-[#1EB95E] text-white" : "bg-white/20 text-white")}>{store.isOpen ? "Open" : "Closed"}</span>
        </div>
      </div>

      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {["Popular", "Meals", "Drinks", "Sides"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-4 h-8 rounded-full text-sm font-medium border shrink-0", tab === t ? "bg-[#0C231D] text-white border-[#0C231D]" : "bg-white border-[#E5E7EB] text-[#0C231D]")}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 grid grid-cols-2 gap-3 pb-20">
        {menu.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => add(p)} />
        ))}
      </div>
    </div>
  );
}
