"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

interface Slide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  bgColor?: string;
}

const slides: Slide[] = [
  {
    id: "hungry",
    tag: "⚡ FAST DELIVERY",
    title: "Hungry?",
    subtitle: "Get your favourite meal delivered around campus in 15 mins.",
    ctaText: "Order now",
    ctaHref: "/explore",
    image: "/images/jollof_chicken.jpg",
  },
  {
    id: "discount",
    tag: "🎉 ₦500 OFF",
    title: "₦500 OFF First Order!",
    subtitle: "Use promo code RUNA500 on your first campus order over ₦2,000.",
    ctaText: "Claim ₦500 off",
    ctaHref: "/explore",
    image: "/images/fried_rice_turkey.jpg",
  },
  {
    id: "services",
    tag: "📚 CAMPUS PRINTING",
    title: "Document Printing",
    subtitle: "A4 project printing, spiral binding & stationery delivered to your hostel.",
    ctaText: "Print documents",
    ctaHref: "/explore",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop",
  },
];

export function PromoCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative rounded-3xl bg-[#0C231D] text-white p-5 sm:p-6 overflow-hidden shadow-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex gap-3 sm:gap-4 items-center justify-between min-h-[120px]"
        >
          {/* Left Content */}
          <div className="flex-1 space-y-1.5 min-w-0 relative z-10">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1EB95E] bg-[#1EB95E]/10 border border-[#1EB95E]/20 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              {slide.tag}
            </span>

            <h3 className="text-lg sm:text-xl font-extrabold leading-tight text-white tracking-tight truncate">
              {slide.title}
            </h3>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
              {slide.subtitle}
            </p>

            <div className="pt-1">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-[#1EB95E] text-[#0C231D] hover:text-white text-xs font-bold px-3.5 py-2 rounded-full active:scale-95 transition-all shadow-sm"
              >
                {slide.ctaText} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl object-cover border border-white/10 shadow-lg"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators (Dots) */}
      <div className="flex items-center justify-center gap-1.5 mt-4 relative z-10">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === idx ? "w-6 bg-[#1EB95E]" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
