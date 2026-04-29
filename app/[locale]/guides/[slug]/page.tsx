import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideShell from '@/components/content/GuideShell';
import JsonLd from '@/components/seo/JsonLd';
import { getGuideBySlug, guideSlugs } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/structured-data';

export function generateStaticParams() {
  return ['en', 'ar'].flatMap(locale => guideSlugs.map(slug => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const guide = getGuideBySlug(normalizedLocale, slug);

  if (!guide) {
    return {};
  }

  return buildLocalizedMetadata({
    locale: normalizedLocale,
    path: `guides/${guide.slug}`,
    title: guide.title,
    description: guide.description,
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const guide = getGuideBySlug(normalizedLocale, slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`guide-article-schema-${guide.slug}`}
        data={buildArticleSchema(normalizedLocale, `guides/${guide.slug}`, guide.title, guide.description)}
      />
      <JsonLd
        id={`guide-breadcrumb-schema-${guide.slug}`}
        data={buildBreadcrumbSchema(normalizedLocale, [
          { name: normalizedLocale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
          { name: normalizedLocale === 'ar' ? 'الأدلة' : 'Guides', path: 'guides' },
          { name: guide.title, path: `guides/${guide.slug}` },
        ])}
      />

      <GuideShell
        locale={normalizedLocale}
        eyebrow={guide.eyebrow}
        title={guide.title}
        intro={guide.intro}
        readTime={guide.readTime}
        category={guide.category}
        sections={guide.sections}
        takeawayTitle={guide.takeawayTitle}
        takeaways={guide.takeaways}
        relatedToolsTitle={guide.relatedToolsTitle}
        relatedTools={guide.relatedTools}
      />
    </>
  );
}
