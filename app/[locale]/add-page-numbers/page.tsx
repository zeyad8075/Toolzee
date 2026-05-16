import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Add Page Numbers to PDF Free Online',
    description: 'Add page numbers to a PDF in your browser and download a numbered copy.',
    keywords: ['add page numbers to pdf', 'number pdf pages', 'pdf page numbering', 'add pages numbers online'],
  },
  ar: {
    title: 'إضافة أرقام الصفحات إلى PDF مجاناً',
    description: 'أضف أرقام الصفحات إلى ملف PDF داخل المتصفح ونزّل نسخة مرقمة.',
    keywords: ['إضافة أرقام الصفحات pdf', 'ترقيم صفحات pdf', 'رقم صفحات pdf', 'page numbers pdf'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'add-page-numbers',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function AddPageNumbersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.addPageNumbers' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd id="add-page-numbers-tool-schema" data={buildToolSchema({ locale: normalizedLocale, path: 'add-page-numbers', name: t('title'), description: page.description, applicationCategory: 'UtilitiesApplication' })} />
      <JsonLd id="add-page-numbers-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd id="add-page-numbers-breadcrumb-schema" data={buildBreadcrumbSchema(normalizedLocale, [{ name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' }, { name: t('title'), path: 'add-page-numbers' }])} />
      <PdfTool mode="addPageNumbers" />
    </>
  );
}
