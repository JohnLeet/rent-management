import { FastifyInstance } from 'fastify';
import { helmetPlugin } from './helmet.plugin';
import { corsPlugin } from './cors.plugin';
import { cookiePlugin } from './cookie.plugin';
import { jwtPlugin } from './jwt.plugin';
import { multipartPlugin } from './multipart.plugin';

export const registerPlugins = async (app: FastifyInstance) => {
    // 1. Security headers
    await app.register(helmetPlugin);
    // 2. CORS — детальнее на вкладке "CORS + Cookie"
    await app.register(corsPlugin);
    // 3. Cookie — до JWT, потому что JWT читает cookie
    await app.register(cookiePlugin);
    await app.register(jwtPlugin);
    // 5. Загрузка файлов
    await app.register(multipartPlugin);
};
