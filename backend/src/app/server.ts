import Fastify from 'fastify';
import { registerPlugins } from './plugins';
import { registerRoutes } from './routes';
import { AppError } from '@shared/errors/AppError';

const app = Fastify({ logger: true });

async function main() {
    await registerPlugins(app);
    await registerRoutes(app);

    // Глобальный обработчик ошибок
    app.setErrorHandler((error, _req, reply) => {
        if (error instanceof AppError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        app.log.error(error);
        reply.code(500).send({ error: 'Internal server error' });
    });

    await app.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' });
}

main().catch(console.error);
