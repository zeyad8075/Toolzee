import type { Metadata } from 'next';
import AITools from './AITools';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AI-Powered Image & Text Tools – Free Online AI Tools',
    description: 'Free AI tools: image enhancer, text generator. Powered by AI. Fast, easy, no signup.',
    keywords: ['ai image enhancer', 'ai text generator', 'ai tools online free'],
  };
}

export default function AIPage() {
  return <AITools />;
}
