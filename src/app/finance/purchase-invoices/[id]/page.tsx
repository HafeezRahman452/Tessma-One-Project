'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PencilSimple,
  CreditCard,
  DownloadSimple,
  EnvelopeSimple,
  DotsThreeVertical,
  FileText,
  Building,
  User,
  CheckCircle,
  Clock,
  Plus,
  UploadSimple,
  Trash,
  Check,
  X,
  FilePdf,
  Tag,
  Receipt
} from '@phosphor-icons/react';

export default function SupplierBillDetailPage() {
  const router = useRouter();

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Line items
  const [lineItems, setLineItems] = useState([
    {
      id: 1,
      name: 'Laptops - Dell XPS 13',
      sub: 'Business laptops for admin team',
      qty: 5,
      unitPrice: '£400.00',
      vat: '20%',
      amount: '£2,000.00',
    },
    {
      id: 2,
      name: 'Laptop Carry Cases',
      sub: 'Protective cases',
      qty: 5,
      unitPrice: '£30.00',
      vat: '20%',
      amount: '£150.00',
    },
    {
      id: 3,
      name: 'Extended Warranty',
      sub: '3 year on-site support',
      qty: 5,
      unitPrice: '£50.00',
      vat: '20%',
      amount: '£250.00',
    },
  ]);

  // Payment History
  const [payments, setPayments] = useState([
    {
      date: '28 Apr 2025',
      ref: 'PAY-2025-0841',
      method: 'Bank Transfer',
      amount: '£1,470.00',
      status: 'Completed',
    },
    {
      date: '02 May 2025',
      ref: 'PAY-2025-0872',
      method: 'Bank Transfer',
      amount: '£490.00',
      status: 'Completed',
    },
  ]);

  // Documents
  const [documents, setDocuments] = useState([
    { name: 'Supplier_Bill_0187.pdf', type: 'Invoice', uploadedBy: 'Sarah Clarke', date: '15 Apr 2025', size: '245 KB' },
    { name: 'Purchase_Order_PO-44881.pdf', type: 'Purchase Order', uploadedBy: 'Sarah Clarke', date: '10 Apr 2025', size: '180 KB' },
    { name: 'Delivery_Note_DN-7762.pdf', type: 'Delivery Note', uploadedBy: 'Sarah Clarke', date: '15 Apr 2025', size: '120 KB' },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* 1. TOP HEADER & ACTIONS */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Supplier Bill Detail
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            View and manage the details of this supplier bill, including lines, payments, and accounting information.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowEditModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <PencilSimple size={15} />
            <span>Edit</span>
          </button>

          <button
            onClick={() => setShowRecordPaymentModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 14px',
              borderRadius: '8px',
              border: 'none',
              background: '#0F766E',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <CreditCard size={15} weight="bold" />
            <span>Record payment</span>
          </button>

          <button
            onClick={() => alert('Downloading PDF...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <DownloadSimple size={15} />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => alert('Sending email...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <EnvelopeSimple size={15} />
            <span>Email</span>
          </button>

          <button
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <DotsThreeVertical size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* 2. MAIN BILL HEADER SUMMARY CARD */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {/* Left: Red File Icon + Supplier info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              background: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FileText size={24} weight="fill" />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Tech Suppliers Ltd
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748B', marginTop: '3px' }}>
              <span>SUP-001</span>
              <span>•</span>
              <span>VAT GB987654321</span>
            </div>
          </div>
        </div>

        {/* Right metrics strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Bill Number</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', marginTop: '3px' }}>
              BILL-2025-0187
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Bill Date</div>
            <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A', marginTop: '3px' }}>
              15 Apr 2025
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Due Date</div>
            <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A', marginTop: '3px' }}>
              15 May 2025
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748B' }}>(30 days)</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Total Amount</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
              £2,450.00
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748B' }}>(inc. VAT)</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Outstanding</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#DC2626', marginTop: '2px' }}>
              £490.00
            </div>
            <div style={{ fontSize: '10.5px', color: '#DC2626' }}>Part paid (80%)</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Payment Status</div>
            <div style={{ marginTop: '4px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  background: '#ECFDF5',
                  color: '#059669',
                  fontSize: '11.5px',
                  fontWeight: 500,
                }}
              >
                <CheckCircle size={13} weight="fill" />
                Part paid
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Approval Status</div>
            <div style={{ marginTop: '4px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  background: '#ECFDF5',
                  color: '#059669',
                  fontSize: '11.5px',
                  fontWeight: 500,
                }}
              >
                <CheckCircle size={13} weight="fill" />
                Approved
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. THREE COLUMNS: Supplier Details, Billing Information, Contact Information */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '20px' }}>
        
        {/* Supplier Details */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="#059669" weight="fill" />
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Supplier Details</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', fontSize: '12.5px' }}>
            <div style={{ color: '#334155', lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>Tech Suppliers Ltd</div>
              <div>45 Technology Park</div>
              <div>Solutions Drive</div>
              <div>Manchester</div>
              <div>M1 2AB</div>
              <div>United Kingdom</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ color: '#64748B', fontSize: '11.5px' }}>Supplier Code</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>SUP-001</div>
              </div>
              <div>
                <span style={{ color: '#64748B', fontSize: '11.5px' }}>VAT Number</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>GB987654321</div>
              </div>
              <div>
                <span style={{ color: '#64748B', fontSize: '11.5px' }}>Contact Email</span>
                <div style={{ color: '#0284C7' }}>accounts@techsuppliers.co.uk</div>
              </div>
              <div>
                <span style={{ color: '#64748B', fontSize: '11.5px' }}>Phone</span>
                <div style={{ color: '#0F172A' }}>+44 161 234 5678</div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#059669" weight="fill" />
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Billing Information</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', fontSize: '12.5px' }}>
            <div style={{ color: '#334155', lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>ABC Ltd</div>
              <div>123 Business Park</div>
              <div>Innovation Drive</div>
              <div>London SW1 1AA</div>
              <div>United Kingdom</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ color: '#64748B', fontSize: '11.5px' }}>VAT Number</span>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>GB123456789</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="#059669" weight="fill" />
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Contact Information</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '12.5px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <User size={16} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>James Wilson</div>
              <div style={{ color: '#64748B', fontSize: '11.5px' }}>Account Manager</div>
              <div style={{ color: '#0284C7', marginTop: '6px' }}>james.wilson@techsuppliers.co.uk</div>
              <div style={{ color: '#64748B', marginTop: '2px' }}>+44 161 234 5678</div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. LINE ITEMS (Left) & BILL SUMMARY (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Left: Line Items Table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#059669" weight="fill" />
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Line Items</h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontSize: '11.5px', fontWeight: 600 }}>
                  <th style={{ padding: '8px 10px 8px 0', width: '30px' }}>#</th>
                  <th style={{ padding: '8px 10px' }}>Description</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Unit price</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>VAT</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Amount (GBP)</th>
                  <th style={{ padding: '8px 0 8px 10px', width: '30px', textAlign: 'center' }}></th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <td style={{ padding: '12px 10px 12px 0', color: '#64748B' }}>{item.id}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ fontWeight: 600, color: '#0F172A' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{item.sub}</div>
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', color: '#334155' }}>{item.qty}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'right', color: '#334155' }}>{item.unitPrice}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', color: '#334155' }}>{item.vat}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{item.amount}</td>
                    <td style={{ padding: '12px 0 12px 10px', textAlign: 'center', color: '#94A3B8' }}>
                      <DotsThreeVertical size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Bill Summary */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#059669" weight="fill" />
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Bill Summary</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>£2,000.00</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>VAT (20%)</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>£450.00</span>
            </div>

            <div style={{ height: '1px', background: '#F1F5F9', margin: '4px 0' }} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px',
                fontWeight: 700,
                color: '#0F172A',
                background: '#F0FDF4',
                padding: '10px 12px',
                borderRadius: '8px',
              }}
            >
              <span>Total (GBP)</span>
              <span>£2,450.00</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', marginTop: '6px' }}>
              <span>Amount paid</span>
              <span style={{ fontWeight: 600, color: '#059669' }}>£1,960.00</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#DC2626', fontWeight: 700 }}>
              <span>Outstanding balance</span>
              <span>£490.00</span>
            </div>
          </div>
        </div>

      </div>

      {/* 5. TAX BREAKDOWN, ACCOUNTING CODING, PAYMENT HISTORY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.3fr', gap: '20px' }}>
        
        {/* Tax Breakdown */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, color: '#F59E0B' }}>%</span>
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Tax Breakdown</h3>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontWeight: 600 }}>
                <th style={{ padding: '6px 8px 6px 0' }}>VAT Rate</th>
                <th style={{ padding: '6px 8px' }}>Net Amount</th>
                <th style={{ padding: '6px 8px' }}>VAT Amount</th>
                <th style={{ padding: '6px 0 6px 8px', textAlign: 'right' }}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F8FAFC' }}>
                <td style={{ padding: '8px 8px 8px 0', color: '#334155' }}>20%</td>
                <td style={{ padding: '8px' }}>£2,000.00</td>
                <td style={{ padding: '8px' }}>£450.00</td>
                <td style={{ padding: '8px 0 8px 8px', textAlign: 'right', fontWeight: 600 }}>£2,450.00</td>
              </tr>
              <tr style={{ fontWeight: 700 }}>
                <td style={{ padding: '10px 8px 6px 0', color: '#0F172A' }}>Total</td>
                <td style={{ padding: '10px 8px 6px 8px' }}>£2,000.00</td>
                <td style={{ padding: '10px 8px 6px 8px' }}>£450.00</td>
                <td style={{ padding: '10px 0 6px 8px', textAlign: 'right' }}>£2,450.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Accounting Coding */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#0284C7" weight="fill" />
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Accounting Coding</h3>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontWeight: 600 }}>
                <th style={{ padding: '6px 8px 6px 0' }}>Account</th>
                <th style={{ padding: '6px 8px' }}>Description</th>
                <th style={{ padding: '6px 0 6px 8px', textAlign: 'right' }}>Amount (GBP)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F8FAFC' }}>
                <td style={{ padding: '8px 8px 8px 0', color: '#334155' }}>6200</td>
                <td style={{ padding: '8px' }}>IT Equipment</td>
                <td style={{ padding: '8px 0 8px 8px', textAlign: 'right' }}>£2,250.00</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F8FAFC' }}>
                <td style={{ padding: '8px 8px 8px 0', color: '#334155' }}>7410</td>
                <td style={{ padding: '8px' }}>IT Support &amp; Maintenance</td>
                <td style={{ padding: '8px 0 8px 8px', textAlign: 'right' }}>£200.00</td>
              </tr>
              <tr style={{ fontWeight: 700 }}>
                <td style={{ padding: '10px 8px 6px 0', color: '#0F172A' }}>Total</td>
                <td style={{ padding: '10px 8px 6px 8px' }}></td>
                <td style={{ padding: '10px 0 6px 8px', textAlign: 'right' }}>£2,450.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment History */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="#EA580C" weight="fill" />
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Payment History</h3>
            </div>
            <button
              onClick={() => setShowRecordPaymentModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#0284C7',
                cursor: 'pointer',
              }}
            >
              <CreditCard size={13} />
              <span>Record payment</span>
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontWeight: 600 }}>
                <th style={{ padding: '6px 8px 6px 0' }}>Date</th>
                <th style={{ padding: '6px 8px' }}>Reference</th>
                <th style={{ padding: '6px 8px' }}>Method</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Amount (GBP)</th>
                <th style={{ padding: '6px 0 6px 8px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pm, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '8px 8px 8px 0', color: '#64748B' }}>{pm.date}</td>
                  <td style={{ padding: '8px', color: '#0284C7', fontWeight: 600 }}>{pm.ref}</td>
                  <td style={{ padding: '8px', color: '#475569' }}>{pm.method}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{pm.amount}</td>
                  <td style={{ padding: '8px 0 8px 8px', textAlign: 'center' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '999px', background: '#ECFDF5', color: '#059669', fontSize: '11px', fontWeight: 500 }}>
                      {pm.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700 }}>
                <td style={{ padding: '10px 8px 6px 0', color: '#0F172A' }}>Total</td>
                <td style={{ padding: '10px 8px 6px 8px' }}></td>
                <td style={{ padding: '10px 8px 6px 8px' }}></td>
                <td style={{ padding: '10px 8px 6px 8px', textAlign: 'right' }}>£1,960.00</td>
                <td style={{ padding: '10px 0 6px 8px' }}></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* 6. BOTTOM ROW: Attached Documents (Left) & Activity & Audit Trail (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '20px' }}>
        
        {/* Attached Documents */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FilePdf size={18} color="#0284C7" weight="fill" />
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Attached Documents</h3>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                height: '30px',
                padding: '0 10px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#0284C7',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <UploadSimple size={13} weight="bold" />
              <span>Upload document</span>
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontWeight: 600 }}>
                <th style={{ padding: '6px 8px 6px 0' }}>Name</th>
                <th style={{ padding: '6px 8px' }}>Type</th>
                <th style={{ padding: '6px 8px' }}>Uploaded by</th>
                <th style={{ padding: '6px 8px' }}>Date</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Size</th>
                <th style={{ padding: '6px 0 6px 8px', width: '20px' }}></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '10px 8px 10px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FilePdf size={15} color="#DC2626" />
                      <span style={{ color: '#0284C7', fontWeight: 600 }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 8px', color: '#475569' }}>{doc.type}</td>
                  <td style={{ padding: '10px 8px', color: '#64748B' }}>{doc.uploadedBy}</td>
                  <td style={{ padding: '10px 8px', color: '#64748B' }}>{doc.date}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right', color: '#64748B' }}>{doc.size}</td>
                  <td style={{ padding: '10px 0 10px 8px', textAlign: 'center', color: '#94A3B8' }}>
                    <DotsThreeVertical size={15} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity & Audit Trail */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#059669" weight="fill" />
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Activity &amp; Audit Trail</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 10px', position: 'relative' }}>
            
            {/* Step 1: Supplier bill approved */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={18} weight="fill" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>Supplier bill approved</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>John Doe</div>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>29 Apr 2025, 10:24</div>
              </div>
            </div>

            {/* Step 2: Payment recorded 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={18} weight="fill" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>Payment recorded</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>£490.00 via Bank Transfer (PAY-2025-0872)</div>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>Sarah Clarke • 02 May 2025, 14:15</div>
              </div>
            </div>

            {/* Step 3: Payment recorded 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={18} weight="fill" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>Payment recorded</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>£1,470.00 via Bank Transfer (PAY-2025-0841)</div>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>Sarah Clarke • 28 Apr 2025, 09:32</div>
              </div>
            </div>

            {/* Step 4: Supplier bill created */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} weight="fill" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>Supplier bill created</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>BILL-2025-0187</div>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>Sarah Clarke • 15 Apr 2025, 11:20</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* MODAL: EDIT BILL */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Edit Bill BILL-2025-0187</h3>
              <button onClick={() => setShowEditModal(false)}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Due Date</label>
                <input type="date" defaultValue="2025-05-15" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Internal Notes</label>
                <textarea defaultValue="Approved by finance board on 29 Apr." rows={3} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowEditModal(false)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#475569', fontSize: '12.5px', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => { alert('Saved changes!'); setShowEditModal(false); }} style={{ padding: '8px 18px', borderRadius: '6px', background: '#0F766E', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600 }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RECORD PAYMENT */}
      {showRecordPaymentModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '480px', padding: '24px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Record Payment</h3>
              <button onClick={() => setShowRecordPaymentModal(false)}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Remaining Balance</label>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#DC2626' }}>£490.00</div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Payment Amount (GBP) *</label>
                <input defaultValue="£490.00" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Payment Method</label>
                <select style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                  <option>Bank Transfer</option>
                  <option>Direct Debit</option>
                  <option>Company Card</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowRecordPaymentModal(false)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#475569', fontSize: '12.5px', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => { alert('Payment recorded!'); setShowRecordPaymentModal(false); }} style={{ padding: '8px 18px', borderRadius: '6px', background: '#0F766E', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600 }}>Confirm Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD DOCUMENT */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '460px', padding: '24px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Upload Document</h3>
              <button onClick={() => setShowUploadModal(false)}><X size={18} /></button>
            </div>
            <div style={{ border: '2px dashed #CBD5E1', borderRadius: '8px', padding: '30px 20px', textAlign: 'center', cursor: 'pointer' }}>
              <UploadSimple size={32} color="#64748B" />
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginTop: '10px' }}>Click to browse or drag and drop files</div>
              <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '4px' }}>PDF, DOCX, PNG up to 10MB</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowUploadModal(false)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#475569', fontSize: '12.5px', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => { alert('Document uploaded!'); setShowUploadModal(false); }} style={{ padding: '8px 18px', borderRadius: '6px', background: '#0F766E', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600 }}>Upload</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
