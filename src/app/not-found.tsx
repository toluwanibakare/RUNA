import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-4">
      <h1 className="text-xl font-bold text-[#0C231D]">Not found</h1>
      <p className="text-sm text-[#6B7280]">This page doesn&apos;t exist.</p>
      <Link href="/" className="inline-flex bg-[#0C231D] text-white px-6 h-11 rounded-xl font-semibold items-center">Go home</Link>
    </div>
  );
}
