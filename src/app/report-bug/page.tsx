"use client";
import { useState } from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Bug, Upload, Send } from "lucide-react";

export default function ReportBugPage() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = () => {
    if (!category || !description) {
      toast.error("Add category and description");
      return;
    }
    toast.success("Bug report sent - thank you for helping improve RUNA");
    setCategory("");
    setDescription("");
    setSteps("");
    setContact("");
  };

  return (
    <div className="space-y-5">
      <BackButton fallback="/profile" label="Profile" />

      <div className="bg-[#0C231D] rounded-3xl p-6 text-white space-y-2">
        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 grid place-items-center">
          <Bug className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Report a bug</h1>
        <p className="text-sm text-white/70 leading-relaxed">Found something broken? Tell us and we will fix it fast. Include what you saw and how to reproduce it.</p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#0C231D]">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm bg-white outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15">
            <option value="">Select category</option>
            <option value="ui">UI / Display</option>
            <option value="order">Order / Checkout</option>
            <option value="payment">Wallet / Payment</option>
            <option value="verification">Verification / Runner</option>
            <option value="performance">Performance / Offline</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#0C231D]">What happened?</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the bug clearly..." rows={3} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15 resize-none" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#0C231D]">Steps to reproduce <span className="text-[#6B7280] font-normal">(optional)</span></label>
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="1. Go to... 2. Tap... 3. See error..." rows={2} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15 resize-none" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#0C231D]">Screenshot <span className="text-[#6B7280] font-normal">(optional)</span></label>
          <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl h-20 flex flex-col items-center justify-center gap-1 text-xs text-[#6B7280] hover:border-[#1EB95E]/30 hover:bg-[#F9FAFB] transition">
            <Upload className="w-4 h-4" />
            Tap to upload screenshot
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#0C231D]">Contact (optional)</label>
          <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone or email for follow-up" className="w-full border border-[#E5E7EB] rounded-xl px-4 h-11 text-sm outline-none focus:border-[#1EB95E] focus:ring-2 focus:ring-[#1EB95E]/15" />
        </div>

        <Button size="lg" className="w-full" onClick={handleSubmit}>
          <Send className="w-4 h-4 mr-1" /> Submit report
        </Button>
        <p className="text-center text-xs text-[#6B7280]">We review every report - thanks for making RUNA better.</p>
      </div>
    </div>
  );
}
