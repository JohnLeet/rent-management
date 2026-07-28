import { FastifyInstance } from 'fastify';
import { authRoutes } from '../modules/auth/auth.routes';
import { API_VERSION } from '@common/constants';

export const registerRoutes = async (app: FastifyInstance) => {
    app.register(authRoutes, { prefix: `${API_VERSION}/auth` });

    // Health check (без prefix)
    app.get('/health', async () => ({ status: 'ok', ts: Date.now() }));
};
