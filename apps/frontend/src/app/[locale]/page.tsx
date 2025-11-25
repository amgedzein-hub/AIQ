import Link from 'next/link';

// Don't prerender this page - let it be rendered dynamically
export const dynamic = 'force-dynamic';

const DOMAINS = [
  {
    code: 'Gf',
    name: 'الاستدلال السائل',
    desc: 'التفكير المنطقي والاستدلال بالنمط'
  },
  {
    code: 'Gc',
    name: 'الذكاء المتبلور',
    desc: 'المعرفة والمهارات المكتسبة'
  },
  {
    code: 'Gwm',
    name: 'الذاكرة العاملة',
    desc: 'معالجة المعلومات قصيرة الأجل'
  },
  {
    code: 'Gv',
    name: 'المعالجة البصرية',
    desc: 'إدراك المعلومات البصرية والمكانية'
  },
  {
    code: 'Gs',
    name: 'سرعة المعالجة',
    desc: 'سرعة إنجاز المهام المعرفية'
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">
            🧠 منصة اختبار الذكاء العربي
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            اختبار الذكاء العربي المتكيف
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            منصة متطورة للاختبار التكيفي للذكاء بناءً على نظرية CHC
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            اختبر ذكاءك الآن باستخدام تقنيات متقدمة ومحكمة من الذكاء الاصطناعي
          </p>

          {/* Start Test Button */}
          <div className="pt-8">
            <Link
              href="./test"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 text-lg shadow-lg"
            >
              🚀 ابدأ الاختبار الآن
            </Link>
          </div>
        </div>


        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-20">
          <h3 className="text-3xl font-bold text-center text-indigo-700 mb-10">
            ✨ المميزات الرئيسية
          </h3>
          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span>اختبار متكيف باستخدام نظرية الاستجابة للفقرة (IRT)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span>دعم كامل للغة العربية مع التخطيط من اليمين لليسار (RTL)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span>تفسير النتائج بقوة الذكاء الاصطناعي (Claude)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span>تتبع التقدم بشكل فوري وحقيقي</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span>تحليل شامل لمجالات الذكاء الخمسة</span>
            </li>
          </ul>
        </div>

        {/* Domains Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-indigo-700 mb-12">
            🧠 مجالات الذكاء الخمسة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {DOMAINS.map((domain) => (
              <div
                key={domain.code}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition transform"
              >
                <div className="text-4xl mb-3 text-center">
                  {domain.code === 'Gf' && '⚡'}
                  {domain.code === 'Gc' && '📚'}
                  {domain.code === 'Gwm' && '🧠'}
                  {domain.code === 'Gv' && '👁️'}
                  {domain.code === 'Gs' && '⚙️'}
                </div>
                <h4 className="text-lg font-bold text-indigo-700 mb-2 text-center">
                  {domain.name}
                </h4>
                <p className="text-gray-600 text-sm text-center">
                  {domain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl p-10 text-white">
          <h3 className="text-3xl font-bold mb-6 text-center">
            📖 عن الاختبار
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              اختبار الذكاء العربي هو منصة متطورة تستخدم أحدث التقنيات في مجال القياس النفسي والتعليم التكيفي.
            </p>
            <p>
              يعتمد الاختبار على نظرية CHC (Cattell-Horn-Carroll) وتقنية نظرية الاستجابة للفقرة (IRT) لتقديم تجربة اختبار دقيقة وفعالة.
            </p>
            <p>
              يتم تطبيق الذكاء الاصطناعي (Claude) لتقديم تفسيرات مفصلة وموثوقة لنتائجك.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-gray-600">
          <p>© 2024 منصة اختبار الذكاء العربي. جميع الحقوق محفوظة.</p>
        </div>
      </main>
    </div>
  );
}
