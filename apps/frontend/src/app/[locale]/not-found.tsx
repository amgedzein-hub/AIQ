import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4"
      dir="rtl"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('metadata.notFound')}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة
          </p>
        </div>

        <Link
          href="./auth/login"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
