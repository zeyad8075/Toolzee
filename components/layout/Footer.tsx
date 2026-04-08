'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer style={{
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--border)',
      padding: '48px 24px 24px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, color: 'white',
              }}>T</div>
              <span style={{ fontWeight: 800, fontSize: 16, fontFamily: 'Syne, sans-serif' }}>ToolForge</span>
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.6 }}>{t('tagline')}</p>
            <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block', marginTop: 16, padding: '8px 16px',
                background: '#FFDD00', color: '#000', borderRadius: 8,
                textDecoration: 'none', fontSize: 13, fontWeight: 600,
              }}>
              {t('buyCoffee')}
            </a>
          </div>

          {/* Tools */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, marginBottom: 16, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('tools')}
            </h4>
            {[
              { label: nav('compress'), href: 'compress-image' },
              { label: nav('convert'), href: 'convert-image' },
              { label: nav('resize'), href: 'resize-image' },
              { label: nav('qr'), href: 'qr-generator' },
              { label: nav('aiTools'), href: 'ai-tools' },
            ].map(item => (
              <Link key={item.href} href={`/${locale}/${item.href}`}
                style={{ display: 'block', color: 'var(--text-3)', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, marginBottom: 16, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('company')}
            </h4>
            {[
              { label: t('about'), href: '#' },
              { label: t('privacy'), href: '#' },
              { label: t('contact'), href: '#' },
              { label: nav('apiDocs'), href: `/${locale}/api-docs` },
            ].map(item => (
              <Link key={item.label} href={item.href}
                style={{ display: 'block', color: 'var(--text-3)', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Affiliate */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, marginBottom: 16, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('affiliate')}
            </h4>
            {[
              { label: 'Canva – Design Tool', href: 'https://canva.com' },
              { label: 'Hostinger – Web Hosting', href: 'https://hostinger.com' },
              { label: 'Namecheap – Domains', href: 'https://namecheap.com' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', color: 'var(--text-3)', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                {item.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--text-3)', fontSize: 13 }}>
            © {new Date().getFullYear()} ToolForge. {t('rights')}
          </p>
          <p style={{ color: 'var(--text-3)', fontSize: 13 }}>
            {t('madeWith')} for the web
          </p>
        </div>
      </div>
    </footer>
  );
}
