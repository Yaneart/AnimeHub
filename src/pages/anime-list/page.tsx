import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useDebounce } from "../../shared/hooks/use-debounce";
import { useInfiniteScroll } from "../../shared/hooks/use-infinite-scroll";
import {
  restoreScrollPosition,
  saveScrollPosition,
} from "../../shared/lib/scroll";
import { useFavoritesStore } from "../../shared/store/favorites.store";

import {
  useAnimeCatalog,
  useAnimeGenres,
  useRandomAnimeByFilters,
} from "../../entities/anime/hooks";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { AnimeCardSkeleton } from "../../entities/anime/ui/anime-card-skeleton";
import { Button } from "../../shared/button/button";

export function AnimeListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("q") ?? "";
  const initialYear = searchParams.get("year");
  const initialMinScore = searchParams.get("score");

  const [search, setSearch] = useState(initialSearch);

  const [isGenresOpen, setIsGenresOpen] = useState(false);

  const [year, setYear] = useState<number | null>(
    initialYear ? Number(initialYear) : null
  );
  const [minScore, setMinScore] = useState<number | null>(
    initialMinScore ? Number(initialMinScore) : null
  );

  const initialGenres =
    searchParams.get("genres")?.split(",").map(Number).filter(Boolean) ?? [];
  const [genres, setGenres] = useState<number[]>(initialGenres);

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const debouncedSearch = useDebounce(search);

  const filters = {
    query: debouncedSearch.length > 2 ? debouncedSearch : undefined,
    year: year ?? undefined,
    minScore: minScore ?? undefined,
    genres,
  };

  useEffect(() => {
    restoreScrollPosition();
  }, []);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (year) params.year = String(year);
    if (minScore) params.score = String(minScore);
    if (genres.length) params.genres = genres.join(",");

    setSearchParams(params);
  }, [search, year, minScore, setSearchParams, genres]);

  const favorites = useFavoritesStore((s) => s.favorites);
  const { data: genresData } = useAnimeGenres();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAnimeCatalog(filters);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    enabled: !showOnlyFavorites,
  });

  const { mutate: randomByFilters, isPending: isRandomPending } =
    useRandomAnimeByFilters(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <AnimeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-slate-700 dark:text-slate-300">Error 😢</div>
    );
  }

  const isEmpty = data?.pages.every((page) => page.data.length === 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 text-slate-900 dark:text-slate-100">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Anime list
      </h1>

      <input
        className="mb-4 w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:ring-2 focus:ring-slate-400 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anime..."
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
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
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
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

        <div className="relative">
          <Button
            type="button"
            onClick={() => setIsGenresOpen((v) => !v)}
            className="px-3"
          >
            Жанры {genres.length > 0 && `(${genres.length})`}
          </Button>

          {isGenresOpen && (
            <div className="absolute z-10 mt-2 max-h-64 w-64 overflow-auto rounded-lg border bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              {genresData?.data.map((genre) => (
                <label
                  key={genre.mal_id}
                  className="flex cursor-pointer items-center gap-2 py-1 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={genres.includes(genre.mal_id)}
                    onChange={() =>
                      setGenres((prev) =>
                        prev.includes(genre.mal_id)
                          ? prev.filter((id) => id !== genre.mal_id)
                          : [...prev, genre.mal_id]
                      )
                    }
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          onClick={() => {
            setSearch("");
            setYear(null);
            setMinScore(null);
            setGenres([]);
          }}
        >
          Сброс
        </Button>

        <Button onClick={() => randomByFilters()} disabled={isRandomPending}>
          🎯 Random по фильтрам
        </Button>
      </div>

      {isEmpty && (
        <div className="text-slate-500 dark:text-slate-400">
          Ничего не найдено 😢
        </div>
      )}

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
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
          <div>
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
