import { useAnimeRating } from "../model/hook";
import type { RatingStarsProps } from "../model/types";

export function RatingStars({ animeId }: RatingStarsProps) {
  const { rating, updateRating } = useAnimeRating(animeId);

  return (
    <div className="mt-4 flex items-center gap-1">
      {Array.from({ length: 10 }).map((_, i) => {
        const isActive = rating !== null && rating > i;

        return (
          <button
            key={i}
            type="button"
            onClick={() => updateRating(i + 1)}
            className={[
              "text-2xl transition-colors",
              "hover:scale-110 hover:text-yellow-400",
              isActive
                ? "text-yellow-400"
                : "text-slate-400 dark:text-slate-600",
            ].join(" ")}
            aria-label={`Rate ${i + 1}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
