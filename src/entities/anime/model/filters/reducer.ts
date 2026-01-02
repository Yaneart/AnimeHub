import type { AnimeFilters } from "./filters";
import type { FiltersAction } from "./actions";
import { initialAnimeFilters } from "./initial";

export function filtersReducer(
  state: AnimeFilters,
  action: FiltersAction
): AnimeFilters {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };

    case "RESET":
      return initialAnimeFilters;

    default:
      return state;
  }
}
