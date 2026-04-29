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
    title: 'WhatsApp QR Code Generator Free – Create Chat QR Codes',
    description: 'Create a free WhatsApp QR code that opens a chat with your number and optional prefilled message.',
    keywords: ['whatsapp qr code generator', 'whatsapp qr', 'wa.me qr code', 'whatsapp chat qr'],
  },
  ar: {
    title: 'مولد QR للواتساب مجاناً – إنشاء رمز محادثة واتساب',
    description: 'أنشئ رمز QR مجاني يفتح محادثة واتساب مع رقمك ورسالة اختيارية جاهزة.',
    keywords: ['qr واتساب', 'مولد qr whatsapp', 'رابط واتساب qr', 'رمز واتساب'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'whatsapp-qr-code',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function WhatsAppQRCodePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'qrSpecial.whatsapp' });
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const guides = getGuidesBySlugs(normalizedLocale, ['qr-code-best-practices']);

  return (
    <>
      <JsonLd
        id="whatsapp-qr-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'whatsapp-qr-code',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="whatsapp-qr-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="whatsapp-qr-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'whatsapp-qr-code' },
        ])}
      />
      <SpecializedQRTool variant="whatsapp" />
      <GuideRecommendationPanel
        locale={normalizedLocale}
        title={normalizedLocale === 'ar' ? 'اجعل بدء المحادثة أسهل' : 'Make the chat-start flow easier'}
        intro={normalizedLocale === 'ar'
          ? 'يركز هذا الدليل على جعل رمز واتساب واضحاً وسهل المسح ومناسباً للسياق الذي سيظهر فيه، سواء في مطبوعات أو على الشاشة.'
          : 'This guide focuses on making a WhatsApp QR code clear, scannable, and well matched to the real context where people will use it.'}
        guides={guides}
      />
    </>
  );
}
