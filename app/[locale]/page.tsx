import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import SupportNote from '@/components/content/SupportNote';
import JsonLd from '@/components/seo/JsonLd';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildItemListSchema, buildWebsiteSchema } from '@/lib/structured-data';

const homePageContent = {
  en: {
    title: 'Toolzee – Free Online Tools',
    description: 'Free browser-based tools for images, QR codes, text utilities, passwords, and image-to-PDF conversion.',
    toolListLabel: 'Toolzee tools',
  },
  ar: {
    title: 'Toolzee – أدوات مجانية عبر الإنترنت',
    description: 'أدوات مجانية تعمل عبر المتصفح للصور وQR والنصوص وكلمات المرور وتحويل الصور إلى PDF.',
    toolListLabel: 'أدوات Toolzee',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = homePageContent[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: '',
    title: page.title,
    description: page.description,
  });
}

const toolCards = [
  { key: 'compress', href: 'compress-image', icon: '⚡', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, transparent), color-mix(in srgb, var(--accent-2) 7%, transparent))' },
  { key: 'convert', href: 'convert-image', icon: '🔄', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--accent-2) 5%, transparent))' },
  { key: 'resize', href: 'resize-image', icon: '📐', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 18%, transparent), color-mix(in srgb, var(--accent) 5%, transparent))' },
  { key: 'qr', href: 'qr-generator', icon: '📱', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, transparent), color-mix(in srgb, var(--surface-2) 70%, transparent))' },
  { key: 'imageToPdf', href: 'image-to-pdf', icon: '📄', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 20%, transparent), color-mix(in srgb, var(--surface-2) 60%, transparent))' },
  { key: 'wordCounter', href: 'word-counter', icon: '✍️', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--surface-2) 72%, transparent))' },
  { key: 'passwordGenerator', href: 'password-generator', icon: '🔑', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 16%, transparent), color-mix(in srgb, var(--surface-2) 65%, transparent))' },
  { key: 'wifiQr', href: 'wifi-qr-code', icon: '📶', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--surface-2) 65%, transparent))' },
  { key: 'whatsappQr', href: 'whatsapp-qr-code', icon: '💬', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 18%, transparent), color-mix(in srgb, var(--surface-2) 70%, transparent))' },
  { key: 'vcardQr', href: 'vcard-qr-code', icon: '👤', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 15%, transparent), color-mix(in srgb, var(--accent-2) 6%, transparent))' },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = homePageContent[normalizedLocale];
  const t = await getTranslations();
  const toolList = toolCards.map(card => ({
    name: t(`tools.${card.key}.name`),
    path: card.href,
  }));
  const features = locale === 'ar'
    ? [
        { icon: '🖼️', title: 'أدوات الصور محلية', desc: 'الضغط والتحويل وتغيير الحجم وتوليد QR تعمل مباشرة داخل متصفحك.' },
        { icon: '🔒', title: 'بدون حساب', desc: 'يمكنك استخدام الأدوات الأساسية فوراً دون إنشاء حساب أو رفع ملفات الصور إلى خادمنا.' },
        { icon: '📢', title: 'مجاني ومدعوم بالإعلانات', desc: 'تبقى الأدوات الأساسية مجانية عبر إعلانات واضحة وغير مضللة.' },
      ]
    : [
        { icon: '🖼️', title: 'Browser-based image tools', desc: 'Compression, conversion, resizing, and QR generation happen directly in your browser.' },
        { icon: '🔒', title: 'No account needed', desc: 'Use the core tools immediately without creating an account or uploading image files to our server.' },
        { icon: '📢', title: 'Free and ad-supported', desc: 'The core tools stay free through clearly labeled ads.' },
      ];

  return (
    <div>
      <JsonLd id="toolzee-website-schema" data={buildWebsiteSchema(normalizedLocale, page.description)} />
      <JsonLd id="toolzee-itemlist-schema" data={buildItemListSchema(normalizedLocale, page.toolListLabel, toolList)} />

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
          background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'var(--accent-soft)', border: '1px solid var(--accent-border)',
            fontSize: 13, color: 'var(--accent-2)', marginBottom: 28, fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            {t('hero.badge')}
          </div>

          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 76px)', fontWeight: 800,
            lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: 8, fontFamily: 'var(--font-heading)',
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
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
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
              <ToolCard key={card.key} card={card} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </section>

      <div style={{
        maxWidth: 800, margin: '0 auto 60px', padding: '0 24px',
      }}>
        <SupportNote title={t('supportNote.title')} body={t('supportNote.body')} />
      </div>
    </div>
  );
}

function ToolCard({
  card,
  locale,
  t,
}: {
  card: typeof toolCards[0];
  locale: string;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  return (
    <Link href={`/${locale}/${card.href}`} className="tool-card" style={{
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
    </Link>
  );
}
