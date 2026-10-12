'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Buildings,
  Hash,
  FileText,
  CurrencyCircleDollar,
  Receipt,
  Clock,
  Calendar,
  TreeStructure,
  ShieldCheck,
  EnvelopeSimple,
  Eye,
  FloppyDisk,
  UploadSimple,
  Check,
  X,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  DownloadSimple,
  Printer,
  ArrowsOut,
  CheckCircle,
} from '@phosphor-icons/react';

export default function FinanceSettingsPage() {
  const [activeTab, setActiveTab] = useState('branding');
  const [templateCategory, setTemplateCategory] = useState<'service' | 'product'>('service');
  const [selectedTemplate, setSelectedTemplate] = useState('standard');

  // Form states
  const [companyName, setCompanyName] = useState('Your Company Ltd');
  const [tradingName, setTradingName] = useState('TESSMA ONE');
  const [regNumber, setRegNumber] = useState('12345678');
  const [vatNumber, setVatNumber] = useState('GB123456789');

  const [addressLine1, setAddressLine1] = useState('123 Business Park');
  const [addressLine2, setAddressLine2] = useState('Innovation Drive');
  const [city, setCity] = useState('London');
  const [postcode, setPostcode] = useState('SW1 1AA');
  const [country, setCountry] = useState('United Kingdom');

  const [phone, setPhone] = useState('+44 20 7123 4567');
  const [email, setEmail] = useState('accounts@yourcompany.co.uk');
  const [website, setWebsite] = useState('www.yourcompany.co.uk');

  const [footerText, setFooterText] = useState(
    'Thank you for your business. Payment is due within the stated terms. If you have any questions regarding this invoice, please contact our finance team at accounts@yourcompany.co.uk or +44 20 7123 4567.'
  );

  const [primaryColor, setPrimaryColor] = useState('#0F766E');
  const [secondaryColor, setSecondaryColor] = useState('#1E293B');
  const [accentColor, setAccentColor] = useState('#14B8A6');

  const [invoiceTemplate, setInvoiceTemplate] = useState('TESSMA Standard');
  const [creditNoteTemplate, setCreditNoteTemplate] = useState('Modern');

  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const navTabs = [
    { id: 'branding', label: 'Company Branding', icon: <Buildings size={16} /> },
    { id: 'numbering', label: 'Numbering & Documents', icon: <Hash size={16} /> },
    { id: 'templates', label: 'Invoice Templates', icon: <FileText size={16} /> },
    { id: 'currencies', label: 'Currencies & Exchange Rates', icon: <CurrencyCircleDollar size={16} /> },
    { id: 'tax', label: 'Tax & VAT Defaults', icon: <Receipt size={16} /> },
    { id: 'terms', label: 'Payment Terms', icon: <Clock size={16} /> },
    { id: 'years', label: 'Financial Years & Periods', icon: <Calendar size={16} /> },
    { id: 'accounts', label: 'Chart of Accounts', icon: <TreeStructure size={16} /> },
    { id: 'approval', label: 'Approval Rules', icon: <ShieldCheck size={16} /> },
    { id: 'email', label: 'Email & Reminders', icon: <EnvelopeSimple size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#F8FAFC' }}>
      {/* Toast */}
      {showSavedToast && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            backgroundColor: '#0F766E',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle size={18} weight="fill" />
          <span>Finance settings and branding saved successfully!</span>
        </div>
      )}

      {/* Top Header */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '20px 28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
              Finance Settings
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Configure your finance module settings, document branding, defaults and automation rules.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <Eye size={15} color="#64748B" />
              <span>Preview invoice</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <FileText size={15} color="#64748B" />
              <span>Manage templates</span>
            </button>

            <button
              onClick={handleSave}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#0F766E',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(15, 118, 110, 0.25)',
              }}
            >
              <FloppyDisk size={16} weight="bold" />
              <span>Save changes</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '22px',
            overflowX: 'auto',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '2px',
          }}
        >
          {navTabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '9px 14px',
                  fontSize: '12.5px',
                  fontWeight: active ? 600 : 500,
                  color: active ? '#0F766E' : '#64748B',
                  backgroundColor: active ? '#F0FDFA' : 'transparent',
                  border: 'none',
                  borderBottom: active ? '2px solid #0F766E' : '2px solid transparent',
                  cursor: 'pointer',
                  borderRadius: '4px 4px 0 0',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form & Live Preview Grid */}
      <div
        style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(420px, 0.95fr)',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Form Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Two-Column Grid for Upper Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Company Information Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Buildings size={18} color="#0F766E" weight="bold" />
                <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Company Information</h3>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 16px 0' }}>
                This information appears on all finance documents.
              </p>

              {/* Logo Box */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Company logo
                </label>
                <div
                  style={{
                    border: '1px dashed #CBD5E1',
                    borderRadius: '8px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#F8FAFC',
                    marginBottom: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#007D7D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '14px' }}>
                      T
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', letterSpacing: '0.04em' }}>TESSMA</div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: '#64748B', letterSpacing: '0.15em' }}>ONE</div>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <X size={14} weight="bold" />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>Recommended: 300 x 100px, PNG or SVG</span>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: '#0F766E',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <UploadSimple size={12} weight="bold" />
                    <span>Change logo</span>
                  </button>
                </div>
              </div>

              {/* Legal Company Name */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Legal company name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12.5px',
                    color: '#0F172A',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Trading Name */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Trading name (optional)
                </label>
                <input
                  type="text"
                  value={tradingName}
                  onChange={(e) => setTradingName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12.5px',
                    color: '#0F172A',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Reg Number */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Company registration number
                </label>
                <input
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12.5px',
                    color: '#0F172A',
                    outline: 'none',
                  }}
                />
              </div>

              {/* VAT Number */}
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  VAT number
                </label>
                <input
                  type="text"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12.5px',
                    color: '#0F172A',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Document Colours & Style Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: primaryColor }} />
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Document Colours & Style</h3>
                </div>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0 }}>
                  Choose your brand colours and document accent.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Primary colour
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Secondary colour
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Accent colour
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* Template selector inside this block matching layout */}
              <div style={{ marginTop: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <FileText size={16} color="#0F766E" weight="bold" />
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Invoice Template</h4>
                </div>
                <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 12px 0' }}>
                  Choose a template for your invoices and other documents.
                </p>

                {/* Filter pills */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                  <button
                    onClick={() => setTemplateCategory('service')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: templateCategory === 'service' ? '1px solid #0F766E' : '1px solid #CBD5E1',
                      backgroundColor: templateCategory === 'service' ? '#F0FDFA' : '#FFFFFF',
                      color: templateCategory === 'service' ? '#0F766E' : '#64748B',
                    }}
                  >
                    Service business templates
                  </button>
                  <button
                    onClick={() => setTemplateCategory('product')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: templateCategory === 'product' ? '1px solid #0F766E' : '1px solid #CBD5E1',
                      backgroundColor: templateCategory === 'product' ? '#F0FDFA' : '#FFFFFF',
                      color: templateCategory === 'product' ? '#0F766E' : '#64748B',
                    }}
                  >
                    Product business templates
                  </button>
                </div>

                {/* 6 Template Mini Previews */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                  {[
                    { id: 'standard', name: 'TESSMA Standard' },
                    { id: 'modern', name: 'Modern' },
                    { id: 'minimal', name: 'Minimal' },
                    { id: 'pro', name: 'Professional' },
                    { id: 'bold', name: 'Bold' },
                    { id: 'corporate', name: 'Corporate' },
                  ].map((tpl) => {
                    const isSelected = selectedTemplate === tpl.id;
                    return (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        style={{
                          border: isSelected ? '2px solid #0F766E' : '1px solid #E2E8F0',
                          borderRadius: '6px',
                          padding: '6px',
                          backgroundColor: '#FFFFFF',
                          cursor: 'pointer',
                          position: 'relative',
                          textAlign: 'center',
                        }}
                      >
                        {isSelected && (
                          <div style={{ position: 'absolute', top: '4px', right: '4px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                            <Check size={9} weight="bold" />
                          </div>
                        )}
                        {/* Mini Paper Layout Graphic */}
                        <div style={{ height: '48px', backgroundColor: '#F8FAFC', borderRadius: '3px', border: '1px solid #F1F5F9', marginBottom: '4px', padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <div style={{ width: '40%', height: '3px', backgroundColor: isSelected ? primaryColor : '#CBD5E1', borderRadius: '1px' }} />
                          <div style={{ width: '25%', height: '2px', backgroundColor: '#E2E8F0' }} />
                          <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', marginTop: '4px' }} />
                          <div style={{ width: '80%', height: '2px', backgroundColor: '#E2E8F0' }} />
                          <div style={{ width: '90%', height: '2px', backgroundColor: '#E2E8F0' }} />
                        </div>
                        <span style={{ fontSize: '10.5px', fontWeight: 600, color: isSelected ? '#0F766E' : '#475569' }}>
                          {tpl.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Template Settings Selectors */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                      Default template for invoices
                    </label>
                    <select
                      value={invoiceTemplate}
                      onChange={(e) => setInvoiceTemplate(e.target.value)}
                      style={{ width: '100%', padding: '5px 8px', fontSize: '11px', borderRadius: '5px', border: '1px solid #CBD5E1', color: '#1E293B' }}
                    >
                      <option>TESSMA Standard</option>
                      <option>Modern</option>
                      <option>Minimal</option>
                      <option>Professional</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                      Default template for credit notes
                    </label>
                    <select
                      value={creditNoteTemplate}
                      onChange={(e) => setCreditNoteTemplate(e.target.value)}
                      style={{ width: '100%', padding: '5px 8px', fontSize: '11px', borderRadius: '5px', border: '1px solid #CBD5E1', color: '#1E293B' }}
                    >
                      <option>Modern</option>
                      <option>TESSMA Standard</option>
                      <option>Minimal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registered Address Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0F766E' }} />
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Registered address</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Address line 1 <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Address line 2
                </label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Town / City <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Postcode <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Country <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#1E293B' }}
                >
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>United Arab Emirates</option>
                  <option>Germany</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Contact details</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
                />
              </div>
            </div>
          </div>

          {/* Invoice Footer Text Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <FileText size={17} color="#0F766E" weight="bold" />
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Invoice footer text</h3>
            </div>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 12px 0' }}>
              This text will appear at the bottom of your invoices.
            </p>

            <textarea
              rows={3}
              maxLength={500}
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '12.5px',
                color: '#1E293B',
                lineHeight: '1.5',
                outline: 'none',
                resize: 'vertical',
              }}
            />
            <div style={{ textAlign: 'right', fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
              {footerText.length}/500
            </div>
          </div>
        </div>

        {/* Right Live Invoice Preview Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Eye size={17} color="#0F766E" weight="bold" />
                <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Live Invoice Preview</h3>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                This preview shows how your documents will look with your current settings.
              </p>
            </div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                fontSize: '11.5px',
                fontWeight: 600,
                color: '#475569',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <ArrowsOut size={13} weight="bold" />
              <span>Full screen</span>
            </button>
          </div>

          {/* Document Viewer Container */}
          <div
            style={{
              backgroundColor: '#334155',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Viewer Top Toolbar */}
            <div
              style={{
                height: '38px',
                backgroundColor: '#1E293B',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#94A3B8',
                fontSize: '11.5px',
                borderBottom: '1px solid #334155',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>1 / 1</span>
                <span style={{ color: '#475569' }}>|</span>
                <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}>
                  <MagnifyingGlassMinus size={14} />
                </button>
                <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}>
                  <MagnifyingGlassPlus size={14} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  <DownloadSimple size={15} />
                </button>
                <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  <Printer size={15} />
                </button>
              </div>
            </div>

            {/* A4 White Paper Sheet */}
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', backgroundColor: '#475569' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '540px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '3px',
                  padding: '24px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  fontSize: '11.5px',
                  color: '#1E293B',
                  lineHeight: '1.4',
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '5px', backgroundColor: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '12px' }}>
                        T
                      </div>
                      <div style={{ lineHeight: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', letterSpacing: '0.04em' }}>{tradingName}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748B', lineHeight: '1.4' }}>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{companyName}</div>
                      <div>{addressLine1}</div>
                      <div>{addressLine2}</div>
                      <div>{city} {postcode}</div>
                      <div>{country}</div>
                      <div>VAT No: {vatNumber}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0', letterSpacing: '0.05em' }}>
                      INVOICE
                    </h2>
                    <table style={{ fontSize: '10.5px', color: '#64748B', marginLeft: 'auto', textAlign: 'right' }}>
                      <tbody>
                        <tr><td style={{ padding: '1px 6px', color: '#94A3B8' }}>Invoice No:</td><td style={{ fontWeight: 600, color: '#1E293B' }}>INV-2025-0423</td></tr>
                        <tr><td style={{ padding: '1px 6px', color: '#94A3B8' }}>Issue Date:</td><td>15 Apr 2025</td></tr>
                        <tr><td style={{ padding: '1px 6px', color: '#94A3B8' }}>Due Date:</td><td>15 May 2025</td></tr>
                        <tr><td style={{ padding: '1px 6px', color: '#94A3B8' }}>Service Period:</td><td>01 Apr 2025 – 30 Apr 2025</td></tr>
                        <tr><td style={{ padding: '1px 6px', color: '#94A3B8' }}>Reference:</td><td>PO-44881</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bill To & Contact Block */}
                <div
                  style={{
                    backgroundColor: '#F0F9FF',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '18px',
                    fontSize: '10.5px',
                    border: '1px solid #BAE6FD',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#0369A1', marginBottom: '3px' }}>Bill To:</div>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>ABC Ltd</div>
                    <div style={{ color: '#475569' }}>123 Business Park</div>
                    <div style={{ color: '#475569' }}>London SW1 1AA</div>
                    <div style={{ color: '#475569' }}>United Kingdom</div>
                    <div style={{ color: '#64748B' }}>VAT No: GB987654321</div>
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, color: '#0369A1', marginBottom: '3px' }}>Contact:</div>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>Sarah Clarke</div>
                    <div style={{ color: '#475569' }}>Finance Manager</div>
                    <div style={{ color: '#0284C7' }}>sarah.clarke@abc-ltd.co.uk</div>
                    <div style={{ color: '#475569' }}>+44 20 7123 4567</div>
                  </div>
                </div>

                {/* Items Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', marginBottom: '16px' }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${primaryColor}`, color: '#475569', fontWeight: 700 }}>
                      <th style={{ textAlign: 'left', padding: '6px 4px' }}>Description</th>
                      <th style={{ textAlign: 'center', padding: '6px 4px' }}>Qty</th>
                      <th style={{ textAlign: 'right', padding: '6px 4px' }}>Unit Price</th>
                      <th style={{ textAlign: 'right', padding: '6px 4px' }}>VAT</th>
                      <th style={{ textAlign: 'right', padding: '6px 4px' }}>Amount (GBP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { desc: 'Website Design', qty: 1, price: '£4,500.00', vat: '20%', amount: '£4,500.00' },
                      { desc: 'Website Development', qty: 40, price: '£120.00', vat: '20%', amount: '£4,800.00' },
                      { desc: 'Project Management', qty: 20, price: '£75.00', vat: '20%', amount: '£1,500.00' },
                      { desc: 'Consultancy Services', qty: 8, price: '£350.00', vat: '20%', amount: '£2,800.00' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '6px 4px', fontWeight: 500, color: '#1E293B' }}>{row.desc}</td>
                        <td style={{ padding: '6px 4px', textAlign: 'center', color: '#64748B' }}>{row.qty}</td>
                        <td style={{ padding: '6px 4px', textAlign: 'right', color: '#64748B' }}>{row.price}</td>
                        <td style={{ padding: '6px 4px', textAlign: 'right', color: '#64748B' }}>{row.vat}</td>
                        <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Subtotals & Total */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
                  <table style={{ fontSize: '10.5px', textAlign: 'right' }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: '3px 12px', color: '#64748B' }}>Subtotal</td>
                        <td style={{ padding: '3px 0', fontWeight: 600 }}>£13,600.00</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '3px 12px', color: '#64748B' }}>VAT (20%)</td>
                        <td style={{ padding: '3px 0', fontWeight: 600 }}>£2,720.00</td>
                      </tr>
                      <tr style={{ borderTop: `2px solid ${primaryColor}`, fontSize: '12px' }}>
                        <td style={{ padding: '6px 12px', fontWeight: 700, color: '#0F172A' }}>Total (GBP)</td>
                        <td style={{ padding: '6px 0', fontWeight: 800, color: primaryColor }}>£16,320.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Payment Details & Note */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '12px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', fontSize: '9.5px', color: '#64748B' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1E293B', marginBottom: '2px' }}>Payment Details</div>
                    <div>Bank: Barclays Bank PLC</div>
                    <div>Sort Code: 20-00-00</div>
                    <div>Account No: 12345678</div>
                    <div>Account Name: {companyName}</div>
                    <div>IBAN: GB29 BARC 2000 0012 3456 78</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, color: '#334155', marginBottom: '2px' }}>Thank you for your business.</div>
                    <div style={{ lineHeight: '1.3' }}>
                      If you have any questions, please contact our finance team at {email} or {phone}.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
