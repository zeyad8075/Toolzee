# Toolzee – Free Online Tools Platform

A free online tools project focused on image workflows, QR generation, and optional AI text help, with English/Arabic (RTL) support.

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
- **Image Enhancer** `/ai-tools` – Browser-based 1.5× upscale + sharpening
- **AI Text Generator** `/ai-tools` – Uses Anthropic when configured

## Multi-Language

- English `/en` (default) + Arabic `/ar` (full RTL)
- Translations: `/translations/en.json` and `/translations/ar.json`

## Deploy

```bash
vercel
vercel env add ANTHROPIC_API_KEY
vercel env add NEXT_PUBLIC_APP_URL
vercel env add NEXT_PUBLIC_CONTACT_EMAIL
vercel env add NEXT_PUBLIC_ADSENSE_ID
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
vercel env add GOOGLE_SITE_VERIFICATION
```

Toolzee is currently positioned as a free, ad-supported website rather than a paid public API.

If `NEXT_PUBLIC_ADSENSE_ID` is configured, Toolzee exposes `/ads.txt`, shows a privacy-settings banner, and loads Google AdSense Auto ads only after the visitor chooses an ad setting on their device.

If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured, Toolzee loads Google Analytics 4 only after the visitor chooses a privacy setting that allows measurement.

If `NEXT_PUBLIC_CONTACT_EMAIL` or `GOOGLE_SITE_VERIFICATION` are configured, Toolzee will use them automatically for the contact page and root metadata verification tags.
