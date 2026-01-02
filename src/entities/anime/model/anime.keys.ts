import type { AnimeFilters } from "./filters";

export const animeKeys = {
  all: ["anime"] as const,

  catalog: (filters: AnimeFilters) =>
    [...animeKeys.all, "catalog", filters] as const,

  byId: (id: number) => [...animeKeys.all, "detail", id] as const,

  genres: () => [...animeKeys.all, "genres"] as const,

  pictures: (id: number) => [...animeKeys.byId(id), "pictures"] as const,

  recommendations: (id: number) =>
    [...animeKeys.byId(id), "recommendations"] as const,

  season: (year: number, season: string) =>
    [...animeKeys.all, "season", year, season] as const,
};
