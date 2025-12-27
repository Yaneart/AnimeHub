import { useCallback, useRef } from "react";

interface Props {
  enabled?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteScroll({
  enabled = true,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!enabled) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || !hasNextPage) return;

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      observerRef.current.observe(node);
    },
    [enabled, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return loadMoreRef;
}
