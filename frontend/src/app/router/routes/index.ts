import { publicRoutes } from './public.routes';
import { profileRoutes } from './profile.routes';
import { authRoutes } from './auth.routes';

export const routes = [...publicRoutes, ...authRoutes, ...profileRoutes];
