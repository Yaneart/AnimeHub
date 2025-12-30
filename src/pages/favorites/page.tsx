import { useNavigate } from "react-router-dom";
import { useFavoritesAnime } from "../../entities/anime/hooks";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { useFavoritesStore } from "../../shared/store/favorites.store";

export function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);

  const { isError, isLoading, AnimeList } = useFavoritesAnime(favorites);

  const navigate = useNavigate();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <h1>⭐ Favorites</h1>
        <div>У тебя пока нет избранных аниме</div>
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error 😢</div>;

  return (
    <div className="min-h-screen w-full p-4">
      <h1 className="mb-6 text-2xl font-semibold">⭐ Favorites</h1>

      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {AnimeList.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onClick={() => navigate(`/anime/${anime.mal_id}`)}
          />
        ))}
      </div>
    </div>
  );
}
