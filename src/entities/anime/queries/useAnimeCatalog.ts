import { useInfiniteQuery } from "@tanstack/react-query";
import type { AnimeFilters } from "../model/filters";
import { getAnimeList } from "../api/api";
import { animeKeys } from "../model/anime.keys";

export function useAnimeCatalog(filters: AnimeFilters) {
  const stableGenres = { ...filters, genres: filters.genres?.slice().sort()};

  return useInfiniteQuery({
    queryKey: animeKeys.catalog(stableGenres),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getAnimeList({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });
}
