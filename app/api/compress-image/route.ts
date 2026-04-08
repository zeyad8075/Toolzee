import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter (use Redis in production)
const rateLimits = new Map<string, { count: number; reset: number }>();

function checkRateLimit(apiKey: string, limit = 100): boolean {
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000; // 24 hours
  const entry = rateLimits.get(apiKey);

  if (!entry || now > entry.reset) {
    rateLimits.set(apiKey, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const apiKey = authHeader?.replace('Bearer ', '') || '';

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key required. Pass Authorization: Bearer YOUR_KEY' },
      { status: 401 }
    );
  }

  if (!checkRateLimit(apiKey)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Free tier: 100 requests/day.' },
      { status: 429 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const quality = Number(formData.get('quality') || 80);

    if (!file) {
      return NextResponse.json({ error: 'No image provided. Use form-data with key "image".' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Image compression is processed client-side for privacy. Use the browser API for actual compression.',
      original_size: file.size,
      original_name: file.name,
      quality,
      note: 'For server-side processing, upgrade to Pro plan.',
    });

  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
