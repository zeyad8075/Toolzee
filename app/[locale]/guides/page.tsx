import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { getGuidesForLocale } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildItemListSchema,
} from '@/lib/structured-data';

const pageContent = {
  en: {
    title: 'Toolzee Guides - Practical Help for Images, PDFs, QR Codes, and More',
    description: 'Original Toolzee guides that explain when to use each tool, how to avoid common mistakes, and how to choose the right workflow.',
    eyebrow: 'Guides',
    heading: 'Practical guides for everyday file and sharing tasks',
    intro: 'Toolzee includes free browser tools, but the site should still help you make better decisions before you click a button. These guides explain when to use each workflow, what tradeoffs to expect, and how to avoid the most common mistakes.',
    stats: [
      { label: 'Original guides', value: '15' },
      { label: 'Core categories', value: '4' },
      { label: 'Focused on', value: 'Practical workflows' },
    ],
    sectionTitle: 'Browse the guide library',
    sectionIntro: 'Each guide is written around a real task: getting files ready to publish, combine, share, or scan.',
    ctaLabel: 'Read guide',
  },
  ar: {
    title: 'أدلة Toolzee - مساعدة عملية للصور وPDF وQR وغيرها',
    description: 'أدلة أصلية من Toolzee تشرح متى تستخدم كل أداة وكيف تتجنب الأخطاء الشائعة وتختار المسار المناسب.',
    eyebrow: 'الأدلة',
    heading: 'أدلة عملية لمهام الملفات والمشاركة اليومية',
    intro: 'يوفر Toolzee أدوات مجانية داخل المتصفح، لكن الموقع يجب أن يساعدك أيضاً على اتخاذ قرار أفضل قبل استخدام الأداة. تشرح هذه الأدلة متى تستخدم كل مسار وما المقايضات المتوقعة وكيف تتجنب الأخطاء الأكثر شيوعاً.',
    stats: [
      { label: 'أدلة أصلية', value: '15' },
      { label: 'فئات أساسية', value: '4' },
      { label: 'التركيز', value: 'سير عمل عملي' },
    ],
    sectionTitle: 'تصفح مكتبة الأدلة',
    sectionIntro: 'كل دليل هنا مبني على مهمة حقيقية: تجهيز ملف للنشر أو الدمج أو المشاركة أو المسح.',
    ctaLabel: 'اقرأ الدليل',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: 'guides',
    title: page.title,
    description: page.description,
  });
}

export default async function GuidesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = pageContent[normalizedLocale];
  const guides = getGuidesForLocale(normalizedLocale);

  return (
    <div style={{ padding: '48px 24px 80px' }}>
      <JsonLd
        id="guides-collection-schema"
        data={buildCollectionPageSchema(normalizedLocale, 'guides', page.title, page.description)}
      />
      <JsonLd
        id="guides-breadcrumb-schema"
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: normalizedLocale === 'ar' ? 'الأدلة' : 'Guides', path: 'guides' },
        ])}
      />
      <JsonLd
        id="guides-itemlist-schema"
        data={buildItemListSchema(
          normalizedLocale,
          normalizedLocale === 'ar' ? 'أدلة Toolzee' : 'Toolzee Guides',
          guides.map(guide => ({ name: guide.title, path: `guides/${guide.slug}` })),
        )}
      />

      <section style={{ maxWidth: 1120, margin: '0 auto 32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 999,
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-border)',
          color: 'var(--accent)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: 18,
        }}>
          {page.eyebrow}
        </div>

        <div className="guides-hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(280px, 0.9fr)',
          gap: 24,
          alignItems: 'stretch',
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(34px, 5vw, 58px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 14,
              fontFamily: 'var(--font-heading)',
              maxWidth: 780,
            }}>
              {page.heading}
            </h1>
            <p style={{ color: 'var(--text-2)', fontSize: 17, lineHeight: 1.8, maxWidth: 760 }}>
              {page.intro}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: 12,
            background: 'linear-gradient(145deg, color-mix(in srgb, var(--accent-soft) 82%, transparent), var(--surface))',
            border: '1px solid var(--accent-border)',
            borderRadius: 24,
            padding: '20px 18px',
          }}>
            {page.stats.map(stat => (
              <div key={stat.label} style={{
                padding: '14px 14px',
                borderRadius: 18,
                background: 'color-mix(in srgb, var(--surface) 88%, transparent)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ color: 'var(--text-3)', fontSize: 12, marginBottom: 6 }}>{stat.label}</div>
                <div style={{ fontSize: 21, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10, fontFamily: 'var(--font-heading)' }}>
            {page.sectionTitle}
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.8 }}>
            {page.sectionIntro}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}>
          {guides.map(guide => (
            <article
              key={guide.slug}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '22px 20px',
                borderRadius: 22,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
                {guide.category}
              </div>
              <h3 style={{
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 10,
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.25,
              }}>
                {guide.title}
              </h3>
              <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8, flex: 1 }}>
                {guide.description}
              </p>
              <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 16, marginBottom: 14 }}>
                {guide.readTime}
              </div>
              <Link
                href={`/${normalizedLocale}/guides/${guide.slug}`}
                className="btn-primary"
                style={{
                  width: 'fit-content',
                  textDecoration: 'none',
                  borderRadius: 14,
                  padding: '12px 16px',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {page.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .guides-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
