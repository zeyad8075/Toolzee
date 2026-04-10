import { NextResponse } from 'next/server';

export function POST() {
  return NextResponse.json(
    {
      error: 'Toolzee does not currently provide a public QR API. Use the website QR generator instead.',
    },
    { status: 410 }
  );
}
