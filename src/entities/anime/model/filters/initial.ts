import type { AnimeFilters } from "./filters";

export const initialAnimeFilters: AnimeFilters = {
  search: "",
  year: null,
  minScore: null,
  genres: [],

  orderBy: "score",
  sort: "desc",
  status: undefined,
  type: undefined,

  minEpisodesInput: "",
  maxEpisodesInput: "",
  sfw: true,
};
