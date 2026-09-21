import { Skeleton, ProductCardSkeleton, StoreCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      {/* Search */}
      <Skeleton className="h-12 w-full rounded-2xl" />
      {/* Activities banner */}
      <Skeleton className="h-16 w-full rounded-2xl" />
      {/* Categories */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="w-14 h-14 rounded-2xl" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>
      {/* Promo */}
      <Skeleton className="h-32 w-full rounded-3xl" />
      {/* Flash Sales */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-3">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
      {/* Stores */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <StoreCardSkeleton />
        <StoreCardSkeleton />
      </div>
    </div>
  );
}
