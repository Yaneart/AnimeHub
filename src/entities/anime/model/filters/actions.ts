import type { AnimeFilters } from "./filters";

export type FiltersAction =
  | { type: "SET"; payload: Partial<AnimeFilters> }
  | { type: "RESET" };
