import { useQuery } from "@tanstack/react-query";
import { getAnimePictures } from "../api/api";
import { animeKeys } from "../model/anime.keys";

export function useAnimePictures(id: number) {
  return useQuery({
    queryKey: animeKeys.pictures(id),
    queryFn: () => getAnimePictures(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}
