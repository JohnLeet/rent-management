import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export const corsPlugin = fp(async (app: FastifyInstance) => {
    await app.register(cors, {
        // origin: можно строка, массив, RegExp или функция
        origin: (origin, callback) => {
            const allowed = [
                'http://localhost:5173', // Vite dev
                'http://127.0.0.1:3000',
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
});
