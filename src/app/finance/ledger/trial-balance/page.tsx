'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Buildings,
  BookOpen,
  ArrowsLeftRight,
  Printer,
  DotsThree,
  DownloadSimple,
  CaretDown,
  MagnifyingGlass,
  CheckCircle,
  TrendUp,
  TrendDown,
  Coins,
  CreditCard,
  Scales,
  UsersThree,
} from '@phosphor-icons/react';

interface TrialBalanceRow {
  code: string;
  name: string;
  opening: number;
  debits: number;
  credits: number;
  closing: number;
  prior: number;
  variance: number;
  varianceDir: 'up' | 'down';
}

export default function TrialBalancePage() {
  const [financialPeriod, setFinancialPeriod] = useState('Apr 2025');
  const [legalEntity, setLegalEntity] = useState('Acme Ltd (UK)');
  const [reportingBasis, setReportingBasis] = useState('Statutory (Accrual)');
  const [comparisonPeriod, setComparisonPeriod] = useState('Mar 2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof TrialBalanceRow>('code');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const rawRows: TrialBalanceRow[] = [
    {
      code: '1000',
      name: 'Fixed Assets',
      opening: 1250000.0,
      debits: 12500.0,
      credits: 0.0,
      closing: 1262500.0,
      prior: 1250000.0,
      variance: 12500.0,
      varianceDir: 'up',
    },
    {
      code: '1100',
      name: 'Accumulated Depreciation',
      opening: -450000.0,
      debits: 0.0,
      credits: 18750.0,
      closing: -468750.0,
      prior: -450000.0,
      variance: -18750.0,
      varianceDir: 'down',
    },
    {
      code: '1200',
      name: 'Intangible Assets',
      opening: 220000.0,
      debits: 5000.0,
      credits: 0.0,
      closing: 225000.0,
      prior: 220000.0,
      variance: 5000.0,
      varianceDir: 'up',
    },
    {
      code: '2000',
      name: 'Inventory',
      opening: 180400.0,
      debits: 224300.0,
      credits: 210450.0,
      closing: 194250.0,
      prior: 180400.0,
      variance: 13850.0,
      varianceDir: 'up',
    },
    {
      code: '2100',
      name: 'Trade Receivables',
      opening: 342600.0,
      debits: 315200.0,
      credits: 289700.0,
      closing: 368100.0,
      prior: 342600.0,
      variance: 25500.0,
      varianceDir: 'up',
    },
    {
      code: '2200',
      name: 'Cash at Bank',
      opening: 95400.0,
      debits: 1420600.0,
      credits: 1398300.0,
      closing: 117700.0,
      prior: 95400.0,
      variance: 22300.0,
      varianceDir: 'up',
    },
    {
      code: '3000',
      name: 'Trade Payables',
      opening: -276800.0,
      debits: 198200.0,
      credits: 232400.0,
      closing: -311000.0,
      prior: -276800.0,
      variance: -34200.0,
      varianceDir: 'down',
    },
    {
      code: '3100',
      name: 'Accruals',
      opening: -48600.0,
      debits: 25400.0,
      credits: 31800.0,
      closing: -55000.0,
      prior: -48600.0,
      variance: -6400.0,
      varianceDir: 'down',
    },
    {
      code: '4000',
      name: 'Revenue',
      opening: -1020500.0,
      debits: 0.0,
      credits: 485600.0,
      closing: -1506100.0,
      prior: -1020500.0,
      variance: -485600.0,
      varianceDir: 'down',
    },
    {
      code: '5000',
      name: 'Cost of Sales',
      opening: 412300.0,
      debits: 412300.0,
      credits: 0.0,
      closing: 824600.0,
      prior: 412300.0,
      variance: 412300.0,
      varianceDir: 'up',
    },
    {
      code: '6000',
      name: 'Administrative Expenses',
      opening: 286400.0,
      debits: 286400.0,
      credits: 0.0,
      closing: 572800.0,
      prior: 286400.0,
      variance: 286400.0,
      varianceDir: 'up',
    },
    {
      code: '7000',
      name: 'Finance Costs',
      opening: 18330.0,
      debits: 18330.0,
      credits: 0.0,
      closing: 36660.0,
      prior: 18330.0,
      variance: 18330.0,
      varianceDir: 'up',
    },
    {
      code: '8000',
      name: 'Taxation',
      opening: -19630.0,
      debits: 0.0,
      credits: 19630.0,
      closing: 0.0,
      prior: -19630.0,
      variance: 19630.0,
      varianceDir: 'up',
    },
  ];

  // Format currency with standard accounting style (negatives in parentheses)
  const formatAmount = (val: number, includeCurrency = false) => {
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    const formatted = absVal.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const prefix = includeCurrency ? '£' : '';
    if (isNeg) {
      return `(${prefix}${formatted})`;
    }
    return `${prefix}${formatted}`;
  };

  const handleSort = (col: keyof TrialBalanceRow) => {
    if (sortColumn === col) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(col);
      setSortDirection('asc');
    }
  };

  const filteredRows = useMemo(() => {
    return rawRows
      .filter((r) => {
        const q = searchQuery.toLowerCase();
        return r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
      })
      .sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      });
  }, [searchQuery, sortColumn, sortDirection]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100%', background: '#F8FAFC', paddingBottom: '40px' }}>
      
      {/* 1. PAGE HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Trial Balance
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            View the trial balance for the selected period and verify that total debits and credits are in balance.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 12px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <DownloadSimple size={15} color="#475569" />
            <span>Export</span>
            <CaretDown size={11} color="#64748B" />
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 14px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <ArrowsLeftRight size={15} color="#475569" />
            <span>Compare periods</span>
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 12px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <Printer size={15} color="#475569" />
            <span>Print</span>
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              height: '36px',
              padding: '0 10px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <DotsThree size={18} weight="bold" color="#475569" />
            <span>More</span>
          </button>
        </div>
      </div>

      {/* 2. FILTER ROW STRIP */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(160px, 1fr)) auto auto',
          gap: '14px',
          alignItems: 'flex-end',
        }}
      >
        {/* Financial period */}
        <div>
          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
            Financial period
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '36px',
              padding: '0 10px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              fontSize: '12.5px',
              color: '#0F172A',
            }}
          >
            <Calendar size={15} color="#0284C7" />
            <select
              value={financialPeriod}
              onChange={(e) => setFinancialPeriod(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12.5px', color: '#0F172A', cursor: 'pointer' }}
            >
              <option>Apr 2025</option>
              <option>Mar 2025</option>
              <option>Feb 2025</option>
              <option>Jan 2025</option>
            </select>
          </div>
        </div>

        {/* Legal entity */}
        <div>
          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
            Legal entity
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '36px',
              padding: '0 10px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              fontSize: '12.5px',
              color: '#0F172A',
            }}
          >
            <Buildings size={15} color="#0284C7" />
            <select
              value={legalEntity}
              onChange={(e) => setLegalEntity(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12.5px', color: '#0F172A', cursor: 'pointer' }}
            >
              <option>Acme Ltd (UK)</option>
              <option>Acme US Inc</option>
              <option>Acme Global Holdings</option>
            </select>
          </div>
        </div>

        {/* Reporting basis */}
        <div>
          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
            Reporting basis
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '36px',
              padding: '0 10px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              fontSize: '12.5px',
              color: '#0F172A',
            }}
          >
            <BookOpen size={15} color="#0284C7" />
            <select
              value={reportingBasis}
              onChange={(e) => setReportingBasis(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12.5px', color: '#0F172A', cursor: 'pointer' }}
            >
              <option>Statutory (Accrual)</option>
              <option>Cash Basis</option>
              <option>Management Accounts</option>
            </select>
          </div>
        </div>

        {/* Comparison period */}
        <div>
          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
            Comparison period
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '36px',
              padding: '0 10px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              fontSize: '12.5px',
              color: '#0F172A',
            }}
          >
            <Calendar size={15} color="#0284C7" />
            <select
              value={comparisonPeriod}
              onChange={(e) => setComparisonPeriod(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12.5px', color: '#0F172A', cursor: 'pointer' }}
            >
              <option>Mar 2025</option>
              <option>Feb 2025</option>
              <option>Jan 2025</option>
              <option>Same Period Last Year</option>
            </select>
          </div>
        </div>

        {/* Apply Button */}
        <div>
          <button
            style={{
              height: '36px',
              padding: '0 24px',
              borderRadius: '6px',
              border: 'none',
              background: '#0284C7',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(2, 132, 199, 0.25)',
            }}
          >
            Apply
          </button>
        </div>

        {/* Reset Button */}
        <div>
          <button
            onClick={() => {
              setFinancialPeriod('Apr 2025');
              setLegalEntity('Acme Ltd (UK)');
              setReportingBasis('Statutory (Accrual)');
              setComparisonPeriod('Mar 2025');
              setSearchQuery('');
            }}
            style={{
              height: '36px',
              padding: '0 20px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#475569',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* 3. FOUR KPI SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        
        {/* Card 1: Total Debits */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Coins size={18} weight="fill" color="#16A34A" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Total Debits</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              £1,240,530
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>0%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. Mar 2025</span>
            </div>
          </div>
          {/* Vertical Green Bars SVG */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '38px' }}>
            <div style={{ width: '7px', height: '40%', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '65%', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '85%', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '100%', background: '#4ADE80', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '55%', background: '#86EFAC', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 2: Total Credits */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <CreditCard size={18} weight="fill" color="#DC2626" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Total Credits</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              £1,240,530
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>0%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. Mar 2025</span>
            </div>
          </div>
          {/* Vertical Red/Coral Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '38px' }}>
            <div style={{ width: '7px', height: '40%', background: '#FCA5A5', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '60%', background: '#FCA5A5', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '80%', background: '#FCA5A5', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '100%', background: '#F87171', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '55%', background: '#FCA5A5', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 3: Variance */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Scales size={18} weight="fill" color="#9333EA" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Variance</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              £0
            </div>
            <div style={{ marginTop: '6px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 9px',
                  borderRadius: '12px',
                  background: '#DCFCE7',
                  color: '#16A34A',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                <CheckCircle size={13} weight="fill" color="#16A34A" />
                <span>Balanced</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Number of Accounts */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <UsersThree size={18} weight="fill" color="#0284C7" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Number of Accounts</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              128
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>0%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. Mar 2025</span>
            </div>
          </div>
          {/* Vertical Blue Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '38px' }}>
            <div style={{ width: '7px', height: '40%', background: '#93C5FD', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '70%', background: '#93C5FD', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '90%', background: '#60A5FA', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '55%', background: '#93C5FD', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '100%', background: '#3B82F6', borderRadius: '2px' }} />
          </div>
        </div>

      </div>

      {/* 4. MAIN DATA TABLE CARD */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        {/* Card Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={16} weight="bold" />
            </div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Trial Balance
              </h2>
              <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                As at 30 Apr 2025 • Acme Ltd (UK) • Statutory (Accrual)
              </div>
            </div>
          </div>

          {/* Search accounts box */}
          <div style={{ position: 'relative', width: '260px' }}>
            <MagnifyingGlass size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '32px',
                paddingLeft: '30px',
                paddingRight: '10px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                color: '#0F172A',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 600 }}>
                <th
                  onClick={() => handleSort('code')}
                  style={{ padding: '10px 16px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Account Code ⇅
                </th>
                <th
                  onClick={() => handleSort('name')}
                  style={{ padding: '10px 16px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Account Name ⇅
                </th>
                <th
                  onClick={() => handleSort('opening')}
                  style={{ padding: '10px 16px', textAlign: 'right', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Opening Balance (£) ⇅
                </th>
                <th
                  onClick={() => handleSort('debits')}
                  style={{ padding: '10px 16px', textAlign: 'right', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Debits (£) ⇅
                </th>
                <th
                  onClick={() => handleSort('credits')}
                  style={{ padding: '10px 16px', textAlign: 'right', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Credits (£) ⇅
                </th>
                <th
                  onClick={() => handleSort('closing')}
                  style={{ padding: '10px 16px', textAlign: 'right', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Closing Balance (£) ⇅
                </th>
                <th
                  onClick={() => handleSort('prior')}
                  style={{ padding: '10px 16px', textAlign: 'right', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Mar 2025 (£) ⇅
                </th>
                <th
                  onClick={() => handleSort('variance')}
                  style={{ padding: '10px 16px', textAlign: 'right', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Variance (£) ⇅
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr
                  key={row.code}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '10px 16px', color: '#0284C7', fontWeight: 600 }}>
                    {row.code}
                  </td>
                  <td style={{ padding: '10px 16px', color: '#0F172A', fontWeight: 500 }}>
                    {row.name}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', color: '#334155' }}>
                    {formatAmount(row.opening)}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', color: '#334155' }}>
                    {formatAmount(row.debits)}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', color: '#334155' }}>
                    {formatAmount(row.credits)}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                    {formatAmount(row.closing)}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', color: '#64748B' }}>
                    {formatAmount(row.prior)}
                  </td>
                  <td
                    style={{
                      padding: '10px 16px',
                      textAlign: 'right',
                      fontWeight: 600,
                      color: row.varianceDir === 'up' ? '#16A34A' : '#DC2626',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      {row.varianceDir === 'up' ? (
                        <TrendUp size={12} weight="bold" />
                      ) : (
                        <TrendDown size={12} weight="bold" />
                      )}
                      <span>{formatAmount(row.variance)}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer Total Summary Row */}
            <tfoot>
              <tr
                style={{
                  background: '#F8FAFC',
                  borderTop: '2px solid #E2E8F0',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#0F172A',
                }}
              >
                <td style={{ padding: '14px 16px' }}>Total</td>
                <td style={{ padding: '14px 16px' }}></td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>£0.00</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', color: '#0F172A' }}>£2,603,230.00</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', color: '#0F172A' }}>£2,603,230.00</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>£0.00</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>£0.00</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: '#DCFCE7',
                      color: '#16A34A',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle size={13} weight="fill" color="#16A34A" />
                    <span>£0.00 (Balanced)</span>
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
