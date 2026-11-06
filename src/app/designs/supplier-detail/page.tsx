'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Coins,
  CreditCard,
  Clock,
  Files,
  FileText,
  User,
  EnvelopeSimple,
  Phone,
  MapPin,
  Bank,
  Check,
  CheckCircle,
  Plus,
  TrendUp,
  DotsThreeVertical,
  CaretDown,
  ArrowSquareOut,
  X,
  PencilSimple,
} from '@phosphor-icons/react';

export default function SupplierDetailPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bills' | 'credits' | 'payments' | 'activity'>('overview');
  const [trendRange, setTrendRange] = useState('Last 12 Months');
  const [openTrendDropdown, setOpenTrendDropdown] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'Preferred supplier for office consumables',
      date: '21 Mar 2025, 10:24',
      author: 'John Doe',
      initials: 'JD',
      bg: '#2563EB',
      content: 'Reliable supplier with good service levels. Prefer for office stationery and general supplies.',
    },
    {
      id: '2',
      title: 'Price increase notification',
      date: '12 Jan 2025, 13:18',
      author: 'Sarah Collins',
      initials: 'SC',
      bg: '#9333EA',
      content: 'Supplier notified of 5% price increase from April 2025. Updated rates applied to new purchase orders.',
    },
  ]);

  const openBillsList = [
    { no: 'BILL-2025-0942', issue: '10 Apr 2025', due: '10 May 2025', amount: '£4,500.00', status: 'Pending', days: '8' },
    { no: 'BILL-2025-0798', issue: '03 Apr 2025', due: '03 May 2025', amount: '£2,320.00', status: 'Overdue', days: '12' },
    { no: 'BILL-2025-0781', issue: '28 Mar 2025', due: '27 Apr 2025', amount: '£6,780.00', status: 'Overdue', days: '15' },
    { no: 'BILL-2025-0712', issue: '15 Mar 2025', due: '14 Apr 2025', amount: '£3,450.00', status: 'Overdue', days: '31' },
    { no: 'BILL-2025-0628', issue: '05 Mar 2025', due: '04 Apr 2025', amount: '£1,980.00', status: 'Paid', days: '-' },
    { no: 'BILL-2025-0621', issue: '20 Feb 2025', due: '22 Mar 2025', amount: '£5,650.00', status: 'Partially Paid', days: '5' },
  ];

  const recentPaymentsList = [
    { no: 'PAY-2025-0418', date: '18 Apr 2025', amount: '£4,800.00', method: 'Bank Transfer', ref: 'INV-2025-0760' },
    { no: 'PAY-2025-0330', date: '30 Mar 2025', amount: '£3,450.00', method: 'Bank Transfer', ref: 'INV-2025-0722' },
    { no: 'PAY-2025-0315', date: '15 Mar 2025', amount: '£2,100.00', method: 'Direct Debit', ref: 'Multiple (3)' },
    { no: 'PAY-2025-0228', date: '28 Feb 2025', amount: '£5,650.00', method: 'Bank Transfer', ref: 'INV-2025-0621' },
    { no: 'PAY-2025-0156', date: '15 Feb 2025', amount: '£1,980.00', method: 'Bank Transfer', ref: 'INV-2025-0583' },
  ];

  const spendTrendMonths = [
    { label: 'May 24', barH: 45, lineY: 55 },
    { label: 'Jun 24', barH: 45, lineY: 55 },
    { label: 'Jul 24', barH: 60, lineY: 52 },
    { label: 'Aug 24', barH: 75, lineY: 48 },
    { label: 'Sep 24', barH: 65, lineY: 46 },
    { label: 'Oct 24', barH: 70, lineY: 44 },
    { label: 'Nov 24', barH: 80, lineY: 40 },
    { label: 'Dec 24', barH: 85, lineY: 38 },
    { label: 'Jan 25', barH: 95, lineY: 34 },
    { label: 'Feb 25', barH: 90, lineY: 36 },
    { label: 'Mar 25', barH: 92, lineY: 37 },
    { label: 'Apr 25', barH: 105, lineY: 32 },
  ];

  const handleAddNote = () => {
    if (!newNoteTitle.trim()) return;
    const newEntry = {
      id: String(Date.now()),
      title: newNoteTitle.trim(),
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: 'John Doe',
      initials: 'JD',
      bg: '#2563EB',
      content: newNoteContent.trim() || 'No additional content provided.',
    };
    setNotes([newEntry, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddNoteModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '36px', color: '#0F172A' }}>
      
      {/* ── 1. BREADCRUMBS & TOP TITLE ───────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
            <Link href="/finance" style={{ color: '#0284C7', textDecoration: 'none' }}>Finance</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <Link href="/finance/suppliers" style={{ color: '#0284C7', textDecoration: 'none' }}>Suppliers</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Apex Office Supplies</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Supplier Detail
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
            View supplier information, track spend, manage bills and payments, and monitor account activity.
          </p>
        </div>

        <button
          onClick={() => alert('Supplier Actions Menu')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            height: '36px',
            padding: '0 14px',
            borderRadius: '6px',
            background: '#044E43',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          <DotsThreeVertical size={16} weight="bold" />
          <span>Actions</span>
          <CaretDown size={12} weight="bold" />
        </button>
      </div>

      {/* ── 2. MAIN SUPPLIER HEADER SUMMARY CARD ─────────────────────────────── */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        {/* Top line: Avatar + Name + Status + Right 3 Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                background: '#E2E8F0',
                color: '#334155',
                fontSize: '18px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.04em',
              }}
            >
              AO
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Apex Office Supplies
                </h2>
                <span
                  style={{
                    background: '#DCFCE7',
                    color: '#16A34A',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '12px',
                  }}
                >
                  Active
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>SUP-001</span>
                <span>•</span>
                <span>VAT GB987654321</span>
              </div>
            </div>
          </div>

          {/* Top Right Action Buttons: Enter bill, Record payment, View statement */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => alert('Enter bill modal')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '34px',
                padding: '0 14px',
                borderRadius: '6px',
                background: '#0B63E5',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(11, 99, 229, 0.25)',
              }}
            >
              <FileText size={15} weight="bold" />
              <span>Enter bill</span>
            </button>

            <button
              onClick={() => alert('Record payment modal')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '34px',
                padding: '0 14px',
                borderRadius: '6px',
                background: '#FFFFFF',
                color: '#0B63E5',
                border: '1px solid #CBD5E1',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <CreditCard size={15} weight="bold" />
              <span>Record payment</span>
            </button>

            <button
              onClick={() => alert('Viewing supplier statement')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '34px',
                padding: '0 14px',
                borderRadius: '6px',
                background: '#FFFFFF',
                color: '#0B63E5',
                border: '1px solid #CBD5E1',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Files size={15} weight="bold" />
              <span>View statement</span>
            </button>
          </div>
        </div>

        {/* 4 Details Columns matching Screenshot */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) minmax(220px, 1fr) minmax(240px, 1.1fr) minmax(220px, 1fr)', gap: '24px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
          
          {/* Col 1: Contact */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={15} color="#64748B" />
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Emma Carter</span>
              </div>
              <div style={{ color: '#64748B', fontSize: '11px', paddingLeft: '23px' }}>Account Manager</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <EnvelopeSimple size={15} color="#64748B" />
                <a href="mailto:emma.carter@apexoffice.co.uk" style={{ color: '#0284C7', textDecoration: 'none' }}>
                  emma.carter@apexoffice.co.uk
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#64748B" />
                <span style={{ color: '#475569' }}>+44 20 7946 0123</span>
              </div>
            </div>
          </div>

          {/* Col 2: Billing address */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              <MapPin size={15} color="#009A96" />
              <span>Billing address</span>
            </div>
            <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
              <div>Apex Office Supplies</div>
              <div>Riverside Business Park</div>
              <div>123 Commerce Road</div>
              <div>London SE1 9AB</div>
              <div>United Kingdom</div>
            </div>
          </div>

          {/* Col 3: Remittance details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              <Bank size={15} color="#009A96" />
              <span>Remittance details</span>
            </div>
            <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
              <div>Barclays Bank PLC</div>
              <div>Sort Code: 20-00-00</div>
              <div>Account No: 87654321</div>
              <div>Account Name: Apex Office Supplies Ltd</div>
            </div>
          </div>

          {/* Col 4: Additional details */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              Additional details
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '6px', fontSize: '12.5px' }}>
              <span style={{ color: '#64748B' }}>Payment terms</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>30 days (Net 30)</span>

              <span style={{ color: '#64748B' }}>Default currency</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>GBP</span>

              <span style={{ color: '#64748B' }}>Category</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>Office Supplies</span>

              <span style={{ color: '#64748B' }}>Preferred supplier</span>
              <span style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '11px', fontWeight: 700, padding: '1px 8px', borderRadius: '4px', width: 'fit-content' }}>Yes</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. FOUR TOP KPI SUMMARY CARDS ───────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        
        {/* Card 1: Spend YTD */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Spend YTD</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>£148,320</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
              <TrendUp size={12} weight="bold" />
              <span>12%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. same period last year</span>
            </div>
          </div>
          {/* Mini Sparkline Green */}
          <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
            <polyline points="2,22 15,18 28,14 42,10 58,4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Card 2: Outstanding Payable */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Outstanding Payable</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>£24,680</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={12} weight="bold" />
              <span>18%</span>
            </div>
          </div>
          {/* Mini Sparkline Red */}
          <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
            <polyline points="2,24 16,20 30,12 44,16 58,8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Card 3: Overdue Amount */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Overdue Amount</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>£8,450</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={12} weight="bold" />
              <span>42%</span>
            </div>
          </div>
          {/* Mini Sparkline Red */}
          <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
            <polyline points="2,22 18,18 32,20 46,12 58,6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Card 4: Open Bills */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Open Bills</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>6</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={12} weight="bold" />
              <span>20%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. previous month</span>
            </div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Files size={20} />
          </div>
        </div>
      </div>

      {/* ── 4. SUB-NAVIGATION TABS ───────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '0',
          marginTop: '2px',
        }}
      >
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'bills', label: 'Bills', badge: '6' },
          { key: 'credits', label: 'Credits', badge: '1' },
          { key: 'payments', label: 'Payments' },
          { key: 'activity', label: 'Activity' },
        ].map((tab) => {
          const isSel = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 4px 12px 4px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: isSel ? 600 : 500,
                color: isSel ? '#0284C7' : '#64748B',
                borderBottom: isSel ? '2px solid #0284C7' : '2px solid transparent',
                marginBottom: '-1px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '10px',
                    background: tab.key === 'bills' ? '#EF4444' : '#F59E0B',
                    color: '#FFFFFF',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── 5. MIDDLE ROW: SPEND TREND (LEFT) & OPEN BILLS TABLE (RIGHT) ────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(380px, 1.15fr) minmax(460px, 1.35fr)', gap: '16px', alignItems: 'stretch' }}>
        
        {/* Left: Spend Trend Chart */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Spend Trend
            </h3>

            {/* Time range dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setOpenTrendDropdown(!openTrendDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                <span>{trendRange}</span>
                <CaretDown size={11} />
              </button>
              {openTrendDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    zIndex: 20,
                    minWidth: '120px',
                    padding: '4px 0',
                  }}
                >
                  {['Last 6 Months', 'Last 12 Months', 'Year to Date'].map((item) => (
                    <div
                      key={item}
                      onClick={() => { setTrendRange(item); setOpenTrendDropdown(false); }}
                      style={{ padding: '6px 10px', fontSize: '11.5px', color: '#334155', cursor: 'pointer' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bar Chart Container */}
          <div style={{ position: 'relative', height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '10px' }}>
            {/* SVG Connecting 3 Month Average line */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                points="12,100 38,98 64,94 90,88 116,84 142,80 168,74 194,70 220,66 246,68 272,70 298,62"
              />
              {[
                [12, 100], [38, 98], [64, 94], [90, 88], [116, 84], [142, 80],
                [168, 74], [194, 70], [220, 66], [246, 68], [272, 70], [298, 62]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
              ))}
            </svg>

            {spendTrendMonths.map((m) => (
              <div key={m.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 2 }}>
                <div
                  style={{
                    width: '14px',
                    height: `${m.barH}px`,
                    background: '#93C5FD',
                    borderRadius: '2px 2px 0 0',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Month labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '4px', marginTop: '4px' }}>
            {spendTrendMonths.map((m) => (
              <span key={m.label} style={{ fontSize: '9px', color: '#94A3B8', textAlign: 'center', flex: 1 }}>
                {m.label}
              </span>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '12px', fontSize: '11px', color: '#64748B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
              <span>Monthly Spend</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>3 Month Average</span>
            </div>
          </div>
        </div>

        {/* Right: Open Bills Table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="#009A96" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Open Bills
              </h3>
            </div>
            <Link href="/designs/supplier-bill-detail" style={{ fontSize: '12px', color: '#0284C7', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View All</span>
              <span>&gt;</span>
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ color: '#64748B', borderBottom: '1px solid #F1F5F9', textAlign: 'left', fontSize: '11px' }}>
                <th style={{ padding: '6px 8px' }}>Invoice No.</th>
                <th style={{ padding: '6px 8px' }}>Issue Date</th>
                <th style={{ padding: '6px 8px' }}>Due Date</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '6px 8px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '6px 8px', textAlign: 'center' }}>Days</th>
              </tr>
            </thead>
            <tbody>
              {openBillsList.map((bill) => (
                <tr key={bill.no} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '8px', color: '#0284C7', fontWeight: 600 }}>{bill.no}</td>
                  <td style={{ padding: '8px', color: '#475569' }}>{bill.issue}</td>
                  <td style={{ padding: '8px', color: '#475569' }}>{bill.due}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{bill.amount}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '10.5px',
                        fontWeight: 600,
                        background:
                          bill.status === 'Paid'
                            ? '#DCFCE7'
                            : bill.status === 'Pending'
                            ? '#E0F2FE'
                            : bill.status === 'Partially Paid'
                            ? '#FEF3C7'
                            : '#FEE2E2',
                        color:
                          bill.status === 'Paid'
                            ? '#166534'
                            : bill.status === 'Pending'
                            ? '#0369A1'
                            : bill.status === 'Partially Paid'
                            ? '#B45309'
                            : '#991B1B',
                      }}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', color: bill.days !== '-' ? '#DC2626' : '#94A3B8', fontWeight: bill.days !== '-' ? 700 : 400 }}>
                    {bill.days}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 6. BOTTOM ROW: RECENT PAYMENTS | BANK DETAILS STATUS | NOTES ─────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(240px, 0.9fr) minmax(320px, 1.2fr)', gap: '16px' }}>
        
        {/* Box 1: Recent Payments */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={16} color="#16A34A" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Recent Payments
              </h3>
            </div>
            <Link href="/finance/payments" style={{ fontSize: '12px', color: '#0284C7', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View All</span>
              <span>&gt;</span>
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ color: '#64748B', borderBottom: '1px solid #F1F5F9', textAlign: 'left', fontSize: '11px' }}>
                <th style={{ padding: '6px 6px' }}>Payment No.</th>
                <th style={{ padding: '6px 6px' }}>Payment Date</th>
                <th style={{ padding: '6px 6px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '6px 6px' }}>Method</th>
                <th style={{ padding: '6px 6px' }}>Reference</th>
              </tr>
            </thead>
            <tbody>
              {recentPaymentsList.map((p) => (
                <tr key={p.no} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '7px 6px', color: '#0284C7', fontWeight: 600 }}>{p.no}</td>
                  <td style={{ padding: '7px 6px', color: '#475569' }}>{p.date}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{p.amount}</td>
                  <td style={{ padding: '7px 6px', color: '#475569' }}>{p.method}</td>
                  <td style={{ padding: '7px 6px', color: '#64748B' }}>{p.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Box 2: Bank Details Status */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bank size={16} color="#16A34A" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Bank Details Status
              </h3>
            </div>
            <button
              onClick={() => alert('Edit Bank Details')}
              style={{
                background: 'none',
                border: 'none',
                color: '#0284C7',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
          </div>

          {/* Green verified badge block */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '8px', padding: '12px 14px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#16A34A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bank size={18} />
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#15803D' }}>Bank details verified</div>
                <div style={{ fontSize: '10.5px', color: '#166534' }}>Last verified on 10 Jan 2025</div>
              </div>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#16A34A', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
              <Check size={11} weight="bold" /> Verified
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', fontSize: '12px' }}>
            <span style={{ color: '#64748B' }}>Bank name</span>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>Barclays Bank PLC</span>

            <span style={{ color: '#64748B' }}>Sort code</span>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>20-00-00</span>

            <span style={{ color: '#64748B' }}>Account number</span>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>87654321</span>

            <span style={{ color: '#64748B' }}>Account name</span>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>Apex Office Supplies Ltd</span>
          </div>
        </div>

        {/* Box 3: Notes */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="#16A34A" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Notes
              </h3>
            </div>
            <Link href="/finance/notes" style={{ fontSize: '12px', color: '#0284C7', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View All</span>
              <span>&gt;</span>
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {notes.map((n) => (
              <div key={n.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', borderBottom: '1px solid #F8FAFC', paddingBottom: '10px' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: n.bg,
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {n.initials}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{n.title}</div>
                    <DotsThreeVertical size={14} color="#94A3B8" style={{ cursor: 'pointer' }} />
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#94A3B8' }}>{n.date} · by {n.author}</div>
                  <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.4, margin: '2px 0 0 0' }}>
                    {n.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAddNoteModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: '#0284C7',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '6px 0 0 0',
              marginTop: 'auto',
            }}
          >
            <Plus size={14} weight="bold" />
            <span>Add note</span>
          </button>
        </div>
      </div>

      {/* ── MODAL: ADD NOTE ─────────────────────────────────────────────────── */}
      {showAddNoteModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              width: '460px',
              maxWidth: '90%',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Add Supplier Note</h3>
              <button
                onClick={() => setShowAddNoteModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Note title (e.g. Price notification)..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                fontSize: '13px',
                outline: 'none',
              }}
            />

            <textarea
              rows={3}
              placeholder="Enter note details..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowAddNoteModal(false)}
                style={{
                  padding: '7px 14px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                style={{
                  padding: '7px 16px',
                  border: 'none',
                  background: '#044E43',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen bottom left indicator matching screenshot */}
      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '10px' }}>
        Screen 09 — Supplier Detail
      </div>
    </div>
  );
}
