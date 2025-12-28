import { useState } from "react";
import { Button } from "../../shared/button/button";
import { useAnimeGenres } from "../../entities/anime/hooks";

type OrderBy = "score" | "start_date" | "popularity";
type Sort = "asc" | "desc";

interface Props {
  search: string;
  year: number | null;
  minScore: number | null;
  genres: number[];
  orderBy?: OrderBy;
  sort?: Sort;

  setSearch: (v: string) => void;
  setYear: (v: number | null) => void;
  setMinScore: (v: number | null) => void;
  setGenres: (v: number[]) => void;
  setOrderBy: (v: OrderBy) => void;
  setSort: (v: Sort) => void;

  resetFilters: () => void;
  onRandom: () => void;
  isRandomPending: boolean;
}

export function AnimeFilters({
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
  onRandom,
  isRandomPending,
}: Props) {
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const { data: genresData } = useAnimeGenres();

  return (
    <>
      <input
        className="mb-4 w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:ring-2 focus:ring-slate-400 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anime..."
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          value={year ?? ""}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Все годы</option>
          {Array.from({ length: 30 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>

        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          value={minScore ?? ""}
          onChange={(e) =>
            setMinScore(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Любой рейтинг</option>
          {[9, 8, 7, 6, 5].map((score) => (
            <option key={score} value={score}>
              от {score}
            </option>
          ))}
        </select>

        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value as OrderBy)}
          className="rounded-lg border px-3 py-2 dark:bg-slate-900"
        >
          <option value="score">Рейтинг</option>
          <option value="start_date">Год</option>
          <option value="popularity">Популярность</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-lg border px-3 py-2 dark:bg-slate-900"
        >
          <option value="desc">↓ По убыванию</option>
          <option value="asc">↑ По возрастанию</option>
        </select>

        <div className="relative">
          <Button type="button" onClick={() => setIsGenresOpen((v) => !v)}>
            Жанры {genres.length > 0 && `(${genres.length})`}
          </Button>

          {isGenresOpen && (
            <div className="absolute z-10 mt-2 max-h-64 w-64 overflow-auto rounded-lg border bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              {genresData?.data.map((genre) => (
                <label
                  key={genre.mal_id}
                  className="flex cursor-pointer items-center gap-2 py-1 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={genres.includes(genre.mal_id)}
                    onChange={() =>
                      setGenres(
                        genres.includes(genre.mal_id)
                          ? genres.filter((id) => id !== genre.mal_id)
                          : [...genres, genre.mal_id]
                      )
                    }
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          )}
        </div>

        <Button variant="ghost" onClick={resetFilters}>
          Сброс
        </Button>

        <Button onClick={onRandom} disabled={isRandomPending}>
          🎯 Random по фильтрам
        </Button>
      </div>
    </>
  );
}
