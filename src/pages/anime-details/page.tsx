import { useParams, useNavigate } from "react-router-dom";
import { useAnimeById } from "../../entities/anime/hooks";
import { Skeleton } from "../../shared/ui/skeleton/skeleton";
import { useFavorites } from "../../shared/hooks/use-favorites";

export function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const animeId = Number(id);
  const { data, isLoading, isError } = useAnimeById(animeId);

  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div style={{ padding: 16 }}>
        <Skeleton width={200} height={300} borderRadius={8} />
        <div style={{ marginTop: 16 }}>
          <Skeleton width={300} height={28} />
        </div>
        <div style={{ marginTop: 8 }}>
          <Skeleton width={120} />
        </div>
      </div>
    );
  }
  if (isError || !data) return <div>Error 😢</div>;

  const anime = data.data;

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          width={200}
          style={{ borderRadius: 8 }}
        />

        <div>
          <h1>{anime.title}</h1>
          <div>⭐ {anime.score ?? "—"}</div>
          <div>Year: {anime.year ?? "—"}</div>
        </div>
      </div>

      <button onClick={() => toggleFavorite(anime.mal_id)}>
        {isFavorite(anime.mal_id)
          ? "⭐ Remove from favorites"
          : "☆ Add to favorites"}
      </button>
    </div>
  );
}
