'use client';

import React from 'react';
import {
  Bank,
  ChartLineUp,
  Briefcase,
  UsersThree,
  FileText,
  ShieldCheck,
  Headset,
  Sparkle,
  TrendUp,
  TrendDown
} from '@phosphor-icons/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface SnapshotsProps {
  isSubscribed: (modId: string) => boolean;
}

export default function ModuleSnapshots({ isSubscribed }: SnapshotsProps) {
  // 1. Finance Bar Data (Revenue vs Expenses matching prototype Nov-Apr with light green and coral/salmon red)
  const financeBarData = [
    { month: 'Nov', revenue: 510, expenses: 290 },
    { month: 'Dec', revenue: 580, expenses: 310 },
    { month: 'Jan', revenue: 490, expenses: 300 },
    { month: 'Feb', revenue: 530, expenses: 320 },
    { month: 'Mar', revenue: 610, expenses: 340 },
    { month: 'Apr', revenue: 542, expenses: 318 },
  ];

  // 3. HR Employee Distribution Donut (Full-time: teal, Part-time: blue, On leave: orange, Open roles: purple)
  const hrData = [
    { name: 'Full-time', value: 28, color: '#0F7A57' },
    { name: 'Part-time', value: 8, color: '#3B82F6' },
    { name: 'On leave', value: 6, color: '#F59E0B' },
    { name: 'Open roles', value: 6, color: '#8B5CF6' },
  ];

  // 4. Projects Donut (On Track: green, At Risk: orange, Delayed: red, Completed: blue)
  const projectsData = [
    { name: 'On Track', value: 16, color: '#0F7A57' },
    { name: 'At Risk', value: 4, color: '#F59E0B' },
    { name: 'Delayed', value: 2, color: '#EF4444' },
    { name: 'Completed', value: 2, color: '#3B82F6' },
  ];

  // 5. Contracts Donut (Active: green 76%, Expiring: orange 16%, Renewal Due: blue 6%, Expired: red 2%)
  const contractsData = [
    { name: 'Active', value: 47, color: '#0F7A57' },
    { name: 'Expiring', value: 10, color: '#F59E0B' },
    { name: 'Renewal Due', value: 4, color: '#3B82F6' },
    { name: 'Expired', value: 1, color: '#EF4444' },
  ];

  // 6. Compliance Donut (Completed: green 75%, In Progress: blue 19%, Overdue: red 6%)
  const complianceData = [
    { name: 'Completed', value: 12, color: '#0F7A57' },
    { name: 'In Progress', value: 3, color: '#3B82F6' },
    { name: 'Overdue', value: 1, color: '#EF4444' },
  ];

  // 7. Support Priority Donut (Low: teal/green, Med: orange, High: dark orange, Crit: red)
  const supportData = [
    { name: 'Low', value: 20, color: '#10B981' },
    { name: 'Medium', value: 10, color: '#F59E0B' },
    { name: 'High', value: 4, color: '#F97316' },
    { name: 'Critical', value: 2, color: '#EF4444' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* ROW 1: 4 Modules: Finance, CRM, HR, Projects */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '14px',
        }}
      >
        {/* SNAPSHOT 1: FINANCE */}
        {isSubscribed('finance') && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-ui)',
              padding: '16px 18px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '260px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Bank size={16} color="#007D7D" weight="regular" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Finance Snapshot
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>This Month ▾</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
              {/* Left stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '95px', justifyContent: 'center' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Revenue</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>£542,320</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 12%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Expenses</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>£318,450</div>
                  <div style={{ fontSize: '11px', color: '#B42318', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 8%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Profit</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F7A57' }}>£223,870</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 18%
                  </div>
                </div>
              </div>

              {/* Right Chart */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '180px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', fontSize: '9.5px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '1.5px', background: '#34D399' }} />
                    <span>Revenue</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '1.5px', background: '#F87171' }} />
                    <span>Expenses</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={financeBarData} barGap={2} margin={{ top: 2, right: 0, left: -32, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Bar dataKey="revenue" fill="#34D399" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="expenses" fill="#F87171" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 2: CRM (WITH PRECISE FUNNEL SHAPE AS IN IMAGE) */}
        {isSubscribed('sales-crm') && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-ui)',
              padding: '16px 18px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '260px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <ChartLineUp size={16} color="#059669" weight="regular" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  CRM Snapshot
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>This Month ▾</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
              {/* Left stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '95px', justifyContent: 'center' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Total Customers</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>156</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 6%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>New Customers</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>12</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 33%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Conversion Rate</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>28%</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 4%
                  </div>
                </div>
              </div>

              {/* Right Funnel & Legend exactly matching design */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '2px' }}>
                  Pipeline Value: <span style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>£1,130,000</span>
                </div>

                {/* SVG Trapezoid Funnel */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="105" height="110" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                    {/* Top Tier: Leads (Blue) */}
                    <polygon points="5,5 95,5 82,27 18,27" fill="#3B82F6" />
                    <text x="50" y="19" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">48</text>

                    {/* Tier 2: Qualified (Purple) */}
                    <polygon points="20,30 80,30 70,52 30,52" fill="#8B5CF6" />
                    <text x="50" y="44" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">32</text>

                    {/* Tier 3: Proposal (Amber) */}
                    <polygon points="32,55 68,55 60,77 40,77" fill="#F59E0B" />
                    <text x="50" y="69" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">18</text>

                    {/* Tier 4: Won (Green) */}
                    <polygon points="42,80 58,80 54,98 46,98" fill="#10B981" />
                    <text x="50" y="92" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle">9</text>
                  </svg>

                  {/* Funnel Legend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '9.5px', color: 'var(--color-text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6' }} />
                      <span>Leads</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B5CF6' }} />
                      <span>Qualified</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }} />
                      <span>Proposal</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                      <span>Won</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 3: HR */}
        {isSubscribed('hr') && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-ui)',
              padding: '16px 18px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '260px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <UsersThree size={16} color="#0D9488" weight="regular" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  HR Snapshot
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>This Month ▾</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
              {/* Left stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', minWidth: '95px', justifyContent: 'center' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Total Employees</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>48</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 2%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>New Starters</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>4</div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>On Leave</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>6</div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Open Roles</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>3</div>
                </div>
              </div>

              {/* Right Donut */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>
                  Employee Distribution
                </div>
                <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={hrData}
                        dataKey="value"
                        innerRadius={32}
                        outerRadius={48}
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {hrData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
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
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>48</span>
                    <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)' }}>Employees</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', marginTop: '6px', fontSize: '9px', color: 'var(--color-text-secondary)' }}>
                  <div><span style={{ color: '#0F7A57' }}>●</span> 28 Full-time</div>
                  <div><span style={{ color: '#3B82F6' }}>●</span> 8 Part-time</div>
                  <div><span style={{ color: '#F59E0B' }}>●</span> 6 On leave</div>
                  <div><span style={{ color: '#8B5CF6' }}>●</span> 6 Open roles</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 4: PROJECTS */}
        {isSubscribed('projects') && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-ui)',
              padding: '16px 18px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '260px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Briefcase size={16} color="#D97706" weight="regular" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Projects Snapshot
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>This Quarter ▾</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
              {/* Left stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '95px', justifyContent: 'center' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Total Projects</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>24</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 4%
                  </div>
                </div>
                <div style={{ fontSize: '10.5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span><span style={{ color: '#0F7A57' }}>●</span> On Track</span>
                  <span style={{ fontWeight: 600 }}>16 <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>67%</span></span>
                </div>
                <div style={{ fontSize: '10.5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span><span style={{ color: '#F59E0B' }}>●</span> At Risk</span>
                  <span style={{ fontWeight: 600 }}>4 <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>17%</span></span>
                </div>
                <div style={{ fontSize: '10.5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span><span style={{ color: '#EF4444' }}>●</span> Delayed</span>
                  <span style={{ fontWeight: 600 }}>2 <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>8%</span></span>
                </div>
                <div style={{ fontSize: '10.5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span><span style={{ color: '#3B82F6' }}>●</span> Completed</span>
                  <span style={{ fontWeight: 600 }}>2 <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>8%</span></span>
                </div>
              </div>

              {/* Right Donut */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '105px', height: '105px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectsData}
                        dataKey="value"
                        innerRadius={34}
                        outerRadius={50}
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {projectsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
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
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>24</span>
                    <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)' }}>Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ROW 2: 4 Modules: Documents & Contracts, Compliance, Service & Support, AI Insights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '14px',
        }}
      >
        {/* SNAPSHOT 5: DOCUMENTS & CONTRACTS */}
        {isSubscribed('contracts') && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-ui)',
              padding: '16px 18px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '260px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <FileText size={16} color="#1D4ED8" weight="regular" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Documents & Contracts Snapshot
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>This Month ▾</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
              {/* Left stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '95px', justifyContent: 'center' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Total Documents</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>1,248</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 8%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Active Contracts</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>62</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 5%
                  </div>
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>
                  Expiring &lt; 30 days: <b style={{ color: 'var(--color-text-primary)' }}>5</b>
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>
                  Pending Approvals: <b style={{ color: 'var(--color-text-primary)' }}>3</b>
                </div>
              </div>

              {/* Right Donut */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Contract Status</div>
                <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contractsData}
                        dataKey="value"
                        innerRadius={32}
                        outerRadius={48}
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {contractsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
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
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>62</span>
                    <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)' }}>Contracts</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', marginTop: '6px', fontSize: '9px', color: 'var(--color-text-secondary)' }}>
                  <div><span style={{ color: '#0F7A57' }}>●</span> Active 76% (47)</div>
                  <div><span style={{ color: '#F59E0B' }}>●</span> Expiring 16% (10)</div>
                  <div><span style={{ color: '#3B82F6' }}>●</span> Renew 6% (4)</div>
                  <div><span style={{ color: '#EF4444' }}>●</span> Expired 2% (1)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 6: COMPLIANCE & RISK */}
        {isSubscribed('compliance') && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-ui)',
              padding: '16px 18px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '260px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <ShieldCheck size={16} color="#0F7A57" weight="regular" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Compliance & Risk Snapshot
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>This Month ▾</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
              {/* Left stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '95px', justifyContent: 'center' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Compliance Score</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F7A57' }}>92%</div>
                  <div style={{ fontSize: '11px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendUp size={12} weight="bold" /> 3%
                  </div>
                </div>
                <div style={{ fontSize: '10.5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Open Actions</span>
                  <span style={{ fontWeight: 600, color: '#EF4444' }}>8 ↓ 20%</span>
                </div>
                <div style={{ fontSize: '10.5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Overdue Actions</span>
                  <span style={{ fontWeight: 600, color: '#EF4444' }}>3 ↓ 40%</span>
                </div>
                <div style={{ fontSize: '10.5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Upcoming Reviews</span>
                  <span style={{ fontWeight: 600, color: '#0F7A57' }}>5 ↑ 25%</span>
                </div>
              </div>

              {/* Right Donut */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Action Status</div>
                <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={complianceData}
                        dataKey="value"
                        innerRadius={32}
                        outerRadius={48}
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {complianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
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
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>16</span>
                    <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)' }}>Actions</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '2px', marginTop: '4px', fontSize: '9px', color: 'var(--color-text-secondary)' }}>
                  <div><span style={{ color: '#0F7A57' }}>●</span> Completed 75% (12)</div>
                  <div><span style={{ color: '#3B82F6' }}>●</span> In Progress 19% (3)</div>
                  <div><span style={{ color: '#EF4444' }}>●</span> Overdue 6% (1)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 7: SERVICE & SUPPORT */}
        {isSubscribed('service-support') && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-ui)',
              padding: '16px 18px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '260px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Headset size={16} color="#007D7D" weight="regular" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Service & Support Snapshot
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>This Month ▾</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
              {/* Left stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '95px', justifyContent: 'center' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Total Tickets</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>36</div>
                  <div style={{ fontSize: '11px', color: '#B42318', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendDown size={12} weight="bold" /> 18%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Open Tickets</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>3</div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Avg. Response Time</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>2h 15m</div>
                  <div style={{ fontSize: '10.5px', color: '#0F7A57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendDown size={12} weight="bold" /> 35%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>Customer Satisfaction</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F7A57' }}>94% <span style={{ fontSize: '10px', color: '#0F7A57' }}>↑ 6%</span></div>
                </div>
              </div>

              {/* Right Donut */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Tickets by Priority</div>
                <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={supportData}
                        dataKey="value"
                        innerRadius={32}
                        outerRadius={48}
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {supportData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
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
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>36</span>
                    <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)' }}>Tickets</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', marginTop: '6px', fontSize: '9px', color: 'var(--color-text-secondary)' }}>
                  <div><span style={{ color: '#10B981' }}>●</span> Low 56% (20)</div>
                  <div><span style={{ color: '#F59E0B' }}>●</span> Med 28% (10)</div>
                  <div><span style={{ color: '#F97316' }}>●</span> High 11% (4)</div>
                  <div><span style={{ color: '#EF4444' }}>●</span> Crit 6% (2)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 8: AI & INTELLIGENCE INSIGHTS */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-ui)',
            padding: '16px 18px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '260px',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Sparkle size={16} color="#007D7D" weight="fill" />
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Intelligence / AI Insights
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>This Month ▾</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#E7F5EF',
                  color: '#0F7A57',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <TrendUp size={13} weight="bold" />
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                Revenue is <b style={{ color: 'var(--color-text-primary)' }}>12% higher</b> than last month, driven by 3 new enterprise customers.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#FEF3C7',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <FileText size={13} weight="fill" />
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                <b style={{ color: 'var(--color-text-primary)' }}>4 contracts</b> are due to expire in the next 30 days. Consider renewal discussions.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#EBF1FE',
                  color: '#1D4ED8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <Headset size={13} weight="fill" />
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                Support ticket volume is <b style={{ color: 'var(--color-text-primary)' }}>down 18%</b> with improved response times.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#F3E8FF',
                  color: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <Briefcase size={13} weight="fill" />
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                Project delivery is on track with <b style={{ color: 'var(--color-text-primary)' }}>67% of milestones</b> completed this quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
