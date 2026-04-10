'use client';

import { useMemo, useSyncExternalStore } from 'react';
import Script from 'next/script';
import {
  AD_PREFERENCE_CHANGE_EVENT,
  getAnalyticsMeasurementId,
  isAnalyticsConfigured,
  readAdPreference,
} from '@/lib/ads';

function subscribeToPreference(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleChange = () => callback();

  window.addEventListener('storage', handleChange);
  window.addEventListener(AD_PREFERENCE_CHANGE_EVENT, handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(AD_PREFERENCE_CHANGE_EVENT, handleChange);
  };
}

function getPreferenceSnapshot() {
  if (typeof window === 'undefined') {
    return null;
  }

  return readAdPreference(window.localStorage);
}

export default function GoogleAnalytics() {
  const measurementId = useMemo(() => getAnalyticsMeasurementId(), []);
  const analyticsConfigured = useMemo(() => isAnalyticsConfigured(measurementId), [measurementId]);
  const preference = useSyncExternalStore(subscribeToPreference, getPreferenceSnapshot, () => null);

  if (!analyticsConfigured || !preference || preference === 'disabled') {
    return null;
  }

  const consentUpdate = preference === 'personalized'
    ? {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      }
    : {
        ad_storage: 'granted',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'granted',
      };

  const initScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
    gtag('js', new Date());
    gtag('consent', 'update', ${JSON.stringify(consentUpdate)});
    gtag('config', '${measurementId}');
  `;

  return (
    <>
      <Script
        id="toolzee-ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="toolzee-ga-init" strategy="afterInteractive">
        {initScript}
      </Script>
    </>
  );
}
