'use client';

import React, { useState } from 'react';
import {
  UploadSimple, MagicWand, FileText, CheckCircle, Bank, CaretDown, CalendarBlank, Coins,
  BookOpen, Database, MagnifyingGlass, Funnel, ArrowUp, ArrowDown, Sparkle, LinkSimple,
  WarningCircle, CaretRight, ChartBar, Prohibit, PlusSquare, Plus, CaretLeft, Receipt,
} from '@phosphor-icons/react';

const C = { text: '#0B1220', muted: '#64748B', border: '#E2E8F0', blue: '#1D4ED8', green: '#16A34A', red: '#DC2626', bg: '#F8FAFC', teal: '#0F766E' };

type St = 'Matched' | 'Suggested' | 'Unmatched' | 'Exception';
const txns: { id: number; date: string; payee: string; ref: string; amt: string; neg: boolean; st: St }[] = [
  { id: 1, date: '30 Apr 2025', payee: 'ACME Ltd', ref: 'BGC12345', amt: '£4,800.00', neg: false, st: 'Matched' },
  { id: 2, date: '29 Apr 2025', payee: 'Office Solutions', ref: 'BGC12346', amt: '-£1,200.00', neg: true, st: 'Matched' },
  { id: 3, date: '29 Apr 2025', payee: 'HMRC VAT', ref: 'BGC12347', amt: '-£5,600.00', neg: true, st: 'Matched' },
  { id: 4, date: '28 Apr 2025', payee: 'Global Solutions', ref: 'BGC12348', amt: '£8,400.00', neg: false, st: 'Matched' },
  { id: 5, date: '27 Apr 2025', payee: 'Tech Supplies Ltd', ref: 'BGC12349', amt: '-£2,450.00', neg: true, st: 'Matched' },
  { id: 6, date: '25 Apr 2025', payee: 'Riverside Group', ref: 'BGC12350', amt: '£4,800.00', neg: false, st: 'Suggested' },
  { id: 7, date: '24 Apr 2025', payee: 'Energy Co', ref: 'BGC12351', amt: '-£980.00', neg: true, st: 'Unmatched' },
  { id: 8, date: '23 Apr 2025', payee: 'City Council', ref: 'BGC12352', amt: '-£12,000.00', neg: true, st: 'Matched' },
  { id: 9, date: '22 Apr 2025', payee: 'Marketing Co', ref: 'BGC12353', amt: '-£1,750.00', neg: true, st: 'Suggested' },
  { id: 10, date: '20 Apr 2025', payee: 'Customer Payment', ref: 'BGC12354', amt: '£6,230.00', neg: false, st: 'Unmatched' },
  { id: 11, date: '18 Apr 2025', payee: 'Facilities Group', ref: 'BGC12355', amt: '-£3,600.00', neg: true, st: 'Matched' },
  { id: 12, date: '17 Apr 2025', payee: 'Cloud Services Ltd', ref: 'BGC12356', amt: '-£980.00', neg: true, st: 'Exception' },
];

const matches = [
  { pct: '98%', best: true, amt: '£4,800.00', date: '15 Apr 2025', ref: 'INV-2025-0423', desc: 'Consultancy services - April 2025', type: 'Sales Invoice', cust: 'Riverside Group' },
  { pct: '72%', best: false, amt: '£4,800.00', date: '12 Apr 2025', ref: 'RCPT-2025-0112', desc: 'Payment for Invoice INV-2025-0410', type: 'Sales Receipt', cust: 'Riverside Group' },
  { pct: '61%', best: false, amt: '£4,800.00', date: '10 Apr 2025', ref: 'MISC-2025-0098', desc: 'Ad-hoc payment', type: 'Other Receipt', cust: 'Riverside Group' },
];

const card: React.CSSProperties = { background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10 };
const btn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 34, padding: '0 14px', borderRadius: 6, border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' };

