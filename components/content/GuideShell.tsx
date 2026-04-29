import Link from 'next/link';

interface GuideSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface GuideShellProps {
  locale: string;
  eyebrow: string;
  title: string;
  intro: string;
  readTime: string;
  category: string;
  sections: GuideSection[];
  takeawayTitle: string;
  takeaways: string[];
  relatedToolsTitle: string;
  relatedTools: Array<{ href: string; label: string }>;
}

export default function GuideShell({
  locale,
  eyebrow,
  title,
  intro,
  readTime,
  category,
  sections,
  takeawayTitle,
  takeaways,
  relatedToolsTitle,
  relatedTools,
}: GuideShellProps) {
  return (
    <article style={{ maxWidth: 980, margin: '0 auto', padding: '48px 24px 80px' }}>
      <header style={{ marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 999,
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-border)',
          color: 'var(--accent)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: 18,
        }}>
          {eyebrow}
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 12,
          fontFamily: 'var(--font-heading)',
          maxWidth: 820,
        }}>
          {title}
        </h1>

        <p style={{ color: 'var(--text-2)', fontSize: 17, lineHeight: 1.8, maxWidth: 760 }}>
          {intro}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginTop: 20,
        }}>
          <MetaPill label={readTime} />
          <MetaPill label={category} />
          <Link
            href={`/${locale}/guides`}
            className="btn-ghost"
            style={{
              textDecoration: 'none',
              borderRadius: 999,
              padding: '10px 14px',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {locale === 'ar' ? 'العودة إلى الأدلة' : 'Back to guides'}
          </Link>
        </div>
      </header>

      <div className="guide-shell-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.75fr) minmax(260px, 0.95fr)',
        gap: 24,
        alignItems: 'start',
      }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 24,
          padding: '28px 24px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            {sections.map(section => (
              <section key={section.title}>
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 800,
                  marginBottom: 12,
                  fontFamily: 'var(--font-heading)',
                }}>
                  {section.title}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {section.paragraphs.map(paragraph => (
                    <p key={paragraph} style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets?.length ? (
                  <ul style={{
                    marginTop: 14,
                    paddingInlineStart: 22,
                    color: 'var(--text-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    lineHeight: 1.7,
                    fontSize: 15,
                  }}>
                    {section.bullets.map(bullet => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{
            background: 'linear-gradient(145deg, color-mix(in srgb, var(--accent-soft) 84%, transparent), var(--surface))',
            border: '1px solid var(--accent-border)',
            borderRadius: 20,
            padding: '22px 20px',
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 12,
              fontFamily: 'var(--font-heading)',
            }}>
              {takeawayTitle}
            </h2>
            <ul style={{
              paddingInlineStart: 20,
              color: 'var(--text-2)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              lineHeight: 1.7,
              fontSize: 14,
            }}>
              {takeaways.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: '22px 20px',
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 14,
              fontFamily: 'var(--font-heading)',
            }}>
              {relatedToolsTitle}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {relatedTools.map(tool => (
                <Link
                  key={tool.href}
                  href={`/${locale}/${tool.href}`}
                  className="btn-ghost"
                  style={{
                    textDecoration: 'none',
                    borderRadius: 14,
                    padding: '12px 14px',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .guide-shell-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </article>
  );
}

function MetaPill({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '10px 14px',
      borderRadius: 999,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      color: 'var(--text-2)',
      fontSize: 13,
      fontWeight: 600,
    }}>
      {label}
    </span>
  );
}
