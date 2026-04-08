# ToolForge – Free Online Tools Platform

A production-ready micro-SaaS platform with free image tools, AI features, paid API, full SEO, and English/Arabic (RTL) support.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open http://localhost:3000 → auto-redirects to /en

## Tools Included

- **Image Compressor** `/compress-image` – JPEG compression, batch ZIP download
- **Image Converter** `/convert-image` – JPG ↔ PNG ↔ WebP in-browser
- **Image Resizer** `/resize-image` – Pixel dimensions or percentage, aspect ratio lock
- **QR Generator** `/qr-generator` – Custom color QR codes, instant PNG download
- **AI Image Enhancer** `/ai-tools` – Canvas 1.5× upscale + sharpening
- **AI Text Generator** `/ai-tools` – Powered by Claude (falls back to mock)

## API Endpoints

- `POST /api/compress-image` – with API key auth + rate limiting
- `POST /api/qr-code` – QR code generation
- `POST /api/generate-text` – AI text via Claude

## Multi-Language

- English `/en` (default) + Arabic `/ar` (full RTL)
- Translations: `/translations/en.json` and `/translations/ar.json`

## Deploy

```bash
vercel
vercel env add ANTHROPIC_API_KEY
```

See README for full documentation on monetization, SEO, and extending the platform.
