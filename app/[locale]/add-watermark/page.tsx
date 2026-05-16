import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import PdfTool from '@/components/tools/PdfTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Add Watermark to PDF Free Online',
    description: 'Add a text watermark to every PDF page in your browser and download a watermarked copy.',
    keywords: ['add watermark to pdf', 'pdf watermark', 'watermark pdf online', 'stamp pdf'],
  },
  ar: {
    title: 'إضافة علامة مائية إلى PDF مجاناً',
    description: 'أضف علامة مائية نصية إلى صفحات PDF داخل المتصفح ونزّل نسخة بعلامة واضحة.',
    keywords: ['إضافة علامة مائية pdf', 'علامة مائية pdf', 'ختم pdf', 'watermark pdf'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'add-watermark',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function AddWatermarkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'pdfTools.addWatermark' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd id="add-watermark-tool-schema" data={buildToolSchema({ locale: normalizedLocale, path: 'add-watermark', name: t('title'), description: page.description, applicationCategory: 'UtilitiesApplication' })} />
      <JsonLd id="add-watermark-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd id="add-watermark-breadcrumb-schema" data={buildBreadcrumbSchema(normalizedLocale, [{ name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' }, { name: t('title'), path: 'add-watermark' }])} />
      <PdfTool mode="addWatermark" />
    </>
  );
}
