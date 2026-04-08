'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import DropZone from '@/components/tools/DropZone';
import JSZip from 'jszip';

interface CompressedFile {
  original: File;
  compressed: Blob | null;
  preview: string;
  originalSize: number;
  compressedSize: number;
  status: 'pending' | 'processing' | 'done' | 'error';
}

export default function CompressTool() {
  const t = useTranslations('compress');
  const tc = useTranslations('common');
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback(async (accepted: File[]) => {
    const newFiles: CompressedFile[] = accepted.map(f => ({
      original: f, compressed: null,
      preview: URL.createObjectURL(f),
      originalSize: f.size, compressedSize: 0,
      status: 'pending',
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const compressImage = async (file: File, q: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          if (blob) resolve(blob);
          else reject(new Error('Compression failed'));
        }, 'image/jpeg', q / 100);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleCompress = async () => {
    setProcessing(true);
    const updated = [...files];
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === 'done') continue;
      updated[i] = { ...updated[i], status: 'processing' };
      setFiles([...updated]);
      try {
        const blob = await compressImage(updated[i].original, quality);
        updated[i] = { ...updated[i], compressed: blob, compressedSize: blob.size, status: 'done' };
      } catch {
        updated[i] = { ...updated[i], status: 'error' };
      }
      setFiles([...updated]);
    }
    setProcessing(false);
  };

  const downloadFile = (cf: CompressedFile) => {
    if (!cf.compressed) return;
    const url = URL.createObjectURL(cf.compressed);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${cf.original.name.replace(/\.[^.]+$/, '')}.jpg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    files.filter(f => f.compressed).forEach(f => {
      zip.file(`compressed_${f.original.name.replace(/\.[^.]+$/, '')}.jpg`, f.compressed!);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'compressed_images.zip'; a.click();
    URL.revokeObjectURL(url);
  };

  const fmt = (b: number) => b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${(b / 1024).toFixed(0)} KB`;
  const saved = (o: number, c: number) => c > 0 ? Math.round((1 - c / o) * 100) : 0;

  const faqs = [
    { q: 'What is image compression?', a: 'Image compression reduces file size by removing redundant data while preserving visual quality.' },
    { q: 'How to reduce image size without losing quality?', a: 'Use lossy compression with 80-90% quality for the best balance.' },
    { q: 'Is my data private?', a: 'All processing happens in your browser. Files never leave your device.' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      {/* Quality slider */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '20px 24px', marginBottom: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <label style={{ fontWeight: 600, fontSize: 14 }}>{t('quality')}: <span style={{ color: 'var(--accent)' }}>{quality}%</span></label>
          <span style={{ color: 'var(--text-3)', fontSize: 12 }}>{t('qualityHint')}</span>
        </div>
        <input type="range" min={10} max={100} value={quality} onChange={e => setQuality(+e.target.value)}
          style={{ width: '100%', accentColor: 'var(--accent)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
          <span>Smallest (10%)</span><span>Balanced (80%)</span><span>Best (100%)</span>
        </div>
      </div>

      {/* Drop zone */}
      <DropZone
        onFiles={handleFiles}
        accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] }}
      />

      {/* Files list */}
      {files.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <button onClick={handleCompress} disabled={processing} className="btn-primary"
              style={{ padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.7 : 1 }}>
              {processing ? t('processing') : `⚡ ${t('quality')} & Compress`}
            </button>
            {files.some(f => f.compressed) && (
              <button onClick={downloadAll} className="btn-ghost"
                style={{ padding: '12px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                📦 {t('downloadAll')}
              </button>
            )}
            <button onClick={() => setFiles([])} className="btn-ghost"
              style={{ padding: '12px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', marginInlineStart: 'auto' }}>
              {tc('reset')}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {files.map((cf, i) => (
              <div key={i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 16,
                flexWrap: 'wrap',
              }}>
                {/* Preview */}
                <img src={cf.preview} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cf.original.name}
                  </p>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-2)' }}>
                    <span>{t('original')}: <strong>{fmt(cf.originalSize)}</strong></span>
                    {cf.status === 'done' && (
                      <>
                        <span>{t('compressed')}: <strong style={{ color: 'var(--green)' }}>{fmt(cf.compressedSize)}</strong></span>
                        <span style={{
                          background: 'rgba(34,197,94,0.12)', color: 'var(--green)',
                          padding: '2px 8px', borderRadius: 6, fontWeight: 700, fontSize: 12,
                        }}>
                          -{saved(cf.originalSize, cf.compressedSize)}% {t('saved')}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Progress bar */}
                  {cf.status === 'processing' && (
                    <div style={{ marginTop: 8, height: 3, background: 'var(--bg-3)', borderRadius: 4, overflow: 'hidden' }}>
                      <div className="progress-bar" style={{ width: '60%', height: '100%' }} />
                    </div>
                  )}
                </div>

                {/* Status + Download */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {cf.status === 'processing' && (
                    <span style={{ color: 'var(--accent)', fontSize: 13 }}>⏳</span>
                  )}
                  {cf.status === 'error' && (
                    <span style={{ color: 'var(--red)', fontSize: 13 }}>✗ Error</span>
                  )}
                  {cf.status === 'done' && (
                    <button onClick={() => downloadFile(cf)} className="btn-primary"
                      style={{ padding: '8px 18px', borderRadius: 8, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>
                      ↓ {t('download')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ad space */}
      <div style={{ margin: '40px 0', padding: 20, borderRadius: 12, border: '1px dashed var(--border-2)', textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>
        📢 Advertisement – Google AdSense
      </div>

      {/* How-to */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>{t('howTitle')}</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>{t('howDesc')}</p>
      </section>

      {/* FAQ */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>{t('faqTitle')}</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </div>
  );
}

function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderRadius: 12, border: '1px solid var(--border)', background: open === i ? 'var(--surface)' : 'transparent', overflow: 'hidden' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'start' }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>{faq.q}</span>
            <span style={{ color: 'var(--accent)', fontSize: 18, transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none', flexShrink: 0, marginInlineStart: 12 }}>+</span>
          </button>
          {open === i && <div style={{ padding: '0 20px 16px', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>}
        </div>
      ))}
    </div>
  );
}
