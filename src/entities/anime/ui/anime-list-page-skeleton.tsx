import { Skeleton } from "../../../shared/ui/skeleton/skeleton";
import { AnimeGridSkeleton } from "./anime-grid-skeleton";

export function AnimeListPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Skeleton className="mb-6 h-12 w-full rounded-xl" />

      <div className="mb-6 flex gap-2">
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>

      <AnimeGridSkeleton count={10} />
    </div>
  );
}
