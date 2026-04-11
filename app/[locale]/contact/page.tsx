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
          'Use the email below as the primary public contact for Toolzee.',
        ],
      },
    ],
    emailLabel: 'Primary contact',
    emailNote: 'We use this inbox for support, privacy questions, and reports about broken functionality.',
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
          'استخدم البريد أدناه كوسيلة التواصل العامة الأساسية مع Toolzee.',
        ],
      },
    ],
    emailLabel: 'بريد التواصل',
    emailNote: 'نستخدم هذا البريد للدعم وأسئلة الخصوصية والتبليغ عن أي أعطال في الموقع.',
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
          color: 'var(--accent-contrast)',
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
