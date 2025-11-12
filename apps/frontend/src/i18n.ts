import { getRequestConfig } from 'next-intl/server';

const locales = ['ar', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Provide default locale if not found
  const validLocale = locales.includes(locale) ? locale : 'ar';

  return {
    locale: validLocale,
    messages: (
      await import(`./messages/${validLocale}.json`)
    ).default
  };
});
