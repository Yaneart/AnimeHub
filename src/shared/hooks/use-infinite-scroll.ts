import { useEffect, useRef } from "react";

export function useInfiniteScroll({
  onLoadMore,
  enabled,
  isFetching,
}: {
  onLoadMore: () => void;
  enabled: boolean;
  isFetching: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoadingRef.current) {
        isLoadingRef.current = true;
        onLoadMore();
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, onLoadMore]);

  useEffect(() => {
    if (!isFetching) {
      isLoadingRef.current = false;
    }
  }, [isFetching]);

  return ref;
}
