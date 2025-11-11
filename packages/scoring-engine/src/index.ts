import { Question, Domain } from '@iq-test/question-bank';
import {
  calculateProbability,
  calculateItemInformation,
  selectNextQuestion,
  updateTheta as irtUpdateTheta,
} from './irt';

export interface ScoringEngine {
  getNextQuestion(
    questions: Question[],
    usedQuestionIds: string[],
    currentTheta: number
  ): Promise<Question | null>;
  updateTheta(
    currentTheta: number,
    isCorrect: boolean,
    difficulty: number,
    discrimination: number
  ): number;
  calculateScores(
    responses: Record<string, boolean>,
    questions: Question[]
  ): Record<string, number>;
}

export class AdaptiveScoringEngine implements ScoringEngine {
  private learningRate = 0.5;

  async getNextQuestion(
    questions: Question[],
    usedQuestionIds: string[],
    currentTheta: number
  ): Promise<Question | null> {
    const usedSet = new Set(usedQuestionIds);
    const availableQuestions = questions.filter(
      (q) => !usedSet.has(q.id)
    );

    if (availableQuestions.length === 0) {
      return null;
    }

    // Select question with maximum information at current theta
    let maxInfo = -Infinity;
    let selectedQuestion: Question | null = null;

    availableQuestions.forEach((question) => {
      const info = calculateItemInformation(currentTheta, {
        difficulty: question.difficulty,
        discrimination: question.discrimination,
      });

      if (info > maxInfo) {
        maxInfo = info;
        selectedQuestion = question;
      }
    });

    return selectedQuestion;
  }

  updateTheta(
    currentTheta: number,
    isCorrect: boolean,
    difficulty: number,
    discrimination: number
  ): number {
    const newTheta = irtUpdateTheta(
      currentTheta,
      isCorrect,
      { difficulty, discrimination },
      this.learningRate
    );

    // Clamp theta to reasonable range
    return Math.max(-3, Math.min(3, newTheta));
  }

  calculateScores(
    responses: Record<string, boolean>,
    questions: Question[]
  ): Record<string, number> {
    const domains: Domain[] = ['Gf', 'Gc', 'Gwm', 'Gv', 'Gs'];
    const scores: Record<string, number> = {};

    domains.forEach((domain) => {
      const domainQuestions = questions.filter((q) => q.domain === domain);
      const domainResponses = domainQuestions.map(
        (q) => responses[q.id] || false
      );
      const correctCount = domainResponses.filter((r) => r).length;
      const percentage =
        domainQuestions.length > 0
          ? (correctCount / domainQuestions.length) * 100
          : 0;

      // Convert to IQ scale (mean 100, SD 15)
      scores[domain] = 100 + (percentage - 50) * 3;
    });

    return scores;
  }
}

export const scoringEngine = new AdaptiveScoringEngine();

export { calculateProbability, calculateItemInformation } from './irt';
