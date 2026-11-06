'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  CalendarBlank,
  CheckCircle,
  Plus,
      DownloadSimple,
  DotsThreeVertical,
  DotsThree,
  MagnifyingGlass,
  Check,
  TrendUp,
  FileText,
  Calendar,
  HourglassMedium
} from '@phosphor-icons/react';

interface JournalRow {
  id: string;
  journalNo: string;
  date: string;
  description: string;
  source: 'Payroll' | 'Manual' | 'Sales' | 'Purchases' | 'Banking' | 'Recurring' | 'Reversing';
  period: string;
  totalDebit: string;
  totalCredit: string;
  status: 'Posted' | 'Draft' | 'Scheduled';
  createdBy: { initials: string; name: string };
  lastUpdated: string;
}

const JOURNALS_DATA: JournalRow[] = [
  {
    id: '1',
    journalNo: 'JRN-2025-0428',
    date: '28 Apr 2025',
    description: 'Monthly payroll accrual',
    source: 'Payroll',
    period: 'Apr 2025',
    totalDebit: '£125,430.00',
    totalCredit: '£125,430.00',
    status: 'Posted',
    createdBy: { initials: 'JS', name: 'Jane Smith' },
    lastUpdated: '28 Apr 2025, 14:32'
  },
  {
    id: '2',
    journalNo: 'JRN-2025-0427',
    date: '27 Apr 2025',
    description: 'Office rent accrual',
    source: 'Manual',
    period: 'Apr 2025',
    totalDebit: '£12,500.00',
    totalCredit: '£12,500.00',
    status: 'Posted',
    createdBy: { initials: 'MK', name: 'Michael Khan' },
    lastUpdated: '27 Apr 2025, 11:18'
  },
  {
    id: '3',
    journalNo: 'JRN-2025-0426',
    date: '26 Apr 2025',
    description: 'Sales invoice batch',
    source: 'Sales',
    period: 'Apr 2025',
    totalDebit: '£348,220.00',
    totalCredit: '£348,220.00',
    status: 'Posted',
    createdBy: { initials: 'LT', name: 'Laura Taylor' },
    lastUpdated: '26 Apr 2025, 16:04'
  },
  {
    id: '4',
    journalNo: 'JRN-2025-0425',
    date: '25 Apr 2025',
    description: 'Purchase invoice batch',
    source: 'Purchases',
    period: 'Apr 2025',
    totalDebit: '£287,410.00',
    totalCredit: '£287,410.00',
    status: 'Posted',
    createdBy: { initials: 'AP', name: 'Alex Patel' },
    lastUpdated: '25 Apr 2025, 10:11'
  },
  {
    id: '5',
    journalNo: 'JRN-2025-0424',
    date: '24 Apr 2025',
    description: 'Bank charges',
    source: 'Banking',
    period: 'Apr 2025',
    totalDebit: '£1,240.00',
    totalCredit: '£1,240.00',
    status: 'Posted',
    createdBy: { initials: 'SC', name: 'Sarah Collins' },
    lastUpdated: '24 Apr 2025, 09:42'
  },
  {
    id: '6',
    journalNo: 'JRN-2025-0423',
    date: '23 Apr 2025',
    description: 'Intercompany recharge',
    source: 'Manual',
    period: 'Apr 2025',
    totalDebit: '£15,000.00',
    totalCredit: '£15,000.00',
    status: 'Draft',
    createdBy: { initials: 'JD', name: 'John Doe' },
    lastUpdated: '23 Apr 2025, 15:20'
  },
  {
    id: '7',
    journalNo: 'JRN-2025-0422',
    date: '22 Apr 2025',
    description: 'Depreciation charge',
    source: 'Recurring',
    period: 'Apr 2025',
    totalDebit: '£42,760.00',
    totalCredit: '£42,760.00',
    status: 'Posted',
    createdBy: { initials: 'MK', name: 'Michael Khan' },
    lastUpdated: '22 Apr 2025, 08:33'
  },
  {
    id: '8',
    journalNo: 'JRN-2025-0421',
    date: '21 Apr 2025',
    description: 'VAT adjustment',
    source: 'Manual',
    period: 'Apr 2025',
    totalDebit: '£6,430.00',
    totalCredit: '£6,430.00',
    status: 'Posted',
    createdBy: { initials: 'LT', name: 'Laura Taylor' },
    lastUpdated: '21 Apr 2025, 14:17'
  },
  {
    id: '9',
    journalNo: 'JRN-2025-0420',
    date: '20 Apr 2025',
    description: 'Year-end accrual reversal',
    source: 'Reversing',
    period: 'Apr 2025',
    totalDebit: '£98,200.00',
    totalCredit: '£98,200.00',
    status: 'Scheduled',
    createdBy: { initials: 'AP', name: 'Alex Patel' },
    lastUpdated: '20 Apr 2025, 11:06'
  },
  {
    id: '10',
    journalNo: 'JRN-2025-0419',
    date: '19 Apr 2025',
    description: 'Adjustment entry',
    source: 'Manual',
    period: 'Apr 2025',
    totalDebit: '£3,650.00',
    totalCredit: '£3,650.00',
    status: 'Draft',
    createdBy: { initials: 'SC', name: 'Sarah Collins' },
    lastUpdated: '19 Apr 2025, 09:55'
  }
];

