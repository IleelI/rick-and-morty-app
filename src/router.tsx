import { RouteObject, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';
import CharactersDetailsPage from './pages/character-details/character-details';
import HomePage from './pages/home/home';

export const ROUTE_PATHS = {
  HOME: '/',
  CHARACTER: {
    DETAILS: 'character/:id',
  },
};

const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.HOME,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATHS.CHARACTER.DETAILS,
        element: <CharactersDetailsPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
