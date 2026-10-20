'use client';

import { useState, useRef, useEffect } from 'react';

/* ══════════════════════════════════════════════════════════════════════════
   TEMPLATE DATA
══════════════════════════════════════════════════════════════════════════ */
interface Template {
  id: string;
  name: string;
  tag: string;
  tagType: 'service' | 'product';
  headerGrad: string;
  accent: string;
  secondary: string;
  highlight: string;
  features: string[];
  layoutStyle: string;
  businessDesc: string;
  layoutDesc: string;
  intendedUse: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'consulting',
    name: 'Consulting',
    tag: 'Service business',
    tagType: 'service',
    headerGrad: 'linear-gradient(135deg,#0d9488 0%,#34d399 100%)',
    accent: '#0F766E',
    secondary: '#1E2938',
    highlight: '#148BA6',
    features: ['Professional and clean layout','Customisable header and footer','Itemised services and time-based billing','Automatic tax calculations','Multi-currency support','Branded with your company identity'],
    layoutStyle: 'Modern',
    businessDesc: 'Designed for service-based businesses, consultancy and professional services.',
    layoutDesc: 'Clean, modern design with clear hierarchy and readable typography.',
    intendedUse: 'Consultancy, advisory and professional services',
  },
  {
    id: 'agency',
    name: 'Agency',
    tag: 'Service business',
    tagType: 'service',
    headerGrad: 'linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)',
    accent: '#6D28D9',
    secondary: '#1E2938',
    highlight: '#8B5CF6',
    features: ['Project and milestone layout','Modern creative design','Client-friendly format','Portfolio section support','Milestone billing support','Available in multiple colours'],
    layoutStyle: 'Creative',
    businessDesc: 'Modern and creative design for marketing and digital agencies.',
    layoutDesc: 'Bold creative layout with strong visual hierarchy for agency work.',
    intendedUse: 'Marketing, creative and digital agencies',
  },
  {
    id: 'professional',
    name: 'Professional Services',
    tag: 'Service business',
    tagType: 'service',
    headerGrad: 'linear-gradient(135deg,#0891b2 0%,#67e8f9 100%)',
    accent: '#0369A1',
    secondary: '#1E2938',
    highlight: '#0EA5E9',
    features: ['Detailed service descriptions','Time and materials support','Professional and minimal','Formal document structure','Compliant layout','Multi-currency support'],
    layoutStyle: 'Formal',
    businessDesc: 'Classic and formal template for professional service firms.',
    layoutDesc: 'Traditional formal design with structured layout and clear sections.',
    intendedUse: 'Law firms, accountants and professional consultancies',
  },
  {
    id: 'recurring',
    name: 'Recurring Services',
    tag: 'Service business',
    tagType: 'service',
    headerGrad: 'linear-gradient(135deg,#ea580c 0%,#fb923c 100%)',
    accent: '#C2410C',
    secondary: '#1E2938',
    highlight: '#F97316',
    features: ['Recurring service sections','Period and subscription details','Clear payment schedules','Auto-renewal terms','Subscription tracking','Available in multiple colours'],
    layoutStyle: 'Structured',
    businessDesc: 'Optimised for recurring billing and retainers with clear period details.',
    layoutDesc: 'Structured layout designed for periodic billing and subscription services.',
    intendedUse: 'SaaS, retainers and subscription-based services',
  },
  {
    id: 'retail',
    name: 'Retail Product',
    tag: 'Product business',
    tagType: 'product',
    headerGrad: 'linear-gradient(135deg,#0d9488 0%,#2dd4bf 100%)',
    accent: '#0F766E',
    secondary: '#134E4A',
    highlight: '#14B8A6',
    features: ['Product itemised table','SKU and barcode support','Inventory-friendly layout','Retail pricing breakdown','Tax per product line','Available in multiple colours'],
    layoutStyle: 'Retail',
    businessDesc: 'Specialised for retail and product-based businesses.',
    layoutDesc: 'Product-focused layout with SKU references and quantity-based pricing.',
    intendedUse: 'Retail stores and product sellers',
  },
  {
    id: 'wholesale',
    name: 'Wholesale',
    tag: 'Product business',
    tagType: 'product',
    headerGrad: 'linear-gradient(135deg,#d97706 0%,#fbbf24 100%)',
    accent: '#B45309',
    secondary: '#1E2938',
    highlight: '#F59E0B',
    features: ['Bulk pricing tiers','Wholesale discount columns','Trade terms layout','MOQ references','Pallet and unit breakdowns','Available in multiple colours'],
    layoutStyle: 'Trade',
    businessDesc: 'Specialised templates for wholesale, trade and bulk orders.',
    layoutDesc: 'Trade-focused layout with volume pricing and bulk order terms.',
    intendedUse: 'Wholesale distributors and trade suppliers',
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   MINI INVOICE THUMBNAIL
══════════════════════════════════════════════════════════════════════════ */
function MiniInvoiceThumbnail({ tpl, size = 'sm' }: { tpl: Template; size?: 'sm' | 'lg' }) {
  const h = size === 'lg' ? 22 : 16;
  const pad = size === 'lg' ? '0 8px' : '0 5px';
  const logoSize = size === 'lg' ? 11 : 7;
  const invoiceFs = size === 'lg' ? 7 : 5;
  const rowH = size === 'lg' ? 5 : 3;
  const rows = size === 'lg' ? 4 : 3;

  return (
    <div style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', width: '100%', fontFamily: 'sans-serif' }}>
      {/* Header gradient */}
      <div style={{ height: h, background: tpl.headerGrad, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: pad }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{ width: logoSize + 2, height: logoSize + 2, background: 'rgba(255,255,255,0.9)', clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: logoSize - 2, fontWeight: 900, color: tpl.accent }}>T</span>
          </div>
          <div style={{ color: '#fff', fontSize: logoSize - 2, fontWeight: 800 }}>TESSMA</div>
        </div>
        <div style={{ color: '#fff', fontSize: invoiceFs, fontWeight: 900, letterSpacing: 0.5 }}>INVOICE</div>
      </div>
      {/* Address row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: size === 'lg' ? '4px 8px' : '2px 5px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[1,2,3].map(i => <div key={i} style={{ height: rowH - 1, width: 30 + i * 6, background: i === 1 ? '#94a3b8' : '#e2e8f0', borderRadius: 1 }} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
          {[1,2,3].map(i => <div key={i} style={{ height: rowH - 1, width: 24 + i * 4, background: '#e2e8f0', borderRadius: 1 }} />)}
        </div>
      </div>
      {/* Table header */}
      <div style={{ background: tpl.accent, display: 'flex', gap: 2, padding: size === 'lg' ? '2px 8px' : '1.5px 5px', margin: size === 'lg' ? '3px 0 0' : '2px 0 0' }}>
        {[40, 15, 20, 20].map((w, i) => <div key={i} style={{ flex: w, height: rowH, background: 'rgba(255,255,255,0.35)', borderRadius: 1 }} />)}
      </div>
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: 2, padding: size === 'lg' ? '2px 8px' : '1.5px 5px', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
          {[40, 15, 20, 20].map((w, j) => <div key={j} style={{ flex: w, height: rowH - 0.5, background: j === 0 ? '#d1d5db' : '#e5e7eb', borderRadius: 1 }} />)}
        </div>
      ))}
      {/* Total row */}
      <div style={{ background: tpl.accent, display: 'flex', justifyContent: 'space-between', padding: size === 'lg' ? '3px 8px' : '2px 5px', marginTop: 2 }}>
        <div style={{ height: rowH, width: 20, background: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />
        <div style={{ height: rowH, width: 24, background: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FULL INVOICE DOCUMENT
══════════════════════════════════════════════════════════════════════════ */
function FullInvoice({ tpl, customColours }: { tpl: Template; customColours: { primary: string; secondary: string; accent: string } }) {
  const primary = customColours.primary;
  const sec = customColours.secondary;
  const acc = customColours.accent;

  const items = [
    { desc: 'Website Design', qty: '1', price: '£4,500.00', vat: '20%', amount: '£4,500.00' },
    { desc: 'Website Development', qty: '20', price: '£120.00', vat: '20%', amount: '£2,400.00' },
    { desc: 'Project Management', qty: '10', price: '£75.00', vat: '20%', amount: '£750.00' },
    { desc: 'Consultancy Services', qty: '8', price: '£150.00', vat: '20%', amount: '£1,200.00' },
  ];

  return (
    <div style={{ background: '#fff', width: 520, minWidth: 480, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', fontFamily: 'Inter, Arial, sans-serif', overflow: 'hidden' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ background: tpl.headerGrad, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.9)', clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 900, color: primary }}>T</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', letterSpacing: 1.5 }}>TESSMA</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', letterSpacing: 3 }}>ONE</div>
          </div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: 3 }}>INVOICE</div>
      </div>

      {/* ── Company info + invoice meta ─────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: '18px 24px 12px' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Your Company Ltd</div>
          <div style={{ fontSize: 10, color: '#64748b', lineHeight: 1.8 }}>
            123 Business Park<br />
            Innovation Drive<br />
            London SW1 1AA<br />
            United Kingdom<br />
            VAT No: GB123456789
          </div>
        </div>
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ['Invoice No:', 'INV-2025-0423'],
                ['Issue Date:', '15 Apr 2025'],
                ['Due Date:', '15 May 2025'],
                ['Service Period:', '01 Apr 2025 – 30 Apr 2025'],
                ['Reference:', 'PO-44881'],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={{ fontSize: 9.5, color: '#94a3b8', paddingBottom: 4, paddingRight: 8, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{label}</td>
                  <td style={{ fontSize: 9.5, fontWeight: 600, color: '#0f172a', paddingBottom: 4 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bill To + Contact ─────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 24px 16px' }}>
        <div style={{ background: '#f8fafc', border: `1px solid ${primary}30`, borderLeft: `3px solid ${primary}`, borderRadius: 6, padding: '10px 12px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 }}>Bill To:</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>ABC Ltd</div>
          <div style={{ fontSize: 9.5, color: '#64748b', lineHeight: 1.7 }}>
            123 Business Park<br />
            Innovation Drive<br />
            London SW1 1AA<br />
            United Kingdom<br />
            VAT No: GB987654321
          </div>
        </div>
        <div style={{ background: '#f8fafc', border: `1px solid ${primary}30`, borderLeft: `3px solid ${acc}`, borderRadius: 6, padding: '10px 12px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: acc, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 }}>Contact:</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>Sarah Clarke</div>
          <div style={{ fontSize: 9.5, color: '#64748b', lineHeight: 1.7 }}>
            Finance Manager<br />
            sarah.clarke@abc-ltd.co.uk<br />
            +44 20 7123 4567
          </div>
        </div>
      </div>

      {/* ── Items table ──────────────────────────────────────────── */}
      <div style={{ margin: '0 24px 16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
          <thead>
            <tr style={{ background: primary }}>
              {['Description', 'Qty', 'Unit Price', 'VAT', 'Amount (GBP)'].map((h, i) => (
                <th key={h} style={{ padding: '7px 10px', textAlign: i === 0 ? 'left' : 'right', color: '#fff', fontWeight: 700, fontSize: 9, letterSpacing: 0.3 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', color: '#0f172a', fontWeight: 500 }}>{row.desc}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right', color: '#64748b' }}>{row.qty}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right', color: '#64748b' }}>{row.price}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right', color: '#64748b' }}>{row.vat}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right', color: '#0f172a', fontWeight: 600 }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '10px 10px 0', gap: 4 }}>
          {[['Subtotal', '£8,850.00'], ['VAT (20%)', '£1,770.00']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', gap: 32, fontSize: 10 }}>
              <span style={{ color: '#64748b' }}>{label}</span>
              <span style={{ color: '#0f172a', minWidth: 80, textAlign: 'right', fontWeight: 500 }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Total row */}
        <div style={{ background: primary, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 10px', borderRadius: '0 0 6px 6px', marginTop: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>Total (GBP)</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>£10,620.00</span>
        </div>
      </div>

      {/* ── Payment info footer ──────────────────────────────────────── */}
      <div style={{ background: sec, padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>
          Payment due within 30 days · Bank transfer preferred<br />
          Sort Code: 12-34-56 · Account No: 87654321
        </div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>
          Thank you for your business
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   COLOUR PICKER POPOVER
══════════════════════════════════════════════════════════════════════════ */
const PRESET_COLOURS = [
  '#0F766E','#0369A1','#7C3AED','#C2410C','#B45309','#047857',
  '#DC2626','#0891B2','#D97706','#1E40AF','#9D174D','#374151',
  '#1E2938','#134E4A','#1D4ED8','#15803D','#92400E','#4C1D95',
];

function ColourPickerPopover({ currentColour, onClose, onSelect }: { currentColour: string; onClose: () => void; onSelect: (c: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState(currentColour);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} style={{
      position: 'absolute', top: '110%', left: 0, zIndex: 999,
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12,
      padding: 14, width: 220, boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Choose colour</div>
      {/* Preset grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 6, marginBottom: 12 }}>
        {PRESET_COLOURS.map(c => (
          <button key={c} onClick={() => { onSelect(c); onClose(); }} style={{
            width: 26, height: 26, borderRadius: 6, background: c, border: `3px solid ${c === hex ? '#0f172a' : 'transparent'}`,
            cursor: 'pointer', transition: 'transform 0.1s',
          }} title={c} />
        ))}
      </div>
      {/* Custom hex */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} style={{ width: 32, height: 32, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 2 }} />
        <input value={hex} onChange={e => setHex(e.target.value)} style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 8px', fontSize: 11, fontFamily: 'monospace', color: '#0f172a', outline: 'none' }} placeholder="#000000" />
        <button onClick={() => { onSelect(hex); onClose(); }} style={{ background: '#0d9488', border: 'none', borderRadius: 6, color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 10px', cursor: 'pointer' }}>OK</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */
export default function InvoicePreviewPage() {
  const [activeTpl, setActiveTpl] = useState<Template>(TEMPLATES[0]);
  const [zoom, setZoom] = useState(100);
  const [kebabOpen, setKebabOpen] = useState(false);
  const [customColours, setCustomColours] = useState({ primary: TEMPLATES[0].accent, secondary: TEMPLATES[0].secondary, accent: TEMPLATES[0].highlight });
  const [colourPicker, setColourPicker] = useState<null | 'primary' | 'secondary' | 'accent'>(null);

  // When template changes, reset colours to its defaults
  const selectTemplate = (tpl: Template) => {
    setActiveTpl(tpl);
    setCustomColours({ primary: tpl.accent, secondary: tpl.secondary, accent: tpl.highlight });
    setColourPicker(null);
  };

  const TagBadge = ({ type, label }: { type: 'service' | 'product'; label: string }) => (
    <span style={{
      display: 'inline-block', borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 600,
      background: type === 'service' ? '#f0fdf4' : '#eff6ff',
      color: type === 'service' ? '#15803d' : '#1d4ed8',
      border: `1px solid ${type === 'service' ? '#bbf7d0' : '#bfdbfe'}`,
    }}>
      {label}
    </span>
  );

  const ColourRow = ({ label, colourType }: { label: string; colourType: 'primary' | 'secondary' | 'accent' }) => {
    const colVal = customColours[colourType];
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, position: 'relative' }}>
        <button
          onClick={() => setColourPicker(cp => cp === colourType ? null : colourType)}
          title="Click to change colour"
          style={{
            width: 20, height: 20, background: colVal, borderRadius: 5, flexShrink: 0,
            border: '2px solid rgba(0,0,0,0.12)', cursor: 'pointer', transition: 'transform 0.1s',
            boxShadow: colourPicker === colourType ? `0 0 0 3px ${colVal}55` : 'none',
          }}
        />
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>{colVal?.toUpperCase()}</div>
          <div style={{ fontSize: 9.5, color: '#64748b' }}>{label}</div>
        </div>
        {colourPicker === colourType && (
          <ColourPickerPopover
            currentColour={colVal}
            onClose={() => setColourPicker(null)}
            onSelect={c => setCustomColours(prev => ({ ...prev, [colourType]: c }))}
          />
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Page header */}
        <div style={{ padding: '18px 24px 12px', flexShrink: 0 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Invoice Template Preview</h1>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
            See how this template will look with your branding. Review the design, features and configuration details before using it.
          </p>
        </div>

        {/* PDF-style toolbar */}
        <div style={{
          margin: '0 24px', background: '#1e293b', borderRadius: '8px 8px 0 0',
          display: 'flex', alignItems: 'center', padding: '0 12px', height: 40, gap: 2, flexShrink: 0
        }}>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 15, padding: '0 6px' }}>☰</button>
          <div style={{ width: 1, height: 20, background: '#334155', margin: '0 6px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#94a3b8', fontSize: 11 }}>1</span>
            <span style={{ color: '#64748b', fontSize: 11 }}>/</span>
            <span style={{ color: '#94a3b8', fontSize: 11 }}>1</span>
          </div>
          <div style={{ width: 1, height: 20, background: '#334155', margin: '0 6px' }} />
          <button onClick={() => setZoom(z => Math.max(50, z - 10))} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16, padding: '0 4px', lineHeight: 1 }}>−</button>
          <button onClick={() => setZoom(z => Math.min(150, z + 10))} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16, padding: '0 4px', lineHeight: 1 }}>+</button>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12, padding: '0 4px' }}>⊞</button>
          <div style={{ background: '#334155', border: '1px solid #475569', borderRadius: 4, padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 2 }}>
            <span style={{ color: '#e2e8f0', fontSize: 11 }}>{zoom}%</span>
            <span style={{ color: '#64748b', fontSize: 9 }}>▾</span>
          </div>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 13, padding: '0 4px', marginLeft: 4 }}>⤢</button>
          <div style={{ flex: 1 }} />
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 14, padding: '0 6px' }}>⬇</button>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 14, padding: '0 6px' }}>🖨</button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setKebabOpen(o => !o)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 17, padding: '0 6px', lineHeight: 1 }}>⋮</button>
            {kebabOpen && (
              <div style={{ position: 'absolute', right: 0, top: '115%', background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '4px 0', zIndex: 100, width: 160, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                {['Share template','Duplicate','Set as default','Delete'].map(item => (
                  <button key={item} onClick={() => setKebabOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 14px', background: 'none', border: 'none', color: '#cbd5e1', fontSize: 12, cursor: 'pointer' }}>{item}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dark invoice viewer */}
        <div style={{ margin: '0 24px', background: '#2d3748', flex: '0 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '24px 16px', overflowX: 'auto', height: 390 }}>
          <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}>
            <FullInvoice tpl={activeTpl} customColours={customColours} />
          </div>
        </div>

        {/* ── Related templates ─────────────────────────────────────── */}
        <div style={{ margin: '0 24px', background: '#fff', border: '1px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '14px 18px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, background: '#dcfce7', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11 }}>📋</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Related templates</span>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#0d9488', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              View all templates →
            </button>
          </div>
          <p style={{ fontSize: 11.5, color: '#64748b', margin: '0 0 12px' }}>Other templates you might like for your business.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10 }}>
            {TEMPLATES.map(t => (
              <div
                key={t.id}
                onClick={() => selectTemplate(t)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                {/* Current badge */}
                {activeTpl.id === t.id && (
                  <div style={{
                    position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                    background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10,
                    padding: '1px 7px', fontSize: 8.5, fontWeight: 700, color: '#15803d',
                    whiteSpace: 'nowrap', zIndex: 5, display: 'flex', alignItems: 'center', gap: 2
                  }}>
                    ✓ Current
                  </div>
                )}
                {/* Kebab */}
                <button
                  onClick={e => e.stopPropagation()}
                  style={{ position: 'absolute', top: 4, right: 4, zIndex: 5, background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 4, width: 18, height: 18, cursor: 'pointer', fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >⋮</button>

                <div style={{
                  background: '#f8fafc',
                  border: `2px solid ${activeTpl.id === t.id ? t.accent : '#e2e8f0'}`,
                  borderRadius: 8, padding: '16px 8px 8px',
                  transition: 'all 0.15s',
                  boxShadow: activeTpl.id === t.id ? `0 0 0 3px ${t.accent}22` : 'none',
                }}>
                  <MiniInvoiceThumbnail tpl={t} size="sm" />
                </div>
                <div style={{ padding: '5px 2px 0' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: '#0f172a', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                  <TagBadge type={t.tagType} label={t.tag} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 16, flexShrink: 0 }} />
      </div>

      {/* ── Right Sidebar ──────────────────────────────────────────────────── */}
      <div style={{ width: 295, borderLeft: '1px solid #e2e8f0', background: '#fff', overflowY: 'auto', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Template card top */}
        <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10, marginBottom: 12 }}>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#f8fafc', padding: 5 }}>
              <MiniInvoiceThumbnail tpl={activeTpl} size="sm" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{activeTpl.name}</div>
              <TagBadge type={activeTpl.tagType} label={activeTpl.tag} />
              <p style={{ fontSize: 10.5, color: '#64748b', margin: '6px 0 0', lineHeight: 1.5 }}>{activeTpl.businessDesc}</p>
            </div>
          </div>
          {/* Action buttons */}
          <button style={{ width: '100%', padding: '9px', marginBottom: 8, background: '#0d9488', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span>📄</span> Use template
          </button>
          <button style={{ width: '100%', padding: '8px', marginBottom: 8, background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 11.5, fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <span>⭐</span> Set as default
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button style={{ padding: '8px 6px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 10.5, fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              ✏️ Edit template
            </button>
            <button style={{ padding: '8px 6px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 10.5, fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              👁️ My branding
            </button>
          </div>
        </div>

        {/* ── Template details ─────────────────────────────────────── */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 14 }}>📋</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Template details</span>
          </div>

          {/* Business type BOX */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Business type</div>
            <TagBadge type={activeTpl.tagType} label={activeTpl.tag} />
            <p style={{ fontSize: 10, color: '#64748b', margin: '6px 0 0', lineHeight: 1.5 }}>{activeTpl.businessDesc}</p>
          </div>

          {/* Layout style BOX */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 12px', marginBottom: 0 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Layout style</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{activeTpl.layoutStyle}</div>
            <p style={{ fontSize: 10, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{activeTpl.layoutDesc}</p>
          </div>
        </div>

        {/* Template features + Colour scheme */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Features */}
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Template features</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {activeTpl.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, fontSize: 10, color: '#374151', lineHeight: 1.4 }}>
                    <span style={{ color: '#0d9488', flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colour scheme — clickable */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Colour scheme</div>
              <div style={{ fontSize: 9, color: '#94a3b8', marginBottom: 8, fontStyle: 'italic' }}>Click to change</div>
              <ColourRow label="Primary colour" colourType="primary" />
              <ColourRow label="Secondary colour" colourType="secondary" />
              <ColourRow label="Accent colour" colourType="accent" />
            </div>
          </div>
        </div>

        {/* Supported sections */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 14 }}>⊞</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Supported sections</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              ['🏢','Company logo and address'],
              ['👤','Customer details'],
              ['📑','Invoice metadata (number, dates, reference)'],
              ['📊','Itemised table (products or services)'],
              ['🧮','Totals and tax summary'],
              ['💳','Payment instructions (bank details)'],
              ['📜','Terms and conditions'],
              ['📝','Custom notes'],
            ].map(([icon, text]) => (
              <li key={text} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10.5, color: '#374151' }}>
                <span style={{ fontSize: 12, flexShrink: 0 }}>{icon}</span> {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Compatibility */}
        <div style={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <span style={{ fontSize: 14 }}>🛡️</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Compatibility</span>
          </div>
          <p style={{ fontSize: 10.5, color: '#64748b', margin: '0 0 10px' }}>Works with all Finance modules:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { label: 'Invoices', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
              { label: 'Credit notes', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
              { label: 'Statements', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
              { label: 'Multi-currency', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
            ].map(badge => (
              <span key={badge.label} style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, borderRadius: 20, padding: '3px 10px', fontSize: 10.5, fontWeight: 600 }}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
