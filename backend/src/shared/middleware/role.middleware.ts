import { FastifyReply, FastifyRequest } from 'fastify';
import { Role } from '@prisma/client'; //TODO What is th prisma Role?

export function requireRole(...roles: Role[]) {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        if (!roles.includes(req.user.role)) {
            reply.code(403).send({ error: 'Forbidden' });
        }
    };
}
