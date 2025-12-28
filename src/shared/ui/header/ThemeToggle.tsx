import { Button } from "../../button/button.tsx";
import { useTheme } from "../../theme/theme-provider.tsx";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 hover:bg-gray-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {theme === "dark" ? "☀️ Светлая" : "🌙 Тёмная"}
    </Button>
  );
}
