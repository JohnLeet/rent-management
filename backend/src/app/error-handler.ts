import { FastifyInstance } from 'fastify';
import { AppError } from '@shared/errors/AppError';

export function registerErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error, _req, reply) => {
        if (error instanceof AppError) {
            return reply.code(error.statusCode).send({
                error: error.message,
            });
        }

        app.log.error(error);

        return reply.code(500).send({
            error: 'Internal server error',
        });
    });
}
