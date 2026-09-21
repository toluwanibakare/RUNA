"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Bike, Store } from "lucide-react";

const steps = [
  { icon: Store, title: "Everything you need around campus.", desc: "Discover food, shops and services at LASUSTECH.", color: "bg-[#1EB95E]" },
  { icon: ShoppingBag, title: "Order without the long walk.", desc: "Get your order delivered around campus in minutes.", color: "bg-[#0C231D]" },
  { icon: Bike, title: "Earn while you move.", desc: "Verified students can become campus runners.", color: "bg-[#1B9A4D]" },
];

export default function OnboardingPage() {
  const [i, setI] = useState(0);
  const step = steps[i];
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-[420px] mx-auto text-center space-y-8 px-4">
      <div className={`w-24 h-24 rounded-3xl ${step.color} text-white grid place-items-center`}>
        <step.icon className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#0C231D] leading-tight">{step.title}</h1>
        <p className="text-sm text-[#6B7280]">{step.desc}</p>
      </div>
      <div className="flex gap-2">
        {steps.map((_, idx) => (
          <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-[#1EB95E]" : "w-1.5 bg-[#E5E7EB]"}`} />
        ))}
      </div>
      <div className="flex gap-3 w-full">
        {i < 2 ? (
          <>
            <Link href="/" className="flex-1"><Button variant="ghost" size="lg" className="w-full">Skip</Button></Link>
            <Button size="lg" className="flex-1" onClick={() => setI((v) => v + 1)}>Next</Button>
          </>
        ) : (
          <Link href="/" className="flex-1 block"><Button size="lg" className="w-full">Get Started</Button></Link>
        )}
      </div>
    </div>
  );
}
