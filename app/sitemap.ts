import { MetadataRoute } from 'next';
import { getAbsoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'ar'];
  const routes = ['', '/compress-image', '/convert-image', '/resize-image', '/qr-generator', '/ai-tools', '/about', '/privacy', '/terms', '/contact'];

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
  }

  return urls;
}
