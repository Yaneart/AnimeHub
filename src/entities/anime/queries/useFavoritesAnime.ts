import { useQueries } from "@tanstack/react-query";
import { getAnimeById } from "../api/api";
import type { Anime } from "../types";
import { animeKeys } from "../model/anime.keys";

export function useFavoritesAnime(ids: number[]) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: animeKeys.byId(id),
      queryFn: () => getAnimeById(id),
      enabled: !!id,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const AnimeList: Anime[] = queries
    .map((q) => q.data?.data)
    .filter(Boolean) as Anime[];

  return { AnimeList, isLoading, isError };
}
