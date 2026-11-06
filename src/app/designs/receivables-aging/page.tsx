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
  TrendUp,
  CreditCard,
  Clock,
  CalendarBlank,
  WarningCircle,
  HourglassMedium,
  User,
  Buildings,
  DotsThreeVertical,
  DotsThree,
  ArrowSquareOut
} from '@phosphor-icons/react';

interface CustomerAgingRow {
  id: string;
  customer: string;
  legalEntity: string;
  accountManager: string;
  current: string;
  days1_30: string;
  days31_60: string;
  days61_90: string;
  over90Days: string;
  totalOutstanding: string;
  oldestInvoice: string;
  chaseStatus: 'On track' | 'High priority' | 'Overdue > 60d' | 'Chase scheduled' | 'Overdue > 90d';
}

const CUSTOMER_DATA: CustomerAgingRow[] = [
  {
    id: '1',
    customer: 'ABC Ltd',
    legalEntity: 'ABC Ltd',
    accountManager: 'John Doe',
    current: '£12,450',
    days1_30: '£8,200',
    days31_60: '£5,800',
    days61_90: '£2,000',
    over90Days: '£0',
    totalOutstanding: '£28,450',
    oldestInvoice: '12 Mar 2025',
    chaseStatus: 'On track'
  },
  {
    id: '2',
    customer: 'Global Tech Solutions',
    legalEntity: 'ABC Ltd',
    accountManager: 'Sarah Clarke',
    current: '£5,200',
    days1_30: '£22,400',
    days31_60: '£18,600',
    days61_90: '£12,000',
    over90Days: '£25,800',
    totalOutstanding: '£84,000',
    oldestInvoice: '18 Jan 2025',
    chaseStatus: 'High priority'
  },
  {
    id: '3',
    customer: 'Innovation Partners',
    legalEntity: 'ABC Ltd',
    accountManager: 'Michael Kelly',
    current: '£48,600',
    days1_30: '£12,000',
    days31_60: '£6,400',
    days61_90: '£0',
    over90Days: '£0',
    totalOutstanding: '£67,000',
    oldestInvoice: '02 Apr 2025',
    chaseStatus: 'On track'
  },
  {
    id: '4',
    customer: 'Retail Systems Ltd',
    legalEntity: 'ABC Ltd',
    accountManager: 'Emma Wilson',
    current: '£0',
    days1_30: '£8,450',
    days31_60: '£14,200',
    days61_90: '£20,600',
    over90Days: '£16,800',
    totalOutstanding: '£60,050',
    oldestInvoice: '05 Feb 2025',
    chaseStatus: 'Overdue > 60d'
  },
  {
    id: '5',
    customer: 'City Council',
    legalEntity: 'ABC Ltd',
    accountManager: 'James Parker',
    current: '£102,300',
    days1_30: '£0',
    days31_60: '£0',
    days61_90: '£0',
    over90Days: '£0',
    totalOutstanding: '£102,300',
    oldestInvoice: '28 Apr 2025',
    chaseStatus: 'On track'
  },
  {
    id: '6',
    customer: 'Acme Industries',
    legalEntity: 'ABC Ltd',
    accountManager: 'Lisa Brown',
    current: '£18,200',
    days1_30: '£15,400',
    days31_60: '£22,200',
    days61_90: '£18,400',
    over90Days: '£26,000',
    totalOutstanding: '£100,200',
    oldestInvoice: '10 Jan 2025',
    chaseStatus: 'High priority'
  },
  {
    id: '7',
    customer: 'Northern Supplies',
    legalEntity: 'ABC Ltd',
    accountManager: 'Tom Harris',
    current: '£37,130',
    days1_30: '£6,800',
    days31_60: '£20,020',
    days61_90: '£11,180',
    over90Days: '£0',
    totalOutstanding: '£75,130',
    oldestInvoice: '22 Feb 2025',
    chaseStatus: 'Chase scheduled'
  },
  {
    id: '8',
    customer: 'Digital Marketing Co',
    legalEntity: 'ABC Ltd',
    accountManager: 'Sophie Turner',
    current: '£0',
    days1_30: '£25,170',
    days31_60: '£0',
    days61_90: '£0',
    over90Days: '£42,820',
    totalOutstanding: '£67,990',
    oldestInvoice: '14 Jan 2025',
    chaseStatus: 'Overdue > 90d'
  }
];

