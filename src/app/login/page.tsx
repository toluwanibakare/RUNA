"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DEMO_EMAIL = "demo@runa.com";
const DEMO_PASSWORD = "runa1234";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [pw, setPw] = useState(DEMO_PASSWORD);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !pw) return toast.error("Enter demo credentials");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 700);
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPw(DEMO_PASSWORD);
    toast.info("Demo credentials filled");
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center max-w-[420px] mx-auto space-y-6 py-8">
      <div className="text-center space-y-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="RUNA" className="h-14 md:h-16 w-auto object-contain mx-auto" />
        <h1 className="text-2xl font-bold tracking-tight text-[#0C231D]">Welcome back</h1>
        <p className="text-sm text-[#6B7280]">Log in to continue ordering from LASUSTECH</p>
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#0C231D]">Demo credentials</p>
          <p className="text-xs text-[#6B7280]">{DEMO_EMAIL} • {DEMO_PASSWORD}</p>
        </div>
        <button onClick={fillDemo} className="text-xs font-semibold bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-full hover:bg-white active:scale-95 transition">
          Use demo
        </button>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="space-y-3">
          <label className="text-xs font-semibold text-[#0C231D]">Email or phone</label>
          <input
            placeholder="demo@runa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15"
          />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-semibold text-[#0C231D]">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-[#6B7280]">
            <input type="checkbox" defaultChecked className="rounded border-[#E5E7EB] accent-[#1EB95E]" /> Remember me
          </label>
          <Link href="#" className="text-xs font-semibold text-[#1EB95E]">
            Forgot password?
          </Link>
        </div>
        <Button size="lg" className="w-full" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
        <p className="text-center text-sm text-[#6B7280]">
          No account? <Link href="/signup" className="font-semibold text-[#0C231D]">Create account</Link>
        </p>
      </div>
    </div>
  );
}
