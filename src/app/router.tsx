import { createBrowserRouter } from "react-router-dom";
import { AnimeListPage } from "../pages/anime-list/page";
import { AnimeDetailsPage } from "../pages/anime-details/page";
import { FavoritesPage } from "../pages/favorites/page";
import { AppLayout } from "./layout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <AnimeListPage />,
      },
      {
        path: "/anime/:id",
        element: <AnimeDetailsPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);

export default router;
