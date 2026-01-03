import { useNavigate } from "react-router-dom";
import { AnimeCard } from "../../entities/anime/ui/anime-card";
import { AnimeCardSkeleton } from "../../entities/anime/ui/anime-card-skeleton";
import { saveScrollPosition } from "../../shared/lib/scroll";
import { motion } from "framer-motion";
import type { RefObject } from "react";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../../shared/ui/empty-state";

interface Props {
  data:
    | {
        pages: {
          data: any[];
        }[];
      }
    | undefined;

  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
}

export function AnimeGrid({
  data,
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
}: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const animeList =
    data?.pages.flatMap((page) =>
      Array.isArray(page.data) ? page.data : []
    ) ?? [];

  if (!isFetchingNextPage && animeList.length === 0) {
    return (
      <EmptyState
        title={t("noResultsTitle")}
        description={t("noResultsDescription")}
      />
    );
  }

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {animeList.map((anime, index) => (
          <AnimeCard
            anime={anime}
            key={`${anime.mal_id}-${index}`}
            onClick={() => {
              saveScrollPosition();
              navigate(`/anime/${anime.mal_id}`);
            }}
          />
        ))}
      </motion.div>

      {hasNextPage &&
        (isFetchingNextPage ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div ref={loadMoreRef} style={{ height: 1 }} />
        ))}
    </>
  );
}
