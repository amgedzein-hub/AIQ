import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { getScoringEngine } from '../services/scoring-engine';
import { getQuestionBank } from '../services/question-bank';
import { logger } from '../utils/logger';

const SubmitAnswerSchema = z.object({
  sessionId: z.string(),
  questionId: z.string(),
  answer: z.string(),
  currentTheta: z.number().optional().default(0),
});

export async function answersRouter(fastify: FastifyInstance) {
  fastify.post(
    '/submit',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = SubmitAnswerSchema.parse(request.body);
        const { sessionId, questionId, answer, currentTheta = 0 } = body;

        const questionBank = await getQuestionBank();
        const scoringEngine = await getScoringEngine();

        // Find the question
        const question = questionBank.questions.find((q: any) => q.id === questionId);
        if (!question) {
          return reply.code(404).send({
            error: 'Question not found',
          });
        }

        // Check if answer is correct
        const isCorrect = answer === question.correct;

        // Calculate new theta using IRT
        const updatedTheta = scoringEngine.updateTheta(
          currentTheta,
          isCorrect,
          question.difficulty,
          question.discrimination
        );

        logger.info(
          `Answer submitted for session ${sessionId}: ${isCorrect ? 'correct' : 'incorrect'}`
        );

        return {
          isCorrect,
          updatedTheta,
          feedback: isCorrect
            ? 'صحيح! إجابة ممتازة'
            : 'غير صحيح. المحاولة مرة أخرى',
        };
      } catch (error) {
        logger.error('Error submitting answer', error);
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ error: 'Invalid request body' });
        }
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
}
