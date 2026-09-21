import { Skeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-24 w-full rounded-3xl" />
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden divide-y">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="w-4 h-4" />
          </div>
        ))}
      </div>
      <Skeleton className="h-20 w-full rounded-2xl" />
    </div>
  );
}
