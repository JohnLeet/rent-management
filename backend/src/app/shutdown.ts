import { FastifyInstance } from 'fastify';
import { prisma } from '@shared/db/prisma';

export function registerShutdown(app: FastifyInstance) {
    const shutdown = async () => {
        app.log.info('Received shutdown signal');

        await app.close();
        await prisma.$disconnect();

        app.log.info('Shutdown complete');

        process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}
