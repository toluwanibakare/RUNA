import { Skeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-32 w-full rounded-3xl" />
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
      </div>
      <Skeleton className="h-32 w-full rounded-2xl" />
    </div>
  );
}
