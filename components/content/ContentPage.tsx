import React from 'react';

interface ContentSection {
  title: string;
  paragraphs: ReadonlyArray<string>;
}

interface ContentPageProps {
  eyebrow?: string;
  title: string;
  intro: string;
  sections: ReadonlyArray<ContentSection>;
  children?: React.ReactNode;
}

export default function ContentPage({
  eyebrow,
  title,
  intro,
  sections,
  children,
}: ContentPageProps) {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 72px' }}>
      <header style={{ marginBottom: 36 }}>
        {eyebrow && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 100,
            background: 'rgba(108,99,255,0.12)',
            border: '1px solid rgba(108,99,255,0.24)',
            color: 'var(--accent)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{
          fontSize: 'clamp(30px, 5vw, 48px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 14,
          fontFamily: 'var(--font-heading)',
        }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 17, lineHeight: 1.8, maxWidth: 720 }}>
          {intro}
        </p>
      </header>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: '28px 24px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {sections.map(section => (
            <section key={section.title}>
              <h2 style={{
                fontSize: 22,
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
            </section>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
}
