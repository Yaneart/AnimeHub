import { type AnimeFilters } from "../model/filters";

export function buildAnimeParams(
  filters: AnimeFilters & { page?: number }
) {
  const params = new URLSearchParams();

  if (filters.page !== undefined) {
    params.set("page", String(filters.page));
  }

  if (filters.query) {
    params.set("q", filters.query);
  }

  if (filters.year) {
    params.set("start_date", `${filters.year}-01-01`);
    params.set("end_date", `${filters.year}-12-31`);
  }

  if (filters.minScore) {
    params.set("min_score", String(filters.minScore));
  }

  if (filters.genres?.length) {
    params.set("genres", filters.genres.join(","));
  }

  return params.toString();
}
