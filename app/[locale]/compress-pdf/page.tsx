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
    title: 'Compress PDF Free - Reduce PDF File Size Online',
    description: 'Free browser-based PDF optimizer. Re-save PDF files with compact object streams and download the optimized PDF.',
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor online', 'compress pdf free'],
  },
  ar: {
    title: 'ضغط PDF مجاناً - تقليل حجم ملف PDF أونلاين',
    description: 'أداة مجانية داخل المتصفح لتحسين ملف PDF وإعادة حفظه بصيغة أكثر ضغطاً عند الإمكان.',
    keywords: ['ضغط pdf', 'تقليل حجم pdf', 'تصغير ملف pdf', 'pdf compressor'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'compress-pdf',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function CompressPdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.compressPdf' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['practical-pdf-workflows']);

  return (
    <>
      <JsonLd
        id="compress-pdf-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'compress-pdf',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="compress-pdf-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="compress-pdf-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'compress-pdf' },
        ])}
      />
      <PdfTool mode="compressPdf" />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'افهم المقايضات قبل ضغط PDF' : 'Understand the tradeoffs before you compress a PDF'}
        intro={normalizedLocale === 'ar'
          ? 'إذا كان هدفك هو المشاركة الأسهل لا أصغر ملف ممكن بأي ثمن، فهذا الدليل يوضح كيف تفكر في الضغط وحدوده العملية.'
          : 'If your goal is easier sharing instead of chasing the tiniest possible file, this guide explains how to think about compression and its practical limits.'}
        guides={guides}
      />
    </>
  );
}
