import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { sessionService } from '../services/session';
import { logger } from '../utils/logger';

const CreateSessionSchema = z.object({
    userId: z.string().optional(),
});

export async function sessionsRouter(fastify: FastifyInstance) {
    fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = CreateSessionSchema.parse(request.body || {});
            const session = await sessionService.createSession(body.userId);

            logger.info(`Created new session: ${session.id}`);

            return {
                sessionId: session.id,
                createdAt: session.createdAt,
            };
        } catch (error) {
            logger.error('Error creating session', error);
            if (error instanceof z.ZodError) {
                return reply.code(400).send({ error: 'Invalid request body' });
            }
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
}
