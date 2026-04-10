'use client';

import NextImage from 'next/image';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import DropZone from '@/components/tools/DropZone';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';
import JSZip from 'jszip';

type Format = 'image/jpeg' | 'image/png' | 'image/webp';
const FORMATS: { label: string; mime: Format; ext: string }[] = [
  { label: 'JPG', mime: 'image/jpeg', ext: 'jpg' },
  { label: 'PNG', mime: 'image/png', ext: 'png' },
  { label: 'WebP', mime: 'image/webp', ext: 'webp' },
];

interface ConvertedFile {
  original: File;
  converted: Blob | null;
  preview: string;
  status: 'pending' | 'processing' | 'done' | 'error';
}

export default function ConvertTool() {
  const t = useTranslations('convert');
  const tc = useTranslations('common');
  const note = useTranslations('supportNote');
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [format, setFormat] = useState<typeof FORMATS[0]>(FORMATS[0]);
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback((accepted: File[]) => {
    setFiles(prev => [...prev, ...accepted.map(f => ({
      original: f, converted: null,
      preview: URL.createObjectURL(f),
      status: 'pending' as const,
    }))]);
    trackAnalyticsEvent('upload_images', { tool: 'convert', file_count: accepted.length });
  }, []);

  const convertImage = (file: File, fmt: Format): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        canvas.getContext('2d')!.drawImage(img, 0, 0);
        canvas.toBlob(b => b ? resolve(b) : reject(), fmt, 0.92);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  const handleConvert = async () => {
    setProcessing(true);
    trackAnalyticsEvent('convert_start', { file_count: files.length, output_format: format.ext });
    const updated = [...files];
    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: 'processing' };
      setFiles([...updated]);
      try {
        const blob = await convertImage(updated[i].original, format.mime);
        updated[i] = { ...updated[i], converted: blob, status: 'done' };
      } catch {
        updated[i] = { ...updated[i], status: 'error' };
      }
      setFiles([...updated]);
    }
    trackAnalyticsEvent('convert_complete', {
      file_count: updated.filter(file => file.status === 'done').length,
      error_count: updated.filter(file => file.status === 'error').length,
      output_format: format.ext,
    });
    setProcessing(false);
  };

  const download = (cf: ConvertedFile) => {
    if (!cf.converted) return;
    trackAnalyticsEvent('download_result', { tool: 'convert', file_type: format.ext });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(cf.converted);
    a.download = `${cf.original.name.replace(/\.[^.]+$/, '')}.${format.ext}`;
    a.click();
  };

  const downloadAll = async () => {
    trackAnalyticsEvent('download_zip', { tool: 'convert', file_count: files.filter(file => file.converted).length });
    const zip = new JSZip();
    files.filter(f => f.converted).forEach(f => {
      zip.file(`${f.original.name.replace(/\.[^.]+$/, '')}.${format.ext}`, f.converted!);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'converted.zip'; a.click();
  };

  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>{t('title')}</h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      {/* Format picker */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
        <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 12 }}>{t('outputFormat')}</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {FORMATS.map(f => (
            <button key={f.label} onClick={() => setFormat(f)} style={{
              padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14,
              border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
              background: format.label === f.label ? 'var(--accent)' : 'var(--bg-3)',
              borderColor: format.label === f.label ? 'var(--accent)' : 'var(--border)',
              color: format.label === f.label ? 'white' : 'var(--text-2)',
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <DropZone onFiles={handleFiles} accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] }} />

      {files.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <button onClick={handleConvert} disabled={processing} className="btn-primary"
              style={{ padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.7 : 1 }}>
              {processing ? '⏳ Converting...' : `🔄 Convert to ${format.label}`}
            </button>
            {files.some(f => f.converted) && (
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
            {files.map((cf, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <NextImage src={cf.preview} alt="" width={56} height={56} unoptimized style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{cf.original.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
                    → {format.label} · {cf.status === 'done' ? '✓ Ready' : cf.status === 'processing' ? '⏳ Converting...' : cf.status === 'error' ? '✗ Error' : 'Pending'}
                  </p>
                </div>
                {cf.status === 'done' && (
                  <button onClick={() => download(cf)} className="btn-primary"
                    style={{ padding: '8px 18px', borderRadius: 8, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>
                    ↓ Download
                  </button>
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
        <FAQs faqs={faqs} />
      </section>
    </div>
  );
}

function FAQs({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {faqs.map((f, i) => (
        <div key={i} style={{ borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden', background: open === i ? 'var(--surface)' : 'transparent' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', textAlign: 'start' }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{f.q}</span>
            <span style={{ color: 'var(--accent)', fontSize: 18, marginInlineStart: 8 }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <div style={{ padding: '0 18px 14px', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}
