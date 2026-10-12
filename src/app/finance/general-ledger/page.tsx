'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TreeStructure,
  Plus,
  MagnifyingGlass,
  DownloadSimple,
  Calendar,
  CaretDown,
  DotsThreeVertical,
  BookOpen,
} from '@phosphor-icons/react';

export default function GeneralLedgerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const accounts = [
    { code: '1000', name: 'Operating Bank Account (Barclays)', type: 'Asset', debit: '£245,680.00', credit: '£0.00', balance: '£245,680.00' },
    { code: '1100', name: 'Accounts Receivable (Trade Debtors)', type: 'Asset', debit: '£184,320.00', credit: '£0.00', balance: '£184,320.00' },
    { code: '2000', name: 'Accounts Payable (Trade Creditors)', type: 'Liability', debit: '£0.00', credit: '£92,450.00', balance: '£92,450.00' },
    { code: '2200', name: 'VAT Output Tax (20%)', type: 'Liability', debit: '£0.00', credit: '£36,410.00', balance: '£36,410.00' },
    { code: '3000', name: 'Retained Earnings', type: 'Equity', debit: '£0.00', credit: '£320,000.00', balance: '£320,000.00' },
    { code: '4000', name: 'Sales Revenue - Product & Software', type: 'Revenue', debit: '£0.00', credit: '£420,500.00', balance: '£420,500.00' },
    { code: '4100', name: 'Consulting & Implementation Services', type: 'Revenue', debit: '£0.00', credit: '£121,820.00', balance: '£121,820.00' },
    { code: '5000', name: 'Cost of Goods Sold - Hosting & Licenses', type: 'Expense', debit: '£210,450.00', credit: '£0.00', balance: '£210,450.00' },
    { code: '6000', name: 'Salaries & Staff Costs', type: 'Expense', debit: '£86,500.00', credit: '£0.00', balance: '£86,500.00' },
    { code: '6100', name: 'Office Rent & Utilities', type: 'Expense', debit: '£21,500.00', credit: '£0.00', balance: '£21,500.00' },
  ];

  const filtered = accounts.filter((acc) => {
    const matchesCategory = categoryFilter === 'All' || acc.type === categoryFilter;
    const matchesSearch =
      acc.code.includes(searchTerm) ||
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#F8FAFC' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
              General Ledger
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Master chart of accounts, debit/credit trial balance journals, and audit logs.
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
              <span>Export Trial Balance</span>
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
              <span>New Journal Entry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px 28px' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
          {/* Controls */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#FFFFFF', width: '100%' }}>
                <MagnifyingGlass size={15} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Search code, account name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', fontSize: '12.5px', width: '100%', color: '#1E293B' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Asset', 'Liability', 'Equity', 'Revenue', 'Expense'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: categoryFilter === cat ? '1px solid #0F766E' : '1px solid #CBD5E1',
                    backgroundColor: categoryFilter === cat ? '#F0FDFA' : '#FFFFFF',
                    color: categoryFilter === cat ? '#0F766E' : '#64748B',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600, textAlign: 'left' }}>
                <th style={{ padding: '12px 20px' }}>Account Code</th>
                <th style={{ padding: '12px 20px' }}>Account Name</th>
                <th style={{ padding: '12px 20px' }}>Classification</th>
                <th style={{ padding: '12px 20px', textAlign: 'right' }}>Debit (YTD)</th>
                <th style={{ padding: '12px 20px', textAlign: 'right' }}>Credit (YTD)</th>
                <th style={{ padding: '12px 20px', textAlign: 'right' }}>Net Balance</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((acc) => (
                <tr key={acc.code} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0F766E' }}>{acc.code}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0F172A' }}>{acc.name}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '12px',
                        backgroundColor:
                          acc.type === 'Asset'
                            ? '#E0F2FE'
                            : acc.type === 'Revenue'
                            ? '#DCFCE7'
                            : acc.type === 'Expense'
                            ? '#FEE2E2'
                            : '#F1F5F9',
                        color:
                          acc.type === 'Asset'
                            ? '#0284C7'
                            : acc.type === 'Revenue'
                            ? '#16A34A'
                            : acc.type === 'Expense'
                            ? '#DC2626'
                            : '#475569',
                      }}
                    >
                      {acc.type}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', color: '#334155' }}>{acc.debit}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', color: '#334155' }}>{acc.credit}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>{acc.balance}</td>
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
