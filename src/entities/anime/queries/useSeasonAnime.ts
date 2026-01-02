import { useQuery } from "@tanstack/react-query";
import { getSeasonAnime } from "../api/api";
import { animeKeys } from "../model/anime.keys";

export function useSeasonAnime(
  year: number,
  season: "spring" | "summer" | "fall" | "winter"
) {
  return useQuery({
    queryKey: animeKeys.season(year,season),
    queryFn: () => getSeasonAnime(year, season),
    enabled: !!year && !!season,
    staleTime: 1000 * 60 * 60,
  });
}
