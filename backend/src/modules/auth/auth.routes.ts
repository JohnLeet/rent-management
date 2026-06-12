import { FastifyInstance } from 'fastify';
import { prisma } from '@shared/db/prisma';

export async function authRoutes(app: FastifyInstance) {
    const testHandler = async (req, reply) => {
        const newUser = await prisma.user.create({
            data: {
                name: 'Alice',
                email: 'alice@prisma.io',
            },
        });
        reply.send({ userName: newUser.name });
    };
    app.get('/', testHandler);

    // ── Роуты только для LANDLORD / SUPER_ADMIN ─────────────
    /*app.register(async function protected(app) {
        app.addHook('onRequest', verifyToken);
        app.addHook('onRequest', requireRole('LANDLORD', 'SUPER_ADMIN'));

        app.post(
            '/',
            {
                schema: { body: zodToJsonSchema(CreatePropertySchema) },
            },
            propertiesController.create
        );

        app.put(
            '/:id',
            {
                schema: { body: zodToJsonSchema(UpdatePropertySchema) },
            },
            propertiesController.update
        );

        app.delete('/:id', propertiesController.remove);
    });*/

    // ── Роуты для любого залогиненного пользователя ──────────
    /*app.register(async function authOnly(app) {
        app.addHook('onRequest', verifyToken);

        app.post('/:id/favorite', propertiesController.toggleFavorite);
        app.post('/:id/review', propertiesController.addReview);
    });*/
}
