'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  CalendarBlank,
  CheckCircle,
  DownloadSimple,
  DotsThreeVertical,
  MagnifyingGlass,
  PaperPlaneTilt,
  Eye,
  ArrowSquareOut,
  X,
  FilePdf,
  EnvelopeSimple,
  Check,
  WarningCircle,
  Clock,
  ArrowsClockwise
} from '@phosphor-icons/react';

interface DeliveryRecord {
  id: string;
  docName: string;
  docType: string;
  customer: string;
  channel: 'Email' | 'Portal';
  sentBy: string;
  sentAt: string;
  deliveryStatus: 'Delivered' | 'Failed' | 'Bounced' | 'Scheduled';
  viewedStatus: 'Opened' | 'Not Opened' | '—';
  amount: string;
}

const DELIVERY_DATA: DeliveryRecord[] = [
  {
    id: '1',
    docName: 'Invoice INV-2025-1042',
    docType: 'Invoice',
    customer: 'ABC Ltd',
    channel: 'Email',
    sentBy: 'John Doe',
    sentAt: '25 Apr 2025, 10:14',
    deliveryStatus: 'Delivered',
    viewedStatus: 'Opened',
    amount: '£12,480.00'
  },
  {
    id: '2',
    docName: 'Invoice INV-2025-1041',
    docType: 'Invoice',
    customer: 'Global Tech Solutions',
    channel: 'Email',
    sentBy: 'Sarah Wilson',
    sentAt: '24 Apr 2025, 16:32',
    deliveryStatus: 'Delivered',
    viewedStatus: 'Not Opened',
    amount: '£8,250.00'
  },
  {
    id: '3',
    docName: 'Statement ST-2025-04',
    docType: 'Statement',
    customer: 'Riverside Holdings',
    channel: 'Portal',
    sentBy: 'Michael Brown',
    sentAt: '23 Apr 2025, 14:18',
    deliveryStatus: 'Delivered',
    viewedStatus: 'Opened',
    amount: '£24,100.00'
  },
  {
    id: '4',
    docName: 'Payment Receipt PR-5567',
    docType: 'Receipt',
    customer: 'Maple Group',
    channel: 'Email',
    sentBy: 'Emily Carter',
    sentAt: '22 Apr 2025, 11:05',
    deliveryStatus: 'Failed',
    viewedStatus: '—',
    amount: '£3,400.00'
  },
  {
    id: '5',
    docName: 'Invoice INV-2025-1039',
    docType: 'Invoice',
    customer: 'Summit Construction',
    channel: 'Email',
    sentBy: 'James Miller',
    sentAt: '21 Apr 2025, 09:27',
    deliveryStatus: 'Delivered',
    viewedStatus: 'Opened',
    amount: '£19,850.00'
  },
  {
    id: '6',
    docName: 'Contract CT-2025-015',
    docType: 'Contract',
    customer: 'BrightStar Ltd',
    channel: 'Portal',
    sentBy: 'Sophie Lee',
    sentAt: '20 Apr 2025, 15:44',
    deliveryStatus: 'Bounced',
    viewedStatus: '—',
    amount: '£45,000.00'
  },
  {
    id: '7',
    docName: 'Welcome Pack WK-2025-22',
    docType: 'Information Pack',
    customer: 'Orion Retail',
    channel: 'Email',
    sentBy: 'John Doe',
    sentAt: '18 Apr 2025, 10:12',
    deliveryStatus: 'Scheduled',
    viewedStatus: '—',
    amount: '£0.00'
  }
];

