import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { getAnimeById, getAnimeList, searchAnime } from "./api";
import type { Anime } from "./types";

export function useAnimeList(enabled = true) {
  return useInfiniteQuery({
    queryKey: ["anime", "list"],
    initialPageParam: 1,
    enabled,
    queryFn: ({ pageParam = 1 }) => getAnimeList(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
  });
}

export function useAnimeById(id: number) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnimeById(id),
    enabled: !!id,
  });
}

export function useAnimeSearch(query: string) {
  return useInfiniteQuery({
    queryKey: ["anime", "search", query],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => searchAnime(query, pageParam),
    enabled: query.length > 2,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
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
