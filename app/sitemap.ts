import { MetadataRoute } from 'next';
import { guideSlugs } from '@/lib/guides';
import { getAbsoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'ar'];
  const routes = [
    '',
    '/compress-image',
    '/convert-image',
    '/resize-image',
    '/qr-generator',
    '/image-to-pdf',
    '/merge-pdf',
    '/split-pdf',
    '/compress-pdf',
    '/pdf-to-image',
    '/word-counter',
    '/password-generator',
    '/wifi-qr-code',
    '/whatsapp-qr-code',
    '/vcard-qr-code',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
    '/guides',
  ];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      urls.push({
        url: getAbsoluteUrl(`/${locale}${route}`),
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    for (const slug of guideSlugs) {
      urls.push({
        url: getAbsoluteUrl(`/${locale}/guides/${slug}`),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.78,
      });
    }
  }

  return urls;
}
