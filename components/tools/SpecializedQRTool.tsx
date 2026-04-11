'use client';

import NextImage from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import SupportNote from '@/components/content/SupportNote';
import { trackAnalyticsEvent } from '@/lib/analytics';
import { getSiteUrl } from '@/lib/site';

type QRVariant = 'wifi' | 'whatsapp' | 'vcard';

function escapeWifi(value: string) {
  return value.replace(/([\\;,":])/g, '\\$1');
}

function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, '');
}

export default function SpecializedQRTool({ variant }: { variant: QRVariant }) {
  const t = useTranslations(`qrSpecial.${variant}`);
  const note = useTranslations('supportNote');
  const [size, setSize] = useState(320);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [ssid, setSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [hidden, setHidden] = useState(false);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(getSiteUrl());

  const payload = useMemo(() => {
    if (variant === 'wifi') {
      if (!ssid.trim()) return '';
      const passwordPart = encryption === 'nopass' ? '' : `P:${escapeWifi(wifiPassword)};`;
      return `WIFI:T:${encryption};S:${escapeWifi(ssid)};${passwordPart}H:${hidden ? 'true' : 'false'};;`;
    }

    if (variant === 'whatsapp') {
      const cleanPhone = digitsOnly(phone);
      if (!cleanPhone) return '';
      return `https://wa.me/${cleanPhone}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ''}`;
    }

    if (!fullName.trim() && !phone.trim() && !email.trim()) return '';
    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${fullName.trim()}`,
      company.trim() ? `ORG:${company.trim()}` : '',
      phone.trim() ? `TEL:${phone.trim()}` : '',
      email.trim() ? `EMAIL:${email.trim()}` : '',
      website.trim() ? `URL:${website.trim()}` : '',
      'END:VCARD',
    ].filter(Boolean).join('\n');
  }, [company, email, encryption, fullName, hidden, message, phone, ssid, variant, website, wifiPassword]);

  useEffect(() => {
    let active = true;

    if (!payload) {
      return () => {
        active = false;
      };
    }

    QRCode.toDataURL(payload, {
      width: size,
      margin: 2,
      color: { dark: '#171006', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    })
      .then(url => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        if (active) setQrDataUrl('');
      });

    return () => {
      active = false;
    };
  }, [payload, size]);

  function download() {
    if (!qrDataUrl) return;
    trackAnalyticsEvent('download_result', { tool: `${variant}_qr`, file_type: 'png' });
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${variant}-qr-code.png`;
    link.click();
  }

  const faqs = t.raw('faq') as { q: string; a: string }[];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 22 }}>
          {variant === 'wifi' ? (
            <WifiFields
              t={t}
              ssid={ssid}
              setSsid={setSsid}
              wifiPassword={wifiPassword}
              setWifiPassword={setWifiPassword}
              encryption={encryption}
              setEncryption={setEncryption}
              hidden={hidden}
              setHidden={setHidden}
            />
          ) : null}

          {variant === 'whatsapp' ? (
            <WhatsAppFields t={t} phone={phone} setPhone={setPhone} message={message} setMessage={setMessage} />
          ) : null}

          {variant === 'vcard' ? (
            <VCardFields
              t={t}
              fullName={fullName}
              setFullName={setFullName}
              company={company}
              setCompany={setCompany}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              website={website}
              setWebsite={setWebsite}
            />
          ) : null}

          <div style={{ marginTop: 20 }}>
            <label style={{ fontWeight: 700, fontSize: 14, display: 'block', marginBottom: 8 }}>
              {t('size')}: <span style={{ color: 'var(--accent)' }}>{size}px</span>
            </label>
            <input
              type="range"
              min={160}
              max={800}
              step={40}
              value={size}
              onChange={event => setSize(Number(event.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)' }}
            />
          </div>
        </section>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, minHeight: 360 }}>
          {payload && qrDataUrl ? (
            <>
              <NextImage src={qrDataUrl} alt={t('alt')} width={size} height={size} unoptimized style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, boxShadow: '0 14px 38px rgba(0,0,0,0.22)' }} />
              <button type="button" className="btn-primary" onClick={download} style={{ width: '100%', padding: '12px 18px', borderRadius: 12, border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                {t('download')}
              </button>
            </>
          ) : (
            <div style={{ color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.7 }}>{t('empty')}</div>
          )}
        </section>
      </div>

      <SupportNote title={note('title')} body={note('body')} />

      <section>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>{t('howTitle')}</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>{t('howDesc')}</p>
      </section>
      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 18, fontFamily: 'var(--font-heading)' }}>{t('faqTitle')}</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {faqs.map(faq => (
            <article key={faq.q} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
              <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{faq.q}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

type Translator = ReturnType<typeof useTranslations>;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>
      <span style={{ display: 'block', marginBottom: 7 }}>{label}</span>
      {children}
    </label>
  );
}

function inputStyle(): React.CSSProperties {
  return {
    width: '100%',
    border: '1px solid var(--border)',
    borderRadius: 12,
    background: 'var(--bg-3)',
    color: 'var(--text)',
    padding: '12px 14px',
    fontFamily: 'inherit',
    fontSize: 14,
    outline: 'none',
  };
}

function WifiFields({
  t,
  ssid,
  setSsid,
  wifiPassword,
  setWifiPassword,
  encryption,
  setEncryption,
  hidden,
  setHidden,
}: {
  t: Translator;
  ssid: string;
  setSsid: (value: string) => void;
  wifiPassword: string;
  setWifiPassword: (value: string) => void;
  encryption: string;
  setEncryption: (value: string) => void;
  hidden: boolean;
  setHidden: (value: boolean) => void;
}) {
  return (
    <>
      <Field label={t('fields.ssid')}>
        <input value={ssid} onChange={event => setSsid(event.target.value)} placeholder={t('placeholders.ssid')} style={inputStyle()} />
      </Field>
      <Field label={t('fields.password')}>
        <input value={wifiPassword} onChange={event => setWifiPassword(event.target.value)} placeholder={t('placeholders.password')} style={inputStyle()} />
      </Field>
      <Field label={t('fields.encryption')}>
        <select value={encryption} onChange={event => setEncryption(event.target.value)} style={inputStyle()}>
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">{t('fields.noPassword')}</option>
        </select>
      </Field>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-2)', fontSize: 14 }}>
        <input type="checkbox" checked={hidden} onChange={event => setHidden(event.target.checked)} style={{ accentColor: 'var(--accent)', width: 16, height: 16 }} />
        {t('fields.hidden')}
      </label>
    </>
  );
}

