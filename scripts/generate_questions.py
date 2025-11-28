import json
import uuid
import random

domains = ['Gf', 'Gc', 'Gwm', 'Gv', 'Gs']

new_questions = [
    {
        "domain": "Gf",
        "text_ar": "ما الرقم الذي يجب أن يحل محل علامة الاستفهام؟ 3، 6، 12، 24، ؟",
        "options": ["30", "36", "48", "60"],
        "correct": "48",
        "explanation_ar": "كل رقم هو ضعف الرقم السابق",
        "culturalContext": "الأنماط الرياضية"
    },
    {
        "domain": "Gc",
        "text_ar": "ما هو مرادف كلمة 'إيثار'؟",
        "options": ["أنانية", "تفضيل الغير", "شجاعة", "كرم"],
        "correct": "تفضيل الغير",
        "explanation_ar": "الإيثار هو تفضيل مصلحة الآخرين على النفس",
        "culturalContext": "المفردات العربية"
    },
    {
        "domain": "Gwm",
        "text_ar": "إذا كان اليوم هو الاثنين، فماذا سيكون اليوم بعد 3 أيام؟",
        "options": ["الأربعاء", "الخميس", "الجمعة", "السبت"],
        "correct": "الخميس",
        "explanation_ar": "الاثنين + 3 أيام = الخميس",
        "culturalContext": "الاستدلال الزمني"
    },
    {
        "domain": "Gv",
        "text_ar": "أي من الأشكال التالية هو الأقرب في الشبه للمربع؟",
        "options": ["دائرة", "مستطيل", "مثلث", "نجمة"],
        "correct": "مستطيل",
        "explanation_ar": "المستطيل والمربع كلاهما أشكال رباعية بزوايا قائمة",
        "culturalContext": "الإدراك البصري"
    },
    {
        "domain": "Gs",
        "text_ar": "أوجد الرقم المختلف: 20، 30، 40، 55",
        "options": ["20", "30", "40", "55"],
        "correct": "55",
        "explanation_ar": "جميع الأرقام تقبل القسمة على 10 ما عدا 55",
        "culturalContext": "سرعة المعالجة"
    },
    {
        "domain": "Gf",
        "text_ar": "أكمل المتتالية: 1، 1، 2، 3، 5، 8، ؟",
        "options": ["11", "12", "13", "15"],
        "correct": "13",
        "explanation_ar": "متتالية فيبوناتشي: كل رقم هو مجموع الرقمين السابقين",
        "culturalContext": "الأنماط الرياضية"
    },
    {
        "domain": "Gc",
        "text_ar": "ما هو ضد كلمة 'تفاؤل'؟",
        "options": ["تشاؤم", "حزن", "غضب", "يأس"],
        "correct": "تشاؤم",
        "explanation_ar": "التفاؤل والتشاؤم متضادان",
        "culturalContext": "المفردات العربية"
    },
    {
        "domain": "Gwm",
        "text_ar": "احفظ الأرقام التالية: 5، 9، 2، 7. ما هو الرقم الثاني؟",
        "options": ["5", "9", "2", "7"],
        "correct": "9",
        "explanation_ar": "الرقم الثاني في القائمة هو 9",
        "culturalContext": "الذاكرة العاملة"
    },
    {
        "domain": "Gv",
        "text_ar": "إذا قمنا بتدوير حرف 'M' 180 درجة، ماذا يصبح؟",
        "options": ["W", "E", "3", "N"],
        "correct": "W",
        "explanation_ar": "تدوير M يعطي W",
        "culturalContext": "التخيل البصري"
    },
    {
        "domain": "Gs",
        "text_ar": "أي الكلمات التالية لا تنتمي للمجموعة؟ تفاحة، موزة، برتقالة، سيارة",
        "options": ["تفاحة", "موزة", "برتقالة", "سيارة"],
        "correct": "سيارة",
        "explanation_ar": "السيارة ليست فاكهة",
        "culturalContext": "التصنيف السريع"
    },
    {
        "domain": "Gf",
        "text_ar": "إذا كان أطول من ب، وب أطول من ج، فمن الأقصر؟",
        "options": ["أ", "ب", "ج", "لا يمكن التحديد"],
        "correct": "ج",
        "explanation_ar": "بالترتيب: أ > ب > ج",
        "culturalContext": "الاستدلال المنطقي"
    },
    {
        "domain": "Gc",
        "text_ar": "أكمل المثل: 'الوقت كالسيف إن لم تقطعه...'",
        "options": ["قطعك", "جرحك", "فاتك", "انتظرك"],
        "correct": "قطعك",
        "explanation_ar": "مثل عربي مشهور",
        "culturalContext": "الأمثال العربية"
    },
    {
        "domain": "Gwm",
        "text_ar": "قم بالعملية الحسابية في رأسك: 15 + 25 - 10",
        "options": ["20", "30", "40", "50"],
        "correct": "30",
        "explanation_ar": "40 - 10 = 30",
        "culturalContext": "الحساب الذهني"
    },
    {
        "domain": "Gv",
        "text_ar": "كم عدد المثلثات في نجمة خماسية؟",
        "options": ["5", "6", "10", "15"],
        "correct": "10",
        "explanation_ar": "5 مثلثات صغيرة و5 مثلثات كبيرة (أطراف النجمة)",
        "culturalContext": "الإدراك الهندسي"
    },
    {
        "domain": "Gs",
        "text_ar": "اختر الشكل المطابق: (دائرة حمراء داخل مربع أزرق)",
        "options": ["دائرة زرقاء في مربع أحمر", "دائرة حمراء في مربع أزرق", "مربع أحمر في دائرة زرقاء", "مربع أزرق في دائرة حمراء"],
        "correct": "دائرة حمراء في مربع أزرق",
        "explanation_ar": "المطابقة الدقيقة للوصف",
        "culturalContext": "سرعة المطابقة"
    }
]

