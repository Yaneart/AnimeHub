import { useState } from "react";
import { Button } from "../../shared/button/button";
import { useAnimeGenres } from "../../entities/anime/queries/useAnimeGenres";
import type { AnimeStatus, AnimeType } from "../../shared/types/anime-filters";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

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

const field = `
  appearance-none
  rounded-xl
  bg-slate-100 dark:bg-slate-900
  text-slate-900 dark:text-slate-100
  px-5.5 py-2 text-sm
  outline-none transition
  focus:ring-2 focus:ring-red-400/40 
`;

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
  const [open, setOpen] = useState(false);
  const { data: genresData } = useAnimeGenres();
  const { t } = useTranslation();

  return (
    <section className="mb-10 space-y-6">
      <input
        className="w-full rounded-2xl bg-white/5 px-6 py-4 text-base backdrop-blur outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400"
        placeholder={`🔍${t("search")}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap items-center gap-3">
        <select
          className={field}
          value={year ?? ""}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : null)
          }
          onWheel={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.blur();
            }
          }}
        >
          <option value="">{t("year")}</option>
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
          <option value="">{t("rating")}</option>
          {[9, 8, 7, 6, 5].map((s) => (
            <option key={s} value={s}>
              {t("from")} {s}
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
          <option value="">{t("status")}</option>
          <option value="airing">{t("out now")}</option>
          <option value="complete">{t("completed")}</option>
          <option value="upcoming">{t("announcement")}</option>
        </select>

        <select
          className={field}
          value={type ?? ""}
          onChange={(e) => setType((e.target.value as AnimeType) || undefined)}
        >
          <option value="">{t("type")}</option>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
          <option value="special">Special</option>
          <option value="ona">ONA</option>
        </select>

        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => setOpen((v) => !v)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters")}
        </Button>
      </div>

      {open && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-black/60 dark:shadow-black/40">
          <div className="mb-4">
            <div className="mb-2 text-sm text-slate-400">Жанры</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {genresData?.data.map((g) => {
                const active = genres.includes(g.mal_id);
                return (
                  <button
                    key={g.mal_id}
                    onClick={() =>
                      setGenres(
                        active
                          ? genres.filter((id) => id !== g.mal_id)
                          : [...genres, g.mal_id]
                      )
                    }
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      active
                        ? "bg-cyan-400 text-black"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                    } `}
                  >
                    {g.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm">
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

          <div className="mb-4 flex flex-wrap items-center gap-3">
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
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <Button variant="ghost" onClick={resetFilters}>
              Сброс
            </Button>

            <Button onClick={onRandom} disabled={isRandomPending}>
              🎯 Random
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
