import { FastifyInstance } from 'fastify';
import { loginApiSchema, registrationApiSchema } from './auth.schema';
import { authController } from './auth.controller';

export async function authRoutes(app: FastifyInstance) {
    app.post('/registration', { schema: registrationApiSchema }, authController.register);
    app.post('/login', { schema: loginApiSchema }, authController.login);
}
