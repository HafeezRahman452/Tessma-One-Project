'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckCircle,
  ArrowRight,
  Download,
  Printer,
  DotsThree,
  ArrowLeft,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  ArrowsOut,
  Pencil,
  Eye,
  Star,
  Buildings,
  Receipt,
  CurrencyDollar,
  Bank,
  Article,
  User,
  DotsThreeOutline,
  ShieldCheck,
  Cards,
} from '@phosphor-icons/react';

const RELATED_TEMPLATES = [
  { name: 'Consulting', tag: 'Service business', current: true, color: '#0D9488' },
  { name: 'Agency', tag: 'Service business', current: false, color: '#7C3AED' },
  { name: 'Professional Services', tag: 'Service business', current: false, color: '#0284C7' },
  { name: 'Recurring Services', tag: 'Service business', current: false, color: '#D97706' },
  { name: 'Retail Product', tag: 'Product business', current: false, color: '#DC2626' },
  { name: 'Wholesale', tag: 'Product business', current: false, color: '#16A34A' },
];

const INVOICE_LINES = [
  { desc: 'Website Design', qty: 1, price: '£4,500.00', vat: '20%', amount: '£4,500.00' },
  { desc: 'Website Development', qty: 20, price: '£120.00', vat: '20%', amount: '£2,400.00' },
  { desc: 'Project Management', qty: 10, price: '£75.00', vat: '20%', amount: '£750.00' },
  { desc: 'Consultancy Services', qty: 8, price: '£150.00', vat: '20%', amount: '£1,200.00' },
];

const TEMPLATE_FEATURES = [
  'Professional and clean layout',
  'Customisable header and footer',
  'Itemised services and time-based billing',
  'Automatic tax calculations',
  'Multi-currency support',
  'Branded with your company identity',
];

const SUPPORTED_SECTIONS = [
  { icon: <Buildings size={12} />, label: 'Company logo and address' },
  { icon: <User size={12} />, label: 'Customer details' },
  { icon: <FileText size={12} />, label: 'Invoice metadata (number, dates, reference)' },
  { icon: <Receipt size={12} />, label: 'Itemised table (products or services)' },
  { icon: <CurrencyDollar size={12} />, label: 'Totals and tax summary' },
  { icon: <Bank size={12} />, label: 'Payment instructions (bank details)' },
  { icon: <Article size={12} />, label: 'Terms and conditions' },
  { icon: <FileText size={12} />, label: 'Custom notes' },
];

const COLOUR_SCHEME = [
  { hex: '#0F766E', label: 'Primary colour' },
  { hex: '#1E2938', label: 'Secondary colour' },
  { hex: '#14B8A6', label: 'Accent colour' },
];

