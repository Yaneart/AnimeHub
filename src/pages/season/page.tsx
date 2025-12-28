import { useState } from "react";
import { useSeasonAnime } from "../../entities/anime/hooks";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { saveScrollPosition } from "../../shared/lib/scroll";
import { useNavigate } from "react-router-dom";

const SEASONS = [
  { value: "spring", label: "🌸 Spring" },
  { value: "summer", label: "☀️ Summer" },
  { value: "fall", label: "🍁 Fall" },
  { value: "winter", label: "❄️ Winter" },
] as const;

type Season = (typeof SEASONS)[number]["value"];

export function SeasonPage() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const [year, setYear] = useState(currentYear);
  const [season, setSeason] = useState<Season>("spring");

  const { data, isLoading, isError } = useSeasonAnime(year, season);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6">Ошибка загрузки 😢</div>;
  }

  const list = data?.data ?? [];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Аниме сезона</h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value as Season)}
          className="rounded-lg border px-3 py-2 dark:bg-slate-900"
        >
          {SEASONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-lg border px-3 py-2 dark:bg-slate-900"
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
        <div className="text-slate-500">Ничего не найдено 😢</div>
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
