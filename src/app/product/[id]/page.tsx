"use client";
import { BackButton } from "@/components/ui/BackButton";
import { useParams } from "next/navigation";
import { products } from "@/data/mock";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id) ?? products[0];
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <div className="space-y-5 -mx-4">
      <div className="aspect-[4/3] sm:aspect-[16/10] bg-[#F9FAFB] overflow-hidden max-w-full">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover max-w-full" />
      </div>
      <div className="px-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-[#0C231D]">{product.name}</h1>
          <p className="text-sm text-[#6B7280]">{product.storeName} • {product.eta} • ★ {product.rating}</p>
        </div>
        <p className="text-sm text-[#0C231D] leading-relaxed">{product.description} - prepared fresh on campus. Served with love from {product.storeName}.</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-[#0C231D]">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full border border-[#E5E7EB] bg-white grid place-items-center active:scale-95"><Minus className="w-4 h-4" /></button>
            <span className="w-8 text-center font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 rounded-full bg-[#0C231D] text-white grid place-items-center active:scale-95"><Plus className="w-4 h-4" /></button>
          </div>
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            for (let i = 0; i < qty; i++) add(product);
          }}
        >
          Add to cart • {formatPrice(product.price * qty)}
        </Button>
      </div>
    </div>
  );
}
