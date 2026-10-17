'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Eye, CheckCircle, Check, ArrowsOut, ArrowsIn, X, Plus, Minus, GearSix, UsersThree, Package,
  DotsThreeVertical, DotsThree, List, CornersOut, DownloadSimple, Printer, Copy, Star, CaretRight,
} from '@phosphor-icons/react';

/* ───────────────────────── Types & data ───────────────────────── */

type Kind = 'service' | 'product';
type Style = 'circle' | 'gradient' | 'executive' | 'minimal' | 'retail' | 'wholesale' | 'inventory' | 'bold';
type Tag = { label: string; tone: 'purple' | 'green' };
type Tpl = {
  id: string; kind: Kind; name: string; desc: string; tags: Tag[]; style: Style;
  accent: string; soft: string; recommended?: boolean;
  layout: string; features: string[];
};

const TEMPLATES: Tpl[] = [
  { id: 'professional-clean', kind: 'service', name: 'Professional Clean', recommended: true, style: 'circle', accent: '#0F766E', soft: '#E6F4F1',
    desc: 'A modern and professional layout ideal for consultants and professional services.',
    tags: [{ label: 'Service business', tone: 'purple' }, { label: 'Popular', tone: 'green' }],
    layout: 'Logo left · Details right', features: ['Service period', 'VAT breakdown', 'Bank details', 'Contact block'] },
  { id: 'modern-gradient', kind: 'service', name: 'Modern Gradient', style: 'gradient', accent: '#6D28D9', soft: '#F3EEFF',
    desc: 'Contemporary design with subtle gradients, perfect for modern service firms.',
    tags: [{ label: 'Service business', tone: 'purple' }],
    layout: 'Centred header · Gradient band', features: ['Gradient header', 'Service period', 'VAT breakdown', 'Bank details'] },
  { id: 'executive-classic', kind: 'service', name: 'Executive Classic', style: 'executive', accent: '#1E3A5F', soft: '#EEF2F7',
    desc: 'A timeless and elegant template for established professional services businesses.',
    tags: [{ label: 'Service business', tone: 'purple' }],
    layout: 'Dark header · Classic table', features: ['Dark header', 'Formal layout', 'VAT breakdown', 'Bank details'] },
  { id: 'minimal-professional', kind: 'service', name: 'Minimal Professional', style: 'minimal', accent: '#2563EB', soft: '#EFF5FF',
    desc: 'Clean and minimal design with clear structure and excellent readability.',
    tags: [{ label: 'Service business', tone: 'purple' }, { label: 'Minimal', tone: 'green' }],
    layout: 'Minimal · Thin dividers', features: ['Lots of whitespace', 'Clear typography', 'VAT breakdown', 'Bank details'] },
  { id: 'retail-product', kind: 'product', name: 'Retail Product', style: 'retail', accent: '#0F766E', soft: '#E6F4F1',
    desc: 'Modern template for retail businesses with product images and item details.',
    tags: [{ label: 'Product business', tone: 'purple' }, { label: 'Retail', tone: 'green' }],
    layout: 'Product images · Item rows', features: ['Product thumbnails', 'SKU column', 'VAT breakdown', 'Bank details'] },
  { id: 'wholesale', kind: 'product', name: 'Wholesale', style: 'wholesale', accent: '#EA580C', soft: '#FFF3EA',
    desc: 'Designed for wholesale distributors with clear pricing and quantity breaks.',
    tags: [{ label: 'Product business', tone: 'purple' }, { label: 'Wholesale', tone: 'green' }],
    layout: 'Gradient band · Bulk pricing', features: ['Quantity breaks', 'SKU column', 'Delivery info', 'Bank details'] },
  { id: 'inventory-product', kind: 'product', name: 'Inventory Product', style: 'inventory', accent: '#2563EB', soft: '#EFF5FF',
    desc: 'Detailed product layout with SKU, stock codes and item specifications.',
    tags: [{ label: 'Product business', tone: 'purple' }, { label: 'Inventory', tone: 'green' }],
    layout: 'Blue band · Detailed rows', features: ['Stock codes', 'SKU column', 'Item specs', 'Bank details'] },
  { id: 'modern-bold', kind: 'product', name: 'Modern Bold', style: 'bold', accent: '#DC2626', soft: '#FEF0F0',
    desc: 'A bold and striking design for product-focused companies and e-commerce.',
    tags: [{ label: 'Product business', tone: 'purple' }, { label: 'Modern', tone: 'green' }],
    layout: 'Bold header · Strong totals', features: ['Bold header', 'SKU column', 'E-commerce ready', 'Bank details'] },
];

