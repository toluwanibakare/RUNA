"use client";
import { notifications } from "@/data/mock";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/ui/BackButton";

export default function NotificationsPage() {
  return (
    <div className="space-y-4">
      <BackButton fallback="/" label="Home" />
      <h1 className="text-xl font-bold text-[#0C231D]">Notifications</h1>
      <div className="grid gap-3">
        {notifications.map((n) => (
          <div key={n.id} className={cn("bg-white border rounded-2xl p-4 flex gap-3", n.isRead ? "border-[#E5E7EB]" : "border-[#1EB95E]/30 bg-[#1EB95E]/5")}>
            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.isRead ? "bg-[#E5E7EB]" : "bg-[#1EB95E]"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0C231D]">{n.title}</p>
              <p className="text-sm text-[#6B7280]">{n.body}</p>
              <p className="text-xs text-[#6B7280] mt-1">{n.time}</p>
            </div>
          </div>
        ))}
        {notifications.length === 0 && <p className="text-sm text-[#6B7280] text-center py-12">No notifications yet</p>}
      </div>
    </div>
  );
}
