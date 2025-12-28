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

  const [orderBy, setOrderBy] = useState<OrderBy>("score");
  const [sort, setSort] = useState<Sort>("desc");

  const [status, setStatus] = useState<AnimeStatus | undefined>();
  const [type, setType] = useState<AnimeType | undefined>();
  const [minEpisodesInput, setMinEpisodesInput] = useState("");
  const [maxEpisodesInput, setMaxEpisodesInput] = useState("");
  const [sfw, setSfw] = useState(true);

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

    setSearchParams(params);
  }, [search, year, minScore, genres, setSearchParams]);

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
