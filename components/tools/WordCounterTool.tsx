'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';

function getWords(text: string) {
  return text.trim().match(/[\p{L}\p{N}'-]+/gu) ?? [];
}

export default function WordCounterTool() {
  const t = useTranslations('wordCounter');
  const note = useTranslations('supportNote');
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = getWords(text);
    const sentences = text.split(/[.!?؟。]+/).map(part => part.trim()).filter(Boolean);
    const paragraphs = text.split(/\n+/).map(part => part.trim()).filter(Boolean);
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const readingMinutes = Math.max(1, Math.ceil(words.length / 200));

    return {
      words: words.length,
      characters: text.length,
      charsNoSpaces,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readingMinutes,
    };
  }, [text]);

  function handleChange(nextText: string) {
    setText(nextText);
    if (nextText.length === 1) {
      trackAnalyticsEvent('word_counter_start');
    }
  }

  async function copyText() {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    trackAnalyticsEvent('copy_text', { tool: 'word_counter', word_count: stats.words });
  }

  const metricCards = [
    { label: t('metrics.words'), value: stats.words },
    { label: t('metrics.characters'), value: stats.characters },
    { label: t('metrics.noSpaces'), value: stats.charsNoSpaces },
    { label: t('metrics.sentences'), value: stats.sentences },
    { label: t('metrics.paragraphs'), value: stats.paragraphs },
    { label: t('metrics.readingTime'), value: `${stats.readingMinutes} ${t('minutes')}` },
  ];

  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 20 }}>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>
            {t('label')}
          </label>
          <textarea
            value={text}
            onChange={event => handleChange(event.target.value)}
            placeholder={t('placeholder')}
            rows={14}
            style={{
              width: '100%',
              border: '1px solid var(--border)',
              borderRadius: 14,
              background: 'var(--bg-3)',
              color: 'var(--text)',
              padding: 16,
              resize: 'vertical',
              lineHeight: 1.7,
              fontFamily: 'inherit',
              fontSize: 15,
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={copyText}
              disabled={!text}
              style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: text ? 'pointer' : 'not-allowed', fontWeight: 700, opacity: text ? 1 : 0.65 }}
            >
              {t('copy')}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setText('')}
              disabled={!text}
              style={{ padding: '10px 18px', borderRadius: 10, cursor: text ? 'pointer' : 'not-allowed', fontWeight: 700, opacity: text ? 1 : 0.65 }}
            >
              {t('clear')}
            </button>
          </div>
        </section>

        <aside style={{ display: 'grid', gap: 12 }}>
          {metricCards.map(card => (
            <div key={card.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '18px 20px' }}>
              <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{card.value}</div>
            </div>
          ))}
        </aside>
      </div>

      <SupportNote title={note('title')} body={note('body')} />

      <section>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>{t('howTitle')}</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>{t('howDesc')}</p>
      </section>
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 18, fontFamily: 'var(--font-heading)' }}>{t('faqTitle')}</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {faqs.map(faq => (
            <article key={faq.q} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
              <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{faq.q}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
