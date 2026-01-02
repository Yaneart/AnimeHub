import { useInfiniteScroll } from "./use-infinite-scroll";
import { useAnimeCatalog } from "../../entities/anime/queries/useAnimeCatalog";
import type { AnimeFilters } from "../../entities/anime/model/filters";

export function useAnimeList(filters: AnimeFilters) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAnimeCatalog(filters);

  const loadMoreRef = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    isFetching: isFetchingNextPage,
  });

  const isEmpty = Boolean(
    data &&
    data.pages.length > 0 &&
    data.pages.every(
      (page) => Array.isArray(page.data) && page.data.length === 0
    )
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
