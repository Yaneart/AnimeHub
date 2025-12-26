import { useNavigate } from "react-router-dom";
import { useFavoritesAnime } from "../../entities/anime/hooks";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { useFavoritesStore } from "../../shared/store/favorites.store";

export function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);

  const { isError, isloading, AnimeList } = useFavoritesAnime(favorites);

  const navigate = useNavigate();

  if (!favorites || favorites.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h1>⭐ Favorites</h1>
        <div>У тебя пока нет избранных аниме</div>
      </div>
    );
  }

  if (isloading) return <div>Loading...</div>;
  if (isError) return <div>Error 😢</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>⭐ Favorites</h1>
      {AnimeList.map((anime) => (
        <AnimeCard
          key={anime.mal_id}
          anime={anime}
          onClick={() => navigate(`/anime/${anime.mal_id}`)}
        />
      ))}
    </div>
  );
}
