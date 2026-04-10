'use client';

import NextImage from 'next/image';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import DropZone from '@/components/tools/DropZone';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';
import JSZip from 'jszip';

interface ResizeFile {
  original: File;
  resized: Blob | null;
  preview: string;
  origW: number; origH: number;
  status: 'pending' | 'processing' | 'done' | 'error';
}

export default function ResizeTool() {
  const t = useTranslations('resize');
  const tc = useTranslations('common');
  const note = useTranslations('supportNote');
  const [files, setFiles] = useState<ResizeFile[]>([]);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [keepRatio, setKeepRatio] = useState(true);
  const [byPercent, setByPercent] = useState(false);
  const [percent, setPercent] = useState('50');
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback((accepted: File[]) => {
    trackAnalyticsEvent('upload_images', { tool: 'resize', file_count: accepted.length });
    accepted.forEach(f => {
      const img = new Image();
      img.onload = () => {
        setFiles(prev => [...prev, {
          original: f, resized: null,
          preview: URL.createObjectURL(f),
          origW: img.width, origH: img.height,
          status: 'pending',
        }]);
        if (!width) setWidth(String(img.width));
        if (!height) setHeight(String(img.height));
      };
      img.src = URL.createObjectURL(f);
    });
  }, [width, height]);

  const handleWidthChange = (v: string) => {
    setWidth(v);
    if (keepRatio && files[0]) {
      const ratio = files[0].origH / files[0].origW;
      setHeight(Math.round(+v * ratio).toString());
    }
  };

  const handleHeightChange = (v: string) => {
    setHeight(v);
    if (keepRatio && files[0]) {
      const ratio = files[0].origW / files[0].origH;
      setWidth(Math.round(+v * ratio).toString());
    }
  };

  const resizeImage = (file: File, w: number, h: number): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(b => b ? resolve(b) : reject(), 'image/png');
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  const handleResize = async () => {
    setProcessing(true);
    trackAnalyticsEvent('resize_start', {
      file_count: files.length,
      mode: byPercent ? 'percentage' : 'dimensions',
      percent: byPercent ? Number(percent) : undefined,
      width: byPercent ? undefined : Number(width),
      height: byPercent ? undefined : Number(height),
    });
    const updated = [...files];
    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: 'processing' };
      setFiles([...updated]);
      try {
        let w = +width, h = +height;
        if (byPercent) {
          const p = +percent / 100;
          w = Math.round(updated[i].origW * p);
          h = Math.round(updated[i].origH * p);
        }
        const blob = await resizeImage(updated[i].original, w, h);
        updated[i] = { ...updated[i], resized: blob, status: 'done' };
      } catch {
        updated[i] = { ...updated[i], status: 'error' };
      }
      setFiles([...updated]);
    }
    trackAnalyticsEvent('resize_complete', {
      file_count: updated.filter(file => file.status === 'done').length,
      error_count: updated.filter(file => file.status === 'error').length,
      mode: byPercent ? 'percentage' : 'dimensions',
    });
    setProcessing(false);
  };

  const download = (rf: ResizeFile) => {
    if (!rf.resized) return;
    trackAnalyticsEvent('download_result', { tool: 'resize', file_type: 'png' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(rf.resized);
    a.download = `resized_${rf.original.name}`;
    a.click();
  };

  const downloadAll = async () => {
    trackAnalyticsEvent('download_zip', { tool: 'resize', file_count: files.filter(file => file.resized).length });
    const zip = new JSZip();
    files.filter(f => f.resized).forEach(f => zip.file(`resized_${f.original.name}`, f.resized!));
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'resized.zip'; a.click();
  };

  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>{t('title')}</h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      {/* Settings */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[{ label: 'Pixel Dimensions', val: false }, { label: 'Percentage', val: true }].map(o => (
            <button key={o.label} onClick={() => setByPercent(o.val)} style={{
              padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13,
              border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
              background: byPercent === o.val ? 'var(--accent)' : 'var(--bg-3)',
              borderColor: byPercent === o.val ? 'var(--accent)' : 'var(--border)',
              color: byPercent === o.val ? 'white' : 'var(--text-2)',
            }}>{o.label}</button>
          ))}
        </div>

        {byPercent ? (
          <div>
            <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 8 }}>{t('percent')}: <span style={{ color: 'var(--accent)' }}>{percent}%</span></label>
            <input type="range" min={1} max={200} value={percent} onChange={e => setPercent(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
              <span>1%</span><span>100% (original)</span><span>200%</span>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 120 }}>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>{t('width')}</label>
                <input type="number" value={width} onChange={e => handleWidthChange(e.target.value)}
                  placeholder="1920"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-3)', color: 'var(--text)', fontSize: 14 }} />
              </div>
              <div style={{ padding: '0 8px 12px', color: 'var(--text-3)', fontSize: 20 }}>×</div>
              <div style={{ flex: 1, minWidth: 120 }}>
                <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>{t('height')}</label>
                <input type="number" value={height} onChange={e => handleHeightChange(e.target.value)}
                  placeholder="1080"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-3)', color: 'var(--text)', fontSize: 14 }} />
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={keepRatio} onChange={e => setKeepRatio(e.target.checked)}
                style={{ accentColor: 'var(--accent)', width: 16, height: 16 }} />
              <span style={{ color: 'var(--text-2)' }}>{t('keepRatio')}</span>
            </label>
          </div>
        )}
      </div>

      <DropZone onFiles={handleFiles} accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }} />

      {files.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <button onClick={handleResize} disabled={processing} className="btn-primary"
              style={{ padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.7 : 1 }}>
              {processing ? '⏳ Resizing...' : `📐 ${t('resize')}`}
            </button>
            {files.some(f => f.resized) && (
              <button onClick={downloadAll} className="btn-ghost"
                style={{ padding: '12px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                📦 Download All (ZIP)
              </button>
            )}
            <button onClick={() => setFiles([])} className="btn-ghost"
              style={{ padding: '12px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', marginInlineStart: 'auto' }}>
              {tc('reset')}
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {files.map((rf, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <NextImage src={rf.preview} alt="" width={56} height={56} unoptimized style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{rf.original.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
                    {rf.origW}×{rf.origH}px → {
                      byPercent
                        ? `${Math.round(rf.origW * +percent / 100)}×${Math.round(rf.origH * +percent / 100)}px`
                        : `${width}×${height}px`
                    } · {rf.status === 'done' ? '✓ Ready' : rf.status === 'processing' ? '⏳' : rf.status === 'error' ? '✗ Error' : 'Pending'}
                  </p>
                </div>
                {rf.status === 'done' && (
                  <button onClick={() => download(rf)} className="btn-primary"
                    style={{ padding: '8px 18px', borderRadius: 8, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>↓ Download</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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
