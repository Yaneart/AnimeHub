import { useEffect } from "react";
import { useAnimeFilters } from "../../shared/hooks/use-anime-filters";
import { restoreScrollPosition } from "../../shared/lib/scroll";

import { useRandomAnimeByFilters } from "../../entities/anime/hooks";
import { AnimeCardSkeleton } from "../../entities/anime/ui/anime-card-skeleton";
import { useAnimeList } from "../../shared/hooks/use-anime-list";
import { AnimeFilters } from "../anime-filters/AnimeFilters";
import { AnimeGrid } from "../anime-grid/AnimeGrid";

export function AnimeListPage() {
  useEffect(() => {
    restoreScrollPosition();
  }, []);

  const {
    search,
    year,
    minScore,
    genres,

    setSearch,
    setYear,
    setMinScore,
    setGenres,

    resetFilters,
    filters,
  } = useAnimeFilters();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    isEmpty,
  } = useAnimeList(filters);

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 text-slate-900 dark:text-slate-100">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Anime list
      </h1>

      <AnimeFilters
        search={search}
        year={year}
        minScore={minScore}
        genres={genres}
        setSearch={setSearch}
        setYear={setYear}
        setMinScore={setMinScore}
        setGenres={setGenres}
        resetFilters={resetFilters}
        onRandom={randomByFilters}
        isRandomPending={isRandomPending}
      />

      {!isLoading && isEmpty && (
        <div className="text-slate-500 dark:text-slate-400">
          Ничего не найдено 😢
        </div>
      )}

      <AnimeGrid
        data={data}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={loadMoreRef}
      />
    </div>
  );
}
