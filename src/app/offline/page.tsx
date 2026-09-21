import { BackButton } from "@/components/ui/BackButton";
export default function OfflinePage() {
  return (
    <div className="space-y-4">
      <BackButton fallback="/" label="Home" />
      <h1 className="text-xl font-bold text-[#0C231D]">Connectivity</h1>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1">
        <p className="text-sm font-semibold text-amber-800">You&apos;re offline</p>
        <p className="text-xs text-amber-700">Some features may be unavailable. Connect to internet or Activities LAN.</p>
      </div>
      <div className="bg-[#0C231D] rounded-2xl p-4 text-white space-y-1">
        <p className="text-sm font-semibold">Activities Local Network • Connected</p>
        <p className="text-xs text-white/70">You can browse and order even when mobile internet is unavailable. Verified students only.</p>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-2">
        <h2 className="text-sm font-semibold">Activities Local - locked</h2>
        <p className="text-xs text-[#6B7280]">Student verification required to unlock local Activities access. Verify in Profile → Verification.</p>
      </div>
    </div>
  );
}
