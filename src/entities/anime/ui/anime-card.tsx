import { type Anime } from "../types";
import { Card } from "../../../shared/ui/card/card";
import { useFavoritesStore } from "../../../shared/store/favorites.store";
import toast from "react-hot-toast";

interface Props {
  anime: Anime;
  onClick?: () => void;
}

export function AnimeCard({ anime, onClick }: Props) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(anime.mal_id));

  return (
    <Card>
      <div
        onClick={onClick}
        className="animate-fade-scale relative flex w-full gap-4 text-left focus-visible:outline-none"
      >
        <img
          loading="lazy"
          src={
            anime.images.webp?.large_image_url ??
            anime.images.jpg.large_image_url
          }
          alt={anime.title}
          className="h-28 w-20 shrink-0 rounded-md object-cover"
        />

        <div className="flex flex-1 flex-col gap-1">
          <h3 className="line-clamp-2 text-base font-semibold">
            {anime.title}
          </h3>

          <div className="text-sm text-slate-600 dark:text-slate-400">
            ⭐ {anime.score ?? "—"}
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-500">
            {anime.year ?? "—"}
          </div>
        </div>

        <button
          type="button"
          aria-label="toggle favorite"
          onClick={(e) => {
            e.stopPropagation();

            const added = !isFavorite;
            toggleFavorite(anime.mal_id);

            toast.dismiss("favorite");

            toast.success(
              added ? "⭐ Добавлено в избранное" : "☆ Удалено из избранного",
              {
                id: "favorite",
              }
            );
          }}
          className={`absolute top-10 right-2 text-xl transition-transform hover:scale-125 ${isFavorite ? "animate-pop" : ""} `}
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>
    </Card>
  );
}
