import type { FastifyReply } from 'fastify';
import { JwtPayload } from './auth.schema';

export const generateTokens = async (jwtSign: FastifyReply['jwtSign'], user) => {
    const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    return await Promise.all([jwtSign(payload), jwtSign(payload)]);
};
