import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "./Button";
import type { Product, Store } from "@/types";

export function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col min-w-[160px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow">
      <div className="relative aspect-[4/3] bg-[#F9FAFB]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold border border-black/5">{product.eta}</span>
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-semibold leading-tight line-clamp-1 text-[#0C231D]">{product.name}</h3>
        <p className="text-xs text-[#6B7280] line-clamp-1">{product.storeName}</p>
        <div className="flex items-center gap-1 text-xs text-[#6B7280]">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" /> {product.rating} • {formatPrice(product.price)}
        </div>
        <Button size="sm" className="mt-1 w-full" onClick={onAdd}>
          Add
        </Button>
      </div>
    </div>
  );
}

export function StoreCard({ store }: { store: Store }) {
  return (
    <div className="flex gap-3 bg-white border border-[#E5E7EB] rounded-2xl p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow">
      <img src={store.logo} alt={store.name} className="w-14 h-14 rounded-xl object-cover border border-[#E5E7EB] bg-[#F9FAFB] shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-[#0C231D] truncate">{store.name}</h3>
        <p className="text-xs text-[#6B7280]">{store.category}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-[#6B7280]">
          <span className="inline-flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />{store.rating}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{store.deliveryTime}</span>
          <span className={`ml-auto w-2 h-2 rounded-full ${store.isOpen ? "bg-[#1EB95E]" : "bg-red-400"}`} />
          <span className={store.isOpen ? "text-[#1B9A4D]" : "text-red-500"}>{store.isOpen ? "Open" : "Closed"}</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryCard({ name, icon }: { name: string; icon?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[72px]">
      <div className="w-14 h-14 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] grid place-items-center text-[#0C231D] text-lg">•</div>
      <span className="text-xs font-medium text-[#0C231D] text-center">{name}</span>
    </div>
  );
}
