import { useNavigate } from "react-router-dom";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { AnimeCardSkeleton } from "../../entities/anime/ui/anime-card-skeleton";
import { saveScrollPosition } from "../../shared/lib/scroll";

interface Props {
  data:
    | {
        pages: {
          data: any[];
        }[];
      }
    | undefined;

  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  loadMoreRef: (node: HTMLDivElement | null) => void;
}

export function AnimeGrid({
  data,
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
        {data?.pages.map((page) =>
          page.data.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              onClick={() => {
                saveScrollPosition();
                navigate(`/anime/${anime.mal_id}`);
              }}
            />
          ))
        )}
      </ul>

      {hasNextPage &&
        (isFetchingNextPage ? (
          <div className="mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div ref={loadMoreRef} style={{ height: 1 }} />
        ))}
    </>
  );
}
