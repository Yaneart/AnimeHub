import { useMutation } from "@tanstack/react-query";
import { getRandomAnime } from "../api/api";

export function useRandomAnime() {
  return useMutation({
    mutationFn: getRandomAnime,
  });
}
