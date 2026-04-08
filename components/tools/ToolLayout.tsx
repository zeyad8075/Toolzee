import React from 'react';

interface ToolLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  howTitle?: string;
  howDesc?: string;
  faqTitle?: string;
  faqs?: { q: string; a: string }[];
}

export default function ToolLayout({ title, subtitle, children, howTitle, howDesc, faqTitle, faqs }: ToolLayoutProps) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{
          fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800,
          marginBottom: 12, fontFamily: 'Syne, sans-serif',
          letterSpacing: '-0.02em',
        }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.6 }}>{subtitle}</p>
      </div>

      {/* Tool UI */}
      {children}

      {/* Ad space */}
      <div style={{
        margin: '40px 0',
        padding: '20px', borderRadius: 12,
        border: '1px dashed var(--border-2)',
        textAlign: 'center', color: 'var(--text-3)', fontSize: 13,
      }}>
        📢 Advertisement – Google AdSense Banner
      </div>

      {/* How-to section */}
      {howTitle && (
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>{howTitle}</h2>
          <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>{howDesc}</p>
        </section>
      )}

      {/* FAQ */}
      {faqs && faqTitle && (
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>{faqTitle}</h2>
          <FAQClient faqs={faqs} />
        </section>
      )}
    </div>
  );
}

// Inline client FAQ
import FAQSection from '@/components/tools/FAQSection';
function FAQClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQSection title="" faqs={faqs} />;
}
