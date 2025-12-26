const KEY = "favorites-anime";

export function getFavorites(): number[] {
  const row = localStorage.getItem(KEY);
  return row ? JSON.parse(row) : [];
}

export function saveFavorites(ids: number[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}
