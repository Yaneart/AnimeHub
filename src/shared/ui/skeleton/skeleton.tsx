export function Skeleton() {
  return (
    <div className="relative h-72 overflow-hidden rounded-xl bg-slate-800">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
