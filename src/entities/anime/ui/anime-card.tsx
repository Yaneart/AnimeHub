import { type Anime } from "../types";
import { useFavoritesStore } from "../../../shared/store/favorites.store";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  anime: Anime;
  onClick?: () => void;
}

export function AnimeCard({ anime, onClick }: Props) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(anime.mal_id));

  const image =
    anime.images.webp?.large_image_url ?? anime.images.jpg.large_image_url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}>
      <div
        onClick={onClick}
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-900 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20"
      >
        <img
          loading="lazy"
          src={image}
          alt={anime.title}
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <button
          type="button"
          aria-label="toggle favorite"
          onClick={(e) => {
            e.stopPropagation();

            const added = !isFavorite;
            toggleFavorite(anime.mal_id);

            toast.dismiss("favorite");
            toast.success(
              added ? "Добавлено в избранное" : "Удалено из избранного",
              { id: "favorite" }
            );
          }}
          className="absolute top-3 right-3 z-10 rounded-full bg-white/5 p-2 backdrop-blur transition hover:bg-white/10"
        >
          <Heart
            className={`h-4 w-4 transition ${isFavorite ? "fill-red-400 text-cyan-400" : "text-white/70"
              } `}
          />
        </button>

        <div className="absolute right-0 bottom-0 left-0 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {anime.title}
          </h3>

          <div className="mt-1 text-xs text-slate-300">
            ⭐ {anime.score ?? "—"}
            {anime.year && <span className="ml-2">· {anime.year}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
