import { useNavigate } from 'react-router-dom';
import { useAnimeList } from '../../entities/anime/hooks';
import { Loader } from '../../shared/ui/loader/loader';
import { AnimeCard } from '../../entities/anime/ui/anime-card';

export function AnimeListPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAnimeList();

  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error 😢</div>;

  return (
    <div>
      <h1>Anime list</h1>

      <ul>
        {data?.pages.map(page =>
          page.data.map(anime => (
            <AnimeCard key={anime.mal_id} anime={anime} onClick={() => navigate(`/anime/${anime.mal_id}`)}/>
          ))
        )}
      </ul>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
