import type { Metadata } from 'next';
import GuideRecommendationPanel from '@/components/content/GuideRecommendationPanel';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
import { getGuidesBySlugs } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Split PDF Free - Extract or Separate PDF Pages Online',
    description: 'Free browser-based PDF splitter. Extract selected pages or split every PDF page into separate files.',
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'pdf splitter free'],
  },
  ar: {
    title: 'تقسيم PDF مجاناً - استخراج صفحات PDF أونلاين',
    description: 'أداة مجانية داخل المتصفح لتقسيم PDF أو استخراج صفحات محددة إلى ملف جديد.',
    keywords: ['تقسيم pdf', 'استخراج صفحات pdf', 'فصل صفحات pdf', 'pdf splitter'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'split-pdf',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function SplitPdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.splitPdf' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['practical-pdf-workflows']);

  return (
    <>
      <JsonLd
        id="split-pdf-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'split-pdf',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="split-pdf-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="split-pdf-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'split-pdf' },
        ])}
      />
      <PdfTool mode="splitPdf" />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'متى يكون التقسيم أفضل من الإرسال الكامل؟' : 'When is splitting better than sending the whole PDF?'}
        intro={normalizedLocale === 'ar'
          ? 'يعرض هذا الدليل كيف يساعد التقسيم على التركيز وتقليل المشاركة الزائدة واستخراج الصفحات الصحيحة لكل مستلم.'
          : 'This guide shows how splitting can improve focus, reduce oversharing, and help you send only the pages each recipient actually needs.'}
        guides={guides}
      />
    </>
  );
}
