'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CaretRight,
  CaretDown,
  ArrowUpRight,
  TrendUp,
  CreditCard,
  FileText,
  CalendarBlank,
  Bank,
  CheckCircle,
  Clock,
  DotsThreeVertical,
  Plus,
  PencilSimple,
  Wallet,
  Receipt,
  DownloadSimple,
  EnvelopeSimple,
  Phone,
  Check,
  X,
  Buildings,
  Tag,
  ArrowsClockwise
} from '@phosphor-icons/react';

export default function SupplierDetailPage() {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'bills' | 'credits' | 'payments' | 'activity'>('overview');

  // Modals
  const [showEnterBillModal, setShowEnterBillModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);

  // Time range filter for spend trend
  const [trendRange, setTrendRange] = useState('Last 12 Months');

  // Notes state
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'Preferred supplier for office consumables',
      date: '21 Mar 2025, 10:24',
      author: 'John Doe',
      authorInitials: 'JD',
      avatarBg: '#0284C7',
      content: 'Reliable supplier with good service levels. Prefer for office stationery and general supplies.',
    },
    {
      id: '2',
      title: 'Price increase notification',
      date: '12 Jan 2025, 13:18',
      author: 'Sarah Collins',
      authorInitials: 'SC',
      avatarBg: '#9333EA',
      content: 'Supplier notified of 5% price increase from April 2025. Updated rates applied to new purchase orders.',
    },
  ]);

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleAddNote = () => {
    if (!newNoteTitle.trim()) return;
    setNotes([
      {
        id: Date.now().toString(),
        title: newNoteTitle,
        date: 'Today, 14:00',
        author: 'John Doe',
        authorInitials: 'JD',
        avatarBg: '#0284C7',
        content: newNoteContent,
      },
      ...notes,
    ]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddNoteModal(false);
  };

  // Open Bills list
  const openBills = [
    { no: 'BILL-2025-0942', issueDate: '10 Apr 2025', dueDate: '10 May 2025', amount: '£4,500.00', status: 'Pending', days: '8', statusColor: { bg: '#EFF6FF', text: '#2563EB' } },
    { no: 'BILL-2025-0798', issueDate: '03 Apr 2025', dueDate: '03 May 2025', amount: '£2,320.00', status: 'Overdue', days: '12', statusColor: { bg: '#FEF2F2', text: '#DC2626' } },
    { no: 'BILL-2025-0781', issueDate: '28 Mar 2025', dueDate: '27 Apr 2025', amount: '£6,780.00', status: 'Overdue', days: '15', statusColor: { bg: '#FEF2F2', text: '#DC2626' } },
    { no: 'BILL-2025-0712', issueDate: '15 Mar 2025', dueDate: '14 Apr 2025', amount: '£3,450.00', status: 'Overdue', days: '31', statusColor: { bg: '#FEF2F2', text: '#DC2626' } },
    { no: 'BILL-2025-0628', issueDate: '05 Mar 2025', dueDate: '04 Apr 2025', amount: '£1,980.00', status: 'Paid', days: '-', statusColor: { bg: '#ECFDF5', text: '#059669' } },
    { no: 'BILL-2025-0621', issueDate: '20 Feb 2025', dueDate: '22 Mar 2025', amount: '£5,650.00', status: 'Partially Paid', days: '5', statusColor: { bg: '#FFFBEB', text: '#D97706' } },
  ];

  // Recent Payments
  const recentPayments = [
    { no: 'PAY-2025-0418', date: '18 Apr 2025', amount: '£4,800.00', method: 'Bank Transfer', ref: 'INV-2025-0760' },
    { no: 'PAY-2025-0330', date: '30 Mar 2025', amount: '£3,450.00', method: 'Bank Transfer', ref: 'INV-2025-0722' },
    { no: 'PAY-2025-0315', date: '15 Mar 2025', amount: '£2,100.00', method: 'Direct Debit', ref: 'Multiple (3)' },
    { no: 'PAY-2025-0228', date: '28 Feb 2025', amount: '£5,650.00', method: 'Bank Transfer', ref: 'INV-2025-0621' },
    { no: 'PAY-2025-0156', date: '15 Feb 2025', amount: '£1,980.00', method: 'Bank Transfer', ref: 'INV-2025-0583' },
  ];

  // Spend trend monthly chart bars
  const monthsData = [
    { month: 'May 24', barH: 28, lineY: 25 },
    { month: 'Jun 24', barH: 32, lineY: 28 },
    { month: 'Jul 24', barH: 45, lineY: 34 },
    { month: 'Aug 24', barH: 52, lineY: 40 },
    { month: 'Sep 24', barH: 58, lineY: 48 },
    { month: 'Oct 24', barH: 62, lineY: 54 },
    { month: 'Nov 24', barH: 70, lineY: 60 },
    { month: 'Dec 24', barH: 68, lineY: 63 },
    { month: 'Jan 25', barH: 74, lineY: 65 },
    { month: 'Feb 25', barH: 80, lineY: 68 },
    { month: 'Mar 25', barH: 88, lineY: 72 },
    { month: 'Apr 25', barH: 95, lineY: 75 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* 1. TOP TITLE & ACTION BUTTONS */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Supplier Detail
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            View supplier information, track spend, manage bills and payments, and monitor account activity.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowEnterBillModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 14px',
              borderRadius: '8px',
              border: 'none',
              background: '#0284C7',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(2, 132, 199, 0.2)',
            }}
          >
            <FileText size={15} weight="bold" />
            <span>Enter bill</span>
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
              border: '1px solid #0284C7',
              background: '#FFFFFF',
              color: '#0284C7',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <CreditCard size={15} weight="bold" />
            <span>Record payment</span>
          </button>

          <button
            onClick={() => alert('Generating account statement...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 14px',
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
            <span>View statement</span>
          </button>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowActionDropdown(!showActionDropdown)}
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
              <CheckCircle size={15} weight="fill" />
              <span>Actions</span>
              <CaretDown size={12} />
            </button>
            {showActionDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '105%',
                  right: 0,
                  width: '180px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-dropdown)',
                  zIndex: 30,
                  padding: '6px',
                }}
              >
                <div
                  onClick={() => { alert('Editing supplier details...'); setShowActionDropdown(false); }}
                  style={{ padding: '8px 12px', fontSize: '12.5px', color: '#334155', cursor: 'pointer', borderRadius: '4px' }}
                >
                  Edit Supplier
                </div>
                <div
                  onClick={() => { alert('Exported report.'); setShowActionDropdown(false); }}
                  style={{ padding: '8px 12px', fontSize: '12.5px', color: '#334155', cursor: 'pointer', borderRadius: '4px' }}
                >
                  Export Activity Log
                </div>
                <div
                  onClick={() => { alert('Supplier put on hold.'); setShowActionDropdown(false); }}
                  style={{ padding: '8px 12px', fontSize: '12.5px', color: '#DC2626', cursor: 'pointer', borderRadius: '4px' }}
                >
                  Place On Hold
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. SUPPLIER MAIN PROFILE SUMMARY CARD */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* Header row: Avatar + Name + Code + Active Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              background: '#F1F5F9',
              color: '#334155',
              fontSize: '16px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E2E8F0',
            }}
          >
            AO
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Apex Office Supplies
              </h2>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: '#ECFDF5',
                  color: '#059669',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                Active
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#64748B', marginTop: '3px' }}>
              <span>SUP-001</span>
              <span>•</span>
              <span>VAT GB987654321</span>
            </div>
          </div>
        </div>

        {/* Grid info: Contact, Billing address, Remittance details, Additional details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            borderTop: '1px solid #F1F5F9',
            paddingTop: '16px',
            fontSize: '12.5px',
          }}
        >
          {/* Contact */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '11.5px', marginBottom: '8px' }}>
              <span>Contact</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Buildings size={14} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>Emma Carter</div>
                <div style={{ color: '#64748B', fontSize: '11.5px' }}>Account Manager</div>
                <div style={{ color: '#0284C7', marginTop: '4px' }}>emma.carter@apexoffice.co.uk</div>
                <div style={{ color: '#64748B', marginTop: '2px' }}>+44 20 7946 0123</div>
              </div>
            </div>
          </div>

          {/* Billing address */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '11.5px', marginBottom: '8px' }}>
              <span>Billing address</span>
            </div>
            <div style={{ color: '#334155', lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>Apex Office Supplies</div>
              <div>Riverside Business Park</div>
              <div>123 Commerce Road</div>
              <div>London SE1 9AB</div>
              <div>United Kingdom</div>
            </div>
          </div>

          {/* Remittance details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '11.5px', marginBottom: '8px' }}>
              <span>Remittance details</span>
            </div>
            <div style={{ color: '#334155', lineHeight: 1.5 }}>
              <div>Barclays Bank PLC</div>
              <div>Sort Code: <span style={{ fontWeight: 600, color: '#0F172A' }}>20-00-00</span></div>
              <div>Account No: <span style={{ fontWeight: 600, color: '#0F172A' }}>87654321</span></div>
              <div>Account Name: <span style={{ fontWeight: 600, color: '#0F172A' }}>Apex Office Supplies Ltd</span></div>
            </div>
          </div>

          {/* Additional details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '11.5px', marginBottom: '8px' }}>
              <span>Additional details</span>
            </div>
            <div style={{ color: '#334155', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Payment terms</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>30 days (Net 30)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Default currency</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>GBP</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Category</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Office Supplies</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Preferred supplier</span>
                <span style={{ fontWeight: 600, color: '#16A34A' }}>Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOUR KEY PERFORMANCE CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Card 1: Spend YTD */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Spend YTD</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              £148,320
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>12%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. same period last year</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '65px', height: '28px' }}>
            <svg width="65" height="28" viewBox="0 0 65 28" fill="none">
              <path d="M2 24 C 18 20, 32 22, 44 14 C 54 8, 60 12, 64 4" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Outstanding Payable */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Outstanding Payable</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              £24,680
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>18%</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '65px', height: '28px' }}>
            <svg width="65" height="28" viewBox="0 0 65 28" fill="none">
              <path d="M2 24 C 16 20, 28 22, 42 14 C 52 10, 58 12, 64 6" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: Overdue Amount */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Overdue Amount</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              £8,450
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>42%</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '65px', height: '28px' }}>
            <svg width="65" height="28" viewBox="0 0 65 28" fill="none">
              <path d="M2 26 C 16 24, 30 18, 44 14 C 54 10, 58 8, 64 2" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: Open Bills */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Open Bills</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              6
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>20%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '65px', height: '28px' }}>
            <svg width="65" height="28" viewBox="0 0 65 28" fill="none">
              <path d="M2 24 C 18 20, 32 22, 44 14 C 54 8, 60 12, 64 4" stroke="#9333EA" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>

      {/* 4. TABS NAVIGATION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'overview' ? 600 : 500,
            color: activeTab === 'overview' ? '#0F766E' : '#64748B',
            borderBottom: activeTab === 'overview' ? '2px solid #0F766E' : '2px solid transparent',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab('bills')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'bills' ? 600 : 500,
            color: activeTab === 'bills' ? '#0F766E' : '#64748B',
            borderBottom: activeTab === 'bills' ? '2px solid #0F766E' : '2px solid transparent',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          <span>Bills</span>
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#EF4444', color: '#FFFFFF', fontSize: '10.5px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            6
          </span>
        </button>

        <button
          onClick={() => setActiveTab('credits')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'credits' ? 600 : 500,
            color: activeTab === 'credits' ? '#0F766E' : '#64748B',
            borderBottom: activeTab === 'credits' ? '2px solid #0F766E' : '2px solid transparent',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          <span>Credits</span>
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#EF4444', color: '#FFFFFF', fontSize: '10.5px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            1
          </span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'payments' ? 600 : 500,
            color: activeTab === 'payments' ? '#0F766E' : '#64748B',
            borderBottom: activeTab === 'payments' ? '2px solid #0F766E' : '2px solid transparent',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          Payments
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'activity' ? 600 : 500,
            color: activeTab === 'activity' ? '#0F766E' : '#64748B',
            borderBottom: activeTab === 'activity' ? '2px solid #0F766E' : '2px solid transparent',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          Activity
        </button>
      </div>

      {/* 5. TWO COLUMN MAIN CONTENT: Spend Trend & Open Bills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left: Spend Trend Chart */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Spend Trend
            </h3>
            <select
              value={trendRange}
              onChange={(e) => setTrendRange(e.target.value)}
              style={{
                height: '28px',
                padding: '0 8px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                color: '#334155',
                outline: 'none',
                background: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>

          {/* Chart container with bars and line */}
          <div style={{ display: 'flex', height: '170px', alignItems: 'flex-end', gap: '10px', paddingBottom: '24px', position: 'relative', borderBottom: '1px solid #F1F5F9' }}>
            {/* Left Y Axis Labels */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8' }}>
              <span>£50k</span>
              <span>£40k</span>
              <span>£30k</span>
              <span>£20k</span>
              <span>£10k</span>
              <span>£0</span>
            </div>

            {/* Bars */}
            <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', marginLeft: '34px', height: '100%', position: 'relative' }}>
              {/* Trend SVG curve line across data */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <path
                  d="M 10 115 Q 120 110, 240 85 T 460 70"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
                {/* Dots along trend */}
                <circle cx="20" cy="115" r="3.5" fill="#10B981" />
                <circle cx="140" cy="102" r="3.5" fill="#10B981" />
                <circle cx="260" cy="88" r="3.5" fill="#10B981" />
                <circle cx="380" cy="74" r="3.5" fill="#10B981" />
                <circle cx="450" cy="70" r="3.5" fill="#10B981" />
              </svg>

              {monthsData.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', zIndex: 1 }}>
                  <div
                    style={{
                      width: '18px',
                      height: `${m.barH}%`,
                      backgroundColor: '#93C5FD',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.2s',
                    }}
                  />
                  <span style={{ fontSize: '10px', color: '#64748B', position: 'absolute', bottom: '-20px' }}>
                    {m.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', fontSize: '11.5px', color: '#64748B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} />
              <span>Monthly Spend</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>3 Month Average</span>
            </div>
          </div>
        </div>

        {/* Right: Open Bills */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="#059669" weight="fill" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Open Bills
              </h3>
            </div>
            <Link
              href="/finance/purchase-invoices"
              style={{ fontSize: '12.5px', fontWeight: 600, color: '#0284C7', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View All</span>
              <ArrowUpRight size={13} weight="bold" />
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontSize: '11px', fontWeight: 600 }}>
                  <th style={{ padding: '8px 6px 8px 0' }}>Invoice No.</th>
                  <th style={{ padding: '8px 6px' }}>Issue Date</th>
                  <th style={{ padding: '8px 6px' }}>Due Date</th>
                  <th style={{ padding: '8px 6px', textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '8px 0 8px 6px', textAlign: 'right' }}>Days</th>
                </tr>
              </thead>
              <tbody>
                {openBills.map((b) => (
                  <tr
                    key={b.no}
                    onClick={() => router.push(`/finance/purchase-invoices/${b.no}`)}
                    style={{ borderBottom: '1px solid #F8FAFC', cursor: 'pointer', transition: 'background 0.12s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '10px 6px 10px 0', color: '#0284C7', fontWeight: 600 }}>
                      {b.no}
                    </td>
                    <td style={{ padding: '10px 6px', color: '#64748B' }}>
                      {b.issueDate}
                    </td>
                    <td style={{ padding: '10px 6px', color: '#64748B' }}>
                      {b.dueDate}
                    </td>
                    <td style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                      {b.amount}
                    </td>
                    <td style={{ padding: '10px 6px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          backgroundColor: b.statusColor.bg,
                          color: b.statusColor.text,
                          fontSize: '11px',
                          fontWeight: 500,
                        }}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 0 10px 6px', textAlign: 'right', fontWeight: 600, color: b.days === '-' ? '#94A3B8' : '#D97706' }}>
                      {b.days}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 6. BOTTOM ROW: Recent Payments, Bank Details Status, Notes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 1fr', gap: '20px' }}>
        
        {/* Left: Recent Payments */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="#16A34A" weight="fill" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Recent Payments
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('payments')}
              style={{ fontSize: '12.5px', fontWeight: 600, color: '#0284C7', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              <span>View All</span>
              <ArrowUpRight size={13} weight="bold" />
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontSize: '11px', fontWeight: 600 }}>
                  <th style={{ padding: '8px 6px 8px 0' }}>Payment No.</th>
                  <th style={{ padding: '8px 6px' }}>Payment Date</th>
                  <th style={{ padding: '8px 6px', textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '8px 6px' }}>Method</th>
                  <th style={{ padding: '8px 0 8px 6px' }}>Reference</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((p) => (
                  <tr key={p.no} style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <td style={{ padding: '10px 6px 10px 0', color: '#0284C7', fontWeight: 600 }}>{p.no}</td>
                    <td style={{ padding: '10px 6px', color: '#64748B' }}>{p.date}</td>
                    <td style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{p.amount}</td>
                    <td style={{ padding: '10px 6px', color: '#475569' }}>{p.method}</td>
                    <td style={{ padding: '10px 0 10px 6px', color: '#64748B' }}>{p.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Middle: Bank Details Status */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bank size={18} color="#059669" weight="fill" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Bank Details Status
              </h3>
            </div>
            <button
              onClick={() => alert('Editing bank verification...')}
              style={{ fontSize: '12.5px', fontWeight: 600, color: '#0284C7', cursor: 'pointer' }}
            >
              Edit
            </button>
          </div>

          {/* Status Box */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bank size={18} weight="fill" />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>Bank details verified</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Last verified on 10 Jan 2025</div>
              </div>
            </div>
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
                fontWeight: 600,
              }}
            >
              <CheckCircle size={13} weight="fill" />
              Verified
            </span>
          </div>

          {/* Details list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Bank name</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>Barclays Bank PLC</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Sort code</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>20-00-00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Account number</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>87654321</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Account name</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>Apex Office Supplies Ltd</span>
            </div>
          </div>
        </div>

        {/* Right: Notes */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="#059669" weight="fill" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Notes
              </h3>
            </div>
            <button
              onClick={() => alert('Viewing all supplier notes...')}
              style={{ fontSize: '12.5px', fontWeight: 600, color: '#0284C7', cursor: 'pointer' }}
            >
              View All &gt;
            </button>
          </div>

          {/* Notes items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notes.map((note) => (
              <div key={note.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: note.avatarBg,
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {note.authorInitials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '12.5px' }}>
                      {note.title}
                    </div>
                    <DotsThreeVertical size={14} color="#94A3B8" />
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    {note.date} • by {note.author}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4, marginTop: '4px' }}>
                    {note.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add note link */}
          <button
            onClick={() => setShowAddNoteModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#0284C7',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 'auto',
              paddingTop: '8px',
            }}
          >
            <Plus size={14} weight="bold" />
            <span>Add note</span>
          </button>
        </div>

      </div>

      {/* MODAL: ENTER BILL */}
      {showEnterBillModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '520px', padding: '24px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Enter Bill for Apex Office Supplies</h3>
              <button onClick={() => setShowEnterBillModal(false)}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Bill Reference *</label>
                <input placeholder="e.g. BILL-2025-0188" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Bill Date</label>
                  <input type="date" defaultValue="2025-04-15" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Due Date</label>
                  <input type="date" defaultValue="2025-05-15" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Gross Amount (GBP) *</label>
                <input placeholder="£0.00" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowEnterBillModal(false)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#475569', fontSize: '12.5px', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => { alert('Bill recorded!'); setShowEnterBillModal(false); }} style={{ padding: '8px 18px', borderRadius: '6px', background: '#0284C7', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600 }}>Save Bill</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RECORD PAYMENT */}
      {showRecordPaymentModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Record Payment to Apex Office Supplies</h3>
              <button onClick={() => setShowRecordPaymentModal(false)}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Payment Amount (GBP) *</label>
                <input defaultValue="£4,500.00" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Payment Method</label>
                <select style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                  <option>Bank Transfer</option>
                  <option>Direct Debit</option>
                  <option>Company Credit Card</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowRecordPaymentModal(false)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#475569', fontSize: '12.5px', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => { alert('Payment saved!'); setShowRecordPaymentModal(false); }} style={{ padding: '8px 18px', borderRadius: '6px', background: '#0284C7', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600 }}>Confirm Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NOTE */}
      {showAddNoteModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '480px', padding: '24px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Add Note</h3>
              <button onClick={() => setShowAddNoteModal(false)}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Title *</label>
                <input
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g. Terms renegotiation note"
                  style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Note details</label>
                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Enter details..."
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowAddNoteModal(false)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#475569', fontSize: '12.5px', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleAddNote} style={{ padding: '8px 18px', borderRadius: '6px', background: '#0284C7', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600 }}>Add Note</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
