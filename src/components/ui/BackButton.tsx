"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ fallback = "/", label = "Back" }: { fallback?: string; label?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallback);
      }}
      aria-label={label}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0C231D] hover:text-[#1EB95E] active:scale-95 transition -ml-1"
    >
      <span className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white grid place-items-center">
        <ArrowLeft className="w-4 h-4" />
      </span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
