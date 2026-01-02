import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRandomAnime } from "../../../entities/anime/mutations/useRandomAnime";
import { ThemeToggle } from "./ThemeToggle";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/index";
import toast from "react-hot-toast";

export function Header() {
  const { pathname } = useLocation();
  const { mutate, isPending } = useRandomAnime();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const linkClass = useCallback(
    (path: string) =>
      `px-3 py-2 rounded-lg transition ${
        pathname === path
          ? "bg-slate-200 text-slate-900 border dark:bg-slate-100 dark:text-slate-900"
          : "text-slate-700 hover:bg-gray-400 dark:text-slate-300 dark:hover:bg-slate-800"
      }`,
    [pathname]
  );

  const handleClick = () => {
    toast.loading("Ищем...", { id: "random" });
  
    mutate(undefined, {
      onSuccess: (res) => {
        toast.success("Нашли!", { id: "random" });
        navigate(`/anime/${res.data.mal_id}`);
      },
      onError: () => {
        toast.error("Ошибка", { id: "random" });
      },
    });
  };
  

  const changeLang = (lng: "ru" | "en") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const langButton = (lang: string) =>
    `rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200
     ${
       i18n.language.startsWith(lang)
         ? `
            bg-slate-400 text-slate-900
            shadow-sm ring-1 ring-slate-900/20
            backdrop-blur
            dark:bg-white/10 dark:text-white
            dark:ring-white/20
          `
         : `
            text-slate-600 hover:text-slate-900
            hover:bg-slate-900/5
            dark:text-white/60
            dark:hover:text-white
            dark:hover:bg-white/5
          `
     }`;

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
            {t("catalog")}
          </Link>
          <Link to="/favorites" className={linkClass("/favorites")}>
            {t("favorites")}
          </Link>
        </nav>

        <Link to="/season" className={linkClass("/season")}>
          {t("seasons")}
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleClick}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 transition hover:bg-gray-400 active:scale-95 disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <span className={isPending ? "animate-spin" : ""}>🎲</span>
            {t("random")}
          </button>

          <ThemeToggle />

          <div className="ml-2 flex gap-1">
            <button
              onClick={() => changeLang("ru")}
              className={langButton("ru")}
            >
              RU
            </button>
            <button
              onClick={() => changeLang("en")}
              className={langButton("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
