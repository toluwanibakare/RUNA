"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Receipt, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/orders", label: "Orders", icon: Receipt },
  { href: "/wallet", label: "Wallet", icon: Wallet },
];

export function BottomNav() {
  const path = usePathname();
  // hide on auth/onboarding
  if (path.startsWith("/login") || path.startsWith("/signup") || path.startsWith("/onboarding")) return null;
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-[env(safe-area-inset-bottom)] bg-white border-t border-[#E5E7EB] md:bottom-4 md:mx-auto md:max-w-[520px] md:rounded-full md:border md:shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:overflow-hidden">
      <div className="flex items-center justify-around h-[68px] px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = path === href || (href !== "/" && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl min-w-[56px] transition-all active:scale-95",
                active ? "text-[#1EB95E]" : "text-[#6B7280] hover:text-[#0C231D]"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "stroke-[2.5px]")} />
              <span className="text-[11px] font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
