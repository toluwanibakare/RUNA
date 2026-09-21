"use client";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bike, Star, Wallet, Package } from "lucide-react";

export default function RunnerPage() {
  const verified = false;
  const [online, setOnline] = useState(false);
  const router = useRouter();
  if (!verified) {
    return (
      <div className="space-y-5">
      <BackButton fallback="/profile" label="Profile" />
        <h1 className="text-xl font-bold text-[#0C231D]">Become a Runner</h1>
        <div className="bg-[#0C231D] rounded-3xl p-6 text-white space-y-3">
          <Bike className="w-8 h-8" />
          <h2 className="text-lg font-bold">Earn by delivering around campus</h2>
          <p className="text-sm text-white/70">Verified students only - verify first, then apply.</p>
          <Button className="bg-white text-[#0C231D] hover:bg-white/90 w-full" onClick={() => router.push("/verify")}>Verify student status</Button>
          <p className="text-xs text-white/60">Requirements: verified + identity + selfie + admin approval</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0C231D]">Runner</h1>
        <button onClick={() => setOnline(!online)} className={`px-4 h-8 rounded-full text-xs font-bold border ${online ? "bg-[#1EB95E] text-white border-[#1EB95E]" : "bg-white border-[#E5E7EB] text-[#6B7280]"}`}>
          {online ? "Online" : "Offline"}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Earnings", value: "₦12,400", icon: Wallet },
          { label: "Deliveries", value: "47", icon: Package },
          { label: "Rating", value: "4.9", icon: Star },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 text-center">
            <p className="text-xs text-[#6B7280]">{s.label}</p>
            <p className="text-lg font-bold text-[#0C231D]">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-[#0C231D]">Available deliveries</h2>
        <div className="border border-[#E5E7EB] rounded-xl p-3 flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold">Order #1024 • Mama T&apos;s</p>
            <p className="text-xs text-[#6B7280]">Jollof Rice + Chicken • Engineering</p>
          </div>
          <Button size="sm">Claim</Button>
        </div>
        <p className="text-xs text-[#6B7280]">Claim is atomic - only one runner wins.</p>
      </div>
    </div>
  );
}
