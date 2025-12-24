import { http } from "../../shared/api/http";
import { type Anime } from "./types";

interface AnimeListResponse {
  data: Anime[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
  };
}

export function getAnimeList(page = 1) {
  return http<AnimeListResponse>(`/anime?page=${page}`);
}

export function getAnimeById(id: number) {
  return http<{ data: Anime }>(`/anime/${id}`);
}

export function searchAnime(query: string, page = 1) {
  return http<AnimeListResponse>(
    `/anime?q=${encodeURIComponent(query)}&page=${page}`
  );
}
