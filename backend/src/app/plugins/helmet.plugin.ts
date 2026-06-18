import helmet from '@fastify/helmet';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

export const helmetPlugin = fp(async (app: FastifyInstance) => {
    await app.register(helmet, {
        contentSecurityPolicy: false,
    });
});
