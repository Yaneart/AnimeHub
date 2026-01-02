import type {
  AnimeStatus,
  AnimeType,
} from "../../../../shared/types/anime-filters";

export type OrderBy = "score" | "start_date" | "popularity";
export type Sort = "asc" | "desc";

export interface AnimeFilters {
  search: string;
  year: number | null;
  minScore: number | null;
  genres: number[];

  orderBy: OrderBy;
  sort: Sort;
  status?: AnimeStatus;
  type?: AnimeType;

  minEpisodesInput: string;
  maxEpisodesInput: string;
  sfw: boolean;
}
