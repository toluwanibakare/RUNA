"use client";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProductCard, StoreCard } from "@/components/ui/Cards";
import { categories, products, stores } from "@/data/mock";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ExplorePage() {
  const { add } = useCart();
  const [q, setQ] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.storeName.toLowerCase().includes(q.toLowerCase()));
  const [activeCat, setActiveCat] = useState("All");
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#0C231D]">Explore</h1>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search food, stores or services"
            className="flex-1 bg-white border border-[#E5E7EB] rounded-2xl px-4 h-12 outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {["All", ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={cn(
                "px-4 h-8 rounded-full text-sm font-medium border shrink-0 active:scale-95 transition",
                activeCat === cat ? "bg-[#1EB95E] text-white border-[#1EB95E]" : "bg-white text-[#0C231D] border-[#E5E7EB]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[#0C231D]">Stores</h2>
        <div className="grid gap-3">
          {stores.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[#0C231D]">Products {q && `for "${q}"`}</h2>
        <div className="grid grid-cols-2 gap-3">
          {(q ? filtered : products).map((p) => (
            <ProductCard key={p.id} product={p} onAdd={() => { add(p); toast.success("Added to cart"); }} />
          ))}
        </div>
        {q && filtered.length === 0 && <p className="text-sm text-[#6B7280] text-center py-8">No results for &quot;{q}&quot;</p>}
      </section>
    </div>
  );
}
