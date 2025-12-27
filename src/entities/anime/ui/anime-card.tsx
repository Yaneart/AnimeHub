import { type Anime } from "../types";
import { Card } from "../../../shared/ui/card/card";
import { useFavoritesStore } from "../../../shared/store/favorites.store";

interface Props {
  anime: Anime;
  onClick?: () => void;
}

export function AnimeCard({ anime, onClick }: Props) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  return (
    <Card>
      <div
        onClick={onClick}
        className="flex cursor-pointer gap-10"
      >
        <img
          loading="lazy"
          src={
            anime.images.webp?.large_image_url ??
            anime.images.jpg.large_image_url
          }
          alt={anime.title}
          width={80}
          height={110}
          className="h-28 w-20 shrink-0 rounded-md object-cover"
        />

        <div className="flex-1">
          <h3 className="mb-1 line-clamp-2 text-base font-semibold">
            {anime.title}
          </h3>
          <div className="text-sm text-slate-600">⭐ {anime.score ?? "—"}</div>
          <div className="text-sm text-slate-500">{anime.year ?? "—"}</div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(anime.mal_id);
        }}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 18,
        }}
      >
        {isFavorite(anime.mal_id) ? "⭐" : "☆"}
      </button>
    </Card>
  );
}
