export type AnimeStatus = "airing" | "complete" | "upcoming";
export type AnimeType = "tv" | "movie" | "ova" | "special" | "ona";

export interface AdvancedAnimeFilters {
  status?: AnimeStatus;
  type?: AnimeType;
  minEpisodes?: number;
  maxEpisodes?: number;
  sfw?: boolean;
}
