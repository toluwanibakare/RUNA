"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { toast } from "sonner";
import { ShoppingBag, Store, ChevronRight, ArrowLeft } from "lucide-react";

type Role = "customer" | "merchant" | null;
type HeardAbout = "" | "friend" | "social" | "poster" | "activities" | "whatsapp" | "other";

const heardOptions: { value: HeardAbout; label: string }[] = [
  { value: "", label: "Select an option" },
  { value: "friend", label: "Friend / Word of mouth" },
  { value: "social", label: "Social media (X, Instagram, TikTok)" },
  { value: "poster", label: "Campus poster / Flyer" },
  { value: "activities", label: "At Activities" },
  { value: "whatsapp", label: "WhatsApp group" },
  { value: "other", label: "Other" },
];

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);

  // student fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [heard, setHeard] = useState<HeardAbout>("");

  // merchant fields
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  const [bizEmail, setBizEmail] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [bizPassword, setBizPassword] = useState("");
  const [bizHeard, setBizHeard] = useState<HeardAbout>("");

  const handleCustomerSubmit = () => {
    if (!firstName || !lastName || !phone || !email || !password || !heard) {
      toast.error("Fill all fields + how you heard about RUNA");
      return;
    }
    toast.success("Account created - welcome to RUNA");
    router.push("/login");
  };

  const handleMerchantSubmit = () => {
    if (!businessName || !ownerName || !bizPhone || !bizEmail || !location || !category || !bizPassword || !bizHeard) {
      toast.error("Fill all merchant fields + how you heard about RUNA");
      return;
    }
    toast.success("Merchant application received - we’ll onboard your store");
    router.push("/login");
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center max-w-[440px] mx-auto space-y-6 py-6">
      <div className="text-center space-y-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="RUNA" className="h-14 md:h-16 w-auto object-contain mx-auto" />
        <h1 className="text-2xl font-bold tracking-tight text-[#0C231D]">Create account</h1>
        <p className="text-sm text-[#6B7280]">{role ? (role === "customer" ? "Anyone can sign up - no verification needed to start" : "Merchant - sell to the campus") : "Choose how you’ll use RUNA - anyone can sign up"}</p>
      </div>

      {role === null ? (
        <div className="space-y-3">
          <button
            onClick={() => setRole("customer")}
            className="w-full text-left bg-white border-2 border-[#E5E7EB] hover:border-[#1EB95E] rounded-2xl p-5 flex gap-4 items-center group active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1EB95E]/10 border border-[#1EB95E]/20 grid place-items-center shrink-0 group-hover:bg-[#1EB95E] group-hover:text-white transition-colors text-[#1EB95E]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0C231D]">I want to Order</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">Anyone can sign up - order food, groceries, printing & more. Students can verify later to become a runner.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#0C231D]" />
          </button>

          <button
            onClick={() => setRole("merchant")}
            className="w-full text-left bg-white border-2 border-[#E5E7EB] hover:border-[#0C231D] rounded-2xl p-5 flex gap-4 items-center group active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0C231D] text-white grid place-items-center shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0C231D]">I am a Merchant</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">Sell on RUNA - manage menu, orders, and payouts. Assisted onboarding.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#0C231D]" />
          </button>

          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-3 text-center">
            <p className="text-xs text-[#6B7280]">Already have an account? <Link href="/login" className="font-semibold text-[#0C231D] hover:text-[#1EB95E]">Log in</Link></p>
          </div>
        </div>
      ) : role === "customer" ? (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <button onClick={() => setRole(null)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#0C231D] -ml-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to choose role
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1EB95E]/10 grid place-items-center text-[#1EB95E]"><ShoppingBag className="w-4 h-4" /></div>
            <h2 className="text-sm font-bold text-[#0C231D]">Your details</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
            <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          </div>
          <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0C231D]">How did you hear about RUNA?</label>
            <select value={heard} onChange={(e) => setHeard(e.target.value as HeardAbout)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm bg-white outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15">
              {heardOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <Button size="lg" className="w-full" onClick={handleCustomerSubmit}>Create account</Button>
          <p className="text-center text-xs text-[#6B7280]">No verification needed now - verify later in Profile</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <button onClick={() => setRole(null)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#0C231D] -ml-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to choose role
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0C231D] text-white grid place-items-center"><Store className="w-4 h-4" /></div>
            <h2 className="text-sm font-bold text-[#0C231D]">Merchant details</h2>
          </div>
          <input placeholder="Business name (e.g. Mama T's Kitchen)" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          <input placeholder="Owner full name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          <div className="grid grid-cols-1 gap-3">
            <input placeholder="Phone / WhatsApp" value={bizPhone} onChange={(e) => setBizPhone(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
            <input placeholder="Business email" value={bizEmail} onChange={(e) => setBizEmail(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          </div>
          <input placeholder="Shop location (e.g. Activities, Block A)" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm bg-white outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15">
            <option value="">Store category</option>
            <option>Food & Meals</option>
            <option>Drinks & Snacks</option>
            <option>Groceries</option>
            <option>Printing & Cafe</option>
            <option>Stationery</option>
            <option>Laundry</option>
            <option>Other</option>
          </select>
          <input type="password" placeholder="Create password" value={bizPassword} onChange={(e) => setBizPassword(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0C231D]">How did you hear about RUNA?</label>
            <select value={bizHeard} onChange={(e) => setBizHeard(e.target.value as HeardAbout)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm bg-white outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15">
              {heardOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <Button size="lg" className="w-full bg-[#0C231D] hover:bg-[#12372d]" onClick={handleMerchantSubmit}>Submit merchant application</Button>
          <p className="text-center text-xs text-[#6B7280]">We’ll review and onboard your store - you’ll get a test order</p>
        </div>
      )}
    </div>
  );
}
