'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Calendar,
  CaretDown,
  CaretRight,
  DownloadSimple,
  Clock,
  TrendUp,
  TrendDown,
  Funnel,
  ArrowsClockwise,
  Plus,
  Coins,
  CreditCard,
  ChartBar,
  Percent,
  CheckCircle,
  FileXls,
  FilePdf,
  DotsThreeVertical,
  Play,
  FloppyDisk,
  ArrowRight,
} from '@phosphor-icons/react';

export default function FinanceReportsPage() {
  const [activeTab, setActiveTab] = useState<'library' | 'my' | 'scheduled' | 'recent' | 'templates'>('library');
  const [period, setPeriod] = useState('01 Apr 2025 - 30 Apr 2025');
  const [legalEntity, setLegalEntity] = useState('All entities');
  const [comparisonPeriod, setComparisonPeriod] = useState('Previous period');
  const [accountingBasis, setAccountingBasis] = useState('Accrual');
  const [showVariance, setShowVariance] = useState(true);
  const [currency, setCurrency] = useState('GBP - British Pound');
  const [chartTimeframe, setChartTimeframe] = useState('Monthly');

  // P&L Statement row collapse state
  const [revenueExpanded, setRevenueExpanded] = useState(true);
  const [cosExpanded, setCosExpanded] = useState(true);
  const [opexExpanded, setOpexExpanded] = useState(true);

  // Filter toast notification
  const [showToast, setShowToast] = useState(false);

  const handleRunReport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#F8FAFC' }}>
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
          <span>Report refreshed for {period} ({accountingBasis})</span>
        </div>
      )}

      {/* Top Header / Actions Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '20px 28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
              Finance Reports Home
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Access, run and manage your financial reports. Use standard reports or create your own, with flexible filters and scheduling options.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                fontSize: '12.5px',
                color: '#334155',
                fontWeight: 500,
              }}
            >
              <Calendar size={15} color="#64748B" />
              <span>{period}</span>
              <CaretDown size={12} color="#94A3B8" />
            </div>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#0284C7',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(2, 132, 199, 0.2)',
              }}
            >
              <Plus size={15} weight="bold" />
              <span>New report</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <Clock size={15} color="#64748B" />
              <span>Schedule report</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <DownloadSimple size={15} color="#64748B" />
              <span>Export</span>
              <CaretDown size={12} color="#94A3B8" />
            </button>
          </div>
        </div>

        {/* Secondary Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '22px', borderBottom: '1px solid #F1F5F9' }}>
          {[
            { id: 'library', label: 'Report library', icon: <FileText size={15} weight="bold" /> },
            { id: 'my', label: 'My reports', icon: <ChartBar size={15} weight="bold" /> },
            { id: 'scheduled', label: 'Scheduled reports', icon: <Clock size={15} weight="bold" /> },
            { id: 'recent', label: 'Recently exported', icon: <DownloadSimple size={15} weight="bold" /> },
            { id: 'templates', label: 'Report templates', icon: <FileXls size={15} weight="bold" /> },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: active ? 600 : 500,
                  color: active ? '#0F766E' : '#64748B',
                  backgroundColor: active ? '#F0FDFA' : 'transparent',
                  border: 'none',
                  borderBottom: active ? '2px solid #0F766E' : '2px solid transparent',
                  cursor: 'pointer',
                  borderRadius: '4px 4px 0 0',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Configurator & Report, Right Sidebar Panels */}
      <div
        style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 340px',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Report Builder & Live Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Profit and Loss Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            {/* Report Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#DCFCE7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16A34A',
                  }}
                >
                  <ChartBar size={22} weight="fill" />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
                    Profit and Loss
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                    Shows your income, expenses and profit for a selected period. Compare with previous periods to track performance.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    color: '#334155',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Save as</span>
                  <CaretDown size={11} color="#64748B" />
                </button>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '4px',
                  }}
                >
                  <DotsThreeVertical size={18} weight="bold" />
                </button>
              </div>
            </div>

            {/* Configurator Filters Form Row */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr) auto',
                gap: '12px',
                alignItems: 'flex-end',
                marginBottom: '24px',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Period *
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#1E293B',
                  }}
                >
                  <Calendar size={14} color="#64748B" />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{period}</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Legal entity
                </label>
                <select
                  value={legalEntity}
                  onChange={(e) => setLegalEntity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#1E293B',
                    outline: 'none',
                  }}
                >
                  <option>All entities</option>
                  <option>Tessma UK Ltd</option>
                  <option>Tessma US Inc</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Comparison period
                </label>
                <select
                  value={comparisonPeriod}
                  onChange={(e) => setComparisonPeriod(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#1E293B',
                    outline: 'none',
                  }}
                >
                  <option>Previous period</option>
                  <option>Same period last year</option>
                  <option>Budget</option>
                  <option>None</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Accounting basis
                </label>
                <select
                  value={accountingBasis}
                  onChange={(e) => setAccountingBasis(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#1E293B',
                    outline: 'none',
                  }}
                >
                  <option>Accrual</option>
                  <option>Cash basis</option>
                </select>
              </div>

              <div>
                <button
                  onClick={handleRunReport}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#0F766E',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(15, 118, 110, 0.25)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Play size={13} weight="fill" />
                  <span>Run report</span>
                </button>
              </div>
            </div>

            {/* 4 KPI Cards in a row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '14px',
                marginBottom: '26px',
              }}
            >
              {/* Card 1: Total Revenue */}
              <div
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Total Revenue</span>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Coins size={16} color="#16A34A" weight="bold" />
                  </div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  £542,320
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#16A34A', fontWeight: 600 }}>
                  <TrendUp size={14} weight="bold" />
                  <span>12%</span>
                  <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. Mar 2025</span>
                </div>
                {/* Visual sparkline SVG */}
                <svg width="100%" height="24" style={{ marginTop: '6px' }}>
                  <path d="M 0 20 Q 25 15 50 18 T 100 8 T 150 14 T 200 4" fill="none" stroke="#22C55E" strokeWidth="2" />
                </svg>
              </div>

              {/* Card 2: Total Expenses */}
              <div
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Total Expenses</span>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CreditCard size={16} color="#DC2626" weight="bold" />
                  </div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  £318,450
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#DC2626', fontWeight: 600 }}>
                  <TrendDown size={14} weight="bold" />
                  <span>8%</span>
                  <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. Mar 2025</span>
                </div>
                <svg width="100%" height="24" style={{ marginTop: '6px' }}>
                  <path d="M 0 6 Q 30 10 70 8 T 120 18 T 160 14 T 200 22" fill="none" stroke="#EF4444" strokeWidth="2" />
                </svg>
              </div>

              {/* Card 3: Net Profit */}
              <div
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Net Profit</span>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChartBar size={16} color="#0284C7" weight="bold" />
                  </div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  £223,870
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#16A34A', fontWeight: 600 }}>
                  <TrendUp size={14} weight="bold" />
                  <span>18%</span>
                  <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. Mar 2025</span>
                </div>
                <svg width="100%" height="24" style={{ marginTop: '6px' }}>
                  <path d="M 0 18 Q 30 14 60 16 T 120 10 T 170 8 T 200 3" fill="none" stroke="#0284C7" strokeWidth="2" />
                </svg>
              </div>

              {/* Card 4: Profit Margin */}
              <div
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Profit Margin</span>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Percent size={16} color="#9333EA" weight="bold" />
                  </div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  41.3%
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#16A34A', fontWeight: 600 }}>
                  <TrendUp size={14} weight="bold" />
                  <span>2.1 pp</span>
                  <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. Mar 2025</span>
                </div>
                <svg width="100%" height="24" style={{ marginTop: '6px' }}>
                  <path d="M 0 16 Q 40 18 80 12 T 140 10 T 200 4" fill="none" stroke="#A855F7" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Income and Expenses Trend Chart Card */}
            <div
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '26px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Income and Expenses Trend
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    <span>Revenue</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F87171' }} />
                    <span>Expenses</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569' }}>
                    <span style={{ width: '12px', height: '2px', backgroundColor: '#0284C7' }} />
                    <span>Net Profit</span>
                  </div>
                  <select
                    value={chartTimeframe}
                    onChange={(e) => setChartTimeframe(e.target.value)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '11.5px',
                      borderRadius: '4px',
                      border: '1px solid #CBD5E1',
                      color: '#475569',
                      outline: 'none',
                    }}
                  >
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </div>

              {/* Bar & Line Chart Canvas SVG */}
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="45" y1="20" x2="590" y2="20" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="45" y1="60" x2="590" y2="60" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="45" y1="100" x2="590" y2="100" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="45" y1="140" x2="590" y2="140" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="45" y1="180" x2="590" y2="180" stroke="#E2E8F0" />

                  {/* Y Axis Labels */}
                  <text x="38" y="24" textAnchor="end" fontSize="10" fill="#94A3B8">£800K</text>
                  <text x="38" y="64" textAnchor="end" fontSize="10" fill="#94A3B8">£600K</text>
                  <text x="38" y="104" textAnchor="end" fontSize="10" fill="#94A3B8">£400K</text>
                  <text x="38" y="144" textAnchor="end" fontSize="10" fill="#94A3B8">£200K</text>
                  <text x="38" y="184" textAnchor="end" fontSize="10" fill="#94A3B8">£0</text>

                  {/* 6 Month Bars and Line Points */}
                  {/* Nov 2024 */}
                  <rect x="80" y="80" width="22" height="100" rx="2" fill="#6EE7B7" opacity="0.9" />
                  <rect x="106" y="110" width="22" height="70" rx="2" fill="#FCA5A5" opacity="0.9" />

                  {/* Dec 2024 */}
                  <rect x="165" y="70" width="22" height="110" rx="2" fill="#6EE7B7" opacity="0.9" />
                  <rect x="191" y="115" width="22" height="65" rx="2" fill="#FCA5A5" opacity="0.9" />

                  {/* Jan 2025 */}
                  <rect x="250" y="82" width="22" height="98" rx="2" fill="#6EE7B7" opacity="0.9" />
                  <rect x="276" y="118" width="22" height="62" rx="2" fill="#FCA5A5" opacity="0.9" />

                  {/* Feb 2025 */}
                  <rect x="335" y="76" width="22" height="104" rx="2" fill="#6EE7B7" opacity="0.9" />
                  <rect x="361" y="114" width="22" height="66" rx="2" fill="#FCA5A5" opacity="0.9" />

                  {/* Mar 2025 */}
                  <rect x="420" y="68" width="22" height="112" rx="2" fill="#6EE7B7" opacity="0.9" />
                  <rect x="446" y="108" width="22" height="72" rx="2" fill="#FCA5A5" opacity="0.9" />

                  {/* Apr 2025 */}
                  <rect x="505" y="55" width="22" height="125" rx="2" fill="#34D399" opacity="0.9" />
                  <rect x="531" y="110" width="22" height="70" rx="2" fill="#F87171" opacity="0.9" />

                  {/* Net Profit Line */}
                  <polyline
                    points="104,130 189,126 274,132 359,122 444,116 529,105"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                  />
                  {/* Data Points */}
                  <circle cx="104" cy="130" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="189" cy="126" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="274" cy="132" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="359" cy="122" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="444" cy="116" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="529" cy="105" r="4" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                </svg>

                {/* X Axis Month Labels */}
                <div style={{ display: 'flex', justifyContent: 'space-around', paddingLeft: '50px', fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
                  <span>Nov 2024</span>
                  <span>Dec 2024</span>
                  <span>Jan 2025</span>
                  <span>Feb 2025</span>
                  <span>Mar 2025</span>
                  <span>Apr 2025</span>
                </div>
              </div>
            </div>

            {/* Profit and Loss Statement Table */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Profit and Loss Statement
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Show Variance toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                    <div
                      onClick={() => setShowVariance(!showVariance)}
                      style={{
                        width: '32px',
                        height: '18px',
                        borderRadius: '10px',
                        backgroundColor: showVariance ? '#0F766E' : '#CBD5E1',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          position: 'absolute',
                          top: '2px',
                          left: showVariance ? '16px' : '2px',
                          transition: 'left 0.2s ease',
                        }}
                      />
                    </div>
                    <span>Show variance</span>
                  </div>

                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      color: '#334155',
                      outline: 'none',
                    }}
                  >
                    <option>GBP - British Pound</option>
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                  </select>

                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={16} weight="bold" />
                  </button>
                </div>
              </div>

              {/* P&L Data Table */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                      <th style={{ padding: '10px 16px' }}>Description</th>
                      <th style={{ padding: '10px 16px', textAlign: 'right' }}>Apr 2025</th>
                      <th style={{ padding: '10px 16px', textAlign: 'right' }}>Mar 2025</th>
                      {showVariance && <th style={{ padding: '10px 16px', textAlign: 'right' }}>Variance</th>}
                      {showVariance && <th style={{ padding: '10px 16px', textAlign: 'right' }}>Variance %</th>}
                      <th style={{ width: '30px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Revenue Header Row */}
                    <tr
                      onClick={() => setRevenueExpanded(!revenueExpanded)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderBottom: '1px solid #F1F5F9',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: '#0F172A',
                      }}
                    >
                      <td style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {revenueExpanded ? <CaretDown size={12} weight="bold" /> : <CaretRight size={12} weight="bold" />}
                        <span>Revenue</span>
                      </td>
                      <td style={{ padding: '10px 16px', textAlign: 'right' }}>£542,320</td>
                      <td style={{ padding: '10px 16px', textAlign: 'right' }}>£484,210</td>
                      {showVariance && <td style={{ padding: '10px 16px', textAlign: 'right', color: '#16A34A' }}>£58,110</td>}
                      {showVariance && <td style={{ padding: '10px 16px', textAlign: 'right', color: '#16A34A' }}>12%</td>}
                      <td></td>
                    </tr>

                    {/* Revenue Sub-items */}
                    {revenueExpanded && (
                      <>
                        <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #F1F5F9', color: '#475569' }}>
                          <td style={{ padding: '8px 16px 8px 36px' }}>Product Sales</td>
                          <td style={{ padding: '8px 16px', textAlign: 'right' }}>£420,500</td>
                          <td style={{ padding: '8px 16px', textAlign: 'right' }}>£380,600</td>
                          {showVariance && <td style={{ padding: '8px 16px', textAlign: 'right', color: '#16A34A' }}>£39,900</td>}
                          {showVariance && <td style={{ padding: '8px 16px', textAlign: 'right', color: '#16A34A' }}>10%</td>}
                          <td></td>
                        </tr>
                        <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #F1F5F9', color: '#475569' }}>
                          <td style={{ padding: '8px 16px 8px 36px' }}>Service Income</td>
                          <td style={{ padding: '8px 16px', textAlign: 'right' }}>£96,250</td>
                          <td style={{ padding: '8px 16px', textAlign: 'right' }}>£82,340</td>
                          {showVariance && <td style={{ padding: '8px 16px', textAlign: 'right', color: '#16A34A' }}>£13,910</td>}
                          {showVariance && <td style={{ padding: '8px 16px', textAlign: 'right', color: '#16A34A' }}>17%</td>}
                          <td></td>
                        </tr>
                        <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #F1F5F9', color: '#475569' }}>
                          <td style={{ padding: '8px 16px 8px 36px' }}>Other Income</td>
                          <td style={{ padding: '8px 16px', textAlign: 'right' }}>£25,570</td>
                          <td style={{ padding: '8px 16px', textAlign: 'right' }}>£21,270</td>
                          {showVariance && <td style={{ padding: '8px 16px', textAlign: 'right', color: '#16A34A' }}>£4,300</td>}
                          {showVariance && <td style={{ padding: '8px 16px', textAlign: 'right', color: '#16A34A' }}>20%</td>}
                          <td></td>
                        </tr>
                      </>
                    )}

                    {/* Cost of Sales Row */}
                    <tr
                      onClick={() => setCosExpanded(!cosExpanded)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderBottom: '1px solid #F1F5F9',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: '#0F172A',
                      }}
                    >
                      <td style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {cosExpanded ? <CaretDown size={12} weight="bold" /> : <CaretRight size={12} weight="bold" />}
                        <span>Cost of Sales</span>
                      </td>
                      <td style={{ padding: '10px 16px', textAlign: 'right', color: '#DC2626' }}>-£210,450</td>
                      <td style={{ padding: '10px 16px', textAlign: 'right', color: '#DC2626' }}>-£195,320</td>
                      {showVariance && <td style={{ padding: '10px 16px', textAlign: 'right', color: '#DC2626' }}>-£15,130</td>}
                      {showVariance && <td style={{ padding: '10px 16px', textAlign: 'right', color: '#DC2626' }}>8%</td>}
                      <td></td>
                    </tr>

                    {/* Gross Profit Row */}
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontWeight: 700, color: '#0F172A' }}>
                      <td style={{ padding: '11px 16px 11px 26px' }}>Gross Profit</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right' }}>£331,870</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right' }}>£288,890</td>
                      {showVariance && <td style={{ padding: '11px 16px', textAlign: 'right', color: '#16A34A' }}>£42,980</td>}
                      {showVariance && <td style={{ padding: '11px 16px', textAlign: 'right', color: '#16A34A' }}>15%</td>}
                      <td></td>
                    </tr>

                    {/* Operating Expenses */}
                    <tr
                      onClick={() => setOpexExpanded(!opexExpanded)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderBottom: '1px solid #F1F5F9',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: '#0F172A',
                      }}
                    >
                      <td style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {opexExpanded ? <CaretDown size={12} weight="bold" /> : <CaretRight size={12} weight="bold" />}
                        <span>Operating Expenses</span>
                      </td>
                      <td style={{ padding: '10px 16px', textAlign: 'right', color: '#DC2626' }}>-£108,000</td>
                      <td style={{ padding: '10px 16px', textAlign: 'right', color: '#DC2626' }}>-£102,450</td>
                      {showVariance && <td style={{ padding: '10px 16px', textAlign: 'right', color: '#DC2626' }}>-£5,550</td>}
                      {showVariance && <td style={{ padding: '10px 16px', textAlign: 'right', color: '#DC2626' }}>5%</td>}
                      <td></td>
                    </tr>

                    {/* Net Profit Summary Row (Highlighted) */}
                    <tr style={{ backgroundColor: '#F0FDFA', borderTop: '2px solid #0F766E', fontWeight: 700, color: '#0F766E', fontSize: '13.5px' }}>
                      <td style={{ padding: '12px 16px 12px 26px' }}>Net Profit</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>£223,870</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>£186,440</td>
                      {showVariance && <td style={{ padding: '12px 16px', textAlign: 'right' }}>£37,430</td>}
                      {showVariance && <td style={{ padding: '12px 16px', textAlign: 'right' }}>20%</td>}
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Library, Popular, Scheduled, Recent Exports */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Report Library Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={17} color="#0F766E" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Report library</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span>View all</span>
                <ArrowRight size={12} weight="bold" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { name: 'Financial statements', count: 4, icon: <FileText size={15} color="#0284C7" /> },
                { name: 'Sales', count: 3, icon: <TrendUp size={15} color="#16A34A" /> },
                { name: 'Purchases', count: 2, icon: <CreditCard size={15} color="#0F766E" /> },
                { name: 'Banking', count: 3, icon: <Coins size={15} color="#7C3AED" /> },
                { name: 'VAT & Tax', count: 3, icon: <Percent size={15} color="#D97706" /> },
                { name: 'Management reporting', count: 4, icon: <ChartBar size={15} color="#2563EB" /> },
              ].map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    color: '#334155',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#94A3B8', backgroundColor: '#F1F5F9', padding: '1px 6px', borderRadius: '10px' }}>{item.count}</span>
                    <CaretRight size={12} color="#94A3B8" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Reports Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 14px 0' }}>Popular reports</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { title: 'Profit and Loss', subtitle: 'Income, expenses and net profit', icon: <ChartBar size={15} color="#16A34A" /> },
                { title: 'Balance Sheet', subtitle: 'Assets, liabilities and equity', icon: <FileText size={15} color="#0284C7" /> },
                { title: 'Trial Balance', subtitle: 'List of all ledger accounts', icon: <Coins size={15} color="#7C3AED" /> },
                { title: 'Aged Receivables', subtitle: 'Outstanding customer balances', icon: <Clock size={15} color="#D97706" /> },
                { title: 'Aged Payables', subtitle: 'Outstanding supplier balances', icon: <CreditCard size={15} color="#DC2626" /> },
                { title: 'VAT Summary', subtitle: 'VAT due and reclaimed', icon: <Percent size={15} color="#0D9488" /> },
                { title: 'Cash Flow Forecast', subtitle: 'Forecast of cash inflows and outflows', icon: <TrendUp size={15} color="#16A34A" /> },
                { title: 'Revenue by Customer', subtitle: 'Revenue breakdown by customer', icon: <Coins size={15} color="#2563EB" /> },
              ].map((report) => (
                <div
                  key={report.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {report.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#1E293B' }}>{report.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{report.subtitle}</div>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={14} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Reports Widget */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#0284C7" weight="bold" />
                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Scheduled reports</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span>View all</span>
                <ArrowRight size={11} weight="bold" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Monthly Management Pack', schedule: 'Monthly on 5th', status: 'Active' },
                { name: 'VAT Return Report', schedule: 'Quarterly on 7th', status: 'Active' },
                { name: 'Cash Flow Forecast', schedule: 'Monthly on 1st', status: 'Active' },
              ].map((sch) => (
                <div key={sch.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F8FAFC' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{sch.name}</div>
                    <div style={{ fontSize: '10.5px', color: '#94A3B8' }}>{sch.schedule}</div>
                  </div>
                  <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#16A34A', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '10px' }}>
                    {sch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Exports Widget */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DownloadSimple size={16} color="#0F766E" weight="bold" />
                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Recent exports</h3>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span>View all</span>
                <ArrowRight size={11} weight="bold" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'P&L Apr 2025', date: '28 Apr 2025, 14:32', type: 'excel' },
                { name: 'Balance Sheet Q1 2025', date: '25 Apr 2025, 10:15', type: 'pdf' },
                { name: 'Trial Balance Mar 2025', date: '22 Apr 2025, 16:40', type: 'excel' },
              ].map((exp) => (
                <div key={exp.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F8FAFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {exp.type === 'excel' ? (
                      <FileXls size={16} color="#16A34A" weight="fill" />
                    ) : (
                      <FilePdf size={16} color="#DC2626" weight="fill" />
                    )}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{exp.name}</div>
                      <div style={{ fontSize: '10.5px', color: '#94A3B8' }}>{exp.date}</div>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <DotsThreeVertical size={13} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
