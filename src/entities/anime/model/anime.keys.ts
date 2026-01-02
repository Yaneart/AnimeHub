import type { AnimeQueryParams } from "../api/buildAnimeParams";

export const animeKeys = {
  all: ["anime"] as const,

  catalog: (params: Omit<AnimeQueryParams, "page">) =>
    [...animeKeys.all, "catalog", params] as const,

  byId: (id: number) => [...animeKeys.all, "byId", id] as const,

  genres: () => [...animeKeys.all, "genres"] as const,

  pictures: (id: number) => [...animeKeys.byId(id), "pictures"] as const,

  recommendations: (id: number) =>
    [...animeKeys.byId(id), "recommendations"] as const,

  season: (year: number, season: string) =>
    [...animeKeys.all, "season", year, season] as const,
};
