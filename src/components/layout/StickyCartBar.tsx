"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function StickyCartBar() {
  const { count, total } = useCart();
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
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-[72px] inset-x-0 z-30 px-3 md:bottom-20 pointer-events-none flex justify-center"
        >
          <div className="w-full max-w-[420px] pointer-events-auto bg-[#0C231D] text-white rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center justify-between gap-2 border border-white/10">
            {/* Clickable Cart Info */}
            <Link href="/cart" className="flex-1 min-w-0 flex items-center gap-2.5 pl-1">
              <div className="w-8 h-8 rounded-xl bg-[#1EB95E]/20 text-[#1EB95E] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {count} {count === 1 ? "item" : "items"}
                </p>
                <p className="text-xs font-bold text-[#1EB95E]">{formatPrice(total)}</p>
              </div>
            </Link>

            {/* Actions: View Cart button + X Dismiss button */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                href="/cart"
                className="inline-flex items-center gap-1 bg-[#1EB95E] hover:bg-[#1B9A4D] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition whitespace-nowrap active:scale-95 shadow-sm"
              >
                View Cart <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setVisible(false)}
                className="w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center shrink-0 active:scale-90 transition"
                aria-label="Dismiss cart bar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
