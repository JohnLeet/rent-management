import { FastifyInstance } from 'fastify';
import fs from 'node:fs';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';

export async function registerSwagger(app: FastifyInstance) {
    // 1. Подключаем Zod как валидатор/сериализатор
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // 2. Swagger — ДОЛЖЕН быть зарегистрирован ДО роутов
    await app.register(swagger, {
        openapi: {
            info: { title: 'Rental API', version: '1.0.0' },
            components: {
                securitySchemes: {
                    bearerAuth: { type: 'http', scheme: 'bearer' },
                },
            },
        },

        transform: jsonSchemaTransform,
    });

    await app.register(swaggerUI, {
        routePrefix: '/docs',
        uiConfig: { persistAuthorization: true },
    });

    app.addHook('onReady', async () => {
        if (process.env.NODE_ENV === 'development') {
            fs.writeFileSync('./openapi.json', JSON.stringify(app.swagger(), null, 2));
        }
    });
}
