"use client";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProductCard, StoreCard } from "@/components/ui/Cards";
import { PromoModal } from "@/components/ui/PromoModal";
import { categories, stores, products } from "@/data/mock";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { Wifi, ShieldCheck, ArrowRight, Flame, Clock, Printer, Monitor, PenTool, Shirt, Star, Utensils, CupSoda, ShoppingBasket, Cookie, Grid3x3 } from "lucide-react";

export default function HomePage() {
  const { add } = useCart();
  // Demo: verification gate - only verified students unlock local LAN features (prompt.txt:515, design.md Activities Local)
  // In production this would come from auth/profile → verified flag. For demo we default to UNVERIFIED to show locked premium state.
  const isVerified = false; // toggle to true to see connected state
  const isOnLocalNetwork = true; // mock: user is on Activities WiFi
  return (
    <div className="space-y-6">
      {/* Chowdeck-style Promo Modal */}
      <PromoModal />

      {/* Greeting */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#0C231D]">Good morning, Tolu 👋</h1>
        <p className="text-sm text-[#6B7280]">What are you looking for today?</p>
      </div>

      {/* Search */}
      <SearchBar />

      {/* Activities Local banner - gated to verified only */}
      {isOnLocalNetwork && isVerified ? (
        <div className="rounded-2xl border border-[#1EB95E]/20 bg-[#1EB95E]/5 p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1EB95E] text-white grid place-items-center">
            <Wifi className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0C231D]">Activities Local Mode</p>
            <p className="text-xs text-[#6B7280]">Connected locally - browse and order even when mobile internet is unavailable.</p>
          </div>
          <span className="text-xs font-semibold bg-[#1EB95E] text-white px-2.5 py-1 rounded-full">LOCAL</span>
        </div>
      ) : isOnLocalNetwork && !isVerified ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-amber-200 grid place-items-center">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0C231D]">Activities Local Mode</p>
            <p className="text-xs text-[#6B7280]">Student verification required - verify to unlock local access.</p>
          </div>
          <Link href="/verify" className="text-xs font-bold bg-[#0C231D] text-white px-3 py-1.5 rounded-full whitespace-nowrap active:scale-95 transition">
            Verify
          </Link>
        </div>
      ) : null}

      {/* Categories */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-[#0C231D]">Categories</h2>
          <Link href="/explore" className="text-xs font-semibold text-[#1EB95E]">See all</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
          {categories.map((c) => {
            const iconMap: Record<string, React.ElementType> = {
              Food: Utensils,
              Drinks: CupSoda,
              Groceries: ShoppingBasket,
              Snacks: Cookie,
              Printing: Printer,
              "Cyber Cafe": Monitor,
              Stationery: PenTool,
              Laundry: Shirt,
              More: Grid3x3,
            };
            const Icon = iconMap[c.name] ?? ShoppingBasket;
            return (
              <Link key={c.id} href="/explore" className="flex flex-col items-center gap-2 min-w-[68px] shrink-0 group active:scale-95 transition">
                <div className="w-14 h-14 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] group-hover:border-[#1EB95E]/20 group-hover:bg-[#1EB95E]/5 grid place-items-center text-[#0C231D] group-hover:text-[#1EB95E] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-[#0C231D] whitespace-nowrap group-hover:text-[#1EB95E]">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Promo */}
      <div className="rounded-3xl bg-[#0C231D] text-white p-5 sm:p-6 flex gap-3 sm:gap-4 overflow-hidden relative items-center">
        <div className="flex-1 space-y-2 relative z-10 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold leading-tight">Hungry?</h3>
          <p className="text-sm text-white/80 leading-relaxed line-clamp-2">Get your favourite meal delivered around campus.</p>
          <Link href="/explore" className="inline-flex items-center gap-2 bg-white text-[#0C231D] text-sm font-semibold px-4 py-2 rounded-full mt-2 active:scale-95 transition">
            Order now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" alt="food" loading="lazy" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl object-cover shrink-0 max-w-[38%] aspect-square" />
      </div>

      {/* Flash Sales */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[#0C231D] flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-red-500 text-white grid place-items-center">
              <Flame className="w-4 h-4" />
            </span>
            Flash Sales
          </h2>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#0C231D] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3" /> 04:22:18
            </span>
            <span className="sm:hidden inline-flex bg-[#0C231D] text-white text-xs font-bold px-2 py-1 rounded-full">04:22:18</span>
            <Link href="/explore" className="text-xs font-semibold text-[#1EB95E]">
              View all
            </Link>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {products.slice(0, 3).map((p) => (
            <div key={`flash-${p.id}`} className="min-w-[150px] max-w-[170px] shrink-0 relative">
              <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-sm border border-white/20">-20%</div>
              <ProductCard product={{ ...p, price: Math.round(p.price * 0.8), originalPrice: p.price }} onAdd={() => add(p)} />
            </div>
          ))}
        </div>
      </section>

      {/* Popular around Activities */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold text-[#0C231D]">Popular around Activities</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="min-w-[150px] max-w-[170px] shrink-0">
              <ProductCard
                product={p}
                onAdd={() => add(p)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Student's Favorites */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[#0C231D] flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Student&apos;s Favorites
          </h2>
          <Link href="/explore" className="text-xs font-semibold text-[#1EB95E]">
            See all
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {[...products].sort((a,b)=>b.rating-a.rating).slice(0,4).map((p) => (
            <div key={`fav-${p.id}`} className="min-w-[150px] max-w-[170px] shrink-0">
              <ProductCard product={p} onAdd={() => add(p)} />
            </div>
          ))}
        </div>
      </section>

      {/* Stores */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold text-[#0C231D]">Stores near you</h2>
        <div className="grid gap-3">
          {stores.map((s) => (
            <Link key={s.id} href={`/store/${s.id}`} className="block">
              <StoreCard store={s} />
            </Link>
          ))}
        </div>
      </section>

      {/* Under 2000 */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold text-[#0C231D]">Under ₦2,000</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {products.filter((p) => p.price < 2000).map((p) => (
            <div key={p.id} className="min-w-[150px] max-w-[170px] shrink-0">
              <ProductCard
                product={p}
                onAdd={() => add(p)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[#0C231D] flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[#1EB95E] fill-[#1EB95E]" /> Services
          </h2>
          <Link href="/explore" className="text-xs font-semibold text-[#1EB95E]">
            Explore
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Printer, name: "Printing", desc: "A4, binding, lamination", eta: "5-10 min" },
            { icon: Monitor, name: "Cyber Cafe", desc: "Browsing, typing, scanning", eta: "Open now" },
            { icon: PenTool, name: "Stationery", desc: "Books, pens, supplies", eta: "10 min" },
            { icon: Shirt, name: "Laundry", desc: "Wash, iron, dry clean", eta: "Tomorrow" },
          ].map((s) => (
            <Link key={s.name} href="/explore" className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col gap-2 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-[#1EB95E]/20 transition-all active:scale-[0.98]">
              <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] grid place-items-center text-[#0C231D]">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0C231D]">{s.name}</p>
                <p className="text-xs text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>
              <p className="text-xs font-semibold text-[#1EB95E]">{s.eta} -&gt;</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Second Promo - New around Activities - landscape */}
      <div className="rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] p-5 sm:p-6 flex gap-4 overflow-hidden items-center">
        <div className="flex-1 space-y-2 min-w-0">
          <div className="inline-flex items-center gap-1.5 bg-[#1EB95E]/10 text-[#1B9A4D] text-xs font-bold px-2.5 py-1 rounded-full border border-[#1EB95E]/20">
            <Star className="w-3 h-3 fill-white" /> New
          </div>
          <h3 className="text-lg font-bold leading-tight text-[#0C231D]">New around Activities</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">Discover fresh stores, meals and services around you.</p>
          <Link href="/explore" className="inline-flex items-center gap-2 bg-[#0C231D] text-white text-sm font-semibold px-4 py-2 rounded-full mt-1 active:scale-95 transition">
            Explore now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=360&fit=crop" alt="campus" loading="lazy" className="w-36 h-24 sm:w-40 sm:h-24 md:w-48 md:h-28 rounded-2xl object-cover shrink-0 max-w-[45%] aspect-[16/10] border border-[#E5E7EB]" />
      </div>

      <div className="h-6" />
    </div>
  );
}
