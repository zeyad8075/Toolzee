'use client';

import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { degrees as pdfDegrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useTranslations } from 'next-intl';
import DropZone from '@/components/tools/DropZone';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';

type PdfMode =
  | 'mergePdf'
  | 'splitPdf'
  | 'compressPdf'
  | 'pdfToImage'
  | 'rotatePdf'
  | 'removePdfPages'
  | 'extractPdfPages'
  | 'addPageNumbers'
  | 'addWatermark';

interface PdfToolProps {
  mode: PdfMode;
}

interface PdfFileItem {
  id: string;
  file: File;
}

interface ResultFile {
  url: string;
  fileName: string;
  size: number;
  kind: 'pdf' | 'zip';
}

interface CompressionResult extends ResultFile {
  preset: PdfCompressionPreset;
  reduction: number;
}

interface PagePreview {
  pageNumber: number;
  url: string;
}

type PdfCompressionPreset = 'light' | 'balanced' | 'strong' | 'maximum';

const MAX_PDF_SIZE = 50 * 1024 * 1024;

const compressionPresets: Record<PdfCompressionPreset, {
  reduction: number;
  scale: number;
  quality: number;
}> = {
  light: { reduction: 10, scale: 1, quality: 1 },
  balanced: { reduction: 40, scale: 2.4, quality: 0.86 },
  strong: { reduction: 60, scale: 1.55, quality: 0.66 },
  maximum: { reduction: 75, scale: 0.85, quality: 0.42 },
};

const compressionPresetOrder: PdfCompressionPreset[] = ['light', 'balanced', 'strong', 'maximum'];

const toolFileNames: Record<PdfMode, string> = {
  mergePdf: 'toolzee-merged.pdf',
  splitPdf: 'toolzee-pages.pdf',
  compressPdf: 'toolzee-compressed.pdf',
  pdfToImage: 'toolzee-pdf-images.zip',
  rotatePdf: 'toolzee-rotated.pdf',
  removePdfPages: 'toolzee-pages-removed.pdf',
  extractPdfPages: 'toolzee-extracted-pages.pdf',
  addPageNumbers: 'toolzee-numbered.pdf',
  addWatermark: 'toolzee-watermarked.pdf',
};

function formatBytes(bytes: number) {
  if (!bytes) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function downloadUrl(url: string, fileName: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
}

function blobFromBytes(bytes: Uint8Array, type: string) {
  return new Blob([new Uint8Array(bytes)], { type });
}

function makeResult(blob: Blob, fileName: string, kind: ResultFile['kind']): ResultFile {
  return {
    url: URL.createObjectURL(blob),
    fileName,
    size: blob.size,
    kind,
  };
}

function parsePageRanges(input: string, pageCount: number) {
  const normalized = input.trim();
  if (!normalized) return Array.from({ length: pageCount }, (_, index) => index);

  const pages = new Set<number>();
  const parts = normalized.split(',').map(part => part.trim()).filter(Boolean);

  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      if (start < 1 || end < start || end > pageCount) {
        throw new Error('invalidRange');
      }
      for (let page = start; page <= end; page += 1) pages.add(page - 1);
      continue;
    }

    const singlePage = Number(part);
    if (!Number.isInteger(singlePage) || singlePage < 1 || singlePage > pageCount) {
      throw new Error('invalidRange');
    }
    pages.add(singlePage - 1);
  }

  if (!pages.size) throw new Error('invalidRange');
  return [...pages].sort((first, second) => first - second);
}

function formatPageIndexes(indexes: number[]) {
  return indexes.map(index => String(index + 1)).join(', ');
}

function canvasToBlob(canvas: HTMLCanvasElement, type = 'image/png', quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('canvasExportFailed'));
    }, type, quality);
  });
}

async function loadPdfPageCount(file: File) {
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  return source.getPageCount();
}

