import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Rotate PDF Free - Turn PDF Pages Online',
    description: 'Free browser-based PDF rotator. Rotate all pages or selected pages and download a corrected PDF.',
    keywords: ['rotate pdf', 'rotate pdf pages', 'turn pdf online', 'pdf rotator free'],
  },
  ar: {
    title: 'تدوير PDF مجاناً - تدوير صفحات PDF أونلاين',
    description: 'أداة مجانية داخل المتصفح لتدوير كل صفحات PDF أو صفحات محددة وتنزيل نسخة مصححة.',
    keywords: ['تدوير pdf', 'تدوير صفحات pdf', 'لف pdf', 'pdf rotator'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'rotate-pdf',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function RotatePdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.rotatePdf' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd id="rotate-pdf-tool-schema" data={buildToolSchema({ locale: normalizedLocale, path: 'rotate-pdf', name: t('title'), description: page.description, applicationCategory: 'UtilitiesApplication' })} />
      <JsonLd id="rotate-pdf-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd id="rotate-pdf-breadcrumb-schema" data={buildBreadcrumbSchema(normalizedLocale, [{ name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' }, { name: t('title'), path: 'rotate-pdf' }])} />
      <PdfTool mode="rotatePdf" />
    </>
  );
}
