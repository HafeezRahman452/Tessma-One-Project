'use client';

import React, { useState } from 'react';
import {
  Plus, UploadSimple, ArrowsClockwise, DotsThreeVertical, CaretDown, Coins, FileText,
  WarningCircle, CalendarBlank, ArrowUp, ArrowDown, MagnifyingGlass, Funnel, ArrowRight,
  ListBullets, IdentificationCard, CheckCircle, Files, FolderSimple,
} from '@phosphor-icons/react';

const C = {
  text: '#0B1220', muted: '#64748B', border: '#E2E8F0', blue: '#1D4ED8', green: '#16A34A',
  red: '#DC2626', bg: '#F8FAFC',
};

type Acc = {
  id: number; name: string; sub: string; bank: string; bankColor: string; bankMark: string;
  num: string; cur: string; current: string; avail: string; date: string; time: string;
  status: 'Active' | 'Requires reconciliation' | 'Inactive'; iconBg: string; iconColor: string;
  type: string; sort: string; iban: string; bic: string;
};

const accounts: Acc[] = [
  { id: 1, name: 'Main Operating Account', sub: 'Primary operating account', bank: 'HSBC UK', bankColor: '#DB0011', bankMark: '◆', num: '4587', cur: 'GBP', current: '£248,320.00', avail: '£235,480.00', date: '15 Apr 2025', time: '10:24', status: 'Active', iconBg: '#DCFCE7', iconColor: '#16A34A', type: 'Current Account', sort: '40-05-30', iban: 'GB33 HBUK 4005 3012 3456 78', bic: 'HBUKGB4B' },
  { id: 2, name: 'Payroll Account', sub: 'Staff salaries and payroll', bank: 'Barclays', bankColor: '#00AEEF', bankMark: '🦅', num: '0321', cur: 'GBP', current: '£86,450.00', avail: '£86,450.00', date: '15 Apr 2025', time: '09:12', status: 'Active', iconBg: '#DBEAFE', iconColor: '#2563EB', type: 'Current Account', sort: '20-00-00', iban: 'GB12 BARC 2000 0003 2100 00', bic: 'BARCGB22' },
  { id: 3, name: 'Savings Account', sub: 'Short term reserves', bank: 'Lloyds Bank', bankColor: '#000000', bankMark: '🐎', num: '7712', cur: 'GBP', current: '£120,000.00', avail: '£120,000.00', date: '14 Apr 2025', time: '18:43', status: 'Active', iconBg: '#FEF3C7', iconColor: '#D97706', type: 'Savings Account', sort: '30-00-00', iban: 'GB45 LOYD 3000 0077 1200 00', bic: 'LOYDGB2L' },
  { id: 4, name: 'Euro Operating Account', sub: 'European operations', bank: 'BNP Paribas', bankColor: '#00915A', bankMark: '✦', num: '9921', cur: 'EUR', current: '€75,620.00', avail: '€71,840.00', date: '15 Apr 2025', time: '08:37', status: 'Requires reconciliation', iconBg: '#DBEAFE', iconColor: '#2563EB', type: 'Current Account', sort: '—', iban: 'FR76 3000 4000 0399 2100 0000 000', bic: 'BNPAFRPP' },
  { id: 5, name: 'USD Collection Account', sub: 'Customer receipts (USD)', bank: 'citi', bankColor: '#003B70', bankMark: 'citi', num: '6634', cur: 'USD', current: '$42,180.00', avail: '$40,950.00', date: '15 Apr 2025', time: '07:55', status: 'Active', iconBg: '#DBEAFE', iconColor: '#1D4ED8', type: 'Collection Account', sort: '—', iban: 'US—', bic: 'CITIUS33' },
  { id: 6, name: 'Project Escrow Account', sub: 'Project client funds', bank: 'NatWest', bankColor: '#5A287D', bankMark: '◈', num: '1189', cur: 'GBP', current: '£18,650.00', avail: '£18,650.00', date: '13 Apr 2025', time: '11:09', status: 'Inactive', iconBg: '#FCE7F3', iconColor: '#BE185D', type: 'Escrow Account', sort: '60-00-01', iban: 'GB29 NWBK 6000 0111 8900 00', bic: 'NWBKGB2L' },
];

