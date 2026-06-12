import { PATHS } from '../paths';
import { useAuth } from '@modules/auth';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

export const GuestGuard = ({ children }: Props) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={PATHS.PROFILE} replace />;
    }

    return children;
};
