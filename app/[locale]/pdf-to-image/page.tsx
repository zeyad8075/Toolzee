import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'PDF to Image Free - Convert PDF Pages to PNG Online',
    description: 'Free browser-based PDF to image converter. Convert PDF pages into PNG images and download them as a ZIP file.',
    keywords: ['pdf to image', 'pdf to png', 'convert pdf to images', 'pdf image converter'],
  },
  ar: {
    title: 'تحويل PDF إلى صور مجاناً - صفحات PDF إلى PNG',
    description: 'أداة مجانية داخل المتصفح لتحويل صفحات PDF إلى صور PNG وتنزيلها في ملف ZIP.',
    keywords: ['تحويل pdf الى صور', 'pdf to png', 'pdf الى png', 'تحويل صفحات pdf'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'pdf-to-image',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function PdfToImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.pdfToImage' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        id="pdf-to-image-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'pdf-to-image',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="pdf-to-image-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="pdf-to-image-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'pdf-to-image' },
        ])}
      />
      <PdfTool mode="pdfToImage" />
    </>
  );
}
