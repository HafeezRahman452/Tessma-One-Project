'use client';

import React, { useState, useRef } from 'react';
import {
  Building2,
  Palette,
  Layout,
  Type,
  MapPin,
  Landmark,
  ShieldCheck,
  Mail,
  FileCode,
  Upload,
  X,
  Check,
  ChevronDown,
  ExternalLink,
  Eye,
  FileCheck,
  Maximize2,
  Printer,
  Download,
  Share2
} from 'lucide-react';

export default function DocumentBrandingPage() {
  // Tab for live preview
  const [activePreviewDoc, setActivePreviewDoc] = useState<'Invoice' | 'Credit note' | 'Statement'>('Invoice');

  // Company identity state
  const [companyName, setCompanyName] = useState('Your Company Ltd');
  const [tradingName, setTradingName] = useState('TESSMA ONE');
  const [showTradingName, setShowTradingName] = useState(true);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Brand colours state
  const [primaryColour, setPrimaryColour] = useState('#0F766E');
  const [secondaryColour, setSecondaryColour] = useState('#1E293B');
  const [accentColour, setAccentColour] = useState('#14B8A6');

  // Header layout
  const [headerLayout, setHeaderLayout] = useState<'left' | 'centre' | 'right'>('left');

  // Typography
  const [documentFont, setDocumentFont] = useState('Inter (Recommended)');

  // Dynamic CSS font-family mapper
  const getSelectedFontFamily = () => {
    if (documentFont.startsWith('Roboto')) return 'Roboto, -apple-system, sans-serif';
    if (documentFont.startsWith('Open Sans')) return '"Open Sans", -apple-system, sans-serif';
    if (documentFont.startsWith('Lato')) return 'Lato, -apple-system, sans-serif';
    if (documentFont.startsWith('Georgia')) return 'Georgia, serif';
    if (documentFont.startsWith('Courier')) return '"Courier New", monospace';
    return 'Inter, -apple-system, sans-serif';
  };

  // Company & contact details
  const [addressLine1, setAddressLine1] = useState('123 Business Park');
  const [addressLine2, setAddressLine2] = useState('Innovation Drive');
  const [townCity, setTownCity] = useState('London');
  const [postcode, setPostcode] = useState('SW1 1AA');
  const [country, setCountry] = useState('United Kingdom');
  const [phone, setPhone] = useState('+44 20 7123 4567');
  const [email, setEmail] = useState('accounts@yourcompany.co.uk');
  const [website, setWebsite] = useState('www.yourcompany.co.uk');

  // Bank / payment instructions
  const [bankName, setBankName] = useState('Barclays Bank PLC');
  const [sortCode, setSortCode] = useState('20-00-00');
  const [accountNumber, setAccountNumber] = useState('12345678');
  const [accountName, setAccountName] = useState('Your Company Ltd');
  const [iban, setIban] = useState('GB29 BARC 2000 0012 3456 78');

  // Legal & registration details
  const [regCompanyName, setRegCompanyName] = useState('Your Company Ltd');
  const [companyRegNumber, setCompanyRegNumber] = useState('12345678');
  const [vatNumber, setVatNumber] = useState('GB123456789');

  // Email signature defaults
  const [defaultSignoff, setDefaultSignoff] = useState('Kind regards,');
  const [signName, setSignName] = useState('John Doe');
  const [signTitle, setSignTitle] = useState('Managing Director');

  // Document defaults
  const [defaultTemplate, setDefaultTemplate] = useState('TESSMA Standard (Current)');
  const [invoiceTemplate, setInvoiceTemplate] = useState('TESSMA Standard');
  const [creditNoteTemplate, setCreditNoteTemplate] = useState('TESSMA Standard');
  const [statementTemplate, setStatementTemplate] = useState('TESSMA Statement');
  const [includePaymentInstructions, setIncludePaymentInstructions] = useState(true);

  // Zoom level for document viewer
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Load saved branding from localStorage on initial load
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('tessma_document_branding');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.companyName !== undefined) setCompanyName(data.companyName);
        if (data.tradingName !== undefined) setTradingName(data.tradingName);
        if (data.showTradingName !== undefined) setShowTradingName(data.showTradingName);
        if (data.customLogo !== undefined) setCustomLogo(data.customLogo);
        if (data.primaryColour !== undefined) setPrimaryColour(data.primaryColour);
        if (data.secondaryColour !== undefined) setSecondaryColour(data.secondaryColour);
        if (data.accentColour !== undefined) setAccentColour(data.accentColour);
        if (data.headerLayout !== undefined) setHeaderLayout(data.headerLayout);
        if (data.documentFont !== undefined) setDocumentFont(data.documentFont);
        if (data.addressLine1 !== undefined) setAddressLine1(data.addressLine1);
        if (data.addressLine2 !== undefined) setAddressLine2(data.addressLine2);
        if (data.townCity !== undefined) setTownCity(data.townCity);
        if (data.postcode !== undefined) setPostcode(data.postcode);
        if (data.country !== undefined) setCountry(data.country);
        if (data.phone !== undefined) setPhone(data.phone);
        if (data.email !== undefined) setEmail(data.email);
        if (data.website !== undefined) setWebsite(data.website);
        if (data.bankName !== undefined) setBankName(data.bankName);
        if (data.sortCode !== undefined) setSortCode(data.sortCode);
        if (data.accountNumber !== undefined) setAccountNumber(data.accountNumber);
        if (data.accountName !== undefined) setAccountName(data.accountName);
        if (data.iban !== undefined) setIban(data.iban);
        if (data.regCompanyName !== undefined) setRegCompanyName(data.regCompanyName);
        if (data.companyRegNumber !== undefined) setCompanyRegNumber(data.companyRegNumber);
        if (data.vatNumber !== undefined) setVatNumber(data.vatNumber);
        if (data.defaultSignoff !== undefined) setDefaultSignoff(data.defaultSignoff);
        if (data.defaultTemplate !== undefined) setDefaultTemplate(data.defaultTemplate);
        if (data.invoiceTemplate !== undefined) setInvoiceTemplate(data.invoiceTemplate);
        if (data.creditNoteTemplate !== undefined) setCreditNoteTemplate(data.creditNoteTemplate);
        if (data.statementTemplate !== undefined) setStatementTemplate(data.statementTemplate);
        if (data.includePaymentInstructions !== undefined) setIncludePaymentInstructions(data.includePaymentInstructions);
      }
    } catch (err) {
      console.error('Error loading branding:', err);
    }
  }, []);

  // Save branding function
  const handleSaveBranding = (isPublish = false) => {
    try {
      const dataToSave = {
        companyName,
        tradingName,
        showTradingName,
        customLogo,
        primaryColour,
        secondaryColour,
        accentColour,
        headerLayout,
        documentFont,
        addressLine1,
        addressLine2,
        townCity,
        postcode,
        country,
        phone,
        email,
        website,
        bankName,
        sortCode,
        accountNumber,
        accountName,
        iban,
        regCompanyName,
        companyRegNumber,
        vatNumber,
        defaultSignoff,
        defaultTemplate,
        invoiceTemplate,
        creditNoteTemplate,
        statementTemplate,
        includePaymentInstructions,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('tessma_document_branding', JSON.stringify(dataToSave));
      setShowToast(isPublish ? '✓ Branding published and saved successfully!' : '✓ Draft saved successfully!');
      setTimeout(() => setShowToast(null), 3000);
    } catch (err) {
      console.error('Error saving branding:', err);
      setShowToast('Error saving branding to storage');
      setTimeout(() => setShowToast(null), 3000);
    }
  };


  // Logo file upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setCustomLogo(evt.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 10000,
          animation: 'fadeIn 0.2s ease'
        }}>
          <span>{showToast}</span>
        </div>
      )}

      {/* ── Top Header Title & Actions ────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>
            Branding &amp; document style
          </h1>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
            Control how invoices, credit notes and statements appear to your customers. Set your logo, colours, company details and default templates.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            onClick={() => handleSaveBranding(false)}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'all 0.15s ease'
            }}
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={() => setShowFullPreviewModal(true)}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
          >
            <Eye size={15} /> Preview
          </button>
          <button
            type="button"
            onClick={() => handleSaveBranding(true)}
            style={{
              background: '#007D7D',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontSize: 13,
              fontWeight: 600,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 1px 3px rgba(0, 125, 125, 0.3)',
              transition: 'all 0.15s ease'
            }}
          >
            <FileCheck size={15} /> Publish branding
          </button>
        </div>
      </div>

      {/* ── Main Workspace: Left Settings (60%) + Right Live Preview (40%) ─────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(420px, 1fr)', gap: 20, alignItems: 'start' }}>
        
        {/* ── LEFT COLUMN: BRANDING CONFIGURATION CARDS ────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          
          {/* Row 1: Company Identity (Left) + Brand Colours (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
            
            {/* 1. Company Identity */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={13} />
                </div>
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Company identity</h3>
              </div>
              <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 14px 30px' }}>Your logo and company name will appear on all documents.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 14 }}>
                {/* Logo Box */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Company logo</div>
                  
                  {/* Hidden native file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleLogoUpload}
                  />

                  <div style={{
                    border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 10px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: '#f8fafc', position: 'relative', minHeight: '80px'
                  }}>
                    {customLogo && (
                      <button
                        type="button"
                        onClick={() => setCustomLogo(null)}
                        title="Remove uploaded logo"
                        style={{ position: 'absolute', top: 5, right: 5, background: '#94a3b8', border: 'none', borderRadius: '50%', width: 16, height: 16, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
                      >
                        <X size={11} />
                      </button>
                    )}

                    {customLogo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={customLogo} alt="Uploaded logo" style={{ maxWidth: '100%', maxHeight: '55px', objectFit: 'contain' }} />
                    ) : (
                      /* Default Logo SVG */
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 26, height: 26, background: primaryColour, clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 900 }}>
                          T
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{tradingName || 'TESSMA'}</span>
                          <span style={{ fontSize: 8, color: accentColour, fontWeight: 700 }}>ONE</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 4 }}>Recommended: 300 x 100px, PNG or SVG</div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      marginTop: 6, width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 6,
                      padding: '5px 8px', fontSize: 11, fontWeight: 600, color: '#334155', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                    }}
                  >
                    <Upload size={12} /> Change logo
                  </button>
                </div>

                {/* Company Name Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
                      Company name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
                      Trading name (optional)
                    </label>
                    <input
                      type="text"
                      value={tradingName}
                      onChange={(e) => setTradingName(e.target.value)}
                      style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* Toggle: Show trading name on documents */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 2 }}>
                    <div
                      onClick={() => setShowTradingName(!showTradingName)}
                      style={{
                        width: 32, height: 18, borderRadius: 10,
                        background: showTradingName ? '#007D7D' : '#cbd5e1',
                        padding: 2, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0
                      }}
                    >
                      <div style={{
                        width: 14, height: 14, borderRadius: '50%', background: '#ffffff',
                        position: 'absolute', top: 2, left: showTradingName ? 16 : 2, transition: 'left 0.2s'
                      }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>Show trading name on documents</div>
                      <div style={{ fontSize: 10, color: '#94a3b8', lineHeight: 1.3 }}>Your trading name will appear in the document header below your company name.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Brand Colours */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Palette size={13} />
                </div>
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Brand colours</h3>
              </div>
              <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 14px 30px' }}>These colours will be used across your documents.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Primary Colour */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11.5, color: '#475569', fontWeight: 500 }}>Primary colour</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 8px', background: '#ffffff' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: primaryColour, border: '1px solid rgba(0,0,0,0.1)' }} />
                    <input
                      type="text"
                      value={primaryColour}
                      onChange={(e) => setPrimaryColour(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: 11.5, width: 62, fontFamily: 'monospace', color: '#0f172a' }}
                    />
                    <X size={12} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                </div>

                {/* Secondary Colour */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11.5, color: '#475569', fontWeight: 500 }}>Secondary colour</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 8px', background: '#ffffff' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: secondaryColour, border: '1px solid rgba(0,0,0,0.1)' }} />
                    <input
                      type="text"
                      value={secondaryColour}
                      onChange={(e) => setSecondaryColour(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: 11.5, width: 62, fontFamily: 'monospace', color: '#0f172a' }}
                    />
                    <X size={12} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                </div>

                {/* Accent Colour */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11.5, color: '#475569', fontWeight: 500 }}>Accent colour</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 8px', background: '#ffffff' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: accentColour, border: '1px solid rgba(0,0,0,0.1)' }} />
                    <input
                      type="text"
                      value={accentColour}
                      onChange={(e) => setAccentColour(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: 11.5, width: 62, fontFamily: 'monospace', color: '#0f172a' }}
                    />
                    <X size={12} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Document header layout (Left) + Typography (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
            
            {/* Document Header Layout */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layout size={13} />
                </div>
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Document header layout</h3>
              </div>
              <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 14px 30px' }}>Choose how your logo and company details appear.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {/* Option 1: Logo left / Details right */}
                <div
                  onClick={() => setHeaderLayout('left')}
                  style={{
                    border: headerLayout === 'left' ? '1.5px solid #007D7D' : '1px solid #e2e8f0',
                    borderRadius: 8, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    cursor: 'pointer', background: headerLayout === 'left' ? '#f0fdfa' : '#ffffff', position: 'relative'
                  }}
                >
                  {headerLayout === 'left' && (
                    <div style={{ position: 'absolute', top: 5, right: 5, width: 14, height: 14, borderRadius: '50%', background: '#007D7D', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={9} />
                    </div>
                  )}
                  {/* Schematic preview */}
                  <div style={{ width: '100%', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px', borderBottom: '1px dashed #cbd5e1', marginBottom: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: '#0F766E' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                      <div style={{ width: 24, height: 3, background: '#94a3b8', borderRadius: 1 }} />
                      <div style={{ width: 18, height: 3, background: '#cbd5e1', borderRadius: 1 }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: '#0f172a', textAlign: 'center', lineHeight: 1.2 }}>Logo left<br /><span style={{ fontSize: 9.5, color: '#64748b', fontWeight: 400 }}>Details right</span></span>
                </div>

                {/* Option 2: Logo centred / Details below */}
                <div
                  onClick={() => setHeaderLayout('centre')}
                  style={{
                    border: headerLayout === 'centre' ? '1.5px solid #007D7D' : '1px solid #e2e8f0',
                    borderRadius: 8, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    cursor: 'pointer', background: headerLayout === 'centre' ? '#f0fdfa' : '#ffffff', position: 'relative'
                  }}
                >
                  <div style={{ width: '100%', height: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, borderBottom: '1px dashed #cbd5e1', marginBottom: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: '#0F766E' }} />
                    <div style={{ width: 20, height: 2.5, background: '#cbd5e1', borderRadius: 1 }} />
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: '#0f172a', textAlign: 'center', lineHeight: 1.2 }}>Logo centred<br /><span style={{ fontSize: 9.5, color: '#64748b', fontWeight: 400 }}>Details below</span></span>
                </div>

                {/* Option 3: Logo right / Details left */}
                <div
                  onClick={() => setHeaderLayout('right')}
                  style={{
                    border: headerLayout === 'right' ? '1.5px solid #007D7D' : '1px solid #e2e8f0',
                    borderRadius: 8, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    cursor: 'pointer', background: headerLayout === 'right' ? '#f0fdfa' : '#ffffff', position: 'relative'
                  }}
                >
                  <div style={{ width: '100%', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px', borderBottom: '1px dashed #cbd5e1', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ width: 24, height: 3, background: '#94a3b8', borderRadius: 1 }} />
                      <div style={{ width: 18, height: 3, background: '#cbd5e1', borderRadius: 1 }} />
                    </div>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: '#0F766E' }} />
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: '#0f172a', textAlign: 'center', lineHeight: 1.2 }}>Logo right<br /><span style={{ fontSize: 9.5, color: '#64748b', fontWeight: 400 }}>Details left</span></span>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Type size={13} />
                </div>
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Typography</h3>
              </div>
              <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 14px 30px' }}>Choose a font style for your documents.</p>

              <div>
                <label style={{ fontSize: 11.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Document font
                </label>
                <div style={{ position: 'relative', marginBottom: 10 }}>
                  <select
                    value={documentFont}
                    onChange={(e) => setDocumentFont(e.target.value)}
                    style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 30px 8px 12px', fontSize: '13px', color: '#0F172A', background: '#FFFFFF', appearance: 'none', cursor: 'pointer', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}
                  >
                    <option value="Inter (Recommended)">Inter (Recommended)</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Georgia">Georgia (Serif)</option>
                    <option value="Courier">Courier (Monospace)</option>
                  </select>
                  <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>

                {/* Font sample box with live dynamic font-family */}
                <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 6, padding: '8px 12px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', letterSpacing: 0.5, fontFamily: getSelectedFontFamily() }}>
                    AaBbCcDd123
                  </div>
                  <div style={{ fontSize: 10.5, color: '#64748b', marginTop: 2, fontFamily: getSelectedFontFamily() }}>
                    The quick brown fox jumps over the lazy dog.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row 3: Company & contact details (Left) + Bank / payment instructions (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
            
            {/* Company & contact details */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={13} />
                </div>
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Company &amp; contact details</h3>
              </div>
              <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 14px 30px' }}>These details appear in your document header and footer.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Line 1, Line 2, Town in 3 columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>
                      Address line 1 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Address line 2</label>
                    <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Town / City <span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="text" value={townCity} onChange={(e) => setTownCity(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                </div>

                {/* Postcode, Country, Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Postcode <span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Country <span style={{ color: '#ef4444' }}>*</span></label>
                    <div style={{ position: 'relative' }}>
                      <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 30px 8px 12px', fontSize: '13px', color: '#0F172A', background: '#FFFFFF', appearance: 'none', cursor: 'pointer', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Ireland</option>
                      </select>
                      <ChevronDown size={12} color="#64748b" style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Phone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                </div>

                {/* Email, Website */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Website</label>
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bank / payment instructions */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Landmark size={13} />
                </div>
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Bank / payment instructions</h3>
              </div>
              <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 14px 30px' }}>These details appear at the bottom of your documents.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Bank name, Sort code, Account number */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Bank name</label>
                    <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Sort code</label>
                    <input type="text" value={sortCode} onChange={(e) => setSortCode(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Account number</label>
                    <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                </div>

                {/* Account name, IBAN */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Account name</label>
                    <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>IBAN (optional)</label>
                    <input type="text" value={iban} onChange={(e) => setIban(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          </div>

        {/* ── RIGHT COLUMN: LIVE DOCUMENT PREVIEW ──────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={13} />
            </div>
            <div>
              <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Live document preview</h3>
              <div style={{ fontSize: 11, color: '#64748b' }}>See how your documents will look to your customers.</div>
            </div>
          </div>

          {/* Document Type Switcher Tabs (Invoice / Credit note / Statement) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 3 }}>
            {(['Invoice', 'Credit note', 'Statement'] as const).map((docType) => {
              const active = activePreviewDoc === docType;
              return (
                <button
                  key={docType}
                  onClick={() => setActivePreviewDoc(docType)}
                  style={{
                    padding: '6px 0',
                    border: 'none',
                    borderRadius: 6,
                    background: active ? '#f0fdfa' : 'transparent',
                    color: active ? '#007D7D' : '#64748b',
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    boxShadow: active ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {docType}
                </button>
              );
            })}
          </div>

          {/* PDF-like Document Viewer Container */}
          <div style={{ background: '#2d3748', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            
            {/* Viewer Top Toolbar */}
            <div style={{
              background: '#1e293b', padding: '6px 12px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', color: '#94a3b8', fontSize: 11, borderBottom: '1px solid #334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ cursor: 'pointer' }}>☰</span>
                <span>1 / 1</span>
                <span style={{ cursor: 'pointer' }} onClick={() => setZoomLevel(z => Math.max(70, z - 10))}>−</span>
                <span style={{ cursor: 'pointer' }} onClick={() => setZoomLevel(z => Math.min(130, z + 10))}>+</span>
                <span title="Full page preview" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowFullPreviewModal(true)}><Maximize2 size={11} /></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Download size={13} style={{ cursor: 'pointer' }} />
                <Printer size={13} style={{ cursor: 'pointer' }} />
                <Share2 size={13} style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* Document Sheet (White A4 Representation) */}
            <div style={{ padding: '24px 20px', display: 'flex', justifyContent: 'center', background: '#334155', minHeight: '620px', overflowX: 'auto' }}>
              <div style={{
                background: '#ffffff',
                width: '100%',
                maxWidth: '430px',
                borderRadius: 4,
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                fontSize: 8.5,
                color: '#334155',
                fontFamily: getSelectedFontFamily(),
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease'
              }}>
                
                {/* Header depending on layout */}
                <div style={{
                  display: 'flex',
                  justifyContent: headerLayout === 'centre' ? 'center' : 'space-between',
                  alignItems: 'flex-start',
                  flexDirection: headerLayout === 'right' ? 'row-reverse' : 'row',
                  borderBottom: `2px solid ${primaryColour}`,
                  paddingBottom: 12,
                  marginBottom: 12
                }}>
                  {/* Logo + Brand */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {customLogo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={customLogo} alt="Invoice Logo" style={{ maxHeight: '34px', maxWidth: '120px', objectFit: 'contain' }} />
                    ) : (
                      <>
                        <div style={{ width: 28, height: 28, background: primaryColour, clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 900 }}>
                          T
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 900, color: '#0f172a', letterSpacing: 0.5 }}>{tradingName || 'TESSMA'}</div>
                          <div style={{ fontSize: 7, color: accentColour, fontWeight: 700 }}>ONE</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Document Type Title */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', letterSpacing: 1 }}>{activePreviewDoc.toUpperCase()}</div>
                  </div>
                </div>

                {/* Company Address + Meta Data */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10, marginBottom: 12, fontSize: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 8.5 }}>{companyName}</div>
                    <div style={{ color: '#64748b', lineHeight: 1.4 }}>
                      {addressLine1}<br />
                      {addressLine2}<br />
                      {townCity} {postcode}<br />
                      {country}<br />
                      VAT No: {vatNumber}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div><span style={{ color: '#64748b' }}>Invoice No:</span> <span style={{ fontWeight: 700, color: '#0f172a' }}>INV-2025-0423</span></div>
                    <div><span style={{ color: '#64748b' }}>Issue Date:</span> <span style={{ fontWeight: 600 }}>15 Apr 2025</span></div>
                    <div><span style={{ color: '#64748b' }}>Due Date:</span> <span style={{ fontWeight: 600 }}>15 May 2025</span></div>
                    <div><span style={{ color: '#64748b' }}>Service Period:</span> <span style={{ fontWeight: 600 }}>01 Apr 2025 – 30 Apr 2025</span></div>
                    <div><span style={{ color: '#64748b' }}>Reference:</span> <span style={{ fontWeight: 600 }}>PO-44881</span></div>
                  </div>
                </div>

                {/* Bill To & Contact Block */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, background: '#f8fafc', padding: '8px 10px', borderRadius: 4, marginBottom: 12, fontSize: 7.5 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: primaryColour, textTransform: 'uppercase', marginBottom: 2 }}>Bill To:</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>ABC Ltd</div>
                    <div style={{ color: '#64748b', lineHeight: 1.3 }}>
                      123 Business Park<br />Innovation Drive<br />London SW1 1AA<br />VAT No: GB987654321
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: primaryColour, textTransform: 'uppercase', marginBottom: 2 }}>Contact:</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Sarah Clarke</div>
                    <div style={{ color: '#64748b', lineHeight: 1.3 }}>
                      Finance Manager<br />sarah.clarke@abc-ltd.co.uk<br />+44 20 7123 4567
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1.8fr 0.4fr 0.6fr 0.4fr 0.8fr',
                    background: primaryColour, color: '#ffffff', padding: '4px 6px',
                    fontWeight: 700, fontSize: 7.5, borderRadius: '3px 3px 0 0'
                  }}>
                    <span>Description</span>
                    <span style={{ textAlign: 'right' }}>Qty</span>
                    <span style={{ textAlign: 'right' }}>Unit Price</span>
                    <span style={{ textAlign: 'right' }}>VAT</span>
                    <span style={{ textAlign: 'right' }}>Amount (GBP)</span>
                  </div>

                  {[
                    { desc: 'Website Design', qty: 1, price: '£4,500.00', vat: '20%', amt: '£4,500.00' },
                    { desc: 'Website Development', qty: 20, price: '£120.00', vat: '20%', amt: '£2,400.00' },
                    { desc: 'Project Management', qty: 10, price: '£75.00', vat: '20%', amt: '£750.00' },
                    { desc: 'Consultancy Services', qty: 8, price: '£150.00', vat: '20%', amt: '£1,200.00' },
                  ].map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'grid', gridTemplateColumns: '1.8fr 0.4fr 0.6fr 0.4fr 0.8fr',
                        padding: '3px 6px', fontSize: 7.5, borderBottom: '1px solid #f1f5f9',
                        background: i % 2 === 0 ? '#ffffff' : '#f8fafc'
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{row.desc}</span>
                      <span style={{ textAlign: 'right', color: '#64748b' }}>{row.qty}</span>
                      <span style={{ textAlign: 'right', color: '#64748b' }}>{row.price}</span>
                      <span style={{ textAlign: 'right', color: '#64748b' }}>{row.vat}</span>
                      <span style={{ textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>{row.amt}</span>
                    </div>
                  ))}
                </div>

                {/* Subtotals & Grand Total */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, marginBottom: 12, fontSize: 7.5 }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ color: '#64748b' }}>Subtotal</span>
                    <span style={{ fontWeight: 600, minWidth: 60, textAlign: 'right' }}>£8,850.00</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ color: '#64748b' }}>VAT (20%)</span>
                    <span style={{ fontWeight: 600, minWidth: 60, textAlign: 'right' }}>£1,770.00</span>
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', width: '100%',
                    background: '#f0fdfa', border: `1px solid ${accentColour}40`,
                    padding: '4px 6px', borderRadius: 4, marginTop: 4, fontWeight: 800, fontSize: 8.5
                  }}>
                    <span style={{ color: primaryColour }}>Total (GBP)</span>
                    <span style={{ color: '#0f172a' }}>£10,620.00</span>
                  </div>
                </div>

                {/* Payment Instructions & Thank You Footer */}
                {includePaymentInstructions && (
                  <div style={{
                    marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: 8,
                    display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10, fontSize: 6.5, color: '#64748b'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, color: primaryColour, textTransform: 'uppercase', marginBottom: 2 }}>Payment Details</div>
                      <div>Bank: {bankName}</div>
                      <div>Sort Code: {sortCode}</div>
                      <div>Account No: {accountNumber}</div>
                      <div>Account Name: {accountName}</div>
                      <div>IBAN: {iban}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>Thank you for your business.</div>
                      <div>If you have any questions, please contact</div>
                      <div>us at {email}</div>
                      <div>or {phone}.</div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ── FULL WIDTH BOTTOM SECTION: 3 CARDS (Legal, Email Signature, Document Defaults) ── */}
      <div style={{ marginTop: 10 }}>
        {/* Row 4: Legal & registration details + Email signature defaults + Document defaults */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 16 }}>
            
            {/* Legal & registration details */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={13} />
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', margin: 0 }}>Legal &amp; registration details</h3>
              </div>
              <p style={{ fontSize: 10.5, color: '#64748b', margin: '0 0 12px 30px' }}>These details may be shown in your document footer.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Registered company name</label>
                  <input type="text" value={regCompanyName} onChange={(e) => setRegCompanyName(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>Company reg. number</label>
                    <input type="text" value={companyRegNumber} onChange={(e) => setCompanyRegNumber(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>VAT registration number</label>
                    <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0F172A', outline: 'none', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Email signature defaults */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={13} />
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', margin: 0 }}>Email signature defaults</h3>
              </div>
              <p style={{ fontSize: 10.5, color: '#64748b', margin: '0 0 12px 30px' }}>Used when sending invoices, credit notes and statements.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>Default sign-off</span>
                  <input type="text" value={defaultSignoff} onChange={(e) => setDefaultSignoff(e.target.value)} style={{ width: '100px', border: '1px solid #e2e8f0', borderRadius: 6, padding: '3px 6px', fontSize: 11, color: '#0f172a', outline: 'none' }} />
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 6, padding: '8px 10px', fontSize: 10, color: '#64748b', lineHeight: 1.4 }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{signName}</div>
                  <div>{signTitle}</div>
                  <div>{companyName}</div>
                  <div style={{ color: '#007D7D' }}>{phone} | {website}</div>
                </div>
              </div>
            </div>

            {/* Document defaults */}
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCode size={13} />
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', margin: 0 }}>Document defaults</h3>
              </div>
              <p style={{ fontSize: 10.5, color: '#64748b', margin: '0 0 12px 30px' }}>Choose the default template and settings for each document type.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 600, color: '#64748b' }}>Default template</label>
                    <select value={defaultTemplate} onChange={(e) => setDefaultTemplate(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 30px 8px 12px', fontSize: '13px', color: '#0F172A', background: '#FFFFFF', appearance: 'none', cursor: 'pointer', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
                      <option>TESSMA Standard (Current)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 600, color: '#64748b' }}>Invoice template</label>
                    <select value={invoiceTemplate} onChange={(e) => setInvoiceTemplate(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 30px 8px 12px', fontSize: '13px', color: '#0F172A', background: '#FFFFFF', appearance: 'none', cursor: 'pointer', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
                      <option>TESSMA Standard</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 600, color: '#64748b' }}>Credit note template</label>
                    <select value={creditNoteTemplate} onChange={(e) => setCreditNoteTemplate(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 30px 8px 12px', fontSize: '13px', color: '#0F172A', background: '#FFFFFF', appearance: 'none', cursor: 'pointer', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
                      <option>TESSMA Standard</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 600, color: '#64748b' }}>Statement template</label>
                    <select value={statementTemplate} onChange={(e) => setStatementTemplate(e.target.value)} style={{ width: '100%', height: '38px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 30px 8px 12px', fontSize: '13px', color: '#0F172A', background: '#FFFFFF', appearance: 'none', cursor: 'pointer', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
                      <option>TESSMA Statement</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <input
                    type="checkbox"
                    id="inclPay"
                    checked={includePaymentInstructions}
                    onChange={(e) => setIncludePaymentInstructions(e.target.checked)}
                    style={{ accentColor: '#007D7D' }}
                  />
                  <label htmlFor="inclPay" style={{ fontSize: 10.5, color: '#334155' }}>
                    Include payment instructions by default
                  </label>
                </div>
              </div>
            </div>

          </div>
      </div>

    
      {/* ── FULL PAGE INVOICE PREVIEW MODAL ───────────────────────── */}
      {showFullPreviewModal && (
        <div
          onClick={() => setShowFullPreviewModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24
          }}
        >
          {/* Modal Header Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '650px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
              color: '#ffffff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Full Document Preview – {activePreviewDoc}</span>
              <span style={{ background: '#007D7D', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                {documentFont}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => window.print()}
                style={{ background: '#334155', border: 'none', borderRadius: 6, padding: '6px 12px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Printer size={14} /> Print
              </button>
              <button
                onClick={() => setShowFullPreviewModal(false)}
                style={{ background: '#ef4444', border: 'none', borderRadius: 6, padding: '6px 12px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <X size={14} /> Close
              </button>
            </div>
          </div>

          {/* Modal Document Body */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              width: '100%',
              maxWidth: '650px',
              maxHeight: '88vh',
              overflowY: 'auto',
              borderRadius: 8,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              padding: '36px 32px',
              fontFamily: getSelectedFontFamily(),
              color: '#334155',
              fontSize: 11
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: headerLayout === 'centre' ? 'center' : 'space-between',
              alignItems: 'flex-start',
              flexDirection: headerLayout === 'right' ? 'row-reverse' : 'row',
              borderBottom: `3px solid ${primaryColour}`,
              paddingBottom: 16,
              marginBottom: 18
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {customLogo ? (
                  <img src={customLogo} alt="Invoice Logo" style={{ maxHeight: '48px', maxWidth: '160px', objectFit: 'contain' }} />
                ) : (
                  <>
                    <div style={{ width: 38, height: 38, background: primaryColour, clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15, fontWeight: 900 }}>
                      T
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', letterSpacing: 0.5 }}>{tradingName || 'TESSMA'}</div>
                      <div style={{ fontSize: 9, color: accentColour, fontWeight: 700 }}>ONE</div>
                    </div>
                  </>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', letterSpacing: 2 }}>{activePreviewDoc.toUpperCase()}</div>
              </div>
            </div>

            {/* Address & Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, marginBottom: 18, fontSize: 10.5 }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 12, marginBottom: 4 }}>{companyName}</div>
                <div style={{ color: '#64748b', lineHeight: 1.5 }}>
                  {addressLine1}<br />
                  {addressLine2}<br />
                  {townCity} {postcode}<br />
                  {country}<br />
                  VAT No: {vatNumber}
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div><span style={{ color: '#64748b' }}>Invoice No:</span> <span style={{ fontWeight: 700, color: '#0f172a' }}>INV-2025-0423</span></div>
                <div><span style={{ color: '#64748b' }}>Issue Date:</span> <span style={{ fontWeight: 600 }}>15 Apr 2025</span></div>
                <div><span style={{ color: '#64748b' }}>Due Date:</span> <span style={{ fontWeight: 600 }}>15 May 2025</span></div>
                <div><span style={{ color: '#64748b' }}>Service Period:</span> <span style={{ fontWeight: 600 }}>01 Apr 2025 – 30 Apr 2025</span></div>
                <div><span style={{ color: '#64748b' }}>Reference:</span> <span style={{ fontWeight: 600 }}>PO-44881</span></div>
              </div>
            </div>

            {/* Bill To & Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, background: '#f8fafc', padding: '12px 14px', borderRadius: 6, marginBottom: 18, fontSize: 10 }}>
              <div>
                <div style={{ fontWeight: 700, color: primaryColour, textTransform: 'uppercase', marginBottom: 4 }}>Bill To:</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 11 }}>ABC Ltd</div>
                <div style={{ color: '#64748b', lineHeight: 1.4 }}>
                  123 Business Park<br />Innovation Drive<br />London SW1 1AA<br />VAT No: GB987654321
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: primaryColour, textTransform: 'uppercase', marginBottom: 4 }}>Contact:</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 11 }}>Sarah Clarke</div>
                <div style={{ color: '#64748b', lineHeight: 1.4 }}>
                  Finance Manager<br />sarah.clarke@abc-ltd.co.uk<br />+44 20 7123 4567
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ marginBottom: 18 }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 0.4fr 0.8fr 0.5fr 1fr',
                background: primaryColour, color: '#ffffff', padding: '8px 12px',
                fontWeight: 700, fontSize: 10.5, borderRadius: '4px 4px 0 0'
              }}>
                <span>Description</span>
                <span style={{ textAlign: 'right' }}>Qty</span>
                <span style={{ textAlign: 'right' }}>Unit Price</span>
                <span style={{ textAlign: 'right' }}>VAT</span>
                <span style={{ textAlign: 'right' }}>Amount (GBP)</span>
              </div>

              {[
                { desc: 'Website Design', qty: 1, price: '£4,500.00', vat: '20%', amt: '£4,500.00' },
                { desc: 'Website Development', qty: 20, price: '£120.00', vat: '20%', amt: '£2,400.00' },
                { desc: 'Project Management', qty: 10, price: '£75.00', vat: '20%', amt: '£750.00' },
                { desc: 'Consultancy Services', qty: 8, price: '£150.00', vat: '20%', amt: '£1,200.00' },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid', gridTemplateColumns: '2fr 0.4fr 0.8fr 0.5fr 1fr',
                    padding: '8px 12px', fontSize: 10.5, borderBottom: '1px solid #f1f5f9',
                    background: i % 2 === 0 ? '#ffffff' : '#f8fafc'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{row.desc}</span>
                  <span style={{ textAlign: 'right', color: '#64748b' }}>{row.qty}</span>
                  <span style={{ textAlign: 'right', color: '#64748b' }}>{row.price}</span>
                  <span style={{ textAlign: 'right', color: '#64748b' }}>{row.vat}</span>
                  <span style={{ textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>{row.amt}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, marginBottom: 18, fontSize: 10.5 }}>
              <div style={{ display: 'flex', gap: 24 }}>
                <span style={{ color: '#64748b' }}>Subtotal</span>
                <span style={{ fontWeight: 600, minWidth: 80, textAlign: 'right' }}>£8,850.00</span>
              </div>
              <div style={{ display: 'flex', gap: 24 }}>
                <span style={{ color: '#64748b' }}>VAT (20%)</span>
                <span style={{ fontWeight: 600, minWidth: 80, textAlign: 'right' }}>£1,770.00</span>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', width: '100%',
                background: '#f0fdfa', border: `1px solid ${accentColour}50`,
                padding: '8px 12px', borderRadius: 6, marginTop: 6, fontWeight: 800, fontSize: 13
              }}>
                <span style={{ color: primaryColour }}>Total (GBP)</span>
                <span style={{ color: '#0f172a' }}>£10,620.00</span>
              </div>
            </div>

            {/* Payment & Footer */}
            {includePaymentInstructions && (
              <div style={{
                borderTop: '1px solid #e2e8f0', paddingTop: 14,
                display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, fontSize: 9.5, color: '#64748b'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: primaryColour, textTransform: 'uppercase', marginBottom: 4 }}>Payment Details</div>
                  <div>Bank: {bankName}</div>
                  <div>Sort Code: {sortCode}</div>
                  <div>Account No: {accountNumber}</div>
                  <div>Account Name: {accountName}</div>
                  <div>IBAN: {iban}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>Thank you for your business.</div>
                  <div>If you have any questions, please contact</div>
                  <div>us at {email}</div>
                  <div>or {phone}.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
