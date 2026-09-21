import { Skeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-40 w-full rounded-3xl" />
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
        <Skeleton className="h-12 w-full rounded-none" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-3 p-4">
            <Skeleton className="w-9 h-9 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
