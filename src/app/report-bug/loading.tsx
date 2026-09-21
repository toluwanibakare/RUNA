import { Skeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-32 w-full rounded-3xl" />
      <Skeleton className="h-80 w-full rounded-2xl" />
    </div>
  );
}
