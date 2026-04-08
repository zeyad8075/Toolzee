'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Endpoint {
  method: string;
  path: string;
  title: string;
  description: string;
  params: { name: string; type: string; required: boolean; desc: string }[];
  example: string;
  response: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'POST',
    path: '/api/compress-image',
    title: 'Compress Image',
    description: 'Compress an image file and return compression metadata.',
    params: [
      { name: 'image', type: 'File (form-data)', required: true, desc: 'The image file to compress (JPG, PNG, WebP)' },
      { name: 'quality', type: 'number', required: false, desc: 'Compression quality 1-100. Default: 80' },
    ],
    example: `curl -X POST https://toolforge.app/api/compress-image \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg" \\
  -F "quality=80"`,
    response: `{
  "success": true,
  "original_size": 2048000,
  "original_name": "photo.jpg",
  "quality": 80,
  "message": "Image compressed successfully."
}`,
  },
  {
    method: 'POST',
    path: '/api/qr-code',
    title: 'Generate QR Code',
    description: 'Generate a QR code for any URL or text and return a hosted image URL.',
    params: [
      { name: 'text', type: 'string', required: true, desc: 'The URL or text to encode' },
      { name: 'size', type: 'number', required: false, desc: 'Size in pixels (100–800). Default: 300' },
      { name: 'fg_color', type: 'string', required: false, desc: 'Foreground hex color. Default: #000000' },
      { name: 'bg_color', type: 'string', required: false, desc: 'Background hex color. Default: #ffffff' },
    ],
    example: `curl -X POST https://toolforge.app/api/qr-code \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "https://yourwebsite.com",
    "size": 400,
    "fg_color": "#6c63ff"
  }'`,
    response: `{
  "success": true,
  "qr_url": "https://api.qrserver.com/v1/create-qr-code/?...",
  "text": "https://yourwebsite.com",
  "size": 400
}`,
  },
  {
    method: 'POST',
    path: '/api/generate-text',
    title: 'AI Text Generator',
    description: 'Generate text content using AI for any prompt and tone.',
    params: [
      { name: 'prompt', type: 'string', required: true, desc: 'What you want to write about' },
      { name: 'tone', type: 'string', required: false, desc: 'Tone: Professional | Casual | Creative | Persuasive' },
    ],
    example: `curl -X POST https://toolforge.app/api/generate-text \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write a product description for wireless headphones",
    "tone": "Professional"
  }'`,
    response: `{
  "text": "Experience crystal-clear audio with our premium wireless headphones..."
}`,
  },
];

export default function APIDocs() {
  const t = useTranslations('apiDocs');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'curl' | 'js' | 'python'>('curl');

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
          borderRadius: 100, background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)',
          fontSize: 13, color: 'var(--accent-2)', marginBottom: 20, fontWeight: 500,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          REST API · v1
        </div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 17, maxWidth: 560, margin: '0 auto 28px' }}>
          {t('subtitle')}
        </p>
        <a href="mailto:api@toolforge.app" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 28px', borderRadius: 12, background: 'var(--accent)',
          color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: 14,
        }}>
          🔑 {t('getKey')}
        </a>
      </div>

      {/* Quick start */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 48 }}>
        {[
          { icon: '🔑', title: 'Authentication', desc: 'Bearer token in Authorization header' },
          { icon: '⚡', title: 'Base URL', desc: 'https://toolforge.app/api' },
          { icon: '📊', title: 'Rate Limits', desc: 'Free: 100/day · Pro: 10k/day' },
          { icon: '🔒', title: 'HTTPS Only', desc: 'All API calls must use HTTPS' },
        ].map(card => (
          <div key={card.title} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 24 }}>{card.icon}</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{card.title}</p>
              <p style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Auth section */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          {t('authentication')}
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: 15, marginBottom: 16, lineHeight: 1.7 }}>
          {t('authDesc')}
        </p>
        <CodeBlock code={`Authorization: Bearer tf_live_xxxxxxxxxxxxxxxxxxxx`} lang="http" />
      </section>

      {/* Rate limits */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          {t('rateLimit')}
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7 }}>{t('rateLimitDesc')}</p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 12, marginTop: 16,
        }}>
          {[
            { plan: 'Free', limit: '100 req/day', price: '$0/mo', color: 'var(--green)' },
            { plan: 'Pro', limit: '10,000 req/day', price: '$19/mo', color: 'var(--accent)' },
            { plan: 'Enterprise', limit: 'Unlimited', price: 'Contact us', color: '#f97316' },
          ].map(plan => (
            <div key={plan.plan} style={{
              background: 'var(--surface)', border: `1px solid ${plan.color}33`,
              borderRadius: 14, padding: '20px 24px',
            }}>
              <p style={{ fontWeight: 800, fontSize: 16, color: plan.color, marginBottom: 6 }}>{plan.plan}</p>
              <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{plan.limit}</p>
              <p style={{ color: 'var(--text-3)', fontSize: 13 }}>{plan.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Endpoints */}
      <section>
        <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 28, fontFamily: 'Syne, sans-serif' }}>
          {t('endpoints')}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {ENDPOINTS.map((ep, idx) => (
            <EndpointCard key={idx} ep={ep} idx={idx} copiedIdx={copiedIdx} onCopy={copyCode} activeTab={activeTab} onTabChange={setActiveTab} />
          ))}
        </div>
      </section>

      {/* SDK hint */}
      <section style={{ marginTop: 56, padding: 32, borderRadius: 20, background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(167,139,250,0.05))', border: '1px solid rgba(108,99,255,0.2)' }}>
        <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>🚀 SDKs Coming Soon</h3>
        <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
          We&apos;re building official SDKs for JavaScript/TypeScript, Python, and PHP. Get notified when they launch.
        </p>
        <a href="mailto:api@toolforge.app" style={{
          display: 'inline-flex', padding: '10px 22px', borderRadius: 10,
          background: 'var(--accent)', color: 'white', textDecoration: 'none',
          fontWeight: 600, fontSize: 14,
        }}>
          Join the waitlist →
        </a>
      </section>
    </div>
  );
}

