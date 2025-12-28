import { useState } from "react";
import { Button } from "../../shared/button/button";
import { useAnimeGenres } from "../../entities/anime/hooks";
import type { AnimeStatus, AnimeType } from "../../shared/types/anime-filters";

export type OrderBy = "score" | "start_date" | "popularity";
export type Sort = "asc" | "desc";

interface Props {
  search: string;
  year: number | null;
  minScore: number | null;
  genres: number[];
  orderBy?: OrderBy;
  sort?: Sort;
  status?: AnimeStatus;
  type?: AnimeType;
  minEpisodesInput: string;
  maxEpisodesInput: string;
  sfw: boolean;

  setSearch: (v: string) => void;
  setYear: (v: number | null) => void;
  setMinScore: (v: number | null) => void;
  setGenres: (v: number[]) => void;
  setOrderBy: (v: OrderBy) => void;
  setSort: (v: Sort) => void;
  setStatus: (v: AnimeStatus | undefined) => void;
  setType: (v: AnimeType | undefined) => void;
  setMinEpisodesInput: (v: string) => void;
  setMaxEpisodesInput: (v: string) => void;
  setSfw: (v: boolean) => void;

  resetFilters: () => void;
  onRandom: () => void;
  isRandomPending: boolean;
}

const field =
  "rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600";

export function AnimeFilters({
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
  onRandom,
  isRandomPending,
}: Props) {
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const { data: genresData } = useAnimeGenres();

  return (
    <section className="mb-8 space-y-6">
      <div>
        <input
          className="w-full max-w-3xl rounded-2xl border px-5 py-4 text-base"
          placeholder="🔍 Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          className={field}
          value={year ?? ""}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Год</option>
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
          className={field}
          value={minScore ?? ""}
          onChange={(e) =>
            setMinScore(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Рейтинг</option>
          {[9, 8, 7, 6, 5].map((s) => (
            <option key={s} value={s}>
              от {s}
            </option>
          ))}
        </select>

        <select
          className={field}
          value={status ?? ""}
          onChange={(e) =>
            setStatus((e.target.value as AnimeStatus) || undefined)
          }
        >
          <option value="">Статус</option>
          <option value="airing">Сейчас выходит</option>
          <option value="complete">Завершено</option>
          <option value="upcoming">Анонс</option>
        </select>

        <select
          className={field}
          value={type ?? ""}
          onChange={(e) => setType((e.target.value as AnimeType) || undefined)}
        >
          <option value="">Тип</option>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
          <option value="special">Special</option>
          <option value="ona">ONA</option>
        </select>

        <div className="relative">
          <Button type="button" onClick={() => setIsGenresOpen((v) => !v)}>
            Жанры {genres.length > 0 && `(${genres.length})`}
          </Button>

          {isGenresOpen && (
            <div className="absolute z-20 mt-2 max-h-72 w-64 overflow-auto rounded-xl border bg-white p-3 shadow-xl dark:bg-slate-900">
              {genresData?.data.map((genre) => (
                <label
                  key={genre.mal_id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
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
      </div>

      <details className="group">
        <summary className="cursor-pointer text-sm text-slate-500">
          ⚙ Дополнительные фильтры
        </summary>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            Эпизоды:
            <input
              className={`${field} w-20`}
              placeholder="от"
              value={minEpisodesInput}
              onChange={(e) => setMinEpisodesInput(e.target.value)}
            />
            <input
              className={`${field} w-20`}
              placeholder="до"
              value={maxEpisodesInput}
              onChange={(e) => setMaxEpisodesInput(e.target.value)}
            />
          </div>

          <select
            className={field}
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as OrderBy)}
          >
            <option value="score">Сортировка</option>
            <option value="start_date">Год</option>
            <option value="popularity">Популярность</option>
          </select>

          <select
            className={field}
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            <option value="desc">↓</option>
            <option value="asc">↑</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={sfw}
              onChange={(e) => setSfw(e.target.checked)}
            />
            SFW
          </label>
        </div>
      </details>

      <div className="flex items-center justify-between border-t pt-4">
        <Button variant="ghost" onClick={resetFilters}>
          Сброс
        </Button>

        <Button onClick={onRandom} disabled={isRandomPending}>
          🎯 Random
        </Button>
      </div>
    </section>
  );
}
