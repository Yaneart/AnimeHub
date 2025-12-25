import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { getAnimeById, getAnimeList, searchAnime } from "./api";
import type { Anime } from "./types";

export function useAnimeCatalog(params: {
  query?: string;
  year?: number;
  minScore?: number;
}) {
  return useInfiniteQuery({
    queryKey: ["anime", "catalog", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getAnimeList({
        page: pageParam,
        query: params.query,
        year: params.year,
        minScore: params.minScore,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });
}

export function useAnimeById(id: number) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnimeById(id),
    enabled: !!id,
  });
}

export function useFavoritesAnime(ids: number[]) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["anime", id],
      queryFn: () => getAnimeById(id),
      enabled: !!id,
    })),
  });

  const isloading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const AnimeList: Anime[] = queries
    .map((q) => q.data?.data)
    .filter(Boolean) as Anime[];

  return { AnimeList, isloading, isError };
}
