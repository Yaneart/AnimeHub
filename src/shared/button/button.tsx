import { type ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
}

export function Button({
  variant = "default",
  className = "",
  ...props
}: Props) {
  const base = `
    rounded-lg border px-4 py-2 transition
    disabled:opacity-50
  `;

  const variants = {
    default: `
      bg-white text-slate-900 border-slate-300
      hover:bg-gray-400
      dark:bg-slate-900 dark:text-slate-100 dark:border-slate-600
      dark:hover:bg-slate-800
    `,
    ghost: `
      bg-transparent text-slate-600 border-slate-300
      hover:bg-gray-400
      dark:text-slate-300 dark:border-slate-600
      dark:hover:bg-slate-800
    `,
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
