import { useQuery } from "@tanstack/react-query";
import { getAnimeRecommendations } from "../api/api";
import { animeKeys } from "../model/anime.keys";

export function useAnimeRecommendations(id: number) {
  return useQuery({
    queryKey: animeKeys.recommendations(id),
    queryFn: () => getAnimeRecommendations(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}