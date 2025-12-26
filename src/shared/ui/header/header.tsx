import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-slate-900">
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
      </div>
    </header>
  );
}
