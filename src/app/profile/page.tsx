"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { VerificationBadge } from "@/components/ui/Badge";
import { BackButton } from "@/components/ui/BackButton";
import { ChevronRight, User, Package, Wallet, MapPin, BadgeCheck, Bike, Bell, HelpCircle, Settings, LogOut, Info, ExternalLink } from "lucide-react";

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
          { icon: Bell, label: "Notifications", href: "/notifications" },
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
            toast.success("Logged out - demo session ended");
            setTimeout(() => router.push("/login"), 500);
          }}
          className="w-full flex items-center gap-3 px-4 h-12 text-red-600 hover:bg-red-50 active:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* About RUNA */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0C231D] text-white grid place-items-center">
            <Info className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0C231D]">About RUNA</h2>
        </div>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          RUNA is a campus marketplace for LASUSTECH - food, groceries, printing and campus services with student-powered delivery. Browse stores, order, pay from wallet, and track with runners. Works on campus even when internet is patchy via Activities Local Network.
        </p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
            <p className="text-xs font-bold text-[#0C231D]">PWA first</p>
            <p className="text-xs text-[#6B7280]">Installable, fast, offline-ready</p>
          </div>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
            <p className="text-xs font-bold text-[#0C231D]">Student powered</p>
            <p className="text-xs text-[#6B7280]">Verified runners earn on campus</p>
          </div>
        </div>
        <p className="text-xs text-[#6B7280]">Version 1.0 - LASUSTECH pilot - Built for scale across Nigerian campuses.</p>
      </div>

      {/* Built by TMB */}
      <div className="flex items-center justify-center gap-2 py-4 text-xs text-[#6B7280]">
        <span>Built by TMB</span>
        <a
          href="https://www.tmb.it.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit TMB website"
          className="inline-flex items-center gap-1 text-[#0C231D] font-semibold hover:text-[#1EB95E] transition"
        >
          www.tmb.it.com <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
