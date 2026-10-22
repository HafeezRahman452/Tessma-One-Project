'use client';

import React from 'react';
import Link from 'next/link';
import {
  CaretRight,
  Warning,
  Clock,
  Lightning,
  FileText,
  UserPlus,
  Briefcase,
  UploadSimple,
  Headset,
  Scroll
} from '@phosphor-icons/react';

interface MiddleSectionProps {
  isSubscribed: (modId: string) => boolean;
}

export default function MiddleSection({ isSubscribed }: MiddleSectionProps) {
  // My work items
  const myWorkItems = [
    { id: 1, count: 12, label: 'Tasks assigned to me', bg: '#E7F5EF', color: '#0F7A57', href: '/projects' },
    { id: 2, count: 5, label: 'Approvals pending', bg: '#EBF1FE', color: '#1D4ED8', href: '/dashboard/approvals' },
    { id: 3, count: 8, label: '@ Mentions (comments)', bg: '#FEF3C7', color: '#D97706', href: '/' },
    { id: 4, count: 4, label: 'Documents to review', bg: '#FEF2F2', color: '#DC2626', href: '/contracts' },
    { id: 5, count: 3, label: 'Training actions', bg: '#EDE9FE', color: '#7C3AED', href: '/hr' },
    { id: 6, count: 2, label: 'Overdue items', bg: '#FEE2E2', color: '#B91C1C', href: '/projects' },
  ];

  // Needs Attention items
  const attentionItems = [
    {
      id: 1,
      moduleId: 'finance',
      title: '3 invoices overdue',
      tag: 'Finance',
      tagColor: '#1D4ED8',
      tagBg: '#EFF6FF',
      time: '2 days',
      bulletColor: '#EF4444',
    },
    {
      id: 2,
      moduleId: 'contracts',
      title: '2 contracts expiring',
      tag: 'Contracts',
      tagColor: '#7C3AED',
      tagBg: '#F5F3FF',
      time: '5 days',
      bulletColor: '#F59E0B',
    },
    {
      id: 3,
      moduleId: 'compliance',
      title: '4 compliance actions pending',
      tag: 'Compliance',
      tagColor: '#0D9488',
      tagBg: '#F0FDFA',
      time: '7 days',
      bulletColor: '#8B5CF6',
    },
    {
      id: 4,
      moduleId: 'projects',
      title: '2 project milestones delayed',
      tag: 'Projects',
      tagColor: '#0284C7',
      tagBg: '#F0F9FF',
      time: '8 days',
      bulletColor: '#F97316',
    },
    {
      id: 5,
      moduleId: 'service-support',
      title: '3 high-priority tickets',
      tag: 'Support',
      tagColor: '#007D7D',
      tagBg: '#E8F7F5',
      time: '1 day',
      bulletColor: '#3B82F6',
    },
  ].filter((item) => isSubscribed(item.moduleId));

  // Recent Activity items
  const recentActivities = [
    {
      id: 1,
      moduleId: 'finance',
      avatar: 'JD',
      avatarBg: '#3B82F6',
      action: 'Invoice INV-1048 approved',
      tag: 'Finance',
      tagColor: '#1D4ED8',
      tagBg: '#EFF6FF',
      time: '2 hours ago',
    },
    {
      id: 2,
      moduleId: 'sales-crm',
      avatar: 'SC',
      avatarBg: '#10B981',
      action: 'New customer Acme Ltd added',
      tag: 'CRM',
      tagColor: '#059669',
      tagBg: '#ECFDF5',
      time: '4 hours ago',
    },
    {
      id: 3,
      moduleId: 'projects',
      avatar: 'LT',
      avatarBg: '#F59E0B',
      action: 'Project milestone updated',
      tag: 'Projects',
      tagColor: '#0284C7',
      tagBg: '#F0F9FF',
      time: '5 hours ago',
    },
    {
      id: 4,
      moduleId: 'compliance',
      avatar: 'AP',
      avatarBg: '#6366F1',
      action: 'Policy document updated',
      tag: 'Compliance',
      tagColor: '#7C3AED',
      tagBg: '#F5F3FF',
      time: '6 hours ago',
    },
    {
      id: 5,
      moduleId: 'service-support',
      avatar: 'MK',
      avatarBg: '#EC4899',
      action: 'Support ticket #4213 resolved',
      tag: 'Support',
      tagColor: '#007D7D',
      tagBg: '#E8F7F5',
      time: '7 hours ago',
    },
  ].filter((act) => isSubscribed(act.moduleId));

  // 6 Quick Action Buttons in exact 3x2 grid with soft pastel colored backgrounds
  const quickActions = [
    { id: 'inv', label: 'New Invoice', icon: <FileText size={20} weight="fill" />, color: '#0F7A57', bg: '#E7F5EF', moduleId: 'finance', href: '/finance' },
    { id: 'cnt', label: 'New Contact', icon: <UserPlus size={20} weight="fill" />, color: '#1D4ED8', bg: '#EBF1FE', moduleId: 'sales-crm', href: '/sales-crm' },
    { id: 'prj', label: 'New Project', icon: <Briefcase size={20} weight="fill" />, color: '#D97706', bg: '#FEF3C7', moduleId: 'projects', href: '/projects' },
    { id: 'doc', label: 'Upload Document', icon: <UploadSimple size={20} weight="bold" />, color: '#7C3AED', bg: '#F3E8FF', moduleId: 'contracts', href: '/contracts' },
    { id: 'tkt', label: 'Raise Support Ticket', icon: <Headset size={20} weight="fill" />, color: '#007D7D', bg: '#E8F7F5', moduleId: 'service-support', href: '/service-support' },
    { id: 'ctr', label: 'Create Contract', icon: <Scroll size={20} weight="fill" />, color: '#B42318', bg: '#FDECEA', moduleId: 'contracts', href: '/contracts' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '14px',
      }}
    >
      {/* 1. MY WORK */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-ui)',
          padding: '16px 18px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <Link
            href="/dashboard/tasks"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', cursor: 'pointer' }}
          >
            <div style={{ width: '3px', height: '14px', background: '#0F7A57', borderRadius: '2px' }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              My Work
            </span>
          </Link>
          <Link
            href="/dashboard/tasks"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11.5px', color: 'var(--color-text-secondary)', fontWeight: 500 }}
          >
            <span>View All</span>
            <CaretRight size={12} weight="bold" />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {myWorkItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 6px',
                borderRadius: '6px',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    background: item.bg,
                    color: item.color,
                    fontSize: '11.5px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.count}
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                  {item.label}
                </span>
              </div>
              <CaretRight size={12} color="var(--color-text-muted)" weight="bold" />
            </Link>
          ))}
        </div>
      </div>

      {/* 2. NEEDS ATTENTION */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-ui)',
          padding: '16px 18px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <Link href="/dashboard/needs-attention" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', cursor: 'pointer' }}>
            <Warning size={16} color="#EF4444" weight="fill" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Needs Attention
            </span>
            <span
              style={{
                background: '#EF4444',
                color: '#FFFFFF',
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '999px',
              }}
            >
              8
            </span>
          </Link>
          <Link
            href="/dashboard/needs-attention"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11.5px', color: 'var(--color-text-secondary)', fontWeight: 500 }}
          >
            <span>View All</span>
            <CaretRight size={12} weight="bold" />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {attentionItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '5px 2px',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: item.bulletColor,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500,
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
                    fontSize: '10.5px',
                    fontWeight: 600,
                    color: item.tagColor,
                    background: item.tagBg,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {item.tag}
                </span>
                <span style={{ fontSize: '11px', color: '#B42318', fontWeight: 500 }}>
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. RECENT ACTIVITY */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-ui)',
          padding: '16px 18px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--color-text-secondary)" weight="regular" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Recent Activity
            </span>
          </div>
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11.5px', color: 'var(--color-text-secondary)', fontWeight: 500 }}
          >
            <span>View All</span>
            <CaretRight size={12} weight="bold" />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', flex: 1 }}>
          {recentActivities.map((act) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: act.avatarBg,
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {act.avatar}
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {act.action}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: act.tagColor,
                    background: act.tagBg,
                    padding: '1px 5px',
                    borderRadius: '4px',
                  }}
                >
                  {act.tag}
                </span>
                <span style={{ fontSize: '10.5px', color: 'var(--color-text-muted)' }}>
                  {act.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. QUICK ACTIONS (Exact 3 columns x 2 rows in design) */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-ui)',
          padding: '16px 18px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Lightning size={16} color="#007D7D" weight="fill" />
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Quick Actions
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '10px',
            flex: 1,
          }}
        >
          {quickActions.map((qa) => {
            const hasSub = isSubscribed(qa.moduleId);
            return (
              <Link
                key={qa.id}
                href={hasSub ? qa.href : '/settings'}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 4px',
                  borderRadius: 'var(--radius-ui)',
                  border: '1px solid var(--color-border)',
                  background: '#FFFFFF',
                  opacity: hasSub ? 1 : 0.45,
                  textAlign: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                  cursor: hasSub ? 'pointer' : 'not-allowed',
                }}
                onMouseEnter={(e) => {
                  if (hasSub) {
                    e.currentTarget.style.borderColor = '#007D7D';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (hasSub) {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: qa.bg,
                    color: qa.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {qa.icon}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.2,
                  }}
                >
                  {qa.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
