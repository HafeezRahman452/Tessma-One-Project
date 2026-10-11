'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UsersThree,
  UserCheck,
  Warning,
  Coins,
  TrendUp,
  MagnifyingGlass,
  Plus,
  Export,
  CaretDown,
  DotsThreeVertical,
  CheckCircle,
  Clock,
  XCircle,
  Funnel,
  ArrowClockwise,
  Check,
  X,
  FileText,
  Building,
  EnvelopeSimple,
  Phone,
  Bank
} from '@phosphor-icons/react';

interface SupplierRecord {
  id: string;
  name: string;
  code: string;
  iconBg: string;
  iconType: 'triangle' | 'globe' | 'building' | 'leaf' | 'truck' | 'gear' | 'shield' | 'recycle' | 'window';
  category: string;
  categoryColor: { bg: string; text: string; border?: string };
  contactName: string;
  contactEmail: string;
  currentBalance: string;
  balanceRaw: number;
  overdueAmount: string;
  overdueRaw: number;
  lastBill: string;
  paymentTerms: string;
  bankStatus: 'Verified' | 'Pending' | 'Not Verified';
  status: 'Active' | 'Inactive';
}

export default function SuppliersListPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useState<string>('All');
  const [selectedSpendBand, setSelectedSpendBand] = useState<string>('All');

  // Dropdown states
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openPaymentTermsDropdown, setOpenPaymentTermsDropdown] = useState(false);
  const [openSpendBandDropdown, setOpenSpendBandDropdown] = useState(false);

  // Selection states
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);

  // Modal
  const [showNewSupplierModal, setShowNewSupplierModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Supplier List Data matching Screen 08 exactly
  const initialSuppliers: SupplierRecord[] = [
    {
      id: 'SUP-001',
      name: 'Acme Office Supplies',
      code: 'SUP-001',
      iconBg: '#DC2626',
      iconType: 'triangle',
      category: 'Office Supplies',
      categoryColor: { bg: '#EFF6FF', text: '#2563EB' },
      contactName: 'Sarah Wilson',
      contactEmail: 'sarah.wilson@acme.co.uk',
      currentBalance: '£12,450',
      balanceRaw: 12450,
      overdueAmount: '£0',
      overdueRaw: 0,
      lastBill: '12 Apr 2025',
      paymentTerms: '30 days',
      bankStatus: 'Verified',
      status: 'Active',
    },
    {
      id: 'SUP-002',
      name: 'Global Tech Solutions',
      code: 'SUP-002',
      iconBg: '#2563EB',
      iconType: 'globe',
      category: 'IT Services',
      categoryColor: { bg: '#F5F3FF', text: '#7C3AED' },
      contactName: 'James Carter',
      contactEmail: 'james.carter@globaltech.com',
      currentBalance: '£28,300',
      balanceRaw: 28300,
      overdueAmount: '£7,200',
      overdueRaw: 7200,
      lastBill: '05 Apr 2025',
      paymentTerms: '30 days',
      bankStatus: 'Verified',
      status: 'Active',
    },
    {
      id: 'SUP-003',
      name: 'BuildRight Ltd',
      code: 'SUP-003',
      iconBg: '#EA580C',
      iconType: 'building',
      category: 'Construction',
      categoryColor: { bg: '#FFF7ED', text: '#C2410C' },
      contactName: 'Emma Davies',
      contactEmail: 'emma.davies@buildright.co.uk',
      currentBalance: '£45,600',
      balanceRaw: 45600,
      overdueAmount: '£12,450',
      overdueRaw: 12450,
      lastBill: '28 Mar 2025',
      paymentTerms: '60 days',
      bankStatus: 'Pending',
      status: 'Active',
    },
    {
      id: 'SUP-004',
      name: 'CleanCo Services',
      code: 'SUP-004',
      iconBg: '#0284C7',
      iconType: 'building',
      category: 'Facilities Management',
      categoryColor: { bg: '#E0F2FE', text: '#0284C7' },
      contactName: 'Michael Brown',
      contactEmail: 'michael.brown@cleanco.co.uk',
      currentBalance: '£8,920',
      balanceRaw: 8920,
      overdueAmount: '£0',
      overdueRaw: 0,
      lastBill: '10 Apr 2025',
      paymentTerms: '30 days',
      bankStatus: 'Verified',
      status: 'Active',
    },
    {
      id: 'SUP-005',
      name: 'EnergyPlus',
      code: 'SUP-005',
      iconBg: '#16A34A',
      iconType: 'leaf',
      category: 'Utilities',
      categoryColor: { bg: '#DCFCE7', text: '#15803D' },
      contactName: 'Laura Thompson',
      contactEmail: 'laura.thompson@energyplus.com',
      currentBalance: '£15,200',
      balanceRaw: 15200,
      overdueAmount: '£3,800',
      overdueRaw: 3800,
      lastBill: '02 Apr 2025',
      paymentTerms: '30 days',
      bankStatus: 'Verified',
      status: 'Active',
    },
    {
      id: 'SUP-006',
      name: 'Metro Logistics',
      code: 'SUP-006',
      iconBg: '#9333EA',
      iconType: 'truck',
      category: 'Logistics',
      categoryColor: { bg: '#F3E8FF', text: '#9333EA' },
      contactName: 'Robert Hughes',
      contactEmail: 'robert.hughes@metrologis.co.uk',
      currentBalance: '£6,780',
      balanceRaw: 6780,
      overdueAmount: '£0',
      overdueRaw: 0,
      lastBill: '14 Apr 2025',
      paymentTerms: '14 days',
      bankStatus: 'Verified',
      status: 'Active',
    },
    {
      id: 'SUP-007',
      name: 'ProConsulting',
      code: 'SUP-007',
      iconBg: '#0284C7',
      iconType: 'gear',
      category: 'Professional Services',
      categoryColor: { bg: '#E0F2FE', text: '#0369A1' },
      contactName: 'Olivia Martin',
      contactEmail: 'olivia.martin@proconsulting.co.uk',
      currentBalance: '£22,150',
      balanceRaw: 22150,
      overdueAmount: '£5,600',
      overdueRaw: 5600,
      lastBill: '01 Apr 2025',
      paymentTerms: '30 days',
      bankStatus: 'Not Verified',
      status: 'Active',
    },
    {
      id: 'SUP-008',
      name: 'SecureIT',
      code: 'SUP-008',
      iconBg: '#2563EB',
      iconType: 'shield',
      category: 'Security',
      categoryColor: { bg: '#FEF3C7', text: '#D97706' },
      contactName: 'Daniel White',
      contactEmail: 'daniel.white@secureit.co.uk',
      currentBalance: '£4,300',
      balanceRaw: 4300,
      overdueAmount: '£0',
      overdueRaw: 0,
      lastBill: '16 Apr 2025',
      paymentTerms: '30 days',
      bankStatus: 'Verified',
      status: 'Active',
    },
    {
      id: 'SUP-009',
      name: 'Green Earth Waste',
      code: 'SUP-009',
      iconBg: '#16A34A',
      iconType: 'recycle',
      category: 'Waste Management',
      categoryColor: { bg: '#DCFCE7', text: '#166534' },
      contactName: 'Sophie Green',
      contactEmail: 'sophie.green@greenearth.co.uk',
      currentBalance: '£9,780',
      balanceRaw: 9780,
      overdueAmount: '£2,100',
      overdueRaw: 2100,
      lastBill: '09 Apr 2025',
      paymentTerms: '30 days',
      bankStatus: 'Verified',
      status: 'Inactive',
    },
    {
      id: 'SUP-010',
      name: 'Office Interiors UK',
      code: 'SUP-010',
      iconBg: '#E11D48',
      iconType: 'window',
      category: 'Office Fit Out',
      categoryColor: { bg: '#F1F5F9', text: '#6366F1' },
      contactName: 'Thomas Reed',
      contactEmail: 'thomas.reed@officeinteriors.co.uk',
      currentBalance: '£18,500',
      balanceRaw: 18500,
      overdueAmount: '£6,750',
      overdueRaw: 6750,
      lastBill: '30 Mar 2025',
      paymentTerms: '45 days',
      bankStatus: 'Pending',
      status: 'Active',
    },
  ];

  // Filtering
  const filteredSuppliers = useMemo(() => {
    return initialSuppliers.filter((sup) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        sup.name.toLowerCase().includes(q) ||
        sup.code.toLowerCase().includes(q) ||
        sup.contactName.toLowerCase().includes(q) ||
        sup.contactEmail.toLowerCase().includes(q) ||
        sup.category.toLowerCase().includes(q);

      const matchesStatus = selectedStatus === 'All' || sup.status === selectedStatus;
      const matchesCategory = selectedCategory === 'All' || sup.category === selectedCategory;
      const matchesPaymentTerms = selectedPaymentTerms === 'All' || sup.paymentTerms.includes(selectedPaymentTerms);

      let matchesSpend = true;
      if (selectedSpendBand === '< £10k') {
        matchesSpend = sup.balanceRaw < 10000;
      } else if (selectedSpendBand === '£10k - £25k') {
        matchesSpend = sup.balanceRaw >= 10000 && sup.balanceRaw <= 25000;
      } else if (selectedSpendBand === '> £25k') {
        matchesSpend = sup.balanceRaw > 25000;
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesPaymentTerms && matchesSpend;
    });
  }, [searchQuery, selectedStatus, selectedCategory, selectedPaymentTerms, selectedSpendBand]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows({});
      setSelectAll(false);
    } else {
      const next: Record<string, boolean> = {};
      filteredSuppliers.forEach((s) => (next[s.id] = true));
      setSelectedRows(next);
      setSelectAll(true);
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedCategory('All');
    setSelectedPaymentTerms('All');
    setSelectedSpendBand('All');
  };

  const renderSupplierIcon = (iconType: string, iconBg: string) => {
    return (
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '1px solid #E2E8F0',
        }}
      >
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '3px',
            backgroundColor: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </div>
    );
  };

  const renderBankStatus = (status: SupplierRecord['bankStatus']) => {
    if (status === 'Verified') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '999px',
            backgroundColor: '#ECFDF5',
            color: '#059669',
            fontSize: '11.5px',
            fontWeight: 500,
          }}
        >
          <CheckCircle size={13} weight="fill" color="#10B981" />
          Verified
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
            backgroundColor: '#FFFBEB',
            color: '#D97706',
            fontSize: '11.5px',
            fontWeight: 500,
          }}
        >
          <Clock size={13} weight="fill" color="#F59E0B" />
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
          backgroundColor: '#FEF2F2',
          color: '#DC2626',
          fontSize: '11.5px',
          fontWeight: 500,
        }}
      >
        <XCircle size={13} weight="fill" color="#EF4444" />
        Not Verified
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* 1. PAGE HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Suppliers List
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            Manage your suppliers, view account balances and track payment status.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowNewSupplierModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 16px',
              borderRadius: '8px',
              border: 'none',
              background: '#0284C7',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(2, 132, 199, 0.2)',
            }}
          >
            <Plus size={15} weight="bold" />
            <span>New supplier</span>
          </button>

          <button
            onClick={() => alert('Exporting suppliers...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '13px',
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
              border: '1px solid #E2E8F0',
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

      {/* 2. TOP 4 METRIC KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        
        {/* Card 1: Total Suppliers */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UsersThree size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Total Suppliers</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              62
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>8%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. Mar 2025</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '70px', height: '32px' }}>
            <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
              <path d="M2 26 C 18 24, 30 20, 42 16 C 54 12, 60 8, 68 4" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Active Suppliers */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Active Suppliers</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              56
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>6%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. Mar 2025</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '70px', height: '32px' }}>
            <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
              <path d="M2 24 C 18 20, 32 22, 44 14 C 54 8, 60 12, 68 4" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: Overdue Bills */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Overdue Bills</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              12
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>33%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. Mar 2025</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '70px', height: '32px' }}>
            <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
              <path d="M2 28 C 16 26, 30 20, 44 14 C 56 12, 60 6, 68 2" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: Outstanding Payables */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Coins size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Outstanding Payables</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>
              £318,450
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>18%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. Mar 2025</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '70px', height: '32px' }}>
            <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
              <path d="M2 26 C 20 22, 34 24, 46 16 C 58 10, 62 8, 68 3" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>

      {/* 3. TABLE FILTER & SEARCH STRIP */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Left: Title + Search + Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', flex: 1 }}>
          
          {/* Suppliers Icon Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={16} weight="fill" />
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              Suppliers
            </h2>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '320px', minWidth: '220px' }}>
            <MagnifyingGlass size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search suppliers by name, contact or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '36px',
                paddingLeft: '34px',
                paddingRight: '12px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '12.5px',
                color: '#0F172A',
                outline: 'none',
                background: '#F8FAFC',
              }}
            />
          </div>

          {/* Filter: Status */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Status</div>
            <button
              onClick={() => {
                setOpenStatusDropdown(!openStatusDropdown);
                setOpenCategoryDropdown(false);
                setOpenPaymentTermsDropdown(false);
                setOpenSpendBandDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
                minWidth: '90px',
                justifyContent: 'space-between',
              }}
            >
              <span>{selectedStatus}</span>
              <CaretDown size={11} color="#64748B" />
            </button>
            {openStatusDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '105%',
                  left: 0,
                  width: '120px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-dropdown)',
                  zIndex: 30,
                  padding: '4px',
                }}
              >
                {['All', 'Active', 'Inactive'].map((st) => (
                  <div
                    key={st}
                    onClick={() => {
                      setSelectedStatus(st);
                      setOpenStatusDropdown(false);
                    }}
                    style={{
                      padding: '6px 10px',
                      fontSize: '12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: selectedStatus === st ? '#0284C7' : '#334155',
                      fontWeight: selectedStatus === st ? 600 : 400,
                      background: selectedStatus === st ? '#F0F9FF' : 'transparent',
                    }}
                  >
                    {st}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter: Category */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Category</div>
            <button
              onClick={() => {
                setOpenCategoryDropdown(!openCategoryDropdown);
                setOpenStatusDropdown(false);
                setOpenPaymentTermsDropdown(false);
                setOpenSpendBandDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
                minWidth: '100px',
                justifyContent: 'space-between',
              }}
            >
              <span>{selectedCategory}</span>
              <CaretDown size={11} color="#64748B" />
            </button>
            {openCategoryDropdown && (
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
                  maxHeight: '220px',
                  overflowY: 'auto',
                }}
              >
                {['All', 'Office Supplies', 'IT Services', 'Construction', 'Facilities Management', 'Utilities', 'Logistics', 'Professional Services', 'Security', 'Waste Management', 'Office Fit Out'].map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenCategoryDropdown(false);
                    }}
                    style={{
                      padding: '6px 10px',
                      fontSize: '12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: selectedCategory === cat ? '#0284C7' : '#334155',
                      fontWeight: selectedCategory === cat ? 600 : 400,
                      background: selectedCategory === cat ? '#F0F9FF' : 'transparent',
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter: Payment terms */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Payment terms</div>
            <button
              onClick={() => {
                setOpenPaymentTermsDropdown(!openPaymentTermsDropdown);
                setOpenStatusDropdown(false);
                setOpenCategoryDropdown(false);
                setOpenSpendBandDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
                minWidth: '90px',
                justifyContent: 'space-between',
              }}
            >
              <span>{selectedPaymentTerms}</span>
              <CaretDown size={11} color="#64748B" />
            </button>
            {openPaymentTermsDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '105%',
                  left: 0,
                  width: '130px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-dropdown)',
                  zIndex: 30,
                  padding: '4px',
                }}
              >
                {['All', '14 days', '30 days', '45 days', '60 days'].map((term) => (
                  <div
                    key={term}
                    onClick={() => {
                      setSelectedPaymentTerms(term);
                      setOpenPaymentTermsDropdown(false);
                    }}
                    style={{
                      padding: '6px 10px',
                      fontSize: '12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: selectedPaymentTerms === term ? '#0284C7' : '#334155',
                      fontWeight: selectedPaymentTerms === term ? 600 : 400,
                      background: selectedPaymentTerms === term ? '#F0F9FF' : 'transparent',
                    }}
                  >
                    {term}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter: Spend band */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '2px', fontWeight: 500 }}>Spend band</div>
            <button
              onClick={() => {
                setOpenSpendBandDropdown(!openSpendBandDropdown);
                setOpenStatusDropdown(false);
                setOpenCategoryDropdown(false);
                setOpenPaymentTermsDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
                minWidth: '90px',
                justifyContent: 'space-between',
              }}
            >
              <span>{selectedSpendBand}</span>
              <CaretDown size={11} color="#64748B" />
            </button>
            {openSpendBandDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '105%',
                  left: 0,
                  width: '130px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-dropdown)',
                  zIndex: 30,
                  padding: '4px',
                }}
              >
                {['All', '< £10k', '£10k - £25k', '> £25k'].map((band) => (
                  <div
                    key={band}
                    onClick={() => {
                      setSelectedSpendBand(band);
                      setOpenSpendBandDropdown(false);
                    }}
                    style={{
                      padding: '6px 10px',
                      fontSize: '12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: selectedSpendBand === band ? '#0284C7' : '#334155',
                      fontWeight: selectedSpendBand === band ? 600 : 400,
                      background: selectedSpendBand === band ? '#F0F9FF' : 'transparent',
                    }}
                  >
                    {band}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clear filters */}
          <button
            onClick={clearFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '32px',
              padding: '0 10px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: '#0284C7',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '14px',
            }}
          >
            <Funnel size={14} />
            <span>Clear filters</span>
          </button>

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
                    style={{ width: '15px', height: '15px', borderRadius: '4px', cursor: 'pointer', accentColor: '#0284C7' }}
                  />
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Supplier</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Category</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Primary contact</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    <span>Current balance</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    <span>Overdue amount</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Last bill</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Payment terms</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <span>Bank status</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <span>Status</span>
                    <CaretDown size={11} color="#94A3B8" />
                  </div>
                </th>
                <th style={{ padding: '12px 14px', width: '40px', textAlign: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((sup) => {
                const isChecked = !!selectedRows[sup.id];
                return (
                  <tr
                    key={sup.id}
                    onClick={() => router.push(`/finance/suppliers/${encodeURIComponent(sup.name)}`)}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      cursor: 'pointer',
                      transition: 'background 0.12s ease',
                      backgroundColor: isChecked ? '#F0F9FF' : 'transparent',
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
                        onChange={(e) => toggleSelectRow(sup.id, e as any)}
                        style={{ width: '15px', height: '15px', borderRadius: '4px', cursor: 'pointer', accentColor: '#0284C7' }}
                      />
                    </td>

                    {/* Supplier Name & Code */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {renderSupplierIcon(sup.iconType, sup.iconBg)}
                        <div>
                          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>
                            {sup.name}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                            {sup.code}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '14px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          backgroundColor: sup.categoryColor.bg,
                          color: sup.categoryColor.text,
                          fontSize: '11.5px',
                          fontWeight: 500,
                        }}
                      >
                        {sup.category}
                      </span>
                    </td>

                    {/* Primary Contact */}
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 500, color: '#1E293B', fontSize: '12.5px' }}>
                        {sup.contactName}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {sup.contactEmail}
                      </div>
                    </td>

                    {/* Current Balance */}
                    <td style={{ padding: '14px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                      {sup.currentBalance}
                    </td>

                    {/* Overdue Amount */}
                    <td
                      style={{
                        padding: '14px',
                        textAlign: 'right',
                        fontWeight: 600,
                        color: sup.overdueRaw > 0 ? '#DC2626' : '#16A34A',
                      }}
                    >
                      {sup.overdueAmount}
                    </td>

                    {/* Last Bill */}
                    <td style={{ padding: '14px', color: '#64748B' }}>
                      {sup.lastBill}
                    </td>

                    {/* Payment Terms */}
                    <td style={{ padding: '14px', color: '#475569' }}>
                      {sup.paymentTerms}
                    </td>

                    {/* Bank Status */}
                    <td style={{ padding: '14px', textAlign: 'center' }}>
                      {renderBankStatus(sup.bankStatus)}
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: sup.status === 'Active' ? '#ECFDF5' : '#F1F5F9',
                          color: sup.status === 'Active' ? '#059669' : '#64748B',
                          fontSize: '11.5px',
                          fontWeight: 500,
                        }}
                      >
                        {sup.status}
                      </span>
                    </td>

                    {/* 3 dots action */}
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
            Showing 1–{filteredSuppliers.length} of 62 suppliers
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Page buttons */}
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
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                &lt;
              </button>

              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: currentPage === page ? '#007D7D' : '#E2E8F0',
                    background: currentPage === page ? '#007D7D' : '#FFFFFF',
                    color: currentPage === page ? '#FFFFFF' : '#334155',
                    fontSize: '12px',
                    fontWeight: currentPage === page ? 600 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {page}
                </button>
              ))}

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

            {/* Rows per page dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                style={{
                  height: '28px',
                  padding: '0 8px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#334155',
                  fontSize: '12px',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SUPPLIER MODAL */}
      {showNewSupplierModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '540px',
              padding: '24px',
              boxShadow: 'var(--shadow-dropdown)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={20} color="#0284C7" weight="fill" />
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Add New Supplier</h3>
              </div>
              <button
                onClick={() => setShowNewSupplierModal(false)}
                style={{ color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Supplier Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Office Supplies"
                  style={{ width: '100%', height: '36px', padding: '0 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select style={{ width: '100%', height: '36px', padding: '0 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}>
                    <option>Office Supplies</option>
                    <option>IT Services</option>
                    <option>Construction</option>
                    <option>Facilities Management</option>
                    <option>Utilities</option>
                    <option>Logistics</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Payment Terms
                  </label>
                  <select style={{ width: '100%', height: '36px', padding: '0 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}>
                    <option>30 days</option>
                    <option>14 days</option>
                    <option>45 days</option>
                    <option>60 days</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Primary Contact
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    style={{ width: '100%', height: '36px', padding: '0 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.co.uk"
                    style={{ width: '100%', height: '36px', padding: '0 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px' }}>
              <button
                onClick={() => setShowNewSupplierModal(false)}
                style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Supplier created successfully!');
                  setShowNewSupplierModal(false);
                }}
                style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', background: '#0284C7', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
              >
                Create Supplier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
