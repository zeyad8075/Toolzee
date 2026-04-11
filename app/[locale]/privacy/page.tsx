import type { Metadata } from 'next';
import ContentPage from '@/components/content/ContentPage';
import { buildLocalizedMetadata } from '@/lib/metadata';

const content = {
  en: {
    eyebrow: 'Privacy Policy',
    title: 'Privacy at Toolzee',
    intro: 'This page explains what data is processed when you use Toolzee, which tools stay in your browser, and how ads and analytics are handled.',
    metaTitle: 'Privacy Policy',
    metaDescription: 'Learn how Toolzee handles browser-based image processing, QR generation, analytics, and ad-supported monetization.',
    sections: [
      {
        title: 'Image tools and QR generation',
        paragraphs: [
          'The image compressor, converter, resizer, and QR generator are designed to work locally in your browser. For those tools, your files do not need to be uploaded to our servers to produce a result.',
          'If we change how those tools work in the future, this policy will be updated before that change goes live.',
        ],
      },
      {
        title: 'Ads, analytics, consent, and third parties',
        paragraphs: [
          'When Google AdSense or Google Analytics is enabled on Toolzee, you can choose between personalized ads, non-personalized ads, or no ad and measurement tags on this device before those tags begin loading.',
          'If your region requires a certified consent management platform for ad serving, we may limit or disable ads there until that requirement is fully in place.',
        ],
      },
      {
        title: 'Contact and updates',
        paragraphs: [
          'If you have a privacy question, you can contact us through the contact page on this site.',
          'We may update this policy as the product evolves. When we do, the content on this page will be revised to match the live behavior of the site.',
        ],
      },
    ],
  },
  ar: {
    eyebrow: 'سياسة الخصوصية',
    title: 'الخصوصية في Toolzee',
    intro: 'تشرح هذه الصفحة ما هي البيانات التي تتم معالجتها عند استخدام Toolzee، وما الأدوات التي تبقى داخل متصفحك، وكيف نتعامل مع الإعلانات والتحليلات.',
    metaTitle: 'سياسة الخصوصية',
    metaDescription: 'تعرّف على كيفية تعامل Toolzee مع معالجة الصور داخل المتصفح وتوليد QR والتحليلات والتمويل عبر الإعلانات.',
    sections: [
      {
        title: 'أدوات الصور وتوليد QR',
        paragraphs: [
          'تم تصميم أداة ضغط الصور والتحويل وتغيير الحجم ومولد QR لتعمل محلياً داخل متصفحك. وبالنسبة لهذه الأدوات لا تحتاج ملفاتك إلى الرفع إلى خوادمنا للحصول على النتيجة.',
          'إذا تغيّر أسلوب عمل هذه الأدوات مستقبلاً، فسيتم تحديث هذه السياسة قبل إطلاق التغيير.',
        ],
      },
      {
        title: 'الإعلانات والتحليلات والموافقة والخدمات الخارجية',
        paragraphs: [
          'عند تفعيل Google AdSense أو Google Analytics في Toolzee يمكنك اختيار الإعلانات المخصصة أو غير المخصصة أو عدم تحميل وسوم الإعلانات والقياس على هذا الجهاز قبل أن تبدأ بالعمل.',
          'إذا كانت منطقتك تتطلب منصة موافقة معتمدة لعرض الإعلانات، فقد نقوم بتقييد الإعلانات أو تعطيلها هناك إلى أن يتم استيفاء هذا المتطلب بالكامل.',
        ],
      },
      {
        title: 'التواصل والتحديثات',
        paragraphs: [
          'إذا كان لديك سؤال متعلق بالخصوصية، يمكنك التواصل معنا عبر صفحة الاتصال داخل الموقع.',
          'قد نقوم بتحديث هذه السياسة مع تطور المنتج، وعندها سيتم تعديل محتوى هذه الصفحة ليعكس السلوك الفعلي للموقع.',
        ],
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = content[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: 'privacy',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = content[locale === 'ar' ? 'ar' : 'en'];

  return (
    <ContentPage
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sections={page.sections}
    />
  );
}
