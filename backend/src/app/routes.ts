import { FastifyInstance } from 'fastify';
import { authRoutes } from '../modules/auth/auth.routes';

export const registerRoutes = async (app: FastifyInstance) => {
    const prefix = '/api/v1';

    app.register(authRoutes, { prefix: `${prefix}/auth` });

    // Health check (без prefix)
    app.get('/health', async () => ({ status: 'ok', ts: Date.now() }));
};
