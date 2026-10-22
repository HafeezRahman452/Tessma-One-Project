'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarBlank,
  CaretDown,
  CaretRight,
  WarningCircle,
  Clock,
  DotsThree,
  Check,
  Funnel,
  ArrowUpRight,
  ArrowDownRight,
  ChartPieSlice,
  UsersThree,
} from '@phosphor-icons/react';

interface AttentionItem {
  id: string;
  title: string;
  subtitle: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  priorityColor: string;
  status: 'Overdue' | 'Due Soon' | 'Pending' | 'At Risk' | 'Delayed' | 'In Review';
  statusColor: string;
  statusBg: string;
  dueDate: string;
  daysInfo: string;
  isDateRed?: boolean;
  ownerName: string;
  ownerInitials: string;
  ownerBg: string;
  ownerColor: string;
  link: string;
}

interface UpcomingCommitment {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  dueLabel: string;
  dueColor: string;
  link: string;
}

interface ModuleRisk {
  name: string;
  iconBg: string;
  iconColor: string;
  barColor: string;
  count: number;
  percentage: number;
}

export default function NeedsAttentionPage() {
  const [selectedRange, setSelectedRange] = useState('01 Apr 2025 – 30 Apr 2025');
  const [showRangeDropdown, setShowRangeDropdown] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const dateRanges = [
    '01 Apr 2025 – 30 Apr 2025',
    '01 May 2025 – 31 May 2025',
    '01 Mar 2025 – 31 Mar 2025',
    'This Quarter (Q2 2025)',
    'All Time',
  ];

  // 1. Items Needing Attention Table Data (8 rows matching screenshot)
  const [items, setItems] = useState<AttentionItem[]>([
    {
      id: 'na-1',
      title: 'Invoice INV-1048 overdue',
      subtitle: 'ACME Facilities Ltd',
      module: 'Finance',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      priority: 'Critical',
      priorityColor: '#EF4444',
      status: 'Overdue',
      statusColor: '#EF4444',
      statusBg: '#FEE2E2',
      dueDate: '12 Apr 2025',
      daysInfo: '18 days ago',
      isDateRed: true,
      ownerName: 'John Doe',
      ownerInitials: 'JD',
      ownerBg: '#DBEAFE',
      ownerColor: '#1E40AF',
      link: '/finance/sales-invoices',
    },
    {
      id: 'na-2',
      title: 'Contract C-2023-017 renewal due',
      subtitle: 'Office Cleaning Services',
      module: 'Contracts',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      priority: 'High',
      priorityColor: '#EF4444',
      status: 'Due Soon',
      statusColor: '#D97706',
      statusBg: '#FEF3C7',
      dueDate: '25 Apr 2025',
      daysInfo: '3 days left',
      ownerName: 'Sarah Connor',
      ownerInitials: 'SC',
      ownerBg: '#E0E7FF',
      ownerColor: '#3730A3',
      link: '/contracts',
    },
    {
      id: 'na-3',
      title: 'ISO 27001 annual review pending',
      subtitle: 'Information Security',
      module: 'Compliance',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      priority: 'High',
      priorityColor: '#EF4444',
      status: 'Pending',
      statusColor: '#2563EB',
      statusBg: '#EFF6FF',
      dueDate: '28 Apr 2025',
      daysInfo: '6 days left',
      isDateRed: true,
      ownerName: 'Liam Turner',
      ownerInitials: 'LT',
      ownerBg: '#F1F5F9',
      ownerColor: '#475569',
      link: '/compliance',
    },
    {
      id: 'na-4',
      title: 'SLA breach – Ticket #84231',
      subtitle: 'Email service unavailable',
      module: 'Service & Support',
      moduleColor: '#009A96',
      moduleBg: '#E6F6F6',
      priority: 'Critical',
      priorityColor: '#EF4444',
      status: 'At Risk',
      statusColor: '#EF4444',
      statusBg: '#FEE2E2',
      dueDate: '21 Apr 2025',
      daysInfo: '3 days ago',
      isDateRed: true,
      ownerName: 'Maria Keller',
      ownerInitials: 'MK',
      ownerBg: '#FCE7F3',
      ownerColor: '#9D174D',
      link: '/service-support',
    },
    {
      id: 'na-5',
      title: 'Project milestone delayed',
      subtitle: 'Website Redesign',
      module: 'Projects',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      priority: 'High',
      priorityColor: '#EA580C',
      status: 'Delayed',
      statusColor: '#DC2626',
      statusBg: '#FEE2E2',
      dueDate: '30 Apr 2025',
      daysInfo: '2 days left',
      ownerName: 'Alex Price',
      ownerInitials: 'AP',
      ownerBg: '#FEF3C7',
      ownerColor: '#92400E',
      link: '/projects',
    },
    {
      id: 'na-6',
      title: 'Approval required – Purchase Order',
      subtitle: 'New laptops for London office',
      module: 'Procurement',
      moduleColor: '#D97706',
      moduleBg: '#FEF3C7',
      priority: 'High',
      priorityColor: '#EA580C',
      status: 'Pending',
      statusColor: '#2563EB',
      statusBg: '#EFF6FF',
      dueDate: '24 Apr 2025',
      daysInfo: '2 days left',
      ownerName: 'John Doe',
      ownerInitials: 'JD',
      ownerBg: '#DBEAFE',
      ownerColor: '#1E40AF',
      link: '/procurement',
    },
    {
      id: 'na-7',
      title: 'Document awaiting review',
      subtitle: 'Health & Safety Policy v2.0',
      module: 'Documents',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      priority: 'Medium',
      priorityColor: '#EA580C',
      status: 'In Review',
      statusColor: '#7C3AED',
      statusBg: '#F5F3FF',
      dueDate: '26 Apr 2025',
      daysInfo: '4 days left',
      ownerName: 'Sarah Connor',
      ownerInitials: 'SC',
      ownerBg: '#E0E7FF',
      ownerColor: '#3730A3',
      link: '/contracts',
    },
    {
      id: 'na-8',
      title: 'Contract compliance action pending',
      subtitle: 'Data Processing Agreement',
      module: 'Contracts',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      priority: 'Medium',
      priorityColor: '#EA580C',
      status: 'Pending',
      statusColor: '#2563EB',
      statusBg: '#EFF6FF',
      dueDate: '29 Apr 2025',
      daysInfo: '7 days left',
      ownerName: 'Liam Turner',
      ownerInitials: 'LT',
      ownerBg: '#F1F5F9',
      ownerColor: '#475569',
      link: '/contracts',
    },
  ]);

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 2. Upcoming Commitments (Right column)
  const upcomingCommitments: UpcomingCommitment[] = [
    {
      id: 'uc-1',
      day: '22',
      month: 'APR',
      title: 'Finance review meeting',
      subtitle: 'Q1 financial results',
      module: 'Finance',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueLabel: 'Today',
      dueColor: '#EF4444',
      link: '/finance',
    },
    {
      id: 'uc-2',
      day: '24',
      month: 'APR',
      title: 'Contract renewal – Office Cleaning',
      subtitle: 'C-2023-017',
      module: 'Contracts',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      dueLabel: '2 days',
      dueColor: '#EF4444',
      link: '/contracts',
    },
    {
      id: 'uc-3',
      day: '25',
      month: 'APR',
      title: 'Project steering committee',
      subtitle: 'Website Redesign',
      module: 'Projects',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueLabel: '3 days',
      dueColor: '#EF4444',
      link: '/projects',
    },
    {
      id: 'uc-4',
      day: '28',
      month: 'APR',
      title: 'ISO 27001 annual review',
      subtitle: 'Compliance audit',
      module: 'Compliance',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      dueLabel: '6 days',
      dueColor: '#EF4444',
      link: '/compliance',
    },
    {
      id: 'uc-5',
      day: '30',
      month: 'APR',
      title: 'Supplier performance review',
      subtitle: 'Tech Supplies Ltd',
      module: 'Procurement',
      moduleColor: '#D97706',
      moduleBg: '#FEF3C7',
      dueLabel: '8 days',
      dueColor: '#EF4444',
      link: '/procurement',
    },
  ];

  // 3. Risk by Module (Right column bottom)
  const moduleRisks: ModuleRisk[] = [
    { name: 'Finance', iconBg: '#EFF6FF', iconColor: '#2563EB', barColor: '#EF4444', count: 12, percentage: 80 },
    { name: 'Contracts', iconBg: '#F5F3FF', iconColor: '#7C3AED', barColor: '#F97316', count: 10, percentage: 65 },
    { name: 'Compliance', iconBg: '#EFF6FF', iconColor: '#2563EB', barColor: '#F59E0B', count: 8, percentage: 50 },
    { name: 'Service & Support', iconBg: '#E6F6F6', iconColor: '#009A96', barColor: '#F59E0B', count: 7, percentage: 45 },
    { name: 'Projects', iconBg: '#EFF6FF', iconColor: '#2563EB', barColor: '#EAB308', count: 6, percentage: 38 },
    { name: 'Procurement', iconBg: '#FEF3C7', iconColor: '#D97706', barColor: '#FACC15', count: 5, percentage: 30 },
    { name: 'HR', iconBg: '#EFF6FF', iconColor: '#2563EB', barColor: '#93C5FD', count: 3, percentage: 20 },
    { name: 'IT & Assets', iconBg: '#F1F5F9', iconColor: '#64748B', barColor: '#93C5FD', count: 3, percentage: 20 },
  ];

  // 4. Sparkline SVGs
  const redSparkline = (
    <svg width="78" height="28" viewBox="0 0 78 28" fill="none">
      <path
        d="M2 24 L16 23 L30 18 L46 20 L60 12 L76 4"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const orangeSparkline = (
    <svg width="78" height="28" viewBox="0 0 78 28" fill="none">
      <path
        d="M2 24 L18 22 L34 23 L48 16 L62 18 L76 5"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const purpleSparkline = (
    <svg width="78" height="28" viewBox="0 0 78 28" fill="none">
      <path
        d="M2 24 L18 23 L34 16 L48 20 L62 13 L76 4"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '40px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* 1. Header Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Needs Attention
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#64748B',
              marginTop: '4px',
              marginBottom: 0,
            }}
          >
            Cross-module exceptions, risks, deadlines and critical actions that need immediate review.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRangeDropdown((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '7px 12px',
              fontSize: '12.5px',
              fontWeight: 500,
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
          >
            <CalendarBlank size={15} color="#64748B" />
            <span>{selectedRange}</span>
            <CaretDown size={12} color="#64748B" />
          </button>

          {showRangeDropdown && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                right: 0,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                zIndex: 50,
                minWidth: '220px',
                overflow: 'hidden',
                padding: '4px 0',
              }}
            >
              {dateRanges.map((range) => (
                <div
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setShowRangeDropdown(false);
                  }}
                  style={{
                    padding: '8px 14px',
                    fontSize: '12.5px',
                    color: selectedRange === range ? '#009A96' : '#334155',
                    fontWeight: selectedRange === range ? 600 : 400,
                    background: selectedRange === range ? '#F0FDFA' : 'transparent',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedRange !== range) e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseLeave={(e) => {
                    if (selectedRange !== range) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {range}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '16px',
        }}
      >
        {/* KPI 1: Critical issues */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
                flexShrink: 0,
              }}
            >
              <WarningCircle size={22} weight="fill" />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Critical issues</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                18
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#64748B' }}>
                <span style={{ color: '#EF4444', fontWeight: 600 }}>↑ 50%</span>
                <span>vs. Mar 2025</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {redSparkline}
          </div>
        </div>

        {/* KPI 2: Due in 7 days */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
                flexShrink: 0,
              }}
            >
              <CalendarBlank size={22} weight="fill" />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Due in 7 days</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                27
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#64748B' }}>
                <span style={{ color: '#10B981', fontWeight: 600 }}>↓ 18%</span>
                <span>vs. Mar 2025</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {orangeSparkline}
          </div>
        </div>

        {/* KPI 3: Overdue items */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
                flexShrink: 0,
              }}
            >
              <Clock size={22} weight="fill" />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Overdue items</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                24
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#64748B' }}>
                <span style={{ color: '#EF4444', fontWeight: 600 }}>↑ 33%</span>
                <span>vs. Mar 2025</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {redSparkline}
          </div>
        </div>

        {/* KPI 4: High-priority approvals */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8B5CF6',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '20px' }}>🎖️</span>
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>High-priority approvals</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                12
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#64748B' }}>
                <span style={{ color: '#10B981', fontWeight: 600 }}>↓ 25%</span>
                <span>vs. Mar 2025</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {purpleSparkline}
          </div>
        </div>
      </div>

      {/* 3. Main Content: Left (70%) & Right (30%) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2.3fr) minmax(0, 1fr)',
          gap: '16px',
        }}
      >
        {/* LEFT COLUMN: Items Needing Attention Table */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <WarningCircle size={18} color="#EF4444" weight="fill" />
              <h2
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#0F172A',
                  margin: 0,
                }}
              >
                Items Needing Attention
              </h2>
            </div>
            <Link
              href="/dashboard/needs-attention"
              style={{
                fontSize: '12.5px',
                color: '#2563EB',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <span>View All (87)</span>
              <CaretRight size={11} weight="bold" />
            </Link>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>
                  <th style={{ padding: '10px 8px', width: '32px' }}>
                    <button
                      onClick={toggleSelectAll}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        border: selectedIds.length === items.length ? '1px solid #2563EB' : '1.5px solid #CBD5E1',
                        background: selectedIds.length === items.length ? '#2563EB' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      {selectedIds.length === items.length && <Check size={11} color="#FFFFFF" weight="bold" />}
                    </button>
                  </th>
                  <th style={{ padding: '10px 8px' }}>Item</th>
                  <th style={{ padding: '10px 8px' }}>Module</th>
                  <th style={{ padding: '10px 8px' }}>Priority</th>
                  <th style={{ padding: '10px 8px' }}>Status</th>
                  <th style={{ padding: '10px 8px' }}>Due Date</th>
                  <th style={{ padding: '10px 8px' }}>Owner</th>
                  <th style={{ padding: '10px 8px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid #F8FAFC',
                        background: isSelected ? '#F8FAFC' : 'transparent',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: '12px 8px' }}>
                        <button
                          onClick={() => toggleSelectRow(item.id)}
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            border: isSelected ? '1px solid #2563EB' : '1.5px solid #CBD5E1',
                            background: isSelected ? '#2563EB' : '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          {isSelected && <Check size={11} color="#FFFFFF" weight="bold" />}
                        </button>
                      </td>

                      {/* Item Title & Subtitle */}
                      <td style={{ padding: '12px 8px' }}>
                        <Link href={item.link} style={{ textDecoration: 'none' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', lineHeight: 1.3 }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                            {item.subtitle}
                          </div>
                        </Link>
                      </td>

                      {/* Module Badge */}
                      <td style={{ padding: '12px 8px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 500,
                            color: item.moduleColor,
                            background: item.moduleBg,
                            padding: '3px 8px',
                            borderRadius: '5px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.module}
                        </span>
                      </td>

                      {/* Priority */}
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <WarningCircle size={14} color={item.priorityColor} weight="fill" />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: item.priorityColor }}>
                            {item.priority}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 8px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: item.statusColor,
                            background: item.statusBg,
                            padding: '3px 8px',
                            borderRadius: '5px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Due Date & Left/Ago */}
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: item.isDateRed ? '#EF4444' : '#1E293B' }}>
                          {item.dueDate}
                        </div>
                        <div style={{ fontSize: '11px', color: item.isDateRed ? '#EF4444' : '#64748B', marginTop: '1px' }}>
                          {item.daysInfo}
                        </div>
                      </td>

                      {/* Owner */}
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: item.ownerBg,
                              color: item.ownerColor,
                              fontSize: '11px',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {item.ownerInitials}
                          </div>
                          <span style={{ fontSize: '12px', color: '#334155', fontWeight: 500, whiteSpace: 'nowrap' }}>
                            {item.ownerName}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '12px 8px', textAlign: 'center', position: 'relative' }}>
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#64748B',
                            padding: '4px',
                            borderRadius: '4px',
                          }}
                        >
                          <DotsThree size={18} weight="bold" />
                        </button>
                        {activeMenuId === item.id && (
                          <div
                            style={{
                              position: 'absolute',
                              right: '8px',
                              top: '32px',
                              background: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              borderRadius: '8px',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                              zIndex: 20,
                              minWidth: '130px',
                              textAlign: 'left',
                              padding: '4px 0',
                            }}
                          >
                            <Link
                              href={item.link}
                              style={{
                                display: 'block',
                                padding: '6px 12px',
                                fontSize: '12px',
                                color: '#1E293B',
                                textDecoration: 'none',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              View details
                            </Link>
                            <div
                              onClick={() => {
                                setItems((prev) => prev.filter((p) => p.id !== item.id));
                                setActiveMenuId(null);
                              }}
                              style={{
                                padding: '6px 12px',
                                fontSize: '12px',
                                color: '#EF4444',
                                cursor: 'pointer',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              Dismiss
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Upcoming Commitments & Risk by Module */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card 1: Upcoming Commitments */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '5px',
                    background: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  <CalendarBlank size={13} weight="bold" />
                </div>
                <h2
                  style={{
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: '#0F172A',
                    margin: 0,
                  }}
                >
                  Upcoming Commitments
                </h2>
              </div>
              <Link
                href="/projects"
                style={{
                  fontSize: '12px',
                  color: '#2563EB',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <span>View All</span>
                <CaretRight size={11} weight="bold" />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {upcomingCommitments.map((uc) => (
                <Link
                  key={uc.id}
                  href={uc.link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 4px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                    {/* Date Block */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#EF4444', lineHeight: 1 }}>
                        {uc.day}
                      </span>
                      <span style={{ fontSize: '9.5px', fontWeight: 600, color: '#EF4444', textTransform: 'uppercase' }}>
                        {uc.month}
                      </span>
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: '12.5px',
                          color: '#0F172A',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {uc.title}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#64748B',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {uc.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 500,
                        color: uc.moduleColor,
                        background: uc.moduleBg,
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {uc.module}
                    </span>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 600,
                        color: uc.dueColor,
                        minWidth: '45px',
                        textAlign: 'right',
                      }}
                    >
                      {uc.dueLabel}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Card 2: Risk by Module */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px' }}>📊</span>
                <h2
                  style={{
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: '#0F172A',
                    margin: 0,
                  }}
                >
                  Risk by Module
                </h2>
              </div>
              <Link
                href="/reports"
                style={{
                  fontSize: '12px',
                  color: '#2563EB',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <span>View All</span>
                <CaretRight size={11} weight="bold" />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {moduleRisks.map((mr) => (
                <div key={mr.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '5px',
                      background: mr.iconBg,
                      color: mr.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      flexShrink: 0,
                    }}
                  >
                    🏷️
                  </div>

                  {/* Name */}
                  <span style={{ fontSize: '12px', color: '#1E293B', fontWeight: 500, width: '105px', flexShrink: 0 }}>
                    {mr.name}
                  </span>

                  {/* Bar */}
                  <div
                    style={{
                      flex: 1,
                      height: '7px',
                      background: '#F1F5F9',
                      borderRadius: '999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${mr.percentage}%`,
                        height: '100%',
                        background: mr.barColor,
                        borderRadius: '999px',
                      }}
                    />
                  </div>

                  {/* Count */}
                  <span style={{ fontSize: '12px', color: '#0F172A', fontWeight: 600, width: '20px', textAlign: 'right' }}>
                    {mr.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom 3 Analytical Charts Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '16px',
        }}
      >
        {/* Bottom Card 1: Items by Category (Donut + Legend) */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '5px',
                background: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <ChartPieSlice size={13} weight="bold" />
            </div>
            <h2
              style={{
                fontSize: '14.5px',
                fontWeight: 600,
                color: '#0F172A',
                margin: 0,
              }}
            >
              Items by Category
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flex: 1 }}>
            {/* Donut Chart SVG */}
            <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="48" fill="none" stroke="#E2E8F0" strokeWidth="14" />
                {/* Overdue (Red 28%) */}
                <circle
                  cx="65"
                  cy="65"
                  r="48"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="14"
                  strokeDasharray="84 301"
                  strokeDashoffset="0"
                />
                {/* Due in 7 days (Orange 31%) */}
                <circle
                  cx="65"
                  cy="65"
                  r="48"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="14"
                  strokeDasharray="93 301"
                  strokeDashoffset="-84"
                />
                {/* At Risk (Yellow 14%) */}
                <circle
                  cx="65"
                  cy="65"
                  r="48"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="14"
                  strokeDasharray="42 301"
                  strokeDashoffset="-177"
                />
                {/* Pending (Blue 16%) */}
                <circle
                  cx="65"
                  cy="65"
                  r="48"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="14"
                  strokeDasharray="48 301"
                  strokeDashoffset="-219"
                />
                {/* In Review (Purple 11%) */}
                <circle
                  cx="65"
                  cy="65"
                  r="48"
                  fill="none"
                  stroke="#818CF8"
                  strokeWidth="14"
                  strokeDasharray="34 301"
                  strokeDashoffset="-267"
                />
              </svg>
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
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', lineHeight: 1 }}>87</span>
                <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>Total Items</span>
              </div>
            </div>

            {/* Legend list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                  <span style={{ color: '#334155' }}>Overdue</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>24</span>
                  <span style={{ color: '#64748B', fontSize: '11px' }}>28%</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F97316' }} />
                  <span style={{ color: '#334155' }}>Due in 7 days</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>27</span>
                  <span style={{ color: '#64748B', fontSize: '11px' }}>31%</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FBBF24' }} />
                  <span style={{ color: '#334155' }}>At Risk</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>12</span>
                  <span style={{ color: '#64748B', fontSize: '11px' }}>14%</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8' }} />
                  <span style={{ color: '#334155' }}>Pending</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>14</span>
                  <span style={{ color: '#64748B', fontSize: '11px' }}>16%</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818CF8' }} />
                  <span style={{ color: '#334155' }}>In Review</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>10</span>
                  <span style={{ color: '#64748B', fontSize: '11px' }}>11%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card 2: Aging of Open Items */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
            }}
          >
            <Clock size={16} color="#2563EB" weight="fill" />
            <h2
              style={{
                fontSize: '14.5px',
                fontWeight: 600,
                color: '#0F172A',
                margin: 0,
              }}
            >
              Aging of Open Items
            </h2>
          </div>

          {/* Bar Chart matching screenshot */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '135px',
              paddingTop: '20px',
              gap: '12px',
            }}
          >
            {/* Bar 1: Overdue 24 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>24</span>
              <div
                style={{
                  width: '100%',
                  height: '75px',
                  background: '#EF4444',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <span style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap' }}>
                Overdue
              </span>
            </div>

            {/* Bar 2: 1-7 days 27 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>27</span>
              <div
                style={{
                  width: '100%',
                  height: '88px',
                  background: '#F97316',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <span style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap' }}>
                1-7 days
              </span>
            </div>

            {/* Bar 3: 8-14 days 18 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>18</span>
              <div
                style={{
                  width: '100%',
                  height: '56px',
                  background: '#FBBF24',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <span style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap' }}>
                8-14 days
              </span>
            </div>

            {/* Bar 4: 15-30 days 12 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>12</span>
              <div
                style={{
                  width: '100%',
                  height: '38px',
                  background: '#38BDF8',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <span style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap' }}>
                15-30 days
              </span>
            </div>

            {/* Bar 5: > 30 days 6 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>6</span>
              <div
                style={{
                  width: '100%',
                  height: '20px',
                  background: '#38BDF8',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <span style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap' }}>
                &gt; 30 days
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Card 3: Top Owners by Open Items */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
            }}
          >
            <UsersThree size={16} color="#2563EB" weight="fill" />
            <h2
              style={{
                fontSize: '14.5px',
                fontWeight: 600,
                color: '#0F172A',
                margin: 0,
              }}
            >
              Top Owners by Open Items
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', flex: 1, justifyContent: 'center' }}>
            {/* Owner 1: John Doe 18 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#DBEAFE',
                  color: '#1E40AF',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                JD
              </div>
              <span style={{ fontSize: '12px', color: '#1E293B', fontWeight: 500, width: '85px', flexShrink: 0 }}>
                John Doe
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', width: '20px' }}>18</span>
              <div style={{ flex: 1, height: '7px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: '#EF4444', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Owner 2: Sarah Connor 14 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#E0E7FF',
                  color: '#3730A3',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                SC
              </div>
              <span style={{ fontSize: '12px', color: '#1E293B', fontWeight: 500, width: '85px', flexShrink: 0 }}>
                Sarah Connor
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', width: '20px' }}>14</span>
              <div style={{ flex: 1, height: '7px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: '#F97316', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Owner 3: Liam Turner 12 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  color: '#475569',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                LT
              </div>
              <span style={{ fontSize: '12px', color: '#1E293B', fontWeight: 500, width: '85px', flexShrink: 0 }}>
                Liam Turner
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', width: '20px' }}>12</span>
              <div style={{ flex: 1, height: '7px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '58%', height: '100%', background: '#FBBF24', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Owner 4: Maria Keller 10 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#FCE7F3',
                  color: '#9D174D',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                MK
              </div>
              <span style={{ fontSize: '12px', color: '#1E293B', fontWeight: 500, width: '85px', flexShrink: 0 }}>
                Maria Keller
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', width: '20px' }}>10</span>
              <div style={{ flex: 1, height: '7px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '48%', height: '100%', background: '#38BDF8', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Owner 5: Alex Price 8 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                AP
              </div>
              <span style={{ fontSize: '12px', color: '#1E293B', fontWeight: 500, width: '85px', flexShrink: 0 }}>
                Alex Price
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', width: '20px' }}>8</span>
              <div style={{ flex: 1, height: '7px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '38%', height: '100%', background: '#38BDF8', borderRadius: '999px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
