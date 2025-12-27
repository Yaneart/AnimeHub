import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAnimeById, useAnimePictures } from "../../entities/anime/hooks";

import { Skeleton } from "../../shared/ui/skeleton/skeleton";
import { Button } from "../../shared/button/button";
import { useFavoritesStore } from "../../shared/store/favorites.store";

import { TrailerModal } from "../../entities/anime/ui/TrailerModal";
import { AnimePictures } from "../../entities/anime/ui/AnimePictures";

export function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const animeId = Number(id);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data, isLoading, isError } = useAnimeById(animeId);
  const { data: picturesData, isLoading: isPicturesLoading } =
    useAnimePictures(animeId);

  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (isLoading) {
    return (
      <div className="space-y-6 p-16">
        <Skeleton width={200} height={300} borderRadius={8} />
        <Skeleton width={300} height={28} />
        <Skeleton width={120} />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="p-16">Error 😢</div>;
  }

  const anime = data.data;
  const isFav = favorites.includes(anime.mal_id);
  const trailerUrl = anime.trailer?.embed_url;

  const pictures = picturesData?.data ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-10 p-6 text-slate-900 dark:text-slate-100">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        ← Назад
      </Button>

      <div className="flex flex-col gap-8 md:flex-row">
        <img
          src={
            anime.images.webp?.large_image_url ??
            anime.images.jpg.large_image_url
          }
          alt={anime.title}
          className="w-48 rounded-lg"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{anime.title}</h1>

          <div>⭐ {anime.score ?? "—"}</div>
          <div>Год: {anime.year ?? "—"}</div>

          <Button onClick={() => toggleFavorite(anime.mal_id)}>
            {isFav ? "⭐ Удалить из избранных" : "☆ Добавить в избранные"}
          </Button>

          {trailerUrl && (
            <Button onClick={() => setIsTrailerOpen(true)}>
              ▶️ Смотреть трейлер
            </Button>
          )}

          {!trailerUrl && (
            <div className="text-slate-500">Трейлер недоступен 😢</div>
          )}
        </div>
      </div>

      {trailerUrl && (
        <TrailerModal
          open={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          embedUrl={trailerUrl}
          title={anime.title}
        />
      )}

      {pictures.length > 0 && <AnimePictures pictures={pictures.slice(0, 8)} />}
    </div>
  );
}
