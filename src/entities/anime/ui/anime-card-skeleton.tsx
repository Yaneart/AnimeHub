import { Card } from "../../../shared/ui/card/card";
import { Skeleton } from "../../../shared/ui/skeleton/skeleton";

export function AnimeCardSkeleton() {
  return (
    <Card>
      <div style={{ display: 'flex', gap: 12 }}>
        <Skeleton width={80} height={110} borderRadius={4} />

        <div style={{ flex: 1 }}>
          <Skeleton height={18} />
          <div style={{ marginTop: 8 }}>
            <Skeleton width={60} />
          </div>
          <div style={{ marginTop: 6 }}>
            <Skeleton width={40} />
          </div>
        </div>
      </div>
    </Card>
  );
}