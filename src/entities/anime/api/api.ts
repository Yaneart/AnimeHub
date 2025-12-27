import { http } from "../../../shared/api/http";
import { type Anime } from "../types";
import { type AnimeFilters } from "../model/filters";
import { buildAnimeParams } from "./buildAnimeParams";

interface AnimeListResponse {
  data: Anime[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
  };
}

export function getAnimeList(filters: AnimeFilters & { page: number }) {
  const query = buildAnimeParams(filters);
  return http<AnimeListResponse>(`/anime?${query}`);
}

export function getAnimeById(id: number) {
  return http<{ data: Anime }>(`/anime/${id}`);
}

export function getRandomAnime() {
  return http<{ data: { mal_id: number } }>("/random/anime");
}

export async function getRandomAnimeByFilter(filters: AnimeFilters) {
  const page = Math.floor(Math.random() * 5) + 1;
  const query = buildAnimeParams({ ...filters, page });

  const response = await http<{ data: Anime[] }>(`/anime?${query}`);

  if (!response.data.length) {
    throw new Error("EMPTY_RESULT");
  }

  return response.data[Math.floor(Math.random() * response.data.length)];
}

export function getAnimeGenres() {
  return http<{
    data: { mal_id: number; name: string }[];
  }>("/genres/anime");
}

export function getAnimePictures(id: number) {
  return http<{
    data: {
      jpg: {
        image_url: string;
        large_image_url: string;
      };
      webp?: {
        image_url: string;
        large_image_url: string;
      };
    }[];
  }>(`/anime/${id}/pictures`);
}
