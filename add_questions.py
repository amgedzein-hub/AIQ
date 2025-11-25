import json
import uuid

# Load existing questions
with open('packages/question-bank/src/questions.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# New questions to add (50 total: 10 per domain)
new_questions = [
    # Gf (Fluid Reasoning) - 10 questions
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.15,
        "discrimination": 1.2,
        "guessing": 0.25,
        "text_ar": "أكمل النمط: 5، 10، 15، 20، ؟",
        "options": ["22", "25", "30", "35"],
        "correct": "25",
        "explanation_ar": "كل رقم يزيد بمقدار 5",
        "culturalContext": "الأنماط العددية البسيطة"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.28,
        "discrimination": 1.4,
        "guessing": 0.25,
        "text_ar": "إذا كان كل القطط حيوانات، وبعض الحيوانات تطير، فهل كل القطط تطير؟",
        "options": ["نعم", "لا", "ربما", "لا يمكن التحديد"],
        "correct": "لا",
        "explanation_ar": "لا يمكن استنتاج أن كل القطط تطير من المعطيات",
        "culturalContext": "الاستدلال المنطقي"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.45,
        "discrimination": 1.6,
        "guessing": 0.25,
        "text_ar": "أكمل النمط: 1، 4، 9، 16، 25، ؟",
        "options": ["30", "36", "40", "49"],
        "correct": "36",
        "explanation_ar": "مربعات الأعداد: 1²، 2²، 3²، 4²، 5²، 6²",
        "culturalContext": "الأنماط الرياضية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.58,
        "discrimination": 1.7,
        "guessing": 0.25,
        "text_ar": "إذا كان 3 × 4 = 21، و 5 × 6 = 55، فما هو 7 × 8؟",
        "options": ["56", "91", "104", "112"],
        "correct": "104",
        "explanation_ar": "النمط: a×b×2-2. مثال: 7×8×2-8=104",
        "culturalContext": "الاستدلال الرياضي المعقد"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.72,
        "discrimination": 1.8,
        "guessing": 0.25,
        "text_ar": "أكمل المتتالية: 2، 6، 12، 20، 30، ؟",
        "options": ["40", "42", "44", "48"],
        "correct": "42",
        "explanation_ar": "الفروق: 4، 6، 8، 10، 12. كل فرق يزيد بمقدار 2",
        "culturalContext": "المتتاليات الرياضية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.35,
        "discrimination": 1.3,
        "guessing": 0.25,
        "text_ar": "ما العدد الذي لا ينتمي للمجموعة: 2، 4، 6، 9، 10؟",
        "options": ["2", "4", "9", "10"],
        "correct": "9",
        "explanation_ar": "9 هو العدد الوحيد الفردي",
        "culturalContext": "التصنيف المنطقي"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.82,
        "discrimination": 2.0,
        "guessing": 0.25,
        "text_ar": "إذا كان A > B، و B > C، و C > D، و E < C، فأي من التالي صحيح؟",
        "options": ["E > D", "D > E", "A > E", "لا يمكن التحديد"],
        "correct": "لا يمكن التحديد",
        "explanation_ar": "لا نعرف العلاقة بين E و D بدقة",
        "culturalContext": "الاستدلال المنطقي المتقدم"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.20,
        "discrimination": 1.1,
        "guessing": 0.25,
        "text_ar": "أكمل: 10، 20، 30، ؟",
        "options": ["35", "40", "45", "50"],
        "correct": "40",
        "explanation_ar": "كل رقم يزيد بمقدار 10",
        "culturalContext": "الأنماط البسيطة"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.65,
        "discrimination": 1.9,
        "guessing": 0.25,
        "text_ar": "إذا استغرق 5 عمال 5 أيام لبناء 5 جدران، كم يوماً يستغرق 10 عمال لبناء 10 جدران؟",
        "options": ["5 أيام", "10 أيام", "2.5 أيام", "7.5 أيام"],
        "correct": "5 أيام",
        "explanation_ar": "معدل العمل ثابت: عامل واحد يبني جدار في 5 أيام",
        "culturalContext": "حل المسائل الكلامية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gf",
        "difficulty": 0.88,
        "discrimination": 2.1,
        "guessing": 0.25,
        "text_ar": "في سلسلة منطقية: إذا كان P يعني Q، و Q يعني R، و ليس R، فماذا يمكن استنتاجه؟",
        "options": ["P صحيح", "ليس P", "Q صحيح", "لا شيء"],
        "correct": "ليس P",
        "explanation_ar": "بالاستدلال العكسي: ليس R → ليس Q → ليس P",
        "culturalContext": "المنطق الرمزي"
    },
    # Gc (Crystallized Intelligence) - 10 questions
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.12,
        "discrimination": 1.0,
        "guessing": 0.25,
        "text_ar": "ما معنى كلمة 'بيت'؟",
        "options": ["مكان للسكن", "حيوان", "طعام", "لون"],
        "correct": "مكان للسكن",
        "explanation_ar": "البيت هو المسكن",
        "culturalContext": "المفردات الأساسية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.25,
        "discrimination": 1.2,
        "guessing": 0.25,
        "text_ar": "ما هو عكس كلمة 'كبير'؟",
        "options": ["صغير", "طويل", "عريض", "ضخم"],
        "correct": "صغير",
        "explanation_ar": "كبير وصغير متضادان",
        "culturalContext": "الأضداد"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.42,
        "discrimination": 1.5,
        "guessing": 0.25,
        "text_ar": "ما معنى 'الصبر مفتاح الفرج'؟",
        "options": ["الانتظار يجلب الحلول", "الصبر صعب", "المفاتيح مهمة", "الفرج بعيد"],
        "correct": "الانتظار يجلب الحلول",
        "explanation_ar": "مثل عربي يعني أن الصبر يؤدي للنجاح",
        "culturalContext": "الأمثال العربية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.55,
        "discrimination": 1.6,
        "guessing": 0.25,
        "text_ar": "ما معنى كلمة 'استقصاء'؟",
        "options": ["البحث والتحقيق", "الهروب", "الاستسلام", "التجاهل"],
        "correct": "البحث والتحقيق",
        "explanation_ar": "الاستقصاء يعني البحث الدقيق عن المعلومات",
        "culturalContext": "المفردات المتقدمة"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.68,
        "discrimination": 1.7,
        "guessing": 0.25,
        "text_ar": "ما معنى 'الديمقراطية'؟",
        "options": ["حكم الشعب", "حكم الملك", "حكم العسكر", "حكم القضاء"],
        "correct": "حكم الشعب",
        "explanation_ar": "الديمقراطية من الكلمة اليونانية التي تعني حكم الشعب",
        "culturalContext": "المفاهيم السياسية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.78,
        "discrimination": 1.8,
        "guessing": 0.25,
        "text_ar": "ما معنى 'الإبستمولوجيا'؟",
        "options": ["نظرية المعرفة", "علم النفس", "علم الأحياء", "الفلسفة العامة"],
        "correct": "نظرية المعرفة",
        "explanation_ar": "الإبستمولوجيا هي فرع الفلسفة الذي يدرس طبيعة المعرفة",
        "culturalContext": "المصطلحات الفلسفية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.32,
        "discrimination": 1.3,
        "guessing": 0.25,
        "text_ar": "من هو مؤلف 'ألف ليلة وليلة'؟",
        "options": ["مجهول", "طه حسين", "نجيب محفوظ", "المتنبي"],
        "correct": "مجهول",
        "explanation_ar": "ألف ليلة وليلة عمل جماعي من التراث الشعبي",
        "culturalContext": "الثقافة العربية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.85,
        "discrimination": 2.0,
        "guessing": 0.25,
        "text_ar": "ما الفرق بين 'الاستقراء' و 'الاستنباط'؟",
        "options": ["الأول من الخاص للعام والثاني من العام للخاص", "لا فرق بينهما", "الأول أسهل", "الثاني أقدم"],
        "correct": "الأول من الخاص للعام والثاني من العام للخاص",
        "explanation_ar": "الاستقراء يبدأ من الأمثلة للقاعدة، والاستنباط من القاعدة للأمثلة",
        "culturalContext": "المنطق والفلسفة"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.48,
        "discrimination": 1.4,
        "guessing": 0.25,
        "text_ar": "ما هو مرادف 'الجَلَد'؟",
        "options": ["الصبر والتحمل", "الجلد (الغطاء)", "الضرب", "الهروب"],
        "correct": "الصبر والتحمل",
        "explanation_ar": "الجَلَد يعني القدرة على التحمل",
        "culturalContext": "المفردات العربية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gc",
        "difficulty": 0.92,
        "discrimination": 2.2,
        "guessing": 0.25,
        "text_ar": "في البلاغة العربية، ما الفرق بين 'الكناية' و 'المجاز المرسل'؟",
        "options": ["الكناية تلميح والمجاز استعارة بعلاقة غير المشابهة", "لا فرق", "الكناية أصعب", "المجاز أقدم"],
        "correct": "الكناية تلميح والمجاز استعارة بعلاقة غير المشابهة",
        "explanation_ar": "الكناية تعبير غير مباشر، والمجاز المرسل علاقته غير المشابهة",
        "culturalContext": "البلاغة العربية"
    },
    # Gwm (Working Memory) - 10 questions
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.18,
        "discrimination": 1.1,
        "guessing": 0.25,
        "text_ar": "تذكر: 3، 7. ما هو الأول؟",
        "options": ["3", "7", "4", "10"],
        "correct": "3",
        "explanation_ar": "الرقم الأول في القائمة هو 3",
        "culturalContext": "الذاكرة قصيرة المدى"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.30,
        "discrimination": 1.3,
        "guessing": 0.25,
        "text_ar": "احسب في رأسك: 8 + 5",
        "options": ["12", "13", "14", "15"],
        "correct": "13",
        "explanation_ar": "8 + 5 = 13",
        "culturalContext": "الحساب الذهني البسيط"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.44,
        "discrimination": 1.5,
        "guessing": 0.25,
        "text_ar": "تذكر الترتيب: قلم، كتاب، مفتاح، ساعة. ما هو الثالث؟",
        "options": ["قلم", "كتاب", "مفتاح", "ساعة"],
        "correct": "مفتاح",
        "explanation_ar": "الترتيب: قلم (1)، كتاب (2)، مفتاح (3)، ساعة (4)",
        "culturalContext": "الذاكرة التسلسلية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.58,
        "discrimination": 1.6,
        "guessing": 0.25,
        "text_ar": "احسب: (12 + 8) - 5",
        "options": ["13", "14", "15", "16"],
        "correct": "15",
        "explanation_ar": "12 + 8 = 20، ثم 20 - 5 = 15",
        "culturalContext": "الحساب الذهني متعدد الخطوات"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.70,
        "discrimination": 1.7,
        "guessing": 0.25,
        "text_ar": "تذكر الأرقام بالعكس: 4، 8، 2، 9. ما هو الترتيب العكسي؟",
        "options": ["9، 2، 8، 4", "4، 8، 2، 9", "9، 8، 2، 4", "2، 4، 8، 9"],
        "correct": "9، 2، 8، 4",
        "explanation_ar": "عكس الترتيب من الآخر للأول",
        "culturalContext": "الذاكرة العكسية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.38,
        "discrimination": 1.4,
        "guessing": 0.25,
        "text_ar": "إذا كان اليوم الأربعاء، ما اليوم بعد يومين؟",
        "options": ["الخميس", "الجمعة", "السبت", "الأحد"],
        "correct": "الجمعة",
        "explanation_ar": "الأربعاء + 2 = الجمعة",
        "culturalContext": "الاستدلال الزمني"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.82,
        "discrimination": 1.9,
        "guessing": 0.25,
        "text_ar": "احسب: (25 - 7) × 2 + 6",
        "options": ["40", "42", "44", "46"],
        "correct": "42",
        "explanation_ar": "25 - 7 = 18، 18 × 2 = 36، 36 + 6 = 42",
        "culturalContext": "الحساب الذهني المعقد"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.22,
        "discrimination": 1.2,
        "guessing": 0.25,
        "text_ar": "تذكر: أحمد، فاطمة، علي. من الثاني؟",
        "options": ["أحمد", "فاطمة", "علي", "لا أحد"],
        "correct": "فاطمة",
        "explanation_ar": "الترتيب: أحمد (1)، فاطمة (2)، علي (3)",
        "culturalContext": "ذاكرة الأسماء"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.65,
        "discrimination": 1.8,
        "guessing": 0.25,
        "text_ar": "رتب الأحرف أبجدياً في رأسك: د، أ، ج، ب. ما الترتيب؟",
        "options": ["أ، ب، ج، د", "د، ج، ب، أ", "ب، أ، د، ج", "أ، د، ب، ج"],
        "correct": "أ، ب، ج، د",
        "explanation_ar": "الترتيب الأبجدي الصحيح",
        "culturalContext": "الترتيب الذهني"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gwm",
        "difficulty": 0.90,
        "discrimination": 2.1,
        "guessing": 0.25,
        "text_ar": "تذكر واعكس: 7، 3، 9، 1، 5. ثم اجمع الأول والأخير من الترتيب العكسي",
        "options": ["10", "12", "14", "8"],
        "correct": "12",
        "explanation_ar": "العكس: 5، 1، 9، 3، 7. الأول (5) + الأخير (7) = 12",
        "culturalContext": "الذاكرة العاملة المعقدة"
    },
    # Gv (Visual Processing) - 10 questions
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.16,
        "discrimination": 1.0,
        "guessing": 0.25,
        "text_ar": "كم عدد أضلاع المثلث؟",
        "options": ["2", "3", "4", "5"],
        "correct": "3",
        "explanation_ar": "المثلث له 3 أضلاع",
        "culturalContext": "الأشكال الهندسية الأساسية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.28,
        "discrimination": 1.2,
        "guessing": 0.25,
        "text_ar": "أي شكل له 4 أضلاع متساوية وزوايا قائمة؟",
        "options": ["مثلث", "مربع", "دائرة", "خماسي"],
        "correct": "مربع",
        "explanation_ar": "المربع له 4 أضلاع متساوية و4 زوايا قائمة",
        "culturalContext": "الأشكال الهندسية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.42,
        "discrimination": 1.4,
        "guessing": 0.25,
        "text_ar": "إذا طويت ورقة مربعة من المنتصف، ما الشكل الناتج؟",
        "options": ["مثلث", "مستطيل", "دائرة", "مربع أصغر"],
        "correct": "مستطيل",
        "explanation_ar": "طي المربع من المنتصف ينتج مستطيل",
        "culturalContext": "الطي الذهني"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.56,
        "discrimination": 1.6,
        "guessing": 0.25,
        "text_ar": "كم عدد المكعبات في بناء من 3 طوابق (3×3×3)؟",
        "options": ["9", "18", "27", "36"],
        "correct": "27",
        "explanation_ar": "3 × 3 × 3 = 27 مكعب",
        "culturalContext": "التصور المكاني"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.68,
        "discrimination": 1.7,
        "guessing": 0.25,
        "text_ar": "إذا نظرت لمكعب من الأعلى، ماذا ترى؟",
        "options": ["دائرة", "مربع", "مثلث", "مستطيل"],
        "correct": "مربع",
        "explanation_ar": "المنظر العلوي للمكعب هو مربع",
        "culturalContext": "المنظور المكاني"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.75,
        "discrimination": 1.8,
        "guessing": 0.25,
        "text_ar": "كم وجه مرئي في مكعب من زاوية معينة؟",
        "options": ["1", "2", "3", "4"],
        "correct": "3",
        "explanation_ar": "من أي زاوية، يمكن رؤية 3 وجوه كحد أقصى",
        "culturalContext": "الإدراك المكاني"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.35,
        "discrimination": 1.3,
        "guessing": 0.25,
        "text_ar": "أي الأشكال يمكن رسمه بدون رفع القلم؟",
        "options": ["مربع", "نجمة خماسية", "حرف X", "كلها"],
        "correct": "كلها",
        "explanation_ar": "جميع هذه الأشكال يمكن رسمها بخط متصل",
        "culturalContext": "الرسم المتصل"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.84,
        "discrimination": 2.0,
        "guessing": 0.25,
        "text_ar": "إذا قطعت مكعب بمستوى قطري، ما شكل المقطع؟",
        "options": ["مربع", "مستطيل", "مثلث", "سداسي"],
        "correct": "مستطيل",
        "explanation_ar": "القطع القطري للمكعب ينتج مستطيل",
        "culturalContext": "المقاطع الهندسية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.48,
        "discrimination": 1.5,
        "guessing": 0.25,
        "text_ar": "كم عدد المثلثات في شكل نجمة داوود (سداسية)؟",
        "options": ["2", "6", "8", "12"],
        "correct": "12",
        "explanation_ar": "نجمة داوود تحتوي على 12 مثلث صغير",
        "culturalContext": "عد الأشكال"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gv",
        "difficulty": 0.92,
        "discrimination": 2.2,
        "guessing": 0.25,
        "text_ar": "في إسقاط متساوي القياس، كيف تظهر الزوايا القائمة؟",
        "options": ["90 درجة", "120 درجة", "60 درجة", "تختلف"],
        "correct": "120 درجة",
        "explanation_ar": "في الإسقاط الأيزومتري، الزوايا القائمة تظهر 120 درجة",
        "culturalContext": "الإسقاط الهندسي"
    },
    # Gs (Processing Speed) - 10 questions
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.14,
        "discrimination": 0.9,
        "guessing": 0.25,
        "text_ar": "أي رقم أكبر: 5 أم 3؟",
        "options": ["5", "3", "متساويان", "لا يمكن التحديد"],
        "correct": "5",
        "explanation_ar": "5 أكبر من 3",
        "culturalContext": "المقارنة البسيطة"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.24,
        "discrimination": 1.1,
        "guessing": 0.25,
        "text_ar": "كم حرف في كلمة 'كتاب'؟",
        "options": ["3", "4", "5", "6"],
        "correct": "4",
        "explanation_ar": "ك-ت-ا-ب = 4 أحرف",
        "culturalContext": "عد الأحرف"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.36,
        "discrimination": 1.3,
        "guessing": 0.25,
        "text_ar": "أوجد الرقم المختلف: 11، 13، 15، 18",
        "options": ["11", "13", "15", "18"],
        "correct": "18",
        "explanation_ar": "18 هو الرقم الزوجي الوحيد",
        "culturalContext": "التمييز السريع"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.48,
        "discrimination": 1.4,
        "guessing": 0.25,
        "text_ar": "كم عدد الكلمات: 'الذكاء الاصطناعي مفيد'؟",
        "options": ["2", "3", "4", "5"],
        "correct": "3",
        "explanation_ar": "الذكاء - الاصطناعي - مفيد = 3 كلمات",
        "culturalContext": "عد الكلمات"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.58,
        "discrimination": 1.5,
        "guessing": 0.25,
        "text_ar": "أي كلمة لا تبدأ بحرف 'أ': أحمد، علي، أمل، أسامة؟",
        "options": ["أحمد", "علي", "أمل", "أسامة"],
        "correct": "علي",
        "explanation_ar": "علي يبدأ بحرف 'ع' وليس 'أ'",
        "culturalContext": "التمييز الإملائي"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.32,
        "discrimination": 1.2,
        "guessing": 0.25,
        "text_ar": "أي رقم يقبل القسمة على 5: 12، 15، 17، 19؟",
        "options": ["12", "15", "17", "19"],
        "correct": "15",
        "explanation_ar": "15 ÷ 5 = 3",
        "culturalContext": "القسمة السريعة"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.68,
        "discrimination": 1.6,
        "guessing": 0.25,
        "text_ar": "كم عدد حروف العلة في: 'التعليم'؟",
        "options": ["2", "3", "4", "5"],
        "correct": "3",
        "explanation_ar": "ا - ي - ي = 3 حروف علة",
        "culturalContext": "تحليل الكلمات"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.42,
        "discrimination": 1.4,
        "guessing": 0.25,
        "text_ar": "أي عدد أولي: 4، 6، 7، 8؟",
        "options": ["4", "6", "7", "8"],
        "correct": "7",
        "explanation_ar": "7 عدد أولي (يقبل القسمة على نفسه و1 فقط)",
        "culturalContext": "الأعداد الأولية"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.76,
        "discrimination": 1.7,
        "guessing": 0.25,
        "text_ar": "كم كلمة تحتوي على 'ال' التعريف: 'الكتاب على الطاولة في البيت'؟",
        "options": ["2", "3", "4", "5"],
        "correct": "3",
        "explanation_ar": "الكتاب - الطاولة - البيت = 3 كلمات",
        "culturalContext": "التحليل اللغوي السريع"
    },
    {
        "id": str(uuid.uuid4()),
        "domain": "Gs",
        "difficulty": 0.88,
        "discrimination": 1.9,
        "guessing": 0.25,
        "text_ar": "في النص 'العلم نور والجهل ظلام'، كم حرف 'ل'؟",
        "options": ["3", "4", "5", "6"],
        "correct": "6",
        "explanation_ar": "العلم (ل+ل) + الجهل (ل+ل) + ظلام (ل+ل) = 6 أحرف",
        "culturalContext": "عد الأحرف المتقدم"
    }
]

# Add new questions to existing data
data['questions'].extend(new_questions)

# Update metadata
data['version'] = '1.2.0'
data['lastUpdated'] = '2025-11-26T00:00:00Z'

# Save updated file
with open('packages/question-bank/src/questions.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully added {len(new_questions)} questions!")
print(f"Total questions now: {len(data['questions'])}")
