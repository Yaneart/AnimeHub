import { useQuery } from "@tanstack/react-query";
import { getAnimeGenres } from "../api/api";
import { animeKeys } from "../model/anime.keys";

export function useAnimeGenres() {
  return useQuery({
    queryKey: animeKeys.genres(),
    queryFn: getAnimeGenres,
    staleTime: 1000 * 60 * 60,
  });
}