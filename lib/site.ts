export const SITE_NAME = 'Toolzee';

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL || 'https://toolzee.site';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export function getSiteHost(): string {
  try {
    return new URL(getSiteUrl()).host;
  } catch {
    return 'toolzee.site';
  }
}

export function getAbsoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || `hello@${getSiteHost()}`;
}

export function getGoogleSiteVerification(): string | undefined {
  const value = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  return value || undefined;
}
