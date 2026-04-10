import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import AITools from './AITools';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Text & Image Tools – Free Online Tools',
    description: 'Browser-based image enhancement plus AI text generation when you need help drafting content.',
    keywords: ['image enhancer online', 'ai text generator', 'free online tools'],
  },
  ar: {
    title: 'أدوات النصوص والصور – أدوات مجانية عبر الإنترنت',
    description: 'تحسين صور داخل المتصفح مع توليد نصوص بالذكاء الاصطناعي عند الحاجة.',
    keywords: ['تحسين الصور', 'مولد نصوص بالذكاء الاصطناعي', 'ادوات مجانية اونلاين'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = pageContent[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: 'ai-tools',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function AIPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'ai' });

  return (
    <>
      <JsonLd
        id="ai-tools-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'ai-tools',
          name: t('title'),
          description: page.description,
          applicationCategory: 'BusinessApplication',
        })}
      />
      <JsonLd
        id="ai-tools-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'ai-tools' },
        ])}
      />
      <AITools />
    </>
  );
}
