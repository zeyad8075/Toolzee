import type { Metadata } from 'next';
import ContentPage from '@/components/content/ContentPage';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { getContactEmail } from '@/lib/site';

const content = {
  en: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    intro: 'Use the address below for support, bug reports, privacy questions, or partnership requests related to Toolzee.',
    metaTitle: 'Contact Toolzee',
    metaDescription: 'Contact Toolzee for support, privacy requests, or product questions.',
    sections: [
      {
        title: 'What to send',
        paragraphs: [
          'If you are reporting a problem, include the page you were using, what you expected to happen, and what happened instead.',
          'For privacy or legal requests, include enough detail for us to understand your concern and respond clearly.',
        ],
      },
      {
        title: 'Response expectations',
        paragraphs: [
          'We may not be able to reply instantly, but we will review messages related to broken functionality, policy questions, and abuse reports.',
          'If the site adds new support channels later, they will be listed here.',
        ],
      },
    ],
    emailLabel: 'Primary contact',
    emailNote: 'Set NEXT_PUBLIC_CONTACT_EMAIL before launch if you want a different public inbox.',
  },
  ar: {
    eyebrow: 'اتصل بنا',
    title: 'تواصل معنا',
    intro: 'استخدم العنوان التالي للدعم أو الإبلاغ عن الأعطال أو أسئلة الخصوصية أو طلبات الشراكة المتعلقة بـ Toolzee.',
    metaTitle: 'التواصل مع Toolzee',
    metaDescription: 'تواصل مع Toolzee لطلبات الدعم أو الخصوصية أو الاستفسارات حول المنتج.',
    sections: [
      {
        title: 'ماذا ترسل لنا',
        paragraphs: [
          'إذا كنت تبلغ عن مشكلة، فأرفق الصفحة التي كنت تستخدمها وما الذي توقعت حدوثه وما الذي حدث فعلاً.',
          'وبالنسبة لطلبات الخصوصية أو الطلبات القانونية، أضف ما يكفي من التفاصيل حتى نتمكن من فهم طلبك والرد بوضوح.',
        ],
      },
      {
        title: 'توقعات الرد',
        paragraphs: [
          'قد لا نتمكن من الرد فوراً، لكننا سنراجع الرسائل المتعلقة بالأعطال والأسئلة المتعلقة بالسياسات وتقارير الإساءة.',
          'إذا أضيفت قنوات دعم أخرى مستقبلاً، فسيتم عرضها هنا.',
        ],
      },
    ],
    emailLabel: 'بريد التواصل',
    emailNote: 'عيّن NEXT_PUBLIC_CONTACT_EMAIL قبل الإطلاق إذا كنت تريد بريداً عاماً مختلفاً.',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = content[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: 'contact',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = content[locale === 'ar' ? 'ar' : 'en'];
  const contactEmail = getContactEmail();

  return (
    <ContentPage
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sections={page.sections}
    >
      <section style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 24,
      }}>
        <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{page.emailLabel}</p>
        <a href={`mailto:${contactEmail}`} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 18px',
          borderRadius: 10,
          background: 'var(--accent)',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: 14,
        }}>
          {contactEmail}
        </a>
        <p style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.7, marginTop: 12 }}>
          {page.emailNote}
        </p>
      </section>
    </ContentPage>
  );
}
