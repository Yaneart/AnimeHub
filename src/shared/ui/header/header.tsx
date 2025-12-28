import { Link, useLocation } from "react-router-dom";
import { useRandomAnime } from "../../../entities/anime/hooks";
import { ThemeToggle } from "./ThemeToggle";
import { useCallback } from "react";

export function Header() {
  const { pathname } = useLocation();
  const { mutate: openRandom, isPending } = useRandomAnime();

  const linkClass = useCallback(
    (path: string) =>
      `px-3 py-2 rounded-lg transition ${
        pathname === path
          ? "bg-slate-200 text-slate-900 border dark:bg-slate-100 dark:text-slate-900"
          : "text-slate-700 hover:bg-gray-400 dark:text-slate-300 dark:hover:bg-slate-800"
      }`,
    [pathname]
  );

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          to="/"
          className="rounded-lg px-2 py-1 text-xl font-bold text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          AnimeHub
        </Link>

        <nav className="flex gap-2">
          <Link to="/" className={linkClass("/")}>
            Каталог
          </Link>
          <Link to="/favorites" className={linkClass("/favorites")}>
            Избранное
          </Link>
        </nav>

        <Link to="/season" className={linkClass("/season")}>
          Сезоны
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => openRandom()}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 transition hover:bg-gray-400 active:scale-95 disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <span className={isPending ? "animate-spin" : ""}>🎲</span>
            Random
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
