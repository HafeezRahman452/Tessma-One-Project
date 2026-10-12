'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Receipt,
  Plus,
  MagnifyingGlass,
  Funnel,
  DownloadSimple,
  CaretDown,
  CheckCircle,
  Clock,
  DotsThreeVertical,
  ArrowSquareOut,
} from '@phosphor-icons/react';

export default function CreditNotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const creditNotes = [
    {
      id: 'CN-2025-0041',
      customer: 'Acme Corporation Ltd',
      invoiceRef: 'INV-2025-0104',
      date: '12 Apr 2025',
      amount: '£1,450.00',
      reason: 'Billing adjustment / Service discount',
      status: 'Applied',
    },
    {
      id: 'CN-2025-0040',
      customer: 'Apex Global Logistics',
      invoiceRef: 'INV-2025-0098',
      date: '08 Apr 2025',
      amount: '£820.00',
      reason: 'Goods returned / Damaged in transit',
      status: 'Applied',
    },
    {
      id: 'CN-2025-0039',
      customer: 'Sterling Capital Partners',
      invoiceRef: 'INV-2025-0082',
      date: '02 Apr 2025',
      amount: '£3,100.00',
      reason: 'Contract scope adjustment',
      status: 'Open',
    },
    {
      id: 'CN-2025-0038',
      customer: 'Nexus Digital Media',
      invoiceRef: 'INV-2025-0077',
      date: '28 Mar 2025',
      amount: '£650.00',
      reason: 'Promotional credit',
      status: 'Draft',
    },
  ];

  const filtered = creditNotes.filter((cn) => {
    const matchesSearch =
      cn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cn.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#F8FAFC' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
              Credit Notes
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Issue, refund, and reconcile customer and supplier credit notes against open balances.
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
              <span>Create Credit Note</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>Total Credit Issued (YTD)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>£24,850.00</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>Applied to Invoices</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#16A34A' }}>£21,750.00</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>Open Credit Available</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0284C7' }}>£3,100.00</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>Draft / Pending Approval</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#D97706' }}>£650.00</div>
          </div>
        </div>

        {/* Table Container */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
          {/* Controls Bar */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#FFFFFF', width: '100%' }}>
                <MagnifyingGlass size={15} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Search credit note ID, customer, invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', fontSize: '12.5px', width: '100%', color: '#1E293B' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#334155', outline: 'none' }}
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Open">Open</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600, textAlign: 'left' }}>
                <th style={{ padding: '12px 20px' }}>Credit Note ID</th>
                <th style={{ padding: '12px 20px' }}>Customer</th>
                <th style={{ padding: '12px 20px' }}>Invoice Ref</th>
                <th style={{ padding: '12px 20px' }}>Date</th>
                <th style={{ padding: '12px 20px' }}>Reason</th>
                <th style={{ padding: '12px 20px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '12px 20px' }}>Status</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cn) => (
                <tr key={cn.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0F766E' }}>{cn.id}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 500, color: '#0F172A' }}>{cn.customer}</td>
                  <td style={{ padding: '14px 20px', color: '#0284C7' }}>{cn.invoiceRef}</td>
                  <td style={{ padding: '14px 20px', color: '#64748B' }}>{cn.date}</td>
                  <td style={{ padding: '14px 20px', color: '#475569' }}>{cn.reason}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: '#DC2626' }}>{cn.amount}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '12px',
                        backgroundColor: cn.status === 'Applied' ? '#DCFCE7' : cn.status === 'Open' ? '#E0F2FE' : '#FEF3C7',
                        color: cn.status === 'Applied' ? '#16A34A' : cn.status === 'Open' ? '#0284C7' : '#D97706',
                      }}
                    >
                      {cn.status}
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
