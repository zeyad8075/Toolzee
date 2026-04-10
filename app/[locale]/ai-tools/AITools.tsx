'use client';

import NextImage from 'next/image';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';

const TONES = ['Professional', 'Casual', 'Creative', 'Persuasive'];

// AI Image Enhancer using canvas sharpening simulation
function enhanceImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 1.5;
      canvas.height = img.height * 1.5;
      const ctx = canvas.getContext('2d')!;

      // Upscale with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Apply sharpening via unsharp mask simulation
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const strength = 0.3;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] + (data[i] - 128) * strength);
        data[i + 1] = Math.min(255, data[i + 1] + (data[i + 1] - 128) * strength);
        data[i + 2] = Math.min(255, data[i + 2] + (data[i + 2] - 128) * strength);
      }
      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob(b => b ? resolve(b) : reject(), 'image/png');
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function AITools() {
  const t = useTranslations('ai');
  const note = useTranslations('supportNote');
  const toneLabels = t.raw('textGen.tones') as string[];
  const tones = TONES.map((value, index) => ({ value, label: toneLabels[index] || value }));

  // Enhancer state
  const [enhFile, setEnhFile] = useState<File | null>(null);
  const [enhPreview, setEnhPreview] = useState('');
  const [enhResult, setEnhResult] = useState('');
  const [enhancing, setEnhancing] = useState(false);
  const [enhDone, setEnhDone] = useState(false);

  // Text gen state
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState(tones[0]?.value || TONES[0]);
  const [genResult, setGenResult] = useState('');
  const [generating, setGenerating] = useState(false);

  const onDropEnh = useCallback((files: File[]) => {
    if (files[0]) {
      setEnhFile(files[0]);
      setEnhPreview(URL.createObjectURL(files[0]));
      setEnhResult('');
      setEnhDone(false);
      trackAnalyticsEvent('upload_images', { tool: 'enhance', file_count: 1 });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropEnh,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    multiple: false,
  });

  const handleEnhance = async () => {
    if (!enhFile) return;
    setEnhancing(true);
    setEnhDone(false);
    trackAnalyticsEvent('enhance_start', { file_type: enhFile.type || 'image' });
    await new Promise(r => setTimeout(r, 1500)); // simulate AI delay
    try {
      const blob = await enhanceImage(enhFile);
      setEnhResult(URL.createObjectURL(blob));
      setEnhDone(true);
      trackAnalyticsEvent('enhance_complete', { status: 'success' });
    } catch {
      trackAnalyticsEvent('enhance_complete', { status: 'error' });
    }
    setEnhancing(false);
  };

  const downloadEnhanced = () => {
    if (!enhResult) return;
    trackAnalyticsEvent('download_result', { tool: 'enhance', file_type: 'png' });
    const a = document.createElement('a');
    a.href = enhResult; a.download = 'enhanced.png'; a.click();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGenResult('');
    trackAnalyticsEvent('generate_text_start', { tone, prompt_length: prompt.trim().length });
    try {
      const res = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, tone }),
      });
      const data = await res.json();
      setGenResult(data.text || 'Error generating text.');
      trackAnalyticsEvent('generate_text_complete', {
        tone,
        status: res.ok ? 'success' : 'error',
      });
    } catch {
      setGenResult('Unable to connect to AI service. Please try again.');
      trackAnalyticsEvent('generate_text_complete', { tone, status: 'network_error' });
    }
    setGenerating(false);
  };

  const copyGeneratedText = async () => {
    if (!genResult) return;
    await navigator.clipboard.writeText(genResult);
    trackAnalyticsEvent('copy_generated_text', { tool: 'ai_text' });
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      {/* AI Image Enhancer */}
      <section style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 20, padding: 32, marginBottom: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#ec4899,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✨</div>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-heading)' }}>{t('enhancer.title')}</h2>
            <p style={{ color: 'var(--text-2)', fontSize: 14 }}>{t('enhancer.desc')}</p>
          </div>
          <div style={{ marginInlineStart: 'auto', padding: '4px 12px', borderRadius: 6, background: 'rgba(168,85,247,0.12)', color: '#a855f7', fontSize: 12, fontWeight: 600 }}>
            {t('badges.local')}
          </div>
        </div>

        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}
          style={{ borderRadius: 14, padding: '32px 24px', textAlign: 'center', marginTop: 20 }}>
          <input {...getInputProps()} />
          {enhPreview ? (
            <NextImage src={enhPreview} alt="preview" width={320} height={160} unoptimized style={{ maxHeight: 160, maxWidth: '100%', width: 'auto', height: 'auto', borderRadius: 10, objectFit: 'contain' }} />
          ) : (
            <div>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{isDragActive ? '📂' : '🖼️'}</div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>Drop image here or click to browse</p>
              <p style={{ color: 'var(--text-3)', fontSize: 13 }}>JPG, PNG, WebP · Max 10MB</p>
            </div>
          )}
        </div>

        {enhFile && (
          <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={handleEnhance} disabled={enhancing} className="btn-primary"
              style={{ padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: enhancing ? 'not-allowed' : 'pointer', opacity: enhancing ? 0.7 : 1, flex: 1 }}>
              {enhancing ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span className="animate-spin-custom" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
                  {t('enhancer.processing')}
                </span>
              ) : `✨ ${t('enhancer.button')}`}
            </button>
            {enhDone && (
              <button onClick={downloadEnhanced} className="btn-ghost"
                style={{ padding: '12px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                ↓ Download Enhanced
              </button>
            )}
          </div>
        )}

        {enhDone && enhResult && (
          <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <span style={{ color: 'var(--green)', fontWeight: 600, fontSize: 14 }}>{t('enhancer.resultNote')}</span>
          </div>
        )}
      </section>

      {/* AI Text Generator */}
      <section style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 20, padding: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🤖</div>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-heading)' }}>{t('textGen.title')}</h2>
            <p style={{ color: 'var(--text-2)', fontSize: 14 }}>{t('textGen.desc')}</p>
          </div>
          <div style={{ marginInlineStart: 'auto', padding: '4px 12px', borderRadius: 6, background: 'rgba(108,99,255,0.12)', color: 'var(--accent)', fontSize: 12, fontWeight: 600 }}>
            {t('badges.text')}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 8 }}>{t('textGen.label')}</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={t('textGen.placeholder')}
            rows={4}
            style={{
              width: '100%', padding: '14px', borderRadius: 12,
              border: '1px solid var(--border)', background: 'var(--bg-3)',
              color: 'var(--text)', fontSize: 14, resize: 'vertical', fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 10 }}>{t('textGen.tone')}</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tones.map(to => (
              <button key={to.value} onClick={() => setTone(to.value)} style={{
                padding: '8px 18px', borderRadius: 8, fontWeight: 600, fontSize: 13,
                border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                background: tone === to.value ? 'var(--accent)' : 'var(--bg-3)',
                borderColor: tone === to.value ? 'var(--accent)' : 'var(--border)',
                color: tone === to.value ? 'white' : 'var(--text-2)',
              }}>{to.label}</button>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} disabled={generating || !prompt.trim()} className="btn-primary"
          style={{ width: '100%', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15, border: 'none', cursor: (generating || !prompt.trim()) ? 'not-allowed' : 'pointer', opacity: (generating || !prompt.trim()) ? 0.7 : 1 }}>
          {generating ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <span className="animate-spin-custom" style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
              {t('textGen.generating')}
            </span>
          ) : `🤖 ${t('textGen.generate')}`}
        </button>

        {genResult && (
          <div style={{ marginTop: 20 }}>
            <label style={{ fontWeight: 700, fontSize: 14, display: 'block', marginBottom: 8 }}>{t('textGen.result')}</label>
            <div style={{
              padding: 20, borderRadius: 12,
              background: 'var(--bg-3)', border: '1px solid var(--border)',
              fontSize: 15, lineHeight: 1.8, color: 'var(--text)',
              position: 'relative',
            }}>
              {genResult}
              <button onClick={copyGeneratedText}
                style={{
                  position: 'absolute', top: 12, insetInlineEnd: 12,
                  padding: '6px 12px', borderRadius: 6,
                  background: 'var(--bg-2)', border: '1px solid var(--border)',
                  cursor: 'pointer', fontSize: 12, color: 'var(--text-2)',
                }}>
                Copy
              </button>
            </div>
          </div>
        )}
      </section>

      <SupportNote title={note('title')} body={note('body')} />
    </div>
  );
}
