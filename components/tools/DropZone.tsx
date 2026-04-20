'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslations } from 'next-intl';
import { FileUp, FolderOpen } from 'lucide-react';

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  maxSize?: number;
  supportsLabel?: string;
  maxSizeLabel?: string;
}

export default function DropZone({
  onFiles,
  accept,
  multiple = true,
  maxSize = 10 * 1024 * 1024,
  supportsLabel,
  maxSizeLabel,
}: DropZoneProps) {
  const t = useTranslations('upload');

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) onFiles(accepted);
  }, [onFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept, multiple, maxSize,
  });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}
      style={{
        borderRadius: 16, padding: '48px 24px', textAlign: 'center',
      }}>
      <input {...getInputProps()} />
      <div style={{ marginBottom: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: 'var(--bg-3)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, margin: '0 auto 16px',
          transition: 'all 0.2s',
          ...(isDragActive ? { background: 'var(--accent-soft)', borderColor: 'var(--accent)' } : {}),
        }}>
          {isDragActive ? <FileUp aria-hidden="true" size={28} /> : <FolderOpen aria-hidden="true" size={28} />}
        </div>
        <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
          {isDragActive ? 'Drop files here' : t('drag')}
        </p>
        <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 12 }}>
          {t('or')}
        </p>
        <span style={{
          padding: '10px 24px', borderRadius: 10,
          background: 'var(--accent)', color: 'var(--accent-contrast)',
          fontWeight: 600, fontSize: 14, cursor: 'pointer',
        }}>
          {t('browse')}
        </span>
      </div>
      <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 16 }}>
        {supportsLabel ?? t('supports')} · {maxSizeLabel ?? t('maxSize')}
      </p>
    </div>
  );
}
