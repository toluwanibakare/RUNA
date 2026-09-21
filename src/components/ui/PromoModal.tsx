"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Copy, Check, ArrowRight, Tag } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface PromoModalProps {
  forceShow?: boolean;
  onClose?: () => void;
}

export function PromoModal({ forceShow = false, onClose }: PromoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setIsOpen(true);
      return;
    }

    // Auto trigger after 1.2s delay if not dismissed in session
    const isDismissed = sessionStorage.getItem("runa_promo_modal_dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("runa_promo_modal_dismissed", "true");
    if (onClose) onClose();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("RUNA500");
    setCopied(true);
    toast.success("Promo code RUNA500 copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition active:scale-90"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Banner Image */}
            <div className="relative h-48 w-full overflow-hidden bg-[#0C231D]">
              <img
                src="/images/jollof_chicken.jpg"
                alt="Chowdeck style campus offer"
                className="w-full h-full object-cover opacity-90 scale-105 hover:scale-100 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C231D] via-transparent to-black/20" />

              {/* Tag pill overlay */}
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-[#1EB95E] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                LASUSTECH SPECIAL
              </div>

              {/* Banner Text overlay */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1EB95E] bg-[#0C231D]/80 px-2 py-0.5 rounded">
                  Limited Time Deal
                </span>
                <h3 className="text-2xl font-black tracking-tight text-white mt-0.5 drop-shadow-md">
                  ₦500 OFF Your First Order! 🍛
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-4 text-center">
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Enjoy smoky Jollof Rice + Chicken, Fried Rice & Turkey, or chilled Zobo delivered right to your hostel or lecture room in under 15 minutes!
              </p>

              {/* Promo Code Box */}
              <div className="rounded-2xl border-2 border-dashed border-[#1EB95E]/40 bg-[#1EB95E]/5 p-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#1EB95E] text-white flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">Use Promo Code</p>
                    <p className="text-base font-black text-[#0C231D] tracking-wider">RUNA500</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#0C231D] text-white px-3 py-2 rounded-xl active:scale-95 transition hover:bg-[#1EB95E]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/explore"
                  onClick={handleClose}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1EB95E] hover:bg-[#1B9A4D] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-[#1EB95E]/25 active:scale-95 transition"
                >
                  Claim Offer & Order Now <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleClose}
                  className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition"
                >
                  No thanks, I'll pay full price
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