export default function ReceivablesAgingPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [legalEntity, setLegalEntity] = useState('ABC Ltd');
  const [customerFilter, setCustomerFilter] = useState('All customers');
  const [asAtDate, setAsAtDate] = useState('30 Apr 2025');
  const [accountManager, setAccountManager] = useState('All managers');
  const [agingBasis, setAgingBasis] = useState('Invoice date');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === CUSTOMER_DATA.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(CUSTOMER_DATA.map(d => d.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: CustomerAgingRow['chaseStatus']) => {
    switch (status) {
      case 'On track':
        return { bg: '#DCFCE7', color: '#15803D' };
      case 'High priority':
        return { bg: '#FEE2E2', color: '#DC2626' };
      case 'Overdue > 60d':
      case 'Overdue > 90d':
        return { bg: '#FEE2E2', color: '#EF4444' };
      case 'Chase scheduled':
        return { bg: '#FEF3C7', color: '#D97706' };
      default:
        return { bg: '#F1F5F9', color: '#475569' };
    }
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

      {/* ── 1. BREADCRUMB & HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Receivables Ageing</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Receivables Ageing
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Analyse outstanding customer receivables and track ageing by time bucket.
          </p>
        </div>

        {/* Top Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Date Range Picker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '12.5px',
            fontWeight: 500,
            color: '#334155',
            cursor: 'pointer'
          }}>
            <CalendarBlank size={16} color="#64748B" />
            <span>01 Apr 2025 – 30 Apr 2025</span>
            <CaretDown size={14} color="#64748B" />
          </div>

          {/* Export ageing button */}
          <button 
            onClick={() => showToast('Exporting Receivables Ageing report (Excel/PDF)...')}
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
            <DownloadSimple size={16} weight="bold" />
            <span>Export ageing</span>
          </button>
        </div>
      </div>

      {/* ── 2. FILTER BAR ROW ── */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        {/* Legal Entity */}
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Legal entity
          </label>
          <div style={{
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF'
          }}>
            <Buildings size={16} color="#64748B" />
            <select 
              value={legalEntity}
              onChange={(e) => setLegalEntity(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
            >
              <option>ABC Ltd</option>
              <option>XYZ Global Ltd</option>
            </select>
          </div>
        </div>

        {/* Customer */}
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Customer
          </label>
          <div style={{
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF'
          }}>
            <User size={16} color="#64748B" />
            <select 
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
            >
              <option>All customers</option>
              <option>ABC Ltd</option>
              <option>Global Tech Solutions</option>
              <option>City Council</option>
            </select>
          </div>
        </div>

        {/* As at date */}
        <div style={{ flex: '1 1 160px' }}>
          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            As at date
          </label>
          <div style={{
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF'
          }}>
            <Calendar size={16} color="#64748B" />
            <span style={{ fontSize: '12.5px', color: '#0F172A', fontWeight: 500 }}>{asAtDate}</span>
          </div>
        </div>

        {/* Account manager */}
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
            Account manager
          </label>
          <div style={{
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF'
          }}>
            <User size={16} color="#64748B" />
            <select 
              value={accountManager}
              onChange={(e) => setAccountManager(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
            >
              <option>All managers</option>
              <option>John Doe</option>
              <option>Sarah Clarke</option>
              <option>Michael Kelly</option>
            </select>
          </div>
        </div>

        {/* Ageing basis */}
        <div style={{ flex: '1 1 180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
            <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>Ageing basis</label>
            <Info size={13} color="#94A3B8" />
          </div>
          <div style={{
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF'
          }}>
            <select 
              value={agingBasis}
              onChange={(e) => setAgingBasis(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
            >
              <option>Invoice date</option>
              <option>Due date</option>
            </select>
          </div>
        </div>

        {/* Filter Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <button 
            onClick={() => {
              setLegalEntity('ABC Ltd');
              setCustomerFilter('All customers');
              setAccountManager('All managers');
              setAgingBasis('Invoice date');
              showToast('Filters reset to default');
            }}
            style={{
              padding: '8px 14px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#475569',
              cursor: 'pointer'
            }}
          >
            Reset filters
          </button>

          <button 
            onClick={() => showToast('Applied ageing filters')}
            style={{
              padding: '8px 18px',
              background: '#006666',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* ── 3. 7 KPI AGEING BUCKET CARDS ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '14px',
        marginBottom: '20px'
      }}>
        {/* Card 1: Total Receivables */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
              <CreditCard size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Total Receivables</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>£542,320</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>
              <span>↑ 12%</span>
            </div>
            {/* Sparkline green */}
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none">
              <path d="M2 14L15 12L28 8L42 10L58 3" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>vs. Mar 2025</div>
        </div>

        {/* Card 2: Overdue */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
              <CreditCard size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Overdue</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#DC2626', letterSpacing: '-0.02em' }}>£318,450</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#DC2626', fontWeight: 700 }}>
              <span>↑ 8%</span>
            </div>
            {/* Sparkline red */}
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none">
              <path d="M2 14L18 10L32 12L46 6L58 4" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>vs. Mar 2025</div>
        </div>

        {/* Card 3: Current */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
              <Clock size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Current</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>£223,870</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#2563EB', fontWeight: 700 }}>
              <span>↑ 18%</span>
            </div>
            {/* Sparkline blue */}
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none">
              <path d="M2 15L16 11L30 13L44 8L58 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>vs. Mar 2025</div>
        </div>

        {/* Card 4: 1 - 30 Days */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <CalendarBlank size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>1 – 30 Days</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>£98,420</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#DC2626', fontWeight: 700 }}>
              <span>↑ 6%</span>
            </div>
            {/* Sparkline orange */}
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none">
              <path d="M2 13L15 11L30 14L45 8L58 5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>vs. Mar 2025</div>
        </div>

        {/* Card 5: 31 - 60 Days */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
              <CalendarBlank size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>31 – 60 Days</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>£87,230</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>
              <span>↑ 12%</span>
            </div>
            {/* Sparkline orange */}
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none">
              <path d="M2 14L16 12L30 14L44 8L58 4" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>vs. Mar 2025</div>
        </div>

        {/* Card 6: 61 - 90 Days */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
              <HourglassMedium size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>61 – 90 Days</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>£64,180</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>
              <span>↑ 18%</span>
            </div>
            {/* Sparkline red */}
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none">
              <path d="M2 15L16 13L30 15L44 9L58 4" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>vs. Mar 2025</div>
        </div>

        {/* Card 7: Over 90 Days */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <WarningCircle size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Over 90 Days</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>£68,620</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#DC2626', fontWeight: 700 }}>
              <span>↑ 25%</span>
            </div>
            {/* Sparkline purple */}
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none">
              <path d="M2 16L16 14L30 12L44 8L58 3" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>vs. Mar 2025</div>
        </div>
      </div>

      {/* ── 4. MIDDLE ROW: STACKED BAR CHART (LEFT) & DONUT CHART (RIGHT) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(500px, 1.6fr) minmax(380px, 1fr)', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left: Receivables Ageing Trend (Stacked Bar Chart) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Receivables Ageing Trend
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11.5px',
              color: '#334155',
              cursor: 'pointer'
            }}>
              <span>Last 6 Months</span>
              <CaretDown size={12} color="#64748B" />
            </div>
          </div>

          {/* SVG Stacked Bar Chart */}
          <div style={{ height: '220px', position: 'relative', width: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 220" preserveAspectRatio="none">
              {/* Horizontal Grid lines */}
              <line x1="50" y1="20" x2="580" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <text x="40" y="24" fill="#94A3B8" fontSize="10" textAnchor="end">£800K</text>

              <line x1="50" y1="60" x2="580" y2="60" stroke="#F1F5F9" strokeWidth="1" />
              <text x="40" y="64" fill="#94A3B8" fontSize="10" textAnchor="end">£600K</text>

              <line x1="50" y1="100" x2="580" y2="100" stroke="#F1F5F9" strokeWidth="1" />
              <text x="40" y="104" fill="#94A3B8" fontSize="10" textAnchor="end">£400K</text>

              <line x1="50" y1="140" x2="580" y2="140" stroke="#F1F5F9" strokeWidth="1" />
              <text x="40" y="144" fill="#94A3B8" fontSize="10" textAnchor="end">£200K</text>

              <line x1="50" y1="180" x2="580" y2="180" stroke="#E2E8F0" strokeWidth="1" />
              <text x="40" y="184" fill="#94A3B8" fontSize="10" textAnchor="end">£0</text>

              {/* Month 1: Nov 24 */}
              <g transform="translate(85, 0)">
                <rect x="0" y="130" width="44" height="50" fill="#2563EB" rx="1" />
                <rect x="0" y="112" width="44" height="18" fill="#F59E0B" rx="1" />
                <rect x="0" y="98" width="44" height="14" fill="#EA580C" rx="1" />
                <rect x="0" y="86" width="44" height="12" fill="#EF4444" rx="1" />
                <rect x="0" y="76" width="44" height="10" fill="#8B5CF6" rx="3" />
                <text x="22" y="200" fill="#64748B" fontSize="10" textAnchor="middle">Nov 24</text>
              </g>

              {/* Month 2: Dec 24 */}
              <g transform="translate(170, 0)">
                <rect x="0" y="132" width="44" height="48" fill="#2563EB" rx="1" />
                <rect x="0" y="114" width="44" height="18" fill="#F59E0B" rx="1" />
                <rect x="0" y="96" width="44" height="18" fill="#EA580C" rx="1" />
                <rect x="0" y="82" width="44" height="14" fill="#EF4444" rx="1" />
                <rect x="0" y="70" width="44" height="12" fill="#8B5CF6" rx="3" />
                <text x="22" y="200" fill="#64748B" fontSize="10" textAnchor="middle">Dec 24</text>
              </g>

              {/* Month 3: Jan 25 */}
              <g transform="translate(255, 0)">
                <rect x="0" y="132" width="44" height="48" fill="#2563EB" rx="1" />
                <rect x="0" y="112" width="44" height="20" fill="#F59E0B" rx="1" />
                <rect x="0" y="92" width="44" height="20" fill="#EA580C" rx="1" />
                <rect x="0" y="78" width="44" height="14" fill="#EF4444" rx="1" />
                <rect x="0" y="65" width="44" height="13" fill="#8B5CF6" rx="3" />
                <text x="22" y="200" fill="#64748B" fontSize="10" textAnchor="middle">Jan 25</text>
              </g>

              {/* Month 4: Feb 25 */}
              <g transform="translate(340, 0)">
                <rect x="0" y="126" width="44" height="54" fill="#2563EB" rx="1" />
                <rect x="0" y="105" width="44" height="21" fill="#F59E0B" rx="1" />
                <rect x="0" y="85" width="44" height="20" fill="#EA580C" rx="1" />
                <rect x="0" y="72" width="44" height="13" fill="#EF4444" rx="1" />
                <rect x="0" y="58" width="44" height="14" fill="#8B5CF6" rx="3" />
                <text x="22" y="200" fill="#64748B" fontSize="10" textAnchor="middle">Feb 25</text>
              </g>

              {/* Month 5: Mar 25 */}
              <g transform="translate(425, 0)">
                <rect x="0" y="124" width="44" height="56" fill="#2563EB" rx="1" />
                <rect x="0" y="100" width="44" height="24" fill="#F59E0B" rx="1" />
                <rect x="0" y="78" width="44" height="22" fill="#EA580C" rx="1" />
                <rect x="0" y="64" width="44" height="14" fill="#EF4444" rx="1" />
                <rect x="0" y="48" width="44" height="16" fill="#8B5CF6" rx="3" />
                <text x="22" y="200" fill="#64748B" fontSize="10" textAnchor="middle">Mar 25</text>
              </g>

              {/* Month 6: Apr 25 */}
              <g transform="translate(510, 0)">
                <rect x="0" y="122" width="44" height="58" fill="#2563EB" rx="1" />
                <rect x="0" y="96" width="44" height="26" fill="#F59E0B" rx="1" />
                <rect x="0" y="73" width="44" height="23" fill="#EA580C" rx="1" />
                <rect x="0" y="57" width="44" height="16" fill="#EF4444" rx="1" />
                <rect x="0" y="40" width="44" height="17" fill="#8B5CF6" rx="3" />
                <text x="22" y="200" fill="#64748B" fontSize="10" textAnchor="middle">Apr 25</text>
              </g>
            </svg>
          </div>

          {/* Legend items */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginTop: '12px', fontSize: '11.5px', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2563EB' }} />
              <span>Current</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
              <span>1 – 30 Days</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EA580C' }} />
              <span>31 – 60 Days</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
              <span>61 – 90 Days</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8B5CF6' }} />
              <span>Over 90 Days</span>
            </div>
          </div>
        </div>

        {/* Right: Receivables Distribution (Donut Chart & Legend Table) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0' }}>
            Receivables Distribution
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            
            {/* Donut SVG with Center Text */}
            <div style={{ position: 'relative', width: '170px', height: '170px', flexShrink: 0 }}>
              <svg width="170" height="170" viewBox="0 0 170 170">
                {/* 
                  Circumference = 2 * PI * 65 ≈ 408.4
                  Percentages:
                  - Current: 41% -> dash: 167.4
                  - 1-30: 18% -> dash: 73.5
                  - 31-60: 16% -> dash: 65.3
                  - 61-90: 12% -> dash: 49.0
                  - Over 90: 13% -> dash: 53.1
                */}
                <circle cx="85" cy="85" r="62" fill="transparent" stroke="#2563EB" strokeWidth="26"
                  strokeDasharray="167.4 241" strokeDashoffset="0" transform="rotate(-90 85 85)" />
                <circle cx="85" cy="85" r="62" fill="transparent" stroke="#F59E0B" strokeWidth="26"
                  strokeDasharray="73.5 334.9" strokeDashoffset="-167.4" transform="rotate(-90 85 85)" />
                <circle cx="85" cy="85" r="62" fill="transparent" stroke="#EA580C" strokeWidth="26"
                  strokeDasharray="65.3 343.1" strokeDashoffset="-240.9" transform="rotate(-90 85 85)" />
                <circle cx="85" cy="85" r="62" fill="transparent" stroke="#EF4444" strokeWidth="26"
                  strokeDasharray="49 359.4" strokeDashoffset="-306.2" transform="rotate(-90 85 85)" />
                <circle cx="85" cy="85" r="62" fill="transparent" stroke="#8B5CF6" strokeWidth="26"
                  strokeDasharray="53.2 355.2" strokeDashoffset="-355.2" transform="rotate(-90 85 85)" />
              </svg>

              {/* Floating Percentage Badges */}
              <div style={{ position: 'absolute', top: '75px', right: '14px', fontSize: '10px', color: '#FFFFFF', fontWeight: 700 }}>41%</div>
              <div style={{ position: 'absolute', bottom: '26px', right: '55px', fontSize: '10px', color: '#FFFFFF', fontWeight: 700 }}>18%</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '16px', fontSize: '10px', color: '#FFFFFF', fontWeight: 700 }}>16%</div>
              <div style={{ position: 'absolute', top: '55px', left: '18px', fontSize: '10px', color: '#FFFFFF', fontWeight: 700 }}>12%</div>
              <div style={{ position: 'absolute', top: '18px', left: '55px', fontSize: '10px', color: '#FFFFFF', fontWeight: 700 }}>13%</div>

              {/* Center Total Text */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                width: '90px'
              }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>£542,320</div>
                <div style={{ fontSize: '9px', color: '#64748B' }}>Total Receivables</div>
              </div>
            </div>

            {/* Right Legend Breakdown Table */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} />
                  <span style={{ color: '#475569' }}>Current</span>
                </div>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>£223,870</span>
                <span style={{ color: '#64748B', width: '30px', textAlign: 'right' }}>41%</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                  <span style={{ color: '#475569' }}>1 – 30 Days</span>
                </div>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>£98,420</span>
                <span style={{ color: '#64748B', width: '30px', textAlign: 'right' }}>18%</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EA580C' }} />
                  <span style={{ color: '#475569' }}>31 – 60 Days</span>
                </div>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>£87,230</span>
                <span style={{ color: '#64748B', width: '30px', textAlign: 'right' }}>16%</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                  <span style={{ color: '#475569' }}>61 – 90 Days</span>
                </div>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>£64,180</span>
                <span style={{ color: '#64748B', width: '30px', textAlign: 'right' }}>12%</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8B5CF6' }} />
                  <span style={{ color: '#475569' }}>Over 90 Days</span>
                </div>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>£68,620</span>
                <span style={{ color: '#64748B', width: '30px', textAlign: 'right' }}>13%</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── 5. CUSTOMER AGEING DETAIL TABLE ── */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
        
        {/* Table Top Header with Search & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Customer Ageing Detail
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '6px 12px',
              background: '#FFFFFF',
              width: '220px'
            }}>
              <MagnifyingGlass size={15} color="#94A3B8" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                style={{ border: 'none', outline: 'none', fontSize: '12px', color: '#0F172A', width: '100%' }}
              />
            </div>

            <button 
              onClick={() => showToast('Column customisation modal')}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              <DotsThree size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                <th style={{ padding: '8px 10px', width: '30px' }}>
                  <input 
                    type="checkbox"
                    checked={selectedRows.length === CUSTOMER_DATA.length}
                    onChange={toggleSelectAll}
                    style={{ accentColor: '#006666', cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Customer ^</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Legal Entity</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Account Managers</th>
                <th style={{ padding: '8px 10px', fontWeight: 600, textAlign: 'right' }}>Current</th>
                <th style={{ padding: '8px 10px', fontWeight: 600, textAlign: 'right' }}>1 – 30 Days</th>
                <th style={{ padding: '8px 10px', fontWeight: 600, textAlign: 'right' }}>31 – 60 Days</th>
                <th style={{ padding: '8px 10px', fontWeight: 600, textAlign: 'right' }}>61 – 90 Days</th>
                <th style={{ padding: '8px 10px', fontWeight: 600, textAlign: 'right' }}>Over 90 Days</th>
                <th style={{ padding: '8px 10px', fontWeight: 700, textAlign: 'right', color: '#0F172A' }}>Total Outstanding v</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Oldest Invoice</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Chase Status v</th>
                <th style={{ padding: '8px 6px', width: '20px' }}></th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMER_DATA
                .filter(row => row.customer.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((row) => {
                  const badge = getStatusBadge(row.chaseStatus);
                  const isChecked = selectedRows.includes(row.id);
                  return (
                    <tr 
                      key={row.id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        background: isChecked ? '#F0FDF4' : 'transparent',
                        transition: 'background 0.15s'
                      }}
                    >
                      <td style={{ padding: '12px 10px' }}>
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleRow(row.id)}
                          style={{ accentColor: '#006666', cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <Link href="/designs/customer-detail" style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 600 }}>
                          {row.customer}
                        </Link>
                      </td>
                      <td style={{ padding: '12px 10px', color: '#64748B' }}>{row.legalEntity}</td>
                      <td style={{ padding: '12px 10px', color: '#64748B' }}>{row.accountManager}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', color: '#0F172A', fontWeight: 500 }}>{row.current}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', color: '#0F172A', fontWeight: 500 }}>{row.days1_30}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', color: '#0F172A', fontWeight: 500 }}>{row.days31_60}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', color: '#0F172A', fontWeight: 500 }}>{row.days61_90}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', color: '#0F172A', fontWeight: 500 }}>{row.over90Days}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>{row.totalOutstanding}</td>
                      <td style={{ padding: '12px 10px', color: '#64748B' }}>{row.oldestInvoice}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{
                          background: badge.bg,
                          color: badge.color,
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 600,
                          display: 'inline-block',
                          whiteSpace: 'nowrap'
                        }}>
                          {row.chaseStatus}
                        </span>
                      </td>
                      <td style={{ padding: '12px 6px', textAlign: 'center' }}>
                        <button 
                          onClick={() => showToast(`Actions for ${row.customer}`)}
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

        {/* Pagination footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', fontSize: '12px', color: '#64748B' }}>
          <div>
            Showing 1–8 of 48 customers
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#64748B', cursor: 'pointer' }}>&lt;</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #006666', background: '#006666', borderRadius: '6px', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}>1</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>2</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>3</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>4</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#64748B', cursor: 'pointer' }}>&gt;</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px', background: '#FFFFFF' }}>
              <span>10 per page</span>
              <CaretDown size={12} color="#64748B" />
            </div>
          </div>
        </div>

      </div>

      {/* Screen Identifier bottom */}
      <div style={{ fontSize: '11px', color: '#94A3B8' }}>
        Screen 07 — Receivables Ageing
      </div>

    </div>
  );
}
