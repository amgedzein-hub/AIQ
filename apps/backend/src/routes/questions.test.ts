import { questionsRouter } from './questions';
import { FastifyInstance } from 'fastify';

// Mock services
jest.mock('../services/question-bank');
jest.mock('../services/scoring-engine');

describe('Questions Router', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    const fastify = require('fastify').default();
    await fastify.register(questionsRouter, { prefix: '/questions' });
    app = fastify;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /next', () => {
    it('should return a question on valid request', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/questions/next',
        payload: {
          sessionId: 'test-session-123',
          currentResponses: {},
          currentTheta: 0,
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('question');
      expect(body).toHaveProperty('sessionId');
    });

    it('should return 400 for invalid request', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/questions/next',
        payload: {
          // Missing required sessionId
          currentResponses: {},
        },
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
