'use client';

import { useEffect, useState } from 'react';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import AdConsentManager from '@/components/ads/AdConsentManager';
import {
  getAdSenseClientId,
  getAnalyticsMeasurementId,
  isAdSenseConfigured,
  isAnalyticsConfigured,
} from '@/lib/ads';
import Header from './Header';
import Footer from './Footer';

export default function ThemeProvider({
  children,
  locale,
  isRTL,
}: {
  children: React.ReactNode;
  locale: string;
  isRTL: boolean;
}) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
  });
  const [adSettingsOpen, setAdSettingsOpen] = useState(false);
  const adSenseConfigured = isAdSenseConfigured(getAdSenseClientId());
  const analyticsConfigured = isAnalyticsConfigured(getAnalyticsMeasurementId());
  const privacyControlsConfigured = adSenseConfigured || analyticsConfigured;

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', locale);
  }, [theme, isRTL, locale]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} theme={theme} onToggleTheme={toggleTheme} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer
        locale={locale}
        onOpenAdSettings={privacyControlsConfigured ? () => setAdSettingsOpen(true) : undefined}
      />
      <AdConsentManager isOpen={adSettingsOpen} onClose={() => setAdSettingsOpen(false)} />
      <GoogleAnalytics />
    </div>
  );
}
