import { useQuery } from "@tanstack/react-query";
import { getAnimeById } from "../api/api";
import { animeKeys } from "../model/anime.keys";

export function useAnimeById(id: number) {
  return useQuery({
    queryKey: animeKeys.byId(id),
    queryFn: () => getAnimeById(id),
    enabled: Number.isFinite(id),
  });
}
