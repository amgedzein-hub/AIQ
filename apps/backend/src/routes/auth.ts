import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function authRouter(fastify: FastifyInstance) {
    fastify.get(
        '/me',
        {
            onRequest: [fastify.authenticate],
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return { user: request.user };
        }
    );
}
