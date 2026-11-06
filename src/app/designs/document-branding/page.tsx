'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  FloppyDisk,
  Eye,
  PaperPlaneTilt,
  CheckCircle,
  Buildings,
  Palette,
  TextAa,
  Receipt,
  Bank,
  EnvelopeSimple,
  SlidersHorizontal,
  X,
  ArrowsOut,
  DownloadSimple,
  Printer,
  Check
} from '@phosphor-icons/react';

export default function DocumentBrandingPreviewPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [companyName, setCompanyName] = useState('Your Company Ltd');
  const [tradingName, setTradingName] = useState('TESSMA ONE');
  const [showTradingName, setShowTradingName] = useState(true);

  // Colours
  const [primaryColor, setPrimaryColor] = useState('#0F766E');
  const [secondaryColor, setSecondaryColor] = useState('#1E293B');
  const [accentColor, setAccentColor] = useState('#14B8A6');

  // Layout selection
  const [headerLayout, setHeaderLayout] = useState<'left' | 'center' | 'right'>('left');

  // Typography
  const [fontFamily, setFontFamily] = useState('Inter (Recommended)');

  // Contact Details
  const [addressLine1, setAddressLine1] = useState('123 Business Park');
  const [addressLine2, setAddressLine2] = useState('Innovation Drive');
  const [townCity, setTownCity] = useState('London');
  const [postcode, setPostcode] = useState('SW1 1AA');
  const [country, setCountry] = useState('United Kingdom');
  const [phone, setPhone] = useState('+44 20 7123 4567');
  const [email, setEmail] = useState('accounts@yourcompany.co.uk');
  const [website, setWebsite] = useState('www.yourcompany.co.uk');

  // Bank instructions
  const [bankName, setBankName] = useState('Barclays Bank PLC');
  const [sortCode, setSortCode] = useState('20-00-00');
  const [accountNumber, setAccountNumber] = useState('12345678');
  const [accountName, setAccountName] = useState('Your Company Ltd');
  const [iban, setIban] = useState('GB29 BARC 2000 0012 3456 78');

  // Registration
  const [regCompany, setRegCompany] = useState('Your Company Ltd');
  const [regNumber, setRegNumber] = useState('12345678');
  const [vatNumber, setVatNumber] = useState('GB123456789');

  // Email signature
  const [defaultSignoff, setDefaultSignoff] = useState('Kind regards,');

  // Document defaults
  const [defaultTemplate, setDefaultTemplate] = useState('TESSMA Standard');
  const [includePaymentInstructions, setIncludePaymentInstructions] = useState(true);

  // Live document preview tab
  const [activeDocTab, setActiveDocTab] = useState<'invoice' | 'credit_note' | 'statement'>('invoice');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{ padding: '0 0 48px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 500,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999
        }}>
          <CheckCircle size={18} color="#10B981" weight="fill" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. BREADCRUMB & HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <CaretRight size={12} />
            <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding & Company Identity</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Document Branding Preview</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Document Branding Preview
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Configure your company identity, styling and document settings. See a live preview of how your invoices, credit notes and statements will look.
          </p>
        </div>

        {/* Top Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => showToast('Draft branding settings saved!')}
            style={{
              padding: '8px 16px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            Save draft
          </button>

          <button 
            onClick={() => showToast('Preview generated in new window')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <Eye size={16} />
            <span>Preview</span>
          </button>

          <button 
            onClick={() => showToast('Branding settings published successfully across all documents!')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              background: '#006666',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Check size={16} weight="bold" />
            <span>Publish branding</span>
          </button>
        </div>
      </div>

      {/* ── 2. MAIN WORKSPACE: 2 COLUMNS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(640px, 1.4fr) minmax(420px, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: BRANDING CONFIGURATION CARDS ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Row 1: Company Identity & Brand Colours */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
            
            {/* Card 1: Company identity */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Buildings size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Company identity</h3>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 14px 0' }}>Your logo and company name will appear on all documents.</p>

              {/* Logo box */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>Company logo</div>
                <div style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#F8FAFC',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#009A96', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <div style={{ width: '12px', height: '12px', border: '2px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>TESSMA</div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#009A96', marginTop: '-2px' }}>ONE</div>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={14} /></button>
                </div>
                <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '4px' }}>Recommended: 300 x 100px, PNG or SVG</div>
                <button 
                  onClick={() => showToast('Select new logo image')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', padding: '5px 12px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '12px', color: '#334155', fontWeight: 500, cursor: 'pointer' }}
                >
                  <span>⬆ Change logo</span>
                </button>
              </div>

              {/* Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>Company name *</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>Trading name (optional)</label>
                  <input type="text" value={tradingName} onChange={(e) => setTradingName(e.target.value)} style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '12px' }} />
                </div>

                {/* Show trading name toggle */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
                  <div 
                    onClick={() => setShowTradingName(!showTradingName)}
                    style={{ width: '34px', height: '18px', borderRadius: '999px', background: showTradingName ? '#006666' : '#CBD5E1', position: 'relative', cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}
                  >
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FFFFFF', position: 'absolute', top: '2px', left: showTradingName ? '18px' : '2px', transition: 'left 0.2s' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>Show trading name on documents</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Your trading name will appear in the document header below your company name.</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Card 2: Brand colours */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Palette size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Brand colours</h3>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 16px 0' }}>These colours will be used across your documents.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
                {/* Primary */}
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#0F172A', fontWeight: 600 }}>Primary colour</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: primaryColor }} />
                    <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '12px', color: '#0F172A' }} />
                    <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={12} /></button>
                  </div>
                </div>

                {/* Secondary */}
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#0F172A', fontWeight: 600 }}>Secondary colour</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: secondaryColor }} />
                    <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '12px', color: '#0F172A' }} />
                    <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={12} /></button>
                  </div>
                </div>

                {/* Accent */}
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#0F172A', fontWeight: 600 }}>Accent colour</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: accentColor }} />
                    <input type="text" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '12px', color: '#0F172A' }} />
                    <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={12} /></button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Document Header Layout & Typography */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
            
            {/* Document header layout */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Receipt size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Document header layout</h3>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 16px 0' }}>Choose how your logo and company details appear.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                
                {/* Option 1: Left */}
                <div 
                  onClick={() => setHeaderLayout('left')}
                  style={{
                    border: headerLayout === 'left' ? '2px solid #006666' : '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: headerLayout === 'left' ? '#F0FDF4' : '#FFFFFF',
                    position: 'relative'
                  }}
                >
                  {headerLayout === 'left' && (
                    <div style={{ position: 'absolute', top: '6px', right: '6px', color: '#006666' }}>
                      <CheckCircle size={14} weight="fill" />
                    </div>
                  )}
                  <div style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', marginBottom: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#009A96' }} />
                    <div style={{ width: '30px', height: '4px', background: '#CBD5E1', borderRadius: '2px' }} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#0F172A' }}>Logo left</div>
                  <div style={{ fontSize: '9.5px', color: '#64748B' }}>Details right</div>
                </div>

                {/* Option 2: Centred */}
                <div 
                  onClick={() => setHeaderLayout('center')}
                  style={{
                    border: headerLayout === 'center' ? '2px solid #006666' : '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: headerLayout === 'center' ? '#F0FDF4' : '#FFFFFF',
                    position: 'relative'
                  }}
                >
                  <div style={{ height: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#009A96' }} />
                    <div style={{ width: '28px', height: '3px', background: '#CBD5E1', borderRadius: '2px' }} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#0F172A' }}>Logo centred</div>
                  <div style={{ fontSize: '9.5px', color: '#64748B' }}>Details below</div>
                </div>

                {/* Option 3: Right */}
                <div 
                  onClick={() => setHeaderLayout('right')}
                  style={{
                    border: headerLayout === 'right' ? '2px solid #006666' : '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: headerLayout === 'right' ? '#F0FDF4' : '#FFFFFF',
                    position: 'relative'
                  }}
                >
                  <div style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', marginBottom: '8px' }}>
                    <div style={{ width: '30px', height: '4px', background: '#CBD5E1', borderRadius: '2px' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#009A96' }} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#0F172A' }}>Logo right</div>
                  <div style={{ fontSize: '9.5px', color: '#64748B' }}>Details left</div>
                </div>

              </div>
            </div>

            {/* Typography */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <TextAa size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Typography</h3>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 14px 0' }}>Choose a font style for your documents.</p>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>Document font</label>
                <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', background: '#FFFFFF' }}>
                  <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '12px', color: '#0F172A', width: '100%', background: 'transparent' }}>
                    <option>Inter (Recommended)</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
              </div>

              {/* Sample font box */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', background: '#F8FAFC' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>AaBbCcDd123</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>The quick brown fox jumps over the lazy dog.</div>
              </div>
            </div>

          </div>

          {/* Row 3: Company & Contact Details and Bank Instructions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
            
            {/* Company & contact details */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Buildings size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Company & contact details</h3>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 14px 0' }}>These details appear in your document header and footer.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px', fontSize: '11.5px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '3px' }}>Address line 1 *</label>
                  <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '3px' }}>Address line 2</label>
                  <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '3px' }}>Town / City *</label>
                  <input type="text" value={townCity} onChange={(e) => setTownCity(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '8px', marginBottom: '10px', fontSize: '11.5px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '3px' }}>Postcode *</label>
                  <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '3px' }}>Country *</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px', background: '#FFFFFF' }}>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '3px' }}>Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '3px' }}>Email</label>
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '3px' }}>Website</label>
                  <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
              </div>
            </div>

            {/* Bank / payment instructions */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Bank size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Bank / payment instructions</h3>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 14px 0' }}>These details appear at the bottom of your documents.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '8px', marginBottom: '10px', fontSize: '11.5px' }}>
                <div>
                  <label style={{ display: 'block', color: '#64748B', marginBottom: '3px' }}>Bank name</label>
                  <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#64748B', marginBottom: '3px' }}>Sort code</label>
                  <input type="text" value={sortCode} onChange={(e) => setSortCode(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#64748B', marginBottom: '3px' }}>Account number</label>
                  <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px' }}>
                <div>
                  <label style={{ display: 'block', color: '#64748B', marginBottom: '3px' }}>Account name</label>
                  <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#64748B', marginBottom: '3px' }}>IBAN (optional)</label>
                  <input type="text" value={iban} onChange={(e) => setIban(e.target.value)} style={{ width: '100%', padding: '5px 8px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                </div>
              </div>
            </div>

          </div>

          {/* Row 4: 3 Bottom Mini Cards (Legal, Email Sig, Document defaults) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '16px' }}>
            
            {/* Legal & registration details */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Buildings size={16} color="#059669" weight="bold" />
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Legal & registration details</h4>
              </div>
              <p style={{ fontSize: '10.5px', color: '#64748B', margin: '0 0 10px 0' }}>These details may be shown in your document footer.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div>
                  <span style={{ color: '#64748B' }}>Registered company name</span>
                  <input type="text" value={regCompany} onChange={(e) => setRegCompany(e.target.value)} style={{ width: '100%', padding: '4px 6px', border: '1px solid #CBD5E1', borderRadius: '4px', marginTop: '2px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Company reg number</span>
                    <input type="text" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} style={{ width: '100%', padding: '4px 6px', border: '1px solid #CBD5E1', borderRadius: '4px', marginTop: '2px' }} />
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>VAT number</span>
                    <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} style={{ width: '100%', padding: '4px 6px', border: '1px solid #CBD5E1', borderRadius: '4px', marginTop: '2px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Email signature defaults */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <EnvelopeSimple size={16} color="#059669" weight="bold" />
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Email signature defaults</h4>
              </div>
              <p style={{ fontSize: '10.5px', color: '#64748B', margin: '0 0 10px 0' }}>Used when sending invoices, credit notes and statements.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Default sign-off</span>
                  <select value={defaultSignoff} onChange={(e) => setDefaultSignoff(e.target.value)} style={{ border: '1px solid #CBD5E1', borderRadius: '4px', padding: '3px 6px' }}>
                    <option>Kind regards,</option>
                    <option>Best wishes,</option>
                  </select>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Email signature</span>
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '6px 8px', fontSize: '10px', color: '#475569', marginTop: '2px' }}>
                    <div style={{ fontWeight: 600 }}>John Doe</div>
                    <div>Managing Director</div>
                    <div>Your Company Ltd</div>
                    <div style={{ color: '#0284C7' }}>+44 20 7123 4567 | www.yourcompany.co.uk</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document defaults */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <SlidersHorizontal size={16} color="#059669" weight="bold" />
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Document defaults</h4>
              </div>
              <p style={{ fontSize: '10.5px', color: '#64748B', margin: '0 0 10px 0' }}>Choose the default template and settings for each document type.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', marginBottom: '10px' }}>
                <div>
                  <span style={{ color: '#64748B' }}>Default template</span>
                  <select style={{ width: '100%', border: '1px solid #CBD5E1', borderRadius: '4px', padding: '3px 4px', marginTop: '2px' }}>
                    <option>TESSMA Standard</option>
                  </select>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Invoice template</span>
                  <select style={{ width: '100%', border: '1px solid #CBD5E1', borderRadius: '4px', padding: '3px 4px', marginTop: '2px' }}>
                    <option>TESSMA Standard</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  checked={includePaymentInstructions} 
                  onChange={(e) => setIncludePaymentInstructions(e.target.checked)}
                  style={{ accentColor: '#006666' }}
                />
                <span style={{ fontSize: '11px', color: '#334155' }}>Include payment instructions by default</span>
              </div>
            </div>

          </div>

        </div>

        {/* ════ RIGHT COLUMN: LIVE DOCUMENT PREVIEW ════ */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Receipt size={18} color="#059669" weight="bold" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Live document preview</h3>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 16px 0' }}>See how your documents will look to your customers.</p>

          {/* Document Type Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', background: '#F1F5F9', borderRadius: '8px', padding: '3px', marginBottom: '16px' }}>
            <button 
              onClick={() => setActiveDocTab('invoice')}
              style={{
                padding: '6px',
                border: 'none',
                borderRadius: '6px',
                background: activeDocTab === 'invoice' ? '#FFFFFF' : 'transparent',
                fontWeight: 600,
                fontSize: '12px',
                color: activeDocTab === 'invoice' ? '#0F172A' : '#64748B',
                cursor: 'pointer',
                boxShadow: activeDocTab === 'invoice' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              Invoice
            </button>
            <button 
              onClick={() => setActiveDocTab('credit_note')}
              style={{
                padding: '6px',
                border: 'none',
                borderRadius: '6px',
                background: activeDocTab === 'credit_note' ? '#FFFFFF' : 'transparent',
                fontWeight: 600,
                fontSize: '12px',
                color: activeDocTab === 'credit_note' ? '#0F172A' : '#64748B',
                cursor: 'pointer',
                boxShadow: activeDocTab === 'credit_note' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              Credit note
            </button>
            <button 
              onClick={() => setActiveDocTab('statement')}
              style={{
                padding: '6px',
                border: 'none',
                borderRadius: '6px',
                background: activeDocTab === 'statement' ? '#FFFFFF' : 'transparent',
                fontWeight: 600,
                fontSize: '12px',
                color: activeDocTab === 'statement' ? '#0F172A' : '#64748B',
                cursor: 'pointer',
                boxShadow: activeDocTab === 'statement' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              Statement
            </button>
          </div>

          {/* Scaled PDF Viewer Container */}
          <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Toolbar */}
            <div style={{ background: '#1E293B', color: '#CBD5E1', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>1 / 1</span>
                <span>-</span>
                <span>+</span>
                <span>[ ]</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <DownloadSimple size={13} style={{ cursor: 'pointer' }} />
                <Printer size={13} style={{ cursor: 'pointer' }} />
                <span>⋮</span>
              </div>
            </div>

            {/* Document sheet */}
            <div style={{ background: '#FFFFFF', padding: '24px 20px', fontSize: '10px', color: '#334155', position: 'relative', overflow: 'hidden' }}>
              
              {/* Teal accent corner graphic */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '140px',
                height: '140px',
                background: `linear-gradient(135deg, transparent 50%, ${primaryColor} 50%)`,
                opacity: 0.15,
                pointerEvents: 'none'
              }} />

              {/* Document Header with Logo & Brand */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: headerLayout === 'center' ? 'center' : (headerLayout === 'right' ? 'flex-end' : 'space-between'),
                flexDirection: headerLayout === 'center' ? 'column' : 'row',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                    <div style={{ width: '10px', height: '10px', border: '2px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>TESSMA</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: primaryColor, marginTop: '-2px' }}>ONE</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: headerLayout === 'center' ? '8px' : 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
                    {activeDocTab === 'invoice' ? 'INVOICE' : (activeDocTab === 'credit_note' ? 'CREDIT NOTE' : 'STATEMENT')}
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748B' }}>Invoice No: <span style={{ color: '#0F172A', fontWeight: 600 }}>INV-2025-0423</span></div>
                  <div style={{ fontSize: '9px', color: '#64748B' }}>Issue Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>15 Apr 2025</span></div>
                  <div style={{ fontSize: '9px', color: '#64748B' }}>Due Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>15 May 2025</span></div>
                  <div style={{ fontSize: '9px', color: '#64748B' }}>Service Period: <span style={{ color: '#0F172A', fontWeight: 600 }}>01 Apr 2025 – 30 Apr 2025</span></div>
                  <div style={{ fontSize: '9px', color: '#64748B' }}>Reference: <span style={{ color: '#0F172A', fontWeight: 600 }}>PO-44881</span></div>
                </div>
              </div>

              {/* Company Info & Bill To / Contact grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '16px', fontSize: '9px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{companyName}</div>
                  <div style={{ color: '#64748B' }}>123 Business Park<br />Innovation Drive<br />London SW1 1AA<br />United Kingdom<br />VAT No: {vatNumber}</div>
                </div>
                <div>
                  <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '4px', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>Bill To:</div>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>ABC Ltd</div>
                    <div style={{ color: '#64748B' }}>123 Business Park, London SW1 1AA, VAT: GB987654321</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>Contact:</div>
                    <div style={{ color: '#64748B' }}>Sarah Clarke (Finance Manager)<br />sarah.clarke@abc-ltd.co.uk<br />+44 20 7123 4567</div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${primaryColor}`, textAlign: 'left', color: '#64748B' }}>
                    <th style={{ padding: '4px 0' }}>Description</th>
                    <th style={{ padding: '4px 0', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '4px 0', textAlign: 'right' }}>Unit Price</th>
                    <th style={{ padding: '4px 0', textAlign: 'center' }}>VAT</th>
                    <th style={{ padding: '4px 0', textAlign: 'right' }}>Amount (GBP)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '5px 0', color: '#0F172A', fontWeight: 600 }}>Website Design</td>
                    <td style={{ padding: '5px 0', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '5px 0', textAlign: 'right' }}>£4,500.00</td>
                    <td style={{ padding: '5px 0', textAlign: 'center' }}>20%</td>
                    <td style={{ padding: '5px 0', textAlign: 'right', fontWeight: 600 }}>£4,500.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '5px 0', color: '#0F172A', fontWeight: 600 }}>Website Development</td>
                    <td style={{ padding: '5px 0', textAlign: 'center' }}>20</td>
                    <td style={{ padding: '5px 0', textAlign: 'right' }}>£120.00</td>
                    <td style={{ padding: '5px 0', textAlign: 'center' }}>20%</td>
                    <td style={{ padding: '5px 0', textAlign: 'right', fontWeight: 600 }}>£2,400.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '5px 0', color: '#0F172A', fontWeight: 600 }}>Project Management</td>
                    <td style={{ padding: '5px 0', textAlign: 'center' }}>10</td>
                    <td style={{ padding: '5px 0', textAlign: 'right' }}>£75.00</td>
                    <td style={{ padding: '5px 0', textAlign: 'center' }}>20%</td>
                    <td style={{ padding: '5px 0', textAlign: 'right', fontWeight: 600 }}>£750.00</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px 0', color: '#0F172A', fontWeight: 600 }}>Consultancy Services</td>
                    <td style={{ padding: '5px 0', textAlign: 'center' }}>8</td>
                    <td style={{ padding: '5px 0', textAlign: 'right' }}>£150.00</td>
                    <td style={{ padding: '5px 0', textAlign: 'center' }}>20%</td>
                    <td style={{ padding: '5px 0', textAlign: 'right', fontWeight: 600 }}>£1,200.00</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end', fontSize: '9.5px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', color: '#64748B' }}>
                  <span>Subtotal</span>
                  <span>£8,850.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', color: '#64748B' }}>
                  <span>VAT (20%)</span>
                  <span>£1,770.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', fontWeight: 800, color: '#0F172A', fontSize: '11px', borderTop: '1px solid #CBD5E1', paddingTop: '4px', marginTop: '2px' }}>
                  <span>Total (GBP)</span>
                  <span style={{ color: primaryColor }}>£10,620.00</span>
                </div>
              </div>

              {/* Footer Bank Instructions & Thank you */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', borderTop: '1px solid #E2E8F0', paddingTop: '12px', fontSize: '8.5px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>Payment Details</div>
                  <div style={{ color: '#64748B' }}>
                    Bank: {bankName}<br />
                    Sort Code: {sortCode}<br />
                    Account No: {accountNumber}<br />
                    Account Name: {accountName}<br />
                    IBAN: {iban}
                  </div>
                </div>
                <div style={{ textAlign: 'right', color: '#64748B' }}>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>Thank you for your business.</div>
                  <div>If you have any questions, please contact us at support@yourcompany.co.uk or +44 20 7123 4567.</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
