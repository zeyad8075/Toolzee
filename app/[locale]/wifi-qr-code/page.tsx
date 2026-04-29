import type { Metadata } from 'next';
import GuideRecommendationPanel from '@/components/content/GuideRecommendationPanel';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import SpecializedQRTool from '@/components/tools/SpecializedQRTool';
import { getGuidesBySlugs } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'WiFi QR Code Generator Free – Share WiFi Without Typing',
    description: 'Create a free WiFi QR code for your network name and password. Download a scannable QR code in your browser.',
    keywords: ['wifi qr code generator', 'wifi qr code', 'share wifi qr', 'wifi password qr code'],
  },
  ar: {
    title: 'مولد QR للواي فاي مجاناً – مشاركة الشبكة بدون كتابة',
    description: 'أنشئ رمز QR مجاني لشبكة الواي فاي وكلمة المرور وقم بتنزيله مباشرة من المتصفح.',
    keywords: ['qr واي فاي', 'مولد qr wifi', 'مشاركة الواي فاي', 'رمز qr للشبكة'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'wifi-qr-code',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function WifiQRCodePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'qrSpecial.wifi' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['qr-code-best-practices']);

  return (
    <>
      <JsonLd
        id="wifi-qr-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'wifi-qr-code',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="wifi-qr-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="wifi-qr-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'wifi-qr-code' },
        ])}
      />
      <SpecializedQRTool variant="wifi" />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'استخدم QR الواي فاي بوضوح وحذر' : 'Use WiFi QR codes clearly and carefully'}
        intro={normalizedLocale === 'ar'
          ? 'إذا كنت ستضع رمز الشبكة في مكتب أو متجر أو فعالية، فهذا الدليل يشرح أفضل الممارسات للوضوح وسهولة المسح والتعامل مع الخصوصية.'
          : 'If you plan to place a network QR code in an office, store, or event, this guide covers scan reliability, clarity, and privacy-minded placement.'}
        guides={guides}
      />
    </>
  );
}
