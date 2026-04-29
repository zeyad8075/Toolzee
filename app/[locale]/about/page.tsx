import Link from 'next/link';
import type { Metadata } from 'next';
import ContentPage from '@/components/content/ContentPage';
import { buildLocalizedMetadata } from '@/lib/metadata';

const content = {
  en: {
    eyebrow: 'About Toolzee',
    title: 'Free online tools for everyday work',
    intro: 'Toolzee is a lightweight collection of browser-friendly tools for images, QR codes, text checks, passwords, and PDF tasks. We focus on fast workflows, clear UX, and honest product messaging.',
    metaTitle: 'About Toolzee',
    metaDescription: 'Learn what Toolzee offers, how its browser-based tools and guides work, and how the service stays free.',
    sections: [
      {
        title: 'What Toolzee offers',
        paragraphs: [
          'Toolzee is built for quick tasks: compressing images, converting image formats, resizing images, generating QR codes, counting text, creating passwords, and turning images into PDFs.',
          'We want the tools to feel simple enough for casual use while still being dependable for day-to-day work, which is why the site focuses on straightforward steps and clear outputs instead of unnecessary friction.',
        ],
      },
      {
        title: 'How the tools work',
        paragraphs: [
          'Our core tools run directly in your browser whenever possible, so your files and inputs do not need to be uploaded for those features.',
          'The result is created on your device for the core tools, which keeps the workflow fast and simple. When a workflow behaves differently, the public pages on the site should describe that clearly.',
        ],
      },
      {
        title: 'Why the site includes guides',
        paragraphs: [
          'A useful tool site should do more than show a form and a download button. Toolzee also publishes practical guides that explain which tool to use, what tradeoffs to expect, and how to avoid common mistakes when preparing files.',
          'Those guides are written around the actual tasks people face on Toolzee, such as preparing images for the web, organizing PDFs, or creating QR codes that scan reliably.',
        ],
      },
      {
        title: 'Content and trust standards',
        paragraphs: [
          'We aim to keep the site easy to evaluate: public contact information, privacy details, terms of use, and clear navigation are available from every page.',
          'If the product changes, the goal is to update the public content so the site description, legal pages, and help copy continue to match the live behavior of the service.',
        ],
      },
      {
        title: 'How the site is funded',
        paragraphs: [
          'Toolzee stays free for visitors and is supported by clearly labeled ads when they are enabled.',
          'We do not want ads to replace the content itself. The tools, guides, and public site information should remain the primary value of the site.',
        ],
      },
    ],
    guidesLabel: 'Browse the guides',
    privacyLabel: 'Read the privacy policy',
    contactLabel: 'Contact us',
  },
  ar: {
    eyebrow: 'حول Toolzee',
    title: 'أدوات مجانية للمهام اليومية عبر الإنترنت',
    intro: 'Toolzee عبارة عن مجموعة خفيفة من الأدوات المناسبة للمتصفح للصور ورموز QR وفحص النصوص وكلمات المرور ومهام PDF. نركز على السرعة والوضوح والرسائل الصادقة للمستخدم.',
    metaTitle: 'حول Toolzee',
    metaDescription: 'تعرّف على ما يقدمه Toolzee وكيف تعمل أدواته وأدلته داخل المتصفح وكيف تبقى الخدمة مجانية.',
    sections: [
      {
        title: 'ما الذي يقدمه Toolzee',
        paragraphs: [
          'تم تصميم Toolzee للمهام السريعة مثل ضغط الصور وتحويلها وتغيير حجمها وإنشاء رموز QR وعد الكلمات وإنشاء كلمات المرور وتحويل الصور إلى PDF.',
          'نريد أن تكون الأدوات سهلة للاستخدام السريع، وفي الوقت نفسه موثوقة للأعمال اليومية، لذلك يركز الموقع على خطوات واضحة ونتائج مفهومة بدلاً من التعقيد غير الضروري.',
        ],
      },
      {
        title: 'كيف تعمل الأدوات',
        paragraphs: [
          'الأدوات الأساسية تعمل مباشرة داخل متصفحك كلما أمكن، لذلك لا تحتاج ملفاتك أو مدخلاتك إلى الرفع لاستخدام هذه الميزات.',
          'يتم إنشاء النتيجة على جهازك في الأدوات الأساسية، مما يجعل الاستخدام سريعاً وبسيطاً. وإذا تغيّر سلوك أي مسار فمن المفترض أن توضحه الصفحات العامة في الموقع بوضوح.',
        ],
      },
      {
        title: 'لماذا يضم الموقع أدلة أيضاً',
        paragraphs: [
          'الموقع المفيد لا يقتصر على نموذج وزر تنزيل. لذلك ينشر Toolzee أيضاً أدلة عملية تشرح الأداة المناسبة لكل حالة وما المقايضات المتوقعة وكيف يمكن تجنب الأخطاء الشائعة عند تجهيز الملفات.',
          'هذه الأدلة مكتوبة حول المهام الفعلية التي ينجزها الزوار داخل Toolzee مثل تجهيز الصور للويب وتنظيم ملفات PDF وإنشاء رموز QR سهلة المسح.',
        ],
      },
      {
        title: 'معايير المحتوى والثقة',
        paragraphs: [
          'نحاول أن يكون الموقع سهل التقييم: توجد وسائل اتصال عامة وتفاصيل الخصوصية وشروط الاستخدام والتنقل الواضح من كل صفحة.',
          'وعندما يتغير المنتج، فالهدف هو تحديث المحتوى العام حتى يبقى وصف الموقع والصفحات القانونية ونصوص المساعدة متطابقة مع السلوك الفعلي للخدمة.',
        ],
      },
      {
        title: 'كيف يتم تمويل الموقع',
        paragraphs: [
          'يبقى Toolzee مجانياً للزوار ومدعوماً عبر إعلانات واضحة عند تفعيلها.',
          'ولا نريد أن تحل الإعلانات محل المحتوى نفسه، بل يجب أن تبقى الأدوات والأدلة والمعلومات العامة هي القيمة الأساسية للموقع.',
        ],
      },
    ],
    guidesLabel: 'تصفح الأدلة',
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
        <Link href={`/${locale}/guides`} className="btn-ghost" style={{
          padding: '12px 18px',
          borderRadius: 10,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 14,
        }}>
          {page.guidesLabel}
        </Link>
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
