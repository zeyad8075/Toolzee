import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
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
    </>
  );
}
