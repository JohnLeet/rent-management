import { MainLayout } from '@layouts';
import { HomePage, NotFoundPage } from '@pages';
export const publicRoutes = [
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];
