import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAnimeById, getAnimeList } from './api';

export function useAnimeList() {
  return useInfiniteQuery({
    queryKey: ['anime', 'list'],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getAnimeList(pageParam),
    getNextPageParam: lastPage => {
      return lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
  });
}

export function useAnimeById(id: number) {
  return useQuery({
    queryKey: ['anime', id],
    queryFn: () => getAnimeById(id),
    enabled: !!id,
  });
}
