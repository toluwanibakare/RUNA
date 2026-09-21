import { BackButton } from "@/components/ui/BackButton";
import { Info, ShieldCheck, Wifi, Users, ExternalLink } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <BackButton fallback="/profile" label="Profile" />

      <div className="bg-[#0C231D] rounded-3xl p-6 text-white space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 grid place-items-center">
          <Info className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">About RUNA</h1>
        <p className="text-sm text-white/70 leading-relaxed">
          Campus marketplace + student-powered delivery + Activities Local Network. Built for LASUSTECH, designed to scale across Nigerian campuses.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-[#0C231D]">What RUNA does</h2>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          Discover food, groceries, printing, cyber cafe, stationery and campus services. Order from verified stores, pay from wallet (Paystack / Korapay), and get student runners to deliver around campus. Wallet is ledger-backed, orders are event-sourced, and dispatch is atomic.
        </p>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
            <div className="w-8 h-8 rounded-lg bg-[#1EB95E]/10 text-[#1EB95E] grid place-items-center shrink-0"><Users className="w-4 h-4" /></div>
            <div>
              <p className="text-sm font-semibold text-[#0C231D]">Student-powered</p>
              <p className="text-xs text-[#6B7280]">Verified students become runners after approval. FCFS dispatch, PIN handoff.</p>
            </div>
          </div>
          <div className="flex gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
            <div className="w-8 h-8 rounded-lg bg-[#0C231D] text-white grid place-items-center shrink-0"><ShieldCheck className="w-4 h-4" /></div>
            <div>
              <p className="text-sm font-semibold text-[#0C231D]">Trust first</p>
              <p className="text-xs text-[#6B7280]">Student verification is optional at signup, but gates Activities Local and Runner. Three methods: email OTP, ID upload, portal + selfie.</p>
            </div>
          </div>
          <div className="flex gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 grid place-items-center shrink-0"><Wifi className="w-4 h-4" /></div>
            <div>
              <p className="text-sm font-semibold text-[#0C231D]">Activities Local Network</p>
              <p className="text-xs text-[#6B7280]">Local edge server on campus WiFi. Browse and order even when internet is patchy. Syncs safely to cloud. WiFi is not verification.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-[#0C231D]">PWA & Performance</h2>
        <p className="text-sm text-[#6B7280] leading-relaxed">Installable, fast, mobile 375px first. Manifest theme #0C231D, icons on white, offline-ready shell (financial stays authoritative). Touch 44px, no horizontal overflow.</p>
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#0C231D]">Version</p>
          <p className="text-sm font-bold text-[#0C231D]">0.0.1</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#E5E7EB] text-[#6B7280]">Pilot - LASUSTECH</span>
      </div>

      <a href="https://www.tmb.it.com" target="_blank" rel="noopener noreferrer" aria-label="Visit TMB website" className="flex items-center justify-center gap-1.5 py-2 text-xs text-[#6B7280] hover:text-[#0C231D] transition">
        Built by TMB <ExternalLink className="w-3 h-3" />
      </a>

      <div className="h-4" />
    </div>
  );
}
