'use client';

import React, { useState } from 'react';
import {
  FileText,
  Buildings,
  User,
  Info,
  Table,
  CurrencyDollar,
  CreditCard,
  Article,
  ArrowRight,
  ArrowLeft,
  CaretRight,
  CaretDown,
  DotsSixVertical,
  ToggleLeft,
  ToggleRight,
  Image,
  Trash,
  ArrowCounterClockwise,
  Plus,
  Eye,
  FloppyDisk,
  CheckCircle,
  Circle,
  Download,
  Printer,
  DotsThree,
  Pencil,
} from '@phosphor-icons/react';

const SECTION_ITEMS = [
  { id: 'header', label: 'Header', icon: <FileText size={15} weight="bold" /> },
  { id: 'company', label: 'Company & contact details', icon: <Buildings size={15} weight="bold" /> },
  { id: 'customer', label: 'Customer details', icon: <User size={15} weight="bold" /> },
  { id: 'invoice-info', label: 'Invoice information', icon: <Info size={15} weight="bold" /> },
  { id: 'line-items', label: 'Line items table', icon: <Table size={15} weight="bold" /> },
  { id: 'totals', label: 'Totals & summary', icon: <CurrencyDollar size={15} weight="bold" /> },
  { id: 'payment', label: 'Payment details', icon: <CreditCard size={15} weight="bold" /> },
  { id: 'terms', label: 'Terms & notes', icon: <Article size={15} weight="bold" /> },
  { id: 'footer', label: 'Footer', icon: <FileText size={15} weight="bold" /> },
];

const LINE_ITEMS_TABLE = [
  { show: true, column: 'Item / Description', label: 'Description', alignment: 'Left', width: 'Auto', format: 'Text' },
  { show: true, column: 'Quantity', label: 'Qty', alignment: 'Right', width: '80px', format: 'Number' },
  { show: true, column: 'Unit Price', label: 'Unit Price', alignment: 'Right', width: '100px', format: 'Currency' },
  { show: true, column: 'VAT Rate', label: 'VAT', alignment: 'Right', width: '80px', format: 'Percentage' },
  { show: true, column: 'Amount', label: 'Amount', alignment: 'Right', width: '100px', format: 'Currency' },
];

const INVOICE_LINE_ITEMS = [
  { desc: 'Website Design', qty: 10, price: '£150.00', vat: '20%', amount: '£1,500.00' },
  { desc: 'Website Development', qty: 8, price: '£120.00', vat: '20%', amount: '£960.00' },
  { desc: 'Project Management', qty: 12, price: '£120.00', vat: '20%', amount: '£1,440.00' },
  { desc: 'Training & Handover', qty: 4, price: '£100.00', vat: '20%', amount: '£400.00' },
];

