'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Trash2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Building,
  UserPlus,
  Maximize2,
  HelpCircle,
  FileText,
  CreditCard,
  Percent,
  Check,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // e.g. 20 for 20%
}

export default function NewSalesInvoicePage() {
  // Customer selection states
  const [customerSearch, setCustomerSearch] = useState('');
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: 'ABC Ltd',
    code: 'CUST-001',
    email: 'abc@company.com',
    address: '123 High Street\nLondon SW1A 1AA\nUnited Kingdom',
  });

  // Invoice Meta
  const [invoiceDate, setInvoiceDate] = useState('30 Apr 2025');
  const [dueDate, setDueDate] = useState('30 May 2025');
  const [dueTerms, setDueTerms] = useState('Net 30 days');
  const [poReference, setPoReference] = useState('');
  const [invoiceTemplate, setInvoiceTemplate] = useState('Standard Invoice');
  const [brandingProfile, setBrandingProfile] = useState('TESSMA ONE (Default)');

  // Line items state
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      description: 'Facilities Management - April 2025',
      quantity: 1,
      unitPrice: 2000.0,
      vatRate: 20,
    },
    {
      id: '2',
      description: 'Additional site services',
      quantity: 5,
      unitPrice: 75.0,
      vatRate: 20,
    },
  ]);

  // Notes & terms
  const [notes, setNotes] = useState('');
  const [termsType, setTermsType] = useState('Standard Terms (30 days)');

  // Calculations
  const subtotal = lineItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const vatTotal = lineItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice * (item.vatRate / 100)), 0);
  const grandTotal = subtotal + vatTotal;

  // Handlers for line items
  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      vatRate: 20,
    };
    setLineItems(prev => [...prev, newItem]);
  };

  const recentCustomers = [
    { name: 'ABC Ltd', code: 'CUST-001', email: 'abc@company.com' },
    { name: 'Greenway Facilities', code: 'CUST-015', email: 'accounts@greenway.co.uk' },
    { name: 'Riverside Property Group', code: 'CUST-032', email: 'finance@riverside.co.uk' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* ── Top Header Actions: Cancel, Save as draft, Review & issue ─────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>New sales invoice</h1>
          <p style={{ fontSize: 13.5, color: '#64748b', margin: 0 }}>
            Create and issue a professional invoice to your customer.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            href="/finance/sales-invoices"
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '9px 18px',
              fontSize: 13,
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
          >
            Cancel
          </Link>
          <button
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '9px 18px',
              fontSize: 13,
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
          >
            Save as draft
          </button>
          <div style={{ display: 'flex' }}>
            <button
              style={{
                background: '#007D7D',
                border: 'none',
                borderRadius: '8px 0 0 8px',
                padding: '9px 18px',
                fontSize: 13,
                fontWeight: 600,
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              Review &amp; issue
            </button>
            <button
              style={{
                background: '#006666',
                border: 'none',
                borderRadius: '0 8px 8px 0',
                padding: '0 10px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronDown size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Left Form (approx 72%) + Right Preview & Totals (approx 28%) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 330px', gap: 24, alignItems: 'start' }}>
        
        {/* ── LEFT COLUMN: FORM SECTIONS ────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* 1. Invoice Details Card */}
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={17} />
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Invoice details</h2>
            </div>

            {/* Customer Search & New Customer Panel */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#334155' }}>
                  Customer <span style={{ color: '#ef4444' }}>*</span>
                </label>
              </div>

              {/* Customer Input Box */}
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1.5px solid #009A96',
                    borderRadius: 8,
                    padding: '8px 14px',
                    background: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Search size={15} color="#94a3b8" />
                    <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 500 }}>
                      {selectedCustomer.name || 'Search for a customer...'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <ChevronUp size={16} color="#009A96" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); alert('Add new customer modal'); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
                        color: '#009A96', fontSize: 12.5, fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      <Plus size={14} /> Add customer
                    </button>
                  </div>
                </div>

                {/* Dropdown Customer Picker (Exact match of screenshot with Recent Customers & Right promo box) */}
                {isCustomerDropdownOpen && (
                  <div style={{
                    marginTop: 6,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
                    padding: 16,
                    display: 'grid',
                    gridTemplateColumns: '1.3fr 1fr',
                    gap: 16,
                    zIndex: 20
                  }}>
                    {/* Left: Recent customers list */}
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
                        Recent customers
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {recentCustomers.map((cust) => {
                          const isSelected = selectedCustomer.name === cust.name;
                          return (
                            <div
                              key={cust.code}
                              onClick={() => {
                                setSelectedCustomer({
                                  name: cust.name,
                                  code: cust.code,
                                  email: cust.email,
                                  address: '123 High Street\nLondon SW1A 1AA\nUnited Kingdom'
                                });
                                setIsCustomerDropdownOpen(false);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '8px 10px',
                                borderRadius: 8,
                                background: isSelected ? '#f0fdfa' : '#f8fafc',
                                border: isSelected ? '1px solid #99f6e4' : '1px solid #f1f5f9',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 6,
                                background: '#e0f2fe',
                                color: '#0284c7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <Building size={16} />
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>{cust.name}</div>
                                <div style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {cust.code} · {cust.email}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: "Don't see your customer?" card */}
                    <div style={{
                      background: '#f0fdfa',
                      border: '1px dashed #99f6e4',
                      borderRadius: 10,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        background: '#ccfbf1',
                        color: '#0d9488',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10
                      }}>
                        <UserPlus size={18} />
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                        Don&apos;t see your customer?
                      </div>
                      <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.4, marginBottom: 14 }}>
                        You can create a new customer right here without leaving this page.
                      </div>
                      <button
                        style={{
                          background: '#007D7D',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '7px 14px',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          width: '100%',
                          justifyContent: 'center'
                        }}
                      >
                        <Plus size={14} /> Add new customer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Dates, Reference, Template, Branding */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Left Column in Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 6 }}>
                    Invoice date <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', background: '#ffffff' }}>
                    <Calendar size={15} color="#64748b" />
                    <input
                      type="text"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: 13, color: '#0f172a', width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 6 }}>
                    Customer reference / PO
                  </label>
                  <input
                    type="text"
                    value={poReference}
                    placeholder="e.g. PO-12345"
                    onChange={(e) => setPoReference(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 13,
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 6 }}>
                    Invoice template
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={invoiceTemplate}
                      onChange={(e) => setInvoiceTemplate(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        padding: '8px 30px 8px 12px',
                        fontSize: 13,
                        color: '#0f172a',
                        outline: 'none',
                        appearance: 'none',
                        background: '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <option>Standard Invoice</option>
                      <option>Professional Clean</option>
                      <option>Agency Modern</option>
                    </select>
                    <ChevronDown size={15} color="#64748b" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Right Column in Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 6 }}>
                    Due date <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', background: '#ffffff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Calendar size={15} color="#64748b" />
                      <input
                        type="text"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        style={{ border: 'none', outline: 'none', fontSize: 13, color: '#0f172a', width: '100px' }}
                      />
                    </div>
                    <span style={{ fontSize: 11.5, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4, fontWeight: 500 }}>
                      {dueTerms}
                    </span>
                  </div>
                </div>

                <div style={{ height: '56px' }}>{/* Placeholder alignment gap */}</div>

                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 6 }}>
                    Branding profile
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={brandingProfile}
                      onChange={(e) => setBrandingProfile(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        padding: '8px 30px 8px 12px',
                        fontSize: 13,
                        color: '#0f172a',
                        outline: 'none',
                        appearance: 'none',
                        background: '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <option>TESSMA ONE (Default)</option>
                      <option>Secondary Brand UK</option>
                    </select>
                    <ChevronDown size={15} color="#64748b" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Line Items Card */}
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={17} />
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Line items</h2>
            </div>

            {/* Line items table */}
            <div style={{ marginBottom: 16 }}>
              {/* Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '32px 1.8fr 80px 100px 110px 110px 32px',
                gap: 10,
                padding: '0 8px 8px 8px',
                borderBottom: '1px solid #e2e8f0',
                fontSize: 11.5,
                fontWeight: 600,
                color: '#64748b'
              }}>
                <div>#</div>
                <div>Description <span style={{ color: '#ef4444' }}>*</span></div>
                <div>Quantity <span style={{ color: '#ef4444' }}>*</span></div>
                <div>Unit price <span style={{ color: '#ef4444' }}>*</span></div>
                <div>VAT rate <span style={{ color: '#ef4444' }}>*</span></div>
                <div style={{ textAlign: 'right' }}>Amount</div>
                <div></div>
              </div>

              {/* Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {lineItems.map((item, index) => {
                  const lineAmount = item.quantity * item.unitPrice;
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '32px 1.8fr 80px 100px 110px 110px 32px',
                        gap: 10,
                        alignItems: 'center',
                        padding: '4px 8px'
                      }}
                    >
                      <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{index + 1}</div>
                      
                      {/* Description input */}
                      <div>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Item or service description"
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: 6,
                            padding: '7px 10px',
                            fontSize: 12.5,
                            color: '#0f172a',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      {/* Quantity input */}
                      <div>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: 6,
                            padding: '7px 10px',
                            fontSize: 12.5,
                            color: '#0f172a',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      {/* Unit Price input */}
                      <div>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: 6,
                            padding: '7px 10px',
                            fontSize: 12.5,
                            color: '#0f172a',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      {/* VAT rate dropdown */}
                      <div style={{ position: 'relative' }}>
                        <select
                          value={item.vatRate}
                          onChange={(e) => updateItem(item.id, 'vatRate', parseFloat(e.target.value))}
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: 6,
                            padding: '7px 24px 7px 8px',
                            fontSize: 12,
                            color: '#0f172a',
                            outline: 'none',
                            appearance: 'none',
                            background: '#ffffff',
                            cursor: 'pointer'
                          }}
                        >
                          <option value={20}>20% (VAT)</option>
                          <option value={5}>5% (Reduced)</option>
                          <option value={0}>0% (Zero)</option>
                        </select>
                        <ChevronDown size={13} color="#64748b" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      </div>

                      {/* Amount column */}
                      <div style={{ textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                        £{lineAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>

                      {/* Delete icon */}
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                          type="button"
                          onClick={() => removeLineItem(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: 4,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          title="Delete line"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Table Footer: Add Line Item + Import from items */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
              <button
                type="button"
                onClick={addLineItem}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'none',
                  border: 'none',
                  color: '#009A96',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={15} /> Add line item
              </button>

              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  padding: '6px 12px',
                  color: '#007D7D',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <FileText size={14} /> Import from items <ChevronDown size={13} />
              </button>
            </div>
          </div>

          {/* 3. Additional Information Card */}
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={17} />
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Additional information</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Notes to customer */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 6 }}>
                  Notes to customer
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add a personal message to appear on the invoice...&#10;e.g. Thank you for your business."
                  rows={4}
                  style={{
                    width: '100%',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: '10px 12px',
                    fontSize: 12.5,
                    color: '#0f172a',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Terms and conditions */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#334155' }}>
                    Terms and conditions
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={termsType}
                      onChange={(e) => setTermsType(e.target.value)}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: 6,
                        padding: '4px 24px 4px 8px',
                        fontSize: 11.5,
                        color: '#334155',
                        background: '#ffffff',
                        appearance: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option>Standard Terms (30 days)</option>
                      <option>Immediate Payment</option>
                      <option>Net 60 days</option>
                    </select>
                    <ChevronDown size={12} color="#64748b" style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>

                <div style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: '10px 12px',
                  background: '#f8fafc',
                  fontSize: 12,
                  color: '#64748b',
                  lineHeight: 1.5,
                  minHeight: '82px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <span>
                    Payment is due within 30 days of the invoice date. Late payments may incur additional charges in accordance with our terms.
                  </span>
                  <ExternalLink size={13} color="#94a3b8" style={{ flexShrink: 0, marginLeft: 8 }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN: INVOICE PREVIEW + INVOICE TOTALS ──────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* 1. Invoice preview mini card */}
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, color: '#007D7D' }}>👁️</span>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>Invoice preview</h3>
              </div>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <Maximize2 size={11} /> Open full preview
              </button>
            </div>

            {/* Mini invoice document representation */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '16px 14px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
              fontSize: 8.5,
              color: '#334155'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: '#007D7D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9, fontWeight: 800 }}>
                    T
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 9, color: '#0f172a' }}>TESSMA</div>
                    <div style={{ fontSize: 6.5, color: '#009A96', fontWeight: 700 }}>ONE</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>INVOICE</div>
              </div>

              {/* Company & Meta info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 7.5, color: '#64748b' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>TESSMA ONE</div>
                  <div>1 Kingdom Street</div>
                  <div>London W2 6BD</div>
                  <div>United Kingdom</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div>Invoice No: <span style={{ fontWeight: 600, color: '#0f172a' }}>INV-2025-0047</span></div>
                  <div>Invoice Date: <span style={{ fontWeight: 600, color: '#0f172a' }}>{invoiceDate}</span></div>
                  <div>Due Date: <span style={{ fontWeight: 600, color: '#0f172a' }}>{dueDate}</span></div>
                </div>
              </div>

              {/* Bill To */}
              <div style={{ marginBottom: 12, fontSize: 7.5 }}>
                <div style={{ fontWeight: 700, color: '#007D7D', textTransform: 'uppercase' }}>Bill To</div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedCustomer.name}</div>
                <div style={{ color: '#64748b' }}>123 High Street</div>
                <div style={{ color: '#64748b' }}>London SW1A 1AA</div>
                <div style={{ color: '#64748b' }}>United Kingdom</div>
              </div>

              {/* Tiny Mock Table Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: 3, fontWeight: 700, fontSize: 7.5, color: '#64748b' }}>
                <span style={{ width: '40%' }}>Description</span>
                <span>Qty</span>
                <span>Unit Price</span>
                <span>VAT</span>
                <span>Amount</span>
              </div>

              {/* Tiny skeleton lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '35%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                  <div style={{ width: '8%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                  <div style={{ width: '12%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                  <div style={{ width: '8%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                  <div style={{ width: '15%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '28%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                  <div style={{ width: '8%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                  <div style={{ width: '12%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                  <div style={{ width: '8%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                  <div style={{ width: '15%', height: 4, background: '#e2e8f0', borderRadius: 2 }}></div>
                </div>
              </div>

              {/* Tiny Totals */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 6, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end', fontSize: 7.5 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ color: '#64748b' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>£{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ color: '#64748b' }}>VAT (20%)</span>
                  <span style={{ fontWeight: 600 }}>£{vatTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 4, background: '#f0fdfa', padding: '4px 6px', borderRadius: 4, fontWeight: 800, fontSize: 8.5 }}>
                  <span style={{ color: '#007D7D' }}>Total</span>
                  <span style={{ color: '#0f172a' }}>£{grandTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Invoice totals summary card */}
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 24, height: 24, borderRadius: 5, background: '#e6fffa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={15} />
              </div>
              <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Invoice totals</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, borderBottom: '1px solid #f1f5f9', paddingBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Subtotal</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>
                  £{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>VAT (20%)</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>
                  £{vatTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Highlighted Total GBP Card */}
            <div style={{
              background: '#f0fdfa',
              border: '1px solid #99f6e4',
              borderRadius: 8,
              padding: '14px 16px',
              marginTop: 14,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Total (GBP)</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                £{grandTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
