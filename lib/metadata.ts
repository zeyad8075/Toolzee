import type { Metadata } from 'next';
import { SITE_NAME } from './site';

type SupportedLocale = 'en' | 'ar';

interface PageMetadataInput {
  locale: SupportedLocale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
}

export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
  keywords,
}: PageMetadataInput): Metadata {
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';
  const canonical = `/${locale}${normalizedPath}`;
  const languages = {
    en: `/en${normalizedPath}`,
    ar: `/ar${normalizedPath}`,
  };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
