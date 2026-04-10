export type AdPreference = 'personalized' | 'non-personalized' | 'disabled';

export const ADSENSE_PUBLISHER_RECORD = 'f08c47fec0942fa0';
export const AD_PREFERENCE_STORAGE_KEY = 'toolzee-ad-preference';
export const AD_PREFERENCE_CHANGE_EVENT = 'toolzee:ad-preference-change';

export function getAdSenseClientId(): string {
  return process.env.NEXT_PUBLIC_ADSENSE_ID?.trim() ?? '';
}

export function isAdSenseConfigured(clientId = getAdSenseClientId()): boolean {
  return /^ca-pub-\d+$/.test(clientId);
}

export function getAdSensePublisherId(clientId = getAdSenseClientId()): string {
  return clientId.replace(/^ca-/, '');
}

export function getAnalyticsMeasurementId(): string {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '';
}

export function isAnalyticsConfigured(measurementId = getAnalyticsMeasurementId()): boolean {
  return /^G-[A-Z0-9]+$/i.test(measurementId);
}

export function parseAdPreference(value: string | null): AdPreference | null {
  if (value === 'personalized' || value === 'non-personalized' || value === 'disabled') {
    return value;
  }

  return null;
}

export function readAdPreference(storage?: Storage | null): AdPreference | null {
  if (!storage) {
    return null;
  }

  return parseAdPreference(storage.getItem(AD_PREFERENCE_STORAGE_KEY));
}
