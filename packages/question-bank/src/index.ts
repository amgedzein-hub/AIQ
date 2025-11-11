import * as fs from 'fs';
import * as path from 'path';
import { QuestionBankSchema, Question, Domain } from './types';

let cachedQuestionBank: any = null;

export function loadQuestionBank() {
  if (cachedQuestionBank) {
    return cachedQuestionBank;
  }

  const questionsPath = path.join(__dirname, 'questions.json');
  const rawData = fs.readFileSync(questionsPath, 'utf-8');
  const parsed = JSON.parse(rawData);

  // Validate against schema
  const validated = QuestionBankSchema.parse(parsed);
  cachedQuestionBank = validated;

  return validated;
}

export function getQuestionsByDomain(domain: Domain): Question[] {
  const bank = loadQuestionBank();
  return bank.questions.filter((q: Question) => q.domain === domain);
}

export function getQuestionById(id: string): Question | undefined {
  const bank = loadQuestionBank();
  return bank.questions.find((q: Question) => q.id === id);
}

export { Question, Domain, QuestionBank } from './types';
