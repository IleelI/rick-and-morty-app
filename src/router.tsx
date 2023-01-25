import { RouteObject, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';
import CharactersDetailsPage from './pages/characterDetails';
import HomePage from './pages/home';

export const ROUTE_PATHS = {
  home: '/',
  character: {
    details: 'character/:id',
  },
};

const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.home,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATHS.character.details,
        element: <CharactersDetailsPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
