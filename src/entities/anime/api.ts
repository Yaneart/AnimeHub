import { http } from "../../shared/api/http";
import { type Anime, type GetAnimeListParams } from "./types";

interface AnimeListResponse {
  data: Anime[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
  };
}

export function getAnimeList({
  page,
  query,
  year,
  minScore,
}: GetAnimeListParams) {
  const params = new URLSearchParams({
    page: String(page),
  });

  if (query) params.set("q", query);

  if (year !== undefined) {
    params.set("start_date", `${year}-01-01`);
    params.set("end_date", `${year}-12-31`);
  }

  if (minScore !== undefined) {
    params.set("min_score", String(minScore));
  }

  return http<AnimeListResponse>(`/anime?${params.toString()}`);
}

export function getAnimeById(id: number) {
  return http<{ data: Anime }>(`/anime/${id}`);
}

export function searchAnime(query: string, page = 1) {
  return http<AnimeListResponse>(
    `/anime?q=${encodeURIComponent(query)}&page=${page}`
  );
}
