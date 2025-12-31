import { useState } from "react";
import { useSeasonAnime } from "../../entities/anime/hooks";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { saveScrollPosition } from "../../shared/lib/scroll";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SEASONS = [
  { value: "spring", label: "🌸" },
  { value: "summer", label: "☀️" },
  { value: "fall", label: "🍁" },
  { value: "winter", label: "❄️" },
] as const;

type Season = (typeof SEASONS)[number]["value"];

const field = `
  appearance-none
  rounded-xl
  bg-slate-100 dark:bg-slate-900
  text-slate-900 dark:text-slate-100
  px-5.5 py-2 text-sm
  outline-none transition
  focus:ring-2 focus:ring-red-400/40 
`;

export function SeasonPage() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [year, setYear] = useState(currentYear);
  const [season, setSeason] = useState<Season>("spring");

  const { data, isLoading, isError } = useSeasonAnime(year, season);

  if (isLoading) {
    return <div className="p-6">{t("loading")}</div>;
  }

  if (isError) {
    return <div className="p-6">{t("loading error")}😢</div>;
  }

  const list = data?.data ?? [];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">{t("anime sesons")}</h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value as Season)}
          className={field}
        >
          {SEASONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label} {t(`season.${s.value}`)}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className={field}
        >
          {Array.from({ length: 30 }, (_, i) => {
            const y = currentYear - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {list.length === 0 && (
        <div className="text-slate-500">{t("nothing found")}😢</div>
      )}

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
        {list.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onClick={() => {
              saveScrollPosition();
              navigate(`/anime/${anime.mal_id}`);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
