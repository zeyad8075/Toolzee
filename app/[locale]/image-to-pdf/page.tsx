import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Image to PDF Free – Convert JPG and PNG to PDF Online',
    description: 'Free browser-based image to PDF converter. Combine JPG, PNG, and WebP images into a downloadable PDF.',
    keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'convert images to pdf'],
  },
  ar: {
    title: 'تحويل الصور إلى PDF مجاناً – JPG وPNG إلى PDF',
    description: 'أداة مجانية داخل المتصفح لتحويل صور JPG وPNG وWebP إلى ملف PDF قابل للتنزيل.',
    keywords: ['تحويل الصور إلى pdf', 'jpg to pdf', 'png to pdf', 'صور الى pdf'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'image-to-pdf',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function ImageToPdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'imageToPdf' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        id="image-to-pdf-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'image-to-pdf',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="image-to-pdf-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="image-to-pdf-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'image-to-pdf' },
        ])}
      />
      <ImageToPdfTool />
    </>
  );
}
