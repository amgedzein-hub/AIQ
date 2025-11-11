'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        router.push('/ar/test');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🔐</h1>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('common.login')}
          </h2>
          <p className="text-gray-600 mt-2">{t('auth.have_account')}</p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              📧 {t('auth.email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-right"
              placeholder="your@email.com"
              dir="ltr"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              🔑 {t('auth.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4"
            />
            <label htmlFor="remember" className="mr-2 text-sm text-gray-600">
              {t('auth.remember_me')}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 text-lg"
          >
            {loading ? '⏳ ' + t('common.loading') : '✅ ' + t('common.login')}
          </button>
        </form>

        <div className="mt-6 border-t pt-6">
          <p className="text-center text-gray-600">
            {t('auth.dont_have_account')}
            <a
              href="./signup"
              className="text-indigo-600 hover:text-indigo-700 font-bold mr-1"
            >
              {t('auth.create_account')}
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <a href="../" className="text-gray-500 hover:text-gray-700 text-sm">
            ← العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}
