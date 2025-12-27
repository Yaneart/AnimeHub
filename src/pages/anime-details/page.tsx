import { useParams, useNavigate } from "react-router-dom";
import { useAnimeById } from "../../entities/anime/hooks";
import { Skeleton } from "../../shared/ui/skeleton/skeleton";
import { useFavoritesStore } from "../../shared/store/favorites.store";

export function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const animeId = Number(id);
  const { data, isLoading, isError } = useAnimeById(animeId);

  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (isLoading) {
    return (
      <div className="p-16">
        <Skeleton width={200} height={300} borderRadius={8} />
        <div className="mt-16">
          <Skeleton width={300} height={28} />
        </div>
        <div className="mt-8">
          <Skeleton width={120} />
        </div>
      </div>
    );
  }

  if (isError || !data) return <div>Error 😢</div>;

  const anime = data.data;
  const isFav = favorites.includes(anime.mal_id);

  return (
    <>
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="flex p-16">
        <div className="my-8 flex gap-8">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            width={200}
            className="rounded-md"
          />

          <div className="flex flex-col gap-4">
            <h1>{anime.title}</h1>
            <div>⭐ {anime.score ?? "—"}</div>
            <div>Year: {anime.year ?? "—"}</div>
          </div>
        </div>

        <button onClick={() => toggleFavorite(anime.mal_id)}>
          {isFav ? "⭐ Удлаить из избранных" : "☆ Добавить в избранные"}
        </button>
      </div>
    </>
  );
}
