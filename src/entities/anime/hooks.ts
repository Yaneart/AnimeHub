import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAnimeById, getAnimeList, searchAnime } from "./api";

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
