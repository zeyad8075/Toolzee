import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';
import RemoveBackgroundTool from './RemoveBackgroundTool';

const pageContent = {
  en: {
    title: 'Remove Image Background Online Free - Transparent PNG Preview',
    description: 'Remove image backgrounds in your browser, preview the transparent result, and download a PNG without uploading your image.',
    keywords: ['remove background online free', 'transparent png maker', 'background remover', 'remove image background'],
  },
  ar: {
    title: 'إزالة خلفية الصور مجاناً أونلاين - معاينة وتنزيل PNG شفاف',
    description: 'أزل خلفية الصورة داخل المتصفح، عاين النتيجة الشفافة، ونزّل ملف PNG دون رفع صورتك.',
    keywords: ['إزالة خلفية الصورة', 'ازالة الخلفية اونلاين', 'صورة png شفافة', 'حذف خلفية الصور'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'remove-background',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function RemoveBackgroundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'removeBackground' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        id="remove-background-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'remove-background',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="remove-background-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="remove-background-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'remove-background' },
        ])}
      />
      <RemoveBackgroundTool />
    </>
  );
}
