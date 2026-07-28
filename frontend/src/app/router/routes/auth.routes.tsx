import { PATHS } from '../paths';
import { AuthPage } from '@pages';
import { GuestGuard } from '../guards';

export const authRoutes = [
    {
        path: PATHS.AUTH,
        element: (
            <GuestGuard>
                <AuthPage />
            </GuestGuard>
        ),
    },
];
