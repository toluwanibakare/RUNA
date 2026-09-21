"use client";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { walletTransactions } from "@/data/mock";
import { ArrowUpRight, ArrowDownLeft, Plus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function WalletPage() {
  const balance = 5000;
  const [showBalance, setShowBalance] = useState(true);
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#0C231D]">Wallet</h1>

      <div className="rounded-3xl bg-[#0C231D] text-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/60 tracking-wide uppercase">Balance</p>
          <button
            aria-label={showBalance ? "Show balance" : "Hide balance"}
            onClick={() => setShowBalance((v) => !v)}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 grid place-items-center hover:bg-white/20 active:scale-90 transition backdrop-blur shadow-sm"
          >
            {showBalance ? <Eye className="w-5 h-5 text-white" /> : <EyeOff className="w-5 h-5 text-white/70" />}
          </button>
        </div>
        <p className="text-3xl font-bold tracking-tight">{showBalance ? `${formatPrice(balance)}.00` : "••••••"}</p>
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => toast.success("Paystack funding - coming soon")}
            className="flex-1 inline-flex items-center justify-center gap-1 h-11 px-4 rounded-xl bg-white text-[#0C231D] font-semibold text-sm hover:bg-white/90 active:scale-[0.97] transition border border-white shadow-sm"
          >
            <Plus className="w-4 h-4" /> Fund wallet
          </button>
          <button
            onClick={() => toast.info("Send - coming soon")}
            className="flex-1 inline-flex items-center justify-center gap-1 h-11 px-4 rounded-xl bg-white/10 text-white font-semibold text-sm border border-white/15 hover:bg-white/15 active:scale-[0.97] transition backdrop-blur"
          >
            <ArrowUpRight className="w-4 h-4" /> Send
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#0C231D]">Transactions</h2>
          <span className="text-xs text-[#6B7280]">{walletTransactions.length} items</span>
        </div>
        <div className="divide-y divide-[#E5E7EB]/60">
          {walletTransactions.map((t) => (
            <div key={t.id} className="flex gap-3 p-4">
              <div className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 ${t.type === "credit" ? "bg-[#1EB95E]/10 text-[#1B9A4D]" : "bg-red-50 text-red-600"}`}>
                {t.type === "credit" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0C231D]">{t.title}</p>
                <p className="text-xs text-[#6B7280] truncate">{t.subtitle} • {t.date}</p>
              </div>
              <p className={`text-sm font-bold shrink-0 ${t.type === "credit" ? "text-[#1EB95E]" : "text-red-600"}`}>{t.type === "credit" ? "+" : "−"}{formatPrice(Math.abs(t.amount))}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
