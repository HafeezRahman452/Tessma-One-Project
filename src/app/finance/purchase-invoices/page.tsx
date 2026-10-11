'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Clock,
  Warning,
  Coins,
  CheckCircle,
  TrendUp,
  TrendDown,
  MagnifyingGlass,
  Plus,
  Export,
  CaretDown,
  DotsThreeVertical,
  CalendarBlank,
  Funnel,
  ArrowClockwise,
  XCircle,
  HourglassMedium,
  Check,
  X
} from '@phosphor-icons/react';

interface SupplierBillRecord {
  id: string;
  billRef: string;
  description: string;
  supplierName: string;
  supplierCode: string;
  billDate: string;
  dueDate: string;
  grossAmount: string;
  grossRaw: number;
  outstandingAmount: string;
  outstandingRaw: number;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  paymentStatus: 'Not paid' | 'Part-paid' | 'Paid';
}

export default function SupplierBillsListPage() {
  const router = useRouter();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<string>('All suppliers');
  const [selectedApproval, setSelectedApproval] = useState<string>('All statuses');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('All statuses');
  const [dateRangeStart, setDateRangeStart] = useState('01 Apr 2025');
  const [dateRangeEnd, setDateRangeEnd] = useState('30 Apr 2025');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // Dropdown states
  const [openSupplierDropdown, setOpenSupplierDropdown] = useState(false);
  const [openApprovalDropdown, setOpenApprovalDropdown] = useState(false);
  const [openPaymentDropdown, setOpenPaymentDropdown] = useState(false);

  // Table selection
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Modal
  const [showEnterBillModal, setShowEnterBillModal] = useState(false);

  // Bills matching the screenshot table exactly
  const initialBills: SupplierBillRecord[] = [
    {
      id: 'BILL-2025-0158',
      billRef: 'BILL-2025-0158',
      description: 'Office supplies March 2025',
      supplierName: 'Office Depot UK',
      supplierCode: 'SUP-001',
      billDate: '01 Apr 2025',
      dueDate: '01 May 2025',
      grossAmount: '£1,250.00',
      grossRaw: 1250,
      outstandingAmount: '£1,250.00',
      outstandingRaw: 1250,
      approvalStatus: 'Pending',
      paymentStatus: 'Not paid',
    },
    {
      id: 'BILL-2025-0157',
      billRef: 'BILL-2025-0157',
      description: 'IT equipment and accessories',
      supplierName: 'Tech Solutions Ltd',
      supplierCode: 'SUP-004',
      billDate: '28 Mar 2025',
      dueDate: '27 Apr 2025',
      grossAmount: '£4,800.00',
      grossRaw: 4800,
      outstandingAmount: '£4,800.00',
      outstandingRaw: 4800,
      approvalStatus: 'Approved',
      paymentStatus: 'Not paid',
    },
    {
      id: 'BILL-2025-0156',
      billRef: 'BILL-2025-0156',
      description: 'Facilities maintenance',
      supplierName: 'Premier Facilities',
      supplierCode: 'SUP-003',
      billDate: '25 Mar 2025',
      dueDate: '24 Apr 2025',
      grossAmount: '£2,340.00',
      grossRaw: 2340,
      outstandingAmount: '£2,340.00',
      outstandingRaw: 2340,
      approvalStatus: 'Pending',
      paymentStatus: 'Not paid',
    },
    {
      id: 'BILL-2025-0155',
      billRef: 'BILL-2025-0155',
      description: 'Marketing services',
      supplierName: 'Creative Agency Ltd',
      supplierCode: 'SUP-008',
      billDate: '20 Mar 2025',
      dueDate: '03 Apr 2025',
      grossAmount: '£5,000.00',
      grossRaw: 5000,
      outstandingAmount: '£2,500.00',
      outstandingRaw: 2500,
      approvalStatus: 'Approved',
      paymentStatus: 'Part-paid',
    },
    {
      id: 'BILL-2025-0154',
      billRef: 'BILL-2025-0154',
      description: 'Consultancy services',
      supplierName: 'Strategic Consulting',
      supplierCode: 'SUP-007',
      billDate: '15 Mar 2025',
      dueDate: '14 Apr 2025',
      grossAmount: '£3,600.00',
      grossRaw: 3600,
      outstandingAmount: '£3,600.00',
      outstandingRaw: 3600,
      approvalStatus: 'Rejected',
      paymentStatus: 'Not paid',
    },
    {
      id: 'BILL-2025-0153',
      billRef: 'BILL-2025-0153',
      description: 'Utilities - Electricity',
      supplierName: 'Energy Plus',
      supplierCode: 'SUP-002',
      billDate: '10 Mar 2025',
      dueDate: '10 Apr 2025',
      grossAmount: '£980.00',
      grossRaw: 980,
      outstandingAmount: '£980.00',
      outstandingRaw: 980,
      approvalStatus: 'Approved',
      paymentStatus: 'Not paid',
    },
    {
      id: 'BILL-2025-0152',
      billRef: 'BILL-2025-0152',
      description: 'Cleaning services March',
      supplierName: 'Clean & Co',
      supplierCode: 'SUP-006',
      billDate: '05 Mar 2025',
      dueDate: '04 Apr 2025',
      grossAmount: '£1,120.00',
      grossRaw: 1120,
      outstandingAmount: '£0.00',
      outstandingRaw: 0,
      approvalStatus: 'Approved',
      paymentStatus: 'Paid',
    },
    {
      id: 'BILL-2025-0151',
      billRef: 'BILL-2025-0151',
      description: 'Software subscription',
      supplierName: 'CloudTech Ltd',
      supplierCode: 'SUP-005',
      billDate: '01 Mar 2025',
      dueDate: '31 Mar 2025',
      grossAmount: '£2,400.00',
      grossRaw: 2400,
      outstandingAmount: '£1,200.00',
      outstandingRaw: 1200,
      approvalStatus: 'Approved',
      paymentStatus: 'Part-paid',
    },
    {
      id: 'BILL-2025-0150',
      billRef: 'BILL-2025-0150',
      description: 'Office furniture',
      supplierName: 'Workspace Interiors',
      supplierCode: 'SUP-009',
      billDate: '28 Feb 2025',
      dueDate: '30 Mar 2025',
      grossAmount: '£6,750.00',
      grossRaw: 6750,
      outstandingAmount: '£0.00',
      outstandingRaw: 0,
      approvalStatus: 'Approved',
      paymentStatus: 'Paid',
    },
    {
      id: 'BILL-2025-0149',
      billRef: 'BILL-2025-0149',
      description: 'Insurance premium',
      supplierName: 'Business Insurance Co',
      supplierCode: 'SUP-010',
      billDate: '25 Feb 2025',
      dueDate: '27 Mar 2025',
      grossAmount: '£3,200.00',
      grossRaw: 3200,
      outstandingAmount: '£0.00',
      outstandingRaw: 0,
      approvalStatus: 'Approved',
      paymentStatus: 'Paid',
    },
  ];

  // Filtering
  const filteredBills = useMemo(() => {
    return initialBills.filter((bill) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        bill.billRef.toLowerCase().includes(q) ||
        bill.description.toLowerCase().includes(q) ||
        bill.supplierName.toLowerCase().includes(q) ||
        bill.supplierCode.toLowerCase().includes(q);

      const matchesSupplier =
        selectedSupplier === 'All suppliers' || bill.supplierName === selectedSupplier;

      const matchesApproval =
        selectedApproval === 'All statuses' || bill.approvalStatus === selectedApproval;

      const matchesPayment =
        selectedPaymentStatus === 'All statuses' || bill.paymentStatus === selectedPaymentStatus;

      let matchesAmount = true;
      if (minAmount) matchesAmount = matchesAmount && bill.grossRaw >= Number(minAmount);
      if (maxAmount) matchesAmount = matchesAmount && bill.grossRaw <= Number(maxAmount);

      return matchesSearch && matchesSupplier && matchesApproval && matchesPayment && matchesAmount;
    });
  }, [searchQuery, selectedSupplier, selectedApproval, selectedPaymentStatus, minAmount, maxAmount]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows({});
      setSelectAll(false);
    } else {
      const next: Record<string, boolean> = {};
      filteredBills.forEach((b) => (next[b.id] = true));
      setSelectedRows(next);
      setSelectAll(true);
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderApprovalBadge = (status: SupplierBillRecord['approvalStatus']) => {
    if (status === 'Approved') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '999px',
            background: '#ECFDF5',
            color: '#059669',
            fontSize: '11.5px',
            fontWeight: 500,
          }}
        >
          <CheckCircle size={13} weight="fill" color="#10B981" />
          Approved
        </span>
      );
    }
    if (status === 'Pending') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '999px',
            background: '#FFFBEB',
            color: '#D97706',
            fontSize: '11.5px',
            fontWeight: 500,
          }}
        >
          <HourglassMedium size={13} weight="fill" color="#F59E0B" />
          Pending
        </span>
      );
    }
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '3px 8px',
          borderRadius: '999px',
          background: '#FEF2F2',
          color: '#DC2626',
          fontSize: '11.5px',
          fontWeight: 500,
        }}
      >
        <XCircle size={13} weight="fill" color="#EF4444" />
        Rejected
      </span>
    );
  };

  const renderPaymentBadge = (status: SupplierBillRecord['paymentStatus']) => {
    if (status === 'Paid') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '999px',
            background: '#ECFDF5',
            color: '#059669',
            fontSize: '11.5px',
            fontWeight: 500,
          }}
        >
          <CheckCircle size={13} weight="fill" color="#10B981" />
          Paid
        </span>
      );
    }
    if (status === 'Part-paid') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '999px',
            background: '#F3E8FF',
            color: '#7C3AED',
            fontSize: '11.5px',
            fontWeight: 500,
          }}
        >
          <Clock size={13} weight="fill" color="#9333EA" />
          Part-paid
        </span>
      );
    }
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '3px 8px',
          borderRadius: '999px',
          background: '#FEF2F2',
          color: '#DC2626',
          fontSize: '11.5px',
          fontWeight: 500,
        }}
      >
        <XCircle size={13} weight="fill" color="#EF4444" />
        Not paid
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* 1. TOP TITLE & DATE PICKER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Supplier Bills List
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            View and manage supplier bills, track approval status and monitor payments.
          </p>
        </div>

        {/* Date Filter pill on top right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '36px',
            padding: '0 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            background: '#FFFFFF',
            fontSize: '12.5px',
            color: '#334155',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <CalendarBlank size={16} color="#64748B" />
          <span>01 Apr 2025 – 30 Apr 2025</span>
          <CaretDown size={12} color="#64748B" />
        </div>
      </div>

      {/* 2. TOP 5 SUMMARY KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        
        {/* Card 1: Awaiting approval */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F59E0B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Awaiting approval</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              12
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>20%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini vertical bar graph */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '30px' }}>
            <span style={{ width: '4px', height: '14px', background: '#FDE68A', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '22px', background: '#FCD34D', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '18px', background: '#FDE68A', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '28px', background: '#F59E0B', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 2: Due this week */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0284C7', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarBlank size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Due this week</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              8
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
              <TrendDown size={13} weight="bold" />
              <span>27%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini vertical bar graph */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '30px' }}>
            <span style={{ width: '4px', height: '18px', background: '#BAE6FD', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '24px', background: '#7DD3FC', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '28px', background: '#38BDF8', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '20px', background: '#0284C7', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 3: Overdue */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#DC2626', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Warning size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Overdue</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              15
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>50%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini vertical bar graph */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '30px' }}>
            <span style={{ width: '4px', height: '14px', background: '#FECACA', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '20px', background: '#F87171', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '24px', background: '#EF4444', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '30px', background: '#DC2626', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 4: Part-paid */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#7C3AED', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Part-paid</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              9
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
              <TrendDown size={13} weight="bold" />
              <span>10%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini vertical bar graph */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '30px' }}>
            <span style={{ width: '4px', height: '16px', background: '#E9D5FF', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '26px', background: '#C084FC', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '18px', background: '#A855F7', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '24px', background: '#7C3AED', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Card 5: Paid */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#059669', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Paid</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              32
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>18%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Mini vertical bar graph */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '30px' }}>
            <span style={{ width: '4px', height: '14px', background: '#A7F3D0', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '22px', background: '#6EE7B7', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '26px', background: '#34D399', borderRadius: '2px' }} />
            <span style={{ width: '4px', height: '30px', background: '#059669', borderRadius: '2px' }} />
          </div>
        </div>

      </div>

      {/* 3. FILTER & SEARCH STRIP */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Search Bar Full Width */}
        <div style={{ position: 'relative', width: '100%' }}>
          <MagnifyingGlass size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by bill reference, supplier or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '38px',
              paddingLeft: '36px',
              paddingRight: '12px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              color: '#0F172A',
              outline: 'none',
              background: '#F8FAFC',
            }}
          />
        </div>

        {/* Filter Inputs Strip + Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            
            {/* Supplier Filter */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Supplier</div>
              <button
                onClick={() => {
                  setOpenSupplierDropdown(!openSupplierDropdown);
                  setOpenApprovalDropdown(false);
                  setOpenPaymentDropdown(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '34px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  fontSize: '12.5px',
                  color: '#1E293B',
                  minWidth: '130px',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <span>{selectedSupplier}</span>
                <CaretDown size={11} color="#64748B" />
              </button>
              {openSupplierDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    width: '180px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-dropdown)',
                    zIndex: 30,
                    padding: '4px',
                  }}
                >
                  {['All suppliers', 'Office Depot UK', 'Tech Solutions Ltd', 'Premier Facilities', 'Creative Agency Ltd', 'Energy Plus', 'Clean & Co'].map((sup) => (
                    <div
                      key={sup}
                      onClick={() => {
                        setSelectedSupplier(sup);
                        setOpenSupplierDropdown(false);
                      }}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: selectedSupplier === sup ? '#0284C7' : '#334155',
                        fontWeight: selectedSupplier === sup ? 600 : 400,
                        background: selectedSupplier === sup ? '#F0F9FF' : 'transparent',
                      }}
                    >
                      {sup}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Approval status Filter */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Approval status</div>
              <button
                onClick={() => {
                  setOpenApprovalDropdown(!openApprovalDropdown);
                  setOpenSupplierDropdown(false);
                  setOpenPaymentDropdown(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '34px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  fontSize: '12.5px',
                  color: '#1E293B',
                  minWidth: '120px',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <span>{selectedApproval}</span>
                <CaretDown size={11} color="#64748B" />
              </button>
              {openApprovalDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    width: '140px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-dropdown)',
                    zIndex: 30,
                    padding: '4px',
                  }}
                >
                  {['All statuses', 'Pending', 'Approved', 'Rejected'].map((st) => (
                    <div
                      key={st}
                      onClick={() => {
                        setSelectedApproval(st);
                        setOpenApprovalDropdown(false);
                      }}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: selectedApproval === st ? '#0284C7' : '#334155',
                        fontWeight: selectedApproval === st ? 600 : 400,
                        background: selectedApproval === st ? '#F0F9FF' : 'transparent',
                      }}
                    >
                      {st}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment status Filter */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Payment status</div>
              <button
                onClick={() => {
                  setOpenPaymentDropdown(!openPaymentDropdown);
                  setOpenSupplierDropdown(false);
                  setOpenApprovalDropdown(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '34px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  fontSize: '12.5px',
                  color: '#1E293B',
                  minWidth: '120px',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <span>{selectedPaymentStatus}</span>
                <CaretDown size={11} color="#64748B" />
              </button>
              {openPaymentDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    width: '140px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-dropdown)',
                    zIndex: 30,
                    padding: '4px',
                  }}
                >
                  {['All statuses', 'Not paid', 'Part-paid', 'Paid'].map((st) => (
                    <div
                      key={st}
                      onClick={() => {
                        setSelectedPaymentStatus(st);
                        setOpenPaymentDropdown(false);
                      }}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: selectedPaymentStatus === st ? '#0284C7' : '#334155',
                        fontWeight: selectedPaymentStatus === st ? 600 : 400,
                        background: selectedPaymentStatus === st ? '#F0F9FF' : 'transparent',
                      }}
                    >
                      {st}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bill date range */}
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Bill date range</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  height: '34px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  fontSize: '12px',
                  color: '#334155',
                }}
              >
                <CalendarBlank size={14} color="#64748B" />
                <span>01 Apr 2025</span>
                <span>→</span>
                <span>30 Apr 2025</span>
              </div>
            </div>

            {/* Amount range */}
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Amount range</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="£ Min"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  style={{
                    width: '74px',
                    height: '34px',
                    padding: '0 8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    outline: 'none',
                  }}
                />
                <span style={{ color: '#94A3B8' }}>–</span>
                <input
                  type="text"
                  placeholder="£ Max"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  style={{
                    width: '74px',
                    height: '34px',
                    padding: '0 8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

          </div>

          {/* Right Actions: + Enter bill & Export */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowEnterBillModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 16px',
                borderRadius: '8px',
                border: 'none',
                background: '#0F766E',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Plus size={15} weight="bold" />
              <span>Enter bill</span>
            </button>

            <button
              onClick={() => alert('Exporting bills...')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                fontSize: '12.5px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <Export size={15} />
              <span>Export</span>
              <CaretDown size={12} color="#64748B" />
            </button>

            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <DotsThreeVertical size={16} weight="bold" />
            </button>
          </div>

        </div>
      </div>

      {/* 4. MAIN DATA TABLE */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', fontWeight: 600 }}>
                <th style={{ padding: '12px 14px', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    style={{ width: '15px', height: '15px', borderRadius: '4px', cursor: 'pointer', accentColor: '#0F766E' }}
                  />
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Bill reference</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Supplier</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Bill date</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Due date</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    <span>Gross (GBP)</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    <span>Outstanding (GBP)</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <span>Approval status</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <span>Payment status</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => {
                const isChecked = !!selectedRows[bill.id];
                return (
                  <tr
                    key={bill.id}
                    onClick={() => router.push(`/finance/purchase-invoices/${bill.billRef}`)}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      cursor: 'pointer',
                      transition: 'background 0.12s ease',
                      backgroundColor: isChecked ? '#F0FDF4' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isChecked) e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      if (!isChecked) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {/* Checkbox */}
                    <td style={{ padding: '14px' }} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => toggleSelectRow(bill.id, e as any)}
                        style={{ width: '15px', height: '15px', borderRadius: '4px', cursor: 'pointer', accentColor: '#0F766E' }}
                      />
                    </td>

                    {/* Bill Reference & Description */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 600, color: '#0284C7', fontSize: '13px' }}>
                        {bill.billRef}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {bill.description}
                      </div>
                    </td>

                    {/* Supplier Name & Code */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '12.5px' }}>
                        {bill.supplierName}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {bill.supplierCode}
                      </div>
                    </td>

                    {/* Bill date */}
                    <td style={{ padding: '14px', color: '#64748B' }}>
                      {bill.billDate}
                    </td>

                    {/* Due date */}
                    <td style={{ padding: '14px', color: '#DC2626', fontWeight: 500 }}>
                      {bill.dueDate}
                    </td>

                    {/* Gross */}
                    <td style={{ padding: '14px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                      {bill.grossAmount}
                    </td>

                    {/* Outstanding */}
                    <td
                      style={{
                        padding: '14px',
                        textAlign: 'right',
                        fontWeight: 600,
                        color: bill.outstandingRaw > 0 ? '#0F172A' : '#64748B',
                      }}
                    >
                      {bill.outstandingAmount}
                    </td>

                    {/* Approval Status */}
                    <td style={{ padding: '14px', textAlign: 'center' }}>
                      {renderApprovalBadge(bill.approvalStatus)}
                    </td>

                    {/* Payment Status */}
                    <td style={{ padding: '14px', textAlign: 'center' }}>
                      {renderPaymentBadge(bill.paymentStatus)}
                    </td>

                    {/* Actions 3 dots */}
                    <td style={{ padding: '14px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#94A3B8',
                          cursor: 'pointer',
                        }}
                      >
                        <DotsThreeVertical size={16} weight="bold" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 5. TABLE FOOTER / PAGINATION */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            fontSize: '12.5px',
            color: '#64748B',
          }}
        >
          <div>
            Showing 1–{filteredBills.length} of 68 supplier bills
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                disabled={currentPage === 1}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                &lt;
              </button>

              <button
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #0F766E',
                  background: '#0F766E',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                1
              </button>

              {[2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}

              <span style={{ padding: '0 4px', color: '#94A3B8' }}>...</span>

              <button
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  color: '#334155',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                7
              </button>

              <button
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ENTER BILL */}
      {showEnterBillModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '520px', padding: '24px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Enter Supplier Bill</h3>
              <button onClick={() => setShowEnterBillModal(false)}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Supplier *</label>
                <select style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
                  <option>Office Depot UK (SUP-001)</option>
                  <option>Tech Solutions Ltd (SUP-004)</option>
                  <option>Premier Facilities (SUP-003)</option>
                  <option>Creative Agency Ltd (SUP-008)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Bill Reference *</label>
                <input placeholder="e.g. BILL-2025-0159" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Description</label>
                <input placeholder="Short description of items or services" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Bill Date</label>
                  <input type="date" defaultValue="2025-04-15" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Due Date</label>
                  <input type="date" defaultValue="2025-05-15" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Gross Amount (GBP) *</label>
                <input placeholder="£0.00" style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowEnterBillModal(false)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#475569', fontSize: '12.5px', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => { alert('Bill created!'); setShowEnterBillModal(false); }} style={{ padding: '8px 18px', borderRadius: '6px', background: '#0F766E', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600 }}>Save Bill</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
