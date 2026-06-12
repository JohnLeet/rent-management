import { ProfilePage } from '@pages';
import { PATHS } from '../paths';
import { AuthGuard } from '../guards';

export const profileRoutes = [
    {
        path: PATHS.PROFILE,
        element: (
            <AuthGuard>
                <ProfilePage />
            </AuthGuard>
        ),
    },
];
