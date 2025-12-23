import { useParams, useNavigate } from 'react-router-dom';
import { useAnimeById } from '../../entities/anime/hooks';
import { Loader } from '../../shared/ui/loader/loader';

export function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const animeId = Number(id);
  const { data, isLoading, isError } = useAnimeById(animeId);

  if (isLoading) return <Loader />;
  if (isError || !data) return <div>Error 😢</div>;

  const anime = data.data;

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          width={200}
          style={{ borderRadius: 8 }}
        />

        <div>
          <h1>{anime.title}</h1>
          <div>⭐ {anime.score ?? '—'}</div>
          <div>Year: {anime.year ?? '—'}</div>
        </div>
      </div>
    </div>
  );
}
