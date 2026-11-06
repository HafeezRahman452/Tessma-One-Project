'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  DownloadSimple,
  Printer,
  PaperPlaneTilt,
  X,
  FileText,
  FilePdf,
  CheckCircle,
  Eye,
  ArrowsOut,
  Receipt,
  Plus,
  BookOpen,
  ArrowsClockwise,
  CreditCard,
  DotsThreeVertical,
  DotsThree,
  Info
} from '@phosphor-icons/react';

export default function SalesInvoiceDetailPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Line items state
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Website Design',
      desc: 'Design and build new corporate website',
      qty: 1,
      unitPrice: 4500.00,
      vatRate: 20
    },
    {
      id: '2',
      name: 'Website Development',
      desc: 'Front-end and back-end development',
      qty: 40,
      unitPrice: 120.00,
      vatRate: 20
    },
    {
      id: '3',
      name: 'Project Management',
      desc: 'Project management and delivery',
      qty: 20,
      unitPrice: 75.00,
      vatRate: 20
    },
    {
      id: '4',
      name: 'Consultancy Services',
      desc: 'Strategy and technical consultancy',
      qty: 8,
      unitPrice: 350.00,
      vatRate: 20
    }
  ]);

  const [discountValue, setDiscountValue] = useState('0');
  const [discountType, setDiscountType] = useState('%');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculations
  const subtotal = items.reduce((acc, i) => acc + (i.qty * i.unitPrice), 0);
  const discountAmount = discountType === '%' 
    ? (subtotal * (parseFloat(discountValue) || 0)) / 100 
    : (parseFloat(discountValue) || 0);
  const discountedSubtotal = subtotal - discountAmount;
  const vatAmount = discountedSubtotal * 0.20;
  const totalGbp = discountedSubtotal + vatAmount;

  const amountPaid = 4080.00;
  const amountOutstanding = totalGbp - amountPaid;

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
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <CaretRight size={12} />
            <Link href="/finance/sales-invoices" style={{ color: '#64748B', textDecoration: 'none' }}>Sales invoices</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>INV-2026-0148</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Sales Invoice Detail
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            View, send and manage this sales invoice. You can download, send to your customer or record payments.
          </p>
        </div>

        {/* Top Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            href="/designs/pdf-preview"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <Eye size={16} />
            <span>View PDF</span>
          </Link>

          <Link
            href="/designs/send-invoice"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <PaperPlaneTilt size={16} />
            <span>Send PDF</span>
          </Link>

          <button 
            onClick={() => showToast('Downloading invoice PDF...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <DownloadSimple size={16} />
            <span>Download PDF</span>
          </button>

          <button 
            onClick={() => showToast('Record receipt modal opened')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
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
            <CreditCard size={16} weight="bold" />
            <span>Record receipt</span>
          </button>

          <button 
            onClick={() => showToast('Create credit note for INV-2026-0148')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0284C7',
              cursor: 'pointer'
            }}
          >
            <Receipt size={16} />
            <span>Create credit note</span>
          </button>

          <button 
            onClick={() => showToast('More invoice options')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <DotsThreeVertical size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* ── 2. MAIN WORKSPACE: 2 COLUMNS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(640px, 1.75fr) minmax(380px, 1.05fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: OVERVIEW, LINES, TOTALS, PAYMENTS, ACTIVITY ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Invoice overview */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FileText size={18} color="#0284C7" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Invoice overview
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1.4fr', gap: '20px', fontSize: '12.5px' }}>
              
              {/* Col 1 */}
              <div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Invoice number</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '3px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>INV-2026-0148</span>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 600 }}>
                    <span>● Issued</span>
                    <CaretDown size={10} />
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Customer</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                      🏛
                    </div>
                    <div>
                      <Link href="/designs/customer-detail" style={{ fontWeight: 700, color: '#0284C7', textDecoration: 'none' }}>ABC Ltd</Link>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>CUS-001 • VAT GB123456789</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 2 */}
              <div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Issue date</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#0F172A', marginTop: '3px' }}>
                    <span>📅</span>
                    <span>15 Apr 2025</span>
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Due date</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#0F172A', marginTop: '3px' }}>
                    <span>📅</span>
                    <span>15 May 2025 (Net 30)</span>
                  </div>
                  <span style={{
                    display: 'inline-block',
                    background: '#FEE2E2',
                    color: '#DC2626',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    marginTop: '4px'
                  }}>
                    30 days overdue
                  </span>
                </div>
              </div>

              {/* Col 3 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Invoice template</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#0F172A', marginTop: '3px' }}>
                    <FileText size={14} color="#64748B" />
                    <span>TESSMA Standard</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Reference</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>PO-44881</span>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Service period</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F172A', fontWeight: 500, marginTop: '2px' }}>
                    <span>📅</span>
                    <span>01 Apr 2025 – 30 Apr 2025</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Payment terms</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>Net 30 days</span>
                </div>
              </div>

            </div>
          </div>

          {/* Row: Invoice line items (Left) & Invoice totals (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(420px, 1.8fr) minmax(260px, 1.1fr)', gap: '18px' }}>
            
            {/* Left: Invoice line items */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <FileText size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Invoice line items
                </h3>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                    <th style={{ padding: '6px 4px', width: '20px' }}>#</th>
                    <th style={{ padding: '6px 8px' }}>Description</th>
                    <th style={{ padding: '6px 8px', textAlign: 'center', width: '40px' }}>Qty</th>
                    <th style={{ padding: '6px 8px', textAlign: 'right', width: '70px' }}>Unit price</th>
                    <th style={{ padding: '6px 8px', textAlign: 'center', width: '60px' }}>VAT</th>
                    <th style={{ padding: '6px 8px', textAlign: 'right', width: '85px' }}>Amount (GBP)</th>
                    <th style={{ padding: '6px 4px', width: '15px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '8px 4px', color: '#64748B' }}>{idx + 1}</td>
                      <td style={{ padding: '8px 8px' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A' }}>{item.name}</div>
                        <div style={{ fontSize: '10px', color: '#64748B' }}>{item.desc}</div>
                      </td>
                      <td style={{ padding: '8px 8px', textAlign: 'center', color: '#0F172A' }}>{item.qty}</td>
                      <td style={{ padding: '8px 8px', textAlign: 'right', color: '#0F172A' }}>
                        £{item.unitPrice.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '8px 8px', textAlign: 'center' }}>
                        <div style={{ border: '1px solid #CBD5E1', borderRadius: '4px', padding: '2px 4px', display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10.5px' }}>
                          <span>{item.vatRate}%</span>
                          <CaretDown size={9} />
                        </div>
                      </td>
                      <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                        £{(item.qty * item.unitPrice).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '8px 4px', textAlign: 'center', color: '#94A3B8' }}>⋮</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '14px', fontSize: '12px' }}>
                <button 
                  onClick={() => showToast('Add item form opened')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#0284C7', fontWeight: 600, cursor: 'pointer' }}
                >
                  <Plus size={13} weight="bold" />
                  <span>Add item</span>
                </button>
                <button 
                  onClick={() => showToast('Catalogue selection')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#0284C7', fontWeight: 600, cursor: 'pointer' }}
                >
                  <BookOpen size={14} />
                  <span>Add from catalogue</span>
                </button>
                <button 
                  onClick={() => showToast('Recurring settings')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#0284C7', fontWeight: 600, cursor: 'pointer' }}
                >
                  <ArrowsClockwise size={14} />
                  <span>Create recurring invoice</span>
                </button>
              </div>
            </div>

            {/* Right: Invoice totals */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <FileText size={18} color="#059669" weight="bold" />
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    Invoice totals
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>£13,600.00</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Discount</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input type="text" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} style={{ width: '32px', textAlign: 'center', border: '1px solid #CBD5E1', borderRadius: '4px', padding: '2px' }} />
                      <div style={{ border: '1px solid #CBD5E1', borderRadius: '4px', padding: '2px 4px', fontSize: '11px' }}>% ▾</div>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>£0.00</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>VAT (20%)</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>£2,720.00</span>
                  </div>

                  {/* Highlight Total GBP */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Total (GBP)</span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>£16,320.00</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', paddingTop: '6px' }}>
                    <span>Amount paid</span>
                    <span style={{ fontWeight: 700, color: '#059669' }}>£4,080.00</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>Amount outstanding</span>
                    <span style={{ fontWeight: 800, color: '#DC2626', fontSize: '15px' }}>£12,240.00</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row: Payment history (Left) & Activity timeline (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(380px, 1.4fr) minmax(320px, 1.2fr)', gap: '18px' }}>
            
            {/* Payment history */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={18} color="#059669" weight="bold" />
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Payment history</h3>
                </div>
                <button 
                  onClick={() => showToast('Record receipt modal')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px', fontSize: '11.5px', color: '#0284C7', fontWeight: 600, cursor: 'pointer' }}
                >
                  <Plus size={12} weight="bold" />
                  <span>Record receipt</span>
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', marginBottom: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                    <th style={{ padding: '6px 6px' }}>Date</th>
                    <th style={{ padding: '6px 6px' }}>Reference</th>
                    <th style={{ padding: '6px 6px' }}>Method</th>
                    <th style={{ padding: '6px 6px', textAlign: 'right' }}>Amount (GBP)</th>
                    <th style={{ padding: '6px 6px', textAlign: 'center' }}>Status</th>
                    <th style={{ padding: '6px 4px', width: '15px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px 6px', color: '#64748B' }}>25 Apr 2025</td>
                    <td style={{ padding: '8px 6px', color: '#0284C7', fontWeight: 600 }}>PMY-2025-0871</td>
                    <td style={{ padding: '8px 6px', color: '#64748B' }}>Bank Transfer</td>
                    <td style={{ padding: '8px 6px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£2,040.00</td>
                    <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                      <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '999px', fontSize: '10.5px', fontWeight: 600 }}>Allocated</span>
                    </td>
                    <td style={{ padding: '8px 4px', textAlign: 'center', color: '#94A3B8' }}>⋮</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 6px', color: '#64748B' }}>10 Apr 2025</td>
                    <td style={{ padding: '8px 6px', color: '#0284C7', fontWeight: 600 }}>PMY-2025-0763</td>
                    <td style={{ padding: '8px 6px', color: '#64748B' }}>Bank Transfer</td>
                    <td style={{ padding: '8px 6px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£2,040.00</td>
                    <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                      <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '999px', fontSize: '10.5px', fontWeight: 600 }}>Allocated</span>
                    </td>
                    <td style={{ padding: '8px 4px', textAlign: 'center', color: '#94A3B8' }}>⋮</td>
                  </tr>
                </tbody>
              </table>

              {/* Outstanding notice */}
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11.5px' }}>
                <span style={{ color: '#0284C7', fontSize: '14px' }}>ℹ</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#1E40AF' }}>Amount outstanding: £12,240.00</div>
                  <div style={{ color: '#1E40AF', marginTop: '1px' }}>2 payments received totaling £4,080.00. This invoice is partially paid.</div>
                </div>
              </div>
            </div>

            {/* Activity timeline */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#059669', fontSize: '16px' }}>👥</span>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Activity timeline</h3>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>View all &gt;</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '11.5px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <PaperPlaneTilt size={16} color="#0284C7" weight="bold" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>Invoice sent to customer</div>
                      <div style={{ fontSize: '10.5px', color: '#64748B' }}>by John Doe to sarah.clarke@abcltd.co.uk</div>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: '10.5px' }}>15 Apr 2025, 10:24</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <FileText size={16} color="#0284C7" weight="bold" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>Invoice created</div>
                      <div style={{ fontSize: '10.5px', color: '#64748B' }}>Created from quote Project Website Redesign by John Doe</div>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: '10.5px' }}>15 Apr 2025, 10:12</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#16A34A', fontWeight: 800 }}>£</span>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>Payment allocated</div>
                      <div style={{ fontSize: '10.5px', color: '#64748B' }}>£2,040.00 allocated (PMY-2025-0871) by Sarah Clarke</div>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: '10.5px' }}>25 Apr 2025, 14:32</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#16A34A', fontWeight: 800 }}>£</span>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>Payment allocated</div>
                      <div style={{ fontSize: '10.5px', color: '#64748B' }}>£2,040.00 allocated (PMY-2025-0763) by Sarah Clarke</div>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: '10.5px' }}>10 Apr 2025, 11:03</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ════ RIGHT COLUMN: INVOICE PREVIEW CANVAS ════ */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#0284C7' }}>⛶</span>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Invoice preview</h3>
            </div>
            <Link 
              href="/designs/pdf-preview"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: '#0284C7',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <ArrowsOut size={13} />
              <span>Full screen</span>
            </Link>
          </div>
          <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 14px 0' }}>This is how your invoice will look to your customer.</p>

          {/* Scaled PDF Viewer */}
          <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#1E293B', color: '#CBD5E1', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>1 / 1</span>
                <span>-</span>
                <span>+</span>
                <span>[ ]</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <DownloadSimple size={13} />
                <Printer size={13} />
                <span>⋮</span>
              </div>
            </div>

            {/* Document sheet */}
            <div style={{ background: '#FFFFFF', padding: '20px', fontSize: '9px', color: '#334155', lineHeight: 1.4 }}>
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#009A96', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                    <div style={{ width: '8px', height: '8px', border: '1.5px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>TESSMA</div>
                    <div style={{ fontSize: '8px', fontWeight: 700, color: '#009A96', marginTop: '-2px' }}>ONE</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>INVOICE</div>
                  <div style={{ fontSize: '8.5px', color: '#64748B' }}>Invoice No: <span style={{ color: '#0F172A', fontWeight: 600 }}>INV-2026-0148</span></div>
                  <div style={{ fontSize: '8.5px', color: '#64748B' }}>Issue Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>15 Apr 2025</span></div>
                  <div style={{ fontSize: '8.5px', color: '#64748B' }}>Due Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>15 May 2025</span></div>
                  <div style={{ fontSize: '8.5px', color: '#64748B' }}>Service Period: 01 Apr 2025 – 30 Apr 2025</div>
                  <div style={{ fontSize: '8.5px', color: '#64748B' }}>Reference: PO-44881</div>
                </div>
              </div>

              {/* Bill To & Contact */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', marginBottom: '14px', fontSize: '8.5px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>Your Company Ltd</div>
                  <div style={{ color: '#64748B' }}>123 Business Park, London SW1 1AA, United Kingdom</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '6px' }}>Bill To:</div>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>ABC Ltd</div>
                  <div style={{ color: '#64748B' }}>123 Business Park, London SW1 1AA, VAT: GB123456789</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>Contact:</div>
                  <div style={{ color: '#64748B' }}>Sarah Clarke (Finance Manager)<br />sarah.clarke@abcltd.co.uk<br />+44 20 7123 4567</div>
                </div>
              </div>

              {/* Items */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8.5px', marginBottom: '10px' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #009A96', textAlign: 'left', color: '#64748B' }}>
                    <th style={{ padding: '3px 0' }}>Description</th>
                    <th style={{ padding: '3px 0', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '3px 0', textAlign: 'right' }}>Unit Price</th>
                    <th style={{ padding: '3px 0', textAlign: 'center' }}>VAT</th>
                    <th style={{ padding: '3px 0', textAlign: 'right' }}>Amount (GBP)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '4px 0', color: '#0F172A', fontWeight: 600 }}>Website Design</td>
                    <td style={{ padding: '4px 0', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '4px 0', textAlign: 'right' }}>£4,500.00</td>
                    <td style={{ padding: '4px 0', textAlign: 'center' }}>20%</td>
                    <td style={{ padding: '4px 0', textAlign: 'right', fontWeight: 600 }}>£4,500.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '4px 0', color: '#0F172A', fontWeight: 600 }}>Website Development</td>
                    <td style={{ padding: '4px 0', textAlign: 'center' }}>40</td>
                    <td style={{ padding: '4px 0', textAlign: 'right' }}>£120.00</td>
                    <td style={{ padding: '4px 0', textAlign: 'center' }}>20%</td>
                    <td style={{ padding: '4px 0', textAlign: 'right', fontWeight: 600 }}>£4,800.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '4px 0', color: '#0F172A', fontWeight: 600 }}>Project Management</td>
                    <td style={{ padding: '4px 0', textAlign: 'center' }}>20</td>
                    <td style={{ padding: '4px 0', textAlign: 'right' }}>£75.00</td>
                    <td style={{ padding: '4px 0', textAlign: 'center' }}>20%</td>
                    <td style={{ padding: '4px 0', textAlign: 'right', fontWeight: 600 }}>£1,500.00</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0', color: '#0F172A', fontWeight: 600 }}>Consultancy Services</td>
                    <td style={{ padding: '4px 0', textAlign: 'center' }}>8</td>
                    <td style={{ padding: '4px 0', textAlign: 'right' }}>£350.00</td>
                    <td style={{ padding: '4px 0', textAlign: 'center' }}>20%</td>
                    <td style={{ padding: '4px 0', textAlign: 'right', fontWeight: 600 }}>£2,800.00</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end', fontSize: '8.5px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', color: '#64748B' }}>
                  <span>Subtotal</span>
                  <span>£13,600.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', color: '#64748B' }}>
                  <span>VAT (20%)</span>
                  <span>£2,720.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', fontWeight: 800, color: '#0F172A', fontSize: '11px', background: '#ECFDF5', padding: '3px 6px', borderRadius: '4px', marginTop: '2px' }}>
                  <span>Total (GBP)</span>
                  <span style={{ color: '#065F46' }}>£16,320.00</span>
                </div>
              </div>

              {/* Remittance */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px', fontSize: '7.5px', color: '#64748B' }}>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>Payment Details</div>
                <div>Bank: Barclays Bank PLC • Sort Code: 20-00-00 • Account No: 12345678 • Account Name: Your Company Ltd</div>
                <div style={{ textAlign: 'right', marginTop: '6px' }}>Thank you for your business.</div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Screen label bottom */}
      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '20px' }}>
        Screen 06 — Sales Invoice Detail
      </div>

    </div>
  );
}
