"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const { count } = useCart();
  const pathname = usePathname();
  if (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/onboarding")) return null;
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] supports-[backdrop-filter]:bg-white/70">
      <div className="relative mx-auto max-w-[720px] px-4 h-14 flex items-center justify-between">
        {/* Left: profile */}
        <div className="flex items-center gap-2">
          <Link href="/profile" className="w-9 h-9 rounded-full bg-[#0C231D] text-white grid place-items-center font-semibold text-sm active:scale-95 transition" aria-label="Profile">
            T
          </Link>
        </div>

        {/* Center: logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center" aria-label="RUNA home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="RUNA" className="h-8 sm:h-9 w-auto object-contain max-h-10" />
        </Link>

        {/* Right: cart + notifications (notifications extreme right) */}
        <div className="flex items-center gap-2">
          <Link href="/cart" aria-label="Cart" className="relative w-9 h-9 grid place-items-center rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] active:scale-95 transition">
            <ShoppingBag className="w-4 h-4 text-[#0C231D]" />
            {count > 0 && <span className="absolute -top-1 -right-1 bg-[#1EB95E] text-white text-[10px] font-bold min-w-5 h-5 grid place-items-center rounded-full px-1">{count}</span>}
          </Link>
          <Link href="/notifications" aria-label="Notifications" className="w-9 h-9 grid place-items-center rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] active:scale-95 transition">
            <Bell className="w-4 h-4 text-[#0C231D]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
