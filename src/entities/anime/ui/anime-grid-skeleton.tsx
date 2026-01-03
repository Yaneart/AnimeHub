import { AnimeCardSkeleton } from "./anime-card-skeleton";

type Props = {
  count?: number;
};

export function AnimeGridSkeleton({ count = 10 }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  );
}
