import type { Metadata } from 'next';
import GuideRecommendationPanel from '@/components/content/GuideRecommendationPanel';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PasswordGeneratorTool from '@/components/tools/PasswordGeneratorTool';
import { getGuidesBySlugs } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Password Generator Free – Create Strong Random Passwords',
    description: 'Free browser-based password generator for creating strong random passwords with numbers, symbols, and custom length.',
    keywords: ['password generator', 'random password generator', 'strong password generator', 'secure password'],
  },
  ar: {
    title: 'مولد كلمات مرور مجاني – أنشئ كلمات مرور قوية',
    description: 'مولد كلمات مرور مجاني داخل المتصفح لإنشاء كلمات عشوائية قوية مع أرقام ورموز وطول مخصص.',
    keywords: ['مولد كلمات مرور', 'كلمة مرور قوية', 'توليد كلمة سر', 'password generator'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'password-generator',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function PasswordGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'passwordGenerator' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['quick-text-checks-and-password-hygiene']);

  return (
    <>
      <JsonLd
        id="password-generator-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'password-generator',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="password-generator-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="password-generator-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'password-generator' },
        ])}
      />
      <PasswordGeneratorTool />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'كلمة المرور القوية تبدأ بالعادات الصحيحة' : 'Strong passwords start with the right habits'}
        intro={normalizedLocale === 'ar'
          ? 'هذا الدليل يركز على الطول والتفرد والتخزين الآمن، حتى لا تتحول كلمة المرور القوية إلى مشكلة استخدام يومية.'
          : 'This guide focuses on length, uniqueness, and safe storage so a strong password also stays practical to use.'}
        guides={guides}
      />
    </>
  );
}
