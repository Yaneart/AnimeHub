import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./use-debounce";

export function useAnimeFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("q") ?? "";
  const initialYear = searchParams.get("year");
  const initialMinScore = searchParams.get("score");
  const initialGenres =
    searchParams.get("genres")?.split(",").map(Number).filter(Boolean) ?? [];

  const [search, setSearch] = useState(initialSearch);
  const [year, setYear] = useState<number | null>(
    initialYear ? Number(initialYear) : null
  );
  const [minScore, setMinScore] = useState<number | null>(
    initialMinScore ? Number(initialMinScore) : null
  );
  const [genres, setGenres] = useState<number[]>(initialGenres);

  const [orderBy, setOrderBy] = useState<
    "score" | "start_date" | "popularity" | undefined
  >("score");

  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.q = search;
    if (year) params.year = String(year);
    if (minScore) params.score = String(minScore);
    if (genres.length) params.genres = genres.join(",");

    setSearchParams(params);
  }, [search, year, minScore, genres, setSearchParams]);

  const filters = {
    query: debouncedSearch.length > 2 ? debouncedSearch : undefined,
    year: year ?? undefined,
    minScore: minScore ?? undefined,
    genres,
    orderBy,
    sort,
  };

  const resetFilters = () => {
    setSearch("");
    setYear(null);
    setMinScore(null);
    setGenres([]);
    setOrderBy("score");
    setSort("desc")
  };

  return {
    search,
    year,
    minScore,
    genres,
    orderBy,
    sort,

    setSearch,
    setYear,
    setMinScore,
    setGenres,
    setOrderBy,
    setSort,

    resetFilters,
    filters,
  };
}
