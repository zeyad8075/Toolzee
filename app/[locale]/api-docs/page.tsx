import type { Metadata } from 'next';
import APIDocs from './APIDocs';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'API Documentation – ToolForge Developer API',
    description: 'Integrate image compression, conversion, and QR generation into your apps with ToolForge REST API.',
    keywords: ['image compression api', 'qr code api', 'image convert api free'],
  };
}

export default function APIDocsPage() {
  return <APIDocs />;
}
