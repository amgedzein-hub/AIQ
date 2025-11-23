import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import dotenv from 'dotenv';
import { initializeLogger } from './utils/logger';
import { questionsRouter } from './routes/questions';
import { answersRouter } from './routes/answers';
import { resultsRouter } from './routes/results';
import { healthRouter } from './routes/health';
import { sessionsRouter } from './routes/sessions';
import { authRouter } from './routes/auth';

dotenv.config();

const logger = initializeLogger();
const PORT = parseInt(process.env.BACKEND_PORT || '3001', 10);

async function start() {
  const server = fastify({
    logger: true,
  });

  // Register plugins
  await server.register(helmet);
  await server.register(cors, {
    origin: true,
  });

  await server.register(jwt, {
    secret: process.env.JWT_SECRET || 'super-secret-key',
  });

  await server.register(rateLimit, {
    max: 100,
    timeWindow: '15 minutes',
  });

  server.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Register routes
  await server.register(healthRouter);
  await server.register(questionsRouter, { prefix: '/questions' });
  await server.register(answersRouter, { prefix: '/answers' });
  await server.register(resultsRouter, { prefix: '/results' });
  await server.register(sessionsRouter, { prefix: '/sessions' });
  await server.register(authRouter, { prefix: '/auth' });

  // Start server
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    logger.info(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
