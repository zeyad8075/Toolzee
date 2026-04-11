import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import WordCounterTool from '@/components/tools/WordCounterTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Word Counter Free – Count Words, Characters, and Reading Time',
    description: 'Free browser-based word counter for checking words, characters, sentences, paragraphs, and estimated reading time.',
    keywords: ['word counter', 'character counter', 'count words online', 'reading time calculator'],
  },
  ar: {
    title: 'عداد الكلمات المجاني – احسب الكلمات والحروف ووقت القراءة',
    description: 'عداد كلمات مجاني داخل المتصفح لحساب الكلمات والحروف والجمل والفقرات ووقت القراءة التقريبي.',
    keywords: ['عداد الكلمات', 'حساب عدد الكلمات', 'عداد الحروف', 'وقت القراءة'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'word-counter',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function WordCounterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'wordCounter' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        id="word-counter-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'word-counter',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="word-counter-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="word-counter-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'word-counter' },
        ])}
      />
      <WordCounterTool />
    </>
  );
}
