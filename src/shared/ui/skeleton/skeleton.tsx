type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded bg-slate-200 dark:bg-slate-800 ${className ?? ""}`}
    >
      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10" />
    </div>
  );
}
