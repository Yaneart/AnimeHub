import { useEffect } from "react";
import { useAnimeFilters } from "../../shared/hooks/use-anime-filters";
import { restoreScrollPosition } from "../../shared/lib/scroll";

import { useRandomAnimeByFilters } from "../../entities/anime/mutations/useRandomAnimeByFilters";
import { AnimeCardSkeleton } from "../../entities/anime/ui/anime-card-skeleton";
import { useAnimeList } from "../../shared/hooks/use-anime-list";
import { AnimeFilters } from "../anime-filters/AnimeFilters";
import { AnimeGrid } from "../anime-grid/AnimeGrid";
import { ErrorState } from "../../shared/ui/error-state/ErrorState";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AnimeListPage() {
  useEffect(() => {
    restoreScrollPosition();
  }, []);

  const {
    search,
    year,
    minScore,
    genres,
    orderBy,
    sort,
    status,
    type,
    minEpisodesInput,
    maxEpisodesInput,
    sfw,

    setSearch,
    setYear,
    setMinScore,
    setGenres,
    setOrderBy,
    setSort,
    setStatus,
    setType,
    setMinEpisodesInput,
    setMaxEpisodesInput,
    setSfw,

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

  const { mutate, isPending } = useRandomAnimeByFilters(filters);

  const navigate = useNavigate();

  const handleClick = () => {
    toast.loading("Ищем...", { id: "random" });

    mutate(undefined, {
      onSuccess: (response) => {
        toast.success("Вот ваше случайное аниме по фильтрам!", {
          id: "random-anime-filters",
        });
        navigate(`/anime/${response.mal_id}`);
      },
      onError: () => {
        toast.error("Не удалось загрузить случайное аниме по фильтрам.", {
          id: "random-anime-filters",
        });
      },
    });
  };

  if (isError) {
    return <ErrorState message="Не удалось загрузить данные 😢" />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 text-slate-900 dark:text-slate-100">
      <AnimeFilters
        search={search}
        year={year}
        minScore={minScore}
        genres={genres}
        orderBy={orderBy}
        sort={sort}
        status={status}
        type={type}
        minEpisodesInput={minEpisodesInput}
        maxEpisodesInput={maxEpisodesInput}
        sfw={sfw}
        setSearch={setSearch}
        setYear={setYear}
        setMinScore={setMinScore}
        setGenres={setGenres}
        setOrderBy={setOrderBy}
        setSort={setSort}
        setStatus={setStatus}
        setType={setType}
        setMinEpisodesInput={setMinEpisodesInput}
        setMaxEpisodesInput={setMaxEpisodesInput}
        setSfw={setSfw}
        resetFilters={resetFilters}
        onRandom={handleClick}
        isRandomPending={isPending}
      />

      {!isLoading && isEmpty && (
        <div className="text-slate-500 dark:text-slate-400">
          Ничего не найдено 😢
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <AnimeGrid
          data={data}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
        />
      )}
    </div>
  );
}
