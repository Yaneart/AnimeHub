import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./use-debounce";
import type { AnimeStatus, AnimeType } from "../types/anime-filters";
import type { OrderBy, Sort } from "../../pages/anime-filters/AnimeFilters";

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

  const [orderBy, setOrderBy] = useState<OrderBy>(
    (searchParams.get("orderBy") as OrderBy) ?? "score"
  );
  const [sort, setSort] = useState<Sort>(
    (searchParams.get("sort") as Sort) ?? "desc"
  );

  const [status, setStatus] = useState<AnimeStatus | undefined>(
    (searchParams.get("status") as AnimeStatus) || undefined
  );
  const [type, setType] = useState<AnimeType | undefined>(
    (searchParams.get("type") as AnimeType) || undefined
  );
  const [minEpisodesInput, setMinEpisodesInput] = useState("");
  const [maxEpisodesInput, setMaxEpisodesInput] = useState("");
  const [sfw, setSfw] = useState(searchParams.get("sfw") === "1");

  const debouncedMinEpisodes = useDebounce(minEpisodesInput, 500);
  const debouncedMaxEpisodes = useDebounce(maxEpisodesInput, 500);

  const minEpisodes = debouncedMinEpisodes
    ? Number(debouncedMinEpisodes)
    : undefined;

  const maxEpisodes = debouncedMaxEpisodes
    ? Number(debouncedMaxEpisodes)
    : undefined;

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.q = search;
    if (year) params.year = String(year);
    if (minScore) params.score = String(minScore);
    if (genres.length) params.genres = genres.join(",");
    if (sfw) params.sfw = "1";
    if (orderBy !== "score") params.orderBy = orderBy;
    if (sort !== "desc") params.sort = sort;
    if (status) params.status = status;
    if (type) params.type = type;

    setSearchParams(params, { replace: true });
  }, [
    search,
    year,
    minScore,
    genres,
    setSearchParams,
    sfw,
    orderBy,
    sort,
    status,
    type,
  ]);

  const filters = {
    query: debouncedSearch.length > 2 ? debouncedSearch : undefined,
    year: year ?? undefined,
    minScore: minScore ?? undefined,
    genres,
    orderBy,
    sort,
    status,
    type,
    minEpisodes,
    maxEpisodes,
    sfw,
  };

  const resetFilters = () => {
    setSearch("");
    setYear(null);
    setMinScore(null);
    setGenres([]);
    setOrderBy("score");
    setSort("desc");
    setStatus(undefined);
    setType(undefined);
    setMinEpisodesInput("");
    setMaxEpisodesInput("");
    setSfw(true);
  
    setSearchParams({}, { replace: true });
  };

  return {
    search,
    year,
    minScore,
    genres,
    orderBy,
    sort,
    status,
    type,
    minEpisodesInput,
    maxEpisodesInput,
    sfw,

    setSearch,
    setYear,
    setMinScore,
    setGenres,
    setOrderBy,
    setSort,
    setStatus,
    setType,
    setMinEpisodesInput,
    setMaxEpisodesInput,
    setSfw,

    resetFilters,
    filters,
  };
}