export default function BrandingPage() {
  const [activeSection, setActiveSection] = useState('header');
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('#F0766E');
  const [secondaryColor, setSecondaryColor] = useState('#1E2038');
  const [accentColor, setAccentColor] = useState('#14B8A6');
  const [companyName, setCompanyName] = useState('Your Company Ltd');
  const [tradingName, setTradingName] = useState('TESSMA ONE');
  const [showTradingName, setShowTradingName] = useState(true);
  const [selectedFont, setSelectedFont] = useState('Inter (Recommended)');
  const [lineItems, setLineItems] = useState(LINE_ITEMS_TABLE.map(i => ({ ...i })));
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Totals toggles
  const [showSubtotal, setShowSubtotal] = useState(true);
  const [showVatBreakdown, setShowVatBreakdown] = useState(true);
  const [showTotalAmount, setShowTotalAmount] = useState(true);
  const [showAmountWords, setShowAmountWords] = useState(false);

  // Payment toggles
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(true);
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [showPaymentRef, setShowPaymentRef] = useState(true);
  const [showQrCode, setShowQrCode] = useState(false);

  const handleToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const HEADER_LAYOUTS = [
    { label: 'Logo left', sub: 'Details right' },
    { label: 'Logo centred', sub: 'Details below' },
    { label: 'Logo right', sub: 'Details left' },
  ];

  const toggleLineItem = (idx: number) => {
    setLineItems(prev => prev.map((item, i) => i === idx ? { ...item, show: !item.show } : item));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', minHeight: '100%', background: '#F8FAFC' }}>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: 'fixed', top: '20px', right: '24px', backgroundColor: '#0F766E',
          color: '#fff', padding: '12px 20px', borderRadius: '8px', fontSize: '13px',
          fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <CheckCircle size={18} weight="fill" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ── TOP HEADER ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '4px', flexWrap: 'wrap', gap: '12px',
      }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Invoice Template Designer / Configuration
          </h1>
          <p style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px', margin: '4px 0 0' }}>
            Design and configure your invoice template. Choose what information to display, customise the layout and styling, and preview changes in real time.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => handleToast('Draft saved successfully!')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 14px',
              borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF',
              color: '#334155', fontSize: '12.5px', fontWeight: 500, cursor: 'pointer',
            }}>
            <FloppyDisk size={15} color="#475569" />
            <span>Save draft</span>
          </button>
          <button
            onClick={() => handleToast('Opening preview...')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 14px',
              borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF',
              color: '#334155', fontSize: '12.5px', fontWeight: 500, cursor: 'pointer',
            }}>
            <Eye size={15} color="#475569" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => handleToast('Template published successfully!')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 16px',
              borderRadius: '6px', border: 'none', background: '#0F766E',
              color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(15,118,110,0.3)',
            }}>
            <CheckCircle size={15} weight="bold" />
            <span>Publish template</span>
          </button>
        </div>
      </div>

      {/* ── MAIN 3-COLUMN LAYOUT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 360px', gap: '16px', alignItems: 'start', marginTop: '16px' }}>

        {/* ── LEFT: Template Structure ── */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Template structure
            </div>
            <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
              Organise and configure the sections of your invoice template.
            </div>
          </div>
          <div style={{ padding: '6px 0' }}>
            {SECTION_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 14px', cursor: 'pointer',
                    background: isActive ? '#F0FDFA' : 'transparent',
                    borderLeft: isActive ? '3px solid #0D9488' : '3px solid transparent',
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = '#F8FAFC'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <DotsSixVertical size={13} color="#94A3B8" />
                    <span style={{ color: isActive ? '#0F766E' : '#4A5568' }}>{item.icon}</span>
                    <span style={{ fontSize: '12px', fontWeight: isActive ? 600 : 400, color: isActive ? '#0F172A' : '#475569' }}>
                      {item.label}
                    </span>
                  </div>
                  <CaretRight size={12} color={isActive ? '#0D9488' : '#94A3B8'} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MIDDLE: Configuration ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* ── 1. HEADER CONFIGURATION ── */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image size={15} weight="bold" color="#0284C7" />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Header configuration</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Configure your logo, company identity and header layout.</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11.5px', color: '#64748B' }}>Apply settings to</span>
                <select style={{ fontSize: '11.5px', border: '1px solid #CBD5E1', borderRadius: '5px', padding: '4px 8px', color: '#334155', background: '#FFFFFF' }}>
                  <option>This template only</option>
                  <option>All templates</option>
                </select>
              </div>
            </div>

            <div style={{ padding: '16px 18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                {/* Company logo */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>Company logo</div>
                  <div style={{
                    border: '2px dashed #CBD5E1', borderRadius: '8px', padding: '18px 16px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: '#F8FAFC', marginBottom: '10px', minHeight: '80px',
                  }}>
                    {/* Tessma logo mockup */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', padding: '5px' }}>
                          {[...Array(4)].map((_, i) => (
                            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '1.5px', background: i === 3 ? '#99F6E4' : '#FFFFFF' }} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>TESSMA</div>
                        <div style={{ fontSize: '9px', fontWeight: 600, color: '#64748B', letterSpacing: '0.08em' }}>ONE</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '10px' }}>Recommended: 350 × 100px, PNG or SVG</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleToast('Logo change dialog opened')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
                        borderRadius: '5px', border: '1px solid #CBD5E1', background: '#FFFFFF',
                        color: '#374151', fontSize: '11.5px', fontWeight: 500, cursor: 'pointer',
                      }}>
                      <Image size={13} color="#475569" />
                      <span>Change logo</span>
                    </button>
                    <button
                      onClick={() => handleToast('Logo removed')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
                        borderRadius: '5px', border: '1px solid #FCA5A5', background: '#FEF2F2',
                        color: '#DC2626', fontSize: '11.5px', fontWeight: 500, cursor: 'pointer',
                      }}>
                      <Trash size={13} color="#DC2626" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Header layout */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>Header layout</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {HEADER_LAYOUTS.map((layout, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedLayout(idx)}
                        style={{
                          flex: 1, border: `2px solid ${selectedLayout === idx ? '#0D9488' : '#E2E8F0'}`,
                          borderRadius: '7px', padding: '8px 6px', cursor: 'pointer',
                          background: selectedLayout === idx ? '#F0FDFA' : '#FAFAFA',
                          position: 'relative', transition: 'all 0.15s',
                        }}>
                        {selectedLayout === idx && (
                          <div style={{
                            position: 'absolute', top: '4px', right: '4px',
                            width: '14px', height: '14px', borderRadius: '50%',
                            background: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <CheckCircle size={12} weight="fill" color="#FFFFFF" />
                          </div>
                        )}
                        {/* Layout preview mockup */}
                        <div style={{ marginBottom: '6px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: idx === 1 ? 'center' : idx === 2 ? 'flex-end' : 'flex-start', padding: '2px' }}>
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: '#0D9488' }} />
                            {idx !== 1 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <div style={{ width: '22px', height: '2px', background: '#CBD5E1', borderRadius: '1px' }} />
                                <div style={{ width: '16px', height: '2px', background: '#E2E8F0', borderRadius: '1px' }} />
                              </div>
                            )}
                          </div>
                        </div>
                        <div style={{ fontSize: '9.5px', fontWeight: 600, color: '#374151', textAlign: 'center' }}>{layout.label}</div>
                        <div style={{ fontSize: '9px', color: '#94A3B8', textAlign: 'center' }}>{layout.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. COMPANY IDENTITY + BRAND COLOURS + TYPOGRAPHY ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>

            {/* Company identity */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Buildings size={15} weight="bold" color="#7C3AED" />
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Company identity</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Company name <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    style={{
                      width: '100%', fontSize: '12px', border: '1px solid #D1D5DB', borderRadius: '5px',
                      padding: '7px 10px', color: '#374151', background: '#FAFAFA', boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Trading name (optional)
                  </label>
                  <input
                    value={tradingName}
                    onChange={e => setTradingName(e.target.value)}
                    style={{
                      width: '100%', fontSize: '12px', border: '1px solid #D1D5DB', borderRadius: '5px',
                      padding: '7px 10px', color: '#374151', background: '#FAFAFA', boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    onClick={() => setShowTradingName(!showTradingName)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    {showTradingName
                      ? <ToggleRight size={26} weight="fill" color="#0D9488" />
                      : <ToggleLeft size={26} color="#94A3B8" />}
                  </div>
                  <span style={{ fontSize: '11px', color: '#475569' }}>Show trading name on documents</span>
                </div>
                {showTradingName && (
                  <div style={{ fontSize: '10.5px', color: '#94A3B8', fontStyle: 'italic' }}>
                    Your trading name will appear in the document header below your company name.
                  </div>
                )}
              </div>
            </div>

            {/* Brand colours */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: 'linear-gradient(135deg, #F87171, #60A5FA, #34D399)', flexShrink: 0 }} />
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Brand colours</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Primary colour', value: primaryColor, setter: setPrimaryColor },
                  { label: 'Secondary colour', value: secondaryColor, setter: setSecondaryColor },
                  { label: 'Accent colour', value: accentColor, setter: setAccentColor },
                ].map(({ label, value, setter }) => (
                  <div key={label}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                      {label}
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #D1D5DB', borderRadius: '5px', padding: '5px 8px', background: '#FAFAFA' }}>
                      <input
                        type="color"
                        value={value}
                        onChange={e => setter(e.target.value)}
                        style={{ width: '22px', height: '22px', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: 0, background: 'transparent' }}
                      />
                      <span style={{ fontSize: '12px', color: '#374151', fontFamily: 'monospace', flex: 1 }}>{value.toUpperCase()}</span>
                      <Pencil size={12} color="#94A3B8" style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#0F172A', fontStyle: 'italic' }}>A</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Typography</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Document font
                  </label>
                  <select
                    value={selectedFont}
                    onChange={e => setSelectedFont(e.target.value)}
                    style={{
                      width: '100%', fontSize: '12px', border: '1px solid #D1D5DB', borderRadius: '5px',
                      padding: '7px 10px', color: '#374151', background: '#FAFAFA', boxSizing: 'border-box',
                    }}>
                    <option>Inter (Recommended)</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                    <option>Lato</option>
                    <option>Poppins</option>
                  </select>
                </div>
                <div style={{
                  background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '12px',
                }}>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>
                    AaBbCcDd123
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'Inter, sans-serif' }}>
                    The quick brown fox jumps over the lazy dog.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. LINE ITEMS TABLE CONFIGURATION ── */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ padding: '12px 18px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Table size={15} weight="bold" color="#7C3AED" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Line items table configuration</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Choose which columns to display and configure their labels and alignment.</div>
                </div>
              </div>
              <button
                onClick={() => setLineItems(LINE_ITEMS_TABLE.map(i => ({ ...i })))}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
                  borderRadius: '5px', border: '1px solid #CBD5E1', background: '#FFFFFF',
                  color: '#374151', fontSize: '11.5px', fontWeight: 500, cursor: 'pointer',
                }}>
                <ArrowCounterClockwise size={13} color="#475569" />
                <span>Reset to default</span>
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {['Show', 'Column', 'Label', 'Alignment', 'Width', 'Format'].map(h => (
                      <th key={h} style={{ padding: '8px 14px', fontWeight: 600, color: '#64748B', textAlign: 'left', fontSize: '11.5px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '10px 14px' }}>
                        <div
                          onClick={() => toggleLineItem(idx)}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          {item.show
                            ? <ToggleRight size={22} weight="fill" color="#0D9488" />
                            : <ToggleLeft size={22} color="#94A3B8" />}
                        </div>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <DotsSixVertical size={12} color="#CBD5E1" />
                          <span style={{ color: '#374151', fontWeight: 500 }}>{item.column}</span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <input
                          defaultValue={item.label}
                          style={{
                            fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '4px',
                            padding: '4px 8px', color: '#374151', background: '#F8FAFC', width: '90px',
                          }}
                        />
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <select style={{ fontSize: '11.5px', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '4px 6px', color: '#374151', background: '#F8FAFC' }}>
                          <option>{item.alignment}</option>
                          <option>Left</option>
                          <option>Center</option>
                          <option>Right</option>
                        </select>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <select style={{ fontSize: '11.5px', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '4px 6px', color: '#374151', background: '#F8FAFC' }}>
                          <option>{item.width}</option>
                          <option>60px</option>
                          <option>80px</option>
                          <option>100px</option>
                          <option>Auto</option>
                        </select>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <select style={{ fontSize: '11.5px', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '4px 6px', color: '#374151', background: '#F8FAFC' }}>
                          <option>{item.format}</option>
                          <option>Text</option>
                          <option>Number</option>
                          <option>Currency</option>
                          <option>Percentage</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '10px 18px', borderTop: '1px solid #F1F5F9' }}>
              <button
                onClick={() => handleToast('Custom column added')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                  borderRadius: '5px', border: '1px dashed #CBD5E1', background: '#FAFAFA',
                  color: '#475569', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                }}>
                <Plus size={13} color="#0D9488" weight="bold" />
                <span>Add custom column</span>
              </button>
            </div>
          </div>

          {/* ── 4. TOTALS & SUMMARY + PAYMENT DETAILS + TERMS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>

            {/* Totals & summary */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <CurrencyDollar size={15} weight="bold" color="#16A34A" />
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Totals & summary</div>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '10px' }}>Configure totals display and summary options.</div>
              {[
                { label: 'Show subtotal', val: showSubtotal, setter: setShowSubtotal },
                { label: 'Show VAT breakdown', val: showVatBreakdown, setter: setShowVatBreakdown },
                { label: 'Show total amount', val: showTotalAmount, setter: setShowTotalAmount },
                { label: 'Show amount in words', val: showAmountWords, setter: setShowAmountWords },
              ].map(({ label, val, setter }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div onClick={() => setter(!val)} style={{ cursor: 'pointer' }}>
                    {val ? <ToggleRight size={22} weight="fill" color="#0D9488" /> : <ToggleLeft size={22} color="#94A3B8" />}
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#374151' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Payment details */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <CreditCard size={15} weight="bold" color="#0284C7" />
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Payment details</div>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '10px' }}>Choose what payment information to display.</div>
              {[
                { label: 'Show payment instructions', val: showPaymentInstructions, setter: setShowPaymentInstructions },
                { label: 'Show bank account details', val: showBankDetails, setter: setShowBankDetails },
                { label: 'Show payment reference', val: showPaymentRef, setter: setShowPaymentRef },
                { label: 'Show QR code (optional)', val: showQrCode, setter: setShowQrCode },
              ].map(({ label, val, setter }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div onClick={() => setter(!val)} style={{ cursor: 'pointer' }}>
                    {val ? <ToggleRight size={22} weight="fill" color="#0D9488" /> : <ToggleLeft size={22} color="#94A3B8" />}
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#374151' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Terms & notes */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Article size={15} weight="bold" color="#D97706" />
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Terms & notes</div>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '10px' }}>Add default terms, notes and footer text.</div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>Default terms and conditions</label>
                <select style={{ width: '100%', fontSize: '11.5px', border: '1px solid #D1D5DB', borderRadius: '5px', padding: '6px 8px', color: '#374151', background: '#FAFAFA' }}>
                  <option>Standard Terms (Company) ▾</option>
                  <option>Custom Terms</option>
                  <option>None</option>
                </select>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '11.5px', fontWeight: 500, cursor: 'pointer', padding: 0, marginBottom: '8px' }}>
                Manage terms and conditions
              </button>
              <div style={{ marginBottom: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>Additional notes (optional)</label>
              </div>
              <textarea
                placeholder="Thank you for your business."
                rows={2}
                style={{
                  width: '100%', fontSize: '11.5px', border: '1px solid #D1D5DB', borderRadius: '5px',
                  padding: '7px 8px', color: '#374151', background: '#FAFAFA', resize: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Live Preview ── */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', position: 'sticky', top: '16px' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={15} weight="bold" color="#0D9488" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Live preview</div>
                <div style={{ fontSize: '10.5px', color: '#64748B' }}>See how your invoice will look with the current configuration.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>View as</span>
              <select style={{ fontSize: '11.5px', border: '1px solid #CBD5E1', borderRadius: '5px', padding: '4px 8px', color: '#334155', background: '#F8FAFC' }}>
                <option>Invoice</option>
                <option>Quote</option>
                <option>Credit Note</option>
              </select>
            </div>
          </div>

          {/* Preview toolbar */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}>
                <ArrowLeft size={13} color="#64748B" />
              </button>
              <span style={{ fontSize: '11px', color: '#64748B' }}>1 / 1</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}>
                <ArrowRight size={13} color="#64748B" />
              </button>
              <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>─</span>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>+</span>
              <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>⛶</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={13} color="#64748B" style={{ cursor: 'pointer' }} />
              <Printer size={13} color="#64748B" style={{ cursor: 'pointer' }} />
              <DotsThree size={15} color="#64748B" style={{ cursor: 'pointer' }} weight="bold" />
            </div>
          </div>

          {/* Invoice preview */}
          <div style={{ padding: '12px', background: '#F1F5F9', minHeight: '400px' }}>
            <div style={{
              background: '#FFFFFF', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden', fontSize: '8px',
            }}>
              {/* Invoice header */}
              <div style={{ padding: '14px 16px', borderBottom: '2px solid ' + accentColor, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '5px',
                    background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', padding: '3px' }}>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} style={{ width: '4px', height: '4px', borderRadius: '1px', background: i === 3 ? '#99F6E4' : '#FFFFFF' }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '8px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.02em' }}>TESSMA</div>
                    <div style={{ fontSize: '5px', fontWeight: 600, color: '#64748B', letterSpacing: '0.06em' }}>ONE</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: accentColor, letterSpacing: '0.04em' }}>INVOICE</div>
                </div>
              </div>

              {/* Company & invoice details */}
              <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '3px', fontSize: '8px' }}>Your Company Ltd</div>
                  {['123 Business Park', 'Innovation Drive', 'London SW1 1AA', 'United Kingdom', 'VAT No: GB123456789'].map(line => (
                    <div key={line} style={{ color: '#64748B', lineHeight: 1.6 }}>{line}</div>
                  ))}
                </div>
                <div style={{ textAlign: 'right' }}>
                  {[
                    ['Invoice No:', 'INV-2025-0423'],
                    ['Issue Date:', '15 Apr 2025'],
                    ['Due Date:', '15 May 2025'],
                    ['Service Period:', '01 Apr 2025 - 30 Apr 2025'],
                    ['Reference:', 'PO-4881'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', lineHeight: 1.7 }}>
                      <span style={{ color: '#64748B' }}>{k}</span>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill to */}
              <div style={{ padding: '6px 16px 10px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ background: '#F8FAFC', borderRadius: '4px', padding: '8px 10px', flex: 1, marginRight: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#64748B', marginBottom: '3px', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bill To:</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>ABC Ltd</div>
                  <div style={{ color: '#64748B' }}>Sarah Clarke</div>
                  <div style={{ color: '#64748B' }}>Finance Manager</div>
                  <div style={{ color: '#64748B' }}>123 Business Park</div>
                  <div style={{ color: '#64748B' }}>Innovation Drive</div>
                  <div style={{ color: '#64748B' }}>London SW1 1AA</div>
                </div>
                <div style={{ background: '#F8FAFC', borderRadius: '4px', padding: '8px 10px', flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#64748B', marginBottom: '3px', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact:</div>
                  <div style={{ color: '#0284C7' }}>sarah.clarke@abc-ltd.co.uk</div>
                  <div style={{ color: '#64748B' }}>+44 20 7123 4567</div>
                  <div style={{ color: '#64748B' }}>VAT No: GB387054321</div>
                </div>
              </div>

              {/* Line items table */}
              <div style={{ padding: '0 10px 8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7.5px' }}>
                  <thead>
                    <tr style={{ background: accentColor }}>
                      {['Description', 'Qty', 'Unit Price', 'VAT', 'Amount (GBP)'].map(h => (
                        <th key={h} style={{ padding: '5px 6px', color: '#FFFFFF', textAlign: h === 'Description' ? 'left' : 'right', fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {INVOICE_LINE_ITEMS.map((item, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                        <td style={{ padding: '4px 6px', color: '#374151' }}>{item.desc}</td>
                        <td style={{ padding: '4px 6px', textAlign: 'right', color: '#374151' }}>{item.qty}</td>
                        <td style={{ padding: '4px 6px', textAlign: 'right', color: '#374151' }}>{item.price}</td>
                        <td style={{ padding: '4px 6px', textAlign: 'right', color: '#374151' }}>{item.vat}</td>
                        <td style={{ padding: '4px 6px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div style={{ padding: '0 10px 10px', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ minWidth: '160px' }}>
                  {showSubtotal && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid #F1F5F9', fontSize: '7.5px' }}>
                      <span style={{ color: '#64748B' }}>Subtotal</span>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>£4,300.00</span>
                    </div>
                  )}
                  {showVatBreakdown && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid #F1F5F9', fontSize: '7.5px' }}>
                      <span style={{ color: '#64748B' }}>VAT (20%)</span>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>£860.00</span>
                    </div>
                  )}
                  {showTotalAmount && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: accentColor, borderRadius: '4px', marginTop: '4px', fontSize: '8px' }}>
                      <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Total (GBP)</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 800 }}>£5,160.00</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment details */}
              {showBankDetails && (
                <div style={{ padding: '8px 16px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '7px' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '3px', fontSize: '7.5px' }}>Payment Details</div>
                    <div style={{ color: '#64748B' }}>Bank: Barclays Bank PLC</div>
                    <div style={{ color: '#64748B' }}>Sort Code: 20-12-34</div>
                    <div style={{ color: '#64748B' }}>Account No: 12345678</div>
                    <div style={{ color: '#64748B' }}>Account Name: Your Company Ltd</div>
                    <div style={{ color: '#64748B' }}>Reference: INV-2025-0423</div>
                  </div>
                  <div style={{ textAlign: 'right', maxWidth: '140px' }}>
                    <div style={{ fontWeight: 600, color: accentColor, marginBottom: '4px' }}>Thank you for your business.</div>
                    <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>
                      If you have any questions, please contact our team at support@yourcompany.co.uk or +44 20 7123 4567
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div style={{ padding: '6px 16px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', textAlign: 'center', fontSize: '6.5px', color: '#94A3B8' }}>
                Your Company Ltd | Innovation Drive, London SW1 1AA, United Kingdom | www.yourcompany.co.uk | accounts@yourcompany.co.uk
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