export default function DeliveryHistoryPage() {
  const [selectedRecordId, setSelectedRecordId] = useState<string>('1');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>(['1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [docTypeFilter, setDocTypeFilter] = useState('All types');
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState('All statuses');
  const [channelFilter, setChannelFilter] = useState('All channels');
  const [customerFilter, setCustomerFilter] = useState('All customers');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSelectRow = (id: string) => {
    setSelectedCheckboxes(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
    setSelectedRecordId(id);
  };

  const getDeliveryBadge = (status: DeliveryRecord['deliveryStatus']) => {
    switch (status) {
      case 'Delivered':
        return { bg: '#DCFCE7', color: '#15803D', icon: '●' };
      case 'Failed':
        return { bg: '#FEE2E2', color: '#DC2626', icon: '!' };
      case 'Bounced':
        return { bg: '#FEF3C7', color: '#D97706', icon: '●' };
      case 'Scheduled':
        return { bg: '#F3E8FF', color: '#9333EA', icon: '●' };
      default:
        return { bg: '#F1F5F9', color: '#475569', icon: '●' };
    }
  };

  const getViewedBadge = (viewed: DeliveryRecord['viewedStatus']) => {
    if (viewed === 'Opened') {
      return <span style={{ color: '#15803D', fontWeight: 600 }}>● Opened</span>;
    }
    if (viewed === 'Not Opened') {
      return <span style={{ color: '#D97706', fontWeight: 600 }}>● Not Opened</span>;
    }
    return <span style={{ color: '#94A3B8' }}>—</span>;
  };

  const selectedRecord = DELIVERY_DATA.find(r => r.id === selectedRecordId) || DELIVERY_DATA[0];

  return (
    <div style={{ padding: '0 0 48px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 500,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999
        }}>
          <CheckCircle size={18} color="#10B981" weight="fill" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. BREADCRUMB & HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <CaretRight size={12} />
            <Link href="/designs/document-branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding & Company Identity</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Delivery History</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Delivery History
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Track and audit the delivery of your invoices and other customer documents.
          </p>
        </div>

        {/* Date Filter Right */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '8px',
          padding: '8px 14px',
          fontSize: '12.5px',
          fontWeight: 500,
          color: '#334155',
          cursor: 'pointer'
        }}>
          <CalendarBlank size={16} color="#64748B" />
          <span>01 Apr 2025 – 30 Apr 2025</span>
          <CaretDown size={14} color="#64748B" />
        </div>
      </div>

      {/* ── 2. 5 KPI CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        
        {/* Card 1: Documents Sent */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <PaperPlaneTilt size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Documents Sent</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>128</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>
            <span>↑ 12%</span>
            <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. previous month</span>
          </div>
        </div>

        {/* Card 2: Delivered */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <Check size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Delivered</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>118</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>
            <span>↑ 15%</span>
            <span style={{ color: '#64748B', fontWeight: 500 }}>92% delivery rate</span>
          </div>
        </div>

        {/* Card 3: Opened */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <Eye size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Opened</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>87</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>
            <span>↑ 18%</span>
            <span style={{ color: '#64748B', fontWeight: 500 }}>74% open rate</span>
          </div>
        </div>

        {/* Card 4: Failed / Bounced */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <WarningCircle size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Failed / Bounced</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#EF4444' }}>6</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#EF4444', fontWeight: 700, marginTop: '4px' }}>
            <span>↑ 50%</span>
            <span style={{ color: '#64748B', fontWeight: 500 }}>5% failure rate</span>
          </div>
        </div>

        {/* Card 5: Average Open Time */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <Clock size={18} weight="bold" />
            </div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Average Open Time</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>2h 36m</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>
            <span>↓ 28%</span>
            <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs. previous month</span>
          </div>
        </div>

      </div>

      {/* ── 3. FILTER BAR ── */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #CBD5E1',
          borderRadius: '8px',
          padding: '8px 12px',
          background: '#FFFFFF',
          flex: '1 1 240px'
        }}>
          <MagnifyingGlass size={16} color="#94A3B8" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, customers, or reference..."
            style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
          />
        </div>

        {/* Document Type Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>Document Type</span>
          <select 
            value={docTypeFilter} 
            onChange={(e) => setDocTypeFilter(e.target.value)}
            style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', color: '#0F172A', background: '#FFFFFF' }}
          >
            <option>All types</option>
            <option>Invoice</option>
            <option>Statement</option>
            <option>Receipt</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Delivery Status Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>Delivery Status</span>
          <select 
            value={deliveryStatusFilter} 
            onChange={(e) => setDeliveryStatusFilter(e.target.value)}
            style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', color: '#0F172A', background: '#FFFFFF' }}
          >
            <option>All statuses</option>
            <option>Delivered</option>
            <option>Failed</option>
            <option>Bounced</option>
            <option>Scheduled</option>
          </select>
        </div>

        {/* Channel Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>Channel</span>
          <select 
            value={channelFilter} 
            onChange={(e) => setChannelFilter(e.target.value)}
            style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', color: '#0F172A', background: '#FFFFFF' }}
          >
            <option>All channels</option>
            <option>Email</option>
            <option>Portal</option>
          </select>
        </div>

        {/* Customer Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>Customer</span>
          <select 
            value={customerFilter} 
            onChange={(e) => setCustomerFilter(e.target.value)}
            style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', color: '#0F172A', background: '#FFFFFF' }}
          >
            <option>All customers</option>
            <option>ABC Ltd</option>
            <option>Global Tech Solutions</option>
          </select>
        </div>

        {/* Export Button */}
        <button 
          onClick={() => showToast('Exporting audit history...')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            fontSize: '12.5px',
            fontWeight: 600,
            color: '#0284C7',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          <DownloadSimple size={15} />
          <span>Export</span>
          <CaretDown size={12} />
        </button>
      </div>

      {/* ── 4. TABLE OF DELIVERIES ── */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B', background: '#F8FAFC' }}>
              <th style={{ padding: '10px 12px', width: '30px' }}>
                <input type="checkbox" style={{ accentColor: '#006666' }} />
              </th>
              <th style={{ padding: '10px 8px', width: '30px' }}></th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Document</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Channel</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Sent by</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Sent at T</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Delivery status</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Viewed / Opened</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {DELIVERY_DATA.map((row) => {
              const isSelected = selectedRecordId === row.id;
              const badge = getDeliveryBadge(row.deliveryStatus);
              return (
                <tr 
                  key={row.id}
                  onClick={() => setSelectedRecordId(row.id)}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    background: isSelected ? '#EFF6FF' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <td style={{ padding: '12px 12px' }} onClick={(e) => { e.stopPropagation(); toggleSelectRow(row.id); }}>
                    <input 
                      type="checkbox" 
                      checked={selectedCheckboxes.includes(row.id)} 
                      onChange={() => {}}
                      style={{ accentColor: '#006666' }} 
                    />
                  </td>
                  <td style={{ padding: '12px 8px', color: '#94A3B8' }}>
                    <CaretRight size={12} weight="bold" />
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FilePdf size={18} color="#DC2626" weight="fill" />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A' }}>{row.docName}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{row.docType}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#0284C7' }}>🏛</span>
                      <span style={{ fontWeight: 500, color: '#0F172A' }}>{row.customer}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                      {row.channel === 'Email' ? <EnvelopeSimple size={15} color="#0284C7" /> : <span>🌐</span>}
                      <span>{row.channel}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px', color: '#475569' }}>{row.sentBy}</td>
                  <td style={{ padding: '12px 12px', color: '#64748B' }}>{row.sentAt}</td>
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{
                      background: badge.bg,
                      color: badge.color,
                      padding: '3px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>{badge.icon}</span>
                      <span>{row.deliveryStatus}</span>
                    </span>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    {getViewedBadge(row.viewedStatus)}
                  </td>
                  <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                    <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '14px' }}>
                      ⋯
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── 5. EXPANDED AUDIT DRAWER FOR SELECTED ROW ── */}
      {selectedRecord && (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          position: 'relative'
        }}>
          {/* Top Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
                <FilePdf size={22} weight="fill" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>{selectedRecord.docName}</span>
                  <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600 }}>
                    ● {selectedRecord.deliveryStatus}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  Invoice <span style={{ margin: '0 4px' }}>•</span> {selectedRecord.amount} <span style={{ margin: '0 4px' }}>•</span> 3 attachments <span style={{ margin: '0 4px' }}>•</span> {selectedRecord.sentAt}
                </div>
              </div>
            </div>

            {/* Actions right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => showToast(`Resending ${selectedRecord.docName}...`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  background: '#0284C7',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <PaperPlaneTilt size={14} weight="bold" />
                <span>Resend</span>
              </button>

              <button 
                onClick={() => showToast('Opening PDF viewer')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <Eye size={14} />
                <span>View PDF</span>
              </button>

              <button 
                onClick={() => showToast('Opening Invoice detail page')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <ArrowSquareOut size={14} />
                <span>View Invoice</span>
              </button>

              <button 
                onClick={() => showToast('Downloading complete audit trail log')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <DownloadSimple size={14} />
                <span>Download Audit Trail</span>
              </button>

              <button 
                onClick={() => setSelectedRecordId('')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* 3 Detail Columns (Document Details, Recipient Details, Delivery Timeline) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.5fr', gap: '24px', fontSize: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '18px' }}>
            
            {/* Column 1: Document Details */}
            <div>
              <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Document Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Document Type</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>Invoice</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Invoice Number</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>INV-2025-1042</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Amount</span>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>£12,480.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Billing Period</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>April 2025</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Attachments</span>
                  <span style={{ fontWeight: 600, color: '#0284C7' }}>Invoice.pdf, Terms.pdf, REMIT.pdf (3)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Generated By</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>John Doe (25 Apr 2025, 10:12)</span>
                </div>
              </div>
            </div>

            {/* Column 2: Recipient Details */}
            <div>
              <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Recipient Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Customer</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>ABC Ltd</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Primary Contact</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>Sarah Thompson</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Email Address</span>
                  <span style={{ fontWeight: 600, color: '#0284C7' }}>sarah.thompson@abc-ltd.co.uk</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Delivery Channel</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>✉ Email</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Reference</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>CUST-001</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Customer Group</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>Enterprise</span>
                </div>
              </div>
            </div>

            {/* Column 3: Delivery Timeline */}
            <div>
              <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Delivery Timeline</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={16} weight="fill" color="#16A34A" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>Document drafted</span>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>by John Doe</div>
                    </div>
                    <span style={{ color: '#64748B', fontSize: '11px' }}>25 Apr 2025, 10:12</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={16} weight="fill" color="#16A34A" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>Sent to customer</span>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>via Email</div>
                    </div>
                    <span style={{ color: '#64748B', fontSize: '11px' }}>25 Apr 2025, 10:14</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={16} weight="fill" color="#16A34A" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>Delivered to recipient</span>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>to sarah.thompson@abc-ltd.co.uk</div>
                    </div>
                    <span style={{ color: '#64748B', fontSize: '11px' }}>25 Apr 2025, 10:14</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={16} weight="fill" color="#16A34A" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>Opened by recipient</span>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>IP: 203.0.113.42</div>
                    </div>
                    <span style={{ color: '#64748B', fontSize: '11px' }}>25 Apr 2025, 12:36</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #CBD5E1', marginTop: '2px' }} />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ color: '#64748B' }}>Reminder sent</span>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>(not required)</div>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: '11px' }}>28 Apr 2025, 09:00</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
