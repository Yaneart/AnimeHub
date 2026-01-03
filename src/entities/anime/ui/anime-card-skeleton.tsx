import { motion } from "framer-motion";
import { Skeleton } from "../../../shared/ui/skeleton/skeleton";

export function AnimeCardSkeleton() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-xl bg-slate-800"
    >
      <Skeleton className="h-55 w-full rounded-none" />

      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </motion.div>
  );
}
