import { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import multipart from '@fastify/multipart';

export const registerPlugins = async (app: FastifyInstance) => {
    // 1. Security headers
    await app.register(helmet, {
        contentSecurityPolicy: false, // отключаем для API
    });

    // 2. CORS — детальнее на вкладке "CORS + Cookie"
    await app.register(cors, {
        // origin: можно строка, массив, RegExp или функция
        origin: (origin, callback) => {
            const allowed = [
                'http://localhost:5173', // Vite dev
                'http://localhost:3000',
                process.env.FRONTEND_URL!, // prod URL
            ];

            if (!origin || allowed.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed`), false);
            }
        },

        credentials: true, // ← ОБЯЗАТЕЛЬНО для cookie
        // без этого браузер не отправит cookie

        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['X-Total-Count'], // для пагинации
        maxAge: 86400, // preflight кэш 24ч
    });

    // 3. Cookie — до JWT, потому что JWT читает cookie
    await app.register(cookie, {
        secret: process.env.COOKIE_SECRET!, // для подписанных cookie
    });

    // 4. JWT — декорирует app, req, reply
    /*await app.register(jwt, {
        secret: process.env.JWT_SECRET!,
        cookie: {
            cookieName: 'access_token', // читает токен из cookie
            signed: false,
        },
        sign: { expiresIn: '15m' },
    });*/

    // 5. Загрузка файлов
    await app.register(multipart, {
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB
            files: 5,
        },
    });
};
