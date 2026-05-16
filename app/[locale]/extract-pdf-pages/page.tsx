import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Extract PDF Pages Free Online',
    description: 'Extract selected PDF pages into a new downloadable PDF directly in your browser.',
    keywords: ['extract pdf pages', 'save pdf pages', 'extract pages from pdf', 'pdf page extractor'],
  },
  ar: {
    title: 'استخراج صفحات PDF مجاناً أونلاين',
    description: 'استخرج صفحات محددة من PDF في ملف جديد قابل للتنزيل مباشرة داخل المتصفح.',
    keywords: ['استخراج صفحات pdf', 'حفظ صفحات pdf', 'استخراج صفحة من pdf', 'pdf extractor'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'extract-pdf-pages',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function ExtractPdfPagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.extractPdfPages' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd id="extract-pdf-pages-tool-schema" data={buildToolSchema({ locale: normalizedLocale, path: 'extract-pdf-pages', name: t('title'), description: page.description, applicationCategory: 'UtilitiesApplication' })} />
      <JsonLd id="extract-pdf-pages-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd id="extract-pdf-pages-breadcrumb-schema" data={buildBreadcrumbSchema(normalizedLocale, [{ name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' }, { name: t('title'), path: 'extract-pdf-pages' }])} />
      <PdfTool mode="extractPdfPages" />
    </>
  );
}
