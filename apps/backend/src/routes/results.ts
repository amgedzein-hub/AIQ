import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { logger } from '../utils/logger';

const GetResultsSchema = z.object({
  sessionId: z.string(),
});

export async function resultsRouter(fastify: FastifyInstance) {
  fastify.get(
    '/:sessionId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { sessionId } = GetResultsSchema.parse(request.params);

        // TODO: Fetch results from database for the session
        // For now, return sample results

        logger.info(`Results retrieved for session ${sessionId}`);

        return {
          sessionId,
          totalScore: 128,
          percentile: 78,
          domains: {
            Gf: { score: 132, percentile: 98 },
            Gc: { score: 125, percentile: 75 },
            Gwm: { score: 120, percentile: 72 },
            Gv: { score: 129, percentile: 92 },
            Gs: { score: 124, percentile: 74 },
          },
          interpretation:
            'نتيجة ممتازة جداً. أنت في الفئة العليا من حيث الذكاء العام.',
        };
      } catch (error) {
        logger.error('Error fetching results', error);
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ error: 'Invalid session ID' });
        }
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
}
