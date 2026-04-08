import type { Metadata } from 'next';
import ResizeTool from './ResizeTool';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Resize Image Online Free – Change Image Dimensions Instantly',
    description: 'Free online image resizer. Resize images to exact pixel dimensions or percentage. Fast, private, no upload.',
    keywords: ['resize image online', 'change image size', 'image resizer free', 'resize photo online'],
  };
}

export default function ResizePage() {
  return <ResizeTool />;
}