function WhatsAppFields({
  t,
  phone,
  setPhone,
  message,
  setMessage,
}: {
  t: Translator;
  phone: string;
  setPhone: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
}) {
  return (
    <>
      <Field label={t('fields.phone')}>
        <input value={phone} onChange={event => setPhone(event.target.value)} placeholder={t('placeholders.phone')} style={inputStyle()} />
      </Field>
      <Field label={t('fields.message')}>
        <textarea value={message} onChange={event => setMessage(event.target.value)} placeholder={t('placeholders.message')} rows={5} style={{ ...inputStyle(), resize: 'vertical', lineHeight: 1.7 }} />
      </Field>
    </>
  );
}

function VCardFields({
  t,
  fullName,
  setFullName,
  company,
  setCompany,
  phone,
  setPhone,
  email,
  setEmail,
  website,
  setWebsite,
}: {
  t: Translator;
  fullName: string;
  setFullName: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
}) {
  return (
    <>
      <Field label={t('fields.name')}>
        <input value={fullName} onChange={event => setFullName(event.target.value)} placeholder={t('placeholders.name')} style={inputStyle()} />
      </Field>
      <Field label={t('fields.company')}>
        <input value={company} onChange={event => setCompany(event.target.value)} placeholder={t('placeholders.company')} style={inputStyle()} />
      </Field>
      <Field label={t('fields.phone')}>
        <input value={phone} onChange={event => setPhone(event.target.value)} placeholder={t('placeholders.phone')} style={inputStyle()} />
      </Field>
      <Field label={t('fields.email')}>
        <input value={email} onChange={event => setEmail(event.target.value)} placeholder={t('placeholders.email')} style={inputStyle()} />
      </Field>
      <Field label={t('fields.website')}>
        <input value={website} onChange={event => setWebsite(event.target.value)} placeholder={t('placeholders.website')} style={inputStyle()} />
      </Field>
    </>
  );
}
