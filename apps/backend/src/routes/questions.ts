import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { getScoringEngine } from '../services/scoring-engine';
import { getQuestionBank } from '../services/question-bank';
import { logger } from '../utils/logger';

const NextQuestionSchema = z.object({
  sessionId: z.string(),
  currentResponses: z.record(z.string(), z.string()).optional(),
  currentTheta: z.number().optional().default(0),
});

export async function questionsRouter(fastify: FastifyInstance) {
  fastify.post('/next', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = NextQuestionSchema.parse(request.body);
      const { sessionId, currentResponses = {}, currentTheta = 0 } = body;

      const questionBank = await getQuestionBank();
      const scoringEngine = await getScoringEngine();

      // Get the next best question based on adaptive logic
      const nextQuestion = await scoringEngine.getNextQuestion(
        questionBank.questions,
        Object.keys(currentResponses),
        currentTheta
      );

      if (!nextQuestion) {
        return reply.code(404).send({
          error: 'No more questions available',
        });
      }

      logger.info(`Served question ${nextQuestion.id} for session ${sessionId}`);

      return {
        question: {
          id: nextQuestion.id,
          domain: nextQuestion.domain,
          text_ar: nextQuestion.text_ar,
          options: nextQuestion.options,
          difficulty: nextQuestion.difficulty,
          correct: nextQuestion.correct,
          explanation_ar: nextQuestion.explanation_ar,
        },
        sessionId,
      };
    } catch (error) {
      logger.error('Error fetching next question', error);
      if (error instanceof z.ZodError) {
        return reply.code(400).send({ error: 'Invalid request body' });
      }
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
