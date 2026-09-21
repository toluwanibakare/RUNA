import { cn } from "@/lib/utils";

export function StatusBadge({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "orange" | "gray" | "red" }) {
  const tones = {
    green: "bg-[#1EB95E]/10 text-[#1B9A4D] border-[#1EB95E]/20",
    orange: "bg-amber-50 text-amber-700 border-amber-200",
    gray: "bg-[#F9FAFB] text-[#6B7280] border-[#E5E7EB]",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border", tones[tone])}>{children}</span>;
}

export function VerificationBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-flex items-center gap-1.5 bg-[#1EB95E]/10 text-[#1B9A4D] border border-[#1EB95E]/20 px-3 py-1 rounded-full text-xs font-semibold">✓ Verified Student</span>
  ) : (
    <span className="inline-flex items-center gap-1.5 bg-[#F9FAFB] text-[#6B7280] border border-[#E5E7EB] px-3 py-1 rounded-full text-xs font-semibold">Not Verified</span>
  );
}