function Pill({ s }: { s: St }) {
  const m = { Matched: ['#DCFCE7', '#15803D'], Suggested: ['#DBEAFE', '#1D4ED8'], Unmatched: ['#FEE2E2', '#B91C1C'], Exception: ['#FFEDD5', '#C2410C'] }[s];
  return <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: m[0], color: m[1] }}>{s}</span>;
}

export default function ReconciliationPage() {
  const [tab, setTab] = useState('All transactions');
  const [sel, setSel] = useState(6);
  const [pick, setPick] = useState(0);
  const cur = txns.find(t => t.id === sel)!;
  const rows = txns.filter(t => tab === 'All transactions' || (tab === 'Unmatched' && t.st === 'Unmatched') || (tab === 'Matched' && t.st === 'Matched') || (tab === 'Exceptions' && t.st === 'Exception'));

  const th: React.CSSProperties = { textAlign: 'left', padding: '8px 10px', fontSize: 11, fontWeight: 600, color: C.muted, borderBottom: `1px solid ${C.border}`, background: C.bg, whiteSpace: 'nowrap' };
  const td: React.CSSProperties = { padding: '6px 10px', fontSize: 12, borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' };
  const kv = (l: string, v: React.ReactNode) => (
    <div style={{ display: 'grid', gridTemplateColumns: '84px 1fr', fontSize: 12, padding: '5px 0' }}><span style={{ color: C.muted }}>{l}</span><span style={{ fontWeight: 500 }}>{v}</span></div>
  );

  return (
    <div style={{ padding: '4px 0 24px', fontFamily: 'Inter, sans-serif', color: C.text }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Bank Reconciliation Workspace</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13.5, color: C.muted }}>Match your bank statement transactions with ledger entries, resolve exceptions and complete the reconciliation.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button id="import-statement" style={btn}><UploadSimple size={15} />Import statement</button>
          <button id="auto-match" style={btn}><MagicWand size={15} />Auto-match</button>
          <button id="post-adjustments" style={btn}><FileText size={15} />Post adjustments</button>
          <button id="finish-reconciliation" style={{ ...btn, background: C.teal, color: '#fff', border: 'none', padding: '0 18px' }}><CheckCircle size={15} weight="fill" />Finish reconciliation</button>
        </div>
      </div>

      {/* Account strip */}
      <div style={{ ...card, display: 'flex', alignItems: 'center', padding: '12px 16px', marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingRight: 18, borderRight: `1px solid ${C.border}` }}>
          <Bank size={30} color={C.blue} weight="fill" />
          <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>Barclays Business Current Account</div><div style={{ fontSize: 11.5, color: C.muted }}>20-12-34 &nbsp; 12345678</div></div>
          <CaretDown size={14} />
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '0 18px', borderRight: `1px solid ${C.border}` }}>
          <CalendarBlank size={26} color={C.blue} />
          <div><div style={{ fontSize: 11.5, color: C.muted }}>Statement period</div><div style={{ fontWeight: 600, fontSize: 13 }}>01 Apr 2025 – 30 Apr 2025 <CaretDown size={11} /></div></div>
        </div>
        {[['Statement balance', '£92,460.00', Coins, C.blue, C.text], ['Ledger balance', '£91,870.00', BookOpen, C.green, C.text], ['Difference', '£590.00', Database, C.red, C.red]].map(([l, v, I, ic, vc]) => {
          const Icon = I as typeof Coins;
          return (
            <div key={l as string} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '0 18px', borderRight: `1px solid ${C.border}` }}>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: '#F1F5F9', color: ic as string, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} weight="fill" /></span>
              <div><div style={{ fontSize: 11.5, color: C.muted }}>{l as string}</div><div style={{ fontWeight: 700, fontSize: 17, color: vc as string }}>{v as string}</div></div>
            </div>
          );
        })}
        <div style={{ flex: 1, paddingLeft: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Reconciliation progress</div>
            <div style={{ fontSize: 12.5, margin: '4px 0' }}><b>86%</b> matched</div>
            <div style={{ height: 7, background: '#E2E8F0', borderRadius: 999 }}><div style={{ width: '86%', height: '100%', background: C.teal, borderRadius: 999 }} /></div>
          </div>
          <div style={{ fontSize: 12, textAlign: 'right', color: C.muted }}><b style={{ color: C.text }}>124 of 144</b><br />transactions</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.border}`, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 22 }}>
          {[['All transactions', 144, '#DBEAFE', C.blue], ['Unmatched', 20, '#EF4444', '#fff'], ['Matched', 124, '#DCFCE7', '#15803D'], ['Exceptions', 6, '#F97316', '#fff']].map(([l, n, bg, fg]) => (
            <button key={l as string} onClick={() => setTab(l as string)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 2px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 12.5, color: tab === l ? C.blue : C.text, borderBottom: tab === l ? `2px solid ${C.blue}` : '2px solid transparent', fontWeight: tab === l ? 600 : 400 }}>
              {l as string}<span style={{ padding: '1px 8px', borderRadius: 999, fontSize: 11, background: bg as string, color: fg as string }}>{n as number}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, paddingBottom: 6 }}>
          <div style={{ position: 'relative' }}>
            <MagnifyingGlass size={14} style={{ position: 'absolute', left: 10, top: 10, color: C.muted }} />
            <input placeholder="Search by date, amount, reference or payee..." style={{ height: 32, width: 240, padding: '0 10px 0 30px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 12 }} />
          </div>
          <button style={{ ...btn, height: 32 }}><Funnel size={14} />Filters<CaretDown size={12} /></button>
        </div>
      </div>

      {/* 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr 0.95fr', gap: 12 }}>
        {/* Left table */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px' }}>
            <span style={{ fontWeight: 600, fontSize: 13.5, display: 'flex', gap: 8, alignItems: 'center' }}><Bank size={17} color={C.teal} weight="fill" />Bank Statement Transactions (144)</span>
            <button style={{ ...btn, height: 30 }}>Actions<CaretDown size={12} /></button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th style={th}><input type="checkbox" /></th><th style={th}>Date <ArrowUp size={10} /></th><th style={th}>Description / Payee</th><th style={th}>Reference</th><th style={{ ...th, textAlign: 'right' }}>Amount <ArrowDown size={10} /></th><th style={th}>Status</th></tr></thead>
            <tbody>
              {rows.map(t => (
                <tr key={t.id} onClick={() => setSel(t.id)} style={{ cursor: 'pointer', background: sel === t.id ? '#EFF6FF' : '#fff' }}>
                  <td style={td}><input type="checkbox" checked={sel === t.id} readOnly /></td>
                  <td style={td}>{t.date}</td><td style={td}>{t.payee}</td><td style={td}>{t.ref}</td>
                  <td style={{ ...td, textAlign: 'right', fontWeight: 500 }}>{t.amt}</td><td style={td}><Pill s={t.st} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', fontSize: 11.5, color: C.muted }}>
            <span>1 transaction selected</span>
            <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>Rows per page <b style={{ color: C.text }}>25 <CaretDown size={10} /></b> 1–10 of 144 <CaretLeft size={13} /><CaretRight size={13} color={C.text} /></span>
          </div>
        </div>

        {/* Middle matches */}
        <div style={{ ...card, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: 13.5, display: 'flex', gap: 8, alignItems: 'center' }}><BookOpen size={17} color={C.blue} />Suggested Ledger Matches (3)</span>
            <a href="#" style={{ fontSize: 12, color: C.blue, textDecoration: 'none' }}>View all <CaretDown size={10} /></a>
          </div>
          <div style={{ display: 'flex', gap: 10, padding: 10, borderRadius: 8, background: '#F5F3FF', border: '1px solid #EDE9FE' }}>
            <Sparkle size={20} color="#7C3AED" weight="fill" />
            <div><div style={{ fontSize: 12.5, fontWeight: 600 }}>3 potential matches found for {cur.amt}</div><div style={{ fontSize: 11.5, color: C.muted }}>Use AI suggestions or match manually.</div></div>
          </div>
          {matches.map((m, i) => (
            <div key={m.ref} onClick={() => setPick(i)} style={{ border: `1px solid ${pick === i ? C.blue : C.border}`, boxShadow: pick === i ? '0 0 0 1px #1D4ED8' : 'none', borderRadius: 8, padding: 12, cursor: 'pointer', display: 'flex', gap: 12 }}>
              <input type="radio" checked={pick === i} readOnly style={{ marginTop: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  {m.best ? <span style={{ padding: '4px 10px', borderRadius: 5, background: C.blue, color: '#fff', fontSize: 11, fontWeight: 600 }}>Best match</span>
                    : <span style={{ padding: '3px 8px', borderRadius: 5, background: '#FEF3C7', color: '#B45309', fontSize: 11 }}><Receipt size={12} weight="fill" /> %</span>}
                  <span style={{ marginLeft: 'auto', padding: '3px 12px', borderRadius: 6, background: '#DCFCE7', color: '#15803D', fontWeight: 700, fontSize: 13 }}>{m.pct}</span>
                  <span style={{ fontWeight: 700, fontSize: 13.5, marginLeft: 18 }}>{m.amt}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 58px 1fr', rowGap: 4, fontSize: 11.5 }}>
                  <span style={{ color: C.muted }}>Date</span><span>{m.date}</span><span style={{ color: C.muted }}>Type</span><span>{m.type}</span>
                  <span style={{ color: C.muted }}>Reference</span><span style={{ color: C.blue }}>{m.ref}</span><span style={{ color: C.muted }}>Customer</span><span>{m.cust}</span>
                  <span style={{ color: C.muted }}>Description</span><span style={{ gridColumn: 'span 3' }}>{m.desc}</span>
                </div>
              </div>
            </div>
          ))}
          <button style={{ ...btn, color: C.blue, width: '100%' }}><CaretDown size={12} />View more matches (3)</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: C.muted }}>
            Or match manually<button style={btn}><MagnifyingGlass size={14} />Search ledger entries</button>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ ...card, padding: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5, display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}><Receipt size={17} color={C.blue} />Transaction Details</div>
            {kv('Date', cur.date)}{kv('Description', cur.payee)}{kv('Reference', cur.ref)}
            {kv('Amount', <span style={{ color: cur.neg ? C.red : C.green, fontWeight: 600 }}>{cur.amt}</span>)}
            {kv('Status', <Pill s={cur.st} />)}
          </div>
          <div style={{ ...card, padding: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5, display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}><LinkSimple size={17} color={C.blue} />Matching Actions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button id="confirm-match" style={{ ...btn, background: C.blue, color: '#fff', border: 'none' }}><CheckCircle size={14} weight="fill" />Confirm match</button>
              <button style={{ ...btn, color: C.blue }}><MagnifyingGlass size={14} />Match manually</button>
              <button style={btn}><PlusSquare size={14} />Create adjustment</button>
              <button style={btn}><Prohibit size={14} />Mark as unreconciled</button>
            </div>
          </div>
          <div style={{ ...card, padding: 12, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <WarningCircle size={18} color={C.red} weight="fill" />
            <span style={{ fontWeight: 600, fontSize: 13 }}>Unreconciled &amp; Adjustments</span>
            <span style={{ padding: '1px 8px', borderRadius: 999, background: '#FEE2E2', color: C.red, fontSize: 11, fontWeight: 600 }}>20</span>
            <CaretRight size={14} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ ...card, padding: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5, display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}><ChartBar size={17} color={C.green} weight="fill" />Reconciliation Summary</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0' }}><span>Total transactions</span><b>144</b></div>
            {[['Matched', 124, '86%', C.green], ['Unmatched', 20, '14%', C.red], ['Exceptions', 6, '4%', '#F97316']].map(([l, n, p, c]) => (
              <div key={l as string} style={{ display: 'grid', gridTemplateColumns: '1fr 40px 40px', fontSize: 12, padding: '5px 0', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ width: 8, height: 8, borderRadius: 99, background: c as string }} />{l as string}</span>
                <b style={{ textAlign: 'right' }}>{n as number}</b><span style={{ textAlign: 'right' }}>{p as string}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
