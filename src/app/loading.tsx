import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-12 w-full rounded-2xl" />
      <div className="flex gap-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-14 h-14 rounded-2xl shrink-0" />
        ))}
      </div>
      <div className="flex gap-3 overflow-hidden">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
