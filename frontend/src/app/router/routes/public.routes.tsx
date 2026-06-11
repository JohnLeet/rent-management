import { MainLayout } from '@layouts';
import { HomePage, ListingsPage, NotFoundPage } from '@pages';
import { PATHS } from '@router';

export const publicRoutes = [
    {
        element: <MainLayout />,
        children: [
            {
                path: PATHS.HOME,
                element: <HomePage />,
            },
            {
                path: PATHS.LISTINGS,
                element: <ListingsPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];
