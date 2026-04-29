import type { Metadata } from 'next';
import GuideRecommendationPanel from '@/components/content/GuideRecommendationPanel';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import ResizeTool from './ResizeTool';
import { getGuidesBySlugs } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Resize Image Online Free – Change Image Dimensions Instantly',
    description: 'Free browser-based image resizer. Resize images to exact dimensions or percentages without uploading them.',
    keywords: ['resize image online', 'change image size', 'image resizer free', 'resize photo online'],
  },
  ar: {
    title: 'تغيير حجم الصور مجاناً عبر الإنترنت – تعديل الأبعاد فوراً',
    description: 'أداة مجانية لتغيير حجم الصور داخل المتصفح إلى أبعاد دقيقة أو نسب مئوية بدون رفع الملفات.',
    keywords: ['تغيير حجم الصورة', 'مغير حجم الصور', 'تعديل ابعاد الصورة', 'resize image arabic'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = pageContent[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: 'resize-image',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function ResizePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'resize' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['choose-the-right-image-tool', 'prepare-images-for-web-email-and-pdf']);

  return (
    <>
      <JsonLd
        id="resize-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'resize-image',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="resize-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="resize-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'resize-image' },
        ])}
      />
      <ResizeTool />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'قبل تغيير الأبعاد' : 'Before you resize the image'}
        intro={normalizedLocale === 'ar'
          ? 'إذا كنت غير متأكد مما إذا كانت المشكلة في الأبعاد أم في حجم الملف أو في التنسيق نفسه، فهذه الأدلة تساعدك على اتخاذ القرار بسرعة.'
          : 'If you are not sure whether the problem is dimensions, file size, or format, these guides help you make that call quickly.'}
        guides={guides}
      />
    </>
  );
}
