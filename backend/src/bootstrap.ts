import { registerErrorHandler } from './app/error-handler';
import { registerShutdown } from './app/shutdown';

import { registerPlugins } from './app/plugins/index.js';
import { registerRoutes } from './app/routes.js';
import { registerSwagger } from './app/swagger.js';

export async function bootstrap(app: FastifyInstance) {
    registerErrorHandler(app);

    await registerSwagger(app);
    await registerPlugins(app);
    await registerRoutes(app);

    registerShutdown(app);
}
