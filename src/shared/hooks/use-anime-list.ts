import { useInfiniteScroll } from "./use-infinite-scroll";
import { useAnimeCatalog } from "../../entities/anime/hooks";

interface Options {
  enabled?: boolean;
}

export function useAnimeList(
  filters: {
    query?: string;
    year?: number;
    minScore?: number;
    genres?: number[];
  },
  options?: Options
) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAnimeCatalog(filters);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    enabled: options?.enabled ?? true,
  });

  const isEmpty = data?.pages.every(
    (page) => page.data.length === 0
  );

  return {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    isEmpty,
  };
}
