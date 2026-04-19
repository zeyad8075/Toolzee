import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Merge PDF Free - Combine PDF Files Online',
    description: 'Free browser-based PDF merger. Combine multiple PDF files into one downloadable PDF without creating an account.',
    keywords: ['merge pdf', 'combine pdf files', 'pdf merger online', 'merge pdf free'],
  },
  ar: {
    title: 'دمج ملفات PDF مجاناً - اجمع ملفات PDF أونلاين',
    description: 'أداة مجانية داخل المتصفح لدمج عدة ملفات PDF في ملف واحد قابل للتنزيل دون إنشاء حساب.',
    keywords: ['دمج pdf', 'دمج ملفات pdf', 'جمع ملفات pdf', 'pdf merger'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'merge-pdf',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function MergePdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.mergePdf' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        id="merge-pdf-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'merge-pdf',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="merge-pdf-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="merge-pdf-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'merge-pdf' },
        ])}
      />
      <PdfTool mode="mergePdf" />
    </>
  );
}
