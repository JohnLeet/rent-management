import type { FastifyReply } from 'fastify';
import { ACCESS_TOKEN_KEY, API_VERSION, REFRESH_TOKEN_KEY } from '@shared/constants';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
};

export const setAuthCookies = (reply: FastifyReply, accessToken: string, refreshToken: string) => {
    return setAccessTokenCookies(reply, accessToken).setCookie(REFRESH_TOKEN_KEY, refreshToken, {
        ...cookieOptions,
        path: `${API_VERSION}/auth/refresh`,
        maxAge: 7 * 24 * 60 * 60,
    });
};

export const setAccessTokenCookies = (reply: FastifyReply, accessToken: string) => {
    return reply.setCookie(ACCESS_TOKEN_KEY, accessToken, {
        ...cookieOptions,
        path: '/',
        maxAge: 15 * 60,
    });
};