export default function JournalListPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'posted' | 'recurring' | 'reversing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState('All periods');
  const [sourceFilter, setSourceFilter] = useState('All sources');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === JOURNALS_DATA.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(JOURNALS_DATA.map(j => j.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const getStatusBadge = (status: JournalRow['status']) => {
    switch (status) {
      case 'Posted':
        return { bg: '#DCFCE7', color: '#15803D' };
      case 'Draft':
        return { bg: '#E0F2FE', color: '#0284C7' };
      case 'Scheduled':
        return { bg: '#FEF3C7', color: '#D97706' };
      default:
        return { bg: '#F1F5F9', color: '#475569' };
    }
  };

  const filteredData = JOURNALS_DATA.filter(j => {
    if (activeTab === 'draft' && j.status !== 'Draft') return false;
    if (activeTab === 'posted' && j.status !== 'Posted') return false;
    if (activeTab === 'recurring' && j.source !== 'Recurring') return false;
    if (activeTab === 'reversing' && j.source !== 'Reversing') return false;
    if (searchQuery && !j.journalNo.toLowerCase().includes(searchQuery.toLowerCase()) && !j.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ padding: '0 0 48px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast */}
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
            <Link href="/finance/ledger/chart-of-accounts" style={{ color: '#64748B', textDecoration: 'none' }}>Ledger</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Journals</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Journals List
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            View and manage all accounting journals, including manual, recurring and reversing entries.
          </p>
        </div>

        {/* Top Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link 
            href="/designs/new-journal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#0284C7',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#FFFFFF',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} weight="bold" />
            <span>New journal</span>
          </Link>

          <button 
            onClick={() => showToast('Import journals dialog')}
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
            <span>⬆ Import</span>
          </button>

          <button 
            onClick={() => showToast('Export journals (Excel/CSV)...')}
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
            <span>⬇ Export</span>
          </button>

          <button 
            onClick={() => showToast('More journal settings')}
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

      {/* ── 2. 4 SUMMARY KPI CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '24px' }}>
        
        {/* Card 1: Total journals this month */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                <FileText size={18} weight="bold" />
              </div>
              <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Total journals this month</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>48</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>
              <span>↑ 14%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini green bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
            <div style={{ width: '6px', height: '14px', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '22px', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '18px', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '28px', background: '#4ADE80', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '34px', background: '#22C55E', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 2: Draft journals */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
                <FileText size={18} weight="bold" />
              </div>
              <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Draft journals</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>8</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 700, marginTop: '4px' }}>
              <span>↑ 33%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini purple bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
            <div style={{ width: '6px', height: '18px', background: '#D8B4FE', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '12px', background: '#D8B4FE', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '24px', background: '#C084FC', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '20px', background: '#C084FC', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '30px', background: '#A855F7', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 3: Posted value (this month) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                <span>🗄</span>
              </div>
              <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Posted value (this month)</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>£1,240,850</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>
              <span>↑ 18%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini blue bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
            <div style={{ width: '6px', height: '16px', background: '#93C5FD', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '24px', background: '#93C5FD', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '20px', background: '#60A5FA', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '30px', background: '#3B82F6', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '36px', background: '#2563EB', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 4: Scheduled reversals */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                <CalendarBlank size={18} weight="bold" />
              </div>
              <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Scheduled reversals</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>6</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>
              <span>↑ 50%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini orange bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
            <div style={{ width: '6px', height: '14px', background: '#FCD34D', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '22px', background: '#FCD34D', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '18px', background: '#FBBF24', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '26px', background: '#F59E0B', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '34px', background: '#D97706', borderRadius: '2px' }} />
          </div>
        </div>

      </div>

      {/* ── 3. FILTER & SEARCH TABS CONTAINER ── */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
        
        {/* Sub-navigation Status Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          {[
            { id: 'all', label: 'All (156)' },
            { id: 'draft', label: 'Draft (18)' },
            { id: 'posted', label: 'Posted (112)' },
            { id: 'recurring', label: 'Recurring (16)' },
            { id: 'reversing', label: 'Reversing (10)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === tab.id ? '#0284C7' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '12.5px',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Bar Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '16px' }}>
          
          {/* Date Range */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            color: '#334155',
            background: '#FFFFFF'
          }}>
            <CalendarBlank size={15} color="#64748B" />
            <span>01 Apr 2025 – 30 Apr 2025</span>
            <CaretDown size={12} color="#64748B" />
          </div>

          {/* Period */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            color: '#334155',
            background: '#FFFFFF'
          }}>
            <span style={{ color: '#64748B' }}>Period</span>
            <select 
              value={periodFilter} 
              onChange={(e) => setPeriodFilter(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '12px', color: '#0F172A', background: 'transparent', cursor: 'pointer' }}
            >
              <option>All periods</option>
              <option>Apr 2025</option>
              <option>Mar 2025</option>
            </select>
          </div>

          {/* Source */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            color: '#334155',
            background: '#FFFFFF'
          }}>
            <span style={{ color: '#64748B' }}>Source</span>
            <select 
              value={sourceFilter} 
              onChange={(e) => setSourceFilter(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '12px', color: '#0F172A', background: 'transparent', cursor: 'pointer' }}
            >
              <option>All sources</option>
              <option>Manual</option>
              <option>Payroll</option>
              <option>Sales</option>
              <option>Purchases</option>
              <option>Banking</option>
            </select>
          </div>

          {/* Search box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            background: '#FFFFFF',
            flex: 1,
            minWidth: '220px'
          }}>
            <MagnifyingGlass size={15} color="#94A3B8" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by journal number, description or reference..."
              style={{ border: 'none', outline: 'none', fontSize: '12px', color: '#0F172A', width: '100%' }}
            />
          </div>

          <button 
            onClick={() => {
              setSearchQuery('');
              setPeriodFilter('All periods');
              setSourceFilter('All sources');
              showToast('Filters cleared');
            }}
            style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
          >
            Clear filters
          </button>
        </div>

        {/* ── 4. TABLE OF JOURNALS ── */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                <th style={{ padding: '8px 10px', width: '30px' }}>
                  <input 
                    type="checkbox"
                    checked={selectedRows.length === JOURNALS_DATA.length}
                    onChange={toggleSelectAll}
                    style={{ accentColor: '#006666', cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Journal No. ^v</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Date ^v</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Description ^v</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Source ^v</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Period ^v</th>
                <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 600 }}>Total Debit ^v</th>
                <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 600 }}>Total Credit ^v</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Status ^v</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Created By ^v</th>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>Last Updated ^v</th>
                <th style={{ padding: '8px 6px', width: '20px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => {
                const badge = getStatusBadge(row.status);
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
                      <Link href="/designs/new-journal" style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 600 }}>
                        {row.journalNo}
                      </Link>
                    </td>
                    <td style={{ padding: '12px 10px', color: '#64748B' }}>{row.date}</td>
                    <td style={{ padding: '12px 10px', color: '#0F172A', fontWeight: 500 }}>{row.description}</td>
                    <td style={{ padding: '12px 10px', color: '#64748B' }}>{row.source}</td>
                    <td style={{ padding: '12px 10px', color: '#64748B' }}>{row.period}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{row.totalDebit}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{row.totalCredit}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{
                        background: badge.bg,
                        color: badge.color,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'inline-block'
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#E2E8F0',
                          color: '#475569',
                          fontSize: '10px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {row.createdBy.initials}
                        </div>
                        <span style={{ color: '#334155' }}>{row.createdBy.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 10px', color: '#64748B' }}>{row.lastUpdated}</td>
                    <td style={{ padding: '12px 6px', textAlign: 'center' }}>
                      <button 
                        onClick={() => showToast(`Actions for ${row.journalNo}`)}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '18px', fontSize: '12px', color: '#64748B' }}>
          <div>Showing 1–10 of 156 journals</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#64748B', cursor: 'pointer' }}>&lt;</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #0284C7', background: '#0284C7', borderRadius: '6px', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}>1</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>2</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>3</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>4</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>5</button>
              <span style={{ padding: '0 4px' }}>...</span>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>16</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #CBD5E1', background: '#FFFFFF', borderRadius: '6px', color: '#64748B', cursor: 'pointer' }}>&gt;</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Rows per page</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px', background: '#FFFFFF' }}>
                <span>10</span>
                <CaretDown size={12} color="#64748B" />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
