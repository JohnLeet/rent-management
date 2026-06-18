import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import { ACCESS_TOKEN_KEY } from '@shared/constants';
import { JwtPayload } from '@/modules/auth/auth.schema';

export const jwtPlugin = fp(async (app: FastifyInstance) => {
    await app.register(jwt, {
        secret: process.env.JWT_SECRET!,
        cookie: {
            cookieName: ACCESS_TOKEN_KEY,
            signed: false,
        },
        sign: { expiresIn: '15m' },
    });
    app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify<JwtPayload>();
        } catch (err) {
            reply.status(401).send({
                error: 'Unauthorized',
                message: 'Необходима авторизация',
            });
        }
    });
});
