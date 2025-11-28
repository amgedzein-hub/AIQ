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

    // Calculate information for all available questions
    const questionsWithInfo = availableQuestions.map((question) => ({
      question,
      information: calculateItemInformation(currentTheta, {
        difficulty: question.difficulty,
        discrimination: question.discrimination,
      }),
    }));

    // Sort by information (descending)
    questionsWithInfo.sort((a, b) => b.information - a.information);

    // Select from top questions to add variety
    // For the first question (no used questions), pick from a larger pool (top 20)
    // For subsequent questions, pick from top 10 (increased from 5)
    const isFirstQuestion = usedQuestionIds.length === 0;
    const poolSize = isFirstQuestion ? 20 : 10;

    const topN = Math.min(poolSize, questionsWithInfo.length);
    const topQuestions = questionsWithInfo.slice(0, topN);

    // Randomly select one from the top questions
    const randomIndex = Math.floor(Math.random() * topQuestions.length);
    return topQuestions[randomIndex].question;
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
