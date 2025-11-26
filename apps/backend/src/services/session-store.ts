// Simple in-memory session store for tracking test sessions
// In production, this should be replaced with a proper database

interface QuestionResponse {
    questionId: string;
    questionText: string;
    domain: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
    difficulty: number;
}

interface SessionData {
    sessionId: string;
    responses: QuestionResponse[];
    currentTheta: number;
    startTime: Date;
    endTime?: Date;
}

class SessionStore {
    private sessions: Map<string, SessionData> = new Map();

    createSession(sessionId: string): void {
        this.sessions.set(sessionId, {
            sessionId,
            responses: [],
            currentTheta: 0,
            startTime: new Date(),
        });
    }

    addResponse(
        sessionId: string,
        questionId: string,
        questionText: string,
        domain: string,
        userAnswer: string,
        correctAnswer: string,
        explanation: string,
        difficulty: number
    ): void {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        session.responses.push({
            questionId,
            questionText,
            domain,
            userAnswer,
            correctAnswer,
            isCorrect: userAnswer === correctAnswer,
            explanation,
            difficulty,
        });
    }

    updateTheta(sessionId: string, theta: number): void {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.currentTheta = theta;
        }
    }

    getSession(sessionId: string): SessionData | undefined {
        return this.sessions.get(sessionId);
    }

    endSession(sessionId: string): void {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.endTime = new Date();
        }
    }

    // Clean up old sessions (older than 24 hours)
    cleanup(): void {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        for (const [sessionId, session] of this.sessions.entries()) {
            if (session.startTime < oneDayAgo) {
                this.sessions.delete(sessionId);
            }
        }
    }
}

export const sessionStore = new SessionStore();

// Run cleanup every hour
setInterval(() => {
    sessionStore.cleanup();
}, 60 * 60 * 1000);

export type { SessionData, QuestionResponse };
