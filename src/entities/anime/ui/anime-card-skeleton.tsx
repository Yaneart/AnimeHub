export function AnimeCardSkeleton() {
  return (
    <div className="relative h-72 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10" />
      <div className="absolute right-0 bottom-0 left-0 p-4">
        <div className="mb-2 h-4 w-3/4 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="h-3 w-1/3 rounded bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}
