'use client';

import { useState } from 'react';

interface FAQ {
  q: string;
  a: string;
}

export default function FAQSection({ title, faqs }: { title: string; faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '48px 0' }}>
      <h2 style={{ fontWeight: 800, fontSize: 24, marginBottom: 24, fontFamily: 'Syne, sans-serif' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            borderRadius: 12, overflow: 'hidden',
            border: '1px solid var(--border)',
            background: open === i ? 'var(--surface)' : 'transparent',
          }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width: '100%', padding: '16px 20px',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              textAlign: 'start',
            }}>
              <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>{faq.q}</span>
              <span style={{
                color: 'var(--accent)', fontSize: 18, transition: 'transform 0.2s',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                flexShrink: 0, marginInlineStart: 12,
              }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 20px 16px', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