export default function InvoiceTemplatePreviewPage() {
  const [zoom, setZoom] = useState(100);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const toast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const accentColor = '#0D9488';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100%', background: '#F8FAFC', paddingBottom: '40px' }}>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: 'fixed', top: '20px', right: '24px', zIndex: 9999,
          background: '#0F766E', color: '#fff', padding: '12px 20px',
          borderRadius: '8px', fontSize: '13px', fontWeight: 600,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <CheckCircle size={18} weight="fill" />
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          Invoice Template Preview
        </h1>
        <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
          See how this template will look with your branding. Review the design, features and configuration details before using it.
        </p>
      </div>

      {/* Main 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>

        {/* ── LEFT: Invoice Preview + Related Templates ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Invoice preview card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>

            {/* Toolbar */}
            <div style={{
              padding: '8px 14px', borderBottom: '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#F8FAFC',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Hamburger */}
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px', color: '#64748B', fontSize: '16px', lineHeight: 1 }}>☰</button>
                {/* Page nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '4px' }}>
                  <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}>
                    <ArrowLeft size={12} color="#64748B" />
                  </button>
                  <span style={{ fontSize: '11.5px', color: '#374151' }}>1</span>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>/</span>
                  <span style={{ fontSize: '11.5px', color: '#374151' }}>1</span>
                  <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}>
                    <ArrowRight size={12} color="#64748B" />
                  </button>
                </div>
                {/* Zoom */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '4px' }}>
                  <button onClick={() => setZoom(z => Math.max(50, z - 10))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}>
                    <MagnifyingGlassMinus size={13} color="#64748B" />
                  </button>
                  <button onClick={() => setZoom(z => Math.min(150, z + 10))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}>
                    <MagnifyingGlassPlus size={13} color="#64748B" />
                  </button>
                </div>
                {/* Zoom select */}
                <select
                  value={zoom}
                  onChange={e => setZoom(Number(e.target.value))}
                  style={{ fontSize: '11.5px', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '3px 6px', color: '#374151', background: '#FFFFFF' }}
                >
                  {[50, 75, 100, 125, 150].map(v => (
                    <option key={v} value={v}>{v}%</option>
                  ))}
                </select>
                <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}>
                  <ArrowsOut size={13} color="#64748B" />
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Download size={14} color="#64748B" style={{ cursor: 'pointer' }} onClick={() => toast('Downloading template...')} />
                <Printer size={14} color="#64748B" style={{ cursor: 'pointer' }} onClick={() => toast('Printing...')} />
                <DotsThree size={18} weight="bold" color="#64748B" style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* Invoice document */}
            <div style={{ padding: '24px 32px', background: '#E8ECF0', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: '#FFFFFF', width: '100%', maxWidth: '680px',
                borderRadius: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                overflow: 'hidden', fontSize: '11px',
                transform: `scale(${zoom / 100})`, transformOrigin: 'top center',
                transition: 'transform 0.2s ease',
              }}>

                {/* Invoice Header */}
                <div style={{
                  padding: '24px 28px 16px',
                  borderBottom: `3px solid ${accentColor}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                }}>
                  {/* Logo */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '9px',
                      background: `linear-gradient(135deg, ${accentColor} 0%, #0F766E 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', padding: '7px' }}>
                        {[...Array(4)].map((_, i) => (
                          <div key={i} style={{ width: '8px', height: '8px', borderRadius: '2px', background: i === 3 ? '#99F6E4' : '#FFFFFF' }} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.01em', lineHeight: 1.1 }}>TESSMA</div>
                      <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B', letterSpacing: '0.15em' }}>ONE</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: accentColor, letterSpacing: '0.05em' }}>INVOICE</div>
                </div>

                {/* Company + Invoice Details */}
                <div style={{ padding: '16px 28px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontSize: '12px' }}>Your Company Ltd</div>
                    {['123 Business Park', 'Innovation Drive', 'London SW1 1AA', 'United Kingdom', 'VAT No: GB123456789'].map(l => (
                      <div key={l} style={{ color: '#64748B', lineHeight: 1.7 }}>{l}</div>
                    ))}
                  </div>
                  <div>
                    {[
                      ['Invoice No:', 'INV-2025-0423'],
                      ['Issue Date:', '15 Apr 2025'],
                      ['Due Date:', '15 May 2025'],
                      ['Service Period:', '01 Apr 2025 – 30 Apr 2025'],
                      ['Reference:', 'PO-44881'],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', gap: '12px', lineHeight: 1.8, justifyContent: 'flex-end' }}>
                        <span style={{ color: '#64748B' }}>{k}</span>
                        <span style={{ fontWeight: 600, color: '#0F172A', minWidth: '130px', textAlign: 'right' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bill To / Contact */}
                <div style={{ padding: '0 28px 16px', display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1, background: '#F8FAFC', borderRadius: '6px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Bill To:</div>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '3px' }}>ABC Ltd</div>
                    {['123 Business Park', 'Innovation Drive', 'London SW1 1AA', 'United Kingdom', 'VAT No: GB987654321'].map(l => (
                      <div key={l} style={{ color: '#64748B', lineHeight: 1.7 }}>{l}</div>
                    ))}
                  </div>
                  <div style={{ flex: 1, background: '#F8FAFC', borderRadius: '6px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Contact:</div>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '3px' }}>Sarah Clarke</div>
                    <div style={{ color: '#64748B' }}>Finance Manager</div>
                    <div style={{ color: '#0284C7' }}>sarah.clarke@abc-ltd.co.uk</div>
                    <div style={{ color: '#64748B' }}>+44 20 7123 4567</div>
                  </div>
                </div>

                {/* Line Items */}
                <div style={{ padding: '0 20px 0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                    <thead>
                      <tr style={{ background: accentColor }}>
                        {['Description', 'Qty', 'Unit Price', 'VAT', 'Amount (GBP)'].map((h, i) => (
                          <th key={h} style={{
                            padding: '9px 10px', color: '#FFFFFF', fontWeight: 700,
                            textAlign: i === 0 ? 'left' : 'right',
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {INVOICE_LINES.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '9px 10px', color: '#374151' }}>{row.desc}</td>
                          <td style={{ padding: '9px 10px', textAlign: 'right', color: '#374151' }}>{row.qty}</td>
                          <td style={{ padding: '9px 10px', textAlign: 'right', color: '#374151' }}>{row.price}</td>
                          <td style={{ padding: '9px 10px', textAlign: 'right', color: '#374151' }}>{row.vat}</td>
                          <td style={{ padding: '9px 10px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div style={{ padding: '12px 20px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ minWidth: '220px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F1F5F9' }}>
                      <span style={{ color: '#64748B' }}>Subtotal</span>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>£8,850.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F1F5F9' }}>
                      <span style={{ color: '#64748B' }}>VAT (20%)</span>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>£1,770.00</span>
                    </div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', padding: '10px 14px',
                      background: accentColor, borderRadius: '6px', marginTop: '8px',
                    }}>
                      <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '12px' }}>Total (GBP)</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '13px' }}>£10,620.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Templates */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '5px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={13} weight="bold" color="#16A34A" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Related templates</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Other templates you might like for your business.</div>
                </div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#0284C7', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                View all templates <ArrowRight size={13} weight="bold" />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {RELATED_TEMPLATES.map((tpl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedTemplate(idx)}
                  style={{
                    flexShrink: 0, width: '130px', border: `2px solid ${selectedTemplate === idx ? tpl.color : '#E2E8F0'}`,
                    borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.15s',
                    background: selectedTemplate === idx ? '#F8FAFC' : '#FAFAFA',
                  }}>
                  {/* Template thumbnail mockup */}
                  <div style={{ height: '80px', background: `linear-gradient(135deg, ${tpl.color}18, ${tpl.color}08)`, position: 'relative', padding: '8px' }}>
                    {tpl.current && (
                      <div style={{
                        position: 'absolute', top: '5px', left: '5px',
                        background: tpl.color, color: '#FFFFFF', fontSize: '8px', fontWeight: 700,
                        padding: '2px 6px', borderRadius: '8px',
                      }}>✓ Current template</div>
                    )}
                    {/* Mini invoice lines */}
                    <div style={{ marginTop: tpl.current ? '18px' : '4px' }}>
                      <div style={{ height: '6px', background: tpl.color, borderRadius: '2px', width: '60%', marginBottom: '4px' }} />
                      {[80, 65, 90, 55].map((w, i) => (
                        <div key={i} style={{ height: '3px', background: '#E2E8F0', borderRadius: '1px', width: `${w}%`, marginBottom: '3px' }} />
                      ))}
                    </div>
                    {/* Mini TESSMA logo */}
                    <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: tpl.color }} />
                        <span style={{ fontSize: '7px', fontWeight: 800, color: '#0F172A' }}>T</span>
                      </div>
                    </div>
                    {/* Three dots */}
                    <div style={{ position: 'absolute', bottom: '6px', right: '6px' }}>
                      <DotsThree size={14} weight="bold" color="#94A3B8" />
                    </div>
                  </div>
                  <div style={{ padding: '7px 8px', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#0F172A', marginBottom: '3px' }}>{tpl.name}</div>
                    <span style={{
                      fontSize: '9px', fontWeight: 600, padding: '2px 6px',
                      borderRadius: '8px', background: `${tpl.color}18`, color: tpl.color,
                    }}>{tpl.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Template Details Panel ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Template info card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', gap: '12px', padding: '14px 16px', borderBottom: '1px solid #E2E8F0' }}>
              {/* Mini thumbnail */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '6px', flexShrink: 0,
                background: 'linear-gradient(135deg, #F0FDFA, #CCFBF1)', border: '1px solid #99F6E4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: '44px' }}>
                  <div style={{ height: '5px', background: accentColor, borderRadius: '1px', marginBottom: '4px' }} />
                  {[75, 55, 85, 60].map((w, i) => (
                    <div key={i} style={{ height: '2.5px', background: '#E2E8F0', borderRadius: '1px', width: `${w}%`, marginBottom: '2.5px' }} />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Consulting</div>
                <span style={{
                  fontSize: '10.5px', fontWeight: 600, padding: '3px 8px', borderRadius: '10px',
                  background: '#F0FDFA', color: '#0F766E',
                }}>Service business</span>
                <p style={{ fontSize: '11px', color: '#64748B', margin: '8px 0 0', lineHeight: 1.5 }}>
                  Clean and professional layout ideal for consultants and advisors.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => toast('Template applied successfully!')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                  height: '38px', borderRadius: '7px', border: 'none',
                  background: accentColor, color: '#FFFFFF', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', width: '100%',
                  boxShadow: '0 1px 3px rgba(13,148,136,0.35)',
                }}>
                <FileText size={15} weight="bold" />
                Use template
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => toast('Set as default template!')}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    height: '34px', borderRadius: '6px', border: '1px solid #E2E8F0',
                    background: '#FFFFFF', color: '#374151', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                  }}>
                  <Star size={13} color="#F59E0B" weight="fill" />
                  Set as default
                </button>
                <button
                  onClick={() => toast('Opening editor...')}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    height: '34px', borderRadius: '6px', border: '1px solid #E2E8F0',
                    background: '#FFFFFF', color: '#374151', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                  }}>
                  <Pencil size={13} color="#475569" />
                  Edit template
                </button>
              </div>
              <button
                onClick={() => toast('Loading preview with your branding...')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  height: '34px', borderRadius: '6px', border: '1px solid #E2E8F0',
                  background: '#FFFFFF', color: '#374151', fontSize: '12px', fontWeight: 500, cursor: 'pointer', width: '100%',
                }}>
                <Eye size={13} color="#475569" />
                Preview with my branding
              </button>
            </div>
          </div>

          {/* Template details */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={12} weight="bold" color="#16A34A" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Template details</span>
            </div>

            {/* Business type + Layout style */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748B', marginBottom: '5px' }}>Business type</div>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '8px', background: '#F0FDFA', color: '#0F766E' }}>
                  Service business
                </span>
                <p style={{ fontSize: '10.5px', color: '#64748B', margin: '6px 0 0', lineHeight: 1.5 }}>
                  Designed for service-based businesses, consultancy and professional services.
                </p>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748B', marginBottom: '5px' }}>Layout style</div>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>Modern</span>
                <p style={{ fontSize: '10.5px', color: '#64748B', margin: '6px 0 0', lineHeight: 1.5 }}>
                  Clean, modern design with clear hierarchy and readable typography.
                </p>
              </div>
            </div>

            <div style={{ height: '1px', background: '#F1F5F9', margin: '12px 0' }} />

            {/* Template features */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Template features</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {TEMPLATE_FEATURES.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <CheckCircle size={13} weight="fill" color="#16A34A" />
                    <span style={{ fontSize: '11px', color: '#374151' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', background: '#F1F5F9', margin: '12px 0' }} />

            {/* Colour scheme */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Colour scheme</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {COLOUR_SCHEME.map(({ hex, label }) => (
                  <div key={hex} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: hex, flexShrink: 0, border: '1px solid rgba(0,0,0,0.08)' }} />
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#374151', fontWeight: 600 }}>{hex}</span>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', background: '#F1F5F9', margin: '12px 0' }} />

            {/* Supported sections */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Supported sections</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {SUPPORTED_SECTIONS.map(({ icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <span style={{ color: '#64748B', display: 'flex', alignItems: 'center' }}>{icon}</span>
                    <span style={{ fontSize: '11px', color: '#374151' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', background: '#F1F5F9', margin: '12px 0' }} />

            {/* Compatibility */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <ShieldCheck size={14} weight="bold" color="#0D9488" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#374151' }}>Compatibility</span>
              </div>
              <p style={{ fontSize: '10.5px', color: '#64748B', margin: '0 0 8px' }}>Works with all Finance modules:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[
                  { label: 'Invoices', color: '#0D9488', bg: '#F0FDFA' },
                  { label: 'Credit notes', color: '#0D9488', bg: '#F0FDFA' },
                  { label: 'Statements', color: '#0D9488', bg: '#F0FDFA' },
                  { label: 'Multi-currency', color: '#D97706', bg: '#FEF3C7' },
                ].map(({ label, color, bg }) => (
                  <span key={label} style={{
                    fontSize: '10.5px', fontWeight: 600, padding: '3px 8px',
                    borderRadius: '8px', background: bg, color: color,
                  }}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
