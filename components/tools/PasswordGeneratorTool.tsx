'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.?';
const AMBIGUOUS = /[O0Il1]/g;

function getRandomInt(max: number) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function shuffle(input: string[]) {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = getRandomInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PasswordGeneratorTool() {
  const t = useTranslations('passwordGenerator');
  const note = useTranslations('supportNote');
  const [length, setLength] = useState(18);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(true);
  const [password, setPassword] = useState('');

  function normalizeChars(chars: string) {
    return avoidAmbiguous ? chars.replace(AMBIGUOUS, '') : chars;
  }

  function generate() {
    const groups = [normalizeChars(LOWER)];
    if (useUpper) groups.push(normalizeChars(UPPER));
    if (useNumbers) groups.push(normalizeChars(NUMBERS));
    if (useSymbols) groups.push(SYMBOLS);

    const pool = groups.join('');
    if (!pool) return;

    const required = groups.map(group => group[getRandomInt(group.length)]);
    const remainingLength = Math.max(length - required.length, 0);
    const rest = Array.from({ length: remainingLength }, () => pool[getRandomInt(pool.length)]);
    const nextPassword = shuffle([...required, ...rest]).join('').slice(0, length);

    setPassword(nextPassword);
    trackAnalyticsEvent('generate_password', { length, has_symbols: useSymbols, has_numbers: useNumbers });
  }

  async function copyPassword() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    trackAnalyticsEvent('copy_password', { length: password.length });
  }

  const options = [
    { label: t('options.uppercase'), checked: useUpper, set: setUseUpper },
    { label: t('options.numbers'), checked: useNumbers, set: setUseNumbers },
    { label: t('options.symbols'), checked: useSymbols, set: setUseSymbols },
    { label: t('options.ambiguous'), checked: avoidAmbiguous, set: setAvoidAmbiguous },
  ];
  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 24 }}>
        <div style={{
          background: 'var(--bg-3)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 18,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: 'clamp(18px, 3vw, 26px)',
          overflowWrap: 'anywhere',
          lineHeight: 1.6,
          marginBottom: 20,
        }}>
          {password || t('empty')}
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 700, fontSize: 14, display: 'block', marginBottom: 8 }}>
            {t('length')}: <span style={{ color: 'var(--accent)' }}>{length}</span>
          </label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={event => setLength(Number(event.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12, marginBottom: 22 }}>
          {options.map(option => (
            <label key={option.label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={option.checked}
                onChange={event => option.set(event.target.checked)}
                style={{ accentColor: 'var(--accent)', width: 16, height: 16 }}
              />
              <span style={{ fontSize: 14, color: 'var(--text-2)' }}>{option.label}</span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="btn-primary" onClick={generate} style={{ flex: 1, minWidth: 180, padding: '13px 18px', borderRadius: 12, border: 'none', fontWeight: 800, cursor: 'pointer' }}>
            {t('generate')}
          </button>
          <button type="button" className="btn-ghost" onClick={copyPassword} disabled={!password} style={{ flex: 1, minWidth: 180, padding: '13px 18px', borderRadius: 12, fontWeight: 800, cursor: password ? 'pointer' : 'not-allowed', opacity: password ? 1 : 0.65 }}>
            {t('copy')}
          </button>
        </div>
      </section>

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
