import Link from 'next/link';

// Don't prerender this page - let it be rendered dynamically
export const dynamic = 'force-dynamic';

const DOMAINS = [
  {
    code: 'Gf',
    name: 'الاستدلال السائل',
    desc: 'التفكير المنطقي والاستدلال بالنمط',
    icon: '⚡',
    color: 'from-amber-400 to-orange-500'
  },
  {
    code: 'Gc',
    name: 'الذكاء المتبلور',
    desc: 'المعرفة والمهارات المكتسبة',
    icon: '📚',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    code: 'Gwm',
    name: 'الذاكرة العاملة',
    desc: 'معالجة المعلومات قصيرة الأجل',
    icon: '🧠',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    code: 'Gv',
    name: 'المعالجة البصرية',
    desc: 'إدراك المعلومات البصرية والمكانية',
    icon: '👁️',
    color: 'from-purple-400 to-pink-500'
  },
  {
    code: 'Gs',
    name: 'سرعة المعالجة',
    desc: 'سرعة إنجاز المهام المعرفية',
    icon: '⚙️',
    color: 'from-red-400 to-rose-500'
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50" dir="rtl">
      {/* Header/Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-float">🧠</span>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              منصة اختبار الذكاء العربي
            </h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-32">
        {/* Hero Section */}
        <div className="text-center space-y-8 animate-fade-in-up">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4 border border-primary-100">
            ✨ الإصدار الجديد 2.0
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
            اكتشف قدراتك العقلية
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 mt-2">
              بدقة علمية متناهية
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            منصة متطورة للاختبار التكيفي للذكاء بناءً على نظرية CHC، تجمع بين دقة القياس النفسي وقوة الذكاء الاصطناعي.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="./test"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                🚀 ابدأ الاختبار الآن
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
            <a href="#features" className="text-slate-600 hover:text-primary-600 font-medium transition-colors px-6 py-4">
              معرفة المزيد ↓
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl hover:border-primary-200 transition-colors duration-300 delay-100 animate-fade-in-up">
            <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🎯
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">اختبار متكيف ذكي</h3>
            <p className="text-slate-600">
              يستخدم خوارزميات IRT المتقدمة لتكييف صعوبة الأسئلة مع مستوى أدائك بدقة عالية.
            </p>
          </div>
          <div className="glass-card p-8 rounded-3xl hover:border-secondary-200 transition-colors duration-300 delay-200 animate-fade-in-up">
            <div className="w-14 h-14 bg-secondary-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🤖
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">تحليل بالذكاء الاصطناعي</h3>
            <p className="text-slate-600">
              احصل على تقرير مفصل وشامل يفسر نتائجك ونقاط قوتك باستخدام تقنيات Claude AI.
            </p>
          </div>
          <div className="glass-card p-8 rounded-3xl hover:border-emerald-200 transition-colors duration-300 delay-300 animate-fade-in-up">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🌍
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">معايير عالمية</h3>
            <p className="text-slate-600">
              مبني على أحدث النظريات العلمية (CHC) لضمان دقة وموثوقية النتائج.
            </p>
          </div>
        </div>

        {/* Domains Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-[3rem] -m-8" />
          <div className="relative">
            <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
              مجالات الذكاء الخمسة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {DOMAINS.map((domain, index) => (
                <div
                  key={domain.code}
                  className="glass p-6 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${domain.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {domain.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 text-center">
                    {domain.name}
                  </h4>
                  <p className="text-slate-500 text-sm text-center leading-relaxed">
                    {domain.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-12 pb-8 text-center">
          <p className="text-slate-500 font-medium">
            © 2024 منصة اختبار الذكاء العربي. جميع الحقوق محفوظة.
          </p>
        </footer>
      </main>
    </div>
  );
}
