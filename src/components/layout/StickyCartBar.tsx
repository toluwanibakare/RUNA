"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function StickyCartBar() {
  const { count, total, packs } = useCart();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Hide on cart and checkout pages
  const isHiddenPage = pathname === "/cart" || pathname === "/checkout";

  useEffect(() => {
    if (count > 0 && !isHiddenPage) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000); // Disappear after 5 seconds of inactivity
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [count, total, pathname, isHiddenPage]);

  if (count === 0 || isHiddenPage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-[72px] inset-x-0 z-30 px-4 md:bottom-20 pointer-events-none"
        >
          <div className="mx-auto max-w-[720px] pointer-events-auto flex items-center gap-2">
            <Link
              href="/cart"
              className="flex-1 flex items-center justify-between bg-[#0C231D] text-white rounded-2xl px-4 h-13 shadow-[0_8px_24px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-all hover:bg-[#081814]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1EB95E]/20 text-[#1EB95E] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  {count} {count === 1 ? "item" : "items"} • {packs.length} pack{packs.length !== 1 ? "s" : ""} • {formatPrice(total)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#1EB95E] hover:bg-[#1B9A4D] text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition shadow-sm">
                View Cart <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Manual Dismiss button */}
            <button
              onClick={() => setVisible(false)}
              className="w-10 h-10 rounded-2xl bg-[#0C231D] text-white/70 hover:text-white border border-white/10 flex items-center justify-center shrink-0 shadow-lg active:scale-90 transition"
              aria-label="Dismiss cart bar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
