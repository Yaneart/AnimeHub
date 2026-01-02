import { useMutation } from "@tanstack/react-query";
import { getRandomAnimeByFilter } from "../api/api";

export function useRandomAnimeByFilters(params: {
  year?: number;
  minScore?: number;
  query?: string;
  genres?: number[];
}) {

  return useMutation({
    mutationFn: () => getRandomAnimeByFilter(params),
  });
}
