'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  Calendar,
  DownloadSimple,
  Info,
  MagnifyingGlass,
  CheckCircle,
  FloppyDisk,
  Eye,
  PaperPlaneTilt,
  DotsThreeVertical,
  DotsThree,
  ArrowSquareOut,
  Buildings,
  User,
  EnvelopeSimple,
  Phone,
  Gear,
  CalendarBlank,
  Tag,
  Briefcase,
  Folders,
  FileText,
  Plus,
  BookOpen,
  ArrowsClockwise,
  CloudArrowUp,
  FilePdf,
  ArrowsOut,
  Printer,
  Minus,
  Check,
  X
} from '@phosphor-icons/react';

interface LineItem {
  id: string;
  name: string;
  desc: string;
  qty: number;
  unitPrice: number;
  vatRate: number;
}

export default function NewSupplierBillPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Supplier info
  const [supplierName, setSupplierName] = useState('Tech Suppliers Ltd');
  const [supplierCode, setSupplierCode] = useState('SUP-004');
  const [vatNumber, setVatNumber] = useState('GB987654321');

  // Bill details form
  const [billNumber, setBillNumber] = useState('BILL-2025-0189');
  const [billDate, setBillDate] = useState('15 Apr 2025');
  const [dueDate, setDueDate] = useState('15 May 2025 (Net 30)');
  const [reference, setReference] = useState('TS-44871');
  const [supplierInvoiceNo, setSupplierInvoiceNo] = useState('INV-78452');

  const [currency, setCurrency] = useState('GBP - British Pound');
  const [purchaseCategory, setPurchaseCategory] = useState('IT Equipment');
  const [project, setProject] = useState('Office Refurbishment');
  const [costCentre, setCostCentre] = useState('CC-001 - Head Office');
  const [purchaseOrder, setPurchaseOrder] = useState('PO-44881');

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    {
      id: '1',
      name: 'Dell 27" Monitor',
      desc: 'UltraSharp U2723QE',
      qty: 10,
      unitPrice: 280.00,
      vatRate: 20
    },
    {
      id: '2',
      name: 'Monitor Desk Mount',
      desc: 'Adjustable arm',
      qty: 10,
      unitPrice: 45.00,
      vatRate: 20
    },
    {
      id: '3',
      name: 'HDMI Cable 2m',
      desc: 'High speed 4K',
      qty: 20,
      unitPrice: 12.00,
      vatRate: 20
    },
    {
      id: '4',
      name: 'Delivery Charge',
      desc: 'Standard delivery',
      qty: 1,
      unitPrice: 25.00,
      vatRate: 20
    }
  ]);

  // Discount
  const [discountValue, setDiscountValue] = useState('0');
  const [discountType, setDiscountType] = useState('%');

  // Notes
  const [approverNotes, setApproverNotes] = useState(
    'Please process this supplier bill for the monitor order. Deliveries have been received and checked by the IT team.'
  );
  const [internalInstructions, setInternalInstructions] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
  const discountAmount = discountType === '%' 
    ? (subtotal * (parseFloat(discountValue) || 0)) / 100 
    : (parseFloat(discountValue) || 0);
  const discountedSubtotal = subtotal - discountAmount;
  const vatAmount = discountedSubtotal * 0.20;
  const totalGbp = discountedSubtotal + vatAmount;

  const handleQtyChange = (id: string, val: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, val) } : item));
  };

  const handlePriceChange = (id: string, val: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, unitPrice: Math.max(0, val) } : item));
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      name: 'New Item',
      desc: 'Item description',
      qty: 1,
      unitPrice: 100.00,
      vatRate: 20
    };
    setItems(prev => [...prev, newItem]);
    showToast('New item added');
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '0 0 48px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
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

      {/* ── 1. BREADCRUMBS & TOP HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <CaretRight size={12} />
            <Link href="/finance/purchase-invoices" style={{ color: '#64748B', textDecoration: 'none' }}>Purchases</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>New supplier bill</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            New Supplier Bill
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Enter and submit a supplier bill for approval. It will be matched with your purchase records and coded to the correct accounts.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => showToast('Draft saved successfully!')}
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
            onClick={() => showToast('Preview PDF dialog opened')}
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
            <span>Preview PDF</span>
          </button>

          <button 
            onClick={() => showToast('Supplier bill BILL-2025-0189 submitted for approval!')}
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
            <PaperPlaneTilt size={16} weight="bold" />
            <span>Submit for approval</span>
          </button>

          <button 
            onClick={() => showToast('More options')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 12px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <DotsThreeVertical size={16} weight="bold" />
            <span>More</span>
          </button>
        </div>
      </div>

      {/* ── MAIN WORKSPACE: 2 COLUMNS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(640px, 1.7fr) minmax(380px, 1fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: SUPPLIER, BILL DETAILS, LINE ITEMS, NOTES ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Supplier */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Buildings size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Supplier
                </h3>
              </div>

              <button 
                onClick={() => showToast('Select another supplier modal')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ArrowsClockwise size={15} />
                <span>Change supplier</span>
              </button>
            </div>

            {/* Supplier Identity Top */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB'
              }}>
                <Buildings size={24} weight="bold" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>{supplierName}</span>
                  <span style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    Active
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {supplierCode} <span style={{ margin: '0 6px' }}>•</span> VAT {vatNumber}
                </div>
              </div>
            </div>

            {/* 3 Supplier Detail Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '18px', fontSize: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
              {/* Contact */}
              <div>
                <div style={{ fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>Contact</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <User size={16} color="#64748B" style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>Emma Wilson</div>
                    <div style={{ color: '#64748B', fontSize: '11.5px' }}>Account Manager</div>
                    <div style={{ color: '#0284C7', marginTop: '6px' }}>emma.wilson@techsuppliers.co.uk</div>
                    <div style={{ color: '#0F172A', marginTop: '3px', fontWeight: 500 }}>+44 20 3456 7890</div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>
                  <span>📍</span>
                  <span>Address</span>
                </div>
                <div style={{ color: '#64748B', lineHeight: '1.5' }}>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>Tech Suppliers Ltd</div>
                  <div>Unit 4, Riverside Park</div>
                  <div>Innovation Drive</div>
                  <div>London SW1 2AB</div>
                  <div>United Kingdom</div>
                </div>
              </div>

              {/* Additional details */}
              <div>
                <div style={{ fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>Additional details</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>VAT number</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>GB987654321</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Payment terms</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>30 days</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Default currency</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>GBP</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Supplier reference</span>
                    <span style={{ color: '#94A3B8' }}>—</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Card 2: Bill details */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <FileText size={18} color="#059669" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Bill details
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', fontSize: '12.5px' }}>
              
              {/* Left Form Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Bill number */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Bill number <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={billNumber} 
                      onChange={(e) => setBillNumber(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', fontWeight: 600 }}
                    />
                    <Gear size={16} color="#64748B" style={{ cursor: 'pointer' }} />
                  </div>
                </div>

                {/* Bill date */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Bill date <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={billDate} 
                      onChange={(e) => setBillDate(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                    />
                    <CalendarBlank size={16} color="#64748B" />
                  </div>
                </div>

                {/* Due date */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Due date <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={dueDate} 
                      onChange={(e) => setDueDate(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                    />
                    <CalendarBlank size={16} color="#64748B" />
                  </div>
                </div>

                {/* Reference */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#64748B', fontWeight: 500 }}>Reference</label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={reference} 
                      onChange={(e) => setReference(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                    />
                  </div>
                </div>

                {/* Supplier invoice no. */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#64748B', fontWeight: 500 }}>Supplier invoice no.</label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={supplierInvoiceNo} 
                      onChange={(e) => setSupplierInvoiceNo(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Form Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Currency */}
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Currency <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                    >
                      <option>GBP - British Pound</option>
                      <option>EUR - Euro</option>
                      <option>USD - US Dollar</option>
                    </select>
                  </div>
                </div>

                {/* Purchase category */}
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Purchase category <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={16} color="#8B5CF6" />
                    <select 
                      value={purchaseCategory} 
                      onChange={(e) => setPurchaseCategory(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                    >
                      <option>IT Equipment</option>
                      <option>Office Supplies</option>
                      <option>Professional Services</option>
                    </select>
                  </div>
                </div>

                {/* Project (optional) */}
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#64748B', fontWeight: 500 }}>Project (optional)</label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={16} color="#0284C7" />
                    <select 
                      value={project} 
                      onChange={(e) => setProject(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                    >
                      <option>Office Refurbishment</option>
                      <option>Website Redesign</option>
                      <option>Internal Systems</option>
                    </select>
                  </div>
                </div>

                {/* Cost centre (optional) */}
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#64748B', fontWeight: 500 }}>Cost centre (optional)</label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Folders size={16} color="#0284C7" />
                    <select 
                      value={costCentre} 
                      onChange={(e) => setCostCentre(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                    >
                      <option>CC-001 - Head Office</option>
                      <option>CC-002 - London Branch</option>
                      <option>CC-003 - IT Operations</option>
                    </select>
                  </div>
                </div>

                {/* Purchase order (optional) */}
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#64748B', fontWeight: 500 }}>Purchase order (optional)</label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={purchaseOrder} 
                      onChange={(e) => setPurchaseOrder(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Line items */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FileText size={18} color="#059669" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Line items
              </h3>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                    <th style={{ padding: '8px 8px', width: '30px' }}>#</th>
                    <th style={{ padding: '8px 12px' }}>Description</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center', width: '70px' }}>Qty</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right', width: '100px' }}>Unit price (GBP)</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center', width: '90px' }}>VAT</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right' }}>Net amount (GBP)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross amount (GBP)</th>
                    <th style={{ padding: '8px 6px', width: '20px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => {
                    const net = item.qty * item.unitPrice;
                    const gross = net * 1.20;
                    return (
                      <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 8px', color: '#64748B' }}>{idx + 1}</td>
                        <td style={{ padding: '12px 12px' }}>
                          <div style={{ fontWeight: 600, color: '#0F172A' }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>{item.desc}</div>
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          <input 
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value) || 0)}
                            style={{
                              width: '45px',
                              textAlign: 'center',
                              border: '1px solid #CBD5E1',
                              borderRadius: '6px',
                              padding: '4px',
                              fontSize: '12px',
                              color: '#0F172A'
                            }}
                          />
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right' }}>
                          <input 
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                            style={{
                              width: '75px',
                              textAlign: 'right',
                              border: '1px solid #CBD5E1',
                              borderRadius: '6px',
                              padding: '4px 6px',
                              fontSize: '12px',
                              color: '#0F172A'
                            }}
                          />
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          <div style={{
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11.5px',
                            color: '#0F172A'
                          }}>
                            <span>{item.vatRate}%</span>
                            <CaretDown size={10} color="#64748B" />
                          </div>
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                          £{net.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                          £{gross.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ padding: '12px 6px', textAlign: 'center' }}>
                          <button 
                            onClick={() => removeItem(item.id)}
                            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
                          >
                            <DotsThreeVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom item actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', fontSize: '12.5px' }}>
              <button 
                onClick={addItem}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={14} weight="bold" />
                <span>Add item</span>
              </button>

              <button 
                onClick={() => showToast('Catalogue selection modal opened')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={15} />
                <span>Add from catalogue</span>
              </button>

              <button 
                onClick={() => showToast('Recurring item settings opened')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ArrowsClockwise size={15} />
                <span>Create recurring item</span>
              </button>
            </div>
          </div>

          {/* Card 4: Notes and internal instructions */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FileText size={18} color="#059669" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Notes and internal instructions
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', fontSize: '12.5px' }}>
              <div>
                <label style={{ display: 'block', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
                  Notes to approvers (optional)
                </label>
                <textarea 
                  value={approverNotes}
                  onChange={(e) => setApproverNotes(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    color: '#0F172A',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
                  Internal instructions (optional)
                </label>
                <textarea 
                  value={internalInstructions}
                  onChange={(e) => setInternalInstructions(e.target.value)}
                  placeholder="Add any additional information for your finance team..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    color: '#0F172A',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* ════ RIGHT COLUMN: BILL SUMMARY, ATTACHMENTS, INVOICE PREVIEW ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Bill summary */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FileText size={18} color="#059669" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Bill summary
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>
                  £{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Discount Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748B' }}>Discount</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    style={{ width: '40px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '3px 6px', textAlign: 'center', fontSize: '12px', color: '#0F172A' }}
                  />
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '3px 6px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#0F172A' }}>
                    <span>%</span>
                    <CaretDown size={10} color="#64748B" />
                  </div>
                  <span style={{ fontWeight: 600, color: '#0F172A', width: '50px', textAlign: 'right' }}>
                    £{discountAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>VAT (20%)</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>
                  £{vatAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Highlight Total GBP */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '10px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Total (GBP)</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                  £{totalGbp.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Payment terms & Due date pills */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="#0284C7" />
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#64748B' }}>Payment terms</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>30 days (Net 30)</div>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarBlank size={18} color="#0284C7" />
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#64748B' }}>Due date</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>15 May 2025</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Attachments */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ color: '#059669', display: 'flex' }}>
                <FileText size={18} weight="bold" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Attachments
              </h3>
            </div>

            {/* Drop Zone */}
            <div style={{
              border: '2px dashed #CBD5E1',
              borderRadius: '8px',
              padding: '24px 16px',
              textAlign: 'center',
              background: '#F8FAFC',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
            onClick={() => showToast('File upload browser opened')}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color: '#0284C7' }}>
                <CloudArrowUp size={32} weight="bold" />
              </div>
              <div style={{ fontSize: '12.5px', color: '#334155' }}>
                <span style={{ fontWeight: 600 }}>Drop files here</span> or <span style={{ color: '#0284C7', fontWeight: 600 }}>click to upload</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                PDF, JPG, PNG (Max 10 MB each)
              </div>
            </div>

            {/* Attached file chip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '10px 12px',
              background: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '6px',
                  background: '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#DC2626'
                }}>
                  <FilePdf size={18} weight="fill" />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>TechSuppliers_Inv-78452.pdf</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>342 KB • Uploaded 15 Apr 2025</div>
                </div>
              </div>

              <button 
                onClick={() => showToast('Attachment options')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
              >
                <DotsThreeVertical size={16} />
              </button>
            </div>
          </div>

          {/* Card 3: Invoice preview */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Invoice preview
                </h3>
              </div>

              <button 
                onClick={() => showToast('Fullscreen PDF viewer')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ArrowsOut size={14} />
                <span>Full screen</span>
              </button>
            </div>

            {/* PDF Viewer Mockup */}
            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden' }}>
              {/* PDF Toolbar */}
              <div style={{
                background: '#1E293B',
                color: '#CBD5E1',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>1 / 1</span>
                  <span>-</span>
                  <span>+</span>
                  <span>[ ]</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <DownloadSimple size={13} style={{ cursor: 'pointer' }} />
                  <Printer size={13} style={{ cursor: 'pointer' }} />
                  <DotsThreeVertical size={13} style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Rendered Invoice Paper */}
              <div style={{ background: '#FFFFFF', padding: '16px', fontSize: '9.5px', color: '#334155', lineHeight: '1.4' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#009A96', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <div style={{ width: '8px', height: '8px', border: '1.5px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '11px', color: '#0F172A' }}>Tech Suppliers Ltd</div>
                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>Unit 4, Riverside Park<br />Innovation Drive<br />London SW1 2AB<br />VAT No: GB987654321</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>INVOICE</div>
                    <div style={{ fontSize: '8.5px', color: '#64748B' }}>Invoice No: <span style={{ color: '#0F172A', fontWeight: 600 }}>INV-78452</span></div>
                    <div style={{ fontSize: '8.5px', color: '#64748B' }}>Invoice Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>15 Apr 2025</span></div>
                    <div style={{ fontSize: '8.5px', color: '#64748B' }}>Due Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>15 May 2025</span></div>
                    <div style={{ fontSize: '8.5px', color: '#64748B' }}>Account Ref: <span style={{ color: '#0F172A', fontWeight: 600 }}>TS-44871</span></div>
                    <div style={{ fontSize: '8.5px', color: '#64748B' }}>Purchase Order: <span style={{ color: '#0F172A', fontWeight: 600 }}>PO-44881</span></div>
                  </div>
                </div>

                {/* Bill To */}
                <div style={{ background: '#F1F5F9', padding: '8px', borderRadius: '4px', marginBottom: '10px', fontSize: '8.5px' }}>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>Bill To:</div>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>Your Company Ltd</div>
                  <div style={{ color: '#64748B' }}>123 Business Park, London SW1 2AB, United Kingdom</div>
                  <div style={{ color: '#64748B' }}>VAT No: GB123456789</div>
                </div>

                {/* Preview Items Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8.5px', marginBottom: '8px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #CBD5E1', textAlign: 'left', color: '#64748B' }}>
                      <th style={{ padding: '3px 0' }}>Description</th>
                      <th style={{ padding: '3px 0', textAlign: 'center' }}>Qty</th>
                      <th style={{ padding: '3px 0', textAlign: 'right' }}>Unit Price</th>
                      <th style={{ padding: '3px 0', textAlign: 'center' }}>VAT</th>
                      <th style={{ padding: '3px 0', textAlign: 'right' }}>Amount (GBP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '4px 0', color: '#0F172A', fontWeight: 500 }}>Dell 27" Monitor</td>
                      <td style={{ padding: '4px 0', textAlign: 'center' }}>10</td>
                      <td style={{ padding: '4px 0', textAlign: 'right' }}>£280.00</td>
                      <td style={{ padding: '4px 0', textAlign: 'center' }}>20%</td>
                      <td style={{ padding: '4px 0', textAlign: 'right', fontWeight: 600 }}>£3,360.00</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px 0', color: '#0F172A', fontWeight: 500 }}>Monitor Desk Mount</td>
                      <td style={{ padding: '4px 0', textAlign: 'center' }}>10</td>
                      <td style={{ padding: '4px 0', textAlign: 'right' }}>£45.00</td>
                      <td style={{ padding: '4px 0', textAlign: 'center' }}>20%</td>
                      <td style={{ padding: '4px 0', textAlign: 'right', fontWeight: 600 }}>£540.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
