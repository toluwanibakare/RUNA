"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { VerificationBadge } from "@/components/ui/Badge";
import { Mail, BadgeCheck, FileImage } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { cn } from "@/lib/utils";

export default function VerifyPage() {
  const [tab, setTab] = useState<"email" | "id" | "portal">("email");
  return (
    <div className="space-y-5">
      <BackButton fallback="/profile" label="Profile" />
      <h1 className="text-xl font-bold text-[#0C231D]">Student Verification</h1>
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <p className="text-sm text-[#6B7280]">Verify your student status to unlock Activities Local and Runner access.</p>
        <VerificationBadge verified={false} />
      </div>

      <div className="flex gap-2 bg-[#F9FAFB] p-1 rounded-full border border-[#E5E7EB] w-fit overflow-x-auto">
        {[
          { id: "email" as const, label: "School email" },
          { id: "id" as const, label: "Student ID" },
          { id: "portal" as const, label: "Portal + Selfie" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn("px-4 h-8 rounded-full text-xs font-semibold whitespace-nowrap", tab === t.id ? "bg-[#0C231D] text-white" : "text-[#6B7280]")}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4">
        {tab === "email" && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold flex items-center gap-2"><Mail className="w-4 h-4 text-[#1EB95E]" /> School email OTP</h2>
            <input placeholder="e.g. tolu@lasustech.edu.ng" className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
            <Button className="w-full">Send OTP</Button>
            <p className="text-xs text-[#6B7280]">Fastest - if your school provides institutional mail.</p>
          </div>
        )}
        {tab === "id" && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-[#1EB95E]" /> Matric + ID upload</h2>
            <input placeholder="Matric number" className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl h-24 grid place-items-center text-xs text-[#6B7280]">Upload student ID photo</div>
            <Button className="w-full">Submit for review</Button>
          </div>
        )}
        {tab === "portal" && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold flex items-center gap-2"><FileImage className="w-4 h-4 text-[#1EB95E]" /> Portal + Selfie</h2>
            <input placeholder="Matric number" className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl h-24 grid place-items-center text-xs text-[#6B7280]">Upload portal screenshot</div>
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl h-24 grid place-items-center text-xs text-[#6B7280]">Selfie / liveness</div>
            <Button className="w-full">Submit for manual review</Button>
            <p className="text-xs text-[#6B7280]">Primary path at LASUSTECH - institutional email not universal.</p>
          </div>
        )}
      </div>
    </div>
  );
}
