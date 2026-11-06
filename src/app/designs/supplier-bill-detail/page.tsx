'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PencilSimple,
  CreditCard,
  DownloadSimple,
  EnvelopeSimple,
  DotsThreeVertical,
  Buildings,
  Receipt,
  User,
  ListDashes,
  Calculator,
  Percent,
  BookOpen,
  ClockCounterClockwise,
  Paperclip,
  UploadSimple,
  CheckCircle,
  FileText,
  FilePdf,
  Check,
  CaretRight,
  ArrowRight,
  ShieldCheck,
  WarningCircle,
  X
} from '@phosphor-icons/react';

export default function SupplierBillDetailPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('490.00');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{ padding: '0 0 32px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
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

      {/* ── 1. BREADCRUMB & HEADER ROW ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <CaretRight size={12} />
            <Link href="/finance/purchase-invoices" style={{ color: '#64748B', textDecoration: 'none' }}>Purchases</Link>
            <CaretRight size={12} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0F172A', fontWeight: 600 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0F172A' }}></span>
              Supplier bill
            </span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Supplier Bill Detail
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            View and manage the details of this supplier bill, including lines, payments, and accounting information.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => showToast('Edit Bill form opened')}
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
            <PencilSimple size={16} />
            <span>Edit</span>
          </button>

          <button 
            onClick={() => setIsRecordPaymentOpen(true)}
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
              cursor: 'pointer'
            }}
          >
            <CreditCard size={16} weight="bold" />
            <span>Record payment</span>
          </button>

          <button 
            onClick={() => showToast('Downloading BILL-2025-0187.pdf...')}
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
            onClick={() => showToast('Email dialog opened')}
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
            <EnvelopeSimple size={16} />
            <span>Email</span>
          </button>

          <button 
            onClick={() => showToast('More options')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <DotsThreeVertical size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* ── 2. KEY HIGHLIGHT BANNER CARD ── */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Supplier Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: '#FEE2E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#DC2626'
          }}>
            <FileText size={28} weight="fill" />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
              Tech Suppliers Ltd
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              SUP-001 <span style={{ margin: '0 6px' }}>•</span> VAT GB987654321
            </div>
          </div>
        </div>

        {/* Bill Number */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 600 }}>
            Bill Number
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
            BILL-2025-0187
          </div>
        </div>

        {/* Bill Date */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 600 }}>
            Bill Date
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
            15 Apr 2025
          </div>
        </div>

        {/* Due Date */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 600 }}>
            Due Date
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
            15 May 2025
          </div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>
            (30 days)
          </div>
        </div>

        {/* Total Amount */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 600 }}>
            Total Amount
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
            £2,450.00
          </div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>
            (inc. VAT)
          </div>
        </div>

        {/* Outstanding */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 600 }}>
            Outstanding
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#DC2626', marginTop: '4px' }}>
            £490.00
          </div>
          <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 500 }}>
            Part paid (80%)
          </div>
        </div>

        {/* Payment Status Pill */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
            Payment Status
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#DCFCE7',
            color: '#15803D',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }}></span>
            Part paid
          </div>
        </div>

        {/* Approval Status Pill */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
            Approval Status
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#DCFCE7',
            color: '#15803D',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            <CheckCircle size={14} weight="fill" color="#16A34A" />
            Approved
          </div>
        </div>
      </div>

      {/* ── 3. THREE COLUMNS: SUPPLIER DETAILS | BILLING INFORMATION | CONTACT INFORMATION ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        
        {/* Card 1: Supplier Details */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Buildings size={18} color="#0D9488" weight="bold" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Supplier Details
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '16px', fontSize: '12.5px' }}>
            <div>
              <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Tech Suppliers Ltd</div>
              <div style={{ color: '#64748B', lineHeight: '1.5' }}>
                45 Technology Park<br />
                Solutions Drive<br />
                Manchester<br />
                M1 2AB<br />
                United Kingdom
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <span style={{ color: '#64748B', display: 'inline-block', width: '100px' }}>Supplier Code</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>SUP-001</span>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'inline-block', width: '100px' }}>VAT Number</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>GB987654321</span>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'inline-block', width: '100px' }}>Contact Email</span>
                <span style={{ color: '#0284C7', wordBreak: 'break-all' }}>accounts@techsuppliers.co.uk</span>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'inline-block', width: '100px' }}>Phone</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>+44 161 234 5678</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Billing Information */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Receipt size={18} color="#0D9488" weight="bold" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Billing Information
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', fontSize: '12.5px' }}>
            <div>
              <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>ABC Ltd</div>
              <div style={{ color: '#64748B', lineHeight: '1.5' }}>
                123 Business Park<br />
                Innovation Drive<br />
                London SW1 1AA<br />
                United Kingdom
              </div>
            </div>

            <div>
              <div style={{ color: '#64748B', marginBottom: '4px' }}>VAT Number</div>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>GB123456789</div>
            </div>
          </div>
        </div>

        {/* Card 3: Contact Information */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <User size={18} color="#0D9488" weight="bold" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Contact Information
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              flexShrink: 0
            }}>
              <User size={20} />
            </div>
            <div style={{ fontSize: '12.5px', flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#0F172A' }}>James Wilson</div>
              <div style={{ color: '#64748B', marginBottom: '12px' }}>Account Manager</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284C7', marginBottom: '6px' }}>
                <EnvelopeSimple size={15} color="#64748B" />
                <span>james.wilson@techsuppliers.co.uk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A', fontWeight: 600 }}>
                <span style={{ color: '#64748B' }}>📞</span>
                <span>+44 161 234 5678</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── 4. LINE ITEMS (LEFT) & BILL SUMMARY (RIGHT) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(500px, 2fr) minmax(320px, 1fr)',
        gap: '20px',
        marginBottom: '20px'
      }}>
        
        {/* Left: Line Items Table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ListDashes size={18} color="#0D9488" weight="bold" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Line Items
            </h3>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                <th style={{ padding: '8px 12px', fontWeight: 600, width: '40px' }}>#</th>
                <th style={{ padding: '8px 12px', fontWeight: 600 }}>Description</th>
                <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>Unit price</th>
                <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'center' }}>VAT</th>
                <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>Amount (GBP)</th>
                <th style={{ padding: '8px 8px', width: '30px' }}></th>
              </tr>
            </thead>
            <tbody>
              {/* Line 1 */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 12px', color: '#64748B' }}>1</td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>Laptops - Dell XPS 13</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>Business laptops for admin team</div>
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'center', color: '#0F172A' }}>5</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', color: '#0F172A' }}>£400.00</td>
                <td style={{ padding: '14px 12px', textAlign: 'center', color: '#64748B' }}>20%</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£2,000.00</td>
                <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={16} />
                  </button>
                </td>
              </tr>

              {/* Line 2 */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 12px', color: '#64748B' }}>2</td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>Laptop Carry Cases</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>Protective cases</div>
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'center', color: '#0F172A' }}>5</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', color: '#0F172A' }}>£30.00</td>
                <td style={{ padding: '14px 12px', textAlign: 'center', color: '#64748B' }}>20%</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£150.00</td>
                <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={16} />
                  </button>
                </td>
              </tr>

              {/* Line 3 */}
              <tr>
                <td style={{ padding: '14px 12px', color: '#64748B' }}>3</td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>Extended Warranty</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>3 year on-site support</div>
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'center', color: '#0F172A' }}>5</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', color: '#0F172A' }}>£50.00</td>
                <td style={{ padding: '14px 12px', textAlign: 'center', color: '#64748B' }}>20%</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£250.00</td>
                <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right: Bill Summary */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Calculator size={18} color="#0D9488" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Bill Summary
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>£2,000.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>VAT (20%)</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>£450.00</span>
              </div>
              
              {/* Highlight Total GBP banner */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                background: '#ECFDF5',
                borderRadius: '8px',
                margin: '6px 0'
              }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#065F46' }}>Total (GBP)</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#065F46' }}>£2,450.00</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', paddingTop: '4px' }}>
                <span>Amount paid</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>£1,960.00</span>
              </div>

              {/* Highlight Outstanding Balance banner */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                background: '#FEF2F2',
                borderRadius: '8px',
                marginTop: '4px'
              }}>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#DC2626' }}>Outstanding balance</span>
                <span style={{ fontSize: '17px', fontWeight: 800, color: '#DC2626' }}>£490.00</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── 5. THREE COLUMN MIDDLE ROW: TAX BREAKDOWN | ACCOUNTING CODING | PAYMENT HISTORY ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.2fr) minmax(380px, 1.4fr)',
        gap: '20px',
        marginBottom: '20px'
      }}>
        
        {/* Tax Breakdown */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ color: '#F97316', fontWeight: 700, fontSize: '16px' }}>%</span>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Tax Breakdown
            </h3>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>VAT Rate</th>
                <th style={{ padding: '6px 8px', fontWeight: 600, textAlign: 'right' }}>Net Amount</th>
                <th style={{ padding: '6px 8px', fontWeight: 600, textAlign: 'right' }}>VAT Amount</th>
                <th style={{ padding: '6px 8px', fontWeight: 600, textAlign: 'right' }}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 8px', color: '#0F172A', fontWeight: 500 }}>20%</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', color: '#0F172A' }}>£2,000.00</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', color: '#0F172A' }}>£450.00</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£2,450.00</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 8px', fontWeight: 700, color: '#0F172A' }}>Total</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>£2,000.00</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>£450.00</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>£2,450.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Accounting Coding */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BookOpen size={18} color="#2563EB" weight="bold" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Accounting Coding
            </h3>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Account</th>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Description</th>
                <th style={{ padding: '6px 8px', fontWeight: 600, textAlign: 'right' }}>Amount (GBP)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 8px', color: '#0284C7', fontWeight: 600 }}>6200</td>
                <td style={{ padding: '10px 8px', color: '#0F172A' }}>IT Equipment</td>
                <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£2,250.00</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 8px', color: '#0284C7', fontWeight: 600 }}>7410</td>
                <td style={{ padding: '10px 8px', color: '#0F172A' }}>IT Support & Maintenance</td>
                <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£200.00</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 8px', fontWeight: 700, color: '#0F172A' }}>Total</td>
                <td></td>
                <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>£2,450.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment History */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={18} color="#D97706" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Payment History
                </h3>
              </div>
              <button 
                onClick={() => setIsRecordPaymentOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#0284C7',
                  cursor: 'pointer'
                }}
              >
                <CreditCard size={13} />
                <span>Record payment</span>
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                  <th style={{ padding: '6px 8px', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '6px 8px', fontWeight: 600 }}>Reference</th>
                  <th style={{ padding: '6px 8px', fontWeight: 600 }}>Method</th>
                  <th style={{ padding: '6px 8px', fontWeight: 600, textAlign: 'right' }}>Amount (GBP)</th>
                  <th style={{ padding: '6px 8px', fontWeight: 600, textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 8px', color: '#64748B' }}>28 Apr 2025</td>
                  <td style={{ padding: '10px 8px' }}>
                    <Link href="#" style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 500 }}>PAY-2025-0841</Link>
                  </td>
                  <td style={{ padding: '10px 8px', color: '#64748B' }}>Bank Transfer</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£1,470.00</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600 }}>Completed</span>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 8px', color: '#64748B' }}>02 May 2025</td>
                  <td style={{ padding: '10px 8px' }}>
                    <Link href="#" style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 500 }}>PAY-2025-0872</Link>
                  </td>
                  <td style={{ padding: '10px 8px', color: '#64748B' }}>Bank Transfer</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£490.00</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600 }}>Completed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'right', paddingTop: '12px', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
            £1,960.00
          </div>
        </div>

      </div>

      {/* ── 6. BOTTOM ROW: ATTACHED DOCUMENTS & ACTIVITY / AUDIT TRAIL ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(420px, 1.1fr) minmax(500px, 1.4fr)',
        gap: '20px',
        marginBottom: '28px'
      }}>
        
        {/* Left: Attached Documents */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Paperclip size={18} color="#0284C7" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Attached Documents
              </h3>
            </div>
            <button 
              onClick={() => showToast('Document upload dialog opened')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#0284C7',
                cursor: 'pointer'
              }}
            >
              <UploadSimple size={14} weight="bold" />
              <span>Upload document</span>
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Uploaded by</th>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Size</th>
                <th style={{ padding: '6px 4px', width: '20px' }}></th>
              </tr>
            </thead>
            <tbody>
              {/* Doc 1 */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FilePdf size={16} color="#DC2626" weight="fill" />
                    <span style={{ color: '#0284C7', fontWeight: 500, cursor: 'pointer' }}>Supplier_Bill_0187.pdf</span>
                  </div>
                </td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>Invoice</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>Sarah Clarke</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>15 Apr 2025</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>245 KB</td>
                <td style={{ padding: '10px 4px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={16} />
                  </button>
                </td>
              </tr>

              {/* Doc 2 */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FilePdf size={16} color="#DC2626" weight="fill" />
                    <span style={{ color: '#0284C7', fontWeight: 500, cursor: 'pointer' }}>Purchase_Order_PO-44881.pdf</span>
                  </div>
                </td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>Purchase Order</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>Sarah Clarke</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>10 Apr 2025</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>180 KB</td>
                <td style={{ padding: '10px 4px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={16} />
                  </button>
                </td>
              </tr>

              {/* Doc 3 */}
              <tr>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FilePdf size={16} color="#DC2626" weight="fill" />
                    <span style={{ color: '#0284C7', fontWeight: 500, cursor: 'pointer' }}>Delivery_Note_DN-7762.pdf</span>
                  </div>
                </td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>Delivery Note</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>Sarah Clarke</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>15 Apr 2025</td>
                <td style={{ padding: '10px 8px', color: '#64748B' }}>120 KB</td>
                <td style={{ padding: '10px 4px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right: Activity & Audit Trail (Horizontal Timeline) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
            <ClockCounterClockwise size={18} color="#0F172A" weight="bold" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Activity & Audit Trail
            </h3>
          </div>

          {/* Timeline steps */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
            
            {/* Step 1: Approved */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#DCFCE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16A34A',
                flexShrink: 0
              }}>
                <CheckCircle size={20} weight="fill" />
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>Supplier bill approved</div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>John Doe</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>29 Apr 2025, 10:24</div>
              </div>
            </div>

            {/* Dotted separator */}
            <div style={{ height: '1px', borderTop: '2px dotted #E2E8F0', flex: 0.3, marginTop: '16px' }}></div>

            {/* Step 2: Payment Recorded 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1.2 }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#E0F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7',
                flexShrink: 0
              }}>
                <CreditCard size={18} weight="bold" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Payment recorded</div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  £490.00 via Bank Transfer<br />
                  <span style={{ color: '#0284C7' }}>(PAY-2025-0872)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Sarah Clarke</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>02 May 2025, 14:15</div>
              </div>
            </div>

            {/* Dotted separator */}
            <div style={{ height: '1px', borderTop: '2px dotted #E2E8F0', flex: 0.3, marginTop: '16px' }}></div>

            {/* Step 3: Payment Recorded 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1.2 }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#E0F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7',
                flexShrink: 0
              }}>
                <CreditCard size={18} weight="bold" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Payment recorded</div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  £1,470.00 via Bank Transfer<br />
                  <span style={{ color: '#0284C7' }}>(PAY-2025-0841)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Sarah Clarke</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>28 Apr 2025, 09:32</div>
              </div>
            </div>

            {/* Dotted separator */}
            <div style={{ height: '1px', borderTop: '2px dotted #E2E8F0', flex: 0.3, marginTop: '16px' }}></div>

            {/* Step 4: Bill Created */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#F3E8FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9333EA',
                flexShrink: 0
              }}>
                <FileText size={18} weight="fill" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Supplier bill created</div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>BILL-2025-0187</div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Sarah Clarke</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>15 Apr 2025, 11:20</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Record Payment Interactive Modal */}
      {isRecordPaymentOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            width: '460px',
            maxWidth: '90%',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Record Payment</h3>
              <button 
                onClick={() => setIsRecordPaymentOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Recording settlement for bill <strong>BILL-2025-0187</strong> (Tech Suppliers Ltd).
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Payment Amount (£)</label>
              <input 
                type="text" 
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#0F172A'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Payment Method</label>
              <select style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#0F172A',
                background: '#FFFFFF'
              }}>
                <option>Bank Transfer (Barclays Bank PLC)</option>
                <option>Corporate Debit Card</option>
                <option>Cheque</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setIsRecordPaymentOpen(false)}
                style={{
                  padding: '8px 16px',
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsRecordPaymentOpen(false);
                  showToast(`Payment of £${paymentAmount} recorded successfully!`);
                }}
                style={{
                  padding: '8px 18px',
                  background: '#006666',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
