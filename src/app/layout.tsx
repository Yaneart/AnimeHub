import { Outlet } from "react-router-dom";
import { Header } from "../shared/ui/header/header";
import { ErrorBoundary } from "../shared/ui/error-boundary/error-boundary";

export function AppLayout() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
}
