import type { Metadata } from 'next';
import ContentPage from '@/components/content/ContentPage';
import { buildLocalizedMetadata } from '@/lib/metadata';

const content = {
  en: {
    eyebrow: 'Terms of Use',
    title: 'Simple terms for using Toolzee',
    intro: 'These terms describe the basic rules for using Toolzee responsibly while we provide the site as a free, ad-supported service.',
    metaTitle: 'Terms of Use',
    metaDescription: 'Read the basic terms for using Toolzee and its free browser-based tools.',
    sections: [
      {
        title: 'Use of the site',
        paragraphs: [
          'You may use Toolzee for lawful personal or commercial work, provided you do not abuse the service, interfere with other users, or attempt to bypass technical limits.',
          'You are responsible for reviewing any output before relying on it in public, legal, financial, or safety-critical contexts.',
        ],
      },
      {
        title: 'Your files and prompts',
        paragraphs: [
          'Image and QR tools are intended to process files or inputs locally in your browser whenever possible.',
          'Do not upload or submit material that you do not have the right to use, or sensitive information that should not be processed through online tools.',
        ],
      },
      {
        title: 'Availability and changes',
        paragraphs: [
          'We may update, pause, or remove parts of Toolzee as the product evolves so the tools remain useful and reliable.',
          'If we introduce paid products or public APIs in the future, the site and legal pages will be updated to reflect that change before those products are offered.',
        ],
      },
      {
        title: 'No warranties',
        paragraphs: [
          'Toolzee is provided on an as-is basis. We do our best to keep it useful and reliable, but we cannot guarantee uninterrupted availability or error-free results.',
          'To the extent allowed by law, you use the site at your own risk.',
        ],
      },
    ],
  },
  ar: {
    eyebrow: 'شروط الاستخدام',
    title: 'شروط بسيطة لاستخدام Toolzee',
    intro: 'توضح هذه الشروط القواعد الأساسية لاستخدام Toolzee بشكل مسؤول بينما نقدم الموقع كخدمة مجانية ومدعومة بالإعلانات.',
    metaTitle: 'شروط الاستخدام',
    metaDescription: 'اقرأ الشروط الأساسية لاستخدام Toolzee وأدواته المجانية التي تعمل عبر المتصفح.',
    sections: [
      {
        title: 'استخدام الموقع',
        paragraphs: [
          'يمكنك استخدام Toolzee في الأعمال الشخصية أو التجارية المشروعة، بشرط عدم إساءة استخدام الخدمة أو التأثير على المستخدمين الآخرين أو محاولة تجاوز الحدود التقنية.',
          'أنت مسؤول عن مراجعة أي مخرجات قبل الاعتماد عليها في سياقات عامة أو قانونية أو مالية أو حساسة للسلامة.',
        ],
      },
      {
        title: 'ملفاتك وطلباتك',
        paragraphs: [
          'تهدف أدوات الصور وQR إلى معالجة الملفات أو المدخلات محلياً داخل متصفحك كلما أمكن.',
          'لا تقم برفع أو إرسال مواد لا تملك حق استخدامها، ولا معلومات حساسة لا ينبغي معالجتها عبر أدوات الإنترنت.',
        ],
      },
      {
        title: 'التوفر والتغييرات',
        paragraphs: [
          'قد نقوم بتحديث أجزاء من Toolzee أو إيقافها أو إزالتها مع تطور المنتج حتى تبقى الأدوات مفيدة وموثوقة.',
          'إذا أضفنا مستقبلاً منتجات مدفوعة أو API عاماً فسيتم تحديث الموقع والصفحات القانونية قبل تقديم تلك المنتجات.',
        ],
      },
      {
        title: 'عدم تقديم ضمانات',
        paragraphs: [
          'يتم تقديم Toolzee كما هو. نحن نبذل جهدنا ليكون مفيداً وموثوقاً، لكن لا يمكننا ضمان التوفر المستمر أو النتائج الخالية من الأخطاء.',
          'إلى الحد الذي يسمح به القانون، فإن استخدامك للموقع يكون على مسؤوليتك الخاصة.',
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
    path: 'terms',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
