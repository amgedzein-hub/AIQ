import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'منصة اختبار الذكاء العربي',
  description: 'اختبار متكيف للذكاء مدعوم بالذكاء الاصطناعي',
  keywords: ['اختبار الذكاء', 'عربي', 'ذكاء', 'اختبار تكيفي'],
};

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Default to English locale for root layout
  // Locale-specific routing is handled by [locale] directory
  const locale = 'en';
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-noto ${locale === 'ar' ? 'font-amiri' : ''}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