const SERVICE_LINES = [
  ['Website Design', '10', '£150.00', '20%', '£1,500.00'],
  ['Project Planning', '8', '£120.00', '20%', '£960.00'],
  ['Implementation Support', '12', '£120.00', '20%', '£1,440.00'],
  ['Training & Handover', '4', '£100.00', '20%', '£400.00'],
];
const PRODUCT_LINES = [
  ['Wireless Headphones', 'TS-1001', '10', '£150.00', '£1,500.00'],
  ['Smart Watch', 'TS-1002', '8', '£120.00', '£960.00'],
  ['Bluetooth Speaker', 'TS-1003', '12', '£120.00', '£1,440.00'],
  ['USB-C Charger', 'TS-1004', '4', '£100.00', '£400.00'],
];

const TEAL = '#0F766E';
const TEAL_DARK = '#115E59';
const C = { text: '#0B1220', muted: '#64748B', border: '#E2E8F0' };

/* ───────────────────────── TESSMA logo ───────────────────────── */

function TessmaLogo({ light = false, size = 1 }: { light?: boolean; size?: number }) {
  const s = size;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 * s }}>
      <svg width={34 * s} height={34 * s} viewBox="0 0 34 34">
        <polygon points="11,2 20,7 20,17 11,22 2,17 2,7" fill={light ? '#5EEAD4' : '#14B8A6'} />
        <polygon points="23,9 32,14 32,24 23,29 14,24 14,14" fill={light ? '#FFFFFF' : '#0F766E'} />
        <polygon points="11,16 20,21 20,31 11,34 2,31 2,21" fill={light ? '#99F6E4' : '#2DD4BF'} opacity="0.85" />
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: 17 * s, fontWeight: 800, letterSpacing: '0.08em', color: light ? '#fff' : '#0B1220' }}>TESSMA</div>
        <div style={{ fontSize: 8 * s, fontWeight: 600, letterSpacing: '0.45em', color: light ? '#CCFBF1' : TEAL, marginTop: 3 * s, paddingLeft: 14 * s }}>ONE</div>
      </div>
    </div>
  );
}

/* ───────────────────────── Invoice document (595px = A4 width) ───────────────────────── */

