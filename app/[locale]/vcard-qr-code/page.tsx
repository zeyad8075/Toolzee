import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import SpecializedQRTool from '@/components/tools/SpecializedQRTool';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'vCard QR Code Generator Free – Share Contact Details',
    description: 'Create a free vCard QR code for a name, phone, email, company, and website. Download it instantly in your browser.',
    keywords: ['vcard qr code generator', 'contact qr code', 'business card qr code', 'vcf qr'],
  },
  ar: {
    title: 'مولد QR لبطاقة vCard مجاناً – مشاركة بيانات التواصل',
    description: 'أنشئ رمز QR مجاني لاسم ورقم وبريد وشركة وموقع إلكتروني وقم بتنزيله مباشرة داخل المتصفح.',
    keywords: ['qr بطاقة تواصل', 'vcard qr', 'رمز qr لجهة اتصال', 'بطاقة عمل qr'],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'vcard-qr-code',
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function VCardQRCodePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const t = await getTranslations({ locale: normalizedLocale, namespace: 'qrSpecial.vcard' });
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        id="vcard-qr-tool-schema"
        data={buildToolSchema({
          locale: normalizedLocale,
          path: 'vcard-qr-code',
          name: t('title'),
          description: page.description,
          applicationCategory: 'UtilitiesApplication',
        })}
      />
      <JsonLd id="vcard-qr-faq-schema" data={buildFaqSchema(normalizedLocale, faqs)} />
      <JsonLd
        id="vcard-qr-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: t('title'), path: 'vcard-qr-code' },
        ])}
      />
      <SpecializedQRTool variant="vcard" />
    </>
  );
}
