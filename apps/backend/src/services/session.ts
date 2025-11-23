import { randomUUID } from 'crypto';

export interface TestSession {
  id: string;
  userId?: string;
  createdAt: Date;
  status: 'active' | 'completed';
}

// In-memory store for now, to be replaced with DB
const sessions = new Map<string, TestSession>();

export const sessionService = {
  createSession: async (userId?: string): Promise<TestSession> => {
    const id = randomUUID();
    const session: TestSession = {
      id,
      userId,
      createdAt: new Date(),
      status: 'active',
    };
    sessions.set(id, session);
    return session;
  },

  getSession: async (id: string): Promise<TestSession | undefined> => {
    return sessions.get(id);
  },
};
