import { useEffect, useRef } from "react";

interface Props {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!ref.current) return;
    const observer = new IntersectionObserver((entries => {
      const first = entries[0];
      if(first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }))

    observer.observe(ref.current);

    return () => observer.disconnect();
  },[fetchNextPage, hasNextPage, isFetchingNextPage]);

  return ref ;
}
