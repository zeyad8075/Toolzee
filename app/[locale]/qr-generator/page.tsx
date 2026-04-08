import type { Metadata } from 'next';
import QRTool from './QRTool';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'QR Code Generator Free – Create QR Codes Instantly',
    description: 'Free online QR code generator. Create QR codes for URLs, text, contact info. Download as PNG. No signup required.',
    keywords: ['generate qr code free', 'qr code generator', 'free qr code maker', 'create qr code online'],
  };
}

export default function QRPage() {
  return <QRTool />;
}
