import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="space-y-4 -mx-4">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="px-4 flex gap-2">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-8 w-20 rounded-full" />)}
      </div>
      <div className="px-4 grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
