import { SITE_NAME, getAbsoluteUrl } from './site';

type SupportedLocale = 'en' | 'ar';

interface FAQEntry {
  q: string;
  a: string;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface ToolSchemaInput {
  locale: SupportedLocale;
  path: string;
  name: string;
  description: string;
  applicationCategory: string;
}

export function buildWebsiteSchema(locale: SupportedLocale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getAbsoluteUrl(`/${locale}`),
    description,
    inLanguage: locale,
  };
}

export function buildItemListSchema(
  locale: SupportedLocale,
  name: string,
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    inLanguage: locale,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: getAbsoluteUrl(`/${locale}/${item.path}`),
    })),
  };
}

export function buildToolSchema({
  locale,
  path,
  name,
  description,
  applicationCategory,
}: ToolSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: getAbsoluteUrl(`/${locale}/${path}`),
    inLanguage: locale,
    applicationCategory,
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function buildFaqSchema(locale: SupportedLocale, faqs: FAQEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function buildBreadcrumbSchema(locale: SupportedLocale, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(`/${locale}${item.path ? `/${item.path}` : ''}`),
    })),
  };
}
