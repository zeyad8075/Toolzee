import { NextResponse } from 'next/server';

export function POST() {
  return NextResponse.json(
    {
      error: 'Toolzee does not currently provide a public image compression API. Use the website tool, which performs compression in your browser.',
    },
    { status: 410 }
  );
}
