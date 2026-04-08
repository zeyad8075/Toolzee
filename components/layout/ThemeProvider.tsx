'use client';

import { useEffect, useState } from 'react';
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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

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
      <Footer locale={locale} />
    </div>
  );
}
