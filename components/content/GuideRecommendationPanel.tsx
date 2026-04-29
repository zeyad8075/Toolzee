import Link from 'next/link';

interface GuideCard {
  slug: string;
  title: string;
  description: string;
}

export default function GuideRecommendationPanel({
  locale,
  title,
  intro,
  guides,
}: {
  locale: string;
  title: string;
  intro: string;
  guides: GuideCard[];
}) {
  return (
    <section style={{ padding: '0 24px 72px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{
          borderRadius: 24,
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '24px 22px',
        }}>
          <div style={{ maxWidth: 720, marginBottom: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10, fontFamily: 'var(--font-heading)' }}>
              {title}
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>
              {intro}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}>
            {guides.map(guide => (
              <Link
                key={guide.slug}
                href={`/${locale}/guides/${guide.slug}`}
                className="tool-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  borderRadius: 18,
                  padding: '18px 16px',
                  textDecoration: 'none',
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
                  {guide.title}
                </h3>
                <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, flex: 1 }}>
                  {guide.description}
                </p>
                <div style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700 }}>
                  {locale === 'ar' ? 'اقرأ الدليل' : 'Read guide'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
