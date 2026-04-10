import { NextRequest, NextResponse } from 'next/server';

const rateLimits = new Map<string, { count: number; reset: number }>();

function getClientKey(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'anonymous';
}

function checkRateLimit(key: string, limit = 20): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const current = rateLimits.get(key);

  if (!current || now > current.reset) {
    rateLimits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }

  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI text generation is not configured yet.' },
        { status: 503 }
      );
    }

    const clientKey = getClientKey(req);
    if (!checkRateLimit(clientKey)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded for AI text generation. Please try again later.' },
        { status: 429 }
      );
    }

    const { prompt, tone } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (prompt.length > 3000) {
      return NextResponse.json({ error: 'Prompt is too long.' }, { status: 400 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: `Write in a ${tone || 'professional'} tone. ${prompt}\n\nWrite 2-3 paragraphs only. Be concise and high quality.`,
        }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'AI text generation failed upstream. Please try again later.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: 'AI text generation returned an empty response.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ text });

  } catch {
    return NextResponse.json(
      { error: 'Our AI service is temporarily unavailable. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
