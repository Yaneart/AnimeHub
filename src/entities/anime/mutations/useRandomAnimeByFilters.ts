import { useMutation } from "@tanstack/react-query";
import { getRandomAnimeByFilter } from "../api/api";
import type { AnimeQueryParams } from "../api/buildAnimeParams";

export function useRandomAnimeByFilters(
  params: Omit<AnimeQueryParams, "page">
) {
  return useMutation({
    mutationFn: () => getRandomAnimeByFilter(params),
  });
}