function EndpointCard({
  ep, idx, copiedIdx, onCopy, activeTab, onTabChange,
}: {
  ep: Endpoint;
  idx: number;
  copiedIdx: number | null;
  onCopy: (code: string, idx: number) => void;
  activeTab: 'curl' | 'js' | 'python';
  onTabChange: (t: 'curl' | 'js' | 'python') => void;
}) {
  const jsExample = ep.example
    .replace(/^curl.*?\n/, `fetch('https://toolforge.app${ep.path}', {\n  method: 'POST',\n  headers: { 'Authorization': 'Bearer YOUR_API_KEY', 'Content-Type': 'application/json' },\n  body: JSON.stringify({ /* params */ })\n}).then(r => r.json()).then(console.log);`);

  const pythonExample = `import requests\n\nresponse = requests.post(\n  'https://toolforge.app${ep.path}',\n  headers={'Authorization': 'Bearer YOUR_API_KEY'},\n  json={'prompt': 'your text'}\n)\nprint(response.json())`;

  const codeMap = { curl: ep.example, js: jsExample, python: pythonExample };
  const code = codeMap[activeTab];

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <span style={{
          padding: '4px 12px', borderRadius: 6, fontWeight: 800, fontSize: 12,
          fontFamily: 'monospace', letterSpacing: '0.05em',
          background: ep.method === 'POST' ? 'rgba(108,99,255,0.15)' : 'rgba(34,197,94,0.15)',
          color: ep.method === 'POST' ? 'var(--accent)' : 'var(--green)',
        }}>
          {ep.method}
        </span>
        <code style={{ fontFamily: 'monospace', fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>{ep.path}</code>
        <span style={{ color: 'var(--text-2)', fontSize: 14, marginInlineStart: 8 }}>{ep.description}</span>
      </div>

      <div style={{ padding: '24px 28px' }}>
        {/* Parameters */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Parameters</h4>
          <div style={{ background: 'var(--bg-2)', borderRadius: 10, overflow: 'hidden' }}>
            {ep.params.map((p, pi) => (
              <div key={pi} style={{
                display: 'grid', gridTemplateColumns: 'auto auto 1fr',
                gap: 12, padding: '12px 16px', alignItems: 'start',
                borderBottom: pi < ep.params.length - 1 ? '1px solid var(--border)' : 'none',
                flexWrap: 'wrap',
              }}>
                <code style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{p.name}</code>
                <span style={{ fontSize: 12, color: 'var(--text-3)', padding: '2px 8px', background: 'var(--bg-3)', borderRadius: 4 }}>
                  {p.required ? '● required' : '○ optional'}
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{p.desc} <em style={{ color: 'var(--text-3)' }}>({p.type})</em></span>
              </div>
            ))}
          </div>
        </div>

        {/* Code example */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
            <h4 style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Example Request</h4>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['curl', 'js', 'python'] as const).map(tab => (
                <button key={tab} onClick={() => onTabChange(tab)} style={{
                  padding: '5px 12px', borderRadius: 6, fontWeight: 600, fontSize: 12,
                  border: '1px solid', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'monospace',
                  background: activeTab === tab ? 'var(--accent)' : 'var(--bg-3)',
                  borderColor: activeTab === tab ? 'var(--accent)' : 'var(--border)',
                  color: activeTab === tab ? 'white' : 'var(--text-3)',
                }}>{tab}</button>
              ))}
            </div>
          </div>
          <CodeBlock code={code} lang={activeTab === 'curl' ? 'bash' : activeTab === 'js' ? 'javascript' : 'python'}
            onCopy={() => onCopy(code, idx)}
            copied={copiedIdx === idx} />
        </div>

        {/* Response */}
        <div style={{ marginTop: 20 }}>
          <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Example Response</h4>
          <CodeBlock code={ep.response} lang="json" />
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ code, lang, onCopy, copied }: {
  code: string; lang: string;
  onCopy?: () => void; copied?: boolean;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <pre style={{
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '18px 20px', overflowX: 'auto',
        fontSize: 13, lineHeight: 1.7, color: 'var(--text-2)',
        margin: 0, fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
      }}>
        <code>{code}</code>
      </pre>
      {onCopy && (
        <button onClick={onCopy} style={{
          position: 'absolute', top: 10, insetInlineEnd: 10,
          padding: '5px 12px', borderRadius: 6, fontSize: 12,
          background: copied ? 'rgba(34,197,94,0.2)' : 'var(--surface)',
          border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : 'var(--border)'}`,
          color: copied ? 'var(--green)' : 'var(--text-3)',
          cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s',
        }}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      )}
    </div>
  );
}
