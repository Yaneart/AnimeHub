import { useState } from "react";
import { Button } from "../../shared/button/button";
import { useAnimeGenres } from "../../entities/anime/queries/useAnimeGenres";
import type { AnimeFilters } from "../../entities/anime/model/filters";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  state: AnimeFilters;
  set: (payload: Partial<AnimeFilters>) => void;
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
  state,
  set,
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
        placeholder={`🔍 ${t("search")}`}
        value={state.search}
        onChange={(e) => set({ search: e.target.value })}
      />

      <div className="flex flex-wrap items-center gap-3">
        <select
          className={field}
          value={state.year ?? ""}
          onChange={(e) =>
            set({ year: e.target.value ? Number(e.target.value) : null })
          }
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
          value={state.minScore ?? ""}
          onChange={(e) =>
            set({ minScore: e.target.value ? Number(e.target.value) : null })
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
          value={state.status ?? ""}
          onChange={(e) =>
            set({ status: (e.target.value as any) || undefined })
          }
        >
          <option value="">{t("status")}</option>
          <option value="airing">{t("out now")}</option>
          <option value="complete">{t("completed")}</option>
          <option value="upcoming">{t("announcement")}</option>
        </select>

        <select
          className={field}
          value={state.type ?? ""}
          onChange={(e) => set({ type: (e.target.value as any) || undefined })}
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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-black/60">
          <div className="mb-4">
            <div className="mb-2 text-sm text-slate-400">{t("genres")}</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {genresData?.data.map((g) => {
                const active = state.genres.includes(g.mal_id);
                return (
                  <button
                    key={g.mal_id}
                    onClick={() =>
                      set({
                        genres: active
                          ? state.genres.filter((id) => id !== g.mal_id)
                          : [...state.genres, g.mal_id],
                      })
                    }
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      active
                        ? "bg-cyan-400 text-black"
                        : "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-300"
                    }`}
                  >
                    {g.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm">
            {t("episodes")}:
            <input
              className={`${field} w-20`}
              placeholder="от"
              value={state.minEpisodesInput}
              onChange={(e) => set({ minEpisodesInput: e.target.value })}
            />
            <input
              className={`${field} w-20`}
              placeholder="до"
              value={state.maxEpisodesInput}
              onChange={(e) => set({ maxEpisodesInput: e.target.value })}
            />
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <select
              className={field}
              value={state.orderBy}
              onChange={(e) => set({ orderBy: e.target.value as any })}
            >
              <option value="score">Сортировка</option>
              <option value="start_date">Год</option>
              <option value="popularity">Популярность</option>
            </select>

            <select
              className={field}
              value={state.sort}
              onChange={(e) => set({ sort: e.target.value as any })}
            >
              <option value="desc">↓</option>
              <option value="asc">↑</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={state.sfw}
                onChange={(e) => set({ sfw: e.target.checked })}
              />
              SFW
            </label>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <Button variant="ghost" onClick={resetFilters}>
              {t("reset")}
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
