import type { Metadata } from 'next';
import GuideRecommendationPanel from '@/components/content/GuideRecommendationPanel';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';
import { getGuidesBySlugs } from '@/lib/guides';
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
  const guides = getGuidesBySlugs(normalizedLocale, ['choose-the-right-image-tool', 'prepare-images-for-web-email-and-pdf']);

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
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'جهّز الصور قبل تحويلها إلى PDF' : 'Prepare the images before turning them into a PDF'}
        intro={normalizedLocale === 'ar'
          ? 'عندما تكون الصور منظفة ومقاسة ومضبوطة التنسيق مسبقاً، يكون ملف PDF النهائي أخف وأسهل في المشاركة. هذه الأدلة تشرح كيف تصل إلى ذلك.'
          : 'When images are cleaned up, sized sensibly, and formatted well first, the final PDF is easier to share. These guides walk through that prep work.'}
        guides={guides}
      />
    </>
  );
}
