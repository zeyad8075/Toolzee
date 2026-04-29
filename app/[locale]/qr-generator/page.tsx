import type { Metadata } from 'next';
import GuideRecommendationPanel from '@/components/content/GuideRecommendationPanel';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import QRTool from './QRTool';
import { getGuidesBySlugs } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'QR Code Generator Free – Create QR Codes Instantly',
    description: 'Free QR code generator that runs in your browser. Create QR codes for URLs or text and download them instantly.',
    keywords: ['generate qr code free', 'qr code generator', 'free qr code maker', 'create qr code online'],
  },
  ar: {
    title: 'مولد QR مجاني – أنشئ رموز QR فوراً',
    description: 'مولد QR مجاني يعمل داخل المتصفح. أنشئ رموز QR للروابط أو النصوص وقم بتنزيلها مباشرة.',
    keywords: ['مولد qr', 'انشاء qr', 'رمز qr مجاني', 'qr code arabic'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = pageContent[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: 'qr-generator',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function QRPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'qr' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['qr-code-best-practices']);

  return (
    <>
      <JsonLd
        id="qr-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'qr-generator',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="qr-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="qr-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'qr-generator' },
        ])}
      />
      <QRTool />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'قبل مشاركة رمز QR' : 'Before you share the QR code'}
        intro={normalizedLocale === 'ar'
          ? 'هذا الدليل يركز على الوضوح والتباين والحجم المناسب واختيار نوع المحتوى الذي يجعل الرمز أسهل في المسح والفهم.'
          : 'This guide focuses on contrast, sizing, context, and payload choices that make a QR code easier to scan and understand.'}
        guides={guides}
      />
    </>
  );
}
