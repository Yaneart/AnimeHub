import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./use-debounce";
import {
  filtersReducer,
  initialAnimeFilters,
  type AnimeFilters,
} from "../../entities/anime/model/filters";

export function useAnimeFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, dispatch] = useReducer(
    filtersReducer,
    initialAnimeFilters,
    (initial) => ({
      ...initial,
      search: searchParams.get("q") ?? "",
      year: searchParams.get("year") ? Number(searchParams.get("year")) : null,
      minScore: searchParams.get("score")
        ? Number(searchParams.get("score"))
        : null,
      genres:
        searchParams.get("genres")?.split(",").map(Number).filter(Boolean) ??
        [],
      sfw: searchParams.get("sfw") === "1",
    })
  );

  const debouncedSearch = useDebounce(state.search, 500);
  const minEpisodes = useDebounce(state.minEpisodesInput, 500);
  const maxEpisodes = useDebounce(state.maxEpisodesInput, 500);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (state.search) params.q = state.search;
    if (state.year) params.year = String(state.year);
    if (state.minScore) params.score = String(state.minScore);
    if (state.genres.length) params.genres = state.genres.join(",");
    if (state.sfw) params.sfw = "1";
    if (state.orderBy !== "score") params.orderBy = state.orderBy;
    if (state.sort !== "desc") params.sort = state.sort;
    if (state.status) params.status = state.status;
    if (state.type) params.type = state.type;

    setSearchParams(params, { replace: true });
  }, [state, setSearchParams]);

  const filters = {
    query: debouncedSearch.length > 2 ? debouncedSearch : undefined,
    year: state.year ?? undefined,
    minScore: state.minScore ?? undefined,
    genres: state.genres,
    orderBy: state.orderBy,
    sort: state.sort,
    status: state.status,
    type: state.type,
    minEpisodes: minEpisodes ? Number(minEpisodes) : undefined,
    maxEpisodes: maxEpisodes ? Number(maxEpisodes) : undefined,
    sfw: state.sfw,
  };

  return {
    state,
    filters,
    set: (payload: Partial<AnimeFilters>) => dispatch({ type: "SET", payload }),
    resetFilters: () => dispatch({ type: "RESET" }),
  };
}
