import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'ToolForge – أدوات مجانية عبر الإنترنت' : 'ToolForge – Free Online Tools',
    description: locale === 'ar'
      ? 'ضغط وتحويل وتغيير حجم الصور وإنشاء رموز QR مجاناً عبر الإنترنت'
      : 'Compress, convert, resize images and generate QR codes — all free, all instant, all private.',
    alternates: { canonical: `/${locale}`, languages: { en: '/en', ar: '/ar' } },
  };
}

const toolCards = [
  { key: 'compress', href: 'compress-image', icon: '⚡', gradient: 'linear-gradient(135deg,#6c63ff22,#a78bfa11)' },
  { key: 'convert', href: 'convert-image', icon: '🔄', gradient: 'linear-gradient(135deg,#22c55e22,#16a34a11)' },
  { key: 'resize', href: 'resize-image', icon: '📐', gradient: 'linear-gradient(135deg,#f9731622,#ea580c11)' },
  { key: 'qr', href: 'qr-generator', icon: '📱', gradient: 'linear-gradient(135deg,#3b82f622,#1d4ed811)' },
  { key: 'aiEnhancer', href: 'ai-tools', icon: '✨', gradient: 'linear-gradient(135deg,#ec489922,#be185d11)' },
  { key: 'aiText', href: 'ai-tools', icon: '🤖', gradient: 'linear-gradient(135deg,#8b5cf622,#6d28d911)' },
];

const features = [
  { icon: '🔒', title: '100% Private', desc: 'All processing in your browser. Nothing uploaded to servers.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Client-side processing means instant results, no waiting.' },
  { icon: '🆓', title: 'Always Free', desc: 'Core tools are free forever. No account required.' },
];

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations();

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.3)',
            fontSize: 13, color: 'var(--accent-2)', marginBottom: 28, fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            {t('hero.badge')}
          </div>

          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 76px)', fontWeight: 800,
            lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: 8, fontFamily: 'Syne, sans-serif',
          }}>
            {t('hero.title')}<br />
            <span className="gradient-text">{t('hero.titleHighlight')}</span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: 'var(--text-2)', lineHeight: 1.7,
            maxWidth: 560, margin: '20px auto 40px',
          }}>
            {t('hero.subtitle')}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#tools" className="btn-primary" style={{
              padding: '14px 32px', borderRadius: 12,
              fontWeight: 700, fontSize: 15, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              {t('hero.cta')} →
            </a>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section style={{
        padding: '0 24px 48px',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}>
          {features.map(f => (
            <div key={f.icon} style={{
              padding: '20px 24px', borderRadius: 14,
              background: 'var(--surface)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'flex-start', gap: 14,
            }}>
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                <div style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>
              {t('tools.title')}
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('tools.subtitle')}</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {toolCards.map(card => (
              <ToolCard key={card.key} card={card} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad banner placeholder */}
      <div style={{
        maxWidth: 800, margin: '0 auto 60px', padding: '0 24px',
      }}>
        <div style={{
          padding: '20px', borderRadius: 12,
          border: '1px dashed var(--border-2)',
          textAlign: 'center', color: 'var(--text-3)', fontSize: 13,
        }}>
          📢 Advertisement Space – Google AdSense
        </div>
      </div>
    </div>
  );
}

function ToolCard({ card, t }: { card: typeof toolCards[0]; t: ReturnType<typeof useTranslations> }) {
  return (
    <a href={`/en/${card.href}`} className="tool-card" style={{
      borderRadius: 16, padding: 28, textDecoration: 'none',
      display: 'flex', flexDirection: 'column', gap: 12,
      background: card.gradient,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: 'var(--surface)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24,
      }}>
        {card.icon}
      </div>
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>
          {t(`tools.${card.key}.name`)}
        </h3>
        <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.5 }}>
          {t(`tools.${card.key}.desc`)}
        </p>
      </div>
      <div style={{
        marginTop: 'auto', fontSize: 13, color: 'var(--accent)',
        fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {t('common.free')} · {t('common.fast')} →
      </div>
    </a>
  );
}
