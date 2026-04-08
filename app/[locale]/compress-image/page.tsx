import type { Metadata } from 'next';
import CompressTool from './CompressTool';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Compress Image Online Free – Reduce File Size Without Losing Quality',
    description: 'Free online image compressor. Reduce JPG, PNG, WebP file size without losing quality. No upload, works in your browser.',
    keywords: ['compress image online free', 'reduce image size without losing quality', 'compress image to 100kb', 'image compressor'],
    openGraph: { title: 'Image Compressor – ToolForge', description: 'Compress images instantly in your browser. Free, fast, private.' },
  };
}

export default function CompressPage() {
  return <CompressTool />;
}
