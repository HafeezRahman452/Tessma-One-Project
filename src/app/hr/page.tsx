'use client';

import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  UserPlus,
  CalendarCheck,
  FileText,
  TrendingUp,
  TrendingDown,
  Check,
  X,
  Search,
  Sparkles,
  Bell,
  HelpCircle,
  Calendar,
  ChevronDown,
  ChevronRight,
  Upload,
  UserCheck,
  FileCheck,
  ShieldCheck,
  Award,
  AlertCircle,
  FileCode,
  Edit,
  BarChart2,
  Settings,
  FolderPlus,
  RefreshCw
} from 'lucide-react';

export default function HrDashboardPage() {
  const [selectedRange, setSelectedRange] = useState('01 Apr 2025 – 30 Apr 2025');

  // KPI card data
  const kpiData = [
    {
      title: 'Total Employees',
      value: '248',
      change: '2%',
      isPositive: true,
      icon: Users,
      color: '#0d9488',
      bg: '#e6fffa',
    },
    {
      title: 'Open Vacancies',
      value: '12',
      change: '14%',
      isPositive: false,
      icon: Briefcase,
      color: '#f59e0b',
      bg: '#fef3c7',
    },
    {
      title: 'Onboarding In Progress',
      value: '8',
      change: '60%',
      isPositive: true,
      icon: UserPlus,
      color: '#6366f1',
      bg: '#ede9fe',
    },
    {
      title: 'Leave Requests',
      value: '14',
      change: '27%',
      isPositive: false, // red down/up indicator based on screenshot red 27%
      icon: CalendarCheck,
      color: '#3b82f6',
      bg: '#dbeafe',
    },
    {
      title: 'Documents Expiring',
      value: '19',
      change: '36%',
      isPositive: false, // red arrow up
      icon: FileText,
      color: '#ef4444',
      bg: '#fee2e2',
    },
  ];

  // Headcount breakdown
  const departmentBreakdown = [
    { name: 'Operations', count: 68, pct: '27%', color: '#38bdf8' },
    { name: 'Sales', count: 52, pct: '21%', color: '#3b82f6' },
    { name: 'Administration', count: 48, pct: '19%', color: '#fb923c' },
    { name: 'Finance', count: 32, pct: '13%', color: '#a855f7' },
    { name: 'IT', count: 28, pct: '11%', color: '#6366f1' },
    { name: 'Other', count: 20, pct: '8%', color: '#94a3b8' },
  ];

  // Upcoming probation reviews
  const probationReviews = [
    { date: '07', month: 'Apr', name: 'Alex Carter', role: 'Marketing Executive', daysLeft: 'In 3 days' },
    { date: '10', month: 'Apr', name: 'Priya Singh', role: 'Customer Support Advisor', daysLeft: 'In 6 days' },
    { date: '14', month: 'Apr', name: 'James Wilson', role: 'Field Service Engineer', daysLeft: 'In 10 days' },
    { date: '22', month: 'Apr', name: 'Maria Lopez', role: 'HR Assistant', daysLeft: 'In 18 days' },
    { date: '28', month: 'Apr', name: 'Daniel Brooks', role: 'Projects Coordinator', daysLeft: 'In 24 days' },
  ];

  // Documents expiring soon
  const expiringDocs = [
    { title: 'Right to Work Check', name: 'Emma Johnson', days: '3 days', icon: ShieldCheck, isRed: true },
    { title: 'Disclosure & Barring Service', name: 'Liam Roberts', days: '7 days', icon: FileCheck, isOrange: true },
    { title: 'Professional Qualification', name: 'Sophie Martin', days: '12 days', icon: Award, isOrange: true },
    { title: 'First Aid Certificate', name: 'Oliver Green', days: '15 days', icon: Award, isOrange: true },
    { title: 'Right to Work Check', name: 'Aisha Khan', days: '22 days', icon: ShieldCheck, isRed: true },
  ];

  // Leave requests
  const leaveRequests = [
    { initials: 'SC', name: 'Sophia Clark', type: 'Annual Leave', dates: '14 Apr – 18 Apr 2025', daysNotice: '3 days' },
    { initials: 'BR', name: 'Ben Richardson', type: 'Annual Leave', dates: '21 Apr – 22 Apr 2025', daysNotice: '10 days' },
    { initials: 'EL', name: 'Ella Lewis', type: 'Sick Leave', dates: '24 Apr – 25 Apr 2025', daysNotice: '13 days' },
    { initials: 'MT', name: 'Mohammed Tariq', type: 'Annual Leave', dates: '28 Apr – 02 May 2025', daysNotice: '17 days' },
  ];

  // Recent employee activity
  const recentActivities = [
    { icon: UserPlus, color: '#6366f1', bg: '#ede9fe', title: 'New employee added', desc: 'Chloe Adams – Marketing Executive', time: '2 hours ago' },
    { icon: RefreshCw, color: '#3b82f6', bg: '#dbeafe', title: 'Employee record updated', desc: 'Ryan Mitchell – Contact details', time: '5 hours ago' },
    { icon: CalendarCheck, color: '#10b981', bg: '#d1fae5', title: 'Leave request submitted', desc: 'Natalie Green – Annual Leave (3 days)', time: '1 day ago' },
    { icon: FileText, color: '#0ea5e9', bg: '#e0f2fe', title: 'Document uploaded', desc: 'Thomas White – Right to Work', time: '1 day ago' },
    { icon: Award, color: '#2563eb', bg: '#dbeafe', title: 'Probation review completed', desc: 'Hannah Collins – HR Assistant', time: '2 days ago' },
  ];

  // Quick actions
  const quickActions = [
    { label: 'Add Employee', icon: UserPlus, color: '#059669', bg: '#d1fae5' },
    { label: 'Approve Leave', icon: CalendarCheck, color: '#2563eb', bg: '#dbeafe' },
    { label: 'View Employee Records', icon: FileText, color: '#7c3aed', bg: '#ede9fe' },
    { label: 'Manage Probation Reviews', icon: Users, color: '#ea580c', bg: '#ffedd5' },
    { label: 'Upload Document', icon: Upload, color: '#0284c7', bg: '#e0f2fe' },
    { label: 'Update Employee Details', icon: Edit, color: '#d97706', bg: '#fef3c7' },
    { label: 'Run HR Reports', icon: BarChart2, color: '#e11d48', bg: '#ffe4e6' },
    { label: 'HR Settings', icon: Settings, color: '#475569', bg: '#f1f5f9' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* ── Header Title & Date Range ────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>Dashboard Overview</h1>
          <p style={{ fontSize: 13.5, color: '#64748b', margin: 0 }}>
            Your HR command centre – people, compliance and performance at a glance.
          </p>
        </div>

        {/* Date Filter */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff',
          border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 14px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)', cursor: 'pointer', fontSize: 13, color: '#1e293b', fontWeight: 500
        }}>
          <Calendar size={15} color="#64748b" />
          <span>{selectedRange}</span>
          <ChevronDown size={14} color="#64748b" />
        </div>
      </div>

      {/* ── Top Row: 5 KPI Cards ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        {kpiData.map((kpi, idx) => {
          const IconComponent = kpi.icon;
          return (
            <div key={idx} style={{
              background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9',
              padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, background: kpi.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff'
                }}>
                  <IconComponent size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 11.5, color: '#64748b', fontWeight: 600 }}>{kpi.title}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>{kpi.value}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, marginTop: 'auto' }}>
                <span style={{
                  color: kpi.isPositive ? '#10b981' : '#ef4444',
                  fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2
                }}>
                  {kpi.isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {kpi.isPositive ? `↑ ${kpi.change}` : `↓ ${kpi.change}`}
                </span>
                <span style={{ color: '#94a3b8' }}>vs. previous month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mid Row: 3 Visual Charts / Summaries ─────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        
        {/* 1. Employee Headcount Trend */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '20px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Employee Headcount Trend</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b', cursor: 'pointer' }}>
              <span>Last 6 Months</span>
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Bar + Line chart preview */}
          <div style={{ height: 165, position: 'relative', marginTop: 10 }}>
            {/* SVG Chart with bars and trend line */}
            <svg viewBox="0 0 380 140" style={{ width: '100%', height: '100%' }}>
              {/* Horizontal gridlines */}
              <line x1="25" y1="20" x2="370" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="25" y1="60" x2="370" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="25" y1="100" x2="370" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* Y Axis labels */}
              <text x="5" y="24" fontSize="9" fill="#94a3b8">300</text>
              <text x="5" y="64" fontSize="9" fill="#94a3b8">200</text>
              <text x="5" y="104" fontSize="9" fill="#94a3b8">100</text>
              <text x="15" y="135" fontSize="9" fill="#94a3b8">0</text>

              {/* Bars: Nov 24 to Apr 25 */}
              <rect x="52" y="75" width="26" height="55" rx="3" fill="#bae6fd" />
              <rect x="110" y="66" width="26" height="64" rx="3" fill="#bae6fd" />
              <rect x="168" y="55" width="26" height="75" rx="3" fill="#bae6fd" />
              <rect x="226" y="47" width="26" height="83" rx="3" fill="#bae6fd" />
              <rect x="284" y="42" width="26" height="88" rx="3" fill="#bae6fd" />
              <rect x="342" y="38" width="26" height="92" rx="3" fill="#93c5fd" />

              {/* Trend Line (Green) */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                points="65,92 123,87 181,80 239,74 297,71 355,67"
              />
              {/* Dots on line */}
              {[
                [65, 92], [123, 87], [181, 80], [239, 74], [297, 71], [355, 67]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="#10b981" />
              ))}

              {/* X Axis Labels */}
              <text x="52" y="145" fontSize="9" fill="#64748b">Nov 24</text>
              <text x="110" y="145" fontSize="9" fill="#64748b">Dec 24</text>
              <text x="168" y="145" fontSize="9" fill="#64748b">Jan 25</text>
              <text x="226" y="145" fontSize="9" fill="#64748b">Feb 25</text>
              <text x="284" y="145" fontSize="9" fill="#64748b">Mar 25</text>
              <text x="342" y="145" fontSize="9" fill="#64748b">Apr 25</text>
            </svg>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12, fontSize: 11, color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3b82f6' }}></span>
              <span>Employees</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }}></span>
              <span>Headcount Trend</span>
            </div>
          </div>
        </div>

        {/* 2. Headcount by Department */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '20px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Headcount by Department</h3>
            <span style={{ fontSize: 12, color: '#64748b', cursor: 'pointer' }}>View All &gt;</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Donut with 248 Employees in center */}
            <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0 }}>
              <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                {/* Operations 27% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#38bdf8" strokeWidth="15" strokeDasharray="64.5 174.5" strokeDashoffset="0" />
                {/* Sales 21% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" strokeWidth="15" strokeDasharray="50 189" strokeDashoffset="-64.5" />
                {/* Administration 19% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#fb923c" strokeWidth="15" strokeDasharray="45 194" strokeDashoffset="-114.5" />
                {/* Finance 13% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#a855f7" strokeWidth="15" strokeDasharray="31 208" strokeDashoffset="-159.5" />
                {/* IT 11% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#6366f1" strokeWidth="15" strokeDasharray="26 213" strokeDashoffset="-190.5" />
                {/* Other 8% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#94a3b8" strokeWidth="15" strokeDasharray="22.5 216.5" strokeDashoffset="-216.5" />
              </svg>
              {/* Centered Text */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>248</span>
                <span style={{ fontSize: 9.5, color: '#64748b', marginTop: 2 }}>Employees</span>
              </div>
            </div>

            {/* Department stats list */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
              {departmentBreakdown.map((dept, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: dept.color }}></span>
                    <span style={{ color: '#475569' }}>{dept.name}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>
                    {dept.count} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({dept.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Attendance Overview */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '20px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Attendance Overview</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
              <span>This Month</span>
              <ChevronDown size={14} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Green Attendance Donut */}
            <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0 }}>
              <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                {/* Present 94% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="15" strokeDasharray="224 239" strokeDashoffset="0" />
                {/* Absent 4% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#fb923c" strokeWidth="15" strokeDasharray="10 239" strokeDashoffset="-224" />
                {/* Late 2% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#ef4444" strokeWidth="15" strokeDasharray="5 239" strokeDashoffset="-234" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>94%</span>
                <span style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>Attendance Rate</span>
              </div>
            </div>

            {/* Attendance Legend */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
                  <span style={{ color: '#475569' }}>Present</span>
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>
                  233 <span style={{ color: '#94a3b8', fontWeight: 400 }}>(94%)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fb923c' }}></span>
                  <span style={{ color: '#475569' }}>Absent</span>
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>
                  9 <span style={{ color: '#94a3b8', fontWeight: 400 }}>(4%)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ color: '#475569' }}>Late</span>
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>
                  4 <span style={{ color: '#94a3b8', fontWeight: 400 }}>(2%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Third Row: 3 Actionable Lists ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        
        {/* 1. Upcoming Probation Reviews */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Upcoming Probation Reviews</h3>
              <span style={{ background: '#ef4444', color: '#ffffff', borderRadius: 12, fontSize: 11, fontWeight: 700, padding: '1px 7px' }}>5</span>
            </div>
            <span style={{ fontSize: 12, color: '#64748b', cursor: 'pointer' }}>View All &gt;</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {probationReviews.map((rev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8, background: '#fee2e2',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#ef4444', lineHeight: 1 }}>{rev.date}</span>
                    <span style={{ fontSize: 9.5, color: '#ef4444', fontWeight: 600, textTransform: 'uppercase' }}>{rev.month}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{rev.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{rev.role}</div>
                  </div>
                </div>
                <div style={{
                  background: '#eff6ff', color: '#2563eb', borderRadius: 6,
                  padding: '4px 8px', fontSize: 11, fontWeight: 600
                }}>
                  {rev.daysLeft}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Documents Expiring Soon */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Documents Expiring Soon</h3>
              <span style={{ background: '#ef4444', color: '#ffffff', borderRadius: 12, fontSize: 11, fontWeight: 700, padding: '1px 7px' }}>6</span>
            </div>
            <span style={{ fontSize: 12, color: '#64748b', cursor: 'pointer' }}>View All &gt;</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {expiringDocs.map((doc, i) => {
              const DocIcon = doc.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 8,
                      background: doc.isRed ? '#fee2e2' : '#fef3c7',
                      color: doc.isRed ? '#ef4444' : '#d97706',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <DocIcon size={19} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{doc.title}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{doc.name}</div>
                    </div>
                  </div>
                  <div style={{
                    color: doc.isRed ? '#ef4444' : '#d97706',
                    fontSize: 11.5, fontWeight: 700
                  }}>
                    {doc.days}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Leave Requests Awaiting Approval */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Leave Requests Awaiting Approval</h3>
              <span style={{ background: '#ef4444', color: '#ffffff', borderRadius: 12, fontSize: 11, fontWeight: 700, padding: '1px 7px' }}>4</span>
            </div>
            <span style={{ fontSize: 12, color: '#64748b', cursor: 'pointer' }}>View All &gt;</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {leaveRequests.map((req, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', background: '#e0f2fe',
                    color: '#0284c7', fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {req.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>{req.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>
                      <span style={{ color: '#475569', fontWeight: 600 }}>{req.type}</span> &nbsp;{req.dates}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#ef4444', fontSize: 11, fontWeight: 700 }}>{req.daysNotice}</span>
                  {/* Approve checkmark button */}
                  <button style={{
                    width: 24, height: 24, borderRadius: 6, background: '#dcfce7',
                    border: 'none', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <Check size={14} />
                  </button>
                  {/* Reject cross button */}
                  <button style={{
                    width: 24, height: 24, borderRadius: 6, background: '#fee2e2',
                    border: 'none', color: '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom Row: Recent Activity & Quick Actions ──────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 16 }}>
        
        {/* Recent Employee Activity */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '20px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>Recent Employee Activity</h3>
            <span style={{ fontSize: 12, color: '#64748b', cursor: 'pointer' }}>View All &gt;</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {recentActivities.map((act, i) => {
              const ActIcon = act.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: act.bg,
                      color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <ActIcon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>{act.title}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{act.desc}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{act.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions (8 Buttons Grid) */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '20px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Quick Actions</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {quickActions.map((qa, i) => {
              const ActionIcon = qa.icon;
              return (
                <button
                  key={i}
                  style={{
                    background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10,
                    padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: qa.bg,
                    color: qa.color, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <ActionIcon size={18} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#334155', textAlign: 'center', lineHeight: 1.2 }}>
                    {qa.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
