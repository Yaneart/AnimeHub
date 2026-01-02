import type { AnimeFilters } from "../model/filters/filters";
import type { AnimeQueryParams } from "../api/buildAnimeParams";

export function normalizeAnimeFilters(
  filters: AnimeFilters
): Omit<AnimeQueryParams, "page"> {
  return {
    query: filters.search || undefined,
    year: filters.year ?? undefined,
    minScore: filters.minScore ?? undefined,
    genres: filters.genres.length ? filters.genres : undefined,
    orderBy: filters.orderBy,
    sort: filters.sort,
    status: filters.status,
    type: filters.type,
    minEpisodes: filters.minEpisodesInput
      ? Number(filters.minEpisodesInput)
      : undefined,
    maxEpisodes: filters.maxEpisodesInput
      ? Number(filters.maxEpisodesInput)
      : undefined,
    sfw: filters.sfw,
  };
}
