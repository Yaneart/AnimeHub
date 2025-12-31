import { useTranslation } from "react-i18next";
import { Button } from "../../button/button.tsx";
import { useTheme } from "../../theme/theme-provider.tsx";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const isDark = theme === "dark";

  return (
    <Button
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2"
        >
          {isDark ? "☀️" : "🌙"}
          {isDark ? t("theme.light") : t("theme.dark")}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
