"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VerificationBadge } from "@/components/ui/Badge";
import { BackButton } from "@/components/ui/BackButton";
import { ChevronRight, User, Package, Wallet, MapPin, BadgeCheck, Bike, HelpCircle, Settings, LogOut, Info, ExternalLink, Bug } from "lucide-react";

export default function ProfilePage() {
  const verified = false;
  const router = useRouter();
  return (
    <div className="space-y-5">
      <BackButton fallback="/" label="Home" />
      <div className="bg-[#0C231D] rounded-3xl p-5 flex gap-4 text-white">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" alt="avatar" className="w-14 h-14 rounded-2xl object-cover border border-white/20" />
        <div className="flex-1 min-w-0">
          <h1 className="font-bold leading-tight">Tolu Bakare</h1>
          <p className="text-xs text-white/70">0801 234 5678 • tolu@lasustech.edu.ng</p>
          <div className="mt-2">
            <VerificationBadge verified={verified} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden divide-y divide-[#E5E7EB]">
        {[
          { icon: User, label: "Personal information", href: "/profile" },
          { icon: Package, label: "Orders", href: "/orders" },
          { icon: Wallet, label: "Wallet", href: "/wallet" },
          { icon: MapPin, label: "Addresses", href: "/profile" },
          { icon: BadgeCheck, label: "Student verification", href: "/verify", badge: !verified ? "Not Verified" : "Verified" },
          { icon: Bike, label: "Become a Runner", href: "/runner", badge: !verified ? "Requires verification" : "Apply" },
          { icon: Bug, label: "Report a bug", href: "/report-bug" },
          { icon: HelpCircle, label: "Help & support", href: "/profile" },
          { icon: Settings, label: "Settings", href: "/profile" },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center gap-3 px-4 h-12 hover:bg-[#F9FAFB] active:bg-[#F9FAFB] transition">
            <item.icon className="w-4 h-4 text-[#0C231D]" />
            <span className="flex-1 text-sm font-medium text-[#0C231D]">{item.label}</span>
            {item.badge && <span className="text-xs text-[#6B7280] border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 rounded-full">{item.badge}</span>}
            <ChevronRight className="w-4 h-4 text-[#6B7280]" />
          </Link>
        ))}
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="w-full flex items-center gap-3 px-4 h-12 text-red-600 hover:bg-red-50 active:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* About - link to detailed page */}
      <Link href="/about" className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center gap-3 hover:border-[#1EB95E]/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition">
        <div className="w-10 h-10 rounded-xl bg-[#0C231D] text-white grid place-items-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#0C231D]">About RUNA</p>
          <p className="text-xs text-[#6B7280]">Learn about the app, version and credits</p>
        </div>
        <ChevronRight className="w-4 h-4 text-[#6B7280]" />
      </Link>

      {/* Version + Built by */}
      <div className="flex flex-col items-center gap-2 py-2">
        <span className="text-xs inline-flex items-center gap-2 bg-white border border-[#E5E7EB] px-3 py-1 rounded-full">
          <span className="text-[#6B7280]">Version</span> <span className="font-bold text-[#0C231D]">0.0.1</span>
        </span>
        <a
          href="https://www.tmb.it.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit TMB website"
          className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0C231D] transition"
        >
          Built by TMB <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
