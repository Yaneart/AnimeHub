import type { ReactNode } from "react";
import { motion } from "framer-motion";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900"
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>

      {description && (
        <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}

      {action && <div className="mt-2">{action}</div>}
    </motion.div>
  );
}
