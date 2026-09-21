"use client";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export function StickyCartBar() {
  const { count, total } = useCart();
  if (count === 0) return null;
  return (
    <div className="fixed bottom-[72px] inset-x-0 z-30 px-4 md:bottom-20 pointer-events-none">
      <div className="mx-auto max-w-[720px] pointer-events-auto">
        <Link href="/cart" className="flex items-center justify-between bg-[#0C231D] text-white rounded-2xl px-5 h-14 shadow-[0_8px_24px_rgba(0,0,0,0.16)] active:scale-[0.98] transition-transform">
          <span className="text-sm font-medium">{count} items • {formatPrice(total)}</span>
          <span className="bg-[#1EB95E] text-white text-sm font-semibold px-4 py-2 rounded-full">View Cart</span>
        </Link>
      </div>
    </div>
  );
}
