import { useInfiniteQuery } from "@tanstack/react-query";
import type { AnimeFilters } from "../model/filters/filters";
import { getAnimeList } from "../api/api";
import { animeKeys } from "../model/anime.keys";
import { normalizeAnimeFilters } from "../lib/normalizeAnimeFilters";

export function useAnimeCatalog(filters: AnimeFilters) {
  const normalizedFilters = normalizeAnimeFilters(filters);

  const stableFilters = {
    ...normalizedFilters,
    genres: normalizedFilters.genres?.slice().sort(),
  };

  return useInfiniteQuery({
    queryKey: animeKeys.catalog(stableFilters),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getAnimeList({
        ...stableFilters,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage?.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });
}
