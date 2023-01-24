import { RouteObject, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';
import Home from './pages/home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
