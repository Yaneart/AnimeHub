import { Card } from "../../../shared/ui/card/card";
import { Skeleton } from "../../../shared/ui/skeleton/skeleton";

export function AnimeCardSkeleton() {
  return (
    <Card>
      <div className="flex gap-4">
        <Skeleton width={80} height={110} />

        <div className="flex-1 space-y-2">
          <Skeleton height={18} />
          <Skeleton width={60} />
          <Skeleton width={40} />
        </div>
      </div>
    </Card>
  );
}