async function renderPdfPagePreviews(file: File, maxPages = 48) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/legacy/build/pdf.worker.mjs',
    import.meta.url,
  ).toString();

  const bytes = new Uint8Array(await file.arrayBuffer());
  const documentTask = pdfjs.getDocument({
    data: bytes,
    useWorkerFetch: false,
    isEvalSupported: false,
  });
  const pdf = await documentTask.promise;
  const previews: PagePreview[] = [];
  const totalPages = pdf.numPages;
  const count = Math.min(totalPages, maxPages);

  try {
    for (let pageNumber = 1; pageNumber <= count; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 0.28 });
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext('2d');

      if (!context) throw new Error('canvasUnavailable');

      await page.render({ canvas, canvasContext: context, viewport }).promise;
      const blob = await canvasToBlob(canvas);
      previews.push({ pageNumber, url: URL.createObjectURL(blob) });
      page.cleanup();
    }
  } finally {
    await pdf.destroy();
  }

  return { count: totalPages, previews };
}

async function mergePdfs(files: File[]) {
  const merged = await PDFDocument.create();

  for (const file of files) {
    const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
    const copiedPages = await merged.copyPages(source, source.getPageIndices());
    copiedPages.forEach(page => merged.addPage(page));
  }

  return blobFromBytes(await merged.save({ useObjectStreams: true }), 'application/pdf');
}

async function extractPdfPages(file: File, pageIndexes: number[]) {
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const output = await PDFDocument.create();
  const copiedPages = await output.copyPages(source, pageIndexes);
  copiedPages.forEach(page => output.addPage(page));
  return blobFromBytes(await output.save({ useObjectStreams: true }), 'application/pdf');
}

async function splitPdfIntoZip(file: File, pageCount: number) {
  const zip = new JSZip();

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const blob = await extractPdfPages(file, [pageIndex]);
    zip.file(`page-${String(pageIndex + 1).padStart(2, '0')}.pdf`, blob);
  }

  return zip.generateAsync({ type: 'blob' });
}

async function removePdfPages(file: File, pageIndexes: number[], pageCount: number) {
  const removeSet = new Set(pageIndexes);
  const keepIndexes = Array.from({ length: pageCount }, (_, index) => index).filter(index => !removeSet.has(index));

  if (!keepIndexes.length) throw new Error('invalidRange');
  return extractPdfPages(file, keepIndexes);
}

async function rotatePdf(file: File, pageIndexes: number[], rotation: number) {
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const rotateSet = new Set(pageIndexes);

  source.getPages().forEach((page, index) => {
    if (!rotateSet.has(index)) return;
    const currentAngle = page.getRotation().angle;
    page.setRotation(pdfDegrees((currentAngle + rotation + 360) % 360));
  });

  return blobFromBytes(await source.save({ useObjectStreams: true, addDefaultPage: false }), 'application/pdf');
}

async function addPageNumbers(file: File, position: 'bottom' | 'top') {
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const font = await source.embedFont(StandardFonts.Helvetica);
  const pages = source.getPages();
  const fontSize = 10;

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const text = `${index + 1} / ${pages.length}`;
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: position === 'top' ? height - 28 : 20,
      size: fontSize,
      font,
      color: rgb(0.25, 0.25, 0.25),
    });
  });

  return blobFromBytes(await source.save({ useObjectStreams: true, addDefaultPage: false }), 'application/pdf');
}

async function addWatermark(file: File, text: string) {
  const normalizedText = text.trim();
  if (!normalizedText) throw new Error('missingWatermark');

  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const font = await source.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 42;

  source.getPages().forEach(page => {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(normalizedText, fontSize);
    page.drawText(normalizedText, {
      x: (width - textWidth) / 2,
      y: height / 2,
      size: fontSize,
      font,
      color: rgb(0.55, 0.55, 0.55),
      opacity: 0.28,
      rotate: pdfDegrees(-32),
    });
  });

  return blobFromBytes(await source.save({ useObjectStreams: true, addDefaultPage: false }), 'application/pdf');
}

async function compactPdf(file: File) {
  const source = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  source.setCreator('Toolzee');
  source.setProducer('Toolzee');

  return blobFromBytes(
    await source.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    }),
    'application/pdf',
  );
}

