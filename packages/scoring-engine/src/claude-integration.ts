import Anthropic from '@anthropic-ai/sdk';
import { Question, Domain } from '@iq-test/question-bank';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

/**
 * Use Claude to generate a detailed interpretation of test results
 */
export async function generateResultInterpretation(
  overallScore: number,
  domainScores: Record<Domain, number>,
  responses: Record<string, boolean>
): Promise<string> {
  const prompt = `
You are an expert psychometrician specializing in Arabic IQ testing.
Provide a detailed interpretation of the following test results in Arabic.

Overall Score: ${overallScore}
Domain Scores:
- Fluid Reasoning (Gf): ${domainScores.Gf}
- Crystallized Intelligence (Gc): ${domainScores.Gc}
- Working Memory (Gwm): ${domainScores.Gwm}
- Visual Processing (Gv): ${domainScores.Gv}
- Processing Speed (Gs): ${domainScores.Gs}

Correct Answers: ${Object.values(responses).filter((v) => v).length}/${Object.keys(responses).length}

Please provide:
1. Overall assessment of cognitive abilities
2. Strengths and areas for development
3. Recommendations for further learning

Use formal Arabic (Fusha) and make it culturally appropriate for Arabic speakers.
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  return textContent && textContent.type === 'text' ? textContent.text : '';
}

/**
 * Use Claude to verify question quality and cultural appropriateness
 */
export async function validateQuestion(question: Question): Promise<boolean> {
  const prompt = `
Review this Arabic IQ test question for quality and cultural appropriateness:

Domain: ${question.domain}
Question: ${question.text_ar}
Options: ${question.options.join(', ')}
Correct Answer: ${question.correct}

Check for:
1. Cultural sensitivity and appropriateness for Arab world
2. Clear and unambiguous wording
3. Fair difficulty level
4. No bias or discrimination issues

Respond with only "APPROVED" or "REJECTED" followed by a brief reason.
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 100,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  const response =
    textContent && textContent.type === 'text' ? textContent.text : '';
  return response.includes('APPROVED');
}

/**
 * Use Claude to generate adaptive feedback on answers
 */
export async function generateAnswerFeedback(
  question: Question,
  userAnswer: string,
  isCorrect: boolean
): Promise<string> {
  const prompt = `
Generate brief, encouraging feedback in Arabic for an IQ test taker:

Question: ${question.text_ar}
User's Answer: ${userAnswer}
Correct Answer: ${question.correct}
Is Correct: ${isCorrect}

${question.explanation_ar ? `Explanation: ${question.explanation_ar}` : ''}

Provide constructive feedback that:
1. Is culturally appropriate for Arabic speakers
2. Is encouraging even if the answer is wrong
3. Briefly explains why the answer is correct/incorrect
4. Is in formal Arabic (Fusha)
5. Is max 2-3 sentences

Keep feedback concise and supportive.
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 150,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  return textContent && textContent.type === 'text' ? textContent.text : '';
}