function InvoiceDoc({ t }: { t: Tpl }) {
  const a = t.accent;
  const product = t.kind === 'product';
  const darkHeader = t.style === 'executive' || t.style === 'bold';
  const cols = product ? ['Item', 'SKU', 'Qty', 'Unit Price', 'Amount (GBP)'] : ['Description', 'Qty', 'Unit Price', 'VAT', 'Amount (GBP)'];
  const lines = product ? PRODUCT_LINES : SERVICE_LINES;
  const thStyle = (i: number): React.CSSProperties => ({
    textAlign: i === 0 || (product && i === 1) ? 'left' : 'right', padding: '7px 8px', fontSize: 9.5, fontWeight: 700,
    color: darkHeader || t.style === 'inventory' ? '#fff' : C.text,
    background: darkHeader ? a : t.style === 'inventory' ? a : t.style === 'gradient' || t.style === 'wholesale' ? t.soft : 'transparent',
    borderBottom: `1.5px solid ${darkHeader ? a : t.style === 'minimal' ? '#CBD5E1' : a}`,
  });

  return (
    <div style={{ width: 595, background: '#fff', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif', color: C.text, fontSize: 9.5, lineHeight: 1.45 }}>
      {/* decorations */}
      {(t.style === 'circle' || t.style === 'retail') && (
        <>
          <div style={{ position: 'absolute', top: -90, right: -70, width: 240, height: 240, borderRadius: '50%', background: a, opacity: 0.1 }} />
          <div style={{ position: 'absolute', top: -120, right: -10, width: 200, height: 200, borderRadius: '50%', background: a, opacity: 0.08 }} />
        </>
      )}
      {t.style === 'gradient' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 110, background: 'linear-gradient(120deg, #EDE4FF 0%, #F7F2FF 45%, #E3EEFF 100%)' }} />}
      {t.style === 'wholesale' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'linear-gradient(90deg, #F97316, #FDBA74, #14B8A6)' }} />}
      {t.style === 'inventory' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'linear-gradient(90deg, #1D4ED8, #60A5FA)' }} />}
      {t.style === 'minimal' && <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 90, background: 'linear-gradient(225deg, #DBEAFE 0%, rgba(255,255,255,0) 70%)' }} />}

      {/* header */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: darkHeader ? '22px 32px' : '30px 32px 14px', background: darkHeader ? a : 'transparent',
      }}>
        <TessmaLogo light={darkHeader} />
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.04em', color: darkHeader ? '#fff' : a }}>INVOICE</div>
      </div>

      {/* company + meta */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', padding: darkHeader ? '18px 32px 10px' : '10px 32px 10px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 10.5 }}>Your Company Ltd</div>
          {['123 Business Park', 'Innovation Drive', 'London SW1 1AA', 'United Kingdom', 'VAT No: GB123456789'].map(l => <div key={l} style={{ color: '#334155' }}>{l}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: 18, alignContent: 'start' }}>
          {[['Invoice No:', 'INV-2025-0423'], ['Issue Date:', '15 Apr 2025'], ['Due Date:', '15 May 2025'], [product ? 'Delivery Date:' : 'Service Period:', product ? '14 Apr 2025' : '01 Apr 2025 – 30 Apr 2025'], ['Reference:', 'PO-44881']].map(([k, v]) => (
            <React.Fragment key={k}><span style={{ color: C.muted }}>{k}</span><span style={{ fontWeight: 600, textAlign: 'right' }}>{v}</span></React.Fragment>
          ))}
        </div>
      </div>

      {/* bill to / contact */}
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '8px 32px 14px' }}>
        <div style={{ background: t.soft, borderRadius: 4, padding: '10px 12px', borderLeft: t.style === 'minimal' ? `2px solid ${a}` : 'none' }}>
          <div style={{ fontWeight: 700, color: a, marginBottom: 2 }}>Bill To:</div>
          <div style={{ fontWeight: 700 }}>ABC Ltd</div>
          {['123 Business Park', 'Innovation Drive', 'London SW1 1AA', 'United Kingdom', 'VAT No: GB987654321'].map(l => <div key={l} style={{ color: '#334155' }}>{l}</div>)}
        </div>
        <div style={{ background: t.soft, borderRadius: 4, padding: '10px 12px', borderLeft: t.style === 'minimal' ? `2px solid ${a}` : 'none' }}>
          <div style={{ fontWeight: 700, color: a, marginBottom: 2 }}>{product ? 'Ship To:' : 'Contact:'}</div>
          <div style={{ fontWeight: 700 }}>Sarah Clarke</div>
          <div style={{ color: '#334155' }}>{product ? 'Warehouse Manager' : 'Finance Manager'}</div>
          <div style={{ color: '#334155' }}>sarah.clarke@abc-ltd.co.uk</div>
          <div style={{ color: '#334155' }}>+44 20 7123 4567</div>
        </div>
      </div>

      {/* table */}
      <div style={{ padding: '0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{cols.map((c, i) => <th key={c} style={thStyle(i)}>{c}</th>)}</tr></thead>
          <tbody>
            {lines.map((r, ri) => (
              <tr key={r[0]} style={{ background: t.style === 'executive' && ri % 2 ? '#F8FAFC' : '#fff' }}>
                {r.map((cell, i) => (
                  <td key={i} style={{ padding: '7px 8px', borderBottom: '1px solid #EEF2F6', textAlign: i === 0 || (product && i === 1) ? 'left' : 'right', fontWeight: i === r.length - 1 ? 600 : 400 }}>
                    {i === 0 && t.style === 'retail' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 16, height: 16, borderRadius: 3, background: ['#334155', '#64748B', '#0F766E', '#94A3B8'][ri] }} />{cell}
                      </span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 32px 0' }}>
        <div style={{ width: 210 }}>
          {[['Subtotal', '£4,300.00'], ['VAT (20%)', '£860.00']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 8px', fontWeight: 600 }}><span>{k}</span><span>{v}</span></div>
          ))}
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 6, padding: '9px 10px', borderRadius: 4, fontSize: 12.5, fontWeight: 800,
            background: darkHeader ? a : t.soft, color: darkHeader ? '#fff' : C.text,
          }}><span>Total (GBP)</span><span>£5,160.00</span></div>
        </div>
      </div>

      {/* payment / thanks */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, padding: '22px 32px 18px' }}>
        <div>
          <div style={{ fontWeight: 700, color: a, marginBottom: 3 }}>Payment Details</div>
          {['Bank: Barclays Bank PLC', 'Sort Code: 20-12-34', 'Account No: 12345678', 'Account Name: Your Company Ltd', 'IBAN: GB29 BARC 2000 0012 3456 78'].map(l => <div key={l}>{l}</div>)}
        </div>
        <div style={{ textAlign: 'right', maxWidth: 210 }}>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>Thank you for your business.</div>
          <div style={{ color: '#334155' }}>If you have any questions, please contact our team at support@yourcompany.co.uk or +44 20 7123 4567.</div>
        </div>
      </div>

      {/* footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, margin: '0 32px', padding: '10px 0 20px', textAlign: 'center', fontSize: 8.5, color: a }}>
        Your Company Ltd &nbsp;|&nbsp; Innovation Drive, London SW1 1AA, United Kingdom<br />
        www.yourcompany.co.uk &nbsp;|&nbsp; accounts@yourcompany.co.uk
      </div>
    </div>
  );
}

/* ───────────────────────── Small UI pieces ───────────────────────── */

function TagPill({ tag }: { tag: Tag }) {
  const p = tag.tone === 'purple' ? { bg: '#F1ECFF', fg: '#6D28D9' } : { bg: '#DCFCE7', fg: '#15803D' };
  return <span style={{ fontSize: 10.5, fontWeight: 500, padding: '3px 8px', borderRadius: 4, background: p.bg, color: p.fg, whiteSpace: 'nowrap' }}>{tag.label}</span>;
}

const outlineBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 32, borderRadius: 6,
  border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 12, fontWeight: 500, cursor: 'pointer',
};
const solidBtn: React.CSSProperties = { ...outlineBtn, border: 'none', background: TEAL_DARK, color: '#fff', fontWeight: 600 };

function PdfToolbar({ zoom, setZoom, onFit, onPrint, onDownload, dark = true }: {
  zoom: number; setZoom: (z: number) => void; onFit: () => void; onPrint: () => void; onDownload: () => void; dark?: boolean;
}) {
  const ic: React.CSSProperties = { background: 'none', border: 'none', color: dark ? '#E2E8F0' : C.text, cursor: 'pointer', display: 'flex', padding: 3 };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: dark ? '#3A3D42' : '#fff', color: dark ? '#E2E8F0' : C.text, fontSize: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={ic} title="Menu"><List size={16} /></button>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ background: dark ? '#202225' : '#F1F5F9', padding: '1px 8px', borderRadius: 3 }}>1</span> / 1
        </span>
        <span style={{ width: 1, height: 16, background: '#6B7280' }} />
        <button style={ic} title="Zoom out" onClick={() => setZoom(Math.max(50, zoom - 10))}><Minus size={15} /></button>
        <span style={{ minWidth: 34, textAlign: 'center', fontSize: 11 }}>{zoom}%</span>
        <button style={ic} title="Zoom in" onClick={() => setZoom(Math.min(200, zoom + 10))}><Plus size={15} /></button>
        <button style={ic} title="Fit to width" onClick={onFit}><CornersOut size={15} /></button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button style={ic} title="Download" onClick={onDownload}><DownloadSimple size={16} /></button>
        <button style={ic} title="Print" onClick={onPrint}><Printer size={16} /></button>
        <button style={ic} title="More"><DotsThreeVertical size={16} weight="bold" /></button>
      </div>
    </div>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function InvoiceTemplateLibraryPage() {
  const [tab, setTab] = useState<'all' | Kind>('all');
  const [selectedId, setSelectedId] = useState('professional-clean');
  const [inUseId, setInUseId] = useState('professional-clean');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [fsZoom, setFsZoom] = useState(100);
  const [toast, setToast] = useState<string | null>(null);

  const selected = TEMPLATES.find(t => t.id === selectedId)!;
  const previewTpl = previewId ? TEMPLATES.find(t => t.id === previewId)! : null;

  const notify = (m: string) => { setToast(m); window.setTimeout(() => setToast(null), 2600); };
  const useTemplate = (t: Tpl) => { setInUseId(t.id); setSelectedId(t.id); notify(`"${t.name}" is now your invoice template`); };
  const duplicate = (t: Tpl) => notify(`"${t.name}" duplicated as "${t.name} (Copy)"`);

  // Esc closes overlays; lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (fullscreen) setFullscreen(false); else if (previewId) setPreviewId(null); else setMenuId(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = fullscreen || previewId ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [fullscreen, previewId]);

  // close kebab menu on outside click
  useEffect(() => {
    if (!menuId) return;
    const close = () => setMenuId(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [menuId]);

  const tabs: { id: 'all' | Kind; label: string; count: number }[] = [
    { id: 'all', label: 'All templates', count: 8 },
    { id: 'service', label: 'Service businesses', count: 4 },
    { id: 'product', label: 'Product businesses', count: 4 },
  ];

  /* ── Template card ── */
  const Card = ({ t }: { t: Tpl }) => {
    const isSel = t.id === selectedId;
    const isService = t.kind === 'service';
    return (
      <div
        id={`template-${t.id}`}
        onClick={() => setSelectedId(t.id)}
        style={{
          background: '#fff', borderRadius: 8, padding: 8, cursor: 'pointer', position: 'relative',
          border: `1.5px solid ${isSel ? TEAL : C.border}`, boxShadow: isSel ? '0 0 0 3px rgba(15,118,110,0.12)' : '0 1px 2px rgba(15,23,42,0.04)',
          transition: 'box-shadow .15s, border-color .15s, transform .15s', display: 'flex', flexDirection: 'column',
        }}
        onMouseEnter={e => { if (!isSel) e.currentTarget.style.boxShadow = '0 6px 16px rgba(15,23,42,0.08)'; }}
        onMouseLeave={e => { if (!isSel) e.currentTarget.style.boxShadow = '0 1px 2px rgba(15,23,42,0.04)'; }}
      >
        {/* thumbnail */}
        <div style={{ position: 'relative', height: isService ? 112 : 104, borderRadius: 5, overflow: 'hidden', background: '#F1F5F9', border: '1px solid #EEF2F6', display: 'flex', justifyContent: 'center' }}>
          <div style={{ zoom: 0.26, marginTop: 20, boxShadow: '0 4px 20px rgba(15,23,42,0.18)' } as React.CSSProperties}>
            <InvoiceDoc t={t} />
          </div>
          {t.recommended && (
            <span style={{ position: 'absolute', top: 6, left: 6, display: 'flex', alignItems: 'center', gap: 4, background: TEAL, color: '#fff', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4 }}>
              <Check size={10} weight="bold" />Recommended
            </span>
          )}
          {inUseId === t.id && (
            <span style={{ position: 'absolute', bottom: 6, right: 6, display: 'flex', alignItems: 'center', gap: 3, background: '#fff', color: TEAL, border: `1px solid ${TEAL}`, fontSize: 9.5, fontWeight: 600, padding: '2px 6px', borderRadius: 4 }}>
              <CheckCircle size={10} weight="fill" />In use
            </span>
          )}
        </div>

        {/* title + kebab */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, position: 'relative' }}>
          <span style={{ fontSize: 12.5, fontWeight: 700 }}>{t.name}</span>
          <button
            id={`menu-${t.id}`}
            onClick={e => { e.stopPropagation(); setMenuId(menuId === t.id ? null : t.id); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: C.muted }}
          ><DotsThreeVertical size={16} weight="bold" /></button>
          {menuId === t.id && (
            <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', right: 0, top: 22, zIndex: 20, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 8, boxShadow: '0 10px 30px rgba(15,23,42,0.15)', minWidth: 160, padding: 4 }}>
              {[
                ['Preview', <Eye key="i" size={14} />, () => setPreviewId(t.id)],
                ['Use template', <CheckCircle key="i" size={14} />, () => useTemplate(t)],
                ['Duplicate', <Copy key="i" size={14} />, () => duplicate(t)],
                ['Set as default', <Star key="i" size={14} />, () => useTemplate(t)],
              ].map(([label, icon, fn]) => (
                <button key={label as string} onClick={() => { (fn as () => void)(); setMenuId(null); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '7px 10px', border: 'none', background: 'none', borderRadius: 5, fontSize: 12, cursor: 'pointer', textAlign: 'left', color: C.text }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F1F5F9')} onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                >{icon as React.ReactNode}{label as string}</button>
              ))}
            </div>
          )}
        </div>

        <p style={{ margin: '3px 0 8px', fontSize: 11.5, color: '#475569', lineHeight: 1.45, minHeight: 50 }}>{t.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>{t.tags.map(g => <TagPill key={g.label} tag={g} />)}</div>

        {/* actions — service: stacked full width, product: side by side */}
        <div style={{ marginTop: 'auto', display: isService ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: '1fr 1.25fr', gap: 6 }}>
          <button id={`preview-${t.id}`} onClick={e => { e.stopPropagation(); setSelectedId(t.id); setPreviewId(t.id); }} style={outlineBtn}>
            <Eye size={14} />Preview
          </button>
          <button id={`use-${t.id}`} onClick={e => { e.stopPropagation(); useTemplate(t); }} style={solidBtn}>
            Use template
          </button>
        </div>
      </div>
    );
  };

  const Section = ({ kind }: { kind: Kind }) => {
    const service = kind === 'service';
    return (
      <section style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 30, height: 30, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', background: service ? '#F1ECFF' : '#FFF4E5', color: service ? '#7C3AED' : '#F59E0B' }}>
              {service ? <UsersThree size={18} weight="fill" /> : <Package size={18} weight="fill" />}
            </span>
            <div>
              <h2 style={{ margin: 0, fontSize: 14.5, fontWeight: 700 }}>{service ? 'Service business templates' : 'Product business templates'}</h2>
              <div style={{ fontSize: 11.5, color: C.muted }}>{service ? 'Professional templates designed for service-based businesses, consultancy and project work.' : 'Specialised templates for product, retail and inventory-based businesses.'}</div>
            </div>
          </div>
          <button onClick={() => setTab(kind)} style={{ background: 'none', border: 'none', color: '#334155', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            View all <CaretRight size={12} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
          {TEMPLATES.filter(t => t.kind === kind).map(t => <Card key={t.id} t={t} />)}
        </div>
      </section>
    );
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: C.text, paddingBottom: 24 }}>
      {/* toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 10000, background: TEAL_DARK, color: '#fff', padding: '11px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 10px 25px rgba(0,0,0,0.18)' }}>
          <CheckCircle size={18} weight="fill" />{toast}
        </div>
      )}

      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Invoice Template Library</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.muted }}>Choose a professional template for your invoices. Each template can be customised with your branding, colours and company details.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link id="manage-branding" href="/finance/branding" style={{ ...outlineBtn, height: 36, padding: '0 14px', textDecoration: 'none', fontSize: 12.5 }}><GearSix size={15} />Manage branding</Link>
          <button id="create-custom-template" onClick={() => notify('Custom template builder coming soon')} style={{ ...solidBtn, height: 36, padding: '0 16px', fontSize: 12.5 }}><Plus size={15} weight="bold" />Create custom template</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 330px', gap: 12, alignItems: 'start' }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: 8 }}>
            {tabs.map(x => {
              const on = tab === x.id;
              return (
                <button key={x.id} id={`tab-${x.id}`} onClick={() => setTab(x.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, height: 30, padding: '0 14px', borderRadius: 6, cursor: 'pointer', fontSize: 12.5,
                  border: `1px solid ${on ? '#99D5CC' : C.border}`, background: on ? '#E6F4F1' : '#fff', color: C.text, fontWeight: on ? 600 : 500,
                }}>
                  {x.label}
                  <span style={{ minWidth: 18, padding: '0 6px', height: 18, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, background: on ? TEAL : '#F1F5F9', color: on ? '#fff' : '#475569' }}>{x.count}</span>
                </button>
              );
            })}
          </div>
          {(tab === 'all' || tab === 'service') && <Section kind="service" />}
          {(tab === 'all' || tab === 'product') && <Section kind="product" />}
        </div>

        {/* RIGHT: preview panel */}
        <aside style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: 10, position: 'sticky', top: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>Template preview</div>
              <div style={{ fontSize: 11, color: C.muted }}>See how your invoice will look with this template.</div>
            </div>
            <button id="full-screen" onClick={() => { setFsZoom(100); setFullscreen(true); }} style={{ ...outlineBtn, height: 30, padding: '0 10px', fontSize: 11.5 }}><ArrowsOut size={14} />Full screen</button>
          </div>

          <div style={{ borderRadius: 6, overflow: 'hidden', background: '#525659' }}>
            <PdfToolbar zoom={zoom} setZoom={setZoom} onFit={() => setZoom(100)} onPrint={() => window.print()} onDownload={() => notify(`Downloading ${selected.name} sample PDF…`)} />
            <div style={{ height: 470, overflow: 'auto', padding: 10, display: 'flex', justifyContent: zoom <= 100 ? 'center' : 'flex-start' }}>
              <div style={{ zoom: 0.5 * (zoom / 100), boxShadow: '0 4px 18px rgba(0,0,0,0.35)', height: 'fit-content' } as React.CSSProperties}>
                <InvoiceDoc t={selected} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr 1.25fr', gap: 8, marginTop: 10 }}>
            <button id="preview-template" onClick={() => setPreviewId(selected.id)} style={{ ...outlineBtn, height: 36 }}><Eye size={14} />Preview template</button>
            <button id="duplicate-template" onClick={() => duplicate(selected)} style={{ ...outlineBtn, height: 36 }}><Copy size={14} />Duplicate</button>
            <button id="use-this-template" onClick={() => useTemplate(selected)} style={{ ...solidBtn, height: 36 }}><Plus size={14} weight="bold" />Use this template</button>
          </div>
        </aside>
      </div>

      {/* ── PREVIEW MODAL ── */}
      {previewTpl && (
        <div onClick={() => setPreviewId(null)} style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 'min(1000px, 100%)', maxHeight: '92vh', background: '#fff', borderRadius: 12, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 300px', boxShadow: '0 25px 60px rgba(0,0,0,0.35)' }}>
            <div style={{ background: '#525659', overflow: 'auto', padding: 24, display: 'flex', justifyContent: 'center' }}>
              <div style={{ zoom: 1, boxShadow: '0 6px 24px rgba(0,0,0,0.4)', height: 'fit-content' } as React.CSSProperties}><InvoiceDoc t={previewTpl} /></div>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{previewTpl.kind === 'service' ? 'Service business' : 'Product business'}</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{previewTpl.name}</div>
                </div>
                <button id="close-preview" onClick={() => setPreviewId(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: 6, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: '#475569', lineHeight: 1.5 }}>{previewTpl.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{previewTpl.recommended && <TagPill tag={{ label: 'Recommended', tone: 'green' }} />}{previewTpl.tags.map(g => <TagPill key={g.label} tag={g} />)}</div>
              <div style={{ fontSize: 12 }}>
                <div style={{ color: C.muted, marginBottom: 4 }}>Layout</div><div style={{ fontWeight: 600 }}>{previewTpl.layout}</div>
              </div>
              <div style={{ fontSize: 12 }}>
                <div style={{ color: C.muted, marginBottom: 6 }}>Accent colour</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 18, height: 18, borderRadius: 4, background: previewTpl.accent }} /><span style={{ fontWeight: 600 }}>{previewTpl.accent}</span></div>
              </div>
              <div style={{ fontSize: 12 }}>
                <div style={{ color: C.muted, marginBottom: 6 }}>Features</div>
                {previewTpl.features.map(f => <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}><CheckCircle size={14} color={TEAL} weight="fill" />{f}</div>)}
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => { setSelectedId(previewTpl.id); setPreviewId(null); setFsZoom(100); setFullscreen(true); }} style={{ ...outlineBtn, height: 36 }}><ArrowsOut size={14} />Open full screen</button>
                <button onClick={() => duplicate(previewTpl)} style={{ ...outlineBtn, height: 36 }}><Copy size={14} />Duplicate</button>
                <button onClick={() => { useTemplate(previewTpl); setPreviewId(null); }} style={{ ...solidBtn, height: 38 }}><CheckCircle size={15} weight="fill" />Use this template</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FULL SCREEN VIEWER ── */}
      {fullscreen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9500, background: '#2B2D31', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', background: '#1F2124', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <TessmaLogo light size={0.7} />
              <span style={{ width: 1, height: 22, background: '#4B5563' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{selected.name}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF' }}>Invoice template · INV-2025-0423</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#3A3D42', borderRadius: 6, padding: '2px 6px' }}>
              <button onClick={() => setFsZoom(Math.max(50, fsZoom - 10))} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', padding: 4 }}><Minus size={15} /></button>
              <span style={{ fontSize: 12, minWidth: 40, textAlign: 'center' }}>{fsZoom}%</span>
              <button onClick={() => setFsZoom(Math.min(200, fsZoom + 10))} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', padding: 4 }}><Plus size={15} /></button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => window.print()} style={{ ...outlineBtn, background: 'transparent', color: '#fff', borderColor: '#4B5563' }}><Printer size={14} />Print</button>
              <button onClick={() => useTemplate(selected)} style={{ ...solidBtn, padding: '0 14px', background: '#14B8A6' }}><CheckCircle size={14} weight="fill" />Use this template</button>
              <button id="exit-full-screen" onClick={() => setFullscreen(false)} style={{ ...outlineBtn, background: 'transparent', color: '#fff', borderColor: '#4B5563', padding: '0 12px' }}><ArrowsIn size={14} />Exit full screen</button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 32, display: 'flex', justifyContent: 'center' }}>
            <div style={{ zoom: 1.25 * (fsZoom / 100), boxShadow: '0 10px 40px rgba(0,0,0,0.5)', height: 'fit-content' } as React.CSSProperties}>
              <InvoiceDoc t={selected} />
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#9CA3AF', padding: 8 }}>Press <b>Esc</b> to exit full screen</div>
        </div>
      )}
    </div>
  );
}
