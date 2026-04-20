'use client';

import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Download, LoaderCircle, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';
import { getSiteUrl } from '@/lib/site';

export default function QRTool() {
  const t = useTranslations('qr');
  const note = useTranslations('supportNote');
  const [text, setText] = useState(getSiteUrl());
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState('#171006');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [generating, setGenerating] = useState(false);

  const generateQR = async () => {
    if (!text.trim()) return;
    setGenerating(true);
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: 'M',
      });
      setQrDataUrl(url);
      trackAnalyticsEvent('generate_qr', { input_length: text.trim().length, size });
    } catch (err) {
      console.error(err);
    }
    setGenerating(false);
  };

  useEffect(() => {
    let active = true;

    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      color: { dark: fgColor, light: bgColor },
      errorCorrectionLevel: 'M',
    })
      .then(url => {
        if (active) setQrDataUrl(url);
      })
      .catch(err => {
        console.error(err);
      });

    return () => {
      active = false;
    };
  }, [text, size, fgColor, bgColor]);

  const download = () => {
    if (!qrDataUrl) return;
    trackAnalyticsEvent('download_result', { tool: 'qr', file_type: 'png' });
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'qrcode.png';
    a.click();
  };

  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>{t('title')}</h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 8 }}>{t('inputLabel')}</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={t('inputPlaceholder')}
              rows={4}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1px solid var(--border)', background: 'var(--bg-3)',
                color: 'var(--text)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 8 }}>
                {t('size')}: <span style={{ color: 'var(--accent)' }}>{size}px</span>
              </label>
              <input type="range" min={100} max={800} step={50} value={size} onChange={e => setSize(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>{t('fgColor')}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)}
                    style={{ width: 40, height: 36, borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', padding: 2 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'monospace' }}>{fgColor}</span>
                </div>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>{t('bgColor')}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                    style={{ width: 40, height: 36, borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', padding: 2 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'monospace' }}>{bgColor}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={generateQR} disabled={generating} className="btn-primary"
              style={{ flex: 1, padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {generating ? <LoaderCircle aria-hidden="true" size={16} /> : <QrCode aria-hidden="true" size={16} />}
              {generating ? 'Generating...' : t('generate')}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 20, minHeight: 340,
          }}>
            {qrDataUrl ? (
              <>
                <NextImage src={qrDataUrl} alt="QR Code" width={size} height={size} unoptimized style={{
                  maxWidth: '100%', height: 'auto', borderRadius: 12,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }} />
                <button onClick={download} className="btn-primary"
                  style={{ padding: '12px 32px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Download aria-hidden="true" size={16} /> {t('download')}
                </button>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', fontSize: 48 }}>
                <QrCode aria-hidden="true" size={52} strokeWidth={1.7} />
              </div>
            )}
          </div>
        </div>
      </div>

      <SupportNote title={note('title')} body={note('body')} />

      <section>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>{t('howTitle')}</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>{t('howDesc')}</p>
      </section>
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, fontFamily: 'var(--font-heading)' }}>{t('faqTitle')}</h2>
        <FAQ faqs={faqs} />
      </section>
    </div>
  );
}

function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {faqs.map((f, i) => (
        <div key={i} style={{ borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden', background: open === i ? 'var(--surface)' : 'transparent' }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', textAlign: 'start' }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{f.q}</span>
            <span style={{ color: 'var(--accent)', fontSize: 18, marginInlineStart: 8 }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <div style={{ padding: '0 18px 14px', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}
