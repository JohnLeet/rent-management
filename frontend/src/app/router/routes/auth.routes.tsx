import { PATHS } from '../paths';
import { LoginPage, RegistrationPage } from '@pages';
import { GuestGuard } from '../guards';

export const authRoutes = [
    {
        path: PATHS.LOGIN,
        element: (
            <GuestGuard>
                <LoginPage />
            </GuestGuard>
        ),
    },
    {
        path: PATHS.REGISTRATION,
        element: (
            <GuestGuard>
                <RegistrationPage />
            </GuestGuard>
        ),
    },
];
