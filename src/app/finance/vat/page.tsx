'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  LockSimple,
  DownloadSimple,
  PaperPlaneTilt,
  DotsThree,
  IdentificationCard,
  Calendar,
  Clock,
  CheckCircle,
  Coins,
  CreditCard,
  ChartBar,
  WarningCircle,
  Warning,
  Info,
  ArrowRight,
  CaretRight,
  Receipt,
  TrendUp,
  TrendDown,
} from '@phosphor-icons/react';

export default function VatOverviewPage() {
  const [activeTxTab, setActiveTxTab] = useState<'all' | 'sales' | 'purchases' | 'adjustments'>('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAction = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const vatBoxes = [
    {
      box: '1',
      desc: 'VAT due in this period on sales and other outputs',
      amount: '142,380.00',
      note: 'Total output tax (standard, reduced and other rates)',
      isTotal: false,
      isNet: false,
    },
    {
      box: '2',
      desc: 'VAT due in this period on acquisitions from other EC Member States',
      amount: '2,450.00',
      note: 'EU acquisitions of goods and related VAT',
      isTotal: false,
      isNet: false,
    },
    {
      box: '3',
      desc: 'Total VAT due (the sum of boxes 1 and 2)',
      amount: '144,830.00',
      note: 'Auto calculated (1 + 2)',
      isTotal: true,
      isNet: false,
    },
    {
      box: '4',
      desc: 'VAT reclaimed in this period on purchases and other inputs',
      amount: '96,240.00',
      note: 'Total input tax (including partial exemption)',
      isTotal: false,
      isNet: false,
    },
    {
      box: '5',
      desc: 'Net VAT to be paid to HMRC or reclaimed by you',
      amount: '46,140.00',
      note: 'Auto calculated (3 - 4)',
      isTotal: false,
      isNet: true,
    },
    {
      box: '6',
      desc: 'Total value of sales and other outputs (excluding VAT)',
      amount: '711,900.00',
      note: 'Value of all taxable supplies (excl. VAT)',
      isTotal: false,
      isNet: false,
    },
    {
      box: '7',
      desc: 'Total value of purchases and other inputs (excluding VAT)',
      amount: '481,200.00',
      note: 'Value of all inputs (excl. VAT)',
      isTotal: false,
      isNet: false,
    },
    {
      box: '8',
      desc: 'Total value of all supplies of goods and related costs, excluding VAT',
      amount: '32,450.00',
      note: 'Exports and related costs (excl. VAT)',
      isTotal: false,
      isNet: false,
    },
    {
      box: '9',
      desc: 'Total value of all acquisitions of goods and related costs, excluding VAT',
      amount: '18,600.00',
      note: 'Acquisitions from other EC Member States (excl. VAT)',
      isTotal: false,
      isNet: false,
    },
  ];

  const sourceTransactions = [
    {
      date: '15 Jan 2025',
      type: 'Sales Invoice',
      typeDir: 'sales',
      ref: 'INV-2025-0042',
      desc: 'Acme Ltd - Consulting Services',
      net: '10,000.00',
      vat: '2,000.00',
      rate: '20%',
      box: '1',
    },
    {
      date: '17 Jan 2025',
      type: 'Purchase Invoice',
      typeDir: 'purchases',
      ref: 'BILL-2025-0187',
      desc: 'Tech Supplies Ltd - IT Equipment',
      net: '5,000.00',
      vat: '1,000.00',
      rate: '20%',
      box: '4',
    },
    {
      date: '22 Jan 2025',
      type: 'Sales Invoice',
      typeDir: 'sales',
      ref: 'INV-2025-0043',
      desc: 'Global Solutions - Software Licence',
      net: '25,000.00',
      vat: '5,000.00',
      rate: '20%',
      box: '1',
    },
    {
      date: '28 Jan 2025',
      type: 'Purchase Invoice',
      typeDir: 'purchases',
      ref: 'BILL-2025-0188',
      desc: 'Office Solutions - Stationery',
      net: '1,200.00',
      vat: '240.00',
      rate: '20%',
      box: '4',
    },
    {
      date: '03 Feb 2025',
      type: 'Sales Invoice',
      typeDir: 'sales',
      ref: 'INV-2025-0045',
      desc: 'Riverside Group - Support Services',
      net: '15,000.00',
      vat: '3,000.00',
      rate: '20%',
      box: '1',
    },
  ];

  const filteredTransactions = sourceTransactions.filter((tx) => {
    if (activeTxTab === 'all') return true;
    if (activeTxTab === 'sales') return tx.typeDir === 'sales';
    if (activeTxTab === 'purchases') return tx.typeDir === 'purchases';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100%', background: '#F8FAFC', paddingBottom: '40px' }}>
      
      {/* Toast Notification */}
      {showToast && (
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
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP HEADER & ACTION BUTTONS */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            VAT Overview / VAT Return
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            View your VAT position, manage returns and submit to HMRC.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleAction('Preparing VAT return for Q1 2025...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 16px',
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
            <FileText size={15} weight="bold" />
            <span>Prepare return</span>
          </button>

          <button
            onClick={() => handleAction('Period locked successfully.')}
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
            <LockSimple size={15} color="#475569" />
            <span>Lock period</span>
          </button>

          <button
            onClick={() => handleAction('Exporting VAT return CSV...')}
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
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => handleAction('Submitted to HMRC successfully.')}
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
            <PaperPlaneTilt size={15} color="#475569" />
            <span>Submit</span>
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

      {/* 2. TOP 5 INFO SUMMARY CARDS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
        
        {/* Card 1: VAT scheme */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={18} weight="bold" color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>VAT scheme</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', marginTop: '1px' }}>Standard VAT</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>United Kingdom (HMRC)</div>
          </div>
        </div>

        {/* Card 2: VAT registration number */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IdentificationCard size={18} weight="bold" color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>VAT registration number</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', marginTop: '1px' }}>GB 123 4567 89</div>
          </div>
        </div>

        {/* Card 3: Current period */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Calendar size={18} weight="bold" color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Current period</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '1px', whiteSpace: 'nowrap' }}>01 Jan 2025 – 31 Mar 2025</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Q1 2025</div>
          </div>
        </div>

        {/* Card 4: Due date */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Calendar size={18} weight="bold" color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Due date</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', marginTop: '1px' }}>07 May 2025</div>
            <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>(in 8 days)</div>
          </div>
        </div>

        {/* Card 5: Filing status */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={18} weight="bold" color="#D97706" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Filing status</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', marginTop: '2px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>In progress</span>
              <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#D97706', background: '#FEF3C7', padding: '2px 6px', borderRadius: '10px', whiteSpace: 'nowrap' }}>
                Not submitted
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. FOUR KPI METRIC CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        
        {/* KPI 1: Output Tax (Box 1) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Coins size={18} weight="fill" color="#16A34A" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Output Tax (Box 1)</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              £142,380
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>12%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous period</span>
            </div>
          </div>
          {/* Green vertical bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '38px' }}>
            <div style={{ width: '7px', height: '40%', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '65%', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '85%', background: '#86EFAC', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '100%', background: '#4ADE80', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '55%', background: '#86EFAC', borderRadius: '2px' }} />
          </div>
        </div>

        {/* KPI 2: Input Tax (Box 4) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <CreditCard size={18} weight="fill" color="#DC2626" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Input Tax (Box 4)</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              £96,240
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>8%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous period</span>
            </div>
          </div>
          {/* Red/Coral vertical bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '38px' }}>
            <div style={{ width: '7px', height: '40%', background: '#FCA5A5', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '60%', background: '#FCA5A5', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '80%', background: '#FCA5A5', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '100%', background: '#F87171', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '55%', background: '#FCA5A5', borderRadius: '2px' }} />
          </div>
        </div>

        {/* KPI 3: Net VAT Due (Box 5) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <ChartBar size={18} weight="fill" color="#0284C7" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Net VAT Due (Box 5)</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              £46,140
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
              <TrendDown size={13} weight="bold" />
              <span>28%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous period</span>
            </div>
          </div>
          {/* Blue vertical bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '38px' }}>
            <div style={{ width: '7px', height: '40%', background: '#93C5FD', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '70%', background: '#93C5FD', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '90%', background: '#60A5FA', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '55%', background: '#93C5FD', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '100%', background: '#3B82F6', borderRadius: '2px' }} />
          </div>
        </div>

        {/* KPI 4: Pending Adjustments */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <FileText size={18} weight="fill" color="#D97706" />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Pending Adjustments</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '-0.02em' }}>
              £2,180
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <span>3 items</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>Require attention</span>
            </div>
          </div>
          {/* Amber vertical bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '38px' }}>
            <div style={{ width: '7px', height: '35%', background: '#FCD34D', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '55%', background: '#FCD34D', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '75%', background: '#FCD34D', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '100%', background: '#F59E0B', borderRadius: '2px' }} />
            <div style={{ width: '7px', height: '60%', background: '#FCD34D', borderRadius: '2px' }} />
          </div>
        </div>

      </div>

      {/* 4. MAIN SPLIT CONTENT GRID (Left Column 62%, Right Column 38%) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(360px, 0.95fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: VAT Return Table & Source Transactions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* VAT Return – Q1 2025 Table Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={16} weight="bold" />
                </div>
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  VAT Return – Q1 2025
                </h2>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#0284C7', background: '#E0F2FE', padding: '3px 9px', borderRadius: '12px' }}>
                Draft
              </span>
            </div>

            {/* 9 Box HMRC VAT Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                    <th style={{ padding: '10px 16px', width: '50px' }}>Box</th>
                    <th style={{ padding: '10px 16px' }}>Description</th>
                    <th style={{ padding: '10px 16px', textAlign: 'right', width: '130px' }}>Amount (£)</th>
                    <th style={{ padding: '10px 16px', color: '#94A3B8', fontSize: '11.5px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {vatBoxes.map((row) => {
                    const isBox5 = row.isNet;
                    const isBox3 = row.isTotal;

                    return (
                      <tr
                        key={row.box}
                        style={{
                          borderBottom: '1px solid #F1F5F9',
                          background: isBox5 ? '#F0FDFA' : isBox3 ? '#F8FAFC' : '#FFFFFF',
                          fontWeight: isBox5 || isBox3 ? 700 : 400,
                          color: isBox5 ? '#0F766E' : '#0F172A',
                        }}
                      >
                        <td style={{ padding: '11px 16px', fontWeight: 700, color: isBox5 ? '#0F766E' : '#0F172A' }}>
                          {row.box}
                        </td>
                        <td style={{ padding: '11px 16px' }}>
                          <div>{row.desc}</div>
                        </td>
                        <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 700, color: isBox5 ? '#0F766E' : '#0F172A' }}>
                          {row.amount}
                        </td>
                        <td style={{ padding: '11px 16px', fontSize: '11px', color: isBox3 || isBox5 ? '#16A34A' : '#94A3B8' }}>
                          {row.note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Source Transactions (Q1 2025) Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Receipt size={16} weight="bold" />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Source Transactions (Q1 2025)
                </h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span>View all</span>
                <ArrowRight size={12} weight="bold" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '16px', padding: '0 20px', borderBottom: '1px solid #F1F5F9' }}>
              {[
                { id: 'all', label: 'All Transactions' },
                { id: 'sales', label: 'Sales (Outputs)' },
                { id: 'purchases', label: 'Purchases (Inputs)' },
                { id: 'adjustments', label: 'Adjustments' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTxTab(tab.id as any)}
                  style={{
                    padding: '10px 0',
                    fontSize: '12.5px',
                    fontWeight: activeTxTab === tab.id ? 600 : 400,
                    color: activeTxTab === tab.id ? '#0284C7' : '#64748B',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTxTab === tab.id ? '2px solid #0284C7' : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Transactions Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                    <th style={{ padding: '10px 16px' }}>Date</th>
                    <th style={{ padding: '10px 16px' }}>Type</th>
                    <th style={{ padding: '10px 16px' }}>Reference</th>
                    <th style={{ padding: '10px 16px' }}>Description</th>
                    <th style={{ padding: '10px 16px', textAlign: 'right' }}>Net Amount (£)</th>
                    <th style={{ padding: '10px 16px', textAlign: 'right' }}>VAT Amount (£)</th>
                    <th style={{ padding: '10px 16px', textAlign: 'center' }}>VAT Rate</th>
                    <th style={{ padding: '10px 16px', textAlign: 'center' }}>VAT Box</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx, idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.12s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '10px 16px', color: '#64748B' }}>{tx.date}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tx.typeDir === 'sales' ? '#16A34A' : '#DC2626' }} />
                          <span style={{ color: '#334155' }}>{tx.type}</span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 16px', color: '#0284C7', fontWeight: 600 }}>
                        <Link href={tx.typeDir === 'sales' ? '/finance/sales-invoices' : '/finance/purchase-invoices'} style={{ textDecoration: 'none', color: '#0284C7' }}>
                          {tx.ref}
                        </Link>
                      </td>
                      <td style={{ padding: '10px 16px', color: '#0F172A', fontWeight: 500 }}>{tx.desc}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'right', color: '#334155' }}>{tx.net}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{tx.vat}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#64748B' }}>{tx.rate}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600, color: '#0284C7' }}>{tx.box}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: VAT Periods, Previous Submissions, Warnings & Exceptions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: VAT Periods */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} weight="bold" color="#16A34A" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>VAT Periods</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span>View all</span>
                <ArrowRight size={11} weight="bold" />
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                    <th style={{ padding: '8px 14px' }}>Period</th>
                    <th style={{ padding: '8px 14px' }}>Start Date</th>
                    <th style={{ padding: '8px 14px' }}>End Date</th>
                    <th style={{ padding: '8px 14px' }}>Due Date</th>
                    <th style={{ padding: '8px 14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { period: 'Q1 2025', start: '01 Jan 2025', end: '31 Mar 2025', due: '07 May 2025', status: 'In progress', color: '#D97706', bg: '#FEF3C7', icon: <Clock size={11} weight="bold" /> },
                    { period: 'Q4 2024', start: '01 Oct 2024', end: '31 Dec 2024', due: '07 Feb 2025', status: 'Submitted', color: '#16A34A', bg: '#DCFCE7', icon: <CheckCircle size={11} weight="fill" /> },
                    { period: 'Q3 2024', start: '01 Jul 2024', end: '30 Sep 2024', due: '07 Nov 2024', status: 'Submitted', color: '#16A34A', bg: '#DCFCE7', icon: <CheckCircle size={11} weight="fill" /> },
                    { period: 'Q2 2024', start: '01 Apr 2024', end: '30 Jun 2024', due: '07 Aug 2024', status: 'Submitted', color: '#16A34A', bg: '#DCFCE7', icon: <CheckCircle size={11} weight="fill" /> },
                  ].map((row) => (
                    <tr key={row.period} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '9px 14px', fontWeight: 600, color: '#0F172A' }}>{row.period}</td>
                      <td style={{ padding: '9px 14px', color: '#64748B' }}>{row.start}</td>
                      <td style={{ padding: '9px 14px', color: '#64748B' }}>{row.end}</td>
                      <td style={{ padding: '9px 14px', color: '#64748B' }}>{row.due}</td>
                      <td style={{ padding: '9px 14px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', fontWeight: 600, color: row.color, background: row.bg, padding: '2px 7px', borderRadius: '10px' }}>
                          {row.icon}
                          <span>{row.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Previous Submissions */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} weight="bold" color="#0284C7" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Previous Submissions</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span>View all</span>
                <ArrowRight size={11} weight="bold" />
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                    <th style={{ padding: '8px 14px' }}>Period</th>
                    <th style={{ padding: '8px 14px' }}>Submission Date</th>
                    <th style={{ padding: '8px 14px', textAlign: 'right' }}>Amount (£)</th>
                    <th style={{ padding: '8px 14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { period: 'Q4 2024', date: '06 Feb 2025', amount: '32,410.00' },
                    { period: 'Q3 2024', date: '06 Nov 2024', amount: '28,520.00' },
                    { period: 'Q2 2024', date: '06 Aug 2024', amount: '41,960.00' },
                    { period: 'Q1 2024', date: '07 May 2024', amount: '38,210.00' },
                  ].map((sub) => (
                    <tr key={sub.period} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '9px 14px', fontWeight: 600, color: '#0284C7' }}>{sub.period}</td>
                      <td style={{ padding: '9px 14px', color: '#64748B' }}>{sub.date}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{sub.amount}</td>
                      <td style={{ padding: '9px 14px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', fontWeight: 600, color: '#16A34A', background: '#DCFCE7', padding: '2px 7px', borderRadius: '10px' }}>
                          <CheckCircle size={11} weight="fill" color="#16A34A" />
                          <span>Success</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 3: Warnings & Exceptions */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Warning size={17} weight="fill" color="#DC2626" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Warnings & Exceptions</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span>View all</span>
                <ArrowRight size={11} weight="bold" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  title: '3 transactions with missing VAT rate',
                  desc: 'Review and update VAT rates before submission',
                  icon: <WarningCircle size={16} weight="fill" color="#DC2626" />,
                },
                {
                  title: '2 large credit notes in this period',
                  desc: 'Total value: £12,400.00',
                  icon: <WarningCircle size={16} weight="fill" color="#D97706" />,
                },
                {
                  title: 'Input tax unusually high',
                  desc: 'Input tax is 40% higher than previous period',
                  icon: <Info size={16} weight="fill" color="#2563EB" />,
                },
                {
                  title: '1 adjustment pending approval',
                  desc: 'Manual adjustment requires approval',
                  icon: <Info size={16} weight="fill" color="#0284C7" />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid #F1F5F9',
                    background: '#FAFAFA',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ marginTop: '2px' }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B' }}>{item.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>{item.desc}</div>
                    </div>
                  </div>
                  <CaretRight size={13} color="#94A3B8" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
