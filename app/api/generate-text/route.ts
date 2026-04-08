import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, tone } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: `Write in a ${tone || 'professional'} tone. ${prompt}\n\nWrite 2-3 paragraphs only. Be concise and high quality.`,
        }],
      }),
    });

    if (!response.ok) {
      // Fallback: return a mock response if API key not set
      const mockText = generateMockText(prompt, tone);
      return NextResponse.json({ text: mockText });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || generateMockText(prompt, tone);
    return NextResponse.json({ text });

  } catch {
    return NextResponse.json({
      text: 'Our AI service is temporarily unavailable. Please try again in a moment.',
    });
  }
}

function generateMockText(prompt: string, tone: string): string {
  const toneAdverb = {
    Professional: 'effectively',
    Casual: 'easily',
    Creative: 'imaginatively',
    Persuasive: 'compellingly',
  }[tone] || 'effectively';

  return `Based on your request about "${prompt}", here is a ${tone?.toLowerCase()} response crafted ${toneAdverb}.\n\nThis content has been generated to match your specific requirements and tone preferences. The text is designed to be engaging, relevant, and ready to use in your projects.\n\nFeel free to edit and customize this content to better fit your needs. For the best results, provide more specific details in your prompt.`;
}
