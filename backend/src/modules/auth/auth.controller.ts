// В контроллере после успешного login:
import type { FastifyReply, FastifyRequest } from 'fastify';
import { authService } from './auth.service';
import type { LoginInput, RegisterInput } from './auth.schema';

export const authController = {
    async register(req: FastifyRequest<{ Body: RegisterInput }>, reply: FastifyReply) {
        const user = await authService.register(req.body);
        const token = await reply.jwtSign({ id: user.id, role: user.role });
        return reply.code(201).send({ token, user });
    },
    //TODO How to work with cookies?
    async login(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
        const user = await authService.login(req.body);

        // В контроллере после успешного login:
        const accessToken = await reply.jwtSign({ id: user.id, role: user.role });

        reply
            .setCookie('access_token', accessToken, {
                httpOnly: true, // недоступен из JS
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict', // защита от CSRF
                path: '/',
                maxAge: 15 * 60, // 15 минут (в секундах)
            })
            .setCookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/api/v1/auth/refresh', // только для /refresh!
                maxAge: 7 * 24 * 60 * 60, // 7 дней
            })
            .send({ user });
        return reply.send({ token, user });
    },
};
const accessToken = await reply.jwtSign({ id: user.id, role: user.role });

reply
    .setCookie('access_token', accessToken, {
        httpOnly: true, // недоступен из JS
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // защита от CSRF
        path: '/',
        maxAge: 15 * 60, // 15 минут (в секундах)
    })
    //TODO
    .setCookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/v1/auth/refresh', // только для /refresh!
        maxAge: 7 * 24 * 60 * 60, // 7 дней
    })
    .send({ user });
