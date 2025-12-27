import { Outlet } from "react-router-dom";
import { Header } from "../shared/ui/header/header";
import { ErrorBoundary } from "../shared/ui/error-boundary/error-boundary";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}
