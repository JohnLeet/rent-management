import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from '@app/router';

export const AppRouterProvider = ({ children }) => {
    return <RouterProvider router={router}>{children}</RouterProvider>;
};
