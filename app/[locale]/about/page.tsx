import Link from 'next/link';
import type { Metadata } from 'next';
import ContentPage from '@/components/content/ContentPage';
import { buildLocalizedMetadata } from '@/lib/metadata';

const content = {
  en: {
    eyebrow: 'About Toolzee',
    title: 'Free online tools for everyday work',
    intro: 'Toolzee is a lightweight collection of browser-friendly tools for images and QR codes. We focus on fast workflows, clear UX, and honest product messaging.',
    metaTitle: 'About Toolzee',
    metaDescription: 'Learn what Toolzee offers, how its browser-based tools work, and how the service stays free.',
    sections: [
      {
        title: 'What Toolzee offers',
        paragraphs: [
          'Toolzee is built for quick tasks: compressing images, converting image formats, resizing images, and generating QR codes.',
          'We want the tools to feel simple enough for casual use while still being dependable for day-to-day work.',
        ],
      },
      {
        title: 'How the tools work',
        paragraphs: [
          'Our image tools and QR generator run directly in your browser whenever possible, so your files do not need to be uploaded for those features.',
          'The result is created on your device for the core tools, which keeps the workflow fast and simple.',
        ],
      },
      {
        title: 'How the site is funded',
        paragraphs: [
          'Toolzee stays free for visitors and is supported by clearly labeled ads when they are enabled.',
          'We do not sell paid API plans through the site.',
        ],
      },
    ],
    privacyLabel: 'Read the privacy policy',
    contactLabel: 'Contact us',
  },
  ar: {
    eyebrow: 'حول Toolzee',
    title: 'أدوات مجانية للمهام اليومية عبر الإنترنت',
    intro: 'Toolzee عبارة عن مجموعة خفيفة من الأدوات المناسبة للمتصفح للصور ورموز QR. نركز على السرعة والوضوح والرسائل الصادقة للمستخدم.',
    metaTitle: 'حول Toolzee',
    metaDescription: 'تعرّف على ما يقدمه Toolzee وكيف تعمل أدواته داخل المتصفح وكيف تبقى الخدمة مجانية.',
    sections: [
      {
        title: 'ما الذي يقدمه Toolzee',
        paragraphs: [
          'تم تصميم Toolzee للمهام السريعة مثل ضغط الصور وتحويلها وتغيير حجمها وإنشاء رموز QR.',
          'نريد أن تكون الأدوات سهلة للاستخدام السريع، وفي الوقت نفسه موثوقة للأعمال اليومية.',
        ],
      },
      {
        title: 'كيف تعمل الأدوات',
        paragraphs: [
          'أدوات الصور ومولد QR تعمل مباشرة داخل متصفحك كلما أمكن، لذلك لا تحتاج ملفاتك إلى الرفع لاستخدام هذه الميزات.',
          'يتم إنشاء النتيجة على جهازك في الأدوات الأساسية، مما يجعل الاستخدام سريعاً وبسيطاً.',
        ],
      },
      {
        title: 'كيف يتم تمويل الموقع',
        paragraphs: [
          'يبقى Toolzee مجانياً للزوار ومدعوماً عبر إعلانات واضحة عند تفعيلها.',
          'لا نبيع حالياً خطط API مدفوعة عبر الموقع.',
        ],
      },
    ],
    privacyLabel: 'اقرأ سياسة الخصوصية',
    contactLabel: 'تواصل معنا',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = content[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: 'about',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = content[locale === 'ar' ? 'ar' : 'en'];

  return (
    <ContentPage
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sections={page.sections}
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href={`/${locale}/privacy`} className="btn-ghost" style={{
          padding: '12px 18px',
          borderRadius: 10,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 14,
        }}>
          {page.privacyLabel}
        </Link>
        <Link href={`/${locale}/contact`} className="btn-primary" style={{
          padding: '12px 18px',
          borderRadius: 10,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 14,
        }}>
          {page.contactLabel}
        </Link>
      </div>
    </ContentPage>
  );
}
