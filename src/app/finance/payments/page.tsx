'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Plus,
  MagnifyingGlass,
  DownloadSimple,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  DotsThreeVertical,
} from '@phosphor-icons/react';

export default function PaymentsPage() {
  const [filterType, setFilterType] = useState<'all' | 'inflow' | 'outflow'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    {
      id: 'PAY-2025-0812',
      party: 'Acme Corporation Ltd',
      type: 'Customer Receipt',
      direction: 'inflow',
      method: 'BACS Bank Transfer',
      reference: 'INV-2025-0102',
      date: '14 Apr 2025',
      amount: '£14,500.00',
      status: 'Reconciled',
    },
    {
      id: 'PAY-2025-0811',
      party: 'Apex Office Supplies',
      type: 'Supplier Payment',
      direction: 'outflow',
      method: 'Faster Payments',
      reference: 'BILL-2025-0044',
      date: '13 Apr 2025',
      amount: '£3,240.00',
      status: 'Reconciled',
    },
    {
      id: 'PAY-2025-0810',
      party: 'CloudTech Infrastructure',
      type: 'Supplier Payment',
      direction: 'outflow',
      method: 'Direct Debit',
      reference: 'BILL-2025-0041',
      date: '11 Apr 2025',
      amount: '£890.00',
      status: 'Reconciled',
    },
    {
      id: 'PAY-2025-0809',
      party: 'Vanguard Systems UK',
      type: 'Customer Receipt',
      direction: 'inflow',
      method: 'Credit Card (Stripe)',
      reference: 'INV-2025-0099',
      date: '10 Apr 2025',
      amount: '£6,200.00',
      status: 'Pending Clearing',
    },
    {
      id: 'PAY-2025-0808',
      party: 'Vertex Consulting Ltd',
      type: 'Customer Receipt',
      direction: 'inflow',
      method: 'International Wire',
      reference: 'INV-2025-0096',
      date: '08 Apr 2025',
      amount: '£18,750.00',
      status: 'Reconciled',
    },
  ];

  const filtered = transactions.filter((tx) => {
    const matchesDirection = filterType === 'all' || tx.direction === filterType;
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDirection && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#F8FAFC' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
              Payments & Receipts
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Track cash inflows from customer invoices and outflows to supplier bills with live bank reconciliation.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#0F766E',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(15, 118, 110, 0.25)',
              }}
            >
              <Plus size={15} weight="bold" />
              <span>Record Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px 28px' }}>
        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>Total Inflows (This Month)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#16A34A' }}>£39,450.00</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>Total Outflows (This Month)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#DC2626' }}>£4,130.00</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>Net Cash Movement</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F766E' }}>+£35,320.00</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>Unreconciled Transactions</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#D97706' }}>1 (Clearing)</div>
          </div>
        </div>

        {/* Table Box */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
          {/* Controls Bar */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#FFFFFF', width: '100%' }}>
                <MagnifyingGlass size={15} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Search payment ID, party, invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', fontSize: '12.5px', width: '100%', color: '#1E293B' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'all', label: 'All Payments' },
                { id: 'inflow', label: 'Inflows (Receipts)' },
                { id: 'outflow', label: 'Outflows (Bills)' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilterType(btn.id as any)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: filterType === btn.id ? '1px solid #0F766E' : '1px solid #CBD5E1',
                    backgroundColor: filterType === btn.id ? '#F0FDFA' : '#FFFFFF',
                    color: filterType === btn.id ? '#0F766E' : '#64748B',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600, textAlign: 'left' }}>
                <th style={{ padding: '12px 20px' }}>Payment ID</th>
                <th style={{ padding: '12px 20px' }}>Party / Entity</th>
                <th style={{ padding: '12px 20px' }}>Payment Type</th>
                <th style={{ padding: '12px 20px' }}>Method</th>
                <th style={{ padding: '12px 20px' }}>Reference</th>
                <th style={{ padding: '12px 20px' }}>Date</th>
                <th style={{ padding: '12px 20px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '12px 20px' }}>Status</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0F766E' }}>{tx.id}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0F172A' }}>{tx.party}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: tx.direction === 'inflow' ? '#16A34A' : '#DC2626', fontWeight: 600 }}>
                      {tx.direction === 'inflow' ? <ArrowDownLeft size={14} weight="bold" /> : <ArrowUpRight size={14} weight="bold" />}
                      <span>{tx.type}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', color: '#64748B' }}>{tx.method}</td>
                  <td style={{ padding: '14px 20px', color: '#0284C7' }}>{tx.reference}</td>
                  <td style={{ padding: '14px 20px', color: '#64748B' }}>{tx.date}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: tx.direction === 'inflow' ? '#16A34A' : '#DC2626' }}>
                    {tx.direction === 'inflow' ? '+' : '-'}{tx.amount}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '12px',
                        backgroundColor: tx.status === 'Reconciled' ? '#DCFCE7' : '#FEF3C7',
                        color: tx.status === 'Reconciled' ? '#16A34A' : '#D97706',
                      }}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                      <DotsThreeVertical size={16} weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
