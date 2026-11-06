'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  UploadSimple,
  ArrowsClockwise,
  Check,
  CheckCircle,
  X,
  Buildings,
  Eye
} from '@phosphor-icons/react';

export default function BrandingCompanyIdentityPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields
  const [legalName, setLegalName] = useState('Your Company Ltd');
  const [tradingName, setTradingName] = useState('Your Company');
  const [companyRegNumber, setCompanyRegNumber] = useState('12345678');
  const [vatTaxNumber, setVatTaxNumber] = useState('GB123456789');
  const [website, setWebsite] = useState('https://www.yourcompany.co.uk');
  const [supportEmail, setSupportEmail] = useState('support@yourcompany.co.uk');
  const [telephone, setTelephone] = useState('+44 20 7123 4567');
  const [registeredAddress, setRegisteredAddress] = useState(
    '123 Business Park\nInnovation Drive\nLondon\nSW1 1AA\nUnited Kingdom'
  );

  // Brand Colours
  const [primaryColour, setPrimaryColour] = useState('#0F766E');
  const [accentColour, setAccentColour] = useState('#14B8A6');
  const [secondaryColour, setSecondaryColour] = useState('#0F172A');

  // Preview Tabs
  const [previewTab, setPreviewTab] = useState<'invoice' | 'cover' | 'po' | 'quote'>('invoice');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRestoreDefaults = () => {
    setLegalName('Your Company Ltd');
    setTradingName('Your Company');
    setCompanyRegNumber('12345678');
    setVatTaxNumber('GB123456789');
    setWebsite('https://www.yourcompany.co.uk');
    setSupportEmail('support@yourcompany.co.uk');
    setTelephone('+44 20 7123 4567');
    setRegisteredAddress('123 Business Park\nInnovation Drive\nLondon\nSW1 1AA\nUnited Kingdom');
    setPrimaryColour('#0F766E');
    setAccentColour('#14B8A6');
    setSecondaryColour('#0F172A');
    showToast('Defaults restored');
  };

  return (
    <div style={{ padding: '24px 32px 48px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast Notification */}
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
            <span style={{ color: '#64748B' }}>Administration</span>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Branding & company identity</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Branding & company identity
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Configure your company branding and details. This information will be used across Finance, CRM, Documents and all TESSMA ONE modules.
          </p>
        </div>

        {/* Top Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => showToast('Opening document previews...')}
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
            Preview documents
          </button>

          <button 
            onClick={handleRestoreDefaults}
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
            <ArrowsClockwise size={16} />
            <span>Restore defaults</span>
          </button>

          <button 
            onClick={() => showToast('Changes saved successfully!')}
            style={{
              padding: '8px 20px',
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
            Save changes
          </button>
        </div>
      </div>

      {/* ── 2. TWO-COLUMN WORKSPACE: SETTINGS (LEFT) & LIVE PREVIEW (RIGHT) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(640px, 1.45fr) minmax(420px, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: COMPANY LOGO, COMPANY DETAILS & BRAND COLOURS ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Company logo */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Company logo
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 16px 0' }}>
              Upload your company logo. This will appear on invoices, documents and across the platform.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
              
              {/* Logo Preview Tile */}
              <div style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '24px',
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: '#009A96',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <div style={{ width: '14px', height: '14px', border: '2.5px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                    Your Company Ltd
                  </span>
                </div>

                <button 
                  onClick={() => showToast('Logo removed')}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#CBD5E1',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <X size={12} weight="bold" />
                </button>
              </div>

              {/* Upload Drop Zone */}
              <div 
                onClick={() => showToast('File picker opened')}
                style={{
                  border: '1.5px dashed #CBD5E1',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <UploadSimple size={24} color="#0284C7" />
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0284C7', marginTop: '6px' }}>
                  Upload logo
                </div>
                <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
                  PNG, JPG or SVG<br />Max 2MB
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Company details */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Company details
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 16px 0' }}>
              These details will be used across all modules and documents.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12.5px' }}>
              
              {/* Row 1: Legal name & Trading name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>
                    Legal name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    value={legalName} 
                    onChange={(e) => setLegalName(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>
                    Trading name
                  </label>
                  <input 
                    type="text" 
                    value={tradingName} 
                    onChange={(e) => setTradingName(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Row 2: Reg number & VAT / Tax number */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>
                    Company registration number
                  </label>
                  <input 
                    type="text" 
                    value={companyRegNumber} 
                    onChange={(e) => setCompanyRegNumber(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>
                    VAT / Tax number
                  </label>
                  <input 
                    type="text" 
                    value={vatTaxNumber} 
                    onChange={(e) => setVatTaxNumber(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Row 3: Website & Support email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>
                    Website
                  </label>
                  <input 
                    type="text" 
                    value={website} 
                    onChange={(e) => setWebsite(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>
                    Support email
                  </label>
                  <input 
                    type="text" 
                    value={supportEmail} 
                    onChange={(e) => setSupportEmail(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Row 4: Telephone */}
              <div>
                <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>
                  Telephone
                </label>
                <input 
                  type="text" 
                  value={telephone} 
                  onChange={(e) => setTelephone(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '13px' }}
                />
              </div>

              {/* Row 5: Registered address */}
              <div>
                <label style={{ display: 'block', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>
                  Registered address
                </label>
                <textarea 
                  value={registeredAddress} 
                  onChange={(e) => setRegisteredAddress(e.target.value)}
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    color: '#0F172A',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

            </div>
          </div>

          {/* Card 3: Brand colours */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Brand colours
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 16px 0' }}>
              These colours will be used for the platform theme and document headers.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              
              {/* Primary colour */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                  Primary colour
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  background: '#FFFFFF'
                }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: primaryColour }} />
                  <input 
                    type="text" 
                    value={primaryColour} 
                    onChange={(e) => setPrimaryColour(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '12.5px', color: '#0F172A' }}
                  />
                  <CaretDown size={12} color="#64748B" />
                </div>
              </div>

              {/* Accent colour */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                  Accent colour
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  background: '#FFFFFF'
                }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: accentColour }} />
                  <input 
                    type="text" 
                    value={accentColour} 
                    onChange={(e) => setAccentColour(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '12.5px', color: '#0F172A' }}
                  />
                  <CaretDown size={12} color="#64748B" />
                </div>
              </div>

              {/* Secondary colour */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                  Secondary colour
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  background: '#FFFFFF'
                }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: secondaryColour }} />
                  <input 
                    type="text" 
                    value={secondaryColour} 
                    onChange={(e) => setSecondaryColour(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '12.5px', color: '#0F172A' }}
                  />
                  <CaretDown size={12} color="#64748B" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ════ RIGHT COLUMN: LIVE DOCUMENT PREVIEW ════ */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
          
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Live document preview
          </h3>
          <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 16px 0' }}>
            This shows how your branding will appear on invoices and other documents.
          </p>

          {/* Sub-tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '20px'
          }}>
            {[
              { id: 'invoice', label: 'Invoice' },
              { id: 'cover', label: 'Document cover' },
              { id: 'po', label: 'Purchase order' },
              { id: 'quote', label: 'Quote' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPreviewTab(tab.id as any)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: previewTab === tab.id ? '2px solid #009A96' : '2px solid transparent',
                  padding: '8px 4px',
                  fontSize: '12px',
                  fontWeight: previewTab === tab.id ? 700 : 500,
                  color: previewTab === tab.id ? '#009A96' : '#64748B',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Document Sheet Container */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '24px 20px',
            fontSize: '9.5px',
            color: '#334155',
            lineHeight: 1.5,
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
          }}>
            
            {/* Header with Logo & Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '5px',
                    background: primaryColour,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <div style={{ width: '8px', height: '8px', border: '2px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                    {legalName}
                  </span>
                </div>
                <div style={{ fontSize: '8.5px', color: '#64748B', whiteSpace: 'pre-line' }}>
                  {registeredAddress}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
                  INVOICE
                </div>
                <div style={{ fontSize: '8.5px', color: '#64748B', marginTop: '2px' }}>Invoice No: <span style={{ color: '#0F172A', fontWeight: 600 }}>INV-2025-001</span></div>
                <div style={{ fontSize: '8.5px', color: '#64748B' }}>Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>01 Apr 2025</span></div>
                <div style={{ fontSize: '8.5px', color: '#64748B' }}>Due Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>30 Apr 2025</span></div>
              </div>
            </div>

            {/* Bill To & Our Details Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginBottom: '20px', fontSize: '9px' }}>
              <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '6px' }}>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>Bill To</div>
                <div style={{ fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>ABC Construction Ltd</div>
                <div style={{ color: '#64748B' }}>45 High Street<br />Manchester<br />M1 2AB<br />United Kingdom</div>
              </div>

              <div style={{ background: '#ECFDF5', padding: '10px 12px', borderRadius: '6px' }}>
                <div style={{ fontWeight: 700, color: '#065F46' }}>Our Details</div>
                <div style={{ fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>{legalName}</div>
                <div style={{ color: '#64748B' }}>VAT No: {vatTaxNumber}<br />Company No: {companyRegNumber}<br />{supportEmail}<br />{telephone}<br />{website}</div>
              </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #CBD5E1', textAlign: 'left', color: '#64748B' }}>
                  <th style={{ padding: '6px 0' }}>Description</th>
                  <th style={{ padding: '6px 0', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '6px 0', textAlign: 'right' }}>Unit Price</th>
                  <th style={{ padding: '6px 0', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '6px 0', color: '#0F172A', fontWeight: 600 }}>Project Management Services</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>1</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>£1,200.00</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£1,200.00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '6px 0', color: '#0F172A', fontWeight: 600 }}>Consultancy Services</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>£350.00</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£1,050.00</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', color: '#0F172A', fontWeight: 600 }}>Software Licence (Annual)</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>1</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>£600.00</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£600.00</td>
                </tr>
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end', fontSize: '9px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', color: '#64748B' }}>
                <span>Subtotal</span>
                <span>£2,850.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', color: '#64748B' }}>
                <span>VAT (20%)</span>
                <span>£570.00</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '130px',
                fontWeight: 800,
                color: '#0F172A',
                fontSize: '11px',
                background: '#ECFDF5',
                padding: '4px 6px',
                borderRadius: '4px',
                marginTop: '3px'
              }}>
                <span>Total</span>
                <span>£3,420.00</span>
              </div>
            </div>

            {/* Payment Instructions & Footer */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '10px', fontSize: '8px', color: '#64748B' }}>
              <div style={{ fontWeight: 700, color: '#0F172A' }}>Payment Instructions</div>
              <div>Please make payment to our bank account using the invoice number as reference.</div>
              <div style={{ marginTop: '4px' }}>
                Bank: Barclays Bank PLC<br />
                Sort Code: 20-00-00<br />
                Account No: 12345678<br />
                Account Name: {legalName}
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '7.5px', color: '#94A3B8', marginTop: '14px', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
              <div style={{ fontWeight: 600, color: '#475569' }}>Thank you for your business.</div>
              <div>{legalName} | Registered in England No. {companyRegNumber} | VAT No. {vatTaxNumber}</div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
