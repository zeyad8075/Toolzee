import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'API key required.' }, { status: 401 });
  }

  try {
    const { text, size = 300, fg_color = '#000000', bg_color = '#ffffff' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'text field is required.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      qr_url: `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=${fg_color.replace('#', '')}&bgcolor=${bg_color.replace('#', '')}`,
      text,
      size,
      note: 'QR code URL generated successfully.',
    });

  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
