import Fastify from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { bootstrap } from './bootstrap';

const app = Fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>();

await bootstrap(app);

await app.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' });
