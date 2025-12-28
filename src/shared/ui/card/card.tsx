import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex rounded-lg bg-white p-4 text-slate-900 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:text-slate-100 ${className} `}
    >
      {children}
    </div>
  );
}
