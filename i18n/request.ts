import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !['en', 'ar'].includes(locale)) {
    // Try to detect from Accept-Language header
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language') || '';
    locale = acceptLanguage.includes('ar') ? 'ar' : 'en';
  }

  return {
    locale,
    messages: (await import(`../translations/${locale}.json`)).default,
  };
});