existing_questions = [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "domain": "Gf",
      "difficulty": 0.5,
      "discrimination": 1.5,
      "guessing": 0.25,
      "text_ar": "أكمل النمط: 2، 4، 8، 16، ؟",
      "options": ["24", "32", "48", "64"],
      "correct": "32",
      "explanation_ar": "كل رقم هو ضعف الرقم السابق",
      "culturalContext": "الأنماط الرياضية"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "domain": "Gc",
      "difficulty": 0.6,
      "discrimination": 1.3,
      "guessing": 0.25,
      "text_ar": "ما هو المعنى الصحيح لكلمة 'الحكمة'؟",
      "options": ["المال الكثير", "المعرفة والتجربة المجتمعة", "القوة البدنية", "السرعة في العمل"],
      "correct": "المعرفة والتجربة المجتمعة",
      "explanation_ar": "الحكمة تتضمن المعرفة والخبرة والحكم الصحيح",
      "culturalContext": "المفردات العربية الفصحى"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "domain": "Gwm",
      "difficulty": 0.7,
      "discrimination": 1.4,
      "guessing": 0.25,
      "text_ar": "تذكر هذا الترتيب: أحمر، أزرق، أخضر، أصفر. ما الرابع؟",
      "options": ["أحمر", "أزرق", "أصفر", "برتقالي"],
      "correct": "أصفر",
      "explanation_ar": "كان الترتيب: أحمر، أزرق، أخضر، أصفر",
      "culturalContext": "اختبار الذاكرة قصيرة الأجل"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "domain": "Gv",
      "difficulty": 0.55,
      "discrimination": 1.2,
      "guessing": 0.25,
      "text_ar": "أي الأشكال التالية يكمل هذا النمط بشكل صحيح؟",
      "options": ["مربع", "دائرة", "مثلث", "خماسي"],
      "correct": "مربع",
      "explanation_ar": "النمط يتبع تسلسل الأشكال الهندسية",
      "culturalContext": "المعالجة البصرية"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440005",
      "domain": "Gs",
      "difficulty": 0.4,
      "discrimination": 1.1,
      "guessing": 0.25,
      "text_ar": "كم عدد الأحرف في كلمة 'الاستقلال'؟",
      "options": ["8", "9", "10", "11"],
      "correct": "10",
      "explanation_ar": "الاستقلال تحتوي على 10 أحرف",
      "culturalContext": "سرعة المعالجة"
    }
]

final_questions = existing_questions.copy()

for q in new_questions:
    q["id"] = str(uuid.uuid4())
    q["difficulty"] = round(random.uniform(0.3, 0.8), 2)
    q["discrimination"] = round(random.uniform(0.8, 2.0), 2)
    q["guessing"] = 0.25
    final_questions.append(q)

output = {
    "version": "1.1.0",
    "lastUpdated": "2025-11-24T00:00:00Z",
    "questions": final_questions
}

with open('packages/question-bank/src/questions.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Generated {len(final_questions)} questions")
