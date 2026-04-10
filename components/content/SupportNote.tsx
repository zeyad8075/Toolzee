import React from 'react';

interface SupportNoteProps {
  title: string;
  body: string;
}

export default function SupportNote({ title, body }: SupportNoteProps) {
  return (
    <div style={{
      margin: '40px 0',
      padding: '20px 22px',
      borderRadius: 16,
      border: '1px solid rgba(108,99,255,0.18)',
      background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(108,99,255,0.03))',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 12,
        background: 'rgba(108,99,255,0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        flexShrink: 0,
      }}>
        i
      </div>
      <div>
        <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</p>
        <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7 }}>{body}</p>
      </div>
    </div>
  );
}
