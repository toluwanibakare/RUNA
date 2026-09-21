"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-20 text-center space-y-4">
      <h1 className="text-xl font-bold text-[#0C231D]">Something went wrong.</h1>
      <p className="text-sm text-[#6B7280]">We couldn&apos;t load this right now.</p>
      <button onClick={reset} className="bg-[#1EB95E] text-white px-6 h-11 rounded-xl font-semibold hover:bg-[#1B9A4D]">Try again</button>
    </div>
  );
}
