'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Coins,
  BookOpen,
  FileText,
  Calendar,
  TrendUp,
  TrendDown,
  DotsThreeVertical,
  CaretRight,
  User,
  Receipt,
  CreditCard,
  Clock,
  Bank,
  Percent,
  ArrowsLeftRight,
  ArrowsClockwise,
  Scales,
  ChartPie,
  Building,
  UploadSimple,
  CheckCircle,
  UsersThree,
  Notebook,
  ArrowUpRight,
  Sparkle,
  X
} from '@phosphor-icons/react';

export default function FinanceOverviewPage() {
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showNewBillModal, setShowNewBillModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // Sample Recent Invoices matching screenshot
  const [invoices] = useState([
    { id: 'INV-2025-0423', customer: 'ABC Ltd', issueDate: '15 Apr 2025', dueDate: '15 May 2025', amount: '£16,320.00', status: 'Sent' },
    { id: 'INV-2025-0422', customer: 'Global Solutions', issueDate: '14 Apr 2025', dueDate: '14 May 2025', amount: '£8,400.00', status: 'Overdue' },
    { id: 'INV-2025-0421', customer: 'Riverside Group', issueDate: '12 Apr 2025', dueDate: '12 May 2025', amount: '£4,800.00', status: 'Paid' },
    { id: 'INV-2025-0419', customer: 'City Council', issueDate: '10 Apr 2025', dueDate: '10 May 2025', amount: '£12,000.00', status: 'Paid' },
    { id: 'INV-2025-0418', customer: 'Acme Ltd', issueDate: '08 Apr 2025', dueDate: '08 May 2025', amount: '£6,750.00', status: 'Draft' },
  ]);

  // Sample Recent Bills matching screenshot
  const [bills] = useState([
    { id: 'BILL-2025-0187', supplier: 'Tech Suppliers Ltd', billDate: '15 Apr 2025', dueDate: '15 May 2025', amount: '£2,450.00', status: 'Awaiting approval' },
    { id: 'BILL-2025-0186', supplier: 'Office Solutions', billDate: '14 Apr 2025', dueDate: '14 May 2025', amount: '£1,200.00', status: 'Approved' },
    { id: 'BILL-2025-0185', supplier: 'Cloud Services Ltd', billDate: '12 Apr 2025', dueDate: '12 May 2025', amount: '£980.00', status: 'Awaiting approval' },
    { id: 'BILL-2025-0184', supplier: 'Facilities Group', billDate: '10 Apr 2025', dueDate: '10 May 2025', amount: '£3,600.00', status: 'Paid' },
    { id: 'BILL-2025-0183', supplier: 'Marketing Co', billDate: '08 Apr 2025', dueDate: '08 May 2025', amount: '£1,750.00', status: 'On hold' },
  ]);

  // Invoice status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
      case 'Approved':
        return (
          <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#DCFCE7', color: '#166534', fontSize: '11.5px', fontWeight: 600 }}>
            {status}
          </span>
        );
      case 'Sent':
        return (
          <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#E0F2FE', color: '#0369A1', fontSize: '11.5px', fontWeight: 600 }}>
            Sent
          </span>
        );
      case 'Overdue':
        return (
          <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#FEE2E2', color: '#991B1B', fontSize: '11.5px', fontWeight: 600 }}>
            Overdue
          </span>
        );
      case 'Awaiting approval':
        return (
          <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#FEF3C7', color: '#92400E', fontSize: '11.5px', fontWeight: 600 }}>
            Awaiting approval
          </span>
        );
      case 'On hold':
        return (
          <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#F3E8FF', color: '#6B21A8', fontSize: '11.5px', fontWeight: 600 }}>
            On hold
          </span>
        );
      case 'Draft':
      default:
        return (
          <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#F1F5F9', color: '#475569', fontSize: '11.5px', fontWeight: 600 }}>
            Draft
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '30px' }}>
      
      {/* 1. TOP TITLE HEADER BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Finance Overview
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            Manage your financial operations, monitor performance and access key finance functions.
          </p>
        </div>

        {/* Action Buttons: + New Invoice & + Enter a bill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowNewInvoiceModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '38px',
              padding: '0 16px',
              borderRadius: '8px',
              background: '#0B63E5',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(11, 99, 229, 0.25)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0252C7')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0B63E5')}
          >
            <Plus size={16} weight="bold" />
            <span>New Invoice</span>
          </button>

          <button
            onClick={() => setShowNewBillModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '38px',
              padding: '0 16px',
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#0F172A',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            <Plus size={16} weight="bold" />
            <span>Enter a bill</span>
          </button>
        </div>
      </div>

      {/* 2. TOP CONFIG/METRIC STRIP (4 Summary Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
        {/* Card 1: Base currency */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', flexShrink: 0 }}>
            <Coins size={22} weight="regular" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Base currency</div>
            <div style={{ fontSize: '14.5px', color: '#0F172A', fontWeight: 700, marginTop: '2px' }}>GBP - British Pound</div>
          </div>
        </div>

        {/* Card 2: Accounting basis */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', flexShrink: 0 }}>
            <BookOpen size={22} weight="regular" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Accounting basis</div>
            <div style={{ fontSize: '14.5px', color: '#0F172A', fontWeight: 700, marginTop: '2px' }}>Accrual</div>
          </div>
        </div>

        {/* Card 3: VAT scheme */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', flexShrink: 0 }}>
            <FileText size={22} weight="regular" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>VAT scheme</div>
            <div style={{ fontSize: '14.5px', color: '#0F172A', fontWeight: 700, marginTop: '2px' }}>Standard accrual</div>
          </div>
        </div>

        {/* Card 4: Books live since */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', flexShrink: 0 }}>
            <Calendar size={22} weight="regular" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Books live since</div>
            <div style={{ fontSize: '14.5px', color: '#0F172A', fontWeight: 700, marginTop: '2px' }}>01 Jan 2024</div>
          </div>
        </div>
      </div>

      {/* 3. KEY FINANCIAL KPI CARDS (4 Main Metric Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        
        {/* Card 1: Outstanding Receivables */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#00C853', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <Coins size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Outstanding Receivables</span>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>£92,460</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
                <TrendUp size={14} weight="bold" />
                <span>12%</span>
                <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
              </div>
            </div>
          </div>

          {/* Mini Bar Chart graphic */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '48px', alignSelf: 'flex-end' }}>
            <div style={{ width: '8px', height: '18px', background: '#A7F3D0', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '28px', background: '#A7F3D0', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '20px', background: '#A7F3D0', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '38px', background: '#34D399', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '48px', background: '#10B981', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 2: Invoices by Status */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#1D64EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <FileText size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Invoices by Status</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontWeight: 600, color: '#0F172A' }}>32</span>
                <span style={{ color: '#64748B' }}>Paid</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ fontWeight: 600, color: '#0F172A' }}>10</span>
                <span style={{ color: '#64748B' }}>Overdue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748B' }} />
                <span style={{ fontWeight: 600, color: '#0F172A' }}>6</span>
                <span style={{ color: '#64748B' }}>Draft</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Graphic */}
          <div style={{ position: 'relative', width: '72px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="72" height="72" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
              {/* Background circle */}
              <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="4" />
              {/* Paid segment (green) */}
              <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="60 100" strokeDashoffset="0" />
              {/* Overdue segment (red) */}
              <circle cx="18" cy="18" r="14" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="18 100" strokeDashoffset="-60" />
              {/* Draft segment (grey) */}
              <circle cx="18" cy="18" r="14" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-78" />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: 1 }}>48</span>
              <span style={{ fontSize: '8px', color: '#64748B', fontWeight: 500 }}>Invoices</span>
            </div>
          </div>
        </div>

        {/* Card 3: Outstanding Payables */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <CreditCard size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Outstanding Payables</span>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>£56,340</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
                <TrendDown size={14} weight="bold" />
                <span>8%</span>
                <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
              </div>
            </div>
          </div>

          {/* Mini Bar Chart graphic (Red/Pink bars) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '48px', alignSelf: 'flex-end' }}>
            <div style={{ width: '8px', height: '36px', background: '#FECDD3', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '24px', background: '#FECDD3', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '42px', background: '#FDA4AF', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '30px', background: '#F87171', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '20px', background: '#EF4444', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 4: Bills Awaiting Approval */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <Receipt size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Bills Awaiting Approval</span>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>12</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#DC2626', fontWeight: 600 }}>
                <TrendUp size={14} weight="bold" />
                <span>33%</span>
                <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
              </div>
            </div>
          </div>

          {/* Mini Bar Chart graphic (Orange bars) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '48px', alignSelf: 'flex-end' }}>
            <div style={{ width: '8px', height: '14px', background: '#FDE68A', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '22px', background: '#FDE68A', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '32px', background: '#FCD34D', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '28px', background: '#FBBF24', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '45px', background: '#F59E0B', borderRadius: '2px' }} />
          </div>
        </div>

      </div>

      {/* 4. FINANCE MODULES QUICK ACCESS SECTION */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{ color: '#059669', display: 'flex', alignItems: 'center' }}>
            <FileText size={20} weight="regular" />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Finance Modules</h2>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginTop: '2px' }}>Quick access to all finance functions.</p>
          </div>
        </div>

        {/* 5 Columns Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
          
          {/* Column 1: Sales */}
          <div style={{ border: '1px solid #F1F5F9', borderRadius: '8px', padding: '14px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendUp size={18} weight="bold" />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Sales</div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3, marginTop: '2px' }}>Manage customer invoicing and incoming payments.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { label: 'Customers', href: '/finance/customers', icon: <User size={15} color="#2563EB" /> },
                { label: 'Sales invoices', href: '/finance/sales-invoices', icon: <FileText size={15} color="#059669" /> },
                { label: 'Credit notes', href: '/finance/credit-notes', icon: <Receipt size={15} color="#DC2626" /> },
                { label: 'Receipts', href: '/finance/payments', icon: <CreditCard size={15} color="#7C3AED" /> },
                { label: 'Receivables ageing', href: '/finance/sales-invoices', icon: <Clock size={15} color="#D97706" /> },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12.5px',
                    color: '#334155',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <CaretRight size={13} color="#94A3B8" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Purchases */}
          <div style={{ border: '1px solid #F1F5F9', borderRadius: '8px', padding: '14px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#FEE2E2', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CreditCard size={18} weight="bold" />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Purchases</div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3, marginTop: '2px' }}>Manage supplier bills and outgoing payments.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { label: 'Suppliers', href: '/finance/suppliers', icon: <UsersThree size={15} color="#2563EB" /> },
                { label: 'Supplier bills', href: '/finance/purchase-invoices', icon: <FileText size={15} color="#DC2626" /> },
                { label: 'Payments', href: '/finance/payments', icon: <CreditCard size={15} color="#059669" /> },
                { label: 'Payables ageing', href: '/finance/purchase-invoices', icon: <Clock size={15} color="#7C3AED" /> },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12.5px',
                    color: '#334155',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <CaretRight size={13} color="#94A3B8" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Ledger */}
          <div style={{ border: '1px solid #F1F5F9', borderRadius: '8px', padding: '14px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#E0F2FE', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={18} weight="bold" />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Ledger</div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3, marginTop: '2px' }}>Maintain your financial records and accounts.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { label: 'Chart of accounts', icon: <Notebook size={15} color="#0284C7" /> },
                { label: 'Financial years and periods', icon: <Calendar size={15} color="#0284C7" /> },
                { label: 'Journals', icon: <ArrowsClockwise size={15} color="#059669" /> },
                { label: 'General ledger', icon: <BookOpen size={15} color="#7C3AED" /> },
                { label: 'Trial balance', icon: <Scales size={15} color="#D97706" /> },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12.5px',
                    color: '#334155',
                    fontWeight: 500,
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <CaretRight size={13} color="#94A3B8" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Banking */}
          <div style={{ border: '1px solid #F1F5F9', borderRadius: '8px', padding: '14px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#F3E8FF', color: '#6B21A8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bank size={18} weight="bold" />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Banking</div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3, marginTop: '2px' }}>Manage bank accounts and reconciliations.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { label: 'Bank accounts', icon: <Bank size={15} color="#7C3AED" /> },
                { label: 'Bank transactions', icon: <ArrowsLeftRight size={15} color="#2563EB" /> },
                { label: 'Bank reconciliations', icon: <CheckCircle size={15} color="#059669" /> },
                { label: 'Payments', icon: <CreditCard size={15} color="#DC2626" /> },
                { label: 'Cash flow forecast', icon: <ChartPie size={15} color="#D97706" /> },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12.5px',
                    color: '#334155',
                    fontWeight: 500,
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <CaretRight size={13} color="#94A3B8" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 5: VAT & Tax */}
          <div style={{ border: '1px solid #F1F5F9', borderRadius: '8px', padding: '14px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#FEF3C7', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Percent size={18} weight="bold" />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>VAT & Tax</div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3, marginTop: '2px' }}>Manage VAT returns and tax compliance.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { label: 'VAT return', icon: <FileText size={15} color="#DC2626" /> },
                { label: 'VAT transactions', icon: <ArrowsLeftRight size={15} color="#059669" /> },
                { label: 'VAT settings', icon: <Building size={15} color="#0284C7" /> },
                { label: 'EC sales list', icon: <Building size={15} color="#2563EB" /> },
                { label: 'Making Tax Digital', icon: <UploadSimple size={15} color="#7C3AED" /> },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12.5px',
                    color: '#334155',
                    fontWeight: 500,
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <CaretRight size={13} color="#94A3B8" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 5. DATA TABLES (Recent Invoices & Recent Bills) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
        
        {/* Left Table: Recent Invoices */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="#059669" weight="regular" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Recent Invoices</h3>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View all</span>
              <ArrowUpRight size={14} weight="bold" />
            </button>
          </div>

          {/* Invoices Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontSize: '11.5px', fontWeight: 600 }}>
                  <th style={{ padding: '8px 10px 8px 0' }}>Invoice No.</th>
                  <th style={{ padding: '8px 10px' }}>Customer</th>
                  <th style={{ padding: '8px 10px' }}>Issue Date</th>
                  <th style={{ padding: '8px 10px' }}>Due Date</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '8px 0 8px 10px', textAlign: 'right' }}></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    onClick={() => setSelectedRecord({ type: 'Invoice', ...inv })}
                    style={{ borderBottom: '1px solid #F8FAFC', cursor: 'pointer', transition: 'background 0.12s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '10px 10px 10px 0', color: '#2563EB', fontWeight: 600 }}>{inv.id}</td>
                    <td style={{ padding: '10px', color: '#1E293B', fontWeight: 500 }}>{inv.customer}</td>
                    <td style={{ padding: '10px', color: '#64748B' }}>{inv.issueDate}</td>
                    <td style={{ padding: '10px', color: '#64748B' }}>{inv.dueDate}</td>
                    <td style={{ padding: '10px', color: '#0F172A', fontWeight: 600, textAlign: 'right' }}>{inv.amount}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{renderStatusBadge(inv.status)}</td>
                    <td style={{ padding: '10px 0 10px 10px', textAlign: 'right', color: '#94A3B8' }}>
                      <DotsThreeVertical size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Table: Recent Bills */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="#DC2626" weight="regular" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Recent Bills</h3>
            </div>
            <Link href="/finance/purchase-invoices" style={{ textDecoration: 'none', color: '#0284C7', fontSize: '12.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View all</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          {/* Bills Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontSize: '11.5px', fontWeight: 600 }}>
                  <th style={{ padding: '8px 10px 8px 0' }}>Bill No.</th>
                  <th style={{ padding: '8px 10px' }}>Supplier</th>
                  <th style={{ padding: '8px 10px' }}>Bill Date</th>
                  <th style={{ padding: '8px 10px' }}>Due Date</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '8px 0 8px 10px', textAlign: 'right' }}></th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr
                    key={bill.id}
                    onClick={() => setSelectedRecord({ type: 'Bill', ...bill })}
                    style={{ borderBottom: '1px solid #F8FAFC', cursor: 'pointer', transition: 'background 0.12s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '10px 10px 10px 0', color: '#2563EB', fontWeight: 600 }}>{bill.id}</td>
                    <td style={{ padding: '10px', color: '#1E293B', fontWeight: 500 }}>{bill.supplier}</td>
                    <td style={{ padding: '10px', color: '#64748B' }}>{bill.billDate}</td>
                    <td style={{ padding: '10px', color: '#64748B' }}>{bill.dueDate}</td>
                    <td style={{ padding: '10px', color: '#0F172A', fontWeight: 600, textAlign: 'right' }}>{bill.amount}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{renderStatusBadge(bill.status)}</td>
                    <td style={{ padding: '10px 0 10px 10px', textAlign: 'right', color: '#94A3B8' }}>
                      <DotsThreeVertical size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL: NEW INVOICE */}
      {showNewInvoiceModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '520px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={18} weight="bold" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Create New Sales Invoice</h3>
              </div>
              <button onClick={() => setShowNewInvoiceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Invoice generated successfully!'); setShowNewInvoiceModal(false); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Customer Name</label>
                  <input type="text" defaultValue="Acme Ltd" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Issue Date</label>
                    <input type="date" defaultValue="2025-04-18" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Due Date</label>
                    <input type="date" defaultValue="2025-05-18" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Total Amount (£)</label>
                  <input type="text" defaultValue="5,400.00" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px' }}>
                <button type="button" onClick={() => setShowNewInvoiceModal(false)} style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 20px', borderRadius: '6px', border: 'none', background: '#0B63E5', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Save & Send Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ENTER A BILL */}
      {showNewBillModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '520px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEE2E2', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={18} weight="bold" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Enter Supplier Bill</h3>
              </div>
              <button onClick={() => setShowNewBillModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Bill recorded successfully!'); setShowNewBillModal(false); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Supplier Name</label>
                  <input type="text" defaultValue="Tech Suppliers Ltd" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Bill Date</label>
                    <input type="date" defaultValue="2025-04-18" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Due Date</label>
                    <input type="date" defaultValue="2025-05-18" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Bill Amount (£)</label>
                  <input type="text" defaultValue="2,450.00" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px' }}>
                <button type="button" onClick={() => setShowNewBillModal(false)} style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 20px', borderRadius: '6px', border: 'none', background: '#0F172A', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Submit for Approval</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECORD DETAIL PREVIEW */}
      {selectedRecord && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '480px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{selectedRecord.type} Details</span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{selectedRecord.id}</h3>
              </div>
              <button onClick={() => setSelectedRecord(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>{selectedRecord.type === 'Invoice' ? 'Customer' : 'Supplier'}</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedRecord.customer || selectedRecord.supplier}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Date</span>
                <span style={{ color: '#0F172A' }}>{selectedRecord.issueDate || selectedRecord.billDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Due Date</span>
                <span style={{ color: '#0F172A' }}>{selectedRecord.dueDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '4px' }}>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Amount</span>
                <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '15px' }}>{selectedRecord.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748B' }}>Status</span>
                <div>{renderStatusBadge(selectedRecord.status)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setSelectedRecord(null)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Close
              </button>
              <Link
                href={selectedRecord.type === 'Invoice' ? `/finance/sales-invoices` : `/finance/purchase-invoices/${selectedRecord.id}`}
                onClick={() => setSelectedRecord(null)}
                style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', background: '#0F766E', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>View Full Detail</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
