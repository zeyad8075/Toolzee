'use client';

import NextImage from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CircleX, Download, Eraser, Image as ImageIcon, LoaderCircle, RotateCcw } from 'lucide-react';
import DropZone from '@/components/tools/DropZone';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';

type RemoveBackgroundModule = typeof import('@imgly/background-removal');

interface SelectedImage {
  file: File;
  previewUrl: string;
  resultBlob: Blob | null;
  resultUrl: string | null;
  status: 'ready' | 'processing' | 'done' | 'error';
  error: string | null;
}

export default function RemoveBackgroundTool() {
  const t = useTranslations('removeBackground');
  const tc = useTranslations('common');
  const note = useTranslations('supportNote');
  const [image, setImage] = useState<SelectedImage | null>(null);

  useEffect(() => {
    return () => {
      if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
      if (image?.resultUrl) URL.revokeObjectURL(image.resultUrl);
    };
  }, [image]);

  const clearImage = useCallback(() => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    if (image?.resultUrl) URL.revokeObjectURL(image.resultUrl);
    setImage(null);
  }, [image]);

  const handleFiles = useCallback((accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;

    setImage(current => {
      if (current?.previewUrl) URL.revokeObjectURL(current.previewUrl);
      if (current?.resultUrl) URL.revokeObjectURL(current.resultUrl);
      return {
        file,
        previewUrl: URL.createObjectURL(file),
        resultBlob: null,
        resultUrl: null,
        status: 'ready',
        error: null,
      };
    });
    trackAnalyticsEvent('upload_images', { tool: 'remove_background', file_count: 1 });
  }, []);

  const handleRemoveBackground = async () => {
    if (!image || image.status === 'processing') return;

    setImage(current => current ? { ...current, status: 'processing', error: null } : current);
    trackAnalyticsEvent('remove_background_start', { file_type: image.file.type || 'unknown' });

    try {
      const { removeBackground } = await import('@imgly/background-removal') as RemoveBackgroundModule;
      const resultBlob = await removeBackground(image.file);
      const resultUrl = URL.createObjectURL(resultBlob);

      setImage(current => {
        if (!current) return current;
        if (current.resultUrl) URL.revokeObjectURL(current.resultUrl);
        return { ...current, resultBlob, resultUrl, status: 'done', error: null };
      });
      trackAnalyticsEvent('remove_background_complete', { status: 'done' });
    } catch (error) {
      console.error(error);
      setImage(current => current ? { ...current, status: 'error', error: t('error') } : current);
      trackAnalyticsEvent('remove_background_complete', { status: 'error' });
    }
  };

  const downloadResult = () => {
    if (!image?.resultBlob) return;
    const url = URL.createObjectURL(image.resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `background_removed_${image.file.name.replace(/\.[^.]+$/, '')}.png`;
    a.click();
    URL.revokeObjectURL(url);
    trackAnalyticsEvent('download_result', { tool: 'remove_background', file_type: 'png' });
  };

  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.7 }}>{t('subtitle')}</p>
      </div>

      {!image && (
        <DropZone
          onFiles={handleFiles}
          accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
          multiple={false}
          supportsLabel={t('supports')}
        />
      )}

      {image && (
        <div style={{ display: 'grid', gap: 20 }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'var(--bg-3)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              flexShrink: 0,
            }}>
              <ImageIcon aria-hidden="true" size={22} />
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <p style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {image.file.name}
              </p>
              <p style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>{t('privateHint')}</p>
            </div>
            <button
              onClick={clearImage}
              className="btn-ghost"
              style={{ padding: '10px 14px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <RotateCcw aria-hidden="true" size={15} /> {tc('reset')}
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}>
            <PreviewPanel label={t('original')} url={image.previewUrl} />
            <PreviewPanel label={t('result')} url={image.resultUrl} emptyLabel={t('resultPlaceholder')} transparent />
          </div>

          {image.status === 'error' && (
            <div style={{
              border: '1px solid color-mix(in srgb, var(--red) 35%, var(--border))',
              background: 'color-mix(in srgb, var(--red) 9%, transparent)',
              color: 'var(--red)',
              borderRadius: 12,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
            }}>
              <CircleX aria-hidden="true" size={17} /> {image.error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={handleRemoveBackground}
              disabled={image.status === 'processing'}
              className="btn-primary"
              style={{ padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: image.status === 'processing' ? 'not-allowed' : 'pointer', opacity: image.status === 'processing' ? 0.72 : 1, display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              {image.status === 'processing' ? <LoaderCircle aria-hidden="true" size={16} /> : <Eraser aria-hidden="true" size={16} />}
              {image.status === 'processing' ? t('processing') : t('remove')}
            </button>
            {image.resultBlob && (
              <button
                onClick={downloadResult}
                className="btn-ghost"
                style={{ padding: '12px 22px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <Download aria-hidden="true" size={16} /> {t('download')}
              </button>
            )}
          </div>
        </div>
      )}

      <SupportNote title={note('title')} body={note('body')} />

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>{t('howTitle')}</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>{t('howDesc')}</p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, fontFamily: 'var(--font-heading)' }}>{t('faqTitle')}</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </div>
  );
}

function PreviewPanel({
  label,
  url,
  emptyLabel,
  transparent = false,
}: {
  label: string;
  url: string | null;
  emptyLabel?: string;
  transparent?: boolean;
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      padding: 14,
      minWidth: 0,
    }}>
      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>{label}</div>
      <div style={{
        position: 'relative',
        aspectRatio: '4 / 3',
        borderRadius: 12,
        border: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: transparent
          ? 'linear-gradient(45deg, var(--bg-3) 25%, transparent 25%), linear-gradient(-45deg, var(--bg-3) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--bg-3) 75%), linear-gradient(-45deg, transparent 75%, var(--bg-3) 75%)'
          : 'var(--bg-3)',
        backgroundColor: 'var(--surface)',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0',
        backgroundSize: '20px 20px',
      }}>
        {url ? (
          <NextImage src={url} alt="" fill unoptimized style={{ objectFit: 'contain', padding: 12 }} />
        ) : (
          <span style={{ color: 'var(--text-3)', fontSize: 13, fontWeight: 600, textAlign: 'center', padding: 20 }}>
            {emptyLabel}
          </span>
        )}
      </div>
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
