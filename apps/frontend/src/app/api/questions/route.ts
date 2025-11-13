import { NextRequest, NextResponse } from 'next/server';

const MOCK_QUESTIONS = [
  {
    id: '1',
    domain: 'Gf',
    text_ar: 'ما هو التسلسل التالي: 2، 4، 8، 16، ؟',
    options: ['32', '24', '20', '18'],
    difficulty: 1,
  },
  {
    id: '2',
    domain: 'Gf',
    text_ar: 'إذا كان 3 × 4 = 12، و 5 × 6 = 30، فما هو 7 × 8؟',
    options: ['56', '54', '52', '50'],
    difficulty: 1,
  },
  {
    id: '3',
    domain: 'Gc',
    text_ar: 'ما معنى كلمة "استبصار"؟',
    options: ['الفهم العميق', 'الحزن الشديد', 'الحركة السريعة', 'الصوت العالي'],
    difficulty: 2,
  },
  {
    id: '4',
    domain: 'Gwm',
    text_ar: 'تذكر هذا التسلسل: 7، 3، 9، 2، 5. كم عدد الأرقام الفردية؟',
    options: ['3', '4', '2', '5'],
    difficulty: 2,
  },
  {
    id: '5',
    domain: 'Gv',
    text_ar: 'أي من الأشكال التالية يكمل النمط؟',
    options: ['مربع', 'دائرة', 'مثلث', 'خماسي'],
    difficulty: 1,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    // Return a random question
    const randomQuestion = MOCK_QUESTIONS[Math.floor(Math.random() * MOCK_QUESTIONS.length)];

    return NextResponse.json({
      question: randomQuestion,
      sessionId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load question' },
      { status: 500 }
    );
  }
}
