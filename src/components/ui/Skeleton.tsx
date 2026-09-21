import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-[#E5E7EB] rounded-xl", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden min-w-[160px]">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </div>
  );
}
