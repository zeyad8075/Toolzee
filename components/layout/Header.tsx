'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronDown, Info, Languages, Menu, Moon, Sun, X } from 'lucide-react';
import ToolIcon, { type ToolIconKey } from '@/components/tools/ToolIcon';

interface HeaderProps {
  locale: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const tools = [
  { key: 'compress', href: 'compress-image' },
  { key: 'convert', href: 'convert-image' },
  { key: 'resize', href: 'resize-image' },
  { key: 'removeBackground', href: 'remove-background' },
  { key: 'qr', href: 'qr-generator' },
  { key: 'imageToPdf', href: 'image-to-pdf' },
  { key: 'mergePdf', href: 'merge-pdf' },
  { key: 'splitPdf', href: 'split-pdf' },
  { key: 'compressPdf', href: 'compress-pdf' },
  { key: 'pdfToImage', href: 'pdf-to-image' },
  { key: 'wordCounter', href: 'word-counter' },
  { key: 'passwordGenerator', href: 'password-generator' },
  { key: 'wifiQr', href: 'wifi-qr-code' },
  { key: 'whatsappQr', href: 'whatsapp-qr-code' },
  { key: 'vcardQr', href: 'vcard-qr-code' },
] satisfies Array<{ key: ToolIconKey; href: string }>;

export default function Header({ locale, theme, onToggleTheme }: HeaderProps) {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const otherLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
          {/* Logo */}
          <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: 'var(--accent-contrast)'
            }}>T</div>
            <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>
              Toolzee
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, marginLeft: 8 }} className="desktop-nav">
            {/* Tools Dropdown */}
            <div style={{ position: 'relative' }}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-2)', fontSize: 14, padding: '8px 14px',
                borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6,
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
                {t('nav.tools')} <ChevronDown aria-hidden="true" size={14} />
              </button>
              {toolsOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: locale === 'ar' ? 'auto' : 0,
                  right: locale === 'ar' ? 0 : 'auto',
                  background: 'var(--surface)', border: '1px solid var(--border-2)',
                  borderRadius: 12, padding: 8, minWidth: 200,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}>
                  {tools.map(tool => (
                    <Link key={tool.key} href={`/${locale}/${tool.href}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', borderRadius: 8,
                        textDecoration: 'none', color: 'var(--text-2)',
                        fontSize: 14, transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--bg-3)';
                        e.currentTarget.style.color = 'var(--text)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-2)';
                      }}>
                      <ToolIcon name={tool.key} size={17} strokeWidth={2.1} style={{ flexShrink: 0 }} />
                      {t(`nav.${tool.key}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink href={`/${locale}/guides`}>{t('nav.guides')}</NavLink>
            <NavLink href={`/${locale}/about`}>{t('nav.about')}</NavLink>
          </nav>

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            {/* Theme toggle */}
            <button onClick={onToggleTheme} style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'var(--surface)', border: '1px solid var(--border)',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.2s',
            }}>
              {theme === 'dark' ? <Sun aria-hidden="true" size={17} /> : <Moon aria-hidden="true" size={17} />}
            </button>

            {/* Language switcher */}
            <Link href={`/${otherLocale}`} style={{
              padding: '7px 14px', borderRadius: 10,
              background: 'var(--surface)', border: '1px solid var(--border)',
              textDecoration: 'none', color: 'var(--text-2)', fontSize: 13,
              fontWeight: 600, transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Languages aria-hidden="true" size={15} />
              {locale === 'en' ? 'AR' : 'EN'}
            </Link>

            {/* Mobile menu button */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'var(--surface)', border: '1px solid var(--border)',
              cursor: 'pointer', display: 'none',
              alignItems: 'center', justifyContent: 'center',
            }} className="mobile-menu-btn">
              {menuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: '16px 0',
          }}>
            {tools.map(tool => (
              <Link key={tool.key} href={`/${locale}/${tool.href}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 4px', textDecoration: 'none',
                  color: 'var(--text-2)', fontSize: 15, borderBottom: '1px solid var(--border)',
                }}>
                <ToolIcon name={tool.key} size={18} strokeWidth={2.1} style={{ flexShrink: 0 }} /> {t(`nav.${tool.key}`)}
              </Link>
            ))}
            <Link href={`/${locale}/guides`} onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 4px', textDecoration: 'none', color: 'var(--text-2)', fontSize: 15, borderBottom: '1px solid var(--border)' }}>
              <Info aria-hidden="true" size={18} /> {t('nav.guides')}
            </Link>
            <Link href={`/${locale}/about`} onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 4px', textDecoration: 'none', color: 'var(--text-2)', fontSize: 15 }}>
              <Info aria-hidden="true" size={18} /> {t('nav.about')}
            </Link>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      textDecoration: 'none', color: 'var(--text-2)',
      fontSize: 14, padding: '8px 14px', borderRadius: 8,
      transition: 'color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
      {children}
    </Link>
  );
}
