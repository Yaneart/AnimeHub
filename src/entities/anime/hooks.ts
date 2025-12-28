import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import {
  getAnimeById,
  getAnimeGenres,
  getAnimeList,
  getAnimePictures,
  getAnimeRecommendations,
  getRandomAnime,
  getRandomAnimeByFilter,
} from "./api/api";
import type { Anime } from "./types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AnimeFilters } from "./model/filters";

export function useAnimeCatalog(filters: AnimeFilters) {
  const stableGenres = filters.genres?.slice().sort();

  return useInfiniteQuery({
    queryKey: ["anime", "catalog", { ...filters, genres: stableGenres }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getAnimeList({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });
}

export function useAnimeById(id: number) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnimeById(id),
    enabled: !!id,
  });
}

export function useFavoritesAnime(ids: number[]) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["anime", id],
      queryFn: () => getAnimeById(id),
      enabled: !!id,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const AnimeList: Anime[] = queries
    .map((q) => q.data?.data)
    .filter(Boolean) as Anime[];

  return { AnimeList, isLoading, isError };
}

export function useRandomAnime() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: getRandomAnime,
    onMutate: () => {
      toast.loading("Ищем случайное аниме...", { id: "random-anime" });
    },
    onSuccess: (response) => {
      toast.success("Вот ваше случайное аниме!", { id: "random-anime" });
      const id = response.data.mal_id;
      navigate(`/anime/${id}`);
    },
    onError: () => {
      toast.error("Не удалось загрузить случайное аниме.", {
        id: "random-anime",
      });
    },
  });
}

export function useRandomAnimeByFilters(params: {
  year?: number;
  minScore?: number;
  query?: string;
  genres?: number[];
}) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => getRandomAnimeByFilter(params),
    onMutate: () => {
      toast.loading("Ищем случайное аниме по фильтрам...", {
        id: "random-anime-filters",
      });
    },
    onSuccess: (response) => {
      toast.success("Вот ваше случайное аниме по фильтрам!", {
        id: "random-anime-filters",
      });
      navigate(`/anime/${response.mal_id}`);
    },
    onError: () => {
      toast.error("Не удалось загрузить случайное аниме по фильтрам.", {
        id: "random-anime-filters",
      });
    },
  });
}

export function useAnimeGenres() {
  return useQuery({
    queryKey: ["anime-genres"],
    queryFn: getAnimeGenres,
    staleTime: 1000 * 60 * 60,
  });
}

export function useAnimePictures(id: number) {
  return useQuery({
    queryKey: ["anime", id, "pictures"],
    queryFn: () => getAnimePictures(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

export function useAnimeRecommendations(id: number) {
  return useQuery({
    queryKey: ["anime", id, "recommendations"],
    queryFn: () => getAnimeRecommendations(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}
