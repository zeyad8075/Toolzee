'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import {
  AD_PREFERENCE_CHANGE_EVENT,
  AD_PREFERENCE_STORAGE_KEY,
  getAdSenseClientId,
  getAnalyticsMeasurementId,
  isAnalyticsConfigured,
  isAdSenseConfigured,
  readAdPreference,
  type AdPreference,
} from '@/lib/ads';

type ActiveAdPreference = Exclude<AdPreference, 'disabled'>;
type AdSenseQueue = Array<Record<string, unknown>> & {
  pauseAdRequests?: number;
  requestNonPersonalizedAds?: number;
};

declare global {
  interface Window {
    adsbygoogle?: AdSenseQueue;
  }
}

const ADSENSE_SCRIPT_ID = 'toolzee-adsense-script';

let adSenseLoadPromise: Promise<void> | null = null;
let autoAdsInitialized = false;

function subscribeToHydration() {
  return () => {};
}

function getAdQueue(): AdSenseQueue {
  if (!window.adsbygoogle) {
    window.adsbygoogle = [] as unknown as AdSenseQueue;
  }

  return window.adsbygoogle;
}

function ensureAdSenseScript(clientId: string): Promise<void> {
  if (adSenseLoadPromise) {
    return adSenseLoadPromise;
  }

  adSenseLoadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(ADSENSE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existing?.dataset.loaded === 'true') {
      resolve();
      return;
    }

    const script = existing ?? document.createElement('script');

    const cleanup = () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      cleanup();
      resolve();
    };

    const handleError = () => {
      cleanup();
      adSenseLoadPromise = null;
      reject(new Error('Failed to load Google AdSense.'));
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    if (!existing) {
      script.id = ADSENSE_SCRIPT_ID;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
      document.head.appendChild(script);
    }
  });

  return adSenseLoadPromise;
}

function enableAutoAds(clientId: string, preference: ActiveAdPreference) {
  const queue = getAdQueue();
  queue.pauseAdRequests = 1;
  queue.requestNonPersonalizedAds = preference === 'non-personalized' ? 1 : 0;

  if (!autoAdsInitialized) {
    queue.push({
      google_ad_client: clientId,
      enable_page_level_ads: true,
    });
    autoAdsInitialized = true;
  }

  queue.pauseAdRequests = 0;
}

export default function AdConsentManager({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('ads');
  const adSenseClientId = useMemo(() => getAdSenseClientId(), []);
  const analyticsMeasurementId = useMemo(() => getAnalyticsMeasurementId(), []);
  const adSenseEnabled = useMemo(() => isAdSenseConfigured(adSenseClientId), [adSenseClientId]);
  const analyticsEnabled = useMemo(() => isAnalyticsConfigured(analyticsMeasurementId), [analyticsMeasurementId]);
  const controlsEnabled = adSenseEnabled || analyticsEnabled;
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [preferenceOverride, setPreferenceOverride] = useState<AdPreference | null | undefined>(undefined);
  const [initializedPreference, setInitializedPreference] = useState<ActiveAdPreference | null>(null);
  const [loadError, setLoadError] = useState(false);

  const preference = useMemo(() => {
    if (preferenceOverride !== undefined) {
      return preferenceOverride;
    }

    if (!mounted || !controlsEnabled) {
      return null;
    }

    return readAdPreference(window.localStorage);
  }, [controlsEnabled, mounted, preferenceOverride]);

  useEffect(() => {
    if (!mounted || !adSenseEnabled || !preference || preference === 'disabled') {
      return;
    }

    let cancelled = false;
    const queue = getAdQueue();
    queue.pauseAdRequests = 1;

    void ensureAdSenseScript(adSenseClientId)
      .then(() => {
        if (cancelled) {
          return;
        }

        enableAutoAds(adSenseClientId, preference);
        setInitializedPreference(preference);
        setLoadError(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [adSenseClientId, adSenseEnabled, mounted, preference]);

  const shouldShowBanner = mounted && controlsEnabled && (isOpen || preference === null);
  const canDismiss = preference !== null;
  const currentLabel = preference ? t(`status.${preference}`) : t('status.unset');

  function updatePreference(nextPreference: AdPreference) {
    window.localStorage.setItem(AD_PREFERENCE_STORAGE_KEY, nextPreference);
    window.dispatchEvent(new CustomEvent(AD_PREFERENCE_CHANGE_EVENT, { detail: nextPreference }));

    const shouldReload =
      initializedPreference !== null &&
      initializedPreference !== nextPreference;

    onClose();

    if (shouldReload) {
      window.location.reload();
      return;
    }

    setPreferenceOverride(nextPreference);
    setLoadError(false);
  }

  if (!shouldShowBanner) {
    return null;
  }

  return (
    <aside
      aria-live="polite"
      style={{
        position: 'fixed',
        insetInlineStart: 20,
        insetInlineEnd: 20,
        bottom: 20,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        className="glass"
        style={{
          pointerEvents: 'auto',
          maxWidth: 460,
          marginInline: 'auto',
          borderRadius: 20,
          padding: 20,
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <p style={{ color: 'var(--accent-2)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              {t('eyebrow')}
            </p>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, fontFamily: 'var(--font-heading)' }}>
              {t('title')}
            </h2>
          </div>
          {canDismiss ? (
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              aria-label={t('close')}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                cursor: 'pointer',
                fontSize: 18,
                lineHeight: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          ) : null}
        </div>

        <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          {t('body')}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 18,
        }}>
          <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{t('current')}</span>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--accent-2)',
            background: 'rgba(108,99,255,0.14)',
            border: '1px solid rgba(108,99,255,0.25)',
            borderRadius: 999,
            padding: '6px 10px',
          }}>
            {currentLabel}
          </span>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <button
            type="button"
            onClick={() => updatePreference('personalized')}
            className="btn-primary"
            style={{
              borderRadius: 14,
              padding: '14px 16px',
              textAlign: 'start',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{t('personalized')}</div>
            <div style={{ fontSize: 13, opacity: 0.88 }}>{t('personalizedHint')}</div>
          </button>

          <button
            type="button"
            onClick={() => updatePreference('non-personalized')}
            className="btn-ghost"
            style={{
              borderRadius: 14,
              padding: '14px 16px',
              textAlign: 'start',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{t('nonPersonalized')}</div>
            <div style={{ fontSize: 13 }}>{t('nonPersonalizedHint')}</div>
          </button>

          <button
            type="button"
            onClick={() => updatePreference('disabled')}
            className="btn-ghost"
            style={{
              borderRadius: 14,
              padding: '14px 16px',
              textAlign: 'start',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{t('disabled')}</div>
            <div style={{ fontSize: 13 }}>{t('disabledHint')}</div>
          </button>
        </div>

        <p style={{ color: 'var(--text-3)', fontSize: 12, lineHeight: 1.6, marginTop: 14 }}>
          {t('changeAnytime')}
        </p>

        {loadError ? (
          <p style={{ color: 'var(--orange)', fontSize: 12, lineHeight: 1.6, marginTop: 10 }}>
            {t('error')}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
