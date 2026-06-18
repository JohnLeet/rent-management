// В контроллере после успешного login:
import { authService } from './auth.service';
import { generateTokens } from './auth.tokens';
import { setAuthCookies } from './auth.cookies';
import { prisma } from '@shared/db/prisma';
import { AppError } from '@shared/errors/AppError';

import type { FastifyReply, FastifyRequest } from 'fastify';
import type { AuthLoginDTO, AuthRegistrationDTO } from './auth.schema';

export const authController = {
    async register(req: FastifyRequest<{ Body: AuthRegistrationDTO }>, reply: FastifyReply) {
        const data = req.body;
        const exists = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (exists) throw new AppError('Email already taken', 409);
        const user = await authService.register(data);

        const tokens = await generateTokens(req.server.jwt.sign, user);

        return setAuthCookies(reply, ...tokens)
            .code(201)
            .send({ user });
    },

    async login(req: FastifyRequest<{ Body: AuthLoginDTO }>, reply: FastifyReply) {
        const user = await authService.login(req.body);

        const tokens = await generateTokens(req.server.jwt.sign, user);

        return setAuthCookies(reply, ...tokens)
            .code(201)
            .send({ user });
    },
};
