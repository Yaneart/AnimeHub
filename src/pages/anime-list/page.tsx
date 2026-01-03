import { useEffect } from "react";
import { useAnimeFilters } from "../../shared/hooks/use-anime-filters";
import { restoreScrollPosition } from "../../shared/lib/scroll";

import { useRandomAnimeByFilters } from "../../entities/anime/mutations/useRandomAnimeByFilters";
import { useAnimeList } from "../../shared/hooks/use-anime-list";
import { AnimeFilters } from "../anime-filters/AnimeFilters";
import { AnimeGrid } from "../anime-grid/AnimeGrid";
import { ErrorState } from "../../shared/ui/error-state/ErrorState";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AnimeListPageSkeleton } from "../../entities/anime/ui/anime-list-page-skeleton";
import { useTranslation } from "react-i18next";

export function AnimeListPage() {
  useEffect(() => {
    restoreScrollPosition();
  }, []);

  const { state, set, resetFilters, filters } = useAnimeFilters();
  const { t } = useTranslation();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    isEmpty,
  } = useAnimeList(state);

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
    return <ErrorState message={t("loading error")} />;
  }

  if (isLoading) {
    return <AnimeListPageSkeleton />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 text-slate-900 dark:text-slate-100">
      <AnimeFilters
        state={state}
        set={set}
        resetFilters={resetFilters}
        onRandom={handleClick}
        isRandomPending={isPending}
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
