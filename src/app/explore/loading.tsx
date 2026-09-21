import { Skeleton, ProductCardSkeleton, StoreCardSkeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-12 w-full rounded-2xl" />
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-8 w-20 rounded-full" />)}
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-24" />
        <StoreCardSkeleton />
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-3">
          <Skeleton className="h-4 w-32 mb-3" />
          <div className="flex gap-2">
            <ProductCardSkeleton /><ProductCardSkeleton />
          </div>
        </div>
        <StoreCardSkeleton />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
