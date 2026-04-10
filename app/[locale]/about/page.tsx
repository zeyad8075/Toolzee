import Link from 'next/link';
import type { Metadata } from 'next';
import ContentPage from '@/components/content/ContentPage';
import { buildLocalizedMetadata } from '@/lib/metadata';

const content = {
  en: {
    eyebrow: 'About Toolzee',
    title: 'Free online tools for everyday work',
    intro: 'Toolzee is a lightweight collection of browser-friendly tools for images, QR codes, and short-form AI writing. We focus on fast workflows, clear UX, and honest product messaging.',
    metaTitle: 'About Toolzee',
    metaDescription: 'Learn what Toolzee offers, how its tools work, and how we plan to keep the service free.',
    sections: [
      {
        title: 'What Toolzee offers',
        paragraphs: [
          'Toolzee is built for quick tasks: compressing, converting, resizing images, generating QR codes, and drafting short text with AI help.',
          'We want the tools to feel simple enough for casual use while still being dependable for day-to-day work.',
        ],
      },
      {
        title: 'How the tools work',
        paragraphs: [
          'Our image tools and QR generator run directly in your browser whenever possible, so your files do not need to be uploaded for those features.',
          'The AI text tool is different: when you use it, your prompt is sent to our text-generation provider so a response can be created.',
        ],
      },
      {
        title: 'How the site is funded',
        paragraphs: [
          'Toolzee is designed to stay free for visitors and be supported by clearly labeled ads when they are enabled.',
          'We are not currently offering paid API plans through the site. If that changes in the future, the product pages and policies will be updated first.',
        ],
      },
    ],
    privacyLabel: 'Read the privacy policy',
    contactLabel: 'Contact us',
  },
  ar: {
    eyebrow: 'حول Toolzee',
    title: 'أدوات مجانية للمهام اليومية عبر الإنترنت',
    intro: 'Toolzee عبارة عن مجموعة خفيفة من الأدوات المناسبة للمتصفح للصور ورموز QR وكتابة النصوص القصيرة بالذكاء الاصطناعي. نركز على السرعة والوضوح والرسائل الصادقة للمستخدم.',
    metaTitle: 'حول Toolzee',
    metaDescription: 'تعرّف على ما يقدمه Toolzee وكيف تعمل أدواته وكيف نخطط للإبقاء على الخدمة مجانية.',
    sections: [
      {
        title: 'ما الذي يقدمه Toolzee',
        paragraphs: [
          'تم تصميم Toolzee للمهام السريعة مثل ضغط الصور وتحويلها وتغيير حجمها وإنشاء رموز QR وصياغة نصوص قصيرة بمساعدة الذكاء الاصطناعي.',
          'نريد أن تكون الأدوات سهلة للاستخدام السريع، وفي الوقت نفسه موثوقة للأعمال اليومية.',
        ],
      },
      {
        title: 'كيف تعمل الأدوات',
        paragraphs: [
          'أدوات الصور ومولد QR تعمل مباشرة داخل متصفحك كلما أمكن، لذلك لا تحتاج ملفاتك إلى الرفع لاستخدام هذه الميزات.',
          'أما أداة النصوص فهي مختلفة: عند استخدامها يتم إرسال طلبك إلى مزود توليد النصوص لدينا لكي يتم إنشاء النتيجة.',
        ],
      },
      {
        title: 'كيف يتم تمويل الموقع',
        paragraphs: [
          'تم تصميم Toolzee ليبقى مجانياً للزوار ومدعوماً عبر إعلانات واضحة عند تفعيلها.',
          'لا نقدم حالياً خطط API مدفوعة عبر الموقع. وإذا تغيّر ذلك مستقبلاً فسيتم تحديث صفحات المنتج والسياسات أولاً.',
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
