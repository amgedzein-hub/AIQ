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

        // Get session data from store
        const { sessionStore } = await import('../services/session-store');
        const session = sessionStore.getSession(sessionId);

        if (!session) {
          return reply.code(404).send({ error: 'Session not found' });
        }

        // Debug logging
        logger.info(`Session ${sessionId} has ${session.responses.length} responses`);
        logger.info(`Session responses: ${JSON.stringify(session.responses.slice(0, 2))}`);

        // Mark session as ended
        sessionStore.endSession(sessionId);

        // Calculate scores by domain
        const domains: Record<string, { score: number; percentile: number }> = {};
        const domainStats: Record<string, { correct: number; total: number }> = {};

        // Initialize domain stats
        ['Gf', 'Gc', 'Gwm', 'Gv', 'Gs'].forEach(domain => {
          domainStats[domain] = { correct: 0, total: 0 };
        });

        // Count correct answers per domain
        session.responses.forEach(response => {
          if (!domainStats[response.domain]) {
            domainStats[response.domain] = { correct: 0, total: 0 };
          }
          domainStats[response.domain].total++;
          if (response.isCorrect) {
            domainStats[response.domain].correct++;
          }
        });

        // Calculate scores (simple percentage to IQ scale conversion)
        Object.entries(domainStats).forEach(([domain, stats]) => {
          const percentage = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
          const score = 100 + (percentage - 50) * 0.6; // Convert to IQ scale
          const percentile = Math.min(99, Math.max(1, Math.round(percentage)));
          domains[domain] = { score: Math.round(score), percentile };
        });

        // Calculate total score
        const totalCorrect = session.responses.filter(r => r.isCorrect).length;
        const totalQuestions = session.responses.length;
        const totalPercentage = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
        const totalScore = Math.round(100 + (totalPercentage - 50) * 0.6);
        const percentile = Math.min(99, Math.max(1, Math.round(totalPercentage)));

        // Generate interpretation
        let interpretation = '';
        if (totalScore >= 130) {
          interpretation = 'نتيجة استثنائية! أنت في الفئة العليا جداً من حيث الذكاء العام.';
        } else if (totalScore >= 120) {
          interpretation = 'نتيجة ممتازة جداً. أنت في الفئة العليا من حيث الذكاء العام.';
        } else if (totalScore >= 110) {
          interpretation = 'نتيجة جيدة جداً. أنت فوق المتوسط في الذكاء العام.';
        } else if (totalScore >= 90) {
          interpretation = 'نتيجة جيدة. أنت في المتوسط من حيث الذكاء العام.';
        } else {
          interpretation = 'نتيجة مقبولة. هناك مجال للتحسين.';
        }

        logger.info(`Results retrieved for session ${sessionId}`);

        return {
          sessionId,
          totalScore,
          percentile,
          domains,
          interpretation,
          review: session.responses.map(r => ({
            questionText: r.questionText,
            domain: r.domain,
            userAnswer: r.userAnswer,
            correctAnswer: r.correctAnswer,
            isCorrect: r.isCorrect,
            explanation: r.explanation,
          })),
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
