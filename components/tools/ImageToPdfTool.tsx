'use client';

import NextImage from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import DropZone from '@/components/tools/DropZone';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';

interface ImageItem {
  id: string;
  file: File;
  preview: string;
}

interface PdfImage {
  data: Uint8Array;
  width: number;
  height: number;
}

function bytesToBinary(bytes: Uint8Array) {
  let binary = '';
  const chunkSize = 8192;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.slice(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return binary;
}

function binaryToBytes(binary: string) {
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index) & 0xff;
  }
  return bytes;
}

function loadImageAsJpeg(file: File): Promise<PdfImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const maxSide = 1800;
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      URL.revokeObjectURL(url);

      if (!ctx) {
        reject(new Error('Canvas is unavailable.'));
        return;
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(async blob => {
        if (!blob) {
          reject(new Error('Unable to export image.'));
          return;
        }
        resolve({
          data: new Uint8Array(await blob.arrayBuffer()),
          width,
          height,
        });
      }, 'image/jpeg', 0.92);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unable to load image.'));
    };

    img.src = url;
  });
}

function buildPdf(images: PdfImage[]) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const objectCount = 2 + images.length * 3;
  const offsets: number[] = Array(objectCount + 1).fill(0);
  let pdf = '%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n';

  function addObject(id: number, body: string) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${body}\nendobj\n`;
  }

  const pageIds = images.map((_, index) => 3 + index * 3 + 2);
  addObject(1, '<< /Type /Catalog /Pages 2 0 R >>');
  addObject(2, `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(' ')}] /Count ${images.length} >>`);

  images.forEach((image, index) => {
    const imageId = 3 + index * 3;
    const contentId = imageId + 1;
    const pageId = imageId + 2;
    const scale = Math.min((pageWidth - margin * 2) / image.width, (pageHeight - margin * 2) / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const x = (pageWidth - drawWidth) / 2;
    const y = (pageHeight - drawHeight) / 2;
    const imageName = `Im${index}`;
    const content = `q\n${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/${imageName} Do\nQ`;

    offsets[imageId] = pdf.length;
    pdf += `${imageId} 0 obj\n`;
    pdf += `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.data.length} >>\nstream\n`;
    pdf += bytesToBinary(image.data);
    pdf += '\nendstream\nendobj\n';

    addObject(contentId, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
    addObject(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /${imageName} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`);
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= objectCount; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([binaryToBytes(pdf)], { type: 'application/pdf' });
}

export default function ImageToPdfTool() {
  const t = useTranslations('imageToPdf');
  const note = useTranslations('supportNote');
  const [items, setItems] = useState<ImageItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  function addFiles(files: File[]) {
    const nextItems = files.map(file => ({
      id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setItems(current => [...current, ...nextItems]);
    setPdfUrl('');
    trackAnalyticsEvent('upload_images', { tool: 'image_to_pdf', file_count: files.length });
  }

  function removeItem(id: string) {
    setItems(current => {
      const item = current.find(entry => entry.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return current.filter(entry => entry.id !== id);
    });
    setPdfUrl('');
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems(current => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setPdfUrl('');
  }

  function clearItems() {
    setItems(current => {
      current.forEach(item => URL.revokeObjectURL(item.preview));
      return [];
    });
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl('');
  }

  async function convert() {
    if (!items.length) return;
    setProcessing(true);
    setPdfUrl('');

    try {
      const images = await Promise.all(items.map(item => loadImageAsJpeg(item.file)));
      const blob = buildPdf(images);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      trackAnalyticsEvent('convert_image_to_pdf', { file_count: items.length });
    } finally {
      setProcessing(false);
    }
  }

  function download() {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'toolzee-images.pdf';
    link.click();
    trackAnalyticsEvent('download_result', { tool: 'image_to_pdf', file_type: 'pdf' });
  }

  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      <DropZone onFiles={addFiles} accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }} multiple />

      {items.length ? (
        <section style={{ marginTop: 24, display: 'grid', gap: 14 }}>
          {items.map((item, index) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
              <NextImage src={item.preview} alt="" width={64} height={64} unoptimized style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10 }} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{index + 1}. {item.file.name}</div>
                <div style={{ color: 'var(--text-3)', fontSize: 13 }}>{(item.file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              {items.length > 1 ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="btn-ghost" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label={t('moveUp')} style={{ width: 38, height: 38, borderRadius: 10, cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.45 : 1, fontWeight: 900 }}>
                    ↑
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} aria-label={t('moveDown')} style={{ width: 38, height: 38, borderRadius: 10, cursor: index === items.length - 1 ? 'not-allowed' : 'pointer', opacity: index === items.length - 1 ? 0.45 : 1, fontWeight: 900 }}>
                    ↓
                  </button>
                </div>
              ) : null}
              <button type="button" className="btn-ghost" onClick={() => removeItem(item.id)} style={{ padding: '9px 14px', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>
                {t('remove')}
              </button>
            </div>
          ))}
        </section>
      ) : null}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
        <button type="button" className="btn-primary" onClick={convert} disabled={!items.length || processing} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, border: 'none', fontWeight: 800, cursor: items.length && !processing ? 'pointer' : 'not-allowed', opacity: items.length && !processing ? 1 : 0.65 }}>
          {processing ? t('processing') : t('convert')}
        </button>
        <button type="button" className="btn-ghost" onClick={download} disabled={!pdfUrl} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, fontWeight: 800, cursor: pdfUrl ? 'pointer' : 'not-allowed', opacity: pdfUrl ? 1 : 0.65 }}>
          {t('download')}
        </button>
        <button type="button" className="btn-ghost" onClick={clearItems} disabled={!items.length} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, fontWeight: 800, cursor: items.length ? 'pointer' : 'not-allowed', opacity: items.length ? 1 : 0.65 }}>
          {t('clear')}
        </button>
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
