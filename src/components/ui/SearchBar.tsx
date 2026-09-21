"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar({ placeholder = "Search food, stores or services", className, onFilter }: { placeholder?: string; className?: string; onFilter?: () => void }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-2xl px-4 h-12 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus-within:border-[#1EB95E] focus-within:ring-2 focus-within:ring-[#1EB95E]/15 transition-all",
        className
      )}
    >
      <Search className="w-5 h-5 text-[#6B7280] shrink-0" />
      <input
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-[#6B7280] text-[#0C231D]"
        aria-label="Search"
      />
      <button
        aria-label="Filter"
        onClick={onFilter}
        className="w-8 h-8 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] grid place-items-center hover:bg-white transition-colors active:scale-95 shrink-0"
      >
        <SlidersHorizontal className="w-4 h-4 text-[#0C231D]" />
      </button>
    </div>
  );
}
