import questionsData from './questions.json';
import { z } from 'zod';

const QuestionSchema = z.object({
    id: z.string().uuid(),
    domain: z.enum(['Gf', 'Gc', 'Gwm', 'Gv', 'Gs']),
    difficulty: z.number().min(0).max(1),
    discrimination: z.number().min(0),
    guessing: z.number().min(0).max(1),
    text_ar: z.string().min(1),
    options: z.array(z.string()).length(4),
    correct: z.string(),
    explanation_ar: z.string().optional(),
    culturalContext: z.string().optional(),
});

describe('Question Bank Integrity', () => {
    const { questions } = questionsData;

    it('should have unique IDs for all questions', () => {
        const ids = questions.map((q) => q.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
    });

    it('should validate all questions against schema', () => {
        questions.forEach((question) => {
            const result = QuestionSchema.safeParse(question);
            if (!result.success) {
                console.error(`Validation failed for question ${question.id}:`, result.error);
            }
            expect(result.success).toBe(true);
        });
    });

    it('should have correct answer present in options', () => {
        questions.forEach((question) => {
            expect(question.options).toContain(question.correct);
        });
    });

    it('should have at least one question per domain', () => {
        const domains = new Set(questions.map((q) => q.domain));
        expect(domains.has('Gf')).toBe(true);
        expect(domains.has('Gc')).toBe(true);
        expect(domains.has('Gwm')).toBe(true);
        expect(domains.has('Gv')).toBe(true);
        expect(domains.has('Gs')).toBe(true);
    });
});
