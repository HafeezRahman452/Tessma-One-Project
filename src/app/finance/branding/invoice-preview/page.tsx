'use client';

import { useState } from 'react';

/* ─── Tiny thumbnail used in Related templates strip ────────────────────── */
function TinyInvoice({ accent = '#0d9488', style = 'consulting' }: { accent?: string; style?: string }) {
  const grads: Record<string, string> = {
    consulting: 'linear-gradient(135deg,#0d9488,#34d399)',
    agency: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
    professional: 'linear-gradient(135deg,#0891b2,#67e8f9)',
    recurring: 'linear-gradient(135deg,#ea580c,#fb923c)',
    retail: 'linear-gradient(135deg,#0d9488,#2dd4bf)',
    wholesale: 'linear-gradient(135deg,#d97706,#fbbf24)',
  };
  return (
    <div style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', width: '100%', fontSize: 4 }}>
      <div style={{ height: 18, background: grads[style] || grads.consulting, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5px' }}>
        <div style={{ color: '#fff', fontSize: 4, fontWeight: 900 }}>TESSMA</div>
        <div style={{ color: '#fff', fontSize: 5, fontWeight: 900 }}>INVOICE</div>
      </div>
      {[1,2,3].map(i => (
        <div key={i} style={{ display: 'flex', gap: 4, padding: '1.5px 5px', background: i % 2 === 0 ? '#f9fafb' : '#fff' }}>
          <div style={{ flex: 1, height: 3, background: '#e5e7eb', borderRadius: 1 }} />
          <div style={{ width: 16, height: 3, background: '#e5e7eb', borderRadius: 1 }} />
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2px 5px', background: accent, marginTop: 2 }}>
        <div style={{ color: '#fff', fontSize: 3.5, fontWeight: 700 }}>£10,620</div>
      </div>
    </div>
  );
}

const relatedTemplates = [
  { id: 'consulting', name: 'Consulting', tag: 'Service business', tagColor: '#15803d', tagBg: '#f0fdf4', tagBorder: '#bbf7d0', accent: '#0d9488', style: 'consulting', current: true },
  { id: 'agency', name: 'Agency', tag: 'Service business', tagColor: '#15803d', tagBg: '#f0fdf4', tagBorder: '#bbf7d0', accent: '#7c3aed', style: 'agency', current: false },
  { id: 'professional', name: 'Professional Services', tag: 'Service business', tagColor: '#15803d', tagBg: '#f0fdf4', tagBorder: '#bbf7d0', accent: '#0891b2', style: 'professional', current: false },
  { id: 'recurring', name: 'Recurring Services', tag: 'Service business', tagColor: '#15803d', tagBg: '#f0fdf4', tagBorder: '#bbf7d0', accent: '#ea580c', style: 'recurring', current: false },
  { id: 'retail', name: 'Retail Product', tag: 'Product business', tagColor: '#1d4ed8', tagBg: '#eff6ff', tagBorder: '#bfdbfe', accent: '#0d9488', style: 'retail', current: false },
  { id: 'wholesale', name: 'Wholesale', tag: 'Product business', tagColor: '#1d4ed8', tagBg: '#eff6ff', tagBorder: '#bfdbfe', accent: '#d97706', style: 'wholesale', current: false },
];

export default function InvoicePreviewPage() {
  const [zoom, setZoom] = useState(100);
  const [kebabOpen, setKebabOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Page header */}
        <div style={{ padding: '20px 24px 0', flexShrink: 0 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Invoice Template Preview</h1>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 14px' }}>
            See how this template will look with your branding. Review the design, features and configuration details before using it.
          </p>
        </div>

        {/* PDF Toolbar */}
        <div style={{
          margin: '0 24px', background: '#1e293b', borderRadius: '8px 8px 0 0',
          display: 'flex', alignItems: 'center', padding: '0 12px', height: 42, gap: 2, flexShrink: 0
        }}>
          {/* Hamburger */}
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0 6px', fontSize: 16, lineHeight: 1 }}>☰</button>
          <div style={{ width: 1, height: 22, background: '#334155', margin: '0 4px' }} />
          {/* Page nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#94a3b8', fontSize: 12 }}>1</span>
            <span style={{ color: '#64748b', fontSize: 12 }}>/</span>
            <span style={{ color: '#94a3b8', fontSize: 12 }}>1</span>
          </div>
          <div style={{ width: 1, height: 22, background: '#334155', margin: '0 8px' }} />
          {/* Zoom controls */}
          <button onClick={() => setZoom(z => Math.max(50, z - 10))} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>−</button>
          <button onClick={() => setZoom(z => Math.min(200, z + 10))} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>+</button>
          {/* Fit */}
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 14, padding: '0 4px' }}>⊞</button>
          {/* Zoom % */}
          <div style={{
            background: '#334155', border: '1px solid #475569', borderRadius: 4,
            padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 4
          }}>
            <span style={{ color: '#e2e8f0', fontSize: 12 }}>{zoom}%</span>
            <span style={{ color: '#64748b', fontSize: 10 }}>▾</span>
          </div>
          {/* Expand */}
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 14, padding: '0 4px', marginLeft: 4 }}>⤢</button>
          <div style={{ flex: 1 }} />
          {/* Download */}
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 15, padding: '0 6px' }}>⬇</button>
          {/* Print */}
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 15, padding: '0 6px' }}>🖨</button>
          {/* Kebab */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setKebabOpen(o => !o)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18, padding: '0 6px', lineHeight: 1 }}
            >⋮</button>
            {kebabOpen && (
              <div style={{
                position: 'absolute', right: 0, top: '120%', background: '#1e293b',
                border: '1px solid #334155', borderRadius: 8, padding: '4px 0', zIndex: 100, width: 160,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
              }}>
                {['Share template', 'Duplicate', 'Set as default', 'Delete'].map(item => (
                  <button key={item} onClick={() => setKebabOpen(false)} style={{
                    display: 'block', width: '100%', textAlign: 'left', padding: '8px 14px',
                    background: 'none', border: 'none', color: '#cbd5e1', fontSize: 12, cursor: 'pointer'
                  }}>{item}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Invoice preview area (dark bg) */}
        <div style={{
          margin: '0 24px', background: '#2d3748', flex: '0 0 auto',
          overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '24px 16px',
          maxHeight: 420
        }}>
          {/* The actual invoice document */}
          <div style={{
            background: '#fff', width: `${Math.min(560, 560 * zoom / 100)}px`,
            minWidth: 380,
            borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            fontFamily: 'Inter, sans-serif', overflow: 'hidden',
            transform: `scale(${zoom / 100})`, transformOrigin: 'top center',
          }}>
            {/* Invoice header */}
            <div style={{ padding: '24px 28px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0d9488' }}>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36,
                  background: 'linear-gradient(135deg,#0d9488,#34d399)',
                  clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: 14 }}>T</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', letterSpacing: 1 }}>TESSMA</div>
                  <div style={{ fontSize: 9, color: '#64748b', letterSpacing: 2 }}>ONE</div>
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: 2 }}>INVOICE</div>
            </div>

            {/* Company info + invoice details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '16px 28px' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Your Company Ltd</div>
                <div style={{ fontSize: 10, color: '#64748b', lineHeight: 1.7 }}>
                  123 Business Park<br />Innovation Drive<br />London SW1 1AA<br />United Kingdom<br />VAT No: GB123456789
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, alignContent: 'start' }}>
                {[
                  ['Invoice No:', 'INV-2025-0423'],
                  ['Issue Date:', '15 Apr 2025'],
                  ['Due Date:', '15 May 2025'],
                  ['Service Period:', '01 Apr 2025 – 30 Apr 2025'],
                  ['Reference:', 'PO-44881'],
                ].map(([label, value]) => (
                  <>
                    <div key={label} style={{ fontSize: 9, color: '#94a3b8' }}>{label}</div>
                    <div key={value} style={{ fontSize: 9, fontWeight: 600, color: '#0f172a' }}>{value}</div>
                  </>
                ))}
              </div>
            </div>

            {/* Bill To + Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '0 28px 14px' }}>
              <div style={{ background: '#f8fafc', borderRadius: 6, padding: '10px 12px' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Bill To:</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>ABC Ltd</div>
                <div style={{ fontSize: 9, color: '#64748b', lineHeight: 1.7 }}>
                  123 Business Park<br />Innovation Drive<br />London SW1 1AA<br />United Kingdom<br />VAT No: GB987654321
                </div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 6, padding: '10px 12px' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Contact:</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>Sarah Clarke</div>
                <div style={{ fontSize: 9, color: '#64748b', lineHeight: 1.7 }}>
                  Finance Manager<br />sarah.clarke@abc-ltd.co.uk<br />+44 20 7123 4567
                </div>
              </div>
            </div>

            {/* Items table */}
            <div style={{ margin: '0 28px 14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.3fr 0.5fr 0.3fr 0.5fr', background: '#0d9488', padding: '6px 10px', borderRadius: '4px 4px 0 0', gap: 4 }}>
                {['Description', 'Qty', 'Unit Price', 'VAT', 'Amount (GBP)'].map(h => (
                  <div key={h} style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>{h}</div>
                ))}
              </div>
              {[
                ['Website Design', '1', '£4,500.00', '20%', '£4,500.00'],
                ['Website Development', '20', '£120.00', '20%', '£2,400.00'],
                ['Project Management', '10', '£75.00', '20%', '£750.00'],
                ['Consultancy Services', '8', '£150.00', '20%', '£1,200.00'],
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 0.3fr 0.5fr 0.3fr 0.5fr', padding: '5px 10px', background: i % 2 === 0 ? '#fff' : '#f8fafc', gap: 4, borderBottom: '1px solid #f1f5f9' }}>
                  {row.map((cell, j) => (
                    <div key={j} style={{ fontSize: 9, color: j === 0 ? '#0f172a' : '#64748b' }}>{cell}</div>
                  ))}
                </div>
              ))}

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '8px 10px', gap: 3, borderTop: '1px solid #e2e8f0' }}>
                {[['Subtotal', '£8,850.00'], ['VAT (20%)', '£1,770.00']].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', gap: 24, fontSize: 9 }}>
                    <span style={{ color: '#64748b' }}>{label}</span>
                    <span style={{ color: '#0f172a', minWidth: 70, textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0d9488', display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '0 0 4px 4px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>Total (GBP)</span>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>£10,620.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related templates ─────────────────────────────────────────── */}
        <div style={{ margin: '0 24px', background: '#fff', border: '1px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '16px 18px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🟢</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Related templates</span>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#0d9488', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>View all templates →</button>
          </div>
          <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px' }}>Other templates you might like for your business.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {relatedTemplates.map(t => (
              <div key={t.id} style={{ position: 'relative' }}>
                {/* Current template badge */}
                {t.current && (
                  <div style={{
                    position: 'absolute', top: 4, left: 4, zIndex: 5,
                    background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10,
                    padding: '1px 6px', fontSize: 8.5, fontWeight: 700, color: '#15803d',
                    display: 'flex', alignItems: 'center', gap: 2
                  }}>
                    ✓ Current template
                  </div>
                )}
                {/* Kebab */}
                <button style={{
                  position: 'absolute', top: 4, right: 4, zIndex: 5,
                  background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 4,
                  width: 18, height: 18, cursor: 'pointer', fontSize: 12, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'
                }}>⋮</button>

                <div style={{ background: '#f8fafc', border: `1.5px solid ${t.current ? '#0d9488' : '#e2e8f0'}`, borderRadius: 8, padding: '22px 8px 8px', cursor: 'pointer' }}>
                  <TinyInvoice accent={t.accent} style={t.style} />
                </div>
                <div style={{ padding: '6px 2px 0' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: '#0f172a', marginBottom: 3 }}>{t.name}</div>
                  <span style={{
                    fontSize: 9, fontWeight: 600, padding: '1px 7px',
                    background: t.tagBg, color: t.tagColor, border: `1px solid ${t.tagBorder}`,
                    borderRadius: 10, display: 'inline-block'
                  }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 20, flexShrink: 0 }} />
      </div>

      {/* ── Right Sidebar ─────────────────────────────────────────────────── */}
      <div style={{
        width: 300, borderLeft: '1px solid #e2e8f0', background: '#fff',
        overflowY: 'auto', flexShrink: 0, display: 'flex', flexDirection: 'column'
      }}>
        {/* Template card */}
        <div style={{ padding: '18px 18px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 10, marginBottom: 12 }}>
            {/* Tiny preview */}
            <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc', padding: 6 }}>
              <TinyInvoice accent="#0d9488" style="consulting" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Consulting</div>
              <span style={{
                display: 'inline-block', background: '#f0fdf4', color: '#15803d',
                border: '1px solid #bbf7d0', borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 600, marginBottom: 4
              }}>Service business</span>
              <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.5 }}>Clean and professional layout ideal for consultants and advisors.</p>
            </div>
          </div>

          {/* Action buttons 2x2 */}
          <button style={{
            width: '100%', padding: '10px', marginBottom: 8,
            background: '#0d9488', border: 'none', borderRadius: 8,
            fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            📄 Use template
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 0 }}>
            {[
              { icon: '⭐', label: 'Set as default' },
              { icon: '✏️', label: 'Edit template' },
              { icon: '👁️', label: 'Preview with my branding' },
            ].map(btn => (
              <button key={btn.label} style={{
                padding: '8px 6px', background: '#fff', border: '1.5px solid #e2e8f0',
                borderRadius: 8, fontSize: 10.5, fontWeight: 600, color: '#374151', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                gridColumn: btn.label === 'Preview with my branding' ? '1 / -1' : 'auto'
              }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template details */}
        <div style={{ padding: '16px 18px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 15 }}>📋</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Template details</span>
          </div>

          {/* Business type + Layout style */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Business type</div>
              <span style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 600 }}>Service business</span>
              <p style={{ fontSize: 10, color: '#64748b', margin: '6px 0 0', lineHeight: 1.5 }}>Designed for service-based businesses, consultancy and professional services.</p>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Layout style</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Modern</div>
              <p style={{ fontSize: 10, color: '#64748b', margin: '6px 0 0', lineHeight: 1.5 }}>Clean, modern design with clear hierarchy and readable typography.</p>
            </div>
          </div>

          {/* Template features + Colour scheme side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Template features</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  'Professional and clean layout',
                  'Customisable header and footer',
                  'Itemised services and time-based billing',
                  'Automatic tax calculations',
                  'Multi-currency support',
                  'Branded with your company identity',
                ].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, fontSize: 10, color: '#374151', lineHeight: 1.4 }}>
                    <span style={{ color: '#0d9488', flexShrink: 0, marginTop: 1 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Colour scheme</div>
              {[
                { hex: '#0F766E', label: 'Primary colour' },
                { hex: '#1E2938', label: 'Secondary colour' },
                { hex: '#148BA6', label: 'Accent colour' },
              ].map(c => (
                <div key={c.hex} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                  <div style={{ width: 16, height: 16, background: c.hex, borderRadius: 3, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)' }} />
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>{c.hex}</div>
                    <div style={{ fontSize: 9, color: '#64748b' }}>{c.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supported sections */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 15 }}>⊞</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Supported sections</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { icon: '🏢', text: 'Company logo and address' },
              { icon: '👤', text: 'Customer details' },
              { icon: '📑', text: 'Invoice metadata (number, dates, reference)' },
              { icon: '📊', text: 'Itemised table (products or services)' },
              { icon: '🧮', text: 'Totals and tax summary' },
              { icon: '💳', text: 'Payment instructions (bank details)' },
              { icon: '📜', text: 'Terms and conditions' },
              { icon: '📝', text: 'Custom notes' },
            ].map(s => (
              <li key={s.text} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10.5, color: '#374151' }}>
                <span style={{ fontSize: 12, flexShrink: 0 }}>{s.icon}</span> {s.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Compatibility */}
        <div style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 15 }}>🛡️</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Compatibility</span>
          </div>
          <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 10px' }}>Works with all Finance modules:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { label: 'Invoices', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
              { label: 'Credit notes', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
              { label: 'Statements', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
              { label: 'Multi-currency', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
            ].map(badge => (
              <span key={badge.label} style={{
                background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`,
                borderRadius: 20, padding: '3px 10px', fontSize: 10.5, fontWeight: 600
              }}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
