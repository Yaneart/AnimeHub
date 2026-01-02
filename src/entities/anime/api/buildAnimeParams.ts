import type {
  AnimeStatus,
  AnimeType,
} from "../../../shared/types/anime-filters";
import type { OrderBy, Sort } from "../model/filters";

export interface AnimeQueryParams {
  page: number;
  query?: string;
  year?: number;
  minScore?: number;
  genres?: number[];
  orderBy?: OrderBy;
  sort?: Sort;
  status?: AnimeStatus;
  type?: AnimeType;
  minEpisodes?: number;
  maxEpisodes?: number;
  sfw?: boolean;
}

export function buildAnimeParams(params: AnimeQueryParams) {
  const search = new URLSearchParams({
    page: String(params.page),
  });

  if (params.query) search.set("q", params.query);
  if (params.year) {
    search.set("start_date", `${params.year}-01-01`);
    search.set("end_date", `${params.year}-12-31`);
  }
  if (params.minScore) search.set("min_score", String(params.minScore));
  if (params.genres?.length) search.set("genres", params.genres.join(","));
  if (params.orderBy) search.set("order_by", params.orderBy);
  if (params.sort) search.set("sort", params.sort);
  if (params.status) search.set("status", params.status);
  if (params.type) search.set("type", params.type);
  if (params.minEpisodes)
    search.set("min_episodes", String(params.minEpisodes));
  if (params.maxEpisodes)
    search.set("max_episodes", String(params.maxEpisodes));
  if (params.sfw) search.set("sfw", "true");

  return search.toString();
}
