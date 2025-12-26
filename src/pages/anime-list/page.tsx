import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { useEffect, useState } from "react";
import { useDebounce } from "../../shared/hooks/use-debounce";
import { AnimeCardSkeleton } from "../../entities/anime/ui/anime-card-skeleton";
import { useInfiniteScroll } from "../../shared/hooks/use-infinite-scroll";
import { useFavoritesStore } from "../../shared/store/favorites.store";
import { useAnimeCatalog } from "../../entities/anime/hooks";
import {
  restoreScrollPosition,
  saveScrollPosition,
} from "../../shared/lib/scroll";

export function AnimeListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("q") || "";
  const initialYear = searchParams.get("year");
  const initialMinScore = searchParams.get("minScore");

  const [search, setSearch] = useState(initialSearch);

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [year, setYear] = useState<number | null>(
    initialYear ? Number(initialYear) : null
  );
  const [minScore, setMinScore] = useState<number | null>(
    initialMinScore ? Number(initialMinScore) : null
  );

  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    restoreScrollPosition();
  }, []);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (year) params.year = String(year);
    if (minScore) params.score = String(minScore);

    setSearchParams(params);
  }, [search, year, minScore, setSearchParams]);

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

  const isEmpty = data?.pages[0].data.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">Anime list</h1>
      <input
        className="mb-4 w-full max-w-md rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-slate-400 focus:outline-none"
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

      <div className="mb-6 flex flex-wrap gap-3">
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 focus:ring-2 focus:ring-slate-400 focus:outline-none"
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
          className="inline-flex items-center rounded-lg border border-transparent bg-white px-4 py-2 text-slate-500 transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 active:scale-95"
          onClick={() => {
            setSearch("");
            setYear(null);
            setMinScore(null);
          }}
        >
          Сброс
        </button>
      </div>

      {isEmpty && <div>Ничего не найдено 😢</div>}

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
                onClick={() => {
                  saveScrollPosition();
                  navigate(`/anime/${anime.mal_id}`);
                }}
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
