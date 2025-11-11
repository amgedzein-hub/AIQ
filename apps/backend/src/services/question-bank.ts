import { loadQuestionBank } from '@iq-test/question-bank';

let questionBankCache: any = null;

export async function getQuestionBank() {
  if (!questionBankCache) {
    try {
      questionBankCache = loadQuestionBank();
    } catch (error) {
      console.error('Failed to load question bank', error);
      // Return empty question bank as fallback
      questionBankCache = { questions: [] };
    }
  }
  return questionBankCache;
}
