import { FastifyRequest, FastifyReply } from 'fastify';

export async function verifyToken(req: FastifyRequest, reply: FastifyReply) {
    try {
        await req.jwtVerify(); // читает из cookie ИЛИ Bearer header
    } catch {
        reply.code(401).send({ error: 'Unauthorized' });
    }
}
