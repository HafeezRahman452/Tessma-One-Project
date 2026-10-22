'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarBlank,
  CaretDown,
  CaretRight,
  Check,
  CheckCircle,
  Clock,
  WarningCircle,
  At,
  FileText,
  UserPlus,
  Briefcase,
  UploadSimple,
  Headset,
  Scroll,
} from '@phosphor-icons/react';

interface TaskItem {
  id: string;
  title: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  dueText: string;
  dueColor: string;
  dueBg: string;
  dueDate: string; // YYYY-MM-DD
  completed: boolean;
  link: string;
}

interface ApprovalItem {
  id: string;
  title: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  timeAgo: string;
  date: string; // YYYY-MM-DD
  iconColor: string;
  link: string;
}

interface MentionItem {
  id: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  text: string;
  author: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  timeAgo: string;
  date: string; // YYYY-MM-DD
  link: string;
}

interface DueThisWeekItem {
  id: string;
  title: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  dueLabel: string;
  dotColor: string;
  date: string; // YYYY-MM-DD
  link: string;
}

interface RecentlyUpdatedItem {
  id: string;
  title: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  timeAgo: string;
  date: string; // YYYY-MM-DD
  iconColor: string;
  link: string;
}

export default function MyWorkPage() {
  const [selectedRange, setSelectedRange] = useState('01 Apr 2025 – 30 Apr 2025');
  const [showRangeDropdown, setShowRangeDropdown] = useState(false);

  // Available ranges
  const dateRanges = [
    '01 Apr 2025 – 30 Apr 2025',
    '01 May 2025 – 31 May 2025',
    '01 Mar 2025 – 31 Mar 2025',
    'This Quarter (Q2 2025)',
    'All Time',
  ];

  // 1. Tasks assigned to me
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 't-1',
      title: 'Review Q1 budget forecast',
      module: 'Finance',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueText: 'Today',
      dueColor: '#EF4444',
      dueBg: 'transparent',
      dueDate: '2025-04-03',
      completed: false,
      link: '/finance',
    },
    {
      id: 't-2',
      title: 'Prepare customer proposal',
      module: 'CRM',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueText: 'Today',
      dueColor: '#EF4444',
      dueBg: 'transparent',
      dueDate: '2025-04-03',
      completed: true,
      link: '/sales-crm',
    },
    {
      id: 't-3',
      title: 'Update project plan & milestones',
      module: 'Projects',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueText: 'Tomorrow',
      dueColor: '#2563EB',
      dueBg: 'transparent',
      dueDate: '2025-04-04',
      completed: false,
      link: '/projects',
    },
    {
      id: 't-4',
      title: 'Complete compliance training',
      module: 'Compliance',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      dueText: '2 days',
      dueColor: '#EF4444',
      dueBg: 'transparent',
      dueDate: '2025-04-05',
      completed: false,
      link: '/compliance',
    },
    {
      id: 't-5',
      title: 'Review supplier contract',
      module: 'Contracts',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      dueText: '3 days',
      dueColor: '#EF4444',
      dueBg: 'transparent',
      dueDate: '2025-04-06',
      completed: false,
      link: '/contracts',
    },
    {
      id: 't-6',
      title: 'Approve IT asset request',
      module: 'IT & Assets',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueText: '5 days',
      dueColor: '#64748B',
      dueBg: 'transparent',
      dueDate: '2025-04-08',
      completed: false,
      link: '/it-assets',
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // 2. Approval Inbox
  const approvals: ApprovalItem[] = [
    {
      id: 'ap-1',
      title: 'Purchase invoice INV-1048',
      module: 'Finance',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '2 hours ago',
      date: '2025-04-03',
      iconColor: '#3B82F6',
      link: '/finance/sales-invoices',
    },
    {
      id: 'ap-2',
      title: 'New customer Acme Ltd',
      module: 'CRM',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '4 hours ago',
      date: '2025-04-03',
      iconColor: '#F59E0B',
      link: '/sales-crm',
    },
    {
      id: 'ap-3',
      title: 'Project change request',
      module: 'Projects',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      timeAgo: '1 day ago',
      date: '2025-04-02',
      iconColor: '#F59E0B',
      link: '/projects',
    },
    {
      id: 'ap-4',
      title: 'New vendor contract',
      module: 'Contracts',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      timeAgo: '1 day ago',
      date: '2025-04-02',
      iconColor: '#3B82F6',
      link: '/contracts',
    },
    {
      id: 'ap-5',
      title: 'Policy exception request',
      module: 'Compliance',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      timeAgo: '2 days ago',
      date: '2025-04-01',
      iconColor: '#F59E0B',
      link: '/compliance',
    },
    {
      id: 'ap-6',
      title: 'Leave request – Sarah Green',
      module: 'HR',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '2 days ago',
      date: '2025-04-01',
      iconColor: '#10B981',
      link: '/hr',
    },
  ];

  // 3. Mentions
  const mentions: MentionItem[] = [
    {
      id: 'm-1',
      initials: 'SC',
      avatarBg: '#F1F5F9',
      avatarColor: '#334155',
      author: 'Sarah Cole',
      text: 'mentioned you in a comment',
      module: 'Projects',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '1 hour ago',
      date: '2025-04-03',
      link: '/projects',
    },
    {
      id: 'm-2',
      initials: 'MK',
      avatarBg: '#F1F5F9',
      avatarColor: '#334155',
      author: 'Mark King',
      text: 'mentioned you',
      module: 'Finance',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '3 hours ago',
      date: '2025-04-03',
      link: '/finance',
    },
    {
      id: 'm-3',
      initials: 'LT',
      avatarBg: '#F1F5F9',
      avatarColor: '#334155',
      author: 'Laura Tenant',
      text: 'mentioned you',
      module: 'CRM',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '6 hours ago',
      date: '2025-04-03',
      link: '/sales-crm',
    },
    {
      id: 'm-4',
      initials: 'AP',
      avatarBg: '#F1F5F9',
      avatarColor: '#334155',
      author: 'Alex Price',
      text: 'mentioned you',
      module: 'Service',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '1 day ago',
      date: '2025-04-02',
      link: '/service-support',
    },
    {
      id: 'm-5',
      initials: 'JD',
      avatarBg: '#F1F5F9',
      avatarColor: '#334155',
      author: 'James Doyle',
      text: 'mentioned you',
      module: 'HR',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '2 days ago',
      date: '2025-04-01',
      link: '/hr',
    },
    {
      id: 'm-6',
      initials: 'RM',
      avatarBg: '#F1F5F9',
      avatarColor: '#334155',
      author: 'Rachel Morris',
      text: 'mentioned you',
      module: 'Contracts',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      timeAgo: '2 days ago',
      date: '2025-04-01',
      link: '/contracts',
    },
  ];

  // 4. Due this week
  const dueThisWeek: DueThisWeekItem[] = [
    {
      id: 'dw-1',
      title: 'Submit monthly management report',
      module: 'Finance',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueLabel: 'Today',
      dotColor: '#EF4444',
      date: '2025-04-03',
      link: '/finance',
    },
    {
      id: 'dw-2',
      title: 'Approve marketing budget',
      module: 'Finance',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueLabel: 'Today',
      dotColor: '#EF4444',
      date: '2025-04-03',
      link: '/finance',
    },
    {
      id: 'dw-3',
      title: 'Review customer contract',
      module: 'Contracts',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      dueLabel: 'Wed, 3 Apr',
      dotColor: '#F59E0B',
      date: '2025-04-03',
      link: '/contracts',
    },
    {
      id: 'dw-4',
      title: 'Project milestone review',
      module: 'Projects',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      dueLabel: 'Thu, 4 Apr',
      dotColor: '#F59E0B',
      date: '2025-04-04',
      link: '/projects',
    },
    {
      id: 'dw-5',
      title: 'Complete compliance training',
      module: 'Compliance',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      dueLabel: 'Fri, 5 Apr',
      dotColor: '#94A3B8',
      date: '2025-04-05',
      link: '/compliance',
    },
    {
      id: 'dw-6',
      title: 'Respond to support ticket #4213',
      module: 'Support',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      dueLabel: 'Fri, 5 Apr',
      dotColor: '#94A3B8',
      date: '2025-04-05',
      link: '/service-support',
    },
  ];

  // 5. Recently updated by me
  const recentlyUpdated: RecentlyUpdatedItem[] = [
    {
      id: 'ru-1',
      title: 'Q1 Budget 2025',
      module: 'Finance',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '2 hours ago',
      date: '2025-04-03',
      iconColor: '#3B82F6',
      link: '/finance',
    },
    {
      id: 'ru-2',
      title: 'Acme Ltd – Opportunity',
      module: 'CRM',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '4 hours ago',
      date: '2025-04-03',
      iconColor: '#3B82F6',
      link: '/sales-crm',
    },
    {
      id: 'ru-3',
      title: 'Website Redesign Plan',
      module: 'Projects',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '1 day ago',
      date: '2025-04-02',
      iconColor: '#F59E0B',
      link: '/projects',
    },
    {
      id: 'ru-4',
      title: 'Employee Onboarding Checklist',
      module: 'HR',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '1 day ago',
      date: '2025-04-02',
      iconColor: '#3B82F6',
      link: '/hr',
    },
    {
      id: 'ru-5',
      title: 'Supplier Contract – TechSource',
      module: 'Contracts',
      moduleColor: '#7C3AED',
      moduleBg: '#F5F3FF',
      timeAgo: '2 days ago',
      date: '2025-04-01',
      iconColor: '#F59E0B',
      link: '/contracts',
    },
    {
      id: 'ru-6',
      title: 'IT Asset Request – Laptop',
      module: 'IT & Assets',
      moduleColor: '#2563EB',
      moduleBg: '#EFF6FF',
      timeAgo: '2 days ago',
      date: '2025-04-01',
      iconColor: '#3B82F6',
      link: '/it-assets',
    },
  ];

  // 6. Quick Actions (6 items: 3 top, 3 bottom)
  const quickActions = [
    {
      id: 'qa-1',
      title: 'New Invoice',
      subtitle: 'Finance',
      icon: <FileText size={20} weight="fill" />,
      iconColor: '#10B981',
      iconBg: '#E7F7F0',
      cardBg: '#F2FAF7',
      link: '/finance/sales-invoices/new',
    },
    {
      id: 'qa-2',
      title: 'New Contact',
      subtitle: 'CRM',
      icon: <UserPlus size={20} weight="fill" />,
      iconColor: '#2563EB',
      iconBg: '#EFF6FF',
      cardBg: '#F3F7FE',
      link: '/sales-crm',
    },
    {
      id: 'qa-3',
      title: 'New Project',
      subtitle: 'Projects',
      icon: <Briefcase size={20} weight="fill" />,
      iconColor: '#EA580C',
      iconBg: '#FFF7ED',
      cardBg: '#FEF8F2',
      link: '/projects',
    },
    {
      id: 'qa-4',
      title: 'Upload Document',
      subtitle: 'Contracts',
      icon: <UploadSimple size={20} weight="bold" />,
      iconColor: '#7C3AED',
      iconBg: '#F5F3FF',
      cardBg: '#F9F6FE',
      link: '/contracts',
    },
    {
      id: 'qa-5',
      title: 'Raise Support Ticket',
      subtitle: 'Service & Support',
      icon: <Headset size={20} weight="fill" />,
      iconColor: '#009A96',
      iconBg: '#E6F6F6',
      cardBg: '#F0FAFA',
      link: '/service-support',
    },
    {
      id: 'qa-6',
      title: 'Create Contract',
      subtitle: 'Contracts',
      icon: <Scroll size={20} weight="fill" />,
      iconColor: '#EF4444',
      iconBg: '#FEF2F2',
      cardBg: '#FDF4F4',
      link: '/contracts',
    },
  ];

  // Simple sparkline SVGs
  const greenSparkline = (
    <svg width="78" height="28" viewBox="0 0 78 28" fill="none">
      <path
        d="M2 24 L18 20 L34 23 L48 15 L62 17 L76 4"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const redSparkline = (
    <svg width="78" height="28" viewBox="0 0 78 28" fill="none">
      <path
        d="M2 24 L16 23 L32 18 L46 20 L60 12 L76 4"
        stroke="#EF4444"
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
            My Work
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#64748B',
              marginTop: '4px',
              marginBottom: 0,
            }}
          >
            Tasks, approvals, mentions and actions assigned to you across subscribed modules.
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
        {/* KPI 1: Open tasks */}
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
                background: '#E7F7F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                flexShrink: 0,
              }}
            >
              <CheckCircle size={22} weight="fill" />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Open tasks</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                12
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#64748B' }}>
                <span style={{ color: '#10B981', fontWeight: 600 }}>↑ 25%</span>
                <span>vs. Mar 2025</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {greenSparkline}
          </div>
        </div>

        {/* KPI 2: Approvals pending */}
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
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3B82F6',
                flexShrink: 0,
              }}
            >
              <Clock size={22} weight="fill" />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Approvals pending</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                5
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#64748B' }}>
                <span style={{ color: '#EF4444', fontWeight: 600 }}>↓ 17%</span>
                <span>vs. Mar 2025</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {redSparkline}
          </div>
        </div>

        {/* KPI 3: Mentions */}
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
              <At size={22} weight="bold" />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Mentions</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                8
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#64748B' }}>
                <span style={{ color: '#10B981', fontWeight: 600 }}>↑ 60%</span>
                <span>vs. Mar 2025</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {purpleSparkline}
          </div>
        </div>

        {/* KPI 4: Overdue actions */}
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
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Overdue actions</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                3
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
      </div>

      {/* 3. Middle 3-Column Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '16px',
        }}
      >
        {/* Card 1: Tasks assigned to me */}
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
                  background: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Check size={13} weight="bold" />
              </div>
              <h2
                style={{
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#0F172A',
                  margin: 0,
                }}
              >
                Tasks assigned to me
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 4px',
                  borderRadius: '6px',
                  transition: 'background 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <button
                    onClick={() => toggleTask(task.id)}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: task.completed ? '1px solid #2563EB' : '1.5px solid #CBD5E1',
                      background: task.completed ? '#2563EB' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      padding: 0,
                    }}
                  >
                    {task.completed && <Check size={11} color="#FFFFFF" weight="bold" />}
                  </button>
                  <span
                    style={{
                      fontSize: '12.5px',
                      color: '#1E293B',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {task.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: task.moduleColor,
                      background: task.moduleBg,
                      padding: '2px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    {task.module}
                  </span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: task.dueColor,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      minWidth: '55px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {task.dueText}
                    <CaretRight size={10} color="#94A3B8" weight="bold" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Approval Inbox */}
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
                  background: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <FileText size={13} weight="fill" />
              </div>
              <h2
                style={{
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#0F172A',
                  margin: 0,
                }}
              >
                Approval Inbox
              </h2>
            </div>
            <Link
              href="/dashboard/approvals"
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {approvals.map((app) => (
              <Link
                key={app.id}
                href={app.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 4px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <FileText size={16} weight="fill" color={app.iconColor} style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: '12.5px',
                      color: '#1E293B',
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {app.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: app.moduleColor,
                      background: app.moduleBg,
                      padding: '2px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    {app.module}
                  </span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      minWidth: '65px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {app.timeAgo}
                    <CaretRight size={10} color="#94A3B8" weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Card 3: Mentions */}
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
                  background: '#8B5CF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <At size={13} weight="bold" />
              </div>
              <h2
                style={{
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#0F172A',
                  margin: 0,
                }}
              >
                Mentions
              </h2>
            </div>
            <Link
              href="/"
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mentions.map((men) => (
              <Link
                key={men.id}
                href={men.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 4px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: men.avatarBg,
                      color: men.avatarColor,
                      fontSize: '10.5px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {men.initials}
                  </div>
                  <span
                    style={{
                      fontSize: '12.5px',
                      color: '#1E293B',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <strong style={{ fontWeight: 600 }}>{men.author}</strong> {men.text}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: men.moduleColor,
                      background: men.moduleBg,
                      padding: '2px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    {men.module}
                  </span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      minWidth: '65px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {men.timeAgo}
                    <CaretRight size={10} color="#94A3B8" weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom 3-Column Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '16px',
        }}
      >
        {/* Bottom Card 1: Due this week */}
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
                  background: '#EF4444',
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
                Due this week
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dueThisWeek.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 4px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: item.dotColor,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '12.5px',
                      color: '#1E293B',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: item.moduleColor,
                      background: item.moduleBg,
                      padding: '2px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    {item.module}
                  </span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: item.dueLabel === 'Today' ? 600 : 400,
                      color: item.dueLabel === 'Today' ? '#EF4444' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      minWidth: '65px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {item.dueLabel}
                    <CaretRight size={10} color="#94A3B8" weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Card 2: Recently updated by me */}
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
                <Clock size={13} weight="fill" />
              </div>
              <h2
                style={{
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#0F172A',
                  margin: 0,
                }}
              >
                Recently updated by me
              </h2>
            </div>
            <Link
              href="/"
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentlyUpdated.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 4px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <FileText size={16} weight="fill" color={item.iconColor} style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: '12.5px',
                      color: '#1E293B',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: item.moduleColor,
                      background: item.moduleBg,
                      padding: '2px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    {item.module}
                  </span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      minWidth: '65px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {item.timeAgo}
                    <CaretRight size={10} color="#94A3B8" weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Card 3: Quick Actions */}
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
            <span style={{ color: '#10B981', display: 'flex', alignItems: 'center' }}>
              ⚡
            </span>
            <h2
              style={{
                fontSize: '14.5px',
                fontWeight: 600,
                color: '#0F172A',
                margin: 0,
              }}
            >
              Quick Actions
            </h2>
          </div>

          {/* 3 columns x 2 rows grid matching screenshot */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '12px',
              flex: 1,
            }}
          >
            {quickActions.map((qa) => (
              <Link
                key={qa.id}
                href={qa.link}
                style={{
                  background: qa.cardBg,
                  borderRadius: '10px',
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  border: '1px solid rgba(0,0,0,0.02)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: qa.iconBg,
                    color: qa.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}
                >
                  {qa.icon}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0F172A',
                    lineHeight: 1.2,
                  }}
                >
                  {qa.title}
                </div>
                <div
                  style={{
                    fontSize: '10.5px',
                    color: '#64748B',
                    marginTop: '2px',
                  }}
                >
                  {qa.subtitle}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