const txns = [
  { date: '15 Apr 2025', desc: 'Customer Payment - Acme Ltd', ref: 'INV-2025-0423', type: 'Credit', amt: '£12,450.00', bal: '£248,320.00' },
  { date: '14 Apr 2025', desc: 'Supplier Payment - Tech Supplies', ref: 'BILL-2025-0187', type: 'Debit', amt: '-£2,450.00', bal: '£235,870.00' },
  { date: '14 Apr 2025', desc: 'Direct Debit - Office Rent', ref: 'DD-001245', type: 'Debit', amt: '-£4,800.00', bal: '£238,320.00' },
  { date: '12 Apr 2025', desc: 'Card Payment - Microsoft', ref: 'CARD-5566', type: 'Debit', amt: '-£320.00', bal: '£243,120.00' },
  { date: '10 Apr 2025', desc: 'Customer Payment - Global Solutions', ref: 'INV-2025-0422', type: 'Credit', amt: '£8,400.00', bal: '£243,440.00' },
];

const kpis = [
  { label: 'Cash in Bank', value: '£540,320', delta: '12%', up: true, good: true, note: 'vs. previous month', icon: Coins, bg: '#16A34A', bars: [30, 45, 40, 60, 55, 80, 100], color: '#22C55E' },
  { label: 'Uncleared Transactions', value: '24', delta: '33%', up: true, good: false, note: 'vs. previous month', icon: FileText, bg: '#7C3AED', bars: [35, 50, 45, 65, 60, 85, 100], color: '#F87171' },
  { label: 'Accounts Requiring Reconciliation', value: '3', delta: '50%', up: true, good: false, note: 'vs. previous month', icon: WarningCircle, bg: '#F59E0B', bars: [30, 50, 45, 70, 60, 85, 100], color: '#FBBF24' },
  { label: 'Upcoming Payments', value: '£56,800', delta: '18%', up: false, good: true, note: 'next 30 days', icon: CalendarBlank, bg: '#2563EB', bars: [40, 55, 50, 70, 65, 85, 100], color: '#3B82F6' },
];

const card: React.CSSProperties = { background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10 };
const btn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', borderRadius: 6, border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 13, fontWeight: 500, cursor: 'pointer' };

function StatusPill({ s }: { s: Acc['status'] }) {
  const map = {
    Active: { bg: '#DCFCE7', fg: '#15803D', dot: '#16A34A', label: 'Active' },
    'Requires reconciliation': { bg: '#FFEDD5', fg: '#C2410C', dot: '#F97316', label: 'Requires reconcil…' },
    Inactive: { bg: '#F1F5F9', fg: '#475569', dot: '#64748B', label: 'Inactive' },
  }[s];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: map.bg, color: map.fg, fontSize: 11.5, fontWeight: 500, whiteSpace: 'nowrap' }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: map.dot }} />{map.label}
    </span>
  );
}

function BankLogo({ a, size = 20 }: { a: Acc; size?: number }) {
  if (a.bankMark === 'citi') return <span style={{ color: a.bankColor, fontWeight: 800, fontSize: size * 0.8, fontStyle: 'italic' }}>citi</span>;
  return (
    <span style={{ width: size, height: size, borderRadius: 4, background: a.bankColor, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.55 }}>{a.bankMark}</span>
  );
}

