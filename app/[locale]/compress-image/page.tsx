import type { Metadata } from 'next';
import GuideRecommendationPanel from '@/components/content/GuideRecommendationPanel';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import CompressTool from './CompressTool';
import { getGuidesBySlugs } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Compress Image Online Free – Reduce File Size Without Losing Quality',
    description: 'Free browser-based image compressor. Reduce JPG, PNG, WebP, and GIF file size without uploading your image.',
    keywords: ['compress image online free', 'reduce image size without losing quality', 'compress image to 100kb', 'image compressor'],
  },
  ar: {
    title: 'ضغط الصور مجاناً عبر الإنترنت – تقليل حجم الصورة بدون فقدان ملحوظ للجودة',
    description: 'أداة مجانية لضغط الصور داخل المتصفح. قلّل حجم JPG وPNG وWebP وGIF بدون رفع ملفاتك.',
    keywords: ['ضغط الصور اونلاين', 'تقليل حجم الصورة', 'ضغط jpg', 'ضغط png'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = pageContent[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: 'compress-image',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function CompressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'compress' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['choose-the-right-image-tool', 'prepare-images-for-web-email-and-pdf']);

  return (
    <>
      <JsonLd
        id="compress-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'compress-image',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="compress-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="compress-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'compress-image' },
        ])}
      />
      <CompressTool />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'دليلان مفيدان قبل ضغط الصور' : 'Useful guides before you compress images'}
        intro={normalizedLocale === 'ar'
          ? 'إذا كنت متردداً بين الضغط وتغيير الحجم والتحويل، أو كنت تجهز صوراً للنشر أو البريد، فهذه الأدلة تشرح متى تختار كل مسار.'
          : 'If you are deciding between compression, resizing, conversion, or general image prep, these guides explain when each workflow makes sense.'}
        guides={guides}
      />
    </>
  );
}
