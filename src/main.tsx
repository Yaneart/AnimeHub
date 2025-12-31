import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "./app/providers/query-provider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./app/router.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./shared/theme/theme-provider.tsx";
import "./shared/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              borderRadius: "12px",
              background: "#020617",
              color: "#f8fafc",
            },
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);
