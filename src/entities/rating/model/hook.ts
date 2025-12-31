import { useState } from "react";

export function useAnimeRating(animeId: number) {
  const [rating, setRating] = useState<number | null>(() => {
    const saved = localStorage.getItem("ratings");
    if (!saved) return null;
    return JSON.parse(saved)[animeId] ?? null;
  });

  const updateRating = (value: number) => {
    setRating(value);

    const saved = JSON.parse(localStorage.getItem("ratings") ?? "{}");
    saved[animeId] = value;
    localStorage.setItem("ratings", JSON.stringify(saved));
  };

  return { rating, updateRating };
}
