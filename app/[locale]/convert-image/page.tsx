import type { Metadata } from 'next';
import ConvertTool from './ConvertTool';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Convert Image Online Free – PNG to JPG, WebP Converter',
    description: 'Free online image converter. Convert PNG to JPG, WebP, GIF and more. Fast, private, no upload required.',
    keywords: ['convert png to jpg online', 'image converter free', 'png to webp', 'jpg to png converter'],
  };
}

export default function ConvertPage() {
  return <ConvertTool />;
}
