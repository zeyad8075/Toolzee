'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer({
  locale,
  onOpenAdSettings,
}: {
  locale: string;
  onOpenAdSettings?: () => void;
}) {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const ads = useTranslations('ads');

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
                fontSize: 14, fontWeight: 800, color: 'var(--accent-contrast)',
              }}>T</div>
              <span style={{ fontWeight: 800, fontSize: 16, fontFamily: 'var(--font-heading)' }}>Toolzee</span>
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.6 }}>{t('tagline')}</p>
            <p style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.6, marginTop: 14 }}>{t('dataNote')}</p>
            <p style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>{t('fundingNote')}</p>
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
              { label: nav('imageToPdf'), href: 'image-to-pdf' },
              { label: nav('mergePdf'), href: 'merge-pdf' },
              { label: nav('splitPdf'), href: 'split-pdf' },
              { label: nav('compressPdf'), href: 'compress-pdf' },
              { label: nav('pdfToImage'), href: 'pdf-to-image' },
              { label: nav('rotatePdf'), href: 'rotate-pdf' },
              { label: nav('removePdfPages'), href: 'remove-pdf-pages' },
              { label: nav('extractPdfPages'), href: 'extract-pdf-pages' },
              { label: nav('addPageNumbers'), href: 'add-page-numbers' },
              { label: nav('addWatermark'), href: 'add-watermark' },
              { label: nav('wordCounter'), href: 'word-counter' },
              { label: nav('passwordGenerator'), href: 'password-generator' },
              { label: nav('wifiQr'), href: 'wifi-qr-code' },
              { label: nav('whatsappQr'), href: 'whatsapp-qr-code' },
              { label: nav('vcardQr'), href: 'vcard-qr-code' },
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
              { label: t('guides'), href: `/${locale}/guides` },
              { label: t('about'), href: `/${locale}/about` },
              { label: t('privacy'), href: `/${locale}/privacy` },
              { label: t('terms'), href: `/${locale}/terms` },
              { label: t('contact'), href: `/${locale}/contact` },
            ].map(item => (
              <Link key={item.label} href={item.href}
                style={{ display: 'block', color: 'var(--text-3)', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                {item.label}
              </Link>
            ))}
            {onOpenAdSettings ? (
              <button
                type="button"
                onClick={onOpenAdSettings}
                className="btn-ghost"
                style={{
                  marginTop: 12,
                  padding: '10px 14px',
                  borderRadius: 12,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {ads('manage')}
              </button>
            ) : null}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--text-3)', fontSize: 13 }}>
            © {new Date().getFullYear()} Toolzee. {t('rights')}
          </p>
          <p style={{ color: 'var(--text-3)', fontSize: 13 }}>
            {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
