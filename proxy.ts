import createMiddleware from 'next-intl/middleware';

const intlProxy = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default intlProxy;

export const config = {
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
};
