'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Coffee,
  User,
  EnvelopeSimple,
  Phone,
  MapPin,
  CalendarBlank,
  CreditCard,
  CurrencyGbp,
  FileText,
  Receipt,
  Files,
  Clock,
  DotsThreeVertical,
  Plus,
  ArrowUpRight,
  TrendUp,
  TrendDown,
  Check,
  X,
  CaretDown,
  Eye,
  MagnifyingGlass,
  ArrowRight,
} from '@phosphor-icons/react';

export default function CustomerDetailPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'credit-notes' | 'receipts' | 'activity'>('overview');
  const [trendRange, setTrendRange] = useState('Last 12 Months');
  const [openTrendDropdown, setOpenTrendDropdown] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const [notes, setNotes] = useState([
    {
      id: '1',
      author: 'John Doe',
      authorRole: 'Managing Director',
      initials: 'JD',
      bg: '#2563EB',
      date: '23 Apr 2025, 10:24',
      text: 'Spoke with Emma regarding the outstanding balance. Payment of £2,000 expected by end of April. Customer is happy with service and plans to expand to a second site.',
    },
    {
      id: '2',
      author: 'Sarah Clarke',
      authorRole: 'Finance Lead',
      initials: 'SC',
      bg: '#009A96',
      date: '12 Mar 2025, 14:16',
      text: 'Customer requested updated payment terms due to seasonal cash flow. Approved new terms, Net 45 for next three months.',
    },
  ]);

  const openInvoicesList = [
    { no: 'INV-2025-0176', date: '10 Apr 2025', due: '10 May 2025', overdueDays: '-', amount: '£1,200.00', status: 'Current' },
    { no: 'INV-2025-0154', date: '28 Mar 2025', due: '27 Apr 2025', overdueDays: '3', amount: '£2,050.00', status: 'Overdue' },
    { no: 'INV-2025-0132', date: '15 Mar 2025', due: '14 Apr 2025', overdueDays: '16', amount: '£1,800.00', status: 'Overdue' },
    { no: 'INV-2025-0108', date: '12 Feb 2025', due: '14 Mar 2025', overdueDays: '47', amount: '£1,350.00', status: 'Overdue' },
    { no: 'INV-2025-0009', date: '18 Jan 2025', due: '17 Feb 2025', overdueDays: '72', amount: '£2,100.00', status: 'Overdue' },
  ];

  const recentReceiptsList = [
    { date: '22 Apr 2025', ref: 'PAY-2025-0384', amount: '£2,000.00', method: 'BACS' },
    { date: '05 Apr 2025', ref: 'PAY-2025-0312', amount: '£1,500.00', method: 'BACS' },
    { date: '12 Mar 2025', ref: 'PAY-2025-0245', amount: '£2,500.00', method: 'Card' },
    { date: '18 Feb 2025', ref: 'PAY-2025-0188', amount: '£1,200.00', method: 'BACS' },
    { date: '25 Jan 2025', ref: 'PAY-2025-0116', amount: '£800.00', method: 'Card' },
  ];

  // Spend trend chart months
  const trendMonths = [
    { label: 'May 24', barH: 28, lineY: 42 },
    { label: 'Jun 24', barH: 34, lineY: 44 },
    { label: 'Jul 24', barH: 48, lineY: 47 },
    { label: 'Aug 24', barH: 56, lineY: 52 },
    { label: 'Sep 24', barH: 62, lineY: 58 },
    { label: 'Oct 24', barH: 58, lineY: 59 },
    { label: 'Nov 24', barH: 68, lineY: 66 },
    { label: 'Dec 24', barH: 74, lineY: 71 },
    { label: 'Jan 25', barH: 79, lineY: 74 },
    { label: 'Feb 25', barH: 85, lineY: 76 },
    { label: 'Mar 25', barH: 90, lineY: 78 },
    { label: 'Apr 25', barH: 96, lineY: 82 },
  ];

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newEntry = {
      id: String(Date.now()),
      author: 'John Doe',
      authorRole: 'Managing Director',
      initials: 'JD',
      bg: '#2563EB',
      date: 'Just now',
      text: newNoteText.trim(),
    };
    setNotes([newEntry, ...notes]);
    setNewNoteText('');
    setShowAddNoteModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '36px', color: '#0F172A' }}>
      
      {/* ── 1. BREADCRUMBS & TOP TITLE ───────────────────────────────────────── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
          <Link href="/finance" style={{ color: '#0284C7', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/customers" style={{ color: '#0284C7', textDecoration: 'none' }}>Customers</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0F172A', fontWeight: 600 }}>Customer Detail</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Customer Detail
          </h1>
        </div>
        <div style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
          Harbour Cafe Ltd
        </div>
      </div>

      {/* ── 2. MAIN CUSTOMER HEADER SUMMARY CARD (Screen 03 Top Card) ──────── */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '20px 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 1.2fr) minmax(220px, 1fr) minmax(220px, 1fr) minmax(220px, 0.9fr)',
          gap: '24px',
          alignItems: 'start',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        {/* Col 1: Customer Profile + Contact */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Logo container: soft warm beige rounded square with brown coffee icon */}
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '16px',
              background: '#FDF6E9',
              border: '1px solid #F6E6C9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#78350F',
              flexShrink: 0,
            }}
          >
            <Coffee size={36} weight="duotone" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Harbour Cafe Ltd
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

            <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>CUS-014</span>
              <span>•</span>
              <span>VAT GB987654321</span>
            </div>

            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12.5px', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={15} color="#64748B" />
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Emma Wilson</span>
                <span style={{ color: '#94A3B8', fontSize: '11.5px' }}>Owner</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EnvelopeSimple size={15} color="#64748B" />
                <a href="mailto:emma@harbourcafe.co.uk" style={{ color: '#0284C7', textDecoration: 'none' }}>
                  emma@harbourcafe.co.uk
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#64748B" />
                <span>+44 20 7946 0123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Billing Address */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
            <MapPin size={16} color="#009A96" weight="bold" />
            <span>Billing address</span>
          </div>
          <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
            <div>Harbour Cafe Ltd</div>
            <div>15 Marina Walk</div>
            <div>Brighton</div>
            <div>East Sussex BN1 1AA</div>
            <div>United Kingdom</div>
          </div>
        </div>

        {/* Col 3: Account Details */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
            <CreditCard size={16} color="#009A96" weight="bold" />
            <span>Account details</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '6px', fontSize: '12.5px' }}>
            <span style={{ color: '#64748B' }}>Payment terms</span>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>Net 30 days</span>

            <span style={{ color: '#64748B' }}>Credit limit</span>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>£20,000</span>

            <span style={{ color: '#64748B' }}>Current balance</span>
            <span style={{ fontWeight: 700, color: '#DC2626' }}>£8,450</span>

            <span style={{ color: '#64748B' }}>Overdue balance</span>
            <span style={{ fontWeight: 700, color: '#DC2626' }}>£5,200</span>

            <span style={{ color: '#64748B' }}>Default currency</span>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>GBP</span>
          </div>
        </div>

        {/* Col 4: Action Buttons (Right Stack) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '170px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Actions
          </div>
          
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => alert('New invoice opened for Harbour Cafe Ltd')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '34px',
                background: '#007D7D',
                color: '#FFFFFF',
                borderRadius: '6px',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0, 125, 125, 0.25)',
              }}
            >
              <FileText size={15} weight="bold" />
              <span>New invoice</span>
            </button>
            <button
              style={{
                width: '34px',
                height: '34px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer',
              }}
            >
              <DotsThreeVertical size={16} />
            </button>
          </div>

          <button
            onClick={() => alert('Record receipt modal')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '34px',
              background: '#FFFFFF',
              color: '#0F172A',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Receipt size={15} color="#007D7D" weight="bold" />
            <span>Record receipt</span>
          </button>

          <button
            onClick={() => alert('Viewing statements for Harbour Cafe Ltd')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '34px',
              background: '#FFFFFF',
              color: '#0F172A',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Files size={15} color="#64748B" />
            <span>View statements</span>
          </button>
        </div>
      </div>

      {/* ── 3. SUB-NAVIGATION TABS (Overview, Invoices 12, Credit notes 3, Receipts 8, Activity) ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '0',
          marginTop: '4px',
        }}
      >
        {[
          { key: 'overview', label: 'Overview', icon: FileText },
          { key: 'invoices', label: 'Invoices', badge: '12', icon: FileText },
          { key: 'credit-notes', label: 'Credit notes', badge: '3', icon: Files },
          { key: 'receipts', label: 'Receipts', badge: '8', icon: Receipt },
          { key: 'activity', label: 'Activity', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
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
              <Icon size={16} weight={isSel ? 'bold' : 'regular'} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: '10px',
                    background: isSel ? '#E0F2FE' : '#F1F5F9',
                    color: isSel ? '#0284C7' : '#64748B',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── 4. THREE TOP ANALYTICS CARDS (Outstanding Balance, Ageing Analysis, Spend Trend) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1fr) minmax(320px, 1.25fr)', gap: '16px' }}>
        
        {/* Card 1: Outstanding Balance (Donut breakdown) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0' }}>
            Outstanding Balance
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            {/* Donut graphic */}
            <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
              <svg width="120" height="120" viewBox="0 0 36 36">
                {/* Background Ring */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F1F5F9" strokeWidth="4.2" />
                {/* Segment 1: Current (0-30 days) 38% Green */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10B981" strokeWidth="4.2" strokeDasharray="38 62" strokeDashoffset="25" />
                {/* Segment 2: 31-60 days 25% Orange */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="4.2" strokeDasharray="25 75" strokeDashoffset="-13" />
                {/* Segment 3: 61-90 days 21% Amber-Red */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#EA580C" strokeWidth="4.2" strokeDasharray="21 79" strokeDashoffset="-38" />
                {/* Segment 4: Over 90 days 16% Red */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#EF4444" strokeWidth="4.2" strokeDasharray="16 84" strokeDashoffset="-59" />
              </svg>
              {/* Center text */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>£8,450</span>
                <span style={{ fontSize: '9.5px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>Total Owed</span>
              </div>
            </div>

            {/* Legend table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                  <span style={{ color: '#475569' }}>Current (0-30 days)</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>£3,250</span>
                  <span style={{ color: '#64748B', width: '28px', textAlign: 'right' }}>38%</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                  <span style={{ color: '#475569' }}>31-60 days</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>£2,100</span>
                  <span style={{ color: '#64748B', width: '28px', textAlign: 'right' }}>25%</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EA580C' }} />
                  <span style={{ color: '#475569' }}>61-90 days</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>£1,800</span>
                  <span style={{ color: '#64748B', width: '28px', textAlign: 'right' }}>21%</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                  <span style={{ color: '#475569' }}>Over 90 days</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>£1,300</span>
                  <span style={{ color: '#64748B', width: '28px', textAlign: 'right' }}>15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Ageing Analysis (Bar Histogram) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Ageing Analysis
            </h3>
            <span style={{ fontSize: '11.5px', color: '#64748B' }}>As at 30 Apr 2025</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', paddingTop: '10px' }}>
            {/* Bucket 1: 0-30 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%' }}>
              <span style={{ fontSize: '10.5px', color: '#64748B', marginBottom: 'auto' }}>£4K</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>£3,250</span>
              <div style={{ width: '36px', height: '80px', background: '#10B981', borderRadius: '3px 3px 0 0' }} />
              <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '6px' }}>0-30</span>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>days</span>
            </div>

            {/* Bucket 2: 31-60 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%' }}>
              <span style={{ fontSize: '10.5px', color: '#64748B', marginBottom: 'auto' }}>£3K</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>£2,100</span>
              <div style={{ width: '36px', height: '54px', background: '#F59E0B', borderRadius: '3px 3px 0 0' }} />
              <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '6px' }}>31-60</span>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>days</span>
            </div>

            {/* Bucket 3: 61-90 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%' }}>
              <span style={{ fontSize: '10.5px', color: '#64748B', marginBottom: 'auto' }}>£2K</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>£1,800</span>
              <div style={{ width: '36px', height: '46px', background: '#EA580C', borderRadius: '3px 3px 0 0' }} />
              <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '6px' }}>61-90</span>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>days</span>
            </div>

            {/* Bucket 4: > 90 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%' }}>
              <span style={{ fontSize: '10.5px', color: '#64748B', marginBottom: 'auto' }}>£1K</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>£1,300</span>
              <div style={{ width: '36px', height: '34px', background: '#EF4444', borderRadius: '3px 3px 0 0' }} />
              <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '6px' }}>&gt; 90</span>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>days</span>
            </div>
          </div>
        </div>

        {/* Card 3: Spend Trend (Bar chart with overlay line) */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Spend Trend
            </h3>
            
            {/* Time range selector */}
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

          {/* Trend Chart with Bars and SVG trendline */}
          <div style={{ position: 'relative', height: '110px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '10px' }}>
            {/* SVG Connecting Line for Amount Paid */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                points="12,85 36,83 60,80 84,76 108,70 132,69 156,62 180,56 204,52 228,50 252,48 276,42"
              />
              {[
                [12, 85], [36, 83], [60, 80], [84, 76], [108, 70], [132, 69],
                [156, 62], [180, 56], [204, 52], [228, 50], [252, 48], [276, 42]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
              ))}
            </svg>

            {trendMonths.map((m, i) => (
              <div key={m.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 2 }}>
                <div
                  style={{
                    width: '10px',
                    height: `${m.barH}px`,
                    background: '#93C5FD',
                    borderRadius: '2px 2px 0 0',
                    transition: 'height 0.2s ease',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Month labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '4px', marginTop: '4px' }}>
            {trendMonths.map((m) => (
              <span key={m.label} style={{ fontSize: '9px', color: '#94A3B8', textAlign: 'center', flex: 1 }}>
                {m.label}
              </span>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '12px', fontSize: '11px', color: '#64748B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
              <span>Invoice Value</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>Amount Paid</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. MIDDLE ROW: OPEN INVOICES (Table) & RECENT RECEIPTS (Table) & KEY CONTACTS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1.25fr) minmax(280px, 1fr) minmax(260px, 0.9fr)', gap: '16px' }}>
        
        {/* Box 1: Open Invoices Table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Open Invoices
            </h3>
            <Link href="/finance/sales-invoices" style={{ fontSize: '12px', color: '#0284C7', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View all</span>
              <span>&gt;</span>
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ color: '#64748B', borderBottom: '1px solid #F1F5F9', textAlign: 'left', fontSize: '11px' }}>
                <th style={{ padding: '6px 8px' }}>Invoice No.</th>
                <th style={{ padding: '6px 8px' }}>Issue Date</th>
                <th style={{ padding: '6px 8px' }}>Due Date</th>
                <th style={{ padding: '6px 8px', textAlign: 'center' }}>Days Overdue</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '6px 8px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '6px 4px' }}></th>
              </tr>
            </thead>
            <tbody>
              {openInvoicesList.map((inv) => (
                <tr key={inv.no} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '8px', color: '#0284C7', fontWeight: 600 }}>{inv.no}</td>
                  <td style={{ padding: '8px', color: '#475569' }}>{inv.date}</td>
                  <td style={{ padding: '8px', color: '#475569' }}>{inv.due}</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: inv.overdueDays !== '-' ? '#DC2626' : '#94A3B8', fontWeight: inv.overdueDays !== '-' ? 700 : 400 }}>
                    {inv.overdueDays}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{inv.amount}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '10.5px',
                        fontWeight: 600,
                        background: inv.status === 'Current' ? '#DCFCE7' : '#FEE2E2',
                        color: inv.status === 'Current' ? '#166534' : '#991B1B',
                      }}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '8px 4px', textAlign: 'center', color: '#94A3B8' }}>
                    <DotsThreeVertical size={14} style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Box 2: Recent Receipts Table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Recent Receipts
            </h3>
            <Link href="/finance/payments" style={{ fontSize: '12px', color: '#0284C7', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View all</span>
              <span>&gt;</span>
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ color: '#64748B', borderBottom: '1px solid #F1F5F9', textAlign: 'left', fontSize: '11px' }}>
                <th style={{ padding: '6px 8px' }}>Date</th>
                <th style={{ padding: '6px 8px' }}>Reference</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '6px 8px', textAlign: 'center' }}>Method</th>
              </tr>
            </thead>
            <tbody>
              {recentReceiptsList.map((rec) => (
                <tr key={rec.ref} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '8px', color: '#475569' }}>{rec.date}</td>
                  <td style={{ padding: '8px', color: '#475569', fontWeight: 500 }}>{rec.ref}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{rec.amount}</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#64748B' }}>{rec.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Box 3: Key Contacts */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Key Contacts
            </h3>
            <button
              onClick={() => alert('Add contact modal')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid #009A96',
                background: '#FFFFFF',
                color: '#009A96',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Plus size={12} weight="bold" />
              <span>Add contact</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Contact 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid #F8FAFC', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#D1FAE5', color: '#059669', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  EW
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Emma Wilson</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Owner</div>
                  <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '4px' }}>emma@harbourcafe.co.uk</div>
                  <div style={{ fontSize: '11.5px', color: '#475569' }}>+44 20 7946 0123</div>
                </div>
              </div>
              <DotsThreeVertical size={16} color="#94A3B8" style={{ cursor: 'pointer' }} />
            </div>

            {/* Contact 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#DBEAFE', color: '#2563EB', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  TB
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Tom Bennett</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Operations Manager</div>
                  <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '4px' }}>tom@harbourcafe.co.uk</div>
                  <div style={{ fontSize: '11.5px', color: '#475569' }}>+44 20 7946 0456</div>
                </div>
              </div>
              <DotsThreeVertical size={16} color="#94A3B8" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. BOTTOM ROW: NOTES (2/3 width) & CUSTOMER SUMMARY (1/3 width) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1.8fr) minmax(300px, 1.2fr)', gap: '16px' }}>
        
        {/* Notes Container */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="#16A34A" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Notes
              </h3>
            </div>
            
            <button
              onClick={() => setShowAddNoteModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                border: '1px solid #009A96',
                background: '#FFFFFF',
                color: '#009A96',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Plus size={13} weight="bold" />
              <span>Add note</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {notes.map((n) => (
              <div key={n.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>{n.author}</span>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>{n.date}</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                    {n.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Summary 4 Metric Cards */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Customer Summary
            </h3>
            <span style={{ fontSize: '11px', color: '#64748B' }}>This Year ▼</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {/* Box 1: Total Invoiced */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#DBEAFE', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={16} />
              </div>
              <span style={{ fontSize: '10.5px', color: '#64748B' }}>Total Invoiced</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>£18,450</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#16A34A', fontWeight: 600 }}>
                <TrendUp size={12} weight="bold" />
                <span>12%</span>
                <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. last year</span>
              </div>
            </div>

            {/* Box 2: Total Paid */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Receipt size={16} />
              </div>
              <span style={{ fontSize: '10.5px', color: '#64748B' }}>Total Paid</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>£10,000</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#16A34A', fontWeight: 600 }}>
                <TrendUp size={12} weight="bold" />
                <span>28%</span>
                <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. last year</span>
              </div>
            </div>

            {/* Box 3: Outstanding */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={16} />
              </div>
              <span style={{ fontSize: '10.5px', color: '#64748B' }}>Outstanding</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>£8,450</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#DC2626', fontWeight: 600 }}>
                <TrendUp size={12} weight="bold" />
                <span>6%</span>
                <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. last year</span>
              </div>
            </div>

            {/* Box 4: Open Invoices */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Files size={16} />
              </div>
              <span style={{ fontSize: '10.5px', color: '#64748B' }}>Open Invoices</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>6</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#DC2626', fontWeight: 600 }}>
                <TrendUp size={12} weight="bold" />
                <span>2</span>
                <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. last year</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 7. ADD NOTE MODAL ──────────────────────────────────────────────── */}
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
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Add Customer Note</h3>
              <button
                onClick={() => setShowAddNoteModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>
            
            <textarea
              rows={4}
              placeholder="Enter interaction or account note..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
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
                  background: '#007D7D',
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

      {/* Footer reference note matching prototype */}
      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '10px' }}>
        Screen 03 — Customer Detail
      </div>
    </div>
  );
}
