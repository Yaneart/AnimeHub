import { useNavigate } from "react-router-dom";
import { useAnimeList, useAnimeSearch } from "../../entities/anime/hooks";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { useState } from "react";
import { useDebounce } from "../../shared/hooks/use-debounce";
import { AnimeCardSkeleton } from "../../entities/anime/ui/anime-card-skeleton";
import { useInfiniteScroll } from "../../shared/hooks/use-infinite-scroll";
import { useFavoritesStore } from "../../shared/store/favorites.store";

export function AnimeListPage() {
  const [search, setSearch] = useState("");

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search);

  const isSearching = debouncedSearch.length > 2;

  const listQuery = useAnimeList(!isSearching);
  const searchQuery = useAnimeSearch(debouncedSearch);

  const query = isSearching ? searchQuery : listQuery;

  const favorites = useFavoritesStore((s) => s.favorites);


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = query;

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    enabled: !showOnlyFavorites,
  });

  if (isLoading) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Anime list</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 12,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <div>Error 😢</div>;

  return (
    <div>
      <h1>Anime list</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anime..."
        style={{
          padding: 8,
          width: "100%",
          maxWidth: 400,
          marginBottom: 16,
        }}
      />

      <button
        onClick={() => setShowOnlyFavorites((prev) => !prev)}
        style={{
          marginBottom: 16,
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        {showOnlyFavorites ? "Показать все" : "⭐ Показать избранное"}
      </button>

      <ul>
        {data?.pages.map((page) =>
          page.data
            .filter((anime) =>
              showOnlyFavorites ? favorites.includes(anime.mal_id) : true
            )
            .map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
              />
            ))
        )}
      </ul>

      {!showOnlyFavorites &&
        hasNextPage &&
        (isFetchingNextPage ? (
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 12,
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div ref={loadMoreRef} style={{ height: 1 }} />
        ))}
    </div>
  );
}
