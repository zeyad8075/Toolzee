import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Remove Pages from PDF Free Online',
    description: 'Delete selected pages from a PDF in your browser and download a clean PDF copy.',
    keywords: ['remove pages from pdf', 'delete pdf pages', 'remove pdf pages online', 'pdf page remover'],
  },
  ar: {
    title: 'حذف صفحات من PDF مجاناً أونلاين',
    description: 'احذف صفحات محددة من ملف PDF داخل المتصفح ونزّل نسخة نظيفة من الملف.',
    keywords: ['حذف صفحات pdf', 'ازالة صفحات من pdf', 'حذف صفحة من pdf', 'pdf page remover'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'remove-pdf-pages',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function RemovePdfPagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.removePdfPages' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd id="remove-pdf-pages-tool-schema" data={buildToolSchema({ locale: normalizedLocale, path: 'remove-pdf-pages', name: t('title'), description: page.description, applicationCategory: 'UtilitiesApplication' })} />
      <JsonLd id="remove-pdf-pages-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd id="remove-pdf-pages-breadcrumb-schema" data={buildBreadcrumbSchema(normalizedLocale, [{ name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' }, { name: t('title'), path: 'remove-pdf-pages' }])} />
      <PdfTool mode="removePdfPages" />
    </>
  );
}
