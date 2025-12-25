import { useNavigate } from "react-router-dom";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { useState } from "react";
import { useDebounce } from "../../shared/hooks/use-debounce";
import { AnimeCardSkeleton } from "../../entities/anime/ui/anime-card-skeleton";
import { useInfiniteScroll } from "../../shared/hooks/use-infinite-scroll";
import { useFavoritesStore } from "../../shared/store/favorites.store";
import { useAnimeCatalog } from "../../entities/anime/hooks";

export function AnimeListPage() {
  const [search, setSearch] = useState("");

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [year, setYear] = useState<number | null>(null);
  const [minScore, setMinScore] = useState<number | null>(null);

  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search);

  const query = useAnimeCatalog({
    query: debouncedSearch.length > 2 ? debouncedSearch : undefined,
    year: year ?? undefined,
    minScore: minScore ?? undefined,
  });

  const favorites = useFavoritesStore((s) => s.favorites);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = query;

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    enabled: !showOnlyFavorites,
  });

  if (isLoading) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Anime list</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 12,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <div>Error 😢</div>;

  return (
    <div>
      <h1>Anime list</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anime..."
        style={{
          padding: 8,
          width: "100%",
          maxWidth: 400,
          marginBottom: 16,
        }}
      />

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <select
          value={year ?? ""}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Все годы</option>
          {Array.from({ length: 30 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      <select
        value={minScore ?? ""}
        onChange={(e) =>
          setMinScore(e.target.value ? Number(e.target.value) : null)
        }
      >
        <option value="">Любой рейтинг</option>
        {[9, 8, 7, 6, 5].map((score) => (
          <option key={score} value={score}>
            от {score}
          </option>
        ))}
      </select>

      <button
        onClick={() => setShowOnlyFavorites((prev) => !prev)}
        style={{
          marginBottom: 16,
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        {showOnlyFavorites ? "Показать все" : "⭐ Показать избранное"}
      </button>

      <ul>
        {data?.pages.map((page) =>
          page.data
            .filter((anime) =>
              showOnlyFavorites ? favorites.includes(anime.mal_id) : true
            )
            .map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
              />
            ))
        )}
      </ul>

      {!showOnlyFavorites &&
        hasNextPage &&
        (isFetchingNextPage ? (
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 12,
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div ref={loadMoreRef} style={{ height: 1 }} />
        ))}
    </div>
  );
}