export default function BankAccountsPage() {
  const [tab, setTab] = useState<'all' | 'active' | 'archived'>('all');
  const [selected, setSelected] = useState(1);
  const [detailTab, setDetailTab] = useState('Recent Transactions');
  const [q, setQ] = useState('');
  const sel = accounts.find(a => a.id === selected)!;

  const rows = accounts.filter(a =>
    (tab === 'all' || (tab === 'active' ? a.status !== 'Inactive' : a.status === 'Inactive')) &&
    (a.name + a.bank + a.num).toLowerCase().includes(q.toLowerCase()));

  const th: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', fontSize: 11.5, fontWeight: 600, color: C.muted, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
  const td: React.CSSProperties = { padding: '8px 12px', fontSize: 12.5, color: C.text, borderBottom: `1px solid #F1F5F9` };

  return (
    <div style={{ padding: '4px 0 24px', fontFamily: 'Inter, sans-serif', color: C.text }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Bank Accounts</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13.5, color: C.muted }}>Manage your bank accounts, view balances and monitor account activity across your organisation.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button id="new-bank-account" style={{ ...btn, background: C.blue, color: '#fff', border: 'none' }}><Plus size={15} weight="bold" />New bank account</button>
          <button id="import-statement" style={btn}><UploadSimple size={15} />Import statement</button>
          <button id="reconcile" style={btn}><ArrowsClockwise size={15} />Reconcile</button>
          <button id="more" style={btn}><DotsThreeVertical size={15} weight="bold" />More<CaretDown size={12} /></button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
        {kpis.map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} style={{ ...card, padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: k.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={22} weight="fill" /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: C.muted }}>{k.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, margin: '2px 0' }}>{k.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: k.good ? C.green : C.red, display: 'flex', alignItems: 'center', gap: 3 }}>
                  {k.up ? <ArrowUp size={13} weight="bold" /> : <ArrowDown size={13} weight="bold" />}{k.delta}
                </div>
                <div style={{ fontSize: 11, color: C.muted }}>{k.note}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
                {k.bars.map((h, i) => <div key={i} style={{ width: 8, height: `${h}%`, background: k.color, opacity: 0.55 + i * 0.07, borderRadius: 2 }} />)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Accounts table */}
      <div style={{ ...card, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {([['all', 'All accounts (8)'], ['active', 'Active (6)'], ['archived', 'Archived (2)']] as const).map(([k, l]) => (
              <button key={k} id={`tab-${k}`} onClick={() => setTab(k)} style={{ ...btn, height: 30, background: tab === k ? '#EFF6FF' : '#fff', color: tab === k ? C.blue : C.text, borderColor: tab === k ? '#BFDBFE' : C.border }}>{l}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <MagnifyingGlass size={14} style={{ position: 'absolute', left: 10, top: 9, color: C.muted }} />
              <input id="search-accounts" value={q} onChange={e => setQ(e.target.value)} placeholder="Search bank accounts..." style={{ height: 30, width: 220, padding: '0 10px 0 30px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 12.5, outline: 'none' }} />
            </div>
            <button style={{ ...btn, height: 30 }}>All currencies<CaretDown size={12} /></button>
            <button style={{ ...btn, height: 30 }}>All statuses<CaretDown size={12} /></button>
            <Funnel size={18} color={C.muted} />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: C.bg }}>
            <tr>
              <th style={{ ...th, width: 30 }}><input type="checkbox" /></th>
              <th style={th}>Account Name</th><th style={th}>Bank Name</th><th style={th}>Account Number</th><th style={th}>Currency</th>
              <th style={{ ...th, textAlign: 'right' }}>Current Balance</th><th style={{ ...th, textAlign: 'right' }}>Available Balance</th>
              <th style={th}>Last Synced ⌄</th><th style={th}>Status</th><th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(a => (
              <tr key={a.id} onClick={() => setSelected(a.id)} style={{ cursor: 'pointer', background: selected === a.id ? '#EFF6FF' : '#fff' }}>
                <td style={td}><input type="checkbox" checked={selected === a.id} readOnly /></td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ width: 22, height: 22, borderRadius: 5, background: a.iconBg, color: a.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={13} weight="fill" /></span>
                    <div><div style={{ fontWeight: 600 }}>{a.name}</div><div style={{ fontSize: 11, color: C.muted }}>{a.sub}</div></div>
                  </div>
                </td>
                <td style={td}><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><BankLogo a={a} />{a.bank === 'citi' ? '' : a.bank}</div></td>
                <td style={td}>**** {a.num}</td>
                <td style={td}>{a.cur}</td>
                <td style={{ ...td, textAlign: 'right', color: C.green, fontWeight: 600 }}>{a.current}</td>
                <td style={{ ...td, textAlign: 'right' }}>{a.avail}</td>
                <td style={td}><div>{a.date}</div><div style={{ fontSize: 11, color: C.muted }}>{a.time}</div></td>
                <td style={td}><StatusPill s={a.status} /></td>
                <td style={td}><DotsThreeVertical size={16} weight="bold" color={C.muted} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      <div style={{ ...card, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
          <BankLogo a={sel} size={30} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{sel.name}</span><StatusPill s={sel.status} />
            </div>
            <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3 }}>{sel.bank} &nbsp;|&nbsp; **** {sel.num} &nbsp;|&nbsp; {sel.cur} &nbsp;|&nbsp; {sel.sub}</div>
          </div>
          {[['Current Balance', sel.current], ['Available Balance', sel.avail]].map(([l, v]) => (
            <div key={l} style={{ paddingLeft: 18, borderLeft: `1px solid ${C.border}`, minWidth: 140 }}>
              <div style={{ fontSize: 12, color: C.muted }}>{l}</div><div style={{ fontSize: 19, fontWeight: 700 }}>{v}</div>
            </div>
          ))}
          <div style={{ paddingLeft: 18, borderLeft: `1px solid ${C.border}`, minWidth: 130 }}>
            <div style={{ fontSize: 12, color: C.muted }}>Last Synced</div><div style={{ fontSize: 12.5, marginTop: 4 }}>{sel.date}, {sel.time}</div>
          </div>
          <button id="reconcile-now" style={{ ...btn, color: C.blue }}><ArrowsClockwise size={15} />Reconcile now</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 230px', gap: 14, marginTop: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['Recent Transactions', ListBullets], ['Account Details', IdentificationCard], ['Reconciliation', CheckCircle], ['Statements', Files], ['Documents', FolderSimple]].map(([l, I]) => {
              const Icon = I as typeof ListBullets; const active = detailTab === l;
              return (
                <button key={l as string} onClick={() => setDetailTab(l as string)} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', border: 'none', borderRadius: 6, background: active ? '#EFF6FF' : 'transparent', color: active ? C.blue : C.text, fontSize: 12.5, cursor: 'pointer', textAlign: 'left' }}>
                  <Icon size={15} />{l as string}
                </button>
              );
            })}
          </div>

          <div style={{ ...card, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{detailTab}</span>
              <a href="#" style={{ fontSize: 12, color: C.blue, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>View all transactions <ArrowRight size={12} /></a>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: C.bg }}>
                <tr><th style={th}>Date</th><th style={th}>Description</th><th style={th}>Reference</th><th style={th}>Type</th><th style={{ ...th, textAlign: 'right' }}>Amount</th><th style={{ ...th, textAlign: 'right' }}>Balance</th></tr>
              </thead>
              <tbody>
                {txns.map(t => (
                  <tr key={t.ref}>
                    <td style={td}>{t.date}</td><td style={td}>{t.desc}</td><td style={{ ...td, color: C.blue }}>{t.ref}</td>
                    <td style={td}><span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: t.type === 'Credit' ? '#DCFCE7' : '#FEE2E2', color: t.type === 'Credit' ? '#15803D' : '#B91C1C' }}>{t.type}</span></td>
                    <td style={{ ...td, textAlign: 'right', fontWeight: 600, color: t.type === 'Credit' ? C.green : C.red }}>{t.amt}</td>
                    <td style={{ ...td, textAlign: 'right' }}>{t.bal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ ...card, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 600, fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}><IdentificationCard size={15} />Account Information</span>
              <button style={{ ...btn, height: 26, padding: '0 10px', fontSize: 12 }}>Edit</button>
            </div>
            {[['Account Name', sel.name], ['Bank Name', sel.bank], ['Account Number', `**** ${sel.num}`], ['Currency', sel.cur], ['Account Type', sel.type], ['Sort Code', sel.sort], ['IBAN', sel.iban], ['BIC / SWIFT', sel.bic]].map(([l, v]) => (
              <div key={l} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 6, padding: '5px 0', borderBottom: '1px solid #F1F5F9', fontSize: 11.5 }}>
                <span style={{ color: C.muted }}>{l}</span><span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
