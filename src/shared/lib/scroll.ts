const KEY = "anime-list-scroll";

export function saveScrollPosition() {
  sessionStorage.setItem(KEY, String(window.scrollY));
}

export function restoreScrollPosition() {
  const value = sessionStorage.getItem(KEY);
  if (value) {
    requestAnimationFrame(() => {
      window.scrollTo(0, Number(value));
    });
  }
}
