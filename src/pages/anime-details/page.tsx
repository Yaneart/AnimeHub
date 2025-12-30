import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  useAnimeById,
  useAnimePictures,
  useAnimeRecommendations,
} from "../../entities/anime/hooks";

import { Skeleton } from "../../shared/ui/skeleton/skeleton";
import { Button } from "../../shared/button/button";
import { useFavoritesStore } from "../../shared/store/favorites.store";

import { TrailerModal } from "../../entities/anime/ui/TrailerModal";
import { AnimePictures } from "../../entities/anime/ui/AnimePictures";

import toast from "react-hot-toast";
import { AnimeRecommendations } from "../../entities/anime/ui/AnimeRecommendations";

export function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const animeId = Number(id);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data: recData, isLoading: isRecLoading } =
    useAnimeRecommendations(animeId);

  const recommendations = recData?.data.map((r) => r.entry) ?? [];

  const { data, isLoading, isError } = useAnimeById(animeId);
  const { data: picturesData, isLoading: isPicturesLoading } =
    useAnimePictures(animeId);

  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (isLoading) {
    return (
      <div className="space-y-6 p-16">
        <Skeleton />
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
      <div className="animate-hero-fade relative -mx-6">
        <div
          className="h-[420px] w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              anime.images.webp?.large_image_url ??
              anime.images.jpg.large_image_url
            })`,
          }}
        />

        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-end px-6 pb-10">
            <div className="animate-hero-content max-w-2xl text-white">
              <Button
                variant="ghost"
                className="transition hover:bg-white/10"
                onClick={() => navigate(-1)}
              >
                ← Назад
              </Button>

              <h1 className="text-4xl leading-tight font-bold">
                {anime.title}
              </h1>

              <div className="mt-3 flex items-center gap-4 text-sm text-slate-300">
                <span>⭐ {anime.score ?? "—"}</span>
                <span>📅 {anime.year ?? "—"}</span>
              </div>

              {anime.synopsis && (
                <p className="mt-4 line-clamp-3 text-sm text-slate-300">
                  {anime.synopsis}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {anime.genres.map((g) => (
                  <span
                    key={g.mal_id}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  className="transition-transform hover:-translate-y-0.5"
                  onClick={() => {
                    const added = !isFav;
                    toggleFavorite(anime.mal_id);

                    toast.dismiss("favorite");
                    toast.success(
                      added
                        ? "⭐ Добавлено в избранное"
                        : "☆ Удалено из избранного",
                      { id: "favorite" }
                    );
                  }}
                >
                  {isFav ? "⭐ В избранном" : "☆ В избранное"}
                </Button>

                {trailerUrl && (
                  <Button
                    className="transition-transform hover:-translate-y-0.5"
                    onClick={() => setIsTrailerOpen(true)}
                  >
                    ▶ Смотреть трейлер
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#0b0e14] to-transparent" />
      </div>

      {trailerUrl && (
        <TrailerModal
          open={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          embedUrl={trailerUrl}
          title={anime.title}
        />
      )}

      {isPicturesLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}
      {!isPicturesLoading && pictures.length > 0 && (
        <AnimePictures pictures={pictures.slice(0, 8)} />
      )}

      {!isRecLoading && recommendations.length > 0 && (
        <AnimeRecommendations list={recommendations.slice(0, 10)} />
      )}
    </div>
  );
}
