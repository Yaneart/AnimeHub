import { type ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex rounded-lg bg-white p-4 text-slate-900 shadow dark:bg-slate-900 dark:text-slate-100">
      {children}
    </div>
  );
}
