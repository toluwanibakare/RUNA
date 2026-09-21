import { Skeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-48" />
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-7 h-7 rounded-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
      <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
  );
}
