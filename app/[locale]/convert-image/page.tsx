import type { Metadata } from 'next';
import GuideRecommendationPanel from '@/components/content/GuideRecommendationPanel';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import ConvertTool from './ConvertTool';
import { getGuidesBySlugs } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Convert Image Online Free – PNG to JPG, WebP Converter',
    description: 'Free browser-based image converter. Convert PNG, JPG, and WebP files quickly without uploading them.',
    keywords: ['convert png to jpg online', 'image converter free', 'png to webp', 'jpg to png converter'],
  },
  ar: {
    title: 'تحويل الصور مجاناً عبر الإنترنت – تحويل PNG وJPG وWebP',
    description: 'أداة مجانية لتحويل الصور داخل المتصفح بين PNG وJPG وWebP بسرعة وبدون رفع الملفات.',
    keywords: ['تحويل الصور اونلاين', 'تحويل png الى jpg', 'تحويل webp', 'محول صور مجاني'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = pageContent[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: 'convert-image',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function ConvertPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'convert' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['choose-the-right-image-tool', 'prepare-images-for-web-email-and-pdf']);

  return (
    <>
      <JsonLd
        id="convert-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'convert-image',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="convert-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="convert-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'convert-image' },
        ])}
      />
      <ConvertTool />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'متى تحوّل الصورة ومتى تفعل شيئاً آخر؟' : 'When should you convert an image instead of doing something else?'}
        intro={normalizedLocale === 'ar'
          ? 'توضح هذه الأدلة الفرق بين التحويل والضغط وتغيير الحجم، وتساعدك على تجهيز الصور للويب والبريد وملفات PDF بشكل أنسب.'
          : 'These guides break down the difference between conversion, compression, and resizing, then walk through practical image-prep decisions for web, email, and PDFs.'}
        guides={guides}
      />
    </>
  );
}
