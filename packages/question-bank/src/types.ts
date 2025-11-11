import { z } from 'zod';

export const DomainType = z.enum(['Gf', 'Gc', 'Gwm', 'Gv', 'Gs']);
export type Domain = z.infer<typeof DomainType>;

export const QuestionSchema = z.object({
  id: z.string().uuid(),
  domain: DomainType,
  difficulty: z.number().min(0).max(1),
  discrimination: z.number().min(0).max(3),
  guessing: z.number().min(0).max(1).default(0.25),
  text_ar: z.string(),
  options: z.array(z.string()).min(2).max(5),
  correct: z.string(),
  explanation_ar: z.string().optional(),
  culturalContext: z.string().optional(),
});

export type Question = z.infer<typeof QuestionSchema>;

export const QuestionBankSchema = z.object({
  version: z.string(),
  lastUpdated: z.string().datetime(),
  questions: z.array(QuestionSchema),
});

export type QuestionBank = z.infer<typeof QuestionBankSchema>;
