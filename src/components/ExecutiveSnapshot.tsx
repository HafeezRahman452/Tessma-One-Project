'use client';

import React from 'react';
import {
  CurrencyGbp,
  CreditCard,
  TrendUp,
  TrendDown,
  Users,
  Briefcase,
  UserCheck
} from '@phosphor-icons/react';

interface KpiItem {
  id: string;
  moduleId: string;
  label: string;
  value: string;
  change: string;
  period: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  sparkColor: string;
  // SVG polyline points exactly rendered
  points: string;
}

export default function ExecutiveSnapshot({ isSubscribed }: { isSubscribed: (modId: string) => boolean }) {
  const kpiList: KpiItem[] = [
    {
      id: 'rev',
      moduleId: 'finance',
      label: 'Total Revenue',
      value: '£542,320',
      change: '12%',
      period: 'vs. Mar 2025',
      isPositive: true,
      icon: <CurrencyGbp size={18} weight="bold" />,
      iconBg: '#E7F5EF',
      iconColor: '#0F7A57',
      sparkColor: '#0F7A57',
      points: '0,22 10,18 20,20 30,12 40,15 50,7 60,3',
    },
    {
      id: 'exp',
      moduleId: 'finance',
      label: 'Total Expenses',
      value: '£318,450',
      change: '8%',
      period: 'vs. Mar 2025',
      isPositive: false, // in image: red arrow up with red sparkline
      icon: <CreditCard size={18} weight="bold" />,
      iconBg: '#FDECEA',
      iconColor: '#B42318',
      sparkColor: '#B42318',
      points: '0,20 10,16 20,21 30,17 40,12 50,15 60,6',
    },
    {
      id: 'profit',
      moduleId: 'finance',
      label: 'Net Profit',
      value: '£223,870',
      change: '18%',
      period: 'vs. Mar 2025',
      isPositive: true,
      icon: (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
          <div style={{ width: '3px', height: '7px', background: '#1D4ED8', borderRadius: '1px' }} />
          <div style={{ width: '3px', height: '10px', background: '#1D4ED8', borderRadius: '1px' }} />
          <div style={{ width: '3px', height: '14px', background: '#1D4ED8', borderRadius: '1px' }} />
        </div>
      ),
      iconBg: '#EBF1FE',
      iconColor: '#1D4ED8',
      sparkColor: '#1D4ED8',
      points: '0,22 10,20 20,22 30,15 40,17 50,9 60,4',
    },
    {
      id: 'cust',
      moduleId: 'sales-crm',
      label: 'Active Customers',
      value: '156',
      change: '6%',
      period: 'vs. Mar 2025',
      isPositive: true,
      icon: <Users size={18} weight="fill" />,
      iconBg: '#F3E8FF',
      iconColor: '#7C3AED',
      sparkColor: '#8B5CF6',
      points: '0,22 10,21 20,18 30,19 40,13 50,14 60,5',
    },
    {
      id: 'proj',
      moduleId: 'projects',
      label: 'Active Projects',
      value: '24',
      change: '4%',
      period: 'vs. Mar 2025',
      isPositive: true,
      icon: <Briefcase size={18} weight="fill" />,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      sparkColor: '#D97706',
      points: '0,22 10,20 20,20 30,16 40,18 50,12 60,6',
    },
    {
      id: 'emp',
      moduleId: 'hr',
      label: 'Total Employees',
      value: '48',
      change: '2%',
      period: 'vs. Mar 2025',
      isPositive: true,
      icon: <UserCheck size={18} weight="bold" />,
      iconBg: '#CCFBF1',
      iconColor: '#0D9488',
      sparkColor: '#0D9488',
      points: '0,22 10,21 20,19 30,19 40,16 50,14 60,8',
    },
  ];

  const visibleKpis = kpiList.filter((kpi) => isSubscribed(kpi.moduleId));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Header of Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Executive Snapshot
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '1px' }}>
            Key business metrics across all modules
          </p>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            This Month ▾
          </span>
        </div>
      </div>

      {/* Grid of KPI cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.max(visibleKpis.length, 1)}, minmax(0, 1fr))`,
          gap: '12px',
        }}
      >
        {visibleKpis.map((kpi) => (
          <div
            key={kpi.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-ui)',
              padding: '14px 16px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
            }}
          >
            {/* Top row: Icon and Title/Value */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '7px',
                  background: kpi.iconBg,
                  color: kpi.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {kpi.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '11.5px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {kpi.label}
                </div>
                <div
                  style={{
                    fontSize: '18.5px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginTop: '1px',
                  }}
                >
                  {kpi.value}
                </div>
              </div>
            </div>

            {/* Bottom row: Trend and Sparkline */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: '10px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: kpi.isPositive ? '#0F7A57' : '#B42318',
                  }}
                >
                  {kpi.isPositive ? <TrendUp size={13} weight="bold" /> : <TrendDown size={13} weight="bold" />}
                  <span>{kpi.change}</span>
                </div>
                <span style={{ fontSize: '10.5px', color: 'var(--color-text-muted)' }}>
                  {kpi.period}
                </span>
              </div>

              {/* Exact Smooth SVG Sparkline */}
              <div style={{ width: '62px', height: '24px' }}>
                <svg width="62" height="24" viewBox="0 0 62 24" style={{ overflow: 'visible' }}>
                  <polyline
                    fill="none"
                    stroke={kpi.sparkColor}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={kpi.points}
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
