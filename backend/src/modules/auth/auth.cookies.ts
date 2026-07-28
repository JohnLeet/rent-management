import type { FastifyReply } from 'fastify';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shared/constants';
import { API_VERSION } from '@common/constants';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
};

export const setRefreshTokenCookies = (reply: FastifyReply, refreshToken: string) => {
    return reply.setCookie(REFRESH_TOKEN_KEY, refreshToken, {
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