async function rasterizePdf(file: File, scale: number, quality: number) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/legacy/build/pdf.worker.mjs',
    import.meta.url,
  ).toString();

  const bytes = new Uint8Array(await file.arrayBuffer());
  const documentTask = pdfjs.getDocument({
    data: bytes,
    useWorkerFetch: false,
    isEvalSupported: false,
  });
  const source = await documentTask.promise;
  const output = await PDFDocument.create();

  try {
    for (let pageNumber = 1; pageNumber <= source.numPages; pageNumber += 1) {
      const sourcePage = await source.getPage(pageNumber);
      const baseViewport = sourcePage.getViewport({ scale: 1 });
      const renderViewport = sourcePage.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(renderViewport.width);
      canvas.height = Math.ceil(renderViewport.height);
      const context = canvas.getContext('2d');

      if (!context) throw new Error('canvasUnavailable');

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      await sourcePage.render({ canvas, canvasContext: context, viewport: renderViewport }).promise;

      const pageImage = await canvasToBlob(canvas, 'image/jpeg', quality);
      const image = await output.embedJpg(await pageImage.arrayBuffer());
      const page = output.addPage([baseViewport.width, baseViewport.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: baseViewport.width,
        height: baseViewport.height,
      });
      sourcePage.cleanup();
    }
  } finally {
    await source.destroy();
  }

  return blobFromBytes(await output.save({ useObjectStreams: true, addDefaultPage: false }), 'application/pdf');
}

async function compressPdf(file: File, preset: PdfCompressionPreset) {
  const compact = await compactPdf(file);
  if (preset === 'light') return compact;

  const options = compressionPresets[preset];

  try {
    const compressed = await rasterizePdf(file, options.scale, options.quality);
    if (compressed.size < compact.size) return compressed;
  } catch {
    return compact;
  }

  return compact;
}

async function pdfToImagesZip(file: File, scale: number) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/legacy/build/pdf.worker.mjs',
    import.meta.url,
  ).toString();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const documentTask = pdfjs.getDocument({
    data: bytes,
    useWorkerFetch: false,
    isEvalSupported: false,
  });
  const pdf = await documentTask.promise;
  const zip = new JSZip();

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext('2d');

      if (!context) throw new Error('canvasUnavailable');

      await page.render({ canvas, canvasContext: context, viewport }).promise;
      const blob = await canvasToBlob(canvas);
      zip.file(`page-${String(pageNumber).padStart(2, '0')}.png`, blob);
      page.cleanup();
    }
  } finally {
    await pdf.destroy();
  }

  return zip.generateAsync({ type: 'blob' });
}

