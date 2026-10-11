'use client';

import React from 'react';
import { CalendarBlank } from '@phosphor-icons/react';
import { useSubscription } from '@/lib/SubscriptionContext';
import ExecutiveSnapshot from '@/components/ExecutiveSnapshot';
import MiddleSection from '@/components/MiddleSection';
import ModuleSnapshots from '@/components/ModuleSnapshots';

export default function DashboardPage() {
  const { isSubscribed } = useSubscription();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Page Title & Date Range Bar */}
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
          {/* Main Page Title */}
          <h1
            style={{
              fontSize: '21px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Dashboard Overview
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
            A consolidated view of your business performance across all modules.
          </p>
        </div>

        {/* Date Filter pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-ui)',
            padding: '7px 14px',
            fontSize: '12.5px',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            boxShadow: '0 1px 2px rgba(11, 18, 32, 0.04)',
          }}
        >
          <CalendarBlank size={16} color="var(--color-text-secondary)" />
          <span>01 Apr 2025 – 30 Apr 2025</span>
        </div>
      </div>

      {/* 1. Top Section: Executive Snapshot */}
      <ExecutiveSnapshot isSubscribed={isSubscribed} />

      {/* 2. Middle Section: My Work, Needs Attention, Recent Activity, Quick Actions */}
      <MiddleSection isSubscribed={isSubscribed} />

      {/* 3. Bottom Section: 8 Snapshots (Finance, CRM, HR, Projects, Contracts, Compliance, Support, AI) */}
      <ModuleSnapshots isSubscribed={isSubscribed} />
    </div>
  );
}
