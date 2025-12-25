import { createBrowserRouter } from 'react-router-dom';
import { AnimeListPage } from '../pages/anime-list/page';
import { AnimeDetailsPage } from '../pages/anime-details/page';
import { FavoritesPage} from '../pages/favorites/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AnimeListPage />,
  },
  {
    path: '/anime/:id',
    element: <AnimeDetailsPage />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage />,
  },
]);

export default router;
