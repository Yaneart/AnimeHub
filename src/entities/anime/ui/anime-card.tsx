import { type Anime } from "../types";
import { Card } from "../../../shared/ui/card/card";

interface Props {
  anime: Anime;
  onClick?: () => void;
}

export function AnimeCard({ anime, onClick }: Props) {
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
    </Card>
  );
}