export default function PdfTool({ mode }: PdfToolProps) {
  const t = useTranslations(`pdfTools.${mode}`);
  const common = useTranslations('pdfTools.common');
  const note = useTranslations('supportNote');
  const [items, setItems] = useState<PdfFileItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ResultFile | null>(null);
  const [compressionResults, setCompressionResults] = useState<CompressionResult[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagePreviews, setPagePreviews] = useState<PagePreview[]>([]);
  const [loadingPreviews, setLoadingPreviews] = useState(false);
  const [pageRange, setPageRange] = useState('');
  const [imageScale, setImageScale] = useState(1.6);
  const [rotation, setRotation] = useState(90);
  const [pageNumberPosition, setPageNumberPosition] = useState<'bottom' | 'top'>('bottom');
  const [watermarkText, setWatermarkText] = useState('Toolzee');
  const [error, setError] = useState('');

  const singleFileMode = mode !== 'mergePdf';
  const selectedFile = items[0]?.file;
  const faqs = t.raw('faq') as { q: string; a: string }[];
  const hasPageRange = mode === 'splitPdf'
    || mode === 'removePdfPages'
    || mode === 'extractPdfPages'
    || mode === 'rotatePdf';
  const hasPagePreview = hasPageRange || mode === 'pdfToImage' || mode === 'addPageNumbers' || mode === 'addWatermark';
  const needsPageCount = hasPagePreview;
  const selectedPageIndexes = (() => {
    if (!pageCount) return [];
    if (!pageRange.trim() && mode === 'rotatePdf') return Array.from({ length: pageCount }, (_, index) => index);
    try {
      return pageRange.trim() ? parsePageRanges(pageRange, pageCount) : [];
    } catch {
      return [];
    }
  })();
  const selectedPageSet = new Set(selectedPageIndexes);

  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  useEffect(() => {
    return () => {
      compressionResults.forEach(item => URL.revokeObjectURL(item.url));
    };
  }, [compressionResults]);

  useEffect(() => {
    return () => {
      pagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [pagePreviews]);

  useEffect(() => {
    let active = true;

    async function inspectFile() {
      setPageCount(0);
      setPagePreviews([]);
      if (!selectedFile || !needsPageCount) return;

      try {
        if (hasPagePreview) {
          setLoadingPreviews(true);
          const { count, previews } = await renderPdfPagePreviews(selectedFile);
          if (active) {
            setPageCount(count);
            setPagePreviews(previews);
          } else {
            previews.forEach(preview => URL.revokeObjectURL(preview.url));
          }
        } else {
          const count = await loadPdfPageCount(selectedFile);
          if (active) setPageCount(count);
        }
      } catch {
        if (active) setError(common('invalidPdf'));
      } finally {
        if (active) setLoadingPreviews(false);
      }
    }

    inspectFile();
    return () => {
      active = false;
    };
  }, [common, hasPagePreview, needsPageCount, selectedFile]);

  function clearResult() {
    setResult(current => {
      if (current) URL.revokeObjectURL(current.url);
      return null;
    });
    setCompressionResults(current => {
      current.forEach(item => URL.revokeObjectURL(item.url));
      return [];
    });
  }

  function addFiles(files: File[]) {
    const nextItems = files.map(file => ({
      id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
      file,
    }));
    setItems(current => singleFileMode ? nextItems.slice(0, 1) : [...current, ...nextItems]);
    setError('');
    setPageRange('');
    clearResult();
    trackAnalyticsEvent('upload_pdf', { tool: mode, file_count: files.length });
  }

  function removeItem(id: string) {
    setItems(current => current.filter(item => item.id !== id));
    setPageCount(0);
    setPagePreviews([]);
    setPageRange('');
    setError('');
    clearResult();
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems(current => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    clearResult();
  }

  function togglePageSelection(pageIndex: number) {
    if (!hasPageRange || !pageCount) return;

    const pages = new Set(selectedPageIndexes);
    if (pages.has(pageIndex)) pages.delete(pageIndex);
    else pages.add(pageIndex);

    setPageRange(formatPageIndexes([...pages].sort((first, second) => first - second)));
    setError('');
    clearResult();
  }

  async function run(action: 'default' | 'splitAll' | 'extractRange' = 'default') {
    if (!items.length || processing) return;

    setProcessing(true);
    setError('');
    clearResult();

    try {
      let output: Blob;
      let fileName = toolFileNames[mode];
      let kind: ResultFile['kind'] = 'pdf';

      if (mode === 'mergePdf') {
        output = await mergePdfs(items.map(item => item.file));
      } else if (mode === 'splitPdf') {
        if (!selectedFile || !pageCount) throw new Error('invalidPdf');

        if (action === 'splitAll') {
          output = await splitPdfIntoZip(selectedFile, pageCount);
          fileName = 'toolzee-split-pages.zip';
          kind = 'zip';
        } else {
          output = await extractPdfPages(selectedFile, parsePageRanges(pageRange, pageCount));
        }
      } else if (mode === 'compressPdf') {
        if (!selectedFile) throw new Error('invalidPdf');
        const outputs: CompressionResult[] = [];

        for (const preset of compressionPresetOrder) {
          const blob = await compressPdf(selectedFile, preset);
          outputs.push({
            ...makeResult(blob, `toolzee-compressed-${preset}.pdf`, 'pdf'),
            preset,
            reduction: selectedFile.size > 0 ? Math.max(0, (1 - blob.size / selectedFile.size) * 100) : 0,
          });
        }

        setCompressionResults(outputs);
        trackAnalyticsEvent('process_pdf', { tool: mode, action, file_count: items.length, compression_outputs: outputs.length });
        return;
      } else if (mode === 'removePdfPages') {
        if (!selectedFile || !pageCount) throw new Error('invalidPdf');
        output = await removePdfPages(selectedFile, parsePageRanges(pageRange, pageCount), pageCount);
      } else if (mode === 'extractPdfPages') {
        if (!selectedFile || !pageCount) throw new Error('invalidPdf');
        output = await extractPdfPages(selectedFile, parsePageRanges(pageRange, pageCount));
      } else if (mode === 'rotatePdf') {
        if (!selectedFile || !pageCount) throw new Error('invalidPdf');
        output = await rotatePdf(selectedFile, parsePageRanges(pageRange, pageCount), rotation);
      } else if (mode === 'addPageNumbers') {
        if (!selectedFile) throw new Error('invalidPdf');
        output = await addPageNumbers(selectedFile, pageNumberPosition);
      } else if (mode === 'addWatermark') {
        if (!selectedFile) throw new Error('invalidPdf');
        output = await addWatermark(selectedFile, watermarkText);
      } else {
        if (!selectedFile) throw new Error('invalidPdf');
        output = await pdfToImagesZip(selectedFile, imageScale);
        kind = 'zip';
      }

      const nextResult = makeResult(output, fileName, kind);
      setResult(nextResult);
      trackAnalyticsEvent('process_pdf', { tool: mode, action, file_count: items.length });
    } catch (caught) {
      const message = caught instanceof Error && caught.message === 'invalidRange'
        ? common('invalidRange')
        : common('error');
      setError(message);
    } finally {
      setProcessing(false);
    }
  }

  function download() {
    if (!result) return;
    downloadUrl(result.url, result.fileName);
    trackAnalyticsEvent('download_result', { tool: mode, file_type: result.kind });
  }

  function downloadResult(file: ResultFile, preset?: PdfCompressionPreset) {
    downloadUrl(file.url, file.fileName);
    trackAnalyticsEvent('download_result', { tool: mode, file_type: file.kind, compression_preset: preset });
  }

  const canProcess = mode === 'mergePdf' ? items.length >= 2 : Boolean(selectedFile) && (!needsPageCount || pageCount > 0);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.7 }}>{t('subtitle')}</p>
      </div>

      <DropZone
        onFiles={addFiles}
        accept={{ 'application/pdf': ['.pdf'] }}
        multiple={!singleFileMode}
        maxSize={MAX_PDF_SIZE}
        supportsLabel={common('supports')}
        maxSizeLabel={common('maxSize')}
      />

      {items.length ? (
        <section style={{ marginTop: 24, display: 'grid', gap: 14 }}>
          {items.map((item, index) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
              <div style={{ width: 54, height: 54, borderRadius: 12, background: 'var(--bg-3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                PDF
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{index + 1}. {item.file.name}</div>
                <div style={{ color: 'var(--text-3)', fontSize: 13 }}>{formatBytes(item.file.size)}</div>
              </div>
              {mode === 'mergePdf' && items.length > 1 ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="btn-ghost" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label={common('moveUp')} style={{ width: 38, height: 38, borderRadius: 10, cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.45 : 1, fontWeight: 900 }}>
                    ↑
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} aria-label={common('moveDown')} style={{ width: 38, height: 38, borderRadius: 10, cursor: index === items.length - 1 ? 'not-allowed' : 'pointer', opacity: index === items.length - 1 ? 0.45 : 1, fontWeight: 900 }}>
                    ↓
                  </button>
                </div>
              ) : null}
              <button type="button" className="btn-ghost" onClick={() => removeItem(item.id)} style={{ padding: '9px 14px', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>
                {common('remove')}
              </button>
            </div>
          ))}
        </section>
      ) : null}

      {hasPageRange && selectedFile ? (
        <section style={{ marginTop: 22, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
          <div style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 12 }}>
            {pageCount ? t('pageCount', { count: pageCount }) : common('readingPdf')}
          </div>
          <label style={{ display: 'grid', gap: 8, fontWeight: 700, fontSize: 14 }}>
            {t('rangeLabel')}
            <input
              value={pageRange}
              onChange={event => setPageRange(event.target.value)}
              placeholder={t('rangePlaceholder')}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: 15 }}
            />
          </label>
          {mode === 'rotatePdf' ? (
            <label style={{ display: 'grid', gap: 8, fontWeight: 700, fontSize: 14, marginTop: 14 }}>
              {t('rotationLabel')}
              <select
                value={rotation}
                onChange={event => setRotation(Number(event.target.value))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: 15 }}
              >
                <option value={90}>{t('rotationOptions.right')}</option>
                <option value={180}>{t('rotationOptions.flip')}</option>
                <option value={270}>{t('rotationOptions.left')}</option>
              </select>
            </label>
          ) : null}
        </section>
      ) : null}

      {mode === 'addPageNumbers' && selectedFile ? (
        <section style={{ marginTop: 22, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
          <label style={{ display: 'grid', gap: 8, fontWeight: 700, fontSize: 14 }}>
            {t('positionLabel')}
            <select
              value={pageNumberPosition}
              onChange={event => setPageNumberPosition(event.target.value as 'bottom' | 'top')}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: 15 }}
            >
              <option value="bottom">{t('positionOptions.bottom')}</option>
              <option value="top">{t('positionOptions.top')}</option>
            </select>
          </label>
        </section>
      ) : null}

      {mode === 'addWatermark' && selectedFile ? (
        <section style={{ marginTop: 22, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
          <label style={{ display: 'grid', gap: 8, fontWeight: 700, fontSize: 14 }}>
            {t('watermarkLabel')}
            <input
              value={watermarkText}
              onChange={event => setWatermarkText(event.target.value)}
              placeholder={t('watermarkPlaceholder')}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: 15 }}
            />
          </label>
        </section>
      ) : null}

      {mode === 'pdfToImage' && selectedFile ? (
        <section style={{ marginTop: 22, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
          <div style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 12 }}>
            {pageCount ? t('pageCount', { count: pageCount }) : common('readingPdf')}
          </div>
          <label style={{ display: 'grid', gap: 8, fontWeight: 700, fontSize: 14 }}>
            {t('quality')}
            <select
              value={imageScale}
              onChange={event => setImageScale(Number(event.target.value))}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: 15 }}
            >
              <option value={1}>{t('qualityOptions.standard')}</option>
              <option value={1.6}>{t('qualityOptions.high')}</option>
              <option value={2.2}>{t('qualityOptions.extra')}</option>
            </select>
          </label>
        </section>
      ) : null}

      {hasPagePreview && selectedFile ? (
        <section style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 12 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, fontFamily: 'var(--font-heading)' }}>{common('previewTitle')}</h2>
              <p style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.6 }}>
                {hasPageRange ? common('previewHint') : common('visualPreviewHint')}
              </p>
            </div>
            {pageCount > pagePreviews.length ? (
              <div style={{ color: 'var(--text-3)', fontSize: 12 }}>
                {common('previewLimited', { count: pagePreviews.length })}
              </div>
            ) : null}
          </div>
          {loadingPreviews ? (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, color: 'var(--text-2)', fontSize: 14 }}>
              {common('readingPdf')}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))', gap: 12 }}>
              {pagePreviews.map(preview => {
                const pageIndex = preview.pageNumber - 1;
                const selected = selectedPageSet.has(pageIndex);
                const thumb = (
                  <div style={{ position: 'relative', borderRadius: 10, background: 'var(--bg-2)', border: selected ? '2px solid var(--accent)' : '1px solid var(--border)', overflow: 'hidden', padding: 8, minHeight: 150 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview.url}
                      alt={common('pageLabel', { page: preview.pageNumber })}
                      style={{
                        width: '100%',
                        height: 118,
                        objectFit: 'contain',
                        background: '#fff',
                        borderRadius: 6,
                        boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
                        transform: mode === 'rotatePdf' && selected ? `rotate(${rotation}deg)` : undefined,
                        transition: 'transform 0.2s ease',
                      }}
                    />
                    {mode === 'addPageNumbers' ? (
                      <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: pageNumberPosition === 'top' ? 18 : 'auto', bottom: pageNumberPosition === 'bottom' ? 28 : 'auto', background: 'rgba(255,255,255,0.86)', color: '#111827', borderRadius: 999, padding: '2px 7px', fontSize: 10, fontWeight: 800 }}>
                        {preview.pageNumber} / {pageCount}
                      </span>
                    ) : null}
                    {mode === 'addWatermark' && watermarkText.trim() ? (
                      <span style={{ position: 'absolute', left: '50%', top: '47%', transform: 'translate(-50%, -50%) rotate(-25deg)', color: 'rgba(17,24,39,0.38)', fontSize: 14, fontWeight: 900, textTransform: 'uppercase', maxWidth: '85%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {watermarkText}
                      </span>
                    ) : null}
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, color: selected ? 'var(--accent)' : 'var(--text-2)', fontSize: 12, fontWeight: 800 }}>
                      <span>{common('pageShort', { page: preview.pageNumber })}</span>
                      {hasPageRange && selected ? <span>{common('selected')}</span> : null}
                    </div>
                  </div>
                );

                return hasPageRange ? (
                  <button
                    key={preview.pageNumber}
                    type="button"
                    onClick={() => togglePageSelection(pageIndex)}
                    aria-pressed={selected}
                    style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'start', cursor: 'pointer' }}
                  >
                    {thumb}
                  </button>
                ) : (
                  <div key={preview.pageNumber}>{thumb}</div>
                );
              })}
            </div>
          )}
        </section>
      ) : null}

      {error ? (
        <div style={{ marginTop: 18, padding: 14, borderRadius: 12, border: '1px solid color-mix(in srgb, #ef4444 45%, var(--border))', color: '#ef4444', background: 'color-mix(in srgb, #ef4444 9%, transparent)', fontSize: 14 }}>
          {error}
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
        {mode === 'splitPdf' ? (
          <>
            <button type="button" className="btn-primary" onClick={() => run('extractRange')} disabled={!canProcess || processing} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, border: 'none', fontWeight: 800, cursor: canProcess && !processing ? 'pointer' : 'not-allowed', opacity: canProcess && !processing ? 1 : 0.65 }}>
              {processing ? common('processing') : t('extract')}
            </button>
            <button type="button" className="btn-ghost" onClick={() => run('splitAll')} disabled={!canProcess || processing} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, fontWeight: 800, cursor: canProcess && !processing ? 'pointer' : 'not-allowed', opacity: canProcess && !processing ? 1 : 0.65 }}>
              {t('splitAll')}
            </button>
          </>
        ) : (
          <button type="button" className="btn-primary" onClick={() => run()} disabled={!canProcess || processing} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, border: 'none', fontWeight: 800, cursor: canProcess && !processing ? 'pointer' : 'not-allowed', opacity: canProcess && !processing ? 1 : 0.65 }}>
            {processing ? common('processing') : t('action')}
          </button>
        )}
        <button type="button" className="btn-ghost" onClick={download} disabled={!result} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, fontWeight: 800, cursor: result ? 'pointer' : 'not-allowed', opacity: result ? 1 : 0.65 }}>
          {result ? common('downloadReady', { size: formatBytes(result.size) }) : common('download')}
        </button>
      </div>

      {mode === 'compressPdf' && selectedFile && compressionResults.length ? (
        <section style={{ marginTop: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 14 }}>
            <Metric label={t('original')} value={formatBytes(selectedFile.size)} />
            <Metric label={t('variants')} value={String(compressionResults.length)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12 }}>
            {compressionResults.map(item => {
              const saved = selectedFile.size - item.size;
              return (
                <article key={item.preset} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, display: 'grid', gap: 10 }}>
                  <div>
                    <h3 style={{ fontWeight: 900, fontSize: 15, marginBottom: 4 }}>{t(`compressionOptions.${item.preset}.name`)}</h3>
                    <p style={{ color: 'var(--text-3)', fontSize: 12, lineHeight: 1.5 }}>{t(`compressionOptions.${item.preset}.desc`)}</p>
                  </div>
                  <div style={{ display: 'grid', gap: 6, color: 'var(--text-2)', fontSize: 13 }}>
                    <div>{t('optimized')}: <strong style={{ color: 'var(--text)' }}>{formatBytes(item.size)}</strong></div>
                    <div>{t('saved')}: <strong style={{ color: item.reduction > 0 ? 'var(--green)' : 'var(--text)' }}>{formatBytes(Math.max(0, saved))}</strong></div>
                    <div>{t('reduction')}: <strong style={{ color: item.reduction > 0 ? 'var(--green)' : 'var(--text)' }}>{item.reduction.toFixed(1)}%</strong></div>
                  </div>
                  <button type="button" className="btn-primary" onClick={() => downloadResult(item, item.preset)} style={{ padding: '10px 14px', borderRadius: 10, border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                    {t('downloadVariant')}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }}>
      <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800 }}>{value}</div>
    </div>
  );
}
