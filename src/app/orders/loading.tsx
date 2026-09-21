import { Skeleton, OrderCardSkeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-24" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      <div className="space-y-3">
        <OrderCardSkeleton /><OrderCardSkeleton /><OrderCardSkeleton />
      </div>
    </div>
  );
}
