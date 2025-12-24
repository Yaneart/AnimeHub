import { useEffect, useState } from "react";
import { getFavorites, saveFavorites } from "../lib/favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      saveFavorites(next);

      return next;
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
