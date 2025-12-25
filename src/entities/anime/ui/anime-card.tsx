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
        style={{ cursor: "pointer", display: "flex", gap: 12 }}
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
          style={{ objectFit: "cover", borderRadius: 4 }}
        />

        <div>
          <h3 style={{ margin: "0 0 4px" }}>{anime.title}</h3>
          <div>⭐ {anime.score ?? "—"}</div>
          <div>{anime.year ?? "—"}</div>
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
