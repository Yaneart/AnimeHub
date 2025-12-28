import { useNavigate } from "react-router-dom";
import { Card } from "../../../shared/ui/card/card";
import type { Anime } from "../types";

interface Props {
  list: Anime[];
}

export function AnimeRecommendations({ list }: Props) {
  const navigate = useNavigate();

  if (list.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-semibold">Рекомендации</h2>

      <ul className="no-scrollbar flex gap-4 overflow-x-auto overflow-y-hidden pb-2">
        {list.map((anime) => (
          <li key={anime.mal_id} className="w-40 shrink-0 snap-start">
            <Card className="h-full">
              <button
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
                className="flex w-full flex-col gap-2 text-left"
              >
                <div className="w-full overflow-hidden rounded-md bg-slate-800">
                  <img
                    src={
                      anime.images.webp?.large_image_url ??
                      anime.images.jpg.large_image_url
                    }
                    alt={anime.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="line-clamp-2 text-sm font-medium">
                  {anime.title}
                </div>
              </button>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
