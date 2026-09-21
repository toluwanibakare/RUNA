"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProductCard, StoreCard } from "@/components/ui/Cards";
import { categories, products, stores } from "@/data/mock";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X, Star, Clock, Store as StoreIcon, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ExplorePage() {
  const { add } = useCart();
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<string>("All");
  const [ratingFilter, setRatingFilter] = useState<string>("All");
  const [openOnly, setOpenOnly] = useState(false);
  const [etaFilter, setEtaFilter] = useState<string>("All");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.storeName.toLowerCase().includes(q.toLowerCase());
      const matchesCat = activeCat === "All" || p.category === activeCat;
      const matchesPrice = priceFilter === "All" || (priceFilter === "Under 1000" && p.price < 1000) || (priceFilter === "Under 2000" && p.price < 2000) || (priceFilter === "2000-4000" && p.price >= 2000 && p.price <= 4000) || (priceFilter === "4000+" && p.price > 4000);
      const matchesRating = ratingFilter === "All" || (ratingFilter === "4.5+" && p.rating >= 4.5) || (ratingFilter === "4.0+" && p.rating >= 4.0);
      return matchesSearch && matchesCat && matchesPrice && matchesRating;
    });
  }, [q, activeCat, priceFilter, ratingFilter]);

  const filteredStores = useMemo(() => {
    return stores.filter((s) => {
      const matchesSearch = !q || s.name.toLowerCase().includes(q.toLowerCase()) || s.category.toLowerCase().includes(q.toLowerCase());
      const matchesCat = activeCat === "All" || s.category === activeCat || activeCat === "More";
      const matchesOpen = !openOnly || s.isOpen;
      const matchesRating = ratingFilter === "All" || (ratingFilter === "4.5+" && s.rating >= 4.5) || (ratingFilter === "4.0+" && s.rating >= 4.0);
      const matchesEta = etaFilter === "All" || (etaFilter === "Under 15 min" && s.deliveryTime.includes("10-15") ) || (etaFilter === "Under 30 min");
      return matchesSearch && matchesCat && matchesOpen && matchesRating && matchesEta;
    });
  }, [q, activeCat, openOnly, ratingFilter, etaFilter]);

  const hasActiveFilters = priceFilter !== "All" || ratingFilter !== "All" || openOnly || etaFilter !== "All";

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#0C231D]">Explore</h1>

      {/* Search + Filter button outside, beside */}
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <SearchBar value={q} onChange={setQ} placeholder="Search food, stores or services" />
        </div>
        <button
          onClick={() => setShowFilters(true)}
          aria-label="Filters"
          className={cn(
            "w-12 h-12 rounded-2xl border grid place-items-center shrink-0 active:scale-95 transition",
            hasActiveFilters ? "bg-[#0C231D] border-[#0C231D] text-white" : "bg-white border-[#E5E7EB] text-[#0C231D] hover:bg-[#F9FAFB]"
          )}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {["All", ...categories.map((c) => c.name)].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={cn(
              "px-4 h-8 rounded-full text-sm font-medium border shrink-0 active:scale-95 transition whitespace-nowrap",
              activeCat === cat ? "bg-[#1EB95E] text-white border-[#1EB95E]" : "bg-white text-[#0C231D] border-[#E5E7EB]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex gap-2 flex-wrap">
          {priceFilter !== "All" && <span className="inline-flex items-center gap-1 bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-1 rounded-full text-xs font-medium text-[#0C231D]">Price: {priceFilter} <button onClick={() => setPriceFilter("All")} className="ml-1"><X className="w-3 h-3" /></button></span>}
          {ratingFilter !== "All" && <span className="inline-flex items-center gap-1 bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-1 rounded-full text-xs font-medium text-[#0C231D]">Rating: {ratingFilter} <button onClick={() => setRatingFilter("All")} className="ml-1"><X className="w-3 h-3" /></button></span>}
          {openOnly && <span className="inline-flex items-center gap-1 bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-1 rounded-full text-xs font-medium text-[#0C231D]">Open now <button onClick={() => setOpenOnly(false)} className="ml-1"><X className="w-3 h-3" /></button></span>}
          {etaFilter !== "All" && <span className="inline-flex items-center gap-1 bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-1 rounded-full text-xs font-medium text-[#0C231D]">ETA: {etaFilter} <button onClick={() => setEtaFilter("All")} className="ml-1"><X className="w-3 h-3" /></button></span>}
          <button onClick={() => { setPriceFilter("All"); setRatingFilter("All"); setOpenOnly(false); setEtaFilter("All"); }} className="text-xs font-semibold text-[#1EB95E] px-2">Clear all</button>
        </div>
      )}

      {/* Stores — see all stores on the app, what they have */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0C231D] flex items-center gap-1.5">
            <StoreIcon className="w-4 h-4 text-[#0C231D]" /> All Stores
            <span className="text-xs font-normal text-[#6B7280]">({filteredStores.length})</span>
          </h2>
          <span className="text-xs text-[#6B7280]">{hasActiveFilters ? "Filtered" : "All on campus"}</span>
        </div>
        <div className="grid gap-4">
          {filteredStores.map((s) => {
            const storeProducts = products.filter((p) => p.storeId === s.id);
            return (
              <div key={s.id} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
                <div className="p-3">
                  <StoreCard store={s} />
                </div>
                {storeProducts.length > 0 ? (
                  <div className="border-t border-[#E5E7EB] bg-[#F9FAFB]/50 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#0C231D] flex items-center gap-1">
                        <Package className="w-3 h-3" /> What they have - {storeProducts.length} items
                      </p>
                      <Link href={`/store/${s.id}`} className="text-xs font-semibold text-[#1EB95E] hover:underline">View store</Link>
                    </div>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                      {storeProducts.slice(0, 4).map((p) => (
                        <div key={p.id} className="min-w-[120px] max-w-[140px] shrink-0">
                          <ProductCard product={p} compact onAdd={() => add(p)} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-[#E5E7EB] bg-[#F9FAFB]/50 p-3">
                    <p className="text-xs text-[#6B7280]">No products match current filters</p>
                  </div>
                )}
              </div>
            );
          })}
          {filteredStores.length === 0 && (
            <div className="bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-8 text-center">
              <p className="text-sm font-medium text-[#0C231D]">No stores found</p>
              <p className="text-xs text-[#6B7280] mt-1">Try clearing filters or searching differently</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => { setQ(""); setActiveCat("All"); setPriceFilter("All"); setRatingFilter("All"); setOpenOnly(false); setEtaFilter("All"); }}>Clear filters</Button>
            </div>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0C231D]">Products {q && `for "${q}"`} <span className="text-xs font-normal text-[#6B7280]">({filteredProducts.length})</span></h2>
          <span className="text-xs text-[#6B7280]">{hasActiveFilters ? "Filtered" : "All"}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} compact onAdd={() => add(p)} />
          ))}
        </div>
        {filteredProducts.length === 0 && <p className="text-sm text-[#6B7280] text-center py-8">No products match your filters</p>}
      </section>

      {/* Filter Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="relative bg-white w-full max-w-[720px] mx-auto rounded-t-3xl max-h-[85vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0C231D] text-white grid place-items-center"><SlidersHorizontal className="w-4 h-4" /></div>
                <h3 className="font-bold text-[#0C231D]">Filters</h3>
              </div>
              <button onClick={() => setShowFilters(false)} className="w-8 h-8 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] grid place-items-center active:scale-95"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-5 space-y-6">
              {/* Price */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0C231D] flex items-center gap-1.5">Price <span className="text-xs font-normal text-[#6B7280]">• per item</span></h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "Under 1000", "Under 2000", "2000-4000", "4000+"].map((opt) => (
                    <button key={opt} onClick={() => setPriceFilter(opt)} className={cn("px-4 h-9 rounded-full text-sm font-medium border", priceFilter === opt ? "bg-[#0C231D] text-white border-[#0C231D]" : "bg-white text-[#0C231D] border-[#E5E7EB]")}>{opt === "All" ? "Any" : opt}</button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0C231D] flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500" /> Rating</h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "4.0+", "4.5+"].map((opt) => (
                    <button key={opt} onClick={() => setRatingFilter(opt)} className={cn("px-4 h-9 rounded-full text-sm font-medium border flex items-center gap-1", ratingFilter === opt ? "bg-[#0C231D] text-white border-[#0C231D]" : "bg-white text-[#0C231D] border-[#E5E7EB]")}>{opt === "All" ? "Any" : opt} {opt !== "All" && <Star className="w-3 h-3 fill-amber-400" />}</button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0C231D]">Availability</h4>
                <label className="flex items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
                  <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="w-5 h-5 rounded border-[#E5E7EB] accent-[#1EB95E]" />
                  <div>
                    <p className="text-sm font-semibold text-[#0C231D]">Open now only</p>
                    <p className="text-xs text-[#6B7280]">Hide closed stores</p>
                  </div>
                </label>
              </div>

              {/* Delivery time */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0C231D] flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#6B7280]" /> Delivery time</h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "Under 15 min", "Under 30 min"].map((opt) => (
                    <button key={opt} onClick={() => setEtaFilter(opt)} className={cn("px-4 h-9 rounded-full text-sm font-medium border", etaFilter === opt ? "bg-[#0C231D] text-white border-[#0C231D]" : "bg-white text-[#0C231D] border-[#E5E7EB]")}>{opt === "All" ? "Any time" : opt}</button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#E5E7EB]">
                <Button variant="outline" className="flex-1" onClick={() => { setPriceFilter("All"); setRatingFilter("All"); setOpenOnly(false); setEtaFilter("All"); }}>Reset</Button>
                <Button className="flex-1" onClick={() => setShowFilters(false)}>Show {filteredProducts.length + filteredStores.length} results</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
