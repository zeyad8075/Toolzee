'use client';

import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';
import { useTranslations } from 'next-intl';
import DropZone from '@/components/tools/DropZone';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';

type PdfMode = 'mergePdf' | 'splitPdf' | 'compressPdf' | 'pdfToImage';

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

const MAX_PDF_SIZE = 50 * 1024 * 1024;

const toolFileNames: Record<PdfMode, string> = {
  mergePdf: 'toolzee-merged.pdf',
  splitPdf: 'toolzee-pages.pdf',
  compressPdf: 'toolzee-compressed.pdf',
  pdfToImage: 'toolzee-pdf-images.zip',
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

function canvasToBlob(canvas: HTMLCanvasElement, type = 'image/png'): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('canvasExportFailed'));
    }, type);
  });
}

async function loadPdfPageCount(file: File) {
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  return source.getPageCount();
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

async function compressPdf(file: File) {
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
  const [pageCount, setPageCount] = useState(0);
  const [pageRange, setPageRange] = useState('');
  const [imageScale, setImageScale] = useState(1.6);
  const [error, setError] = useState('');

  const singleFileMode = mode !== 'mergePdf';
  const selectedFile = items[0]?.file;
  const faqs = t.raw('faq') as { q: string; a: string }[];

  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  useEffect(() => {
    let active = true;

    async function inspectFile() {
      setPageCount(0);
      if (!selectedFile || (mode !== 'splitPdf' && mode !== 'pdfToImage')) return;

      try {
        const count = await loadPdfPageCount(selectedFile);
        if (active) setPageCount(count);
      } catch {
        if (active) setError(common('invalidPdf'));
      }
    }

    inspectFile();
    return () => {
      active = false;
    };
  }, [common, mode, selectedFile]);

  function clearResult() {
    setResult(current => {
      if (current) URL.revokeObjectURL(current.url);
      return null;
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
    setPageRange('');
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
        output = await compressPdf(selectedFile);
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

  const canProcess = mode === 'mergePdf' ? items.length >= 2 : Boolean(selectedFile);
  const savedBytes = selectedFile && result && mode === 'compressPdf' ? selectedFile.size - result.size : 0;

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
              <button type="button" className="btn-ghost" onClick={() => removeItem(item.id)} style={{ padding: '9px 14px', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>
                {common('remove')}
              </button>
            </div>
          ))}
        </section>
      ) : null}

      {mode === 'splitPdf' && selectedFile ? (
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

      {error ? (
        <div style={{ marginTop: 18, padding: 14, borderRadius: 12, border: '1px solid color-mix(in srgb, #ef4444 45%, var(--border))', color: '#ef4444', background: 'color-mix(in srgb, #ef4444 9%, transparent)', fontSize: 14 }}>
          {error}
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
        {mode === 'splitPdf' ? (
          <>
            <button type="button" className="btn-primary" onClick={() => run('extractRange')} disabled={!canProcess || processing || !pageCount} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, border: 'none', fontWeight: 800, cursor: canProcess && !processing && pageCount ? 'pointer' : 'not-allowed', opacity: canProcess && !processing && pageCount ? 1 : 0.65 }}>
              {processing ? common('processing') : t('extract')}
            </button>
            <button type="button" className="btn-ghost" onClick={() => run('splitAll')} disabled={!canProcess || processing || !pageCount} style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 12, fontWeight: 800, cursor: canProcess && !processing && pageCount ? 'pointer' : 'not-allowed', opacity: canProcess && !processing && pageCount ? 1 : 0.65 }}>
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

      {mode === 'compressPdf' && selectedFile && result ? (
        <section style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <Metric label={t('original')} value={formatBytes(selectedFile.size)} />
          <Metric label={t('optimized')} value={formatBytes(result.size)} />
          <Metric label={savedBytes >= 0 ? t('saved') : t('larger')} value={formatBytes(Math.abs(savedBytes))} />
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
